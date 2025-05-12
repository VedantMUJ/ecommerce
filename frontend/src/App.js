import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersListPage from './pages/OrdersListPage';

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
                <Router>
                    <Routes>
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout/:orderId" element={<CheckoutPage />} />
                        <Route path="/orders" element={<OrdersListPage />} />
                        <Route path="/orders/:orderId" element={<OrderConfirmationPage />} />
                    </Routes>
                </Router>
            </CartProvider>
        </ConfigProvider>
    );
}

export default App; 