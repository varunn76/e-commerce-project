/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;

export function signToken(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as any;
}
