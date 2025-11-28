"use client";

import AllProducts from "@/components/user/AllProducts";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();
  console.log("uss", user);

  return (
    <div
      className={`min-h-screen px-4  py- bg-background font-sans ${
        user?.role === "admin" ? "my-10" : "my-24"
      }`}
    >
      {user?.role === "admin" && (
        <button
          onClick={() => router.push("/admin/products")}
          className="mb-4 w-full flex justify-end md:w-auto px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/80 transition"
        >
          Admin Panel
        </button>
      )}

      <AllProducts />
    </div>
  );
};

export default Home;
