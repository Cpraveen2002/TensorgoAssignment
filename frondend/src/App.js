import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import ServiceRequestForm from './components/ServiceRequestForm';
import ServiceRequests from './components/ServiceRequests';

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <div>
        <h1>Customer Service Platform</h1>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/service-request" /> : <Login />} />
          <Route path="/service-request" element={user ? <ServiceRequestForm user={user} /> : <Navigate to="/" />} />
          <Route path="/service-requests" element={user ? <ServiceRequests /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
