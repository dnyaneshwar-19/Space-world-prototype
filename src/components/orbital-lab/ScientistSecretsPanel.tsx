
import React from 'react';
import { useLabStore } from '../../store/labStore';
import { Microscope, Lock, Unlock, Zap, FileText } from 'lucide-react';
import { Button } from '../ui/button';

const SECRETS = [
    { 
        id: 1, 
        title: "The 'Invisible' Light", 
        preview: "Why eyes can't see heat...",
        fact: "Satellites use Infrared sensors (like night-vision goggles) to measure temperature from space. This allows them to see storm intensity even at night!",
        color: "#FACC15"
    },
    { 
        id: 2, 
        title: "Orbit Speed Limit", 
        preview: "How fast is too fast?",
        fact: "The ISS travels at 17,500 mph (28,000 km/h). If it slowed down, it would fall back to Earth. If it sped up, it would fly away into deep space!",
        color: "#22C55E"
    },
    { 
        id: 3, 
        title: "Ocean's Pulse", 
        preview: "Measuring sea level...",
        fact: "Radar altimeters on satellites can measure the height of the ocean surface to within an inch (3 cm), helping us track El Niño and global sea level rise.",
        color: "#4CC9F0"
    }
];

export function ScientistSecretsPanel() {
    const { unlockedSecrets, unlockSecret } = useLabStore();

    return (
        <div className="bg-[#0F172A]/80 border border-[#FACC15]/30 rounded-xl p-6 shadow-lg h-full overflow-hidden flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#FACC15]/20 rounded-lg flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-[#FACC15]" />
                </div>
                <div>
                     <h3 className="text-lg font-bold text-white font-['Orbitron']">Scientist Secrets</h3>
                     <p className="text-xs text-gray-400">Classified Notes (Hover to Decrypt)</p>
                </div>
            </div>

            <div className="space-y-4 flex-1 custom-scrollbar overflow-y-auto pr-2">
                {SECRETS.map((secret) => {
                    const isUnlocked = unlockedSecrets.includes(secret.id);

                    return (
                        <div 
                            key={secret.id}
                            className={`relative group cursor-pointer transition-all duration-500 overflow-hidden rounded-lg border ${
                                isUnlocked ? 'bg-[#FACC15]/10 border-[#FACC15]/50' : 'bg-black/40 border-white/10 hover:border-[#FACC15]/30'
                            }`}
                            onClick={() => !isUnlocked && unlockSecret(secret.id)}
                        >
                            {/* Locked Overlay / Header */}
                            <div className="p-4 flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-[#FACC15] text-black' : 'bg-gray-800 text-gray-500'}`}>
                                        {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-sm ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                                            {secret.title}
                                        </h4>
                                        <p className="text-xs text-gray-500">{secret.preview}</p>
                                    </div>
                                </div>
                                {!isUnlocked && <div className="text-[10px] text-[#FACC15] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-mono">Click to Hack</div>}
                            </div>

                            {/* Unlocked Content (Slide Down) */}
                            {isUnlocked && (
                                <div className="p-4 pt-0 border-t border-[#FACC15]/20 animate-in slide-in-from-top-2">
                                    <p className="text-sm text-gray-300 leading-relaxed mt-2">
                                        <Zap className="inline w-3 h-3 mr-1 text-[#FACC15]" />
                                        {secret.fact}
                                    </p>
                                </div>
                            )}

                            {/* Hover Scan Effect (for locked items) */}
                            {!isUnlocked && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FACC15]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
