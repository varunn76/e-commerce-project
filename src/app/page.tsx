"use client";

import AllProducts from "@/components/user/AllProducts";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div
      className={`min-h-screen lg:max-w-6xl px-4 mx-auto items-center flex flex-col lg:items-end  py-6 bg-background font-sans ${
        user?.role === "admin" ? "my-16" : "my-24"
      }`}
    >
      {user?.role === "admin" && (
        <button
          onClick={() => router.push("/admin/products")}
          className="mb-4  md:w-auto px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/80 transition"
        >
          Admin Panel
        </button>
      )}

      <AllProducts />
    </div>
  );
};

export default Home;
