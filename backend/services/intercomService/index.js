const express = require('express');
const bodyParser = require('body-parser');
const intercomController = require('./intercomController'); // Ensure the path is correct

require('dotenv').config(); // Load environment variables from .env

const app = express();
app.use(bodyParser.json());

// Routes
app.post('/intercom/request', intercomController.createIntercomRequest);
app.post('/intercom/export', intercomController.createExportJobRequest);

// Port configuration
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Intercom service is running on port ${PORT}`);
});
