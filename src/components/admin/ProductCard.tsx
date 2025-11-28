"use client";

import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ProductCardProps } from "@/types/product";
import EditProductModal from "./EditProductModal";
import DeleteModal from "./DeleteProductModal";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const ProductCard = ({ product, onDelete, onUpdate }: ProductCardProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition rounded-lg">
      <CardContent className="px-3 space-y-3">
        <div className="w-full h-55 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={product.image || "/no-image.png"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-base font-semibold leading-tight">
          {product.name.length > 25
            ? product.name.slice(0, 25) + "..."
            : product.name}
        </CardTitle>
        <p className="text-xs text-gray-500">
          Category: <span className="capitalize">{product.category}</span>
        </p>

        <p className="font-semibold text-gray-900 text-base">
          ₹{product.price}
        </p>

        <div className="flex justify-between items-center pt-1">
          <EditProductModal product={product} onUpdate={onUpdate} />

          <DeleteModal
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => onDelete(product._id)}
            trigger={
              <Button variant="destructive" className="px-3 h-8 text-sm">
                <Trash2 size={16} /> Delete
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
