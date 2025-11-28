"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function useCoupon() {
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  const validateCoupon = useMutation({
    mutationFn: async (code: string) => {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid coupon code");
      }

      return data;
    },

    onSuccess: (data) => {
      setAppliedCoupon(data);
    },

    onError: (error: any) => {
      setAppliedCoupon({ valid: false, error: error.message });
    },
  });

  return {
    validateCoupon: validateCoupon.mutate,
    applying: validateCoupon.isPending,
    appliedCoupon,
  };
}
