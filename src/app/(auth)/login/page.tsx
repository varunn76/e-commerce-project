"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const { login, loading, error: serverError } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let newErrors: any = {};

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    await login(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-md border border-border bg-card text-card-foreground">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                className="bg-background border-input"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                className="bg-background border-input"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
            {serverError && (
              <p className="text-red-600 text-sm text-center">{serverError}</p>
            )}

            <Button
              disabled={loading}
              type="submit"
              className="bg-primary border w-fit mx-auto cursor-pointer text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Don&apos;t have an account?
          <Link
            href="/signup"
            className="text-primary ml-1 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
