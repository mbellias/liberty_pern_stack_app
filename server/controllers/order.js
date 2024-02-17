const orderSchema = require('../models/order');

exports.submitOrder = async (req, res) => {
  try {
    const {
      user_id,
      first_name,
      last_name,
      email,
      phone_number,
      distributor_id,
      cartItems,
      cartTotal,
    } = req.body;

    const order = await orderSchema.create({
      user_id,
      first_name,
      last_name,
      email,
      phone_number,
      distributor_id,
      order: cartItems,
      total: cartTotal,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const { user_id } = req.body;

    const orders = await orderSchema.findAll({
      where: { user_id },
    });

    // Extract the 'order' array from each order and store it in a separate array
    const orderArrays = orders.map((order) => order.order);

    res.status(200).json({ orders, orderArrays });
  } catch (error) {
    console.error('Error fetching orders by user_id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOrdersByDistributorId = async (req, res) => {
  try {
    const { distributor_id } = req.body;

    const orders = await orderSchema.findAll({
      where: { distributor_id },
    });

    // Extract the 'order' array from each order and store it in a separate array
    const orderArrays = orders.map((order) => order.order);

    res.status(200).json({ orders, orderArrays });
  } catch (error) {
    console.error('Error fetching orders by distributor_id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
