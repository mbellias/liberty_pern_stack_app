const express = require('express');
const router = express.Router();
const products = require('../controllers/products');

router.get('/products', products.getAllProducts);
router.get('/products/:productId', products.getProductById);

module.exports = router;
