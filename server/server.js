const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const session = require('express-session');
const { sessionConfig } = require('./services/redis');
const productsRouter = require('./routes/products-routes');
const cartRouter = require('./routes/cart-routes');
const contactFormRouter = require('./routes/contact-form-routes');
const userRouter = require('./routes/user-routes');
const surveyRouter = require('./routes/survey-routes');
const inquiryRouter = require('./routes/inquiry-routes');
const passwordResetRouter = require('./routes/password-reset-routes');
const orderRouter = require('./routes/order-routes');
const adminRouter = require('./routes/admin-routes');
require('dotenv').config();

// Middleware
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://libertynutritionsystem.com'
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Configure express-session to use Redis
app.use(session(sessionConfig));

// routes
app.use('/api', productsRouter);
app.use('/api', cartRouter);
app.use('/api', contactFormRouter);
app.use('/api', userRouter);
app.use('/api', surveyRouter);
app.use('/api', inquiryRouter);
app.use('/api', orderRouter);
app.use('/api', adminRouter);
app.use('/api/password-reset', passwordResetRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
