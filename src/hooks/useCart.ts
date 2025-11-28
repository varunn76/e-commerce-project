/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
export function useCart() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    enabled: !!user,
  });

  const cart = data?.cart || { items: [] };

  const addToCart = useMutation({
    mutationFn: async (payload: { productId: string; quantity?: number }) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: payload.productId,
          quantity: payload.quantity || 1,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to add item");

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const updateQuantity = useMutation({
    mutationFn: async (payload: { productId: string; quantity: number }) => {
      const res = await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update cart");

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeItem = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ productId }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete item");

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const totalItems =
    cart.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

  const subtotal =
    cart.items?.reduce(
      (sum: number, item: any) => sum + item.quantity * item.productId.price,
      0
    ) || 0;

  const increaseQty = (productId: string, currentQty: number) => {
    updateQuantity.mutate({ productId, quantity: currentQty + 1 });
  };

  const decreaseQty = (productId: string, currentQty: number) => {
    if (currentQty > 1) {
      updateQuantity.mutate({ productId, quantity: currentQty - 1 });
    }
  };

  const clearCart = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/cart/clear", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to clear cart");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    cart,
    isLoading,
    isError,
    totalItems,
    subtotal,
    refetch,
    addToCart: addToCart.mutate,
    increaseQty,
    decreaseQty,
    removeItem: removeItem.mutate,
    clearCart: clearCart.mutate,
  };
}
