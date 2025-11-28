import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Coupon from "@/models/Coupon.model";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function POST(req: Request) {
  try {
    await connectDB();
    const user = await getUserFromToken();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized – Admin only" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      code,
      discountType,
      discountValue,
      minCartValue,
      appliesTo,
      expiresAt,
    } = body;

    if (!code || !discountType || !discountValue || !expiresAt) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["percent", "flat"].includes(discountType)) {
      return NextResponse.json(
        { message: "Invalid discount type" },
        { status: 400 }
      );
    }

    if (discountValue <= 0) {
      return NextResponse.json(
        { message: "Discount value must be greater than 0" },
        { status: 400 }
      );
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minCartValue: minCartValue || 0,
      appliesTo: appliesTo?.length ? appliesTo : ["all"],
      expiresAt,
    });

    return NextResponse.json(
      { message: "Coupon created successfully", coupon },
      { status: 201 }
    );
  } catch (error) {
    console.error("Coupon create error:", error);
    return NextResponse.json(
      { message: "Failed to create coupon" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromToken();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized – Admin only" },
        { status: 403 }
      );
    }

    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return NextResponse.json({ coupons }, { status: 200 });
  } catch (error) {
    console.error("Coupon fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}
