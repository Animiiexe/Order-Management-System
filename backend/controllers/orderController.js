const Order = require('../models/Order');
const { orderSchema } = require('../utils/validators');
const path = require('path');

exports.createOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = orderSchema.validate(data);
    if (error) return res.status(400).json({ message: error.message });

    // file handled by multer; store accessible path
    if (req.file) data.productImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const order = await Order.create(data);
    // we will emit via socket on server side; for controller just return
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const { productName, startDate, endDate } = req.query;
    const filter = {};
    if (productName) filter.productName = new RegExp(productName, 'i');
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.updateQuantity = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (typeof quantity === 'undefined') return res.status(400).json({ message: 'Quantity required' });
    if (quantity < 1 || quantity > 100) return res.status(400).json({ message: 'Quantity out of range' });

    const order = await Order.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    next(err);
  }
};
