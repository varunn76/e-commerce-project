"use client";

import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { Trash2 } from "lucide-react";

const CartItem = ({ item }: { item: any }) => {
  const { increaseQty, decreaseQty, removeItem } = useCart();

  const id = item.productId._id;
  const quantity = item.quantity;

  return (
    <div className="flex flex-col md:flex-row gap-4 py-6">
      <div className="w-24 h-24 rounded-lg overflow-hidden">
        <Image
          src={item.productId.image}
          alt={item.productId.name}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <p className="text-xs text-gray-500 uppercase">
          {item.productId.category}
        </p>
        <h2 className="text-lg font-semibold">{item.productId.name}</h2>

        <p className="text-gray-500 text-sm">Price: ₹{item.productId.price}</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => decreaseQty(id, quantity)}
            className="w-8 h-8 border rounded flex items-center justify-center"
          >
            -
          </button>

          <span className="w-10 text-center font-medium">{quantity}</span>

          <button
            onClick={() => increaseQty(id, quantity)}
            className="w-8 h-8 border rounded flex items-center justify-center"
          >
            +
          </button>

          <button
            className="ml-4 text-sm bg-red-100 p-1 rounded-md hover:bg-red-200 text-red-500"
            onClick={() => removeItem(id)}
          >
            <Trash2 />
          </button>
        </div>
      </div>

      <div className="text-xl font-semibold text-yellow-600">
        ₹{(item.productId.price * quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
