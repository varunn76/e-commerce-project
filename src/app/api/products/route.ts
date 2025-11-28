import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product.model";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, price, category, description, image } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { message: "Name, price and category are required" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      name,
      price,
      category,
      description,
      image,
    });

    return NextResponse.json(
      { message: "Product created", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
