const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true, minlength:3, maxlength:30 },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  shippingAddress: { type: String, maxlength:100 },
  productName: { type: String, required: true, minlength:3, maxlength:50 },
  quantity: { type: Number, required: true, min:1, max:100 },
  productImageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
