"use client";

import { useState } from "react";
import API from "@/utils/api";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    product: "",
    address: "",
    quantity: 1,
  });

  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // handle input change
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
    // Clear message when user starts typing
    if (msg) setMsg(null);
  };

  // handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // validate inputs
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email is required";
    if (!formData.contact.match(/^\d{10}$/))
      newErrors.contact = "Enter a valid 10-digit number";
    if (!formData.product.trim()) newErrors.product = "Product name required";
    if (!formData.address.trim()) newErrors.address = "Address required";
    if (!formData.quantity || formData.quantity < 1) newErrors.quantity = "Quantity must be at least 1";

    return newErrors;
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    // Validate form
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('customerName', formData.name);
      data.append('email', formData.email);
      data.append('contactNumber', formData.contact);
      data.append('productName', formData.product);
      data.append('shippingAddress', formData.address);
      data.append('quantity', formData.quantity);
      if (file) data.append('productImage', file);

      const res = await API.post('/orders', data, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      });

      setMsg({ type: 'success', text: 'Order placed successfully!' });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        contact: "",
        product: "",
        address: "",
        quantity: 1,
      });
      setFile(null);
      
    } catch (err) {
      const text = err.response?.data?.message || 'Failed to place order';
      setMsg({ type: 'error', text });
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      {/* Background decoration */}

      <div className="relative w-full max-w-md">
        {/* Glass card effect */}
        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-blue-500/10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Place Order
            </h1>
            <p className="text-gray-400 mt-2">Fill in your details below</p>
          </div>

          {/* Success/Error Message */}
          {msg && (
            <div className={`mb-6 p-4 rounded-xl border transition-all duration-300 ${
              msg.type === 'success' 
                ? 'bg-green-900/30 border-green-500/50 text-green-300' 
                : 'bg-red-900/30 border-red-500/50 text-red-300'
            }`}>
              <div className="flex items-center">
                <span className="mr-2">
                  {msg.type === 'success' ? '✅' : '❌'}
                </span>
                {msg.text}
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full p-4 rounded-xl bg-gray-700/50 border ${
                    errors.name ? 'border-red-500/50' : 'border-gray-600/50'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-200 pointer-events-none focus-within:opacity-100"></div>
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm flex items-center animate-pulse">
                  <span className="mr-1">⚠️</span>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full p-4 rounded-xl bg-gray-700/50 border ${
                    errors.email ? 'border-red-500/50' : 'border-gray-600/50'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-200 pointer-events-none focus-within:opacity-100"></div>
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center animate-pulse">
                  <span className="mr-1">⚠️</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Contact Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Contact Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="contact"
                  placeholder="1234567890"
                  value={formData.contact}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full p-4 rounded-xl bg-gray-700/50 border ${
                    errors.contact ? 'border-red-500/50' : 'border-gray-600/50'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-200 pointer-events-none focus-within:opacity-100"></div>
              </div>
              {errors.contact && (
                <p className="text-red-400 text-sm flex items-center animate-pulse">
                  <span className="mr-1">⚠️</span>
                  {errors.contact}
                </p>
              )}
            </div>

            {/* Product Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Product Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="product"
                  placeholder="What would you like to order?"
                  value={formData.product}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full p-4 rounded-xl bg-gray-700/50 border ${
                    errors.product ? 'border-red-500/50' : 'border-gray-600/50'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-200 pointer-events-none focus-within:opacity-100"></div>
              </div>
              {errors.product && (
                <p className="text-red-400 text-sm flex items-center animate-pulse">
                  <span className="mr-1">⚠️</span>
                  {errors.product}
                </p>
              )}
            </div>

            {/* Quantity Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Quantity
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="quantity"
                  placeholder="1"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full p-4 rounded-xl bg-gray-700/50 border ${
                    errors.quantity ? 'border-red-500/50' : 'border-gray-600/50'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-200 pointer-events-none focus-within:opacity-100"></div>
              </div>
              {errors.quantity && (
                <p className="text-red-400 text-sm flex items-center animate-pulse">
                  <span className="mr-1">⚠️</span>
                  {errors.quantity}
                </p>
              )}
            </div>

            {/* Product Image Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Product Image (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {file && (
                <p className="text-green-400 text-sm flex items-center">
                  <span className="mr-1">📎</span>
                  {file.name}
                </p>
              )}
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Shipping Address
              </label>
              <div className="relative">
                <textarea
                  name="address"
                  placeholder="Enter your complete shipping address..."
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full p-4 rounded-xl bg-gray-700/50 border ${
                    errors.address ? 'border-red-500/50' : 'border-gray-600/50'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-200 pointer-events-none focus-within:opacity-100"></div>
              </div>
              {errors.address && (
                <p className="text-red-400 text-sm flex items-center animate-pulse">
                  <span className="mr-1">⚠️</span>
                  {errors.address}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 disabled:hover:scale-100 disabled:hover:shadow-none disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🚀</span>
                    Place Order
                  </>
                )}
              </div>
              
              {/* Shimmer effect */}
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 hover:translate-x-full"></div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              🔒 Your information is secure and protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}