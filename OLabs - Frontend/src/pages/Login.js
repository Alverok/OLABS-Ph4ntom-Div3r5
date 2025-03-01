import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      if (!res.data.token || !res.data.role) {
        throw new Error("Invalid response from server");
      }

      console.log("Logged in as:", res.data.role); // Debugging

      // ✅ Store token and role in localStorage BEFORE navigating
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); // ✅ Keeping original case (no lowercase)

      // ✅ Redirect based on role
      if (res.data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

      window.location.reload(); // 🔄 Force re-render to fix state issues
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="register-link">Don't have an account? <a href="/signup">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
