const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  userId: String,
  category: {
    type: String,
    enum: ['General Queries', 'Product Features Queries', 'Product Pricing Queries', 'Product Feature Implementation Requests'],
    required: true
  },
  comments: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;
