import React, { useState } from 'react';
import { FaBars, FaTimes, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu on navigation
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
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
          {/* <a onClick={() => handleNavigate('/dashboard')}>Dashboard</a> */}
        </div>

        <div className={styles.searchAndCart}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <FaSearch />
            </button>
          </form>

          <button 
            className={styles.cartButton} 
            onClick={() => handleNavigate('/Cart')}
            aria-label="Cart"
          >
            <FaShoppingCart />
            <span className={styles.cartCount}>0</span>
          </button>
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
          <form onSubmit={handleSearch} className={styles.mobileSearchForm}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.mobileSearchInput}
            />
            <button type="submit" className={styles.mobileSearchButton}>
              <FaSearch />
            </button>
          </form>

          <a onClick={() => handleNavigate('/')}>Home</a>
          <a onClick={() => handleNavigate('/about')}>About</a>
          <a onClick={() => handleNavigate('/product')}>Product</a>
          <a onClick={() => handleNavigate('/client')}>Client</a>
          <a onClick={() => handleNavigate('/contact')}>Contact</a>
          {/* <a onClick={() => handleNavigate('/dashboard')}>Dashboard</a> */}
          
          <div className={styles.mobileAuthCart}>
            <button className={styles.signInBtn} onClick={() => handleNavigate('/signin')}>Sign In</button>
            <button className={styles.signUpBtn} onClick={() => handleNavigate('/signup')}>Sign Up</button>
            <button 
              className={styles.mobileCartButton} 
              onClick={() => handleNavigate('/Cart')}
            >
              <FaShoppingCart /> Cart (0)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;