const Product = require('../models/products');

const getCart = (req, res) => {
  const cart = req.session.cart || [];
  res.json(cart);
};

const addToCart = async (req, res) => {
  const { id, quantity } = req.body;
  const cart = req.session.cart || [];

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
      cart.push({
        id,
        quantity,
        name: product.name,
        price: product.price,
        totalPrice: quantity * product.price,
      });
    }

    req.session.cart = cart; // Save updated cart to session
    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeFromCart = (req, res) => {
  const { id } = req.body;
  const cart = req.session.cart || [];

  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
      cart[itemIndex].totalPrice -= cart[itemIndex].price;
    } else {
      cart.splice(itemIndex, 1);
    }
  }

  req.session.cart = cart; // Save updated cart to session
  res.json(cart);
};

const clearCart = async (req, res) => {
  req.session.cart = []; // Clear cart in session
  res.json([]);
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
