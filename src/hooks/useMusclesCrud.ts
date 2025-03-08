import { useState, useCallback } from "react";
import { Muscle } from "@/types";
import { supabase } from "@/utils";

export const useMusclesCrud = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [muscle, setMuscle] = useState<Muscle | null>(null);
  const [muscles, setMuscles] = useState<Muscle[]>([]);

  const fetchMuscles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: muscles, error } = await supabase
        .from("muscles")
        .select("*");

      if (error) {
        throw error;
      }

      setMuscles(muscles);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMuscleById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data: muscle, error } = await supabase
        .from("muscles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setMuscle(muscle);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const PostMuscle = async (muscleData: Muscle) => {
    setLoading(true);
    setError(null);

    try {
      const { data: muscle, error } = await supabase
        .from("muscles")
        .insert([muscleData])
        .select();

      if (error) {
        throw error;
      }

      setMuscle(muscle[0]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const PutMuscle = async (id: string, muscleData: Muscle) => {
    setLoading(true);
    setError(null);

    try {
      const { data: muscle, error } = await supabase
        .from("muscles")
        .update(muscleData)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      setMuscle(muscle[0]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const DeleteMuscle = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("muscles").delete().eq("id", id);

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
    muscle,
    muscles,
    setMuscle,
    fetchMuscles,
    fetchMuscleById,
    PostMuscle,
    PutMuscle,
    DeleteMuscle,
  };
};
