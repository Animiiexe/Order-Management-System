const Joi = require('joi');

const orderSchema = Joi.object({
  customerName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().pattern(/^\d{10}$/).required(),
  shippingAddress: Joi.string().max(100).allow('', null),
  productName: Joi.string().min(3).max(50).required(),
  quantity: Joi.number().integer().min(1).max(100).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { orderSchema, loginSchema };
