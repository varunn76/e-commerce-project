import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Coupon from "@/models/Coupon.model";
import { getUserFromToken } from "@/lib/getUserFromToken";
import Cart from "@/models/Cart.model";

export async function POST(req: Request) {
  await connectDB();

  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { code } = await req.json();
  if (!code) {
    return NextResponse.json(
      { message: "Coupon code required" },
      { status: 400 }
    );
  }

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (!coupon) {
    return NextResponse.json(
      { message: "Invalid coupon code" },
      { status: 400 }
    );
  }
  if (new Date(coupon.expiresAt) < new Date()) {
    return NextResponse.json({ message: "Coupon expired" }, { status: 400 });
  }
  const cart = await Cart.findOne({ userId: user.userId }).populate(
    "items.productId"
  );
  if (!cart) {
    return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
  }

  const subtotal = cart.items.reduce((sum: number, item: any) => {
    return sum + item.productId.price * item.quantity;
  }, 0);

  if (subtotal < coupon.minCartValue) {
    return NextResponse.json(
      { message: `Minimum cart value must be ₹${coupon.minCartValue}` },
      { status: 400 }
    );
  }

  if (!coupon.appliesTo.includes("all")) {
    const categories = cart.items.map((item: any) => item.productId.category);
    const isValid = categories.some((cat: string) =>
      coupon.appliesTo.includes(cat)
    );

    if (!isValid) {
      return NextResponse.json(
        { message: "Coupon not valid for these products" },
        { status: 400 }
      );
    }
  }

  let discount = 0;
  if (coupon.discountType === "percent") {
    discount = (subtotal * coupon.discountValue) / 100;
  } else {
    discount = coupon.discountValue;
  }

  const finalAmount = subtotal - discount;

  return NextResponse.json({
    valid: true,
    coupon: coupon.code,
    subtotal,
    discount,
    finalAmount: finalAmount < 0 ? 0 : finalAmount,
  });
}
