import React, { useState } from 'react';
import axios from 'axios';
import './pproduct.css';

function ProductForm() {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productDescription: '',
    image: null
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    const data = new FormData();
    data.append('productId', formData.productId);
    data.append('productName', formData.productName);
    data.append('productDescription', formData.productDescription);
    data.append('image', formData.image);

    try {
      const res = await axios.post('http://localhost:8009/product', data);
      setMessage({ text: 'Product added successfully!', type: 'success' });
      setFormData({
        productId: '',
        productName: '',
        productDescription: '',
        image: null
      });
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.error || 'Error adding product', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <div className="product-form-card">
        <h2 className="form-title">Add New Product</h2>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="product-form">
          <div className="form-group">
            <label className="form-label">Product ID</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Product Description</label>
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Product Image</label>
            <div className="file-upload-wrapper">
              <label className="file-upload-label">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="file-upload-input"
                />
                <span className="file-upload-button">Choose File</span>
                <span className="file-upload-text">
                  {formData.image ? formData.image.name : 'No file chosen'}
                </span>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;