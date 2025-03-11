import { useState, useCallback } from "react";
import { supabase } from "@/utils";
import { UserProfile } from "@/types";

export const useUserProfileCrud = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
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
  }, []);

  const postProfile = async (userProfileData: UserProfile) => {
    setLoading(true);
    setError(null);

    try {
      const { data: profile, error } = await supabase
        .from("user_profile")
        .insert([userProfileData])
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

  const putProfile = async (
    userId: string,
    profileData: Partial<UserProfile>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { data: profile, error } = await supabase
        .from("user_profile")
        .upsert({ ...profileData, id: userId })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return profile;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("user_profile")
        .delete()
        .eq("id", userId);

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
    profile,
    loading,
    error,
    fetchProfile,
    putProfile,
    deleteProfile,
    postProfile,
  };
};

export default useUserProfileCrud;
