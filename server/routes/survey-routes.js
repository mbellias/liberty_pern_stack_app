const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const surveyController = require('../controllers/survey');

router.post(
  '/submit-survey',
  [
    body('email').trim().isEmail().normalizeEmail().escape(),
    body('phone_number').trim().isNumeric().isLength({ min: 10 }).escape(),
  ],

  surveyController.submitSurvey
);

module.exports = router;
