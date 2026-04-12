
export interface UserProfile {
    goal: string;
    experience: string;
    days_per_week: number;
    session_length: number; // in minutes
    equipment: string;
    injuries?: string | null;
    preferred_split: string;
}

export interface PlanOverview {
    goal: string;
    frequency: string;
    split: string;
    notes: string;
}

export interface Exercise {
    name: string;
    sets: number;
    reps: number;
    rest: number; // in seconds
    rpe: number; // Rate of Perceived Exertion
    notes?: string;
    alternatives?: string[]; // For variety or equipment limitations
}

export interface DaySchedule {
    day: string;
    focus: string;
    exercises: Exercise[];
}

export interface TrainingPlan {
    id: string;
    userId: string;
    overview: PlanOverview;
    weeklySchedule: DaySchedule[];
    progression: string;
    version: number;
    createdAt: string;
}