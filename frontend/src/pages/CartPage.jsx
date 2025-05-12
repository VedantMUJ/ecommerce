import React from 'react';
import { useCart } from '../context/CartContext';
import { Button, Card, Typography, Space, Spin, Empty, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartItem from '../components/cart/CartItem';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const CartPage = () => {
    const { cart, loading, error, clearCart, checkout } = useCart();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        try {
            const order = await checkout();
            message.success('Order created successfully');
            navigate(`/checkout/${order.id}`);
        } catch (error) {
            message.error(error.message);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Text type="danger">{error}</Text>
            </div>
        );
    }

    if (!cart || cart.cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Empty
                    image={<ShoppingCartOutlined style={{ fontSize: '64px' }} />}
                    description="Your cart is empty"
                >
                    <Button type="primary" onClick={() => navigate('/products')}>
                        Continue Shopping
                    </Button>
                </Empty>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
            <Card>
                <Title level={2}>Shopping Cart</Title>
                
                {cart.cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '24px',
                    padding: '16px',
                    backgroundColor: '#fafafa',
                    borderRadius: '4px'
                }}>
                    <Space>
                        <Button onClick={clearCart}>Clear Cart</Button>
                        <Button onClick={() => navigate('/products')}>
                            Continue Shopping
                        </Button>
                    </Space>
                    
                    <Space>
                        <Text strong>Total: ${cart.totalPrice.toFixed(2)}</Text>
                        <Button type="primary" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default CartPage; 