import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Space, Spin, List, message } from 'antd';
import { CheckCircleOutlined, ShoppingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const OrderConfirmationPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/api/orders/${orderId}`);
                setOrder(response.data);
            } catch (error) {
                message.error('Failed to fetch order details');
                navigate('/orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, navigate]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!order) {
        return null;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
            <Card>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                    <Title level={2}>Order Confirmed!</Title>
                    <Text>Thank you for your purchase. Your order has been received.</Text>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <Title level={4}>Order Details</Title>
                    <Space direction="vertical">
                        <Text>Order Number: {order.id}</Text>
                        <Text>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
                        <Text>Status: {order.status}</Text>
                        <Text>Payment Status: {order.payment.status}</Text>
                    </Space>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <Title level={4}>Items</Title>
                    <List
                        dataSource={order.orderItems}
                        renderItem={item => (
                            <List.Item>
                                <Space>
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                    <div>
                                        <Text strong>{item.product.name}</Text>
                                        <br />
                                        <Text>Quantity: {item.quantity}</Text>
                                        <br />
                                        <Text>Price: ${item.totalPrice.toFixed(2)}</Text>
                                    </div>
                                </Space>
                            </List.Item>
                        )}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <Title level={4}>Total Amount</Title>
                    <Text strong>${order.totalPrice.toFixed(2)}</Text>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Space>
                        <Button 
                            type="primary" 
                            icon={<ShoppingOutlined />}
                            onClick={() => navigate('/products')}
                        >
                            Continue Shopping
                        </Button>
                        <Button onClick={() => navigate('/orders')}>
                            View All Orders
                        </Button>
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default OrderConfirmationPage; 