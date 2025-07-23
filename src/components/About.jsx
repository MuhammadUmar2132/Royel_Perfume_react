import React from 'react';
import './About.css'; // We'll create this CSS file next

const About = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-us-image">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Our modern office space" 
          />
        </div>
        
        <div className="about-us-text">
          <h2 className="brand-heading">Our Brand Story</h2>
          <p className="brand-subheading">Innovating since 2015</p>
          
          <div className="brand-description">
            <p>We started with a simple idea: to create products that blend seamlessly into modern life while pushing the boundaries of design and technology.</p>
            
            <p>Today, we're a team of passionate creators, designers, and engineers dedicated to crafting experiences that matter. Our approach combines aesthetic elegance with functional simplicity.</p>
            
            <ul className="brand-features">
              <li>User-centered design philosophy</li>
              <li>Sustainable production methods</li>
              <li>Cutting-edge technology integration</li>
              <li>Award-winning customer support</li>
            </ul>
          </div>
          
          <button className="cta-button">Explore Our Journey</button>
        </div>
      </div>
    </div>
  );
};

export default About;