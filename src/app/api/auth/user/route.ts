import { getUserFromToken } from "@/lib/getUserFromToken";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserFromToken();
  return NextResponse.json({ user });
}
