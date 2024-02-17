const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const orderController = require('../controllers/order');
const { authenticateUser } = require('../middleware/auth');

router.post(
  '/submit-order',
  [
    body('email').trim().isEmail().normalizeEmail().escape(),
    body('phone_number').trim().isNumeric().isLength({ min: 10 }).escape(),
  ],

  orderController.submitOrder
);

router.post('/get-orders', authenticateUser, orderController.getOrdersByUserId);

router.post(
  '/get-distributor-orders',
  authenticateUser,
  orderController.getOrdersByDistributorId
);

module.exports = router;
