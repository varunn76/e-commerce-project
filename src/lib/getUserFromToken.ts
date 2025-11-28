import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const user = verifyToken(token);
    return user;
  } catch (err) {
    return null;
  }
}
