import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests', error);
        setError('Error fetching requests. Please try again.');
      }
    };

    fetchRequests();
  }, []);

  const renderRequestsByCategory = (category) => {
    return requests
      .filter(request => request.category === category)
      .map(request => (
        <div key={request._id}>
          <p><strong>Comments:</strong> {request.comments}</p>
        </div>
      ));
  };

  return (
    <div>
      <h2>Customer Service Requests</h2>
      {error && <p>{error}</p>}
      <div>
        <h3>General Queries</h3>
        {renderRequestsByCategory('General Queries')}
      </div>
      <div>
        <h3>Product Features Queries</h3>
        {renderRequestsByCategory('Product Features Queries')}
      </div>
      <div>
        <h3>Product Pricing Queries</h3>
        {renderRequestsByCategory('Product Pricing Queries')}
      </div>
      <div>
        <h3>Product Feature Implementation Requests</h3>
        {renderRequestsByCategory('Product Feature Implementation Requests')}
      </div>
    </div>
  );
};

export default ServiceRequests;
