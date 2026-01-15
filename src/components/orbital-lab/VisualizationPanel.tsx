
import React, { useState } from 'react';
import { useLabStore } from '../../store/labStore';
import { Eye, Satellite, CloudRain, Thermometer, Info, Layers, ChevronDown, ChevronUp, Snowflake, Wind } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export function VisualizationPanel({ className }: { className?: string }) {
    const { viewMode, setViewMode, unlockedStorySteps, activeInteractionId } = useLabStore();
    const isOrbitQuiz = activeInteractionId === 'orbit_identification_1';
    const isDataMatchQuiz = activeInteractionId === 'data_type_matching_2';
    const isSpectralQuiz = activeInteractionId === 'spectral_analysis_challenge_3';
    const isFinalScenario = activeInteractionId === 'final_scenario_4';

    const [isLegendOpen, setIsLegendOpen] = useState(true);
    
    // Duplicate removed
    
    // Layer Visibility State (Local)
    const [layers, setLayers] = useState({
        heat: true,
        clouds: true,
        storms: true,
        ice: true
    });

    const toggleLayer = (key: keyof typeof layers) => {
        setLayers(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Derived Visual States from Story Mode
    const isTransmitting = unlockedStorySteps.includes(2) && !unlockedStorySteps.includes(5); // Active during mid-story
    const isProcessing = unlockedStorySteps.includes(3);
    const hasInsight = unlockedStorySteps.includes(5);
    
    // Derived Visual State from Quiz
    const isQuizActive = activeInteractionId?.includes('quiz');

    // Mock Data for Satellite Layers (SVG Overlay)
    const SatelliteOverlay = () => (
        <div className="absolute inset-0 pointer-events-none fade-in duration-1000">
            {/* Heat Map Layer (Gradient) */}
            {layers.heat && (
                <div className={`absolute inset-0 bg-gradient-to-br from-red-500/10 via-yellow-500/10 to-blue-500/10 mix-blend-overlay transition-all duration-1000 ${isProcessing ? 'opacity-80' : 'opacity-40'}`}></div>
            )}
            
            {/* Cloud Data Points */}
            <svg className="absolute inset-0 w-full h-full opacity-80" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Orbit Path - Highlighted during Data Capture (Step 1) */}
                <path 
                    d="M -10 60 Q 50 20 110 60" 
                    stroke="rgba(255,255,255,0.3)" 
                    strokeWidth={unlockedStorySteps.includes(1) ? "1" : "0.5"} 
                    fill="none" 
                    strokeDasharray="3 3" 
                    className="transition-all duration-500"
                />
                
                {/* Moving Satellite (Simulated) */}
                <circle cx="0" cy="0" r="1.5" fill="#4CC9F0" className={`${isQuizActive ? '' : 'animate-ping'}`}>
                    {!isQuizActive && (
                        <animateMotion 
                            dur="10s" 
                            repeatCount="indefinite"
                            path="M -10 60 Q 50 20 110 60"
                        />
                    )}
                </circle>
                <circle cx="0" cy="0" r="0.8" fill="white">
                     {!isQuizActive && (
                         <animateMotion 
                            dur="10s" 
                            repeatCount="indefinite"
                            path="M -10 60 Q 50 20 110 60"
                        />
                     )}
                </circle>

                {/* Simulated Data Scans */}
                {layers.storms && (
                    <path d="M 20 80 Q 50 50 80 80" stroke="#FACC15" strokeWidth="0.2" fill="none" className="opacity-50" />
                )}
                {layers.ice && (
                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.2" strokeDasharray="1 1" />
                )}
                
                {/* Signal Transmission Overlay (Step 2) */}
                {isTransmitting && (
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#4CC9F0" strokeWidth="0.5" strokeDasharray="2 2" className="animate-pulse" />
                )}
                
                {!isTransmitting && (
                    <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(76, 201, 240, 0.2)" strokeWidth="0.2" />
                )}

                {/* Final Insight Highlight (Step 5) */}
                {hasInsight && (
                    <circle cx="50" cy="50" r="20" stroke="#22C55E" strokeWidth="0.2" fill="none" className="animate-ping" opacity="0.2" />
                )}

                {/* --- INTERACTION 2: Data Match Visuals --- */}
                {/* Vegetation Patches (Appear when Vegetation is matched/discussed) */}
                {(isDataMatchQuiz || layers.heat) && (
                     <path d="M 30 50 Q 40 40 50 50 T 70 50" stroke="#22C55E" strokeWidth="2" fill="none" opacity={isDataMatchQuiz ? 0.8 : 0.3} className="animate-pulse" />
                )}

                {/* --- INTERACTION 4: Final Scenario Visuals --- */}
                {isFinalScenario && (
                    <>
                         {/* Cyclone Icon */}
                         <g transform="translate(65, 65)">
                             <path d="M 0 0 Q 5 -5 10 0 T 20 0" stroke="#FACC15" strokeWidth="1" fill="none" className="animate-spin origin-center" />
                             <circle r="3" fill="#EF4444" className="animate-ping" />
                         </g>

                         {/* LEO Constellation Grid (Fast Moving) */}
                         <line x1="0" y1="20" x2="100" y2="80" stroke="#4CC9F0" strokeWidth="0.2" strokeDasharray="2 2" className="animate-pulse" />
                         <line x1="0" y1="40" x2="100" y2="20" stroke="#4CC9F0" strokeWidth="0.2" strokeDasharray="2 2" className="animate-pulse" />
                         <line x1="20" y1="0" x2="80" y2="100" stroke="#4CC9F0" strokeWidth="0.2" strokeDasharray="2 2" className="animate-pulse" />
                    </>
                )}
            </svg>
        </div>
    );

    return (
        <div style={{ minHeight: '450px' }} className={`relative bg-[#0F172A] rounded-xl overflow-hidden shadow-2xl border transition-all duration-300 group ${className} ${isQuizActive ? 'border-[#F97316] ring-2 ring-[#F97316]/20' : 'border-white/10'}`}>
           
           {/* Main Visual Content */}
            <div className="absolute inset-0 z-0">
                {/* Base Human Image */}
                <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop" 
                    alt="Earth View" 
                    className={`w-full h-full object-cover transition-all duration-700 
                        ${viewMode === 'satellite' ? 'filter grayscale brightness-50 contrast-125' : ''} 
                    `}
                />
                
                {/* Satellite Overlay (Visual Only) */}
                {viewMode === 'satellite' && <SatelliteOverlay />}
            </div>

            {/* --- STRICT HUD FIX START --- */}
            {/* The Unified Vertical Stack Container */}
            {/* User Real Fix 2: HUD container is pointer-events-auto */}
            <div className="absolute top-4 left-4 z-50 flex flex-col gap-3 max-w-[280px] md:max-w-[320px] pointer-events-auto transition-all duration-300 hudContainer">
                
                {/* 1. View Mode Toggles (Top Priority) */}
                <div className="bg-black/90 backdrop-blur-xl p-1.5 rounded-xl border border-white/10 flex gap-1 shadow-2xl relative z-50 pointer-events-auto cursor-auto">
                    <Button 
                        variant="ghost"
                        size="sm"
                        style={{ pointerEvents: 'auto' }}
                        className={`h-8 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer relative z-50 ${
                            viewMode === 'human' 
                            ? 'bg-white text-black shadow-sm' 
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                        onClick={(e: { stopPropagation: () => void; }) => {
                            e.stopPropagation();
                            setViewMode('human');
                        }}
                    >
                        <Eye className="w-3.5 h-3.5 sm:mr-2" />
                        <span className="hidden sm:inline">Optical</span>
                    </Button>
                    <Button 
                         variant="ghost"
                         size="sm"
                         style={{ pointerEvents: 'auto' }}
                         className={`h-8 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer relative z-50 ${
                            viewMode === 'satellite' 
                            ? 'bg-[#4CC9F0] text-black shadow-[0_0_10px_rgba(76,201,240,0.3)]' 
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                         }`}
                         onClick={(e: { stopPropagation: () => void; }) => {
                             e.stopPropagation();
                             setViewMode('satellite');
                         }}
                    >
                        <Satellite className="w-3.5 h-3.5 sm:mr-2" />
                        <span className="hidden sm:inline">Spectral</span>
                    </Button>
                </div>

                {/* 2. Live Geo-Feed Status */}
                <div className="bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-[#4CC9F0]/30 shadow-lg self-start flex items-center gap-3 w-fit max-w-full">
                     <span className="relative flex h-2 w-2 flex-shrink-0">
                          <span className={`absolute inline-flex h-full w-full rounded-full bg-[#4CC9F0] opacity-75 ${isQuizActive ? '' : 'animate-ping'}`}></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4CC9F0]"></span>
                     </span>
                     <span className="text-xs font-bold text-[#4CC9F0] font-['Orbitron'] tracking-wide truncate">
                        {isQuizActive ? 'ANALYSIS MODE' : 'LIVE GEO-FEED'}
                    </span>
                </div>

                {/* 3. Layer Controls (In Satellite Mode) */}
                 {viewMode === 'satellite' && (
                    <div className="bg-black/80 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden w-full max-w-full transition-all duration-300 relative z-50">
                        <div 
                            className="flex items-center justify-between p-2 cursor-pointer hover:bg-white/5"
                            style={{ pointerEvents: 'auto' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLegendOpen(!isLegendOpen);
                            }}
                            role="button"
                            aria-expanded={isLegendOpen}
                        >
                            <span className="text-[10px] font-bold text-gray-300 uppercase flex items-center gap-2 truncate">
                                <Layers className="w-3 h-3 text-[#4CC9F0] flex-shrink-0" /> 
                                <span className="truncate">Active Layers</span>
                            </span>
                            {isLegendOpen ? <ChevronUp className="w-3 h-3 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-3 h-3 text-gray-500 flex-shrink-0" />}
                        </div>
                        
                        {isLegendOpen && (
                            <div className="p-2 space-y-2 border-t border-white/10">
                                <div className="flex items-center justify-between text-[10px] text-gray-400" onClick={(e) => e.stopPropagation()}>
                                    <span className="flex items-center gap-2 truncate">
                                        <Thermometer className="w-3 h-3 text-red-400 flex-shrink-0" /> <span className="truncate">Thermal</span>
                                    </span>
                                    <input type="checkbox" checked={layers.heat} onChange={() => toggleLayer('heat')} style={{ pointerEvents: 'auto' }} className="accent-[#4CC9F0] cursor-pointer" />
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-gray-400" onClick={(e) => e.stopPropagation()}>
                                    <span className="flex items-center gap-2 truncate">
                                        <CloudRain className="w-3 h-3 text-blue-400 flex-shrink-0" /> <span className="truncate">Moisture</span>
                                    </span>
                                    <input type="checkbox" checked={layers.clouds} onChange={() => toggleLayer('clouds')} style={{ pointerEvents: 'auto' }} className="accent-[#4CC9F0] cursor-pointer" />
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-gray-400" onClick={(e) => e.stopPropagation()}>
                                    <span className="flex items-center gap-2 truncate">
                                        <Wind className="w-3 h-3 text-yellow-400 flex-shrink-0" /> <span className="truncate">Storms</span>
                                    </span>
                                    <input type="checkbox" checked={layers.storms} onChange={() => toggleLayer('storms')} style={{ pointerEvents: 'auto' }} className="accent-[#4CC9F0] cursor-pointer" />
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-gray-400" onClick={(e) => e.stopPropagation()}>
                                    <span className="flex items-center gap-2 truncate">
                                        <Snowflake className="w-3 h-3 text-white flex-shrink-0" /> <span className="truncate">Cryosphere</span>
                                    </span>
                                    <input type="checkbox" checked={layers.ice} onChange={() => toggleLayer('ice')} style={{ pointerEvents: 'auto' }} className="accent-[#4CC9F0] cursor-pointer" />
                                </div>
                            </div>
                        )}
                    </div>
                 )}

                 {/* 4. Data Readouts (Stacked inside HUD) */}
                 {viewMode === 'satellite' && isLegendOpen && (
                    <div className="flex flex-col gap-1.5 w-full animate-in slide-in-from-left-2 duration-300">
                        {layers.heat && (
                             <div className="bg-black/60 backdrop-blur-sm p-1.5 rounded border border-[#FACC15]/30 flex items-center gap-2 overflow-hidden">
                                <Thermometer className="w-3 h-3 text-[#FACC15] flex-shrink-0" />
                                <span className="text-[10px] font-mono text-[#FACC15] truncate">TEMP: SURF_HEAT_IDX_22</span>
                             </div>
                        )}
                        {layers.clouds && (
                             <div className="bg-black/60 backdrop-blur-sm p-1.5 rounded border border-[#4CC9F0]/30 flex items-center gap-2 overflow-hidden">
                                <CloudRain className="w-3 h-3 text-[#4CC9F0] flex-shrink-0" />
                                <span className="text-[10px] font-mono text-[#4CC9F0] truncate">PRECIP: STORM_CELL_TRACKING</span>
                             </div>
                        )}
                    </div>
                 )}
            </div>
            
            {/* Quiz Action Helper - Absolute Centered */}
            {isQuizActive && viewMode === 'satellite' && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F97316]/90 text-white text-xs font-bold px-4 py-2 rounded-full animate-bounce shadow-lg pointer-events-none z-40 whitespace-nowrap">
                    Use this view to answer!
                </div>
            )}
            
            {/* Interaction 3: Spectral Mode Challenge Warning */}
            {isSpectralQuiz && viewMode === 'human' && (
                 <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 text-center animate-in fade-in">
                     <div>
                         <Eye className="w-12 h-12 text-[#EF4444] mx-auto mb-4" />
                         <h3 className="text-xl font-bold text-white mb-2">Optical Sensors Ineffective</h3>
                         <p className="text-gray-300 mb-4">Human eyes cannot detect cloud top temperatures or vegetation stress.</p>
                         <p className="text-[#4CC9F0] font-bold animate-pulse">Switch to Spectral Mode related to Heat/Thermal</p>
                     </div>
                 </div>
            )}
        </div>
    );
}
