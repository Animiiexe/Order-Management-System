import Order from "../models/Order.js";

// Create order
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (with filter)
export const getOrders = async (req, res) => {
  try {
    const { productName, date } = req.query;
    let query = {};
    if (productName) query.productName = { $regex: productName, $options: "i" };
    if (date) query.createdAt = { $gte: new Date(date) };

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) res.json(order);
    else res.status(404).json({ message: "Order not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update quantity
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.quantity = req.body.quantity || order.quantity;
      await order.save();
      res.json(order);
    } else res.status(404).json({ message: "Order not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Order deleted" });
    } else res.status(404).json({ message: "Order not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
