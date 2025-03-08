import { Routine } from "./Routine";

export interface UserRoutine {
  id: string;
  created_at: string;
  day: number;
  userId: string;
  routineId: string;
  routines?: Routine;
}
