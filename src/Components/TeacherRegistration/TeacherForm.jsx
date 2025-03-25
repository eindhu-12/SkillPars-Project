import React, { useState } from "react";
import axios from "axios";
import "./TeacherForm.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherForm = () => {
  const predefinedCode = "2025"; // Hardcoded SkillPars Code
  const [enteredCode, setEnteredCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isFresher, setIsFresher] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    experience: "",
    qualifications: "",
    skills: "",
    interviewCompleted: "No",
  });

  const handleCodeChange = (e) => {
    setEnteredCode(e.target.value);
  };

  const verifyCode = () => {
    if (enteredCode === predefinedCode) {
      setIsCodeValid(true);
      toast.success("SkillPars Code Verified!");
    } else {
      toast.error("Invalid SkillPars Code!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if email or phone already exists
      const checkResponse = await axios.post("http://localhost:5000/checkDuplicate", {
        email: formData.email,
        phone: formData.phone,
      });

      if (checkResponse.data.exists) {
        toast.error("Email or Phone Number already exists!");
        return;
      }

      // Store data in database
      await axios.post("http://localhost:5000/registerTeacher", { ...formData });

      toast.success("Teacher Registered Successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        experience: "",
        qualifications: "",
        skills: "",
        interviewCompleted: "No",
      });
      setEnteredCode("");
      setIsCodeValid(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <h2>Teacher Registration</h2>

      {!isCodeValid ? (
        <div className="code-verification">
          <label>SkillPars Code:</label>
          <input type="text" value={enteredCode} onChange={handleCodeChange} placeholder="Enter SkillPars Code" required />
          <button className="verify" onClick={verifyCode}>Verify Code</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="teacher_Register">
          <label>Full Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Phone Number:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Course Name:</label>
          <input type="text" name="course" value={formData.course} onChange={handleChange} required />

          <label>Are you a Fresher?</label>
          <select name="fresher" onChange={(e) => setIsFresher(e.target.value === "Yes")}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {!isFresher && (
            <>
              <label>Years of Experience:</label>
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
            </>
          )}

          <label>Educational Qualifications:</label>
          <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} required />

          <label>Skills:</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />

          <label>Interview Completed?</label>
          <select name="interviewCompleted" value={formData.interviewCompleted} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default TeacherForm;
