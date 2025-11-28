"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-md">
        <SearchX size={80} className="mx-auto text-gray-500" />

        <h1 className="text-3xl font-bold mt-4">Page Not Found</h1>

        <p className="text-gray-600 mt-2">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link href="/">
          <Button className="mt-6 px-8">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
