import { RoutineExercise } from "./";

export interface Routine {
  id: string;
  created_at: string;
  name: string;
  user_id: string;
  day: number;
  routine_exercises?: RoutineExercise[];
}
