/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Link
      href={`/product/${product._id}`}
      className="w-full cursor-pointer max-w-xs bg-white rounded-3xl shadow-md p-4 relative transition-all hover:shadow-xl"
    >
      <div className="flex justify-center h-40">
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={180}
          className="object-contain "
        />
      </div>

      <h2 className="mt-2 font-semibold  text-gray-800 text-sm line-clamp-1">
        {product.name}
      </h2>

      <div className="mt-3 flex items-center jus gap-2">
        <button className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
          <ShoppingCart className="w-4 h-4" />
          <span>₹{product.price}</span>
        </button>
      </div>
    </Link>
  );
};
export default ProductCard;
