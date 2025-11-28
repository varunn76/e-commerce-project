import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discountType: {
      type: String,
      enum: ["percent", "flat"],
      required: true,
    },
    discountValue: { type: Number, required: true },

    minCartValue: { type: Number, default: 0 },

    appliesTo: {
      type: [String],
      default: ["all"],
    },

    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
