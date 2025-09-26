"use client";
import { useState } from "react";
import API from "@/utils/api";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    contactNumber: "",
    productName: "",
    shippingAddress: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/orders", formData); // ✅ sends JSON
      alert("Order placed successfully!");
      setFormData({
        customerName: "",
        email: "",
        contactNumber: "",
        productName: "",
        shippingAddress: "",
        quantity: 1,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error placing order");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <input type="text" name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} className="border p-2 w-full" required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} className="border p-2 w-full" />
      <input type="text" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} className="border p-2 w-full" required />
      <input type="text" name="shippingAddress" placeholder="Shipping Address" value={formData.shippingAddress} onChange={handleChange} className="border p-2 w-full" />
      <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="border p-2 w-full" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Place Order</button>
    </form>
  );
}
