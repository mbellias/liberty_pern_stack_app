const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.get('/cart', cartController.getCart);

router.post('/cart/add', cartController.addToCart);

router.delete('/cart/remove', cartController.removeFromCart);

router.delete('/cart/clear', cartController.clearCart);

module.exports = router;
