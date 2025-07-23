import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Dashboard.css';


function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' }
  ]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 699, category: 'Electronics' },
    { id: 3, name: 'Desk Chair', price: 199, category: 'Furniture' }
  ]);
  const [stock, setStock] = useState([
    { productId: 1, productName: 'Laptop', quantity: 15, location: 'Warehouse A' },
    { productId: 2, productName: 'Smartphone', quantity: 42, location: 'Warehouse B' },
    { productId: 3, productName: 'Desk Chair', quantity: 8, location: 'Warehouse A' }
  ]);

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
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
                      <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'products':
        return (
          <div className="products-content">
            <h2>Product Management</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
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
          <li 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </li>
          <li 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            Users
          </li>

          <li 
  className={activeTab === 'product' ? 'active' : ''}
  onClick={() => {
    setActiveTab('product');
    navigate('/add-product'); // 👈 your route path
  }}
>
  Add Product
</li>

          <li 
            className={activeTab === 'stock' ? 'active' : ''}
            onClick={() => setActiveTab('stock')}
          >
            Stock
          </li>
         
        </ul>
      </div>
      <div className="main-content">
        <header className="main-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="user-profile">
            <span>Welcome, Admin</span>
          </div>
        </header>
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;