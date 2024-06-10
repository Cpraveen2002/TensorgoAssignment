const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config(); // Load environment variables

const authRoutes = require('./authRoutes');
require('./passport'); // Ensure passport configuration is loaded

const app = express();

app.use(session({
  secret: 'your_randomly_generated_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

const PORT = process.env.AUTH_SERVICE_PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});
