/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart.model";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET() {
  await connectDB();

  const user = await getUserFromToken();
  if (!user)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  let cart = await Cart.findOne({ userId: user.userId }).populate(
    "items.productId"
  );

  if (!cart) {
    cart = await Cart.create({ userId: user.userId, items: [] });
  }

  return NextResponse.json({ cart });
}

export async function POST(req: Request) {
  await connectDB();

  const user = await getUserFromToken();
  if (!user)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { productId, quantity } = await req.json();

  let cart = await Cart.findOne({ userId: user.userId });

  if (!cart) {
    cart = await Cart.create({
      userId: user.userId,
      items: [{ productId, quantity }],
    });
  } else {
    const item = cart.items.find(
      (i: any) => i.productId.toString() === productId
    );

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
  }

  return NextResponse.json({ message: "Added to cart", cart });
}

export async function PUT(req: Request) {
  await connectDB();

  const user = await getUserFromToken();
  if (!user)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { productId, quantity } = await req.json();

  const cart = await Cart.findOne({ userId: user.userId });
  if (!cart)
    return NextResponse.json({ message: "Cart not found" }, { status: 404 });

  const item = cart.items.find(
    (i: any) => i.productId.toString() === productId
  );

  if (!item)
    return NextResponse.json({ message: "Item not found" }, { status: 404 });

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (i: any) => i.productId.toString() !== productId
    );
  } else {
    item.quantity = quantity;
  }

  await cart.save();

  return NextResponse.json({ message: "Cart updated", cart });
}

export async function DELETE(req: Request) {
  await connectDB();

  const user = await getUserFromToken();
  if (!user)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { productId } = await req.json();

  const cart = await Cart.findOne({ userId: user.userId });
  if (!cart)
    return NextResponse.json({ message: "Cart empty" }, { status: 404 });

  cart.items = cart.items.filter(
    (i: any) => i.productId.toString() !== productId
  );

  await cart.save();

  return NextResponse.json({ message: "Item removed", cart });
}
