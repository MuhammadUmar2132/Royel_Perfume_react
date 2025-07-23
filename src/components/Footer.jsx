import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Info */}
        <div className="footer-brand">
          <h3 className="logo">Royal Parfum</h3>
          <p className="tagline">Luxury fragrances for the discerning</p>
          
          <div className="social-links">
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/collections">Collections</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li><FaMapMarkerAlt /> 123 Fragrance Ave, Paris, France</li>
            <li><FaPhone /> +1 (234) 567-8900</li>
            <li><FaEnvelope /> contact@royalparfum.com</li>
          </ul>
          
          <div className="newsletter">
            <h5>Subscribe to our newsletter</h5>
            <form>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Royal Parfum. All rights reserved.</p>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .footer {
          background-color: #ffffff;
          color: #333333;
          padding: 3rem 0 0;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
          font-family: 'Inter', sans-serif;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .footer-brand {
          max-width: 250px;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 700;
          color: #4f46e5;
          margin-bottom: 0.5rem;
        }

        .tagline {
          color: #666666;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          color: #4f46e5;
          font-size: 1.2rem;
          transition: color 0.3s;
        }

        .social-links a:hover {
          color: #333333;
        }

        .footer-section h4 {
          font-size: 1.1rem;
          margin-bottom: 1.2rem;
          color: #222222;
          font-weight: 600;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section li {
          margin-bottom: 0.8rem;
        }

        .footer-section a {
          color: #666666;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-section a:hover {
          color: #4f46e5;
        }

        .contact-info li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: #666666;
        }

        .newsletter {
          margin-top: 1.5rem;
        }

        .newsletter h5 {
          font-size: 0.9rem;
          margin-bottom: 0.8rem;
          color: #444444;
        }

        .newsletter input {
          width: 100%;
          padding: 0.6rem;
          border: 1px solid #dddddd;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .newsletter button {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.3s;
        }

        .newsletter button:hover {
          background-color: #4338ca;
        }

        .copyright {
          text-align: center;
          padding: 1.5rem 0;
          margin-top: 2rem;
          border-top: 1px solid #eeeeee;
          color: #888888;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          
          .footer-brand {
            max-width: 100%;
            text-align: center;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .footer-section {
            text-align: center;
          }
          
          .contact-info li {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;