const express = require('express');
const ServiceRequest = require('./serviceRequestModel');
const router = express.Router();

router.post('/service-requests', async (req, res) => {
  const { userId, category, comments } = req.body;
  try {
    const request = new ServiceRequest({ userId, category, comments });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/service-requests/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const requests = await ServiceRequest.find({ category });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
