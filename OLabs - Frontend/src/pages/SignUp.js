import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Import the CSS file for styling

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default to Student

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: name,
        email,
        password,
        role,
      });

      // Assuming the API returns a token and role upon successful signup
      localStorage.setItem("token", res.data.token); // Store JWT
      localStorage.setItem("role", res.data.role); // Store role

      if (res.data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Sign Up</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            </select>

            <button type="submit" className="login-button">Sign Up</button>
          </form>
          <p className="register-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;