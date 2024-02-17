const nodemailer = require('nodemailer');
const validator = require('validator');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

// Function to create a transporter
const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    // Check if there's a stored refresh token
    if (process.env.REFRESH_TOKEN) {
      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });
    }

    // Refresh the access token
    const refreshedToken = await new Promise((resolve, reject) => {
      oauth2Client.refreshAccessToken((err, tokens) => {
        if (err) {
          console.error('Error refreshing access token:', err.message);
          reject(err);
        } else {
          // Save the new refresh token (if provided)
          if (tokens.refresh_token) {
            process.env.REFRESH_TOKEN = tokens.refresh_token;
          }

          // Resolve with the access token
          resolve(tokens.access_token);
        }
      });
    });

    // Create the transporter with the refreshed token
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

// Handler for submitting the contact form
exports.submitContactForm = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, message } = req.body;

  const sanitizedFirstName = validator.escape(firstName);
  const sanitizedLastName = validator.escape(lastName);
  const sanitizedEmail = validator.escape(email);
  const sanitizedPhoneNumber = validator.escape(phoneNumber);
  const sanitizedMessage = validator.escape(message);

  if (
    validator.isEmail(sanitizedEmail) &&
    validator.isNumeric(sanitizedPhoneNumber)
  ) {
    try {
      let emailTransporter = await createTransporter();

      // Check if createTransporter returned a valid transporter
      if (!emailTransporter || emailTransporter instanceof Error) {
        console.error('ERROR: Unable to create transporter', emailTransporter);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      await emailTransporter.sendMail({
        from: process.env.USER_EMAIL,
        to: process.env.RECIPIENT_EMAIL,
        subject: 'New Contact Form Submission',
        text: `
            First Name: ${sanitizedFirstName}\n
            Last Name: ${sanitizedLastName}\n
            Email: ${sanitizedEmail}\n
            Phone Number: ${sanitizedPhoneNumber}\n
            Message: ${sanitizedMessage}
          `,
      });

      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (err) {
      console.error('ERROR: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid email or phone number' });
  }
};
