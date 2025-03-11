import { Muscle } from "./";

export interface Exercise {
  id: string;
  created_at: string;
  name: string;
  description: string;
  imgUrl: string;
  unilateral: boolean;
  variant: string;
  steps: string[];
  exercise_muscles: ExerciseMuscle[];
}

interface ExerciseMuscle {
  id: string;
  created_at: string;
  exerciseId: string;
  muscleId: string;
  muscles: Muscle;
}
