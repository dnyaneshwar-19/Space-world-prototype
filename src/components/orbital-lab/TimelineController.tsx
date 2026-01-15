
import { useEffect, useRef } from 'react';
import { useLabStore } from '../../store/labStore';
import { LAB_TIMELINE } from '../../data/labTimeline';

export function TimelineController() {
    const { 
        currentVideoTime, 
        completedInteractions, 
        setIsPlaying, 
        setActiveInteraction,
        activeInteractionId 
    } = useLabStore();

    const lastTriggeredTime = useRef<number>(-1);

    useEffect(() => {
        // Optimization: Don't check if we are already in an interaction
        if (activeInteractionId) return;

        // Find a matching event that hasn't been completed
        const event = LAB_TIMELINE.find(e => {
            // Check if time matches closely (within 1 second window) to avoid skipping
            const timeDiff = Math.abs(currentVideoTime - e.time);
            const isTimeMatch = timeDiff < 0.5; // 500ms tolerance
            
            // Check if not already completed
            const isNotCompleted = !completedInteractions.includes(e.interactionId);
            
            // Check if valid "pause" action
            const isPauseAction = e.action === 'pause';

            return isTimeMatch && isNotCompleted && isPauseAction;
        });

        if (event) {
             // Prevent double triggering for the same second
            if (Math.floor(currentVideoTime) === lastTriggeredTime.current) return;
            
            console.log(`[TimelineController] Triggering interaction: ${event.interactionId} at ${event.time}s`);
            
            // Execute Logic
            setIsPlaying(false);
            setActiveInteraction(event.interactionId);
            
            lastTriggeredTime.current = Math.floor(currentVideoTime);
        }

    }, [currentVideoTime, completedInteractions, activeInteractionId, setIsPlaying, setActiveInteraction]);

    return null; // Logic-only component
}
