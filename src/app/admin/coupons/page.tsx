"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Loader from "@/app/loading";
import CopyButton from "@/components/admin/CopyButton";

export default function AllCouponPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await fetch("/api/coupons");
      return res.json();
    },
  });

  const coupons = data?.coupons || [];

  if (isLoading)
    return (
      <div className="p-6">
        <Loader />
      </div>
    );
  if (isError)
    return <div className="p-6 text-red-500">Failed to load coupons.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Coupons</h1>
        <Link href="/admin/coupons/new">
          <Button>Create Coupon</Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {coupons.map((coupon: any) => {
          const isExpired = new Date(coupon.expiresAt) < new Date();

          return (
            <Card key={coupon._id} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {coupon.code}

                    <CopyButton code={coupon.code} />
                  </div>

                  <Badge variant={isExpired ? "destructive" : "default"}>
                    {isExpired ? "Expired" : "Active"}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm">
                  <strong>Type:</strong>{" "}
                  {coupon.discountType === "percent" ? "Percentage" : "Flat"}
                </p>

                <p className="text-sm">
                  <strong>Value:</strong>{" "}
                  {coupon.discountType === "percent"
                    ? `${coupon.discountValue}%`
                    : `₹${coupon.discountValue}`}
                </p>

                <p className="text-sm">
                  <strong>Min Cart Value:</strong> ₹{coupon.minCartValue || 0}
                </p>

                <p className="text-sm">
                  <strong>Expires:</strong>{" "}
                  {new Date(coupon.expiresAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
