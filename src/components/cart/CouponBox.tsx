"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "../ui/input";

const CouponBox = ({ applying, validateCoupon, appliedCoupon }: any) => {
  const [code, setCode] = useState("");

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold">Coupon Code</h2>
      <p className="text-gray-500 text-sm mt-1">
        Enter your coupon code below.
      </p>
      <div className="flex gap-2 pt-2">
        <Input
          placeholder="Enter coupon code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <Button onClick={() => validateCoupon(code)} disabled={applying}>
          {applying ? "Validating..." : "Apply"}
        </Button>
      </div>
      {appliedCoupon && !appliedCoupon.valid && (
        <p className="text-red-500 text-sm">{appliedCoupon.error}</p>
      )}
      {appliedCoupon && appliedCoupon.valid && (
        <p className="text-green-600 text-sm">
          Coupon applied! You saved ₹{appliedCoupon.discount}
        </p>
      )}
    </div>
  );
};

export default CouponBox;
