/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils";
import { Package } from "lucide-react";
import { Button } from "../ui/button";
import Loader from "@/app/loading";

const AllProducts = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const products = data?.products ?? [];

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full">
              <div className="flex flex-col items-center justify-center py-16 text-center">
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
      )}
    </>
  );
};

export default AllProducts;
