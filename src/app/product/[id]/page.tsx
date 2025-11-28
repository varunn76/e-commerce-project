"use client";

import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Loader from "@/app/loading";
import { useAuth } from "@/hooks/useAuth";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { cart, addToCart } = useCart();
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
  });

  const product = data?.product;

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-lg">
        Product not found.
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Product not found.
      </div>
    );
  }

  const isInCart = cart.items?.some(
    (item: any) => item.productId?._id === product._id
  );

  return (
    <section className="min-h-screen p-6 my-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
        <div className="w-full rounded-lg overflow-hidden h-full bg-white border-2 px-2 max-h-[550px]">
          <Image
            src={product.image || "/no-image.png"}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500 text-sm capitalize">
            Category: {product.category}
          </p>

          <p className="text-2xl font-semibold text-gray-900">
            ₹{product.price}
          </p>

          <p className="text-gray-700 leading-relaxed">
            {product.description || "No description available."}
          </p>

          <Button
            className={cn(
              "w-full md:w-auto mt-4",
              isInCart && "bg-blue-600 hover:bg-blue-700"
            )}
            onClick={() => {
              if (isInCart) {
                router.push("/cart");
              } else if (user === null) {
                router.push("/login");
              } else {
                addToCart({ productId: product._id });
              }
            }}
          >
            {isInCart ? "Go to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </section>
  );
}
