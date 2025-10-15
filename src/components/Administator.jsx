import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Administator.css";

const Administator = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="admin-title">Admin Login</h2>
        <p className="admin-subtitle">Access your dashboard securely</p>

        <form onSubmit={handleLogin} className="admin-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="admin-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
          />

          <button type="submit" className="admin-btn">
            Sign In
          </button>

          {error && <p className="admin-error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Administator;
