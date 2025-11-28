import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart.model";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function DELETE() {
  await connectDB();

  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await Cart.findOneAndUpdate(
    { userId: user.userId },
    { items: [] },
    { new: true }
  );

  return NextResponse.json({ message: "Cart cleared" }, { status: 200 });
}
