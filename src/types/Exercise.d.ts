export interface Exercise {
  id: string;
  created_at: string;
  name: string;
  description: string;
  imgUrl: string;
  unilateral: boolean;
  variant: string;
  steps: string[];
  exercise_main_muscles: ExerciseMainMuscle[];
  exercise_secondary_muscles: ExerciseMainMuscle[];
}

interface ExerciseMainMuscle {
  id: string;
  created_at: string;
  exerciseId: string;
  muscleId: string;
}
