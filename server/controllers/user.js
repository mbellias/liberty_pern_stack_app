const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userSchema = require('../models/user');
require('dotenv').config();

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    if (process.env.REFRESH_TOKEN) {
      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });
    }

    const refreshedToken = await new Promise((resolve, reject) => {
      oauth2Client.refreshAccessToken((err, tokens) => {
        if (err) {
          console.error('Error refreshing access token:', err.message);
          reject(err);
        } else {
          if (tokens.refresh_token) {
            process.env.REFRESH_TOKEN = tokens.refresh_token;
          }

          resolve(tokens.access_token);
        }
      });
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        accessToken: refreshedToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    return transporter;
  } catch (err) {
    console.error('Error creating transporter:', err.message);
    return err;
  }
};

const generateVerificationToken = (userId) => {
  if (!userId) {
    throw new Error('Invalid user ID for generating verification token.');
  }

  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const uniqueId = uuidv4();

  return `${userId}_${timestamp}_${randomString}_${uniqueId}`;
};

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: 'Verify Email - Liberty Nutrition System',
      html: `<p>Click the following link to verify your email: <a href="${process.env.BASE_URL}/verify-email/${token}">Verify Email</a></p>\n<p>The link expires in 24hrs.</p>`,
    };

    await transporter.sendMail(mailOptions);

    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error.message);
    throw error;
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errorType: 'validationError', errors: errors.array() });
  }

  const { role, first_name, last_name, phone_number, email, password } =
    req.body;

  try {
    const existingUser = await userSchema.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Correo ya en uso.' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Se requiere contraseña.' });
    }

    if (role !== 'client' && role !== 'distributor') {
      return res.status(400).json({ message: 'Seleccione un tipo de cuenta.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userSchema.create({
      role,
      first_name,
      last_name,
      phone_number,
      email,
      password_hash: hashedPassword,
      is_verified: false,
    });

    const verificationToken = generateVerificationToken(newUser.user_id);

    await newUser.update(
      { verification_token: verificationToken },
      { where: { user_id: newUser.user_id } }
    );

    await sendVerificationEmail(email, newUser.verification_token);

    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.verify = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await userSchema.findOne({
      where: {
        verification_token: token,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: 'User is already verified.' });
    }

    user.is_verified = true;
    user.verification_token = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    console.log('Attempting login for email:', email);

    const user = await userSchema.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    console.log('User found:', user);

    if (!user) {
      console.log('Invalid email');
      return res.status(401).json({ message: 'El correo no es válido.' });
    }

    if (!user.is_verified) {
      console.log('User is not verified');
      return res
        .status(401)
        .json({ message: 'Por favor verifique su correo primero.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    console.log('Is password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'La contraseña no es válida.' });
    }

    const accessToken = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: '15m',
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.user_id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.cookie('jwt', accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    console.log('Login successful');

    res.status(200).json({ message: 'Login successful', user: user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie('jwt');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
