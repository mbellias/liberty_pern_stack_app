const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const resetController = require('../controllers/password-reset');

router.post(
  '/verify-email',
  [body('email').trim().isEmail().normalizeEmail().escape()],
  resetController.checkEmailValidity
);

router.put(
  '/update-password',
  [
    body('token').trim().notEmpty(),
    body('newPassword').trim().isLength({ min: 8 }).escape(),
  ],
  resetController.updatePassword
);

module.exports = router;
