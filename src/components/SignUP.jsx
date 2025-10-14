import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8009/register',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      // ✅ check backend response instead of only status
      if (response.data && response.data.user) {
        setStatusMessage('Registration successful! Redirecting...');

        // Reset form
        setFormData({
          name: '',
          username: '',
          email: '',
          password: '',
        });

        setTimeout(() => {
          navigate('/signin');
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="threejs-background">
        {/* 3D background would be implemented here */}
      </div>
      
      <div className="signup-content-wrapper">
        <div className="signup-header">
          <h1>Join Our Community</h1>
          <p>Create your account to get started</p>
        </div>

        <div className="signup-content">
          <div className="form-container">
            <h2>Create Your Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
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
                  placeholder="Choose a username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
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
                  placeholder="Create a strong password"
                  required
                />
                <div className="password-hint">
                  Use at least 8 characters with a mix of letters, numbers & symbols
                </div>
              </div>

              <button 
                type="submit" 
                className={`signup-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            {/* Status Message */}
            {statusMessage && (
              <div className="status-message-box">
                <p
                  className={`status-message ${
                    statusMessage.includes('Error') ? 'error' : 'success'
                  }`}
                >
                  {statusMessage}
                </p>
              </div>
            )}

            <div className="social-signup">
              <p>Or sign up with</p>
              <div className="social-buttons">
                <button className="social-button google">
                  <span className="social-icon">G</span>
                  <span>Google</span>
                </button>
                <button className="social-button facebook">
                  <span className="social-icon">f</span>
                  <span>Facebook</span>
                </button>
              </div>
            </div>

            <div className="login-redirect">
              <p>
                Already have an account? <Link to="/signin">Sign in</Link>
              </p>
            </div>
          </div>

          <div className="benefits-container">
            <h2>Why Join Us?</h2>
            <ul className="benefits-list">
              <li>Access exclusive content and features</li>
              <li>Personalized experience tailored to you</li>
              <li>Connect with like-minded people</li>
              <li>Save your progress and preferences</li>
              <li>Get personalized recommendations</li>
              <li>Join discussions and communities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
