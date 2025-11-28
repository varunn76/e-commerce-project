"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductCard from "@/components/admin/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchProducts } from "@/utils";

const AdminProductsPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const products = data?.products ?? [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>

        <Link href="/admin/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      {isLoading && <p>Loading products...</p>}

      {isError && <p className="text-red-500">Failed to load products.</p>}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            products.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
                onUpdate={() =>
                  queryClient.invalidateQueries({ queryKey: ["products"] })
                }
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
