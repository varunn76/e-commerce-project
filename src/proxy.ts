import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export default function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  if (pathname === "/login" || pathname === "/signup") {
    if (token) {
      try {
        verifyToken(token);
        return NextResponse.redirect(new URL("/", req.url));
      } catch (e) {}
    }
  }

  if (pathname === "/checkout") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      verifyToken(token);
    } catch (e) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const user = verifyToken(token);
      if (user.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/signup", "/checkout"],
};
