"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { couponConfig } from "@/constant";
import { CouponFiled, CoupoFormFields } from "@/types/product";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const NewCouponPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<CoupoFormFields>({
    code: "",
    discountType: "",
    discountValue: 0,
    minCartValue: 0,
    expiresAt: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      code: form.code,
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      minCartValue: Number(form.minCartValue),
      expiresAt: form.expiresAt,
    };

    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create coupon");
        return;
      }

      router.push("/admin/coupons");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:p-6 flex justify-center ">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Coupon</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {couponConfig.map((field: CouponFiled) => (
              <div key={field.name} className="flex flex-col gap-2">
                <label className="text-sm font-medium">{field.label}</label>

                {field.component === "input" && (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={String(form[field.name] ?? "")}
                    required={field.required}
                    onChange={(e) =>
                      setForm({ ...form, [field.name]: e.target.value })
                    }
                  />
                )}

                {field.component === "select" && (
                  <Select
                    value={String(form[field.name])}
                    onValueChange={(value) =>
                      setForm({ ...form, [field.name]: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={field.placeholder || "Select"}
                      />
                    </SelectTrigger>

                    <SelectContent className="w-full">
                      {field.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Coupon"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCouponPage;
