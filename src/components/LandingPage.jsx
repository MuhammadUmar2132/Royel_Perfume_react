import React from 'react';
import './LandingPage.css'; 

const LandingPage = () => {
  const customers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      description: 'This solution transformed our customer engagement metrics. The intuitive interface and powerful analytics helped us increase conversions by 42%.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO, TechStart',
      description: 'Implementation was seamless and the support team was exceptional. We reduced our operational costs by 30% while improving performance.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'E-commerce Manager',
      description: 'The customizable features allowed us to tailor the platform perfectly to our needs. Our team adoption rate was 95% in the first week.',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
    }
  ];

  return (
    <div className="landing-pages">
      <header className="hero-section">
        <h1>Trusted by Industry Leaders</h1>
        <p className="subtitle">Join thousands of businesses transforming their operations with our solution</p>
      </header>
      
      <section className="customers-section">
        <div className="customers-grid">
          {customers.map(customer => (
            <div key={customer.id} className="customer-card">
              <div className="card-content">
                <div className="avatar-container">
                  <img src={customer.avatar} alt={customer.name} className="avatar" />
                </div>
                <h3>{customer.name}</h3>
                <p className="role">{customer.role}</p>
                <p className="description">"{customer.description}"</p>
              </div>
              <div className="card-footer">
                <div className="rating">★★★★★</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="cta-section">
        <button className="cta-button">Start Your Free Trial</button>
      </section>
    </div>
  );
};

export default LandingPage;