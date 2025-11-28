"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const adminLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/admin/products" },
  { label: "Add Product", href: "/admin/products/new" },
  { label: "Coupons", href: "/admin/coupons" },
  { label: "Add Coupon", href: "/admin/coupons/new" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <aside className="hidden lg:flex w-64 border-r bg-white p-5 flex-col">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition",
                pathname === link.href ? "bg-gray-200 font-semibold" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Button
            variant="destructive"
            className="w-full cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      <div className="lg:hidden p-4 border-b bg-white flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4">
            <SheetHeader>
              <SheetTitle className="text-lg font-semibold">
                Admin Menu
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-3 mt-6">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-base hover:bg-gray-100",
                    pathname === link.href ? "bg-gray-200 font-semibold" : ""
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Button
              variant="destructive"
              className="w-full mt-6 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </SheetContent>
        </Sheet>
      </div>

      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
