"use client";

import { Button } from "@/components/ui/button";
import { calculateTotals } from "@/lib/calculateTotals";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

const CartSummary = ({
  subtotal,
  discount = 0,
}: {
  subtotal: number;
  discount: number;
}) => {
  const { gst, total } = calculateTotals(subtotal, discount);
  const { clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    clearCart();
    router.push("/checkout");
  };

  return (
    <div className="bg-yellow-100 p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold">Cart Total</h2>

      <div className="flex justify-between mt-3 text-sm">
        <span>Cart Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between mt-2 text-sm text-green-600">
          <span>Discount</span>
          <span>-₹{discount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between mt-2 text-sm">
        <span>GST (18%)</span>
        <span>₹{gst.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-bold text-lg mt-4">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <Button className="w-full mt-4" onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
