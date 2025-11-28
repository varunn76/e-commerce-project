"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CheckOutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md w-full">
        <CheckCircle className="mx-auto text-green-500" size={70} />

        <h1 className="text-2xl font-bold mt-4">Order Placed Successfully!</h1>

        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been placed and is now
          being processed.
        </p>

        <div className="flex flex-col gap-3 mt-6">
          <Link href="/">
            <Button className="w-full">Go Home</Button>
          </Link>

          {/* <Link href="/orders">
            <Button variant="outline" className="w-full">
              View My Orders
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
