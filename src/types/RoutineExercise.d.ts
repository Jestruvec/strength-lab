import { Exercise } from "./";

export interface RoutineExercise {
  id: string;
  created_at: string;
  routineId: string;
  exerciseId: string;
  sets?: number;
  reps?: number;
  duration?: number;
  details?: string;
  exercises?: Exercise;
}
