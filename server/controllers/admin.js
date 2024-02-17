const userSchema = require('../models/user');
const inquirySchema = require('../models/inquiry');
const orderSchema = require('../models/order');
const surveySchema = require('../models/survey');
const productSchema = require('../models/products');
const { Op } = require('sequelize');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.findAll();

    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await inquirySchema.findAll();

    res.json(inquiries);
  } catch (error) {
    console.error('Error getting inquiries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderSchema.findAll();
    const orderArrays = orders.map((order) => order.order);

    res.json({ orders, orderArrays });
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await surveySchema.findAll();

    res.json(surveys);
  } catch (error) {
    console.error('Error getting surveys:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllProductsForAdmin = async (req, res) => {
  try {
    const products = await productSchema.findAll();

    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateInquiryStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const inquiry = await inquirySchema.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    await inquirySchema.update(
      {
        status,
      },
      { where: { id: id } }
    );

    return res
      .status(200)
      .json({ message: 'Inquiry status updated successfully!' });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const order = await orderSchema.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    await orderSchema.update(
      {
        status,
      },
      { where: { id: id } }
    );

    return res
      .status(200)
      .json({ message: 'Order status updated successfully!' });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: error.message });
  }
};

exports.updateProductPrice = async (req, res) => {
  const { id, price } = req.body;

  try {
    const product = await productSchema.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    await productSchema.update(
      {
        price,
      },
      { where: { id: id } }
    );

    return res
      .status(200)
      .json({ message: 'Product price updated successfully!' });
  } catch (error) {
    console.error('Error updating product price:', error);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: error.message });
  }
};
