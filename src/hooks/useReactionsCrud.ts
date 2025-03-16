import { useState, useCallback } from "react";
import { supabase } from "@/utils";
import { Reaction } from "@/types";

const TABLE_NAME = "reactions";

export const useReactionsCrud = () => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from(TABLE_NAME).select("*");

      if (error) {
        throw error;
      }

      setReactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReaction = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setReaction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const postReaction = async (data: Reaction) => {
    setLoading(true);
    setError(null);

    try {
      const { data: post, error } = await supabase
        .from(TABLE_NAME)
        .insert([data])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return post;
    } catch (error) {
      setError(error.mesage);
    } finally {
      setLoading(false);
    }
  };

  const putReaction = async (id: string, data: Reaction) => {
    setLoading(true);
    setError(null);

    try {
      const { data: post, error } = await supabase
        .from(TABLE_NAME)
        .update(data)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      return post;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteReaction = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

      if (error) {
        throw error;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    reactions,
    reaction,
    loading,
    error,
    fetchReactions,
    fetchReaction,
    putReaction,
    deleteReaction,
    postReaction,
  };
};

export default useReactionsCrud;
