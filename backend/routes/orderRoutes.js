const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// /api/orders
router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

// /api/orders/myorders
router.route('/myorders').get(protect, getMyOrders);

//  /api/orders/:id
router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, admin, updateOrderStatus);

module.exports = router;