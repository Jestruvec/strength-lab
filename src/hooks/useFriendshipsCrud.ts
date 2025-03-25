import { useState, useCallback } from "react";
import { supabase } from "@/utils";
import { Friendship } from "@/types";

const TABLE_NAME = "friendships";

export const useFriendshipsCrud = () => {
  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const [friendship, setFriendship] = useState<Friendship | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFriendships = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from(TABLE_NAME).select(`
        *,
        from_user:user_profile!from (*),
        to_user:user_profile!to (*)
    `);

      if (error) {
        throw error;
      }

      setFriendships(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFriendship = useCallback(async (id: string) => {
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

      setFriendship(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const postFriendship = async (data: Friendship) => {
    setLoading(true);
    setError(null);

    try {
      const { data: profile, error } = await supabase
        .from(TABLE_NAME)
        .insert([data])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return profile;
    } catch (error) {
      setError(error.mesage);
    } finally {
      setLoading(false);
    }
  };

  const putFriendship = async (id: string, data: Friendship) => {
    setLoading(true);
    setError(null);

    try {
      const { data: friendshipRequest, error } = await supabase
        .from(TABLE_NAME)
        .update(data)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      return friendshipRequest;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteFriendship = async (id: string) => {
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
    friendships,
    friendship,
    loading,
    error,
    fetchFriendships,
    fetchFriendship,
    putFriendship,
    deleteFriendship,
    postFriendship,
  };
};

export default useFriendshipsCrud;
