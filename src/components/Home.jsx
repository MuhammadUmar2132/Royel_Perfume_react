import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Assuming you have a CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Modern Solutions for <span>Your Business</span></h1>
          <p>
            Streamline your operations with our cutting-edge platform designed to boost productivity and drive growth.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn" onClick={handleLoginClick}>
              Show More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://plus.unsplash.com/premium_photo-1676748933022-e1183e997436?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJhZ3JhbmNlfGVufDB8fDB8fHww"
            alt="Dashboard preview"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
