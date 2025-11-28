export type ProductFormFields = {
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

export type ProductField = {
  name: keyof ProductFormFields;
  label: string;
  placeholder?: string;
  required?: boolean;
  component: "input" | "textarea" | "select";
  type?: string;
  options?: { label: string; value: string }[];
};

export type CoupoFormFields = {
  code: string;
  discountType: string;
  discountValue: number;
  minCartValue: number;
  expiresAt: string;
};
export type CouponFiled = {
  name: keyof CoupoFormFields;
  label: string;
  placeholder?: string;
  required?: boolean;
  component: "input" | "textarea" | "select";
  type?: string;
  options?: { label: string; value: string }[];
};

export type ProductCardProps = {
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
  };
  onDelete: (id: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: any;
};
