import { useState } from "react";
import { supabase } from "@/utils";
import { UserProfile } from "@/types";

export const useUserProfileCrud = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const upsertProfile = async (
    userId: string,
    profileData: Partial<UserProfile>
  ) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_profile")
        .upsert({ ...profileData, id: userId })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async (userId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("user_profile")
        .delete()
        .eq("id", userId);

      if (error) {
        throw error;
      }

      setProfile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    upsertProfile,
    deleteProfile,
  };
};

export default useUserProfileCrud;
