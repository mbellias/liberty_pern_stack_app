const express = require('express');
const router = express.Router();
const contactForm = require('../controllers/contact-form');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});

router.post('/submit-contact-form', limiter, contactForm.submitContactForm);

module.exports = router;
