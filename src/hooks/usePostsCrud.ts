import { useState, useCallback } from "react";
import { supabase } from "@/utils";
import { Post } from "@/types";

const TABLE_NAME = "posts";

export const usePostsCrud = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from(TABLE_NAME).select(`*,
            user_profile (*)
        `);

      if (error) {
        throw error;
      }

      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPost = useCallback(async (id: string) => {
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

      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const postPost = async (data: Post) => {
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

  const putPost = async (id: string, data: Post) => {
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

  const deletePost = async (id: string) => {
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
    posts,
    post,
    loading,
    error,
    fetchPosts,
    fetchPost,
    putPost,
    deletePost,
    postPost,
  };
};

export default usePostsCrud;
