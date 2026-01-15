
export interface TimelineEvent {
    time: number;
    action: 'pause' | 'log'; // expandable
    interactionId: string;
    mandatory: boolean;
}

export const LAB_TIMELINE: TimelineEvent[] = [
  {
    "time": 30,
    "action": "pause",
    "interactionId": "orbit_identification_1",
    "mandatory": true
  },
  {
    "time": 60,
    "action": "pause",
    "interactionId": "data_type_matching_2",
    "mandatory": true
  },
  {
    "time": 100,
    "action": "pause",
    "interactionId": "spectral_analysis_challenge_3",
    "mandatory": true
  },
  {
    "time": 140,
    "action": "pause",
    "interactionId": "final_scenario_4",
    "mandatory": true
  }
];
