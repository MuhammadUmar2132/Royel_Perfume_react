import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productPage.css';

function ProductPage() {
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

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8009/product/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    const handlePurchase = (productName) => {
        alert(`You have purchased: ${productName}`);
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

                        <div className="product-actions">
                            <button
                                className="delete-button"
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this product?")) {
                                        deleteProduct(product._id);
                                    }
                                }}
                            >
                                Delete
                            </button>
                            <button className="purchase-button" onClick={() => handlePurchase(product.productName)}>Purchase</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductPage;
