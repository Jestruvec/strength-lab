import { RoutineExercise } from "./";

export interface Routine {
  id: string;
  created_at: string;
  name: string;
  user_id: string;
  routine_exercises?: RoutineExercise[];
}
