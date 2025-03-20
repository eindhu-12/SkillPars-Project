import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Demo.css";

const Demo = () => {
  // Extract course name from URL query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseFromURL = queryParams.get("course") || "Not Selected";

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    qualification: "",
    graduationYear: "",
    phone: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    course: courseFromURL, // Course from URL
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      alert(response.data.message); // Success message
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Error registering for the demo.");
    }
  };

  return (
    <section className="demoContainer">
      <h2>Demo Registration</h2>
      <div className="demoFormContainer">
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label>Highest Qualification:</label>
          <input type="text" name="qualification" onChange={handleChange} required />

          <label>Year of Graduation:</label>
          <input type="number" name="graduationYear" onChange={handleChange} required />

          <label>Course:</label>
          <input type="text" name="course" value={formData.course} readOnly />

          <label>Phone Number:</label>
          <input type="tel" name="phone" onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>

          <label>Country:</label>
          <input type="text" name="country" onChange={handleChange} required />

          <label>State:</label>
          <input type="text" name="state" onChange={handleChange} required />

          <label>City:</label>
          <input type="text" name="city" onChange={handleChange} required />

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Demo;
