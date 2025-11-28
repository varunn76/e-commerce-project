/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Home, ShoppingCart, User } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const totalItems = cart?.items?.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-8 px-6 py-3 backdrop-blur-2xl bg-primary/10 border border-white/10 rounded-2xl shadow-lg">
        <Link href="/" className="flex flex-col items-center text-black">
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          href="/cart"
          className="relative flex flex-col items-center text-black"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
          <span className="text-xs">Cart</span>
        </Link>

        {!user ? (
          <button
            onClick={() => router.push("/login")}
            className="flex flex-col items-center text-black"
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Login</span>
          </button>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex flex-col items-center cursor-pointer">
                <User className="h-5 w-5" />
                <span className="text-xs">
                  {user.role === "admin" ? "Admin" : "User"}
                </span>
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-40 p-2 bg-white/90 space-y-2 backdrop-blur-xl rounded-xl shadow-lg">
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md 
                  bg-red-100 hover:bg-red-200 transition text-red-600"
              >
                Logout
              </button>
            </PopoverContent>
          </Popover>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
