export const calculateTotals = (subtotal: number, discount: number) => {
  const gstRate = 0.18;

  const taxableAmount = subtotal - discount;
  const gst = taxableAmount * gstRate;

  const total = taxableAmount + gst;

  return {
    subtotal,
    discount,
    gst,
    total: Math.max(total, 0),
  };
};
