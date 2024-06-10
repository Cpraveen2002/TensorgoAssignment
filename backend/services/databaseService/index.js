const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const dbRouter = require('./dbController');

dotenv.config();

const app = express();
const PORT = 3003;

app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's URL
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.use('/api', dbRouter);

app.listen(PORT, () => {
  console.log(`Database service is running on port ${PORT}`);
});
