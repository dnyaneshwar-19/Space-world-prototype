
import React from 'react';
import { useLabStore } from '../../store/labStore';
import { Server, Radio, Database, Globe, CheckCircle, Lock } from 'lucide-react';
import { Button } from '../ui/button';

const STORY_STEPS = [
    { id: 1, title: 'Data Capture', icon: <Radio className="w-5 h-5" />, desc: 'Satellite sensors record raw binary data.' },
    { id: 2, title: 'Transmission', icon: <Server className="w-5 h-5" />, desc: 'Binary stream sent to ground stations via radio waves.' },
    { id: 3, title: 'Processing', icon: <Database className="w-5 h-5" />, desc: 'Algorithms convert raw bits into image pixels.' },
    { id: 4, title: 'Visualization', icon: <Globe className="w-5 h-5" />, desc: 'Data is mapped to coordinates for human analysis.' },
    { id: 5, title: 'Insight', icon: <CheckCircle className="w-5 h-5" />, desc: 'Real-world decisions made from space data.' },
];

export function StoryModePanel() {
    const { unlockedStorySteps, unlockStoryStep } = useLabStore();

    const handleStepClick = (id: number) => {
        // Simple logic: allow unlocking the next step if previous is unlocked
        // In a real app, this might be triggered by game events, but for "Click to unlock" requirement:
        const prevStepUnlocked = id === 1 || unlockedStorySteps.includes(id - 1);
        if (prevStepUnlocked && !unlockedStorySteps.includes(id)) {
            unlockStoryStep(id);
        }
    };

    return (
        <div className="bg-[#0F172A]/80 border border-[#A855F7]/30 rounded-xl p-6 shadow-lg h-full overflow-hidden flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#A855F7]/20 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-[#A855F7]" />
                </div>
                <div>
                     <h3 className="text-lg font-bold text-white font-['Orbitron']">Data Journey</h3>
                     <p className="text-xs text-gray-400">From Orbit to Insight</p>
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {STORY_STEPS.map((step, index) => {
                    const isUnlocked = unlockedStorySteps.includes(step.id);
                    const isNext = !isUnlocked && (step.id === 1 || unlockedStorySteps.includes(step.id - 1));

                    return (
                        <div 
                            key={step.id}
                            className={`relative p-4 rounded-lg border transition-all duration-300 ${
                                isUnlocked 
                                ? 'bg-[#A855F7]/10 border-[#A855F7]/50 cursor-pointer hover:bg-[#A855F7]/20' 
                                : isNext 
                                    ? 'bg-white/5 border-white/10 hover:border-white/30 cursor-pointer group' 
                                    : 'bg-black/20 border-white/5 opacity-50 cursor-not-allowed'
                            }`}
                            onClick={() => (isNext || isUnlocked) && handleStepClick(step.id)}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                    isUnlocked ? 'bg-[#A855F7] text-white' : 'bg-gray-800 text-gray-500'
                                }`}>
                                    {isUnlocked ? <CheckCircle className="w-4 h-4" /> : step.id}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className={`font-bold text-sm ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                                            {step.title}
                                        </h4>
                                        {!isUnlocked && !isNext && <Lock className="w-3 h-3 text-gray-600" />}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                        {step.desc}
                                    </p>
                                    
                                    {isNext && (
                                        <div className="mt-2 text-[10px] text-[#A855F7] animate-pulse font-mono uppercase tracking-widest">
                                            Click to Process
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Connector Line (Animated Signal Flow) */}
                            {index < STORY_STEPS.length - 1 && (
                                <div className="absolute left-8 bottom-[-16px] w-[2px] h-4 -z-10 bg-gray-800 overflow-hidden">
                                     {isUnlocked && unlockedStorySteps.includes(step.id + 1) && (
                                        <>
                                            {/* Solid Connection */}
                                            <div className="w-full h-full bg-[#A855F7]/30 absolute inset-0"></div>
                                            {/* Moving Packet Animation */}
                                            <div className="w-full h-1/2 bg-[#A855F7] absolute top-[-50%] animate-drop-packet"></div>
                                        </>
                                     )}
                                </div>
                            )}
                            
                            {/* Active Step Highlight Glow */}
                            {isNext && (
                                <div className="absolute inset-0 rounded-lg ring-1 ring-[#A855F7] ring-opacity-50 animate-pulse bg-[#A855F7]/5 pointer-events-none"></div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            {/* Legend / Status Footer */}
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
                <span>Signal Status:</span>
                 <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${unlockedStorySteps.length === STORY_STEPS.length ? 'bg-[#22C55E]' : 'bg-[#A855F7] animate-pulse'}`}></span>
                    {unlockedStorySteps.length === STORY_STEPS.length ? 'TRANSMISSION COMPLETE' : 'RECEIVING DATA...'}
                </div>
            </div>
        </div>
    );
}

// Add keyframe for drop-packet if not global
// Using style tag for scoped animation purely for this visual enhancement
const style = document.createElement('style');
style.innerHTML = `
  @keyframes drop-packet {
    0% { top: -50%; opacity: 0; }
    50% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  .animate-drop-packet {
    animation: drop-packet 1.5s infinite linear;
  }
`;
document.head.appendChild(style);
