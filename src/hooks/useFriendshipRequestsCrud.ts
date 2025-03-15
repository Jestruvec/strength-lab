import { useState, useCallback } from "react";
import { supabase } from "@/utils";
import { FriendshipRequest } from "@/types";

const TABLE_NAME = "friendship_requests";

export const useFriendshipRequestsCrud = () => {
  const [friendshipRequests, setFriendshipRequests] = useState<
    FriendshipRequest[]
  >([]);
  const [friendshipRequest, setFriendshipRequest] =
    useState<FriendshipRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFriendshipRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from("friendship_requests")
        .select(`
    *,
    user_profile!friendship_requests_from_fkey (*)    
  `);

      if (error) {
        throw error;
      }

      setFriendshipRequests(data);
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

      setFriendshipRequest(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const postFriendshipRequest = async (data: FriendshipRequest) => {
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

  const putFriendshipRequest = async (id: string, data: FriendshipRequest) => {
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
    friendshipRequest,
    friendshipRequests,
    loading,
    error,
    fetchFriendshipRequests,
    fetchFriendshipRequest,
    putFriendshipRequest,
    deleteFriendshipRequest,
    postFriendshipRequest,
  };
};

export default useFriendshipRequestsCrud;
