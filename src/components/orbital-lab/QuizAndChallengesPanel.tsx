
import React, { useState } from 'react';
import { useLabStore } from '../../store/labStore';
import { Brain, Check, X, Award, RotateCcw, ArrowRight, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { LAB_QUIZZES } from '../../data/labQuizzes';

export function QuizAndChallengesPanel() {
    const { logQuizAttempt, setActiveInteraction, activeInteractionId, completeInteraction, setIsPlaying, unlockedStorySteps } = useLabStore();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [dragState, setDragState] = useState<Record<string, string | null>>({}); // targetId -> itemId
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);

    const activeQuiz = LAB_QUIZZES[currentQuestionIndex];

    // SYNC: Auto-load quiz based on Timeline Event
    React.useEffect(() => {
        if (activeInteractionId) {
            const quizIndex = LAB_QUIZZES.findIndex(q => q.id === activeInteractionId);
            if (quizIndex !== -1) {
                setCurrentQuestionIndex(quizIndex);
                // Reset state for new question
                setSelectedOption(null);
                setDragState({});
                setIsCorrect(null);
            }
        }
    }, [activeInteractionId]);

    const enableQuizMode = () => {
        if (activeInteractionId !== 'quiz-manual' && !activeInteractionId) {
            setActiveInteraction('quiz-manual');
        }
    };
    
    // Clear on unmount or complete
    React.useEffect(() => {
         return () => {
             if (activeInteractionId === 'quiz-manual') {
                 setActiveInteraction(null);
             }
         }
    }, [activeInteractionId, setActiveInteraction]);


    const handleOptionSelect = (optionId: string, valid: boolean) => {
        enableQuizMode();
        if (selectedOption || isCorrect !== null) return; 
        setSelectedOption(optionId);
        setIsCorrect(valid);
        
        if (valid) {
            setScore(s => s + 100);
            logQuizAttempt(activeQuiz.id, 100);
        } else {
            logQuizAttempt(activeQuiz.id, 0);
        }
    };

    const handleDragDrop = (itemId: string, targetId: string) => {
        enableQuizMode();
        if (isCorrect !== null) return; // Locked if submitted
        setDragState(prev => ({ ...prev, [targetId]: itemId }));
    };

    const submitDragDrop = () => {
        if (!activeQuiz.dragItems) return;
        const correctCount = activeQuiz.dragItems.every(item => dragState[item.matchesTargetId || ''] === item.id);
        setIsCorrect(correctCount);
        if (correctCount) {
             setScore(s => s + 150);
             logQuizAttempt(activeQuiz.id, 150);
        } else {
            logQuizAttempt(activeQuiz.id, 0);
        }
    };

    const handleNext = () => {
        // Reset manual mode when moving to next (optional, or keep it persisted)
        // If we want to keep "Freeze Frame" active, do NOT clear.
        // If we want to finish:
        if (currentQuestionIndex < LAB_QUIZZES.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setDragState({});
            setIsCorrect(null);
        } else {
            // Finished
            if (activeInteractionId === 'quiz-manual') {
                setActiveInteraction(null);
            }
        }
    };

    return (
        <div className="bg-[#0F172A]/80 border border-[#F97316]/30 rounded-xl p-6 shadow-lg h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F97316]/20 rounded-lg flex items-center justify-center">
                        <Brain className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <div>
                         <h3 className="text-lg font-bold text-white font-['Orbitron']">Training Module</h3>
                         <p className="text-xs text-gray-400">Tactical Knowledge Assessment</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-[#F97316]">{score} XP</div>
                </div>
            </div>

            {/* Quiz Content */}
            <div className="flex-1 bg-black/40 rounded-lg p-4 border border-white/5 flex flex-col justify-center min-h-[250px]">
                <h4 className="text-md text-white font-bold mb-4">{activeQuiz.question}</h4>
                
                {activeQuiz.type === 'drag_drop' ? (
                    <div className="space-y-6">
                         {/* Draggables Source */}
                         <div className="flex flex-wrap gap-2 justify-center p-2 bg-white/5 rounded-lg min-h-[50px]">
                             {activeQuiz.dragItems?.filter(item => !Object.values(dragState).includes(item.id)).map(item => (
                                 <div 
                                    key={item.id} 
                                    className="bg-[#F97316] text-black text-xs font-bold px-3 py-1.5 rounded cursor-grab active:cursor-grabbing shadow-lg"
                                    draggable
                                    onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id)}
                                 >
                                     {item.label}
                                 </div>
                             ))}
                             {activeQuiz.dragItems?.filter(item => !Object.values(dragState).includes(item.id)).length === 0 && (
                                 <span className="text-xs text-gray-500 italic self-center">All items placed</span>
                             )}
                         </div>

                         {/* Drop Targets */}
                         <div className="grid grid-cols-1 gap-2">
                             {activeQuiz.dragTargets?.map(target => {
                                 const occupiedItemId = dragState[target.id];
                                 const occupiedItem = activeQuiz.dragItems?.find(i => i.id === occupiedItemId);
                                 
                                 return (
                                     <div 
                                        key={target.id}
                                        className={`p-3 rounded border-2 border-dashed flex justify-between items-center transition-colors ${
                                            isCorrect === true ? 'border-[#22C55E] bg-[#22C55E]/10' :
                                            isCorrect === false ? 'border-[#EF4444] bg-[#EF4444]/10' :
                                            'border-white/20 bg-white/5'
                                        }`}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const id = e.dataTransfer.getData('text/plain');
                                            handleDragDrop(id, target.id);
                                        }}
                                     >
                                        <span className="text-xs text-gray-400 font-mono">{target.label}</span>
                                        {occupiedItem ? (
                                            <div className="bg-[#F97316] text-black text-xs font-bold px-2 py-1 rounded">
                                                {occupiedItem.label}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-white/20">Drop Here</span>
                                        )}
                                     </div>
                                 );
                             })}
                         </div>

                         {isCorrect === null && (
                             <Button onClick={submitDragDrop} className="w-full bg-white/10 hover:bg-white/20" disabled={Object.keys(dragState).length !== activeQuiz.dragTargets?.length}>
                                 Verify Configuration
                             </Button>
                         )}
                    </div>
                ) : (
                    /* Standard Choice UI */
                    <div className="space-y-3">
                        {activeQuiz.options?.map((opt) => (
                            <div 
                                key={opt.id}
                                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                                    selectedOption === opt.id 
                                        ? isCorrect
                                            ? 'bg-[#22C55E]/20 border-[#22C55E] text-white' 
                                            : 'bg-[#EF4444]/20 border-[#EF4444] text-white'
                                        : 'bg-[#0B1020] border-white/10 hover:border-[#F97316]/50 text-gray-300'
                                } ${selectedOption && selectedOption !== opt.id ? 'opacity-50' : ''}`}
                                onClick={() => handleOptionSelect(opt.id, opt.valid)}
                            >
                                <span>{opt.label}</span>
                                {selectedOption === opt.id && (
                                    isCorrect ? <Check className="w-4 h-4 text-[#22C55E]" /> : <X className="w-4 h-4 text-[#EF4444]" />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Feedback / Next */}
                {isCorrect !== null && (
                     <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in">
                        <p className={`text-xs mb-3 ${isCorrect ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                            {isCorrect ? "Correct! System Calibrated." : "Incorrect. Adjusting Parameters..."} <br/>
                            <span className="text-white opacity-80">{activeQuiz.explanation}</span>
                        </p>
                        
                        {/* Navigation Logic: Manual vs Triggered */}
                        {activeInteractionId === 'quiz-manual' ? (
                            // MANUAL MODE: Show Next/Finish
                            currentQuestionIndex < LAB_QUIZZES.length - 1 ? (
                                <Button onClick={handleNext} className="w-full bg-[#F97316] hover:bg-[#EA580C] text-black font-bold">
                                    Next Protocol <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <div className="flex items-center justify-center gap-2 text-[#22C55E] font-bold text-sm bg-[#22C55E]/10 px-3 py-2 rounded-lg border border-[#22C55E]/20 w-full">
                                    <Award className="w-4 h-4" /> Certification Complete
                                </div>
                            )
                        ) : (
                            // TRIGGERED MODE: Only Show Resume
                             activeInteractionId && LAB_QUIZZES.find(q => q.id === activeInteractionId) && (
                                <Button 
                                    className="w-full mt-2 bg-[#4CC9F0] hover:bg-[#4CC9F0]/90 text-black font-bold animate-pulse text-lg py-6"
                                    onClick={() => {
                                        completeInteraction(activeInteractionId);
                                        setIsPlaying(true);
                                    }}
                                >
                                    <Play className="w-4 h-4 mr-2" /> Continue Video
                                </Button>
                            )
                        )}
                    </div>
                )}
            </div>
            
            <div className="mt-4">
                 <div className="flex justify-between text-[10px] text-gray-500 mb-1 uppercase tracking-wider">
                    <span>Progress</span>
                    <span>{Math.round(((currentQuestionIndex + (isCorrect !== null ? 1 : 0)) / LAB_QUIZZES.length) * 100)}%</span>
                </div>
                <Progress value={((currentQuestionIndex + (isCorrect !== null ? 1 : 0)) / LAB_QUIZZES.length) * 100} className="h-1 bg-white/10" />
            </div>
        </div>
    );
}
