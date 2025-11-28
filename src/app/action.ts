"use server";

import { getUserFromToken } from "@/lib/getUserFromToken";

export async function userInfo() {
  const user = await getUserFromToken();
  return user;
}
