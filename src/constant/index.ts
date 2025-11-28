import { CouponFiled, ProductField } from "@/types/product";

const productConfig: ProductField[] = [
  {
    name: "name",
    label: "Product Name",
    placeholder: "Enter Product Name",
    required: true,
    component: "input",
    type: "text",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter Price",
    required: true,
    component: "input",
    type: "number",
  },
  {
    name: "category",
    label: "Category",
    required: true,
    component: "select",
    options: [
      { label: "Electronics", value: "electronics" },
      { label: "Fashion", value: "fashion" },
      { label: "Shoes", value: "shoes" },
      { label: "Home & Kitchen", value: "home" },
      { label: "Sports", value: "sports" },
      { label: "Toys", value: "toys" },
    ],
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter Description",
    required: false,
    component: "textarea",
  },
  {
    name: "image",
    label: "Image",
    placeholder: "https://img.com/1",
    required: false,
    component: "input",
    type: "text",
  },
];

const couponConfig: CouponFiled[] = [
  {
    name: "code",
    label: "Coupon Code",
    placeholder: "Enter Coupon Code",
    required: true,
    component: "input",
    type: "text",
  },
  {
    name: "discountType",
    label: "Discount Type",
    required: true,
    component: "select",
    options: [
      { label: "Percentage", value: "percent" },
      { label: "Flat", value: "flat" },
    ],
  },
  {
    name: "discountValue",
    label: "Discount Value",
    placeholder: "Enter Discount Value",
    required: true,
    component: "input",
    type: "number",
  },
  {
    name: "minCartValue",
    label: "Minimum Cart Value",
    placeholder: "Enter Minimum Cart Value",
    required: false,
    component: "input",
    type: "number",
  },

  {
    name: "expiresAt",
    label: "Expiry Date",
    placeholder: "Enter Expiry Date",
    required: true,
    component: "input",
    type: "date",
  },
];
const categoryOptions = [
  { label: "Electronics", value: "electronics" },
  { label: "Fashion", value: "fashion" },
  { label: "Shoes", value: "shoes" },
  { label: "Home & Kitchen", value: "home" },
  { label: "Sports", value: "sports" },
  { label: "Toys", value: "toys" },
];

export { productConfig, categoryOptions, couponConfig };
