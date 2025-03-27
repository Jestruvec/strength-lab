import { useState, useCallback } from "react";
import { Routine } from "@/types";
import { supabase } from "@/utils";

export const useRoutinesCrud = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);

  const fetchRoutines = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: routines, error } = await supabase.from("routines").select(`
            *,
            routine_exercises (
                *,
                exercises(
                    *,
                    exercise_muscles (
                      *,
                      muscles (
                      *
                      )
                    )
                )
            )`);

      if (error) {
        throw error;
      }

      setRoutines(routines);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRoutineById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data: routine, error } = await supabase
        .from("routines")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setRoutines([routine]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const PostRoutine = async (routineData: Routine): Promise<Routine[]> => {
    setLoading(true);
    setError(null);

    try {
      const { data: routine, error } = await supabase
        .from("routines")
        .insert([routineData])
        .select();

      if (error) {
        throw error;
      }

      return routine;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const PutRoutine = async (id: string, routineData: Routine) => {
    setLoading(true);
    setError(null);

    try {
      const { data: routine, error } = await supabase
        .from("routines")
        .update(routineData)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      return routine;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoutine = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("routines").delete().eq("id", id);

      if (error) {
        throw error;
      }

      setRoutines(routines.filter((routine) => routine.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    routines,
    fetchRoutines,
    fetchRoutineById,
    PostRoutine,
    PutRoutine,
    deleteRoutine,
  };
};
