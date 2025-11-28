"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { productConfig } from "@/constant";
import { ProductField, ProductFormFields } from "@/types/product";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const CreateProductPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ProductFormFields>({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      image: form.image,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create product");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:p-6 flex justify-center ">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

                    <SelectContent className="w-full ">
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

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProductPage;
