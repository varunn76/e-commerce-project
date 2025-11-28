/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userInfo } from "@/app/action";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const u = await userInfo();
      setUser(u);
      setLoading(false);
    }
    fetchUser();
  }, []);

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
      window.localStorage.setItem("username", data.user.name);

      router.push("/");
    } catch (err) {
      setError("Login error");
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.localStorage.setItem("username", "");

      router.push("/login");
      router.refresh();
    } catch (err) {
      console.log("Logout error:", err);
    }
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
