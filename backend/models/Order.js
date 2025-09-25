import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
