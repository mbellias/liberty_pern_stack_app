const inquirySchema = require('../models/inquiry');

exports.submitInquiry = async (req, res) => {
  try {
    const { user_id, name, email, phone_number, products } = req.body;

    const inquiry = await inquirySchema.create({
      user_id,
      name,
      email,
      phone_number,
      products,
    });

    res.status(201).json(inquiry);
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getInquiriesByUserId = async (req, res) => {
  try {
    const { user_id } = req.body;

    const inquiries = await inquirySchema.findAll({
      where: { user_id },
    });

    res.status(200).json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries by user_id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
