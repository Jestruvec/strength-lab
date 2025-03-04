import { useState, useCallback } from "react";
import { supabase } from "@/utils";

export const useUserRoutinesCrud = () => {
  const [userRoutines, setUserRoutines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoiza fetchUserRoutines con useCallback
  const fetchUserRoutines = useCallback(async () => {
    try {
      setLoading(true);

      const { data: user_routines, error } = await supabase
        .from("user_routines")
        .select("*, routines(*, routine_exercises(*, exercises(*)))");

      if (error) {
        throw error;
      }

      setUserRoutines(user_routines);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Sin dependencias, ya que no depende de nada externo

  return {
    userRoutines,
    loading,
    error,
    fetchUserRoutines, // Devuelve la función memoizada
  };
};
