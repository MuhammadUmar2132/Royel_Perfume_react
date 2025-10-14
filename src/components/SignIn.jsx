import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ text: '', isError: false });

    if (!formData.username.trim() || !formData.password) {
      setStatusMessage({ text: 'Please fill in all fields', isError: true });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8009/login', {
        username: formData.username,
        password: formData.password,
      });

      console.log("Login Response:", response.data); // ✅ Debugging

      const { accessToken, user, message } = response.data || {};

      if (accessToken) {
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem('accessToken', accessToken);
        if (user) {
          storage.setItem('user', JSON.stringify(user));
        }

        setStatusMessage({ text: 'Login successful! Redirecting...', isError: false });
        navigate('/'); // Redirect to home page after successful login
      } else {
        setStatusMessage({
          text: message || `Unexpected response: ${JSON.stringify(response.data)}`,
          isError: true,
        });
      }
    } catch (error) {
      let errorMessage = 'An error occurred during login';

      if (error.response) {
        errorMessage = error.response.data?.message ||
                       `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'No response from server. Please try again.';
      }

      setStatusMessage({ text: errorMessage, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="signin-container">
      <div className="signin-header">
        <h1>Welcome Back</h1>
        <p>Sign in to access your account</p>
      </div>

      <div className="signin-content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
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
                disabled={isLoading}
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
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                Remember me
              </label>

              <a href="/forgot-password" className="forgot-password">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className="signin-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {statusMessage.text && (
            <p className={`status-message ${statusMessage.isError ? 'error' : 'success'}`}>
              {statusMessage.text}
            </p>
          )}

          <div className="signup-redirect">
            <p>Don't have an account? <button onClick={handleSignUpRedirect} disabled={isLoading}>Sign up</button></p>
          </div>
        </div>

        <div className="benefits-container">
          <h2>Benefits of signing in</h2>
          <ul className="benefits-list">
            <li>Access your personalized dashboard</li>
            <li>Save your preferences and settings</li>
            <li>Track your activity history</li>
            <li>Get personalized recommendations</li>
            <li>Connect with other users</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
