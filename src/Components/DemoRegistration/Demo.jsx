import React from "react";
import { useLocation } from "react-router-dom";
import "./Demo.css";

const Demo = () => {
  // Extract course name from URL query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseFromURL = queryParams.get("course") || "Not Selected";

  return (
    <section className="demoContainer">
      <h2>Demo Registration</h2>
      <div className="demoFormContainer">
        <form action="">

          <label>Name :</label>
          <input type="text" required />

          <label>Email :</label>
          <input type="email" required />

          <label>Highest Qualification :</label>
          <input type="text" required />

          <label>Year of Graduation :</label>
          <input type="number" required />

          <label>Course:</label>
          <input type="text" value={courseFromURL} readOnly />

          <label>Phone Number :</label>
          <input type="tel" required />

          <label>Gender :</label>
          <select required>
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Prefer not to say">Prefer to not say</option>
          </select>

          <label>Country :</label>
          <input type="text" required />

          <label>State :</label>
          <input type="text" required />

          <label>City :</label>
          <input type="text" required />

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Demo;
