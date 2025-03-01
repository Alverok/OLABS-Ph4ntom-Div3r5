import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import axios from "axios";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && role) {
      axios
        .get("http://localhost:5000/api/auth/validate", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          console.log("Session expired. Logging out...");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setToken(null);
          setRole(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token, role]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <Navigate to="/login" /> : <Navigate to={role === "Admin" ? "/admin" : "/dashboard"} />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to={role === "Admin" ? "/admin" : "/dashboard"} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={token && role !== "Admin" ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/admin" element={token && role === "Admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
