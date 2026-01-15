
import React from 'react';
import { useLabStore } from '../../store/labStore';
import { Button } from '../ui/button';
import { Eye, Database, CheckCircle, ArrowRight } from 'lucide-react';
import { QuizAndChallengesPanel } from './QuizAndChallengesPanel';

export function InteractionOverlay() {
    const { activeInteractionId, setActiveInteraction, completeInteraction, setIsPlaying, setViewMode } = useLabStore();

    if (!activeInteractionId) return null;

    const handleComplete = () => {
        completeInteraction(activeInteractionId);
        setActiveInteraction(null);
        setIsPlaying(true);
    };

    // --- Content Renderers ---

    const renderDataTransmissionCheck = () => (
         <div className="bg-black/80 backdrop-blur-xl border border-[#FACC15]/30 p-8 rounded-2xl max-w-lg text-center shadow-[0_0_50px_rgba(250,204,21,0.2)]">
            <h2 className="text-2xl font-bold text-white mb-2 font-['Orbitron']">Signal Detected</h2>
            <p className="text-gray-300 mb-6">
                We are receiving a live stream from the Sentinel-2 satellite. The data stream needs to be stabilized.
            </p>
            <Button 
                className="bg-[#FACC15] text-black hover:bg-[#FACC15]/90 font-bold"
                onClick={handleComplete}
            >
                Establish Downlink
            </Button>
        </div>
    );

    const renderHumanSatelliteToggle = () => (
        <div className="bg-black/80 backdrop-blur-xl border border-[#4CC9F0]/30 p-8 rounded-2xl max-w-lg text-center shadow-[0_0_50px_rgba(76,201,240,0.2)]">
            <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#4CC9F0]/20 rounded-full flex items-center justify-center animate-pulse">
                    <Eye className="w-8 h-8 text-[#4CC9F0]" />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 font-['Orbitron']">Optical vs. Spectral</h2>
            <p className="text-gray-300 mb-8">
                Satellites capture more than just visible light. Switch to <strong>Spectral Mode</strong> to reveal hidden thermal and moisture data.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
                <Button 
                    variant="outline" 
                    className="h-auto py-4 border-[#22C55E]/50 hover:bg-[#22C55E]/10"
                    onClick={() => {
                        setViewMode('human');
                        // Allow exploring but don't auto-complete yet if they choose human
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-lg">👁️</span>
                        <span>Optical Feed</span>
                    </div>
                </Button>
                <Button 
                    variant="outline" 
                    className="h-auto py-4 border-[#4CC9F0]/50 hover:bg-[#4CC9F0]/10"
                    onClick={() => {
                        setViewMode('satellite');
                        handleComplete(); 
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-lg">📡</span>
                        <span>Spectral Feed</span>
                    </div>
                </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">Select Spectral Feed to analyze remote sensing data</p>
        </div>
    );

    const renderDataFlowStory = () => (
        <div className="bg-black/80 backdrop-blur-xl border border-[#A855F7]/30 p-8 rounded-2xl max-w-lg text-center shadow-[0_0_50px_rgba(168,85,247,0.2)]">
            <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#A855F7]/20 rounded-full flex items-center justify-center">
                    <Database className="w-8 h-8 text-[#A855F7]" />
                </div>
            </div>
             <h2 className="text-2xl font-bold text-white mb-2 font-['Orbitron']">Processing Data</h2>
            <p className="text-gray-300 mb-6">
                The satellite has finished its pass. Raw telemetry is being converted into usable imagery.
            </p>
            <div className="bg-[#0F172A] p-4 rounded-lg border border-white/10 mb-6 text-left font-mono text-sm text-[#A855F7]">
                {'>'} BUFFERING FRAMES... OK<br/>
                {'>'} APPLYING RADIOMETRIC CORRECTION... OK<br/>
                {'>'} GENERATING PREVIEW...
            </div>
             <Button 
                className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white"
                onClick={handleComplete}
            >
                Visualize Result <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );

    const renderFinalInsight = () => (
         <div className="bg-black/80 backdrop-blur-xl border border-[#22C55E]/30 p-8 rounded-2xl max-w-lg text-center shadow-[0_0_50px_rgba(34,197,94,0.2)]">
            <h2 className="text-2xl font-bold text-white mb-2 font-['Orbitron']">Mission Accomplished</h2>
            <p className="text-gray-300 mb-6">
                You've successfully tracked a satellite pass, processed the data, and analyzed the spectral layers.
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-6">
                 <div className="bg-white/5 p-2 rounded">Capturing</div>
                 <div className="bg-white/5 p-2 rounded">Processing</div>
                 <div className="bg-[#22C55E]/20 text-[#22C55E] p-2 rounded border border-[#22C55E]/50">Analyzing</div>
            </div>
            <Button 
                className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
                onClick={handleComplete}
            >
                Return to Dashboard
            </Button>
        </div>
    );

    const renderDefault = () => (
        <div className="bg-black/90 p-8 rounded-xl border border-white/20 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Interaction Point Reached</h3>
            <p className="text-gray-400 mb-6">Complete this step to continue logic.</p>
            <Button onClick={handleComplete}>Continue Mission</Button>
        </div>
    );

    // --- Switcher ---
    let content;
    
    // Check if it's a Quiz ID (starts with orbit_, data_, spectral_, final_)
    const isQuizInteraction = [
        'orbit_identification_1', 
        'data_type_matching_2', 
        'spectral_analysis_challenge_3',
        'final_scenario_4'
    ].includes(activeInteractionId);

    if (isQuizInteraction) {
        // Render the Quiz Panel directly over the video for immediate interaction
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300 p-4">
                <div className="w-full max-w-2xl h-[90%] max-h-[500px] relative shadow-[0_0_50px_rgba(249,115,22,0.3)]">
                    <QuizAndChallengesPanel /> 
                </div>
            </div>
        );
    }

    switch(activeInteractionId) {
        case 'data_transmission_check': // Keeping for legacy safety
            content = renderDataTransmissionCheck();
            break;
        case 'human_vs_satellite_toggle': // Keeping for legacy safety
            content = renderHumanSatelliteToggle();
            break;
        // New timeline doesn't use these, but good to keep as fallbacks
        default:
             // If we have an ID but it's not handled above or a quiz, standard fallback
            content = renderDefault();
    }

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            {content}
        </div>
    );
}
