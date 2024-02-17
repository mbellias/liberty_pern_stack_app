const userSchema = require('../models/user');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
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

exports.checkEmailValidity = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await userSchema.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (user) {
      // Generate a unique token
      const reset_token = crypto.randomBytes(20).toString('hex');

      // Set the token and expiration time in the database
      const reset_token_expires = new Date(Date.now() + 3600000); // 1 hour from now
      await userSchema.update(
        { reset_token: reset_token, reset_token_expires: reset_token_expires },
        { where: { email: email } }
      );

      // Send the password reset email
      const transporter = await createTransporter();
      const resetLink = `${process.env.BASE_URL}/new-password/${reset_token}`;

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Password Reset',
        html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
      };

      await transporter.sendMail(mailOptions);

      // Email sent successfully
      return res.status(200).json({ message: 'Email sent for password reset' });
    } else {
      // Email is not found in the database
      return res.status(404).json({ message: 'Email not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updatePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find user by reset token and check expiration
    const user = await userSchema.findOne({
      where: {
        reset_token: {
          [Op.eq]: token,
        },
        reset_token_expires: {
          [Op.gte]: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear the resetToken fields
    await userSchema.update(
      {
        password_hash: hashedPassword,
        reset_token: null,
        reset_token_expires: null,
      },
      { where: { reset_token: token } }
    );

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
