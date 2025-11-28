/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthUser } from "@/types/product";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<AuthUser | null>(null);
  const pathname = usePathname();

  const loadUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/user", {
        credentials: "include",
      });
      const data = await res.json();
      setUser(data.user || null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const signup = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Signup error");
    } finally {
      setLoading(false);
    }
  };

  const login = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      await loadUser();

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Login error");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await loadUser();
    router.push("/login");
  };

  return {
    login,
    signup,
    logout,
    loading,
    error,
    user,
  };
}
