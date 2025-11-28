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

export default function SignupPage() {
  const { signup, loading, error: serverError } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let newErrors: any = {};

    if (!form.name.trim() || form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    await signup(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-md border bg-card text-card-foreground">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold">
            Create Your Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                className="bg-background border-input"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                className="bg-background border-input"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="********"
                className="bg-background border-input"
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
              className="bg-primary w-fit mx-auto text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Already have an account?
          <Link
            href="/login"
            className="text-primary hover:underline ml-1 font-medium"
          >
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
