import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersListPage from './pages/OrdersListPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ProductManagement from './components/admin/ProductManagement';
import UserManagement from './components/admin/UserManagement';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import Products from './pages/admin/Products';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const { admin, loading } = useAdminAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!admin) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1890ff',
                },
            }}
        >
            <CartProvider>
                <AdminAuthProvider>
                    <Router>
                        <Routes>
                            {/* Root Route */}
                            <Route path="/" element={<Navigate to="/admin" replace />} />
                            
                            {/* Customer Routes */}
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout/:orderId" element={<CheckoutPage />} />
                            <Route path="/orders" element={<OrdersListPage />} />
                            <Route path="/orders/:orderId" element={<OrderConfirmationPage />} />
                            
                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route
                                path="/admin/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <AdminDashboard>
                                            <div>Welcome to Admin Dashboard</div>
                                        </AdminDashboard>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/products"
                                element={
                                    <ProtectedRoute>
                                        <AdminDashboard>
                                            <Products />
                                        </AdminDashboard>
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/admin/users" element={<UserManagement />} />
                            
                            {/* Catch all route */}
                            <Route path="*" element={<Navigate to="/admin" replace />} />
                        </Routes>
                    </Router>
                </AdminAuthProvider>
            </CartProvider>
        </ConfigProvider>
    );
}

export default App; 