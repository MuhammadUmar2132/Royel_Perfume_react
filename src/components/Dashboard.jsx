import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ]);
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState([
    { productId: 1, productName: 'Laptop', quantity: 15, location: 'Warehouse A' },
    { productId: 2, productName: 'Smartphone', quantity: 42, location: 'Warehouse B' },
    { productId: 3, productName: 'Desk Chair', quantity: 8, location: 'Warehouse A' },
  ]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8009/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product by MongoDB _id
  const deleteProduct = async (productId) => {
  if (window.confirm('Are you sure you want to delete this product?')) {
    try {
      await axios.delete(`http://localhost:8009/product/${productId}`);
      fetchProducts(); // refresh list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
};

  // Edit product (navigate to edit form)
  const editProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{users.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Products</h3>
                <p>{products.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Stock Items</h3>
                <p>{stock.length}</p>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="products-content">
            <h2>Product Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                   <tr key={product.productId || product._id}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.productDescription || 'N/A'}</td>
                    <td>${product.productPrice}</td>
                    <td>
                      {product.productImageUrl ? (
                        <img
                          src={product.productImageUrl}
                          alt={product.productName}
                          style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                      ) : 'No Image'}
                    </td>
                    <td>
                      <button className="edit-btn" onClick={() => editProduct(product.productId)}>Edit</button>
                      <button className="delete-btn" onClick={() => deleteProduct(product.productId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'users':
        return (
          <div className="users-content">
            <h2>User Management</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn" onClick={() => setUsers(users.filter(u => u.id !== user.id))}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'stock':
        return (
          <div className="stock-content">
            <h2>Stock Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {stock.map(item => (
                  <tr key={item.productId}>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Users</li>
          <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</li>
          <li className={activeTab === 'stock' ? 'active' : ''} onClick={() => setActiveTab('stock')}>Stock</li>
        </ul>
      </div>

      <div className="main-content">
        <header className="main-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="user-profile">
            <span>Welcome, Admin</span>
          </div>
        </header>
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
