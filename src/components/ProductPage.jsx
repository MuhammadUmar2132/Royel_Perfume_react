import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./productPage.css";

function ProductPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8009/product");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  // ✅ Navigate to a given path
  const handleNavigate = (path) => {
    navigate(path);
  };

  // ✅ Add to cart with localStorage support
  const addToCart = (product) => {
    try {
      // Get existing cart (if any)
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if product already exists
      const existingProductIndex = cart.findIndex(
        (item) => item.productId === product.productId
      );

      if (existingProductIndex !== -1) {
        // If exists, increase quantity
        cart[existingProductIndex].quantity += 1;
      } else {
        // Add new product
        cart.push({ ...product, quantity: 1 });
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // ✅ Optional: show confirmation
      alert(`${product.productName} added to cart successfully!`);

      console.log("✅ Cart updated:", cart);
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      alert("Something went wrong while adding to cart!");
    }
  };

  // Fetch products when component loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle loading & error states
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  // ✅ Render products
  return (
    <div className="product-detail-container">
      <h2 className="detail-title">All Products</h2>

      <div className="product-cards">
        {products.map((product, index) => (
          <div
            key={product._id || product.productId || index}
            className="product-card"
          >
            <img
              src={product.productImageUrl}
              alt={product.productName}
              className="product-image"
            />
            <h3 className="product-name">{product.productName}</h3>
            <p className="product-id">ID: {product.productId}</p>
            <p className="product-description">{product.productDescription}</p>
            <p className="product-price">${product.productPrice}</p>

            <div className="product-actions">
              <button
                className="Buy-button"
                onClick={() => handleNavigate("/purchase")}
              >
                Buy Now
              </button>

              <button
                className="add-to-cart-button"
                onClick={() => {
                  addToCart(product);
                  handleNavigate("/cart"); // ✅ Redirect after adding
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
