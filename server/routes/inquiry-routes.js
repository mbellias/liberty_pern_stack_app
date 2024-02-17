const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiry');
const { authenticateUser } = require('../middleware/auth');

router.post('/submit-inquiry', inquiryController.submitInquiry);

router.post('/get-inquiries', authenticateUser, inquiryController.getInquiriesByUserId);

module.exports = router;
