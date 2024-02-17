const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user');

router.post(
  '/register',
  [
    body('first_name').trim().isLength({ min: 1 }).escape(),
    body('last_name').trim().isLength({ min: 1 }).escape(),
    body('phone_number').trim().isNumeric().isLength({ min: 10 }).escape(),
    body('email').trim().isEmail().normalizeEmail().escape(),
    body('password').trim().isLength({ min: 8 }).escape(),
  ],
  userController.register
);

router.get('/verify-email/:token', userController.verify);

router.post(
  '/login',
  [
    body('email').trim().isEmail().normalizeEmail().escape(),
    body('password').trim().isLength({ min: 8 }).escape(),
  ],
  userController.login
);

router.post('/logout', userController.logout);

module.exports = router;
