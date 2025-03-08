import { useState, useCallback } from "react";
import { Exercise } from "@/types";
import { supabase } from "@/utils";

export const useExercisesCrud = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const fetchExercises = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: routines, error } = await supabase.from("exercises")
        .select(`
          *,
          exercise_main_muscles (*),
          exercise_secondary_muscles (*)
          `);

      if (error) {
        throw error;
      }

      setExercises(routines);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchExerciseById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data: routine, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setExercise(routine);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const PostExercise = async (exerciseData: Exercise) => {
    setLoading(true);
    setError(null);

    try {
      const { data: exercise, error } = await supabase
        .from("exercises")
        .insert([exerciseData])
        .select();

      if (error) {
        throw error;
      }

      setExercise(exercise[0]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const PutExercise = async (id: string, exerciseData: Exercise) => {
    setLoading(true);
    setError(null);

    try {
      const { data: exercise, error } = await supabase
        .from("exercises")
        .update(exerciseData)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      setExercises(exercise[0]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const DeleteExercise = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("exercises").delete().eq("id", id);

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
    exercise,
    exercises,
    setExercises,
    fetchExercises,
    fetchExerciseById,
    PostExercise,
    PutExercise,
    DeleteExercise,
  };
};
