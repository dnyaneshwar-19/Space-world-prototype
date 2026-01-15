import { create } from 'zustand';

// --- State Types ---
interface LabState {
    // Media State
    currentVideoTime: number;
    videoDuration: number;
    isPlaying: boolean;
    
    // Progress State
    completedInteractions: string[]; // IDs of finished interactions
    unlockedStorySteps: number[];    // IDs of unlocked story segments
    progressPercentage: number;
    
    // Quiz State
    quizAttempts: Record<string, number>; // quizId -> attempt count
    
    // View State
    viewMode: 'human' | 'satellite';
    
    // Actions
    updateVideoTime: (time: number) => void;
    setVideoDuration: (duration: number) => void;
    setIsPlaying: (playing: boolean) => void;
    completeInteraction: (interactionId: string) => void;
    unlockStoryStep: (stepId: number) => void;
    setViewMode: (mode: 'human' | 'satellite') => void;
    logQuizAttempt: (quizId: string, score: number) => void;
    
    // Secrets
    unlockedSecrets: number[];
    unlockSecret: (secretId: number) => void;

    // Interaction Flow
    activeInteractionId: string | null;
    setActiveInteraction: (id: string | null) => void;
    
    // Mission State
    focusedMissionId: string | null;
    setFocusedMission: (missionId: string | null) => void;

    // Hydration
    hasHydrated: boolean;
    setHasHydrated: (hydrated: boolean) => void;
}

// --- Store Implementation ---
import { persist, createJSONStorage } from 'zustand/middleware';

// --- Store Implementation ---
export const useLabStore = create<LabState>()(
    persist(
        (set, get) => ({
            // Initial State
            currentVideoTime: 0,
            videoDuration: 0,
            isPlaying: false,
            completedInteractions: [],
            unlockedStorySteps: [1], // Step 1 always unlocked
            progressPercentage: 0,
            quizAttempts: {},
            viewMode: 'human',
            activeInteractionId: null,
            unlockedSecrets: [],
            hasHydrated: false,
            focusedMissionId: null,
            
            // Actions
            setHasHydrated: (val) => set({ hasHydrated: val }),
            updateVideoTime: (time) => set({ currentVideoTime: time }),
            
            setVideoDuration: (duration) => set({ videoDuration: duration }),
            
            setIsPlaying: (playing) => set({ isPlaying: playing }),

            setFocusedMission: (missionId) => set({ focusedMissionId: missionId }),

            completeInteraction: (id) => {
                const { completedInteractions } = get();
                if (!completedInteractions.includes(id)) {
                    set({ 
                        completedInteractions: [...completedInteractions, id],
                        activeInteractionId: null 
                    });
                } else {
                     set({ activeInteractionId: null });
                }
            },

            unlockStoryStep: (stepId) => {
                const { unlockedStorySteps } = get();
                if (!unlockedStorySteps.includes(stepId)) {
                    set({ unlockedStorySteps: [...unlockedStorySteps, stepId] });
                }
            },

            setViewMode: (mode) => set({ viewMode: mode }),

            unlockSecret: (secretId) => {
                const { unlockedSecrets } = get();
                if (!unlockedSecrets.includes(secretId)) {
                    set({ unlockedSecrets: [...unlockedSecrets, secretId] });
                }
            },

            logQuizAttempt: (quizId, score) => {
                const { quizAttempts } = get();
                set({ 
                    quizAttempts: {
                        ...quizAttempts,
                        [quizId]: (quizAttempts[quizId] || 0) + 1
                    }
                });
            },

            setActiveInteraction: (id) => set({ activeInteractionId: id })
        }),
        {
            name: 'orbital-lab-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                // Only persist progress-related state, NOT player state like isPlaying
                currentVideoTime: state.currentVideoTime,
                completedInteractions: state.completedInteractions,
                quizAttempts: state.quizAttempts,
                unlockedSecrets: state.unlockedSecrets,
                unlockedStorySteps: state.unlockedStorySteps,
                viewMode: state.viewMode
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHasHydrated(true);
                }
            }
        }
    )
);
