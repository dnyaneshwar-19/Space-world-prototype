
import { MISSION_TIMELINE_DATA } from '../data/missionTimelineData';
import { LAB_TIMELINE } from '../data/labTimeline';

/**
 * MOCK BACKEND SERVICE
 * 
 * This simulation layer demonstrates how the frontend would interact with a backend.
 * It uses simulated delays (Latency) to mimic network requests.
 * 
 * In a production app, these functions would use `fetch()` or `axios` 
 * to hit real endpoints like /api/v1/missions.
 */

const LATENCY_MS = 800; // Simulated network delay

export const mockApi = {
    /**
     * Fetch all historical missions.
     * Endpoint: GET /api/missions
     */
    fetchMissions: async () => {
        console.log('[MockAPI] fetching missions...');
        await new Promise(resolve => setTimeout(resolve, LATENCY_MS));
        return MISSION_TIMELINE_DATA;
    },

    /**
     * Fetch the interactive timeline events for the lab.
     * Endpoint: GET /api/lab/timeline
     */
    fetchLabTimeline: async () => {
        console.log('[MockAPI] fetching lab interactions...');
        await new Promise(resolve => setTimeout(resolve, LATENCY_MS / 2));
        return LAB_TIMELINE;
    },

    /**
     * Submit quiz results.
     * Endpoint: POST /api/lab/quiz/submit
     */
    submitQuizResult: async (quizId: string, score: number) => {
        console.log(`[MockAPI] submitting quiz ${quizId} score: ${score}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true, newXpTotal: 450 }; // Dummy response
    }
};
