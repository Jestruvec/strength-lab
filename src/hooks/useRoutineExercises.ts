import { useCallback, useState } from "react";
import { RoutineExercise } from "@/types";
import { supabase } from "@/utils";

export const useRoutineExercisesCrud = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routineExercise, setRoutineExercise] =
    useState<RoutineExercise | null>(null);
  const [routineExercises, setRoutineExercises] = useState<RoutineExercise[]>(
    []
  );

  const fetchRoutineExercises = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: routines, error } = await supabase.from("routine_exercises")
        .select(`
            *,
            exercises (*),
            routines (*)
            `);

      if (error) {
        throw error;
      }

      setRoutineExercises(routines);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutineExerciseById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data: routine, error } = await supabase
        .from("routine_exercises")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setRoutineExercise(routine);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const PostRoutineExercise = useCallback(
    async (routineExerciseData: RoutineExercise[]) => {
      setLoading(true);
      setError(null);

      try {
        const { data: routine, error } = await supabase
          .from("routine_exercises")
          .insert(routineExerciseData)
          .select();

        if (error) {
          throw error;
        }

        setRoutineExercise(routine[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const PutRoutineExercise = async (
    id: string,
    routineExerciseData: RoutineExercise
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { data: routine, error } = await supabase
        .from("routine_exercises")
        .update(routineExerciseData)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      setRoutineExercise(routine[0]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const DeleteRoutineExercise = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("routine_exercises")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    routineExercise,
    routineExercises,
    fetchRoutineExercises,
    fetchRoutineExerciseById,
    PostRoutineExercise,
    PutRoutineExercise,
    DeleteRoutineExercise,
  };
};
