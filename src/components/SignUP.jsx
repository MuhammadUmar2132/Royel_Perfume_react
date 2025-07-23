import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        setStatusMessage('Registration successful! Redirecting to sign-in...');
        setFormData({
          name: '',
          username: '',
          email: '',
          password: '',
        });

        setTimeout(() => {
          navigate('/signin'); // Updated route
        }, 1500);
      } else {
        setStatusMessage('Unexpected response from server.');
      }
    } catch (error) {
      if (error.response) {
        setStatusMessage(`Error: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        setStatusMessage('Network error. Please check your connection.');
      } else {
        setStatusMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1>Join Our Community</h1>
        <p>Create your account to get started</p>
      </div>

      <div className="signup-content">
        <div className="role-container">
          <h2>Select Your Role</h2>
          <p>Choose how you'll use our platform</p>
          <div className="role-options">
            <div className="card-content">
              <div className="role-icon">👤</div>
              <h3>Regular User</h3>
              <p>Access basic features and content</p>
            </div>

            <label className="role-card">
              <div className="card-content">
                <div className="role-icon">🎨</div>
                <h3>Content Creator</h3>
                <p>Create and share your own content</p>
              </div>
            </label>

            <div className="card-content">
              <div className="role-icon">🏢</div>
              <h3>Business</h3>
              <p>Grow your brand with our tools</p>
            </div>
          </div>
        </div>

        <div className="form-container">
          <h2>Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>

            <button type="submit" className="signup-button">
              Sign Up <a href="/signin"></a>
            </button>
          </form>

          {/* Status Message */}
          {statusMessage && (
            <div className="status-message-box">
              <p className={`status-message ${statusMessage.includes('Error') ? 'error' : 'success'}`}>
                {statusMessage}
              </p>
            </div>
          )}

          <div className="login-redirect">
            <p>
              Already have an account? <a href="/signin">Sign in</a> {/* updated here too */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
