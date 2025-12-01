/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils";
import { AlertTriangle, Package } from "lucide-react";
import { Button } from "../ui/button";
import Loader from "@/app/loading";

const AllProducts = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const products = data?.products ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] w-full">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center w-full">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold">Something went wrong</h3>
        <p className="text-muted-foreground mt-1">
          Unable to load products. Please try again.
        </p>

        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }
  return (
    <div className="min-h-[80vh] w-full flex">
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto w-full">
        {products.length > 0 ? (
          products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <Package className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold">No Products Found</h3>
              <p className="text-muted-foreground mt-1">
                Try refreshing or check again later.
              </p>
              <Button onClick={() => refetch()} className="mt-4">
                Refresh
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
