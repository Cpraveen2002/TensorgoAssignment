import React, { useState } from 'react';
import axios from 'axios';

const ServiceRequestForm = ({ user }) => {
  const [category, setCategory] = useState('General Queries');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3003/api/requests', {
        userId: user._id,
        category,
        comments,
      });

      if (response.status === 201) {
        setMessage('Request submitted successfully.');
        setComments('');
      }
    } catch (error) {
      console.error('Error submitting request', error);
      setMessage('Error submitting request. Please try again.');
    }
  };

  return (
    <div>
      <h2>Submit a Customer Service Request</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="General Queries">General Queries</option>
            <option value="Product Features Queries">Product Features Queries</option>
            <option value="Product Pricing Queries">Product Pricing Queries</option>
            <option value="Product Feature Implementation Requests">Product Feature Implementation Requests</option>
          </select>
        </div>
        <div>
          <label>Comments:</label>
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
