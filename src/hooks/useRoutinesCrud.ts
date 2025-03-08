import { useState, useCallback } from "react";
import { Routine } from "@/types";
import { supabase } from "@/utils";
import { useAuthContext } from "@/context";

export const useRoutinesCrud = () => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [routine, setRoutine] = useState<Routine>({
    id: "",
    created_at: "",
    name: "",
    user_id: user.id,
  });

  const fetchRoutines = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: routines, error } = await supabase.from("routines").select(`
            *,
            routine_exercises (
                *,
                exercises(
                    *
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

      setRoutine(routine);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const PostRoutine = async (routineData: Routine) => {
    setLoading(true);
    setError(null);

    try {
      setRoutine((value) => ({ ...value, user_id: user.id }));

      const { data: routine, error } = await supabase
        .from("routines")
        .insert([routineData])
        .select();

      if (error) {
        throw error;
      }

      setRoutine(routine[0]);
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

      setRoutine(routine[0]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const DeleteRoutine = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("routines").delete().eq("id", id);

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
    routine,
    routines,
    fetchRoutines,
    fetchRoutineById,
    PostRoutine,
    PutRoutine,
    DeleteRoutine,
  };
};
