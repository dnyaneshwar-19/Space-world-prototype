
export interface QuizOption {
    id: string;
    label: string;
    valid: boolean;
}

export interface DragItem {
    id: string;
    label: string;
    type: string; // 'satellite' | 'data'
    matchesTargetId?: string; // The ID of the target it belongs to
}

export interface DragTarget {
    id: string;
    label: string;
    accepts: string[]; // List of item types or specific IDs
}

export interface LabQuiz {
    id: string;
    type: 'choice' | 'drag_drop' | 'input';
    question: string;
    options?: QuizOption[];
    dragItems?: DragItem[];
    dragTargets?: DragTarget[];
    explanation: string;
    points: number;
}

export const LAB_QUIZZES: LabQuiz[] = [
    {
        id: 'orbit_identification_1',
        type: 'choice',
        question: "Which orbit is typically used by weather satellites to monitor global weather patterns continuously from a fixed position?",
        options: [
            { id: 'leo', label: 'Low Earth Orbit (LEO)', valid: false },
            { id: 'meo', label: 'Medium Earth Orbit (MEO)', valid: false },
            { id: 'geo', label: 'Geostationary Orbit (GEO)', valid: true },
        ],
        explanation: "GEO (Geostationary Orbit) allows satellites to match Earth's rotation, hovering over the same spot to provide continuous monitoring of weather systems.",
        points: 100
    },
    {
        id: 'data_type_matching_2',
        type: 'drag_drop',
        question: "Match the data type to the correct satellite capability.",
        dragItems: [
            { id: 'temp_data', label: 'Thermal Heat Map', type: 'data', matchesTargetId: 'weather_sat' },
            { id: 'veg_index', label: 'Vegetation Health', type: 'data', matchesTargetId: 'eo_sat' },
            { id: 'voice_comm', label: 'Voice Signal', type: 'data', matchesTargetId: 'comm_sat' }
        ],
        dragTargets: [
            { id: 'weather_sat', label: 'Weather Satellite', accepts: ['temp_data'] },
            { id: 'eo_sat', label: 'Earth Obs. Satellite', accepts: ['veg_index'] },
            { id: 'comm_sat', label: 'Comms. Satellite', accepts: ['voice_comm'] }
        ],
        explanation: "Different satellites carry specialized sensors. Weather satellites track heat/storms, Earth Observation (EO) satellites use spectral bands for vegetation, and Comms satellites relay signals.",
        points: 150
    },
    {
        id: 'spectral_analysis_challenge_3',
        type: 'choice',
        question: "A cyclone is forming. You need to identify cloud top temperatures to predict severity. Which view mode should you use?",
        options: [
            { id: 'optical', label: 'Optical (Human Eye)', valid: false },
            { id: 'thermal', label: 'Spectral (Thermal Infrared)', valid: true },
            { id: 'radar', label: 'Radar Altimetry', valid: false },
        ],
        explanation: "Thermal Infrared sensors in Spectral Mode can see the temperature of cloud tops, which helps estimate storm intensity even at night.",
        points: 100
    },
     {
        id: 'final_scenario_4',
        type: 'choice',
        question: "Scenario: A distress signal is detected in the mid-Atlantic during the storm. Which satellite orbit provides the FASTEST relay for this emergency signal?",
        options: [
            { id: 'geo_relay', label: 'GEO (Wide Coverage)', valid: false },
            { id: 'leo_constellation', label: 'LEO Constellation (Low Latency)', valid: true },
            { id: 'deep_space', label: 'Deep Space Network', valid: false },
        ],
        explanation: "LEO constellations (like Starlink or Iridium) are much closer to Earth (500-2000km) compared to GEO (36,000km), providing the lowest latency for emergency communications.",
        points: 200
    }
];
