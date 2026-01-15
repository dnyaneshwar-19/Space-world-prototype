import React, { useState } from 'react';
import { 
  Menu
} from 'lucide-react';
import { Button } from '../ui/button';

// --- Shared Types ---
interface LessonState {
    currentStep: number;
    totalSteps: number;
    lessonTitle: string;
    lessonGoal: string;
}

// --- Component: LabHeader (Step 2) ---
function LabHeader({ state }: { state: LessonState }) {
    return (
        <div className="w-full bg-[#0B1020]/90 backdrop-blur-md border-b border-[#4CC9F0]/20 p-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white font-['Orbitron'] tracking-wide">
                        {state.lessonTitle}
                    </h1>
                    <p className="text-xs md:text-sm text-[#4CC9F0] mt-1 font-medium">
                        Goal: {state.lessonGoal}
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <div className="text-xs text-gray-400 uppercase tracking-widest">Progress</div>
                        <div className="text-lg font-mono font-bold text-white">
                            Step <span className="text-[#4CC9F0]">{state.currentStep}</span> / {state.totalSteps}
                        </div>
                    </div>
                    {/* Progress Bar Visual */}
                    <div className="w-32 h-2 bg-[#0F172A] rounded-full overflow-hidden border border-[#4CC9F0]/20 hidden md:block">
                        <div 
                            className="h-full bg-[#4CC9F0] transition-all duration-500 ease-out shadow-[0_0_10px_#4CC9F0]"
                            style={{ width: `${(state.currentStep / state.totalSteps) * 100}%` }}
                        ></div>
                    </div>
                    
                    <Button variant="ghost" size="icon" className="md:hidden text-white">
                        <Menu className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

// --- Placeholders for Step 1 Structure ---

// --- Step 4 & 5: Interactive Lesson Player ---
import { Play, Pause, Maximize, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useLabStore } from '../../store/labStore';
import { useRef, useEffect } from 'react';

import { TimelineController } from '../orbital-lab/TimelineController';
import { InteractionOverlay } from '../orbital-lab/InteractionOverlay';
import { VisualizationPanel } from '../orbital-lab/VisualizationPanel';
import { StoryModePanel } from '../orbital-lab/StoryModePanel';
import { MissionTimelinePanel } from '../orbital-lab/MissionTimelinePanel';
import { ScientistSecretsPanel } from '../orbital-lab/ScientistSecretsPanel';
import { QuizAndChallengesPanel } from '../orbital-lab/QuizAndChallengesPanel';
import { LESSON_CONFIG } from '../../data/lessonConfig';

// --- Component: LessonPlayerSection (YouTube API Bridge + MP4 Support) ---
function LessonPlayerSection({ className }: { className?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null); // Reference to YT Player instance
    const pollingInterval = useRef<any>(null); // Interval reference (any to avoid NodeJS types)

    const { 
        currentVideoTime, isPlaying, updateVideoTime, 
        setIsPlaying, setVideoDuration, viewMode, activeInteractionId
    } = useLabStore();
    
    // Check Source Type
    const isYouTube = LESSON_CONFIG.videoSrc.includes('youtube') || LESSON_CONFIG.videoSrc.includes('youtu.be');

    // Debug: Mount Log
    // Debug: Mount Log
    // useEffect(() => {
    //     console.log("LessonPlayerSection mounted");
    // }, []);

    // === YouTube API Integration ===
    useEffect(() => {
        if (!isYouTube) return;

        // Load API if not present
        // @ts-ignore
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            // tag.id = "youtube-api-script"; // avoid dupes
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        // Initialize Player when API is ready
        const initPlayer = () => {
            // @ts-ignore
            if (!window.YT || !window.YT.Player) return;
            
            // @ts-ignore
            playerRef.current = new window.YT.Player('youtube-player', {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        // If API is already ready, init immediately, else wait for global callback
        // @ts-ignore
        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            // @ts-ignore
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (pollingInterval.current) clearInterval(pollingInterval.current);
            // Don't destroy iframe ref, as it's part of the DOM now
        };
    }, [isYouTube]);

    const onPlayerReady = (event: any) => {
        console.log("YouTube iframe loaded");
        // Allow store to know duration
        const dur = event.target.getDuration();
        if (dur) setVideoDuration(dur);
        
        // Start Polling for Time Sync (Crucial for Interactive Timeline)
        pollingInterval.current = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
                const time = playerRef.current.getCurrentTime();
                updateVideoTime(time);
            }
        }, 500); // 2Hz sync is sufficient for quiz triggers
    };

    const onPlayerStateChange = (event: any) => {
        // Sync Play/Pause state
        // YT.PlayerState: 1 = Playing, 2 = Paused
        if (event.data === 1) setIsPlaying(true);
        if (event.data === 2) setIsPlaying(false);
    };

    // React to Store Pauses (e.g. from Quiz Trigger)
    useEffect(() => {
        if (isYouTube && playerRef.current && playerRef.current.pauseVideo && playerRef.current.playVideo) {
            if (!isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                // Determine if we should play is tricky with native controls, 
                // usually we only force pause from store.
                // But if user clicks "Complete" on quiz, store sets playing=true.
                // We should try to resume.
                // We need to check actual player state to avoid loops?
                // Let's rely on user strict interactions for now.
                // actually, resetting flow:
                // If store says play, we try to play.
                 const playerState = playerRef.current.getPlayerState();
                 if (playerState !== 1 && playerState !== 3) { // If not playing or buffering
                     playerRef.current.playVideo();
                 }
            }
        }
    }, [isPlaying, isYouTube]);

    // === MP4 Handlers (Legacy) ===
    // Local State for Volume
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false); 

    // Sync State -> DOM
    useEffect(() => {
        if (!isYouTube && videoRef.current) {
            if (isPlaying) videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
            else videoRef.current.pause();
        }
    }, [isPlaying, isYouTube]);

    // Volume Sync
    useEffect(() => {
        if (!isYouTube && videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.muted = isMuted;
        }
    }, [volume, isMuted, isYouTube]);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            updateVideoTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setVideoDuration(videoRef.current.duration);
        }
    };

    const togglePlay = () => {
        if (activeInteractionId) return; // Locked during interaction
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => setIsMuted(!isMuted);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (val > 0) setIsMuted(false);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (activeInteractionId) return; // Locked
        const time = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            updateVideoTime(time);
        }
    };

    const toggleFullscreen = () => {
        if (containerRef.current) {
            if (!document.fullscreenElement) {
                containerRef.current.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    const formatTime = (time: number) => {
         // Prevent NaN display
         if (isNaN(time)) return "00:00";
         const minutes = Math.floor(time / 60);
         const seconds = Math.floor(time % 60);
         return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (activeInteractionId) return; // Locked
        if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            togglePlay();
        }
    };
    
    // --- RENDERERS ---

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const renderYouTubePlayer = () => {
        const videoId = getYouTubeId(LESSON_CONFIG.videoSrc);
        if (!videoId) return <div className="text-white">Invalid Video URL</div>;

        return (
             <div className="relative w-full h-full min-h-[360px] aspect-video videoContainer bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
                {/* Fallback Iframe (Visible Immediately) upgraded by API later */}
                <iframe 
                    id="youtube-player" 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=1&rel=0&modestbranding=1&origin=${window.location.origin}`}
                    title="Orbital Lab Lesson"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full object-cover"
                ></iframe>
            </div>
        );
    };

    const renderLocalPlayer = () => (
        <>
            <video
                ref={videoRef}
                className="w-full h-full object-cover aspect-video"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                src={LESSON_CONFIG.videoSrc}
                poster={LESSON_CONFIG.posterImage}
                loop
                onClick={togglePlay}
                playsInline
            />

            {/* Custom Controls Overlay - MP4 Only */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 opacity-100 flex flex-col justify-end z-20 videoControls">
                {/* Visual Timeline Scrubber */}
                <div className="w-full mb-3 flex items-center gap-2 group/timeline">
                    <input 
                        type="range"
                        min="0"
                        max={videoRef.current?.duration || 100}
                        value={currentVideoTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#4CC9F0] hover:h-2 transition-all"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-white hover:bg-white/20 hover:text-[#4CC9F0] transition-colors"
                            onClick={togglePlay}
                        >
                            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                        </Button>

                        <div className="flex items-center gap-2 group/volume">
                            <Button variant="ghost" size="icon" className="text-white hover:text-[#4CC9F0]" onClick={toggleMute}>
                                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </Button>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.1" 
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 h-1 bg-white/20 rounded-full accent-[#4CC9F0]"
                            />
                        </div>

                        <span className="text-xs font-mono text-white/80 select-none">
                            {formatTime(currentVideoTime)} / {formatTime(videoRef.current?.duration || 0)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                         <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-white/70 hover:text-white"
                            onClick={() => {
                                if (videoRef.current) {
                                    videoRef.current.currentTime = 0;
                                    updateVideoTime(0);
                                }
                            }}
                        >
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white" onClick={toggleFullscreen}>
                            <Maximize className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div 
            ref={containerRef} 
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{ minHeight: '450px' }}
            className={`relative bg-black rounded-xl shadow-2xl border border-[#4CC9F0]/20 group outline-none focus:ring-2 focus:ring-[#4CC9F0]/50 ${className}`}
        >
            {/* View Mode Indicator Overlay */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 pointer-events-none">
                <div className={`w-2 h-2 rounded-full ${viewMode === 'human' ? 'bg-[#22C55E]' : 'bg-[#4CC9F0]'} animate-pulse`}></div>
                <span className="text-[10px] uppercase font-bold text-white tracking-widest">
                    {viewMode === 'human' ? 'Optical Feed' : 'Spectral Analysis'}
                </span>
            </div>

            {isYouTube ? renderYouTubePlayer() : renderLocalPlayer()}
            
            <TimelineController />
            <InteractionOverlay />
        </div>
    );
}

// function VisualizationPanel({ className }: { className?: string }) {
//     return (
//         <div className={`bg-[#0F172A]/50 border-2 border-dashed border-[#FACC15]/20 rounded-xl flex items-center justify-center p-12 min-h-[400px] ${className}`}>
//             <span className="text-[#FACC15]/50 font-mono text-sm uppercase tracking-widest">Visualization Panel Placeholder</span>
//         </div>
//     );
// }

// function StoryModePanel() {
//     return (
//         <div className="bg-[#0F172A]/50 border-2 border-dashed border-[#A855F7]/20 rounded-xl flex items-center justify-center p-8 h-32">
//             <span className="text-[#A855F7]/50 font-mono text-sm uppercase tracking-widest">Story Mode Panel Placeholder</span>
//         </div>
//     );
// }

// function MissionTimelinePanel() {
//     return (
//         <div className="bg-[#0F172A]/50 border-2 border-dashed border-[#22C55E]/20 rounded-xl flex items-center justify-center p-8 h-32">
//             <span className="text-[#22C55E]/50 font-mono text-sm uppercase tracking-widest">Mission Timeline Placeholder</span>
//         </div>
//     );
// }

// function ScientistSecretsPanel() {
//     return (
//         <div className="bg-[#0F172A]/50 border-2 border-dashed border-[#EF4444]/20 rounded-xl flex items-center justify-center p-8 h-32">
//             <span className="text-[#EF4444]/50 font-mono text-sm uppercase tracking-widest">Scientist Secrets Placeholder</span>
//         </div>
//     );
// }

// function QuizAndChallengesPanel() {
//     return (
//         <div className="bg-[#0F172A]/50 border-2 border-dashed border-[#F97316]/20 rounded-xl flex items-center justify-center p-8 h-32">
//             <span className="text-[#F97316]/50 font-mono text-sm uppercase tracking-widest">Quiz & Challenges Panel Placeholder</span>
//         </div>
//     );
// }

function ProgressFooter() {
    return (
        <div className="w-full bg-[#0B1020] border-t border-[#4CC9F0]/20 p-6 mt-8 flex items-center justify-center">
             <span className="text-gray-500 font-mono text-sm uppercase tracking-widest">Progress Footer Placeholder</span>
        </div>
    );
}

// --- Main Page Component (Step 1) ---
export default function OrbitalLabPage() {
    // Shared State for Lab Header
    const [lessonState, setLessonState] = useState<LessonState>({
        currentStep: 1,
        totalSteps: 6,
        lessonTitle: "How Satellites Observe Earth",
        lessonGoal: "Understand how raw space data becomes real-world insights"
    });

    const { unlockedStorySteps } = useLabStore();

    return (
        <div className="min-h-screen bg-[#050A14] overflow-x-hidden flex flex-col">
            {/* Step 2: Lab Header */}
            <LabHeader state={lessonState} />

            <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 space-y-6">
                
                {/* Top Section: Split View (STRICT VISIBILITY & GRID) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full relative z-10">
                    
                    {/* LEFT: Video Player (LessonPlayerSection) */}
                    <div className="w-full flex flex-col relative z-20" style={{ minHeight: '450px' }}>
                        <LessonPlayerSection className="w-full h-full shadow-2xl z-20" />
                    </div>

                    {/* RIGHT: Visualization Panel (Human/Satellite View) */}
                    <div className="w-full flex flex-col relative z-20" style={{ minHeight: '450px' }}>
                        <VisualizationPanel className="w-full h-full shadow-2xl z-20" />
                    </div>
                </div>

                {/* Middle Section: Data Journey & Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6">
                    <StoryModePanel />
                    <MissionTimelinePanel />
                </div>

                {/* Bottom Section: Interactive Modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ScientistSecretsPanel />
                    <QuizAndChallengesPanel />
                </div>
            </div>

            {/* Bottom Footer */}
            <ProgressFooter />
        </div>
    );
}
