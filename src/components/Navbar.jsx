import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu on navigation
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo} onClick={() => handleNavigate('/')}>
          Royale Parfum
        </div>

        <div className={styles.navLinks}>
          <a onClick={() => handleNavigate('/')}>Home</a>
          <a onClick={() => handleNavigate('/about')}>About</a>
          <a onClick={() => handleNavigate('/product')}>Product</a>
          <a onClick={() => handleNavigate('/client')}>Client</a>
          <a onClick={() => handleNavigate('/contact')}>Contact</a>
          <a onClick={() => handleNavigate('/dashboard')}>Dashboard</a>
          
        </div>

        <div className={styles.authButtons}>
          <button className={styles.signInBtn} onClick={() => handleNavigate('/signin')}>Sign In</button>
          <button className={styles.signUpBtn} onClick={() => handleNavigate('/signup')}>Sign Up</button>
        </div>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <a onClick={() => handleNavigate('/')}>Home</a>
          <a onClick={() => handleNavigate('/about')}>About</a>
          <a onClick={() => handleNavigate('/product')}>Product</a>
          <a onClick={() => handleNavigate('/client')}>Client</a>
          <a onClick={() => handleNavigate('/contact')}>Contact</a>
          <a onClick={() => handleNavigate('/dashboard')}>Dashboard</a>
          {/* <div className={styles.mobileAuthButtons}> */}
            <button className={styles.signInBtn} onClick={() => handleNavigate('/signin')}>Sign In</button>
            <button className={styles.signUpBtn} onClick={() => handleNavigate('/signup')}>Sign Up</button>
          {/* </div> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
