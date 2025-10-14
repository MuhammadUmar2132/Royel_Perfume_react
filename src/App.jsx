import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import CartPage from './components/CartPage';





 
import About from './components/About';
import ProductPage from './components/ProductPage';
import LandingPage from './components/LandingPage';
import Contact from './components/Contact';
import Home from './components/Home';
import SignUp from './components/SignUP';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
// import ProductDetail from './components/ProductDetail';
import Product from './components/Product'; 


function App() {
  return (
    <>
      <Navbar /> {/* Displayed on all routes */}

      <Routes>
        <Route path="/" element={ <>
          <Home /> <About /> <ProductPage /> <LandingPage /> <Contact />
          </>} 
        />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/client" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/cart" element={<CartPage />} />
       

         


        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      </Routes>
    </>
  );
}

export default App;
