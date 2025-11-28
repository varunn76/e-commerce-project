"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { productConfig } from "@/constant";
import { ProductField, ProductFormFields } from "@/types/product";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
const EditProductModal = ({ product, onUpdate }: any) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ProductFormFields>({
    name: product.name,
    price: String(product.price),
    category: product.category,
    description: product.description,
    image: product.image,
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          category: form.category,
          description: form.description,
          image: form.image,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update product");
        return;
      }

      onUpdate();
      setOpen(false);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-3 h-8 text-sm">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="w-full h-30 bg-gray-100 rounded-md overflow-hidden mb-4">
          <Image
            src={form.image || "/no-image.png"}
            alt="product"
            width={500}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          {productConfig.map((field: ProductField) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="text-sm font-medium">{field.label}</label>

              {field.component === "input" && (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  required={field.required}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                />
              )}

              {field.component === "textarea" && (
                <Textarea
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  required={field.required}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                />
              )}

              {field.component === "select" && (
                <Select
                  value={form[field.name]}
                  onValueChange={(value) =>
                    setForm({ ...form, [field.name]: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>

                  <SelectContent className="w-full">
                    {field.options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button disabled={loading} onClick={handleSubmit} className="w-full">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
