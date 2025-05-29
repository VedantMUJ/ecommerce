import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-menu">
        <div className="admin-menu-item">
          <h2>Product Management</h2>
          <Link to="/admin/products" className="admin-link">Manage Products</Link>
          <Link to="/admin/products/add" className="admin-link">Add New Product</Link>
          <Link to="/admin/categories" className="admin-link">Manage Categories</Link>
        </div>
        
        <div className="admin-menu-item">
          <h2>User Management</h2>
          <Link to="/admin/users" className="admin-link">Manage Users</Link>
          <Link to="/admin/roles" className="admin-link">Manage Roles</Link>
        </div>
        
        <div className="admin-menu-item">
          <h2>Order Management</h2>
          <Link to="/admin/orders" className="admin-link">View Orders</Link>
          <Link to="/admin/orders/pending" className="admin-link">Pending Orders</Link>
        </div>
        
        <div className="admin-menu-item">
          <h2>Security</h2>
          <Link to="/admin/security" className="admin-link">Security Dashboard</Link>
          <Link to="/admin/blocked-ips" className="admin-link">Blocked IPs</Link>
          <Link to="/admin/suspicious-activities" className="admin-link">Suspicious Activities</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 