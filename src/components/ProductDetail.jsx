import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productdetail.css';

function ProductDetail() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8009/product');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-detail-container">
      <h2 className="detail-title">All Products</h2>
      <div className="product-cards">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.productImageUrl} alt={product.productName} className="product-image" />
            <h3 className="product-name">{product.productName}</h3>
            <p className="product-id">ID: {product.productId}</p>
            <p className="product-description">{product.productDescription}</p>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default ProductDetail;
