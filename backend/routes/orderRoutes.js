import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", createOrder);          // Create order (public)
router.get("/", protect, getOrders);    // Admin - Get all orders
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, updateOrder);
router.delete("/:id", protect, deleteOrder);

export default router;
