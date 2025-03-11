import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "@/types";
import { storageService } from "@/services";
import { supabase } from "@/utils";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const storedUser = storageService.getItem("user");

    if (storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data: response, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      setUser(response.user);
      storageService.setItem("user", response.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://jestruvec.github.io/strength-lab/login",
        },
      });

      if (error) throw new Error(error.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const recoverPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;

      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) throw logoutError;

      setUser(null);
      storageService.removeItem("user");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    loading,
    error,
    user,
    login,
    logout,
    register,
    recoverPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
