import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // We'll create this next

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Logging in with:', email, password);
    // After successful login, you might navigate to another page
    // navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Please enter your credentials to login</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-btn">Login</button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign up</span></p>
          <p className="forgot-password" onClick={() => navigate('/forgot-password')}>Forgot password?</p>
        </div>
      </div>
    </div>
  );
}

export default Login;