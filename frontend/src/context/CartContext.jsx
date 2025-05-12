import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            const response = await axios.get('/api/cart');
            setCart(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch cart');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (productId, quantity) => {
        try {
            const response = await axios.post('/api/cart/items', {
                productId,
                quantity
            });
            setCart(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add item to cart');
            throw err;
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            const response = await axios.patch(`/api/cart/items/${itemId}?quantity=${quantity}`);
            setCart(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update quantity');
            throw err;
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const response = await axios.delete(`/api/cart/items/${itemId}`);
            setCart(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to remove item from cart');
            throw err;
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete('/api/cart');
            setCart(null);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to clear cart');
            throw err;
        }
    };

    const checkout = async () => {
        try {
            const response = await axios.post('/api/cart/checkout');
            setCart(null);
            setError(null);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to checkout');
            throw err;
        }
    };

    const value = {
        cart,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkout
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}; 