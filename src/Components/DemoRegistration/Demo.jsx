// src/Client/Demo.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Demo.css'; // Assuming you have some basic styling

const Demo = () => {
  const location = useLocation();

  // Extract course from URL query parameter
  const searchParams = new URLSearchParams(location.search);
  const courseFromUrl = searchParams.get('course') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: courseFromUrl,
    phone: '',
    gender: '',
    qualification: '',
    city: '',
    country: '',
  });

  // Update formData if course changes in URL
  useEffect(() => {
    setFormData((prev) => ({ ...prev, course: courseFromUrl }));
  }, [courseFromUrl]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);

      // const response = await axios.post('/api/register', formData);
      alert(response.data.message);
      window.location.href = '/'; // Redirect to homepage after success
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="demo-container">
      <h1>Demo Registration</h1>
      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            readOnly // Course is pre-filled and not editable
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default Demo;