const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Public endpoint to create order
router.post('/', upload.single('productImage'), orderCtrl.createOrder);

// Protected admin endpoints
router.get('/', auth, orderCtrl.getAllOrders);
router.get('/:id', auth, orderCtrl.getOrder);
router.patch('/:id/quantity', auth, orderCtrl.updateQuantity);
router.delete('/:id', auth, orderCtrl.deleteOrder);

module.exports = router;
