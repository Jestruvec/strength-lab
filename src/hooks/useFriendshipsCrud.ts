import { useState, useCallback } from "react";
import { supabase } from "@/utils";
import { Friendship } from "@/types";

const TABLE_NAME = "friendships";

export const useFriendshipsCrud = () => {
  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const [friendship, setFriendship] = useState<Friendship | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFriendshipRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from(TABLE_NAME).select("*");

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

  const fetchFriendshipRequest = useCallback(async (id: string) => {
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

  const postFriendshipRequest = async (data: Friendship) => {
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

  const putFriendshipRequest = async (id: string, data: Friendship) => {
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

  const deleteFriendshipRequest = async (id: string) => {
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
    fetchFriendshipRequests,
    fetchFriendshipRequest,
    putFriendshipRequest,
    deleteFriendshipRequest,
    postFriendshipRequest,
  };
};

export default useFriendshipsCrud;
