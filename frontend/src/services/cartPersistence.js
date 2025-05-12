import axios from 'axios';

const CART_STORAGE_KEY = 'eshop_cart';
const CART_EXPIRY_DAYS = 7;

export const cartPersistence = {
    // Save cart to localStorage and backend
    async saveCart(cartItems) {
        try {
            // Save to localStorage
            const cartData = {
                items: cartItems,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));

            // Save to backend if user is authenticated
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('/api/cart/save', { items: cartItems });
            }
        } catch (error) {
            console.error('Failed to save cart:', error);
        }
    },

    // Load cart from localStorage and sync with backend
    async loadCart() {
        try {
            // Load from localStorage
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (!storedCart) return [];

            const cartData = JSON.parse(storedCart);
            const storedDate = new Date(cartData.timestamp);
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() - CART_EXPIRY_DAYS);

            // Check if cart data is expired
            if (storedDate < expiryDate) {
                localStorage.removeItem(CART_STORAGE_KEY);
                return [];
            }

            // If user is authenticated, sync with backend
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('/api/cart');
                if (response.data && response.data.items) {
                    return response.data.items;
                }
            }

            return cartData.items;
        } catch (error) {
            console.error('Failed to load cart:', error);
            return [];
        }
    },

    // Clear cart from both localStorage and backend
    async clearCart() {
        try {
            localStorage.removeItem(CART_STORAGE_KEY);
            const token = localStorage.getItem('token');
            if (token) {
                await axios.delete('/api/cart');
            }
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    },

    // Merge guest cart with user cart after login
    async mergeCarts(guestCartItems) {
        try {
            const token = localStorage.getItem('token');
            if (token && guestCartItems.length > 0) {
                await axios.post('/api/cart/merge', { items: guestCartItems });
                localStorage.removeItem(CART_STORAGE_KEY);
            }
        } catch (error) {
            console.error('Failed to merge carts:', error);
        }
    }
}; 