"use client";

import CartItem from "@/components/cart/CartItems";
import { useCart } from "@/hooks/useCart";
import CouponBox from "../../components/cart/CouponBox";
import CartSummary from "../../components/cart/CartSummary";
import Link from "next/link";
import Loader from "../loading";
import { useCoupon } from "@/hooks/useCoupon";

export default function CartPage() {
  const { cart, isLoading } = useCart();
  const { validateCoupon, appliedCoupon, applying } = useCoupon();
  console.log("appliedCoupon", appliedCoupon);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <Loader />
      </section>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  const subtotal = isEmpty
    ? 0
    : cart.items.reduce(
        (total: number, item: any) =>
          total + item.productId.price * item.quantity,
        0
      );

  return (
    <section className="min-h-screen p-6 my-12 max-w-6xl mx-auto">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className={` bg-white rounded-xl p-6 h-fit shadow-sm ${
            isEmpty ? " col-span-3" : "lg:col-span-2"
          }`}
        >
          <h1 className="text-2xl font-bold">Shopping Bag</h1>
          {isEmpty ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">Your cart is empty 🛒</p>

              <Link
                href="/"
                className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-6">
                {cart.items.length} items in your bag.
              </p>

              <div className="divide-y">
                {cart.items.map((item: any) => (
                  <CartItem key={item.productId._id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>

        {!isEmpty && (
          <div className="space-y-6">
            <CouponBox
              validateCoupon={validateCoupon}
              appliedCoupon={appliedCoupon}
              applying={applying}
            />
            <CartSummary
              subtotal={subtotal}
              discount={appliedCoupon?.discount || 0}
            />
          </div>
        )}
      </div>
    </section>
  );
}
