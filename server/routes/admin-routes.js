const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { isAdmin } = require('../middleware/admin');
const { authenticateUser } = require('../middleware/auth');

router.post(
  '/get-all-users',
  authenticateUser,
  isAdmin,
  adminController.getAllUsers
);

router.post(
  '/get-all-orders',
  authenticateUser,
  isAdmin,
  adminController.getAllOrders
);

router.post(
  '/get-all-inquiries',
  authenticateUser,
  isAdmin,
  adminController.getAllInquiries
);

router.post(
  '/get-all-surveys',
  authenticateUser,
  isAdmin,
  adminController.getAllSurveys
);

router.post(
  '/get-all-products',
  authenticateUser,
  isAdmin,
  adminController.getAllProductsForAdmin
);

router.put(
  '/update-order-status',
  authenticateUser,
  isAdmin,
  adminController.updateOrderStatus
);

router.put(
  '/update-inquiry-status',
  authenticateUser,
  isAdmin,
  adminController.updateInquiryStatus
);

router.put(
  '/update-product-price',
  authenticateUser,
  isAdmin,
  adminController.updateProductPrice
);

module.exports = router;
