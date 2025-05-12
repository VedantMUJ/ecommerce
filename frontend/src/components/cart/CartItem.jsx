import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button, Input, Typography, Space, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const [quantity, setQuantity] = useState(item.quantity);
    const [loading, setLoading] = useState(false);

    const handleQuantityChange = async (newQuantity) => {
        if (newQuantity < 1) return;
        setLoading(true);
        try {
            await updateQuantity(item.id, newQuantity);
            setQuantity(newQuantity);
            message.success('Quantity updated successfully');
        } catch (error) {
            message.error(error.message);
            setQuantity(item.quantity);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async () => {
        setLoading(true);
        try {
            await removeFromCart(item.id);
            message.success('Item removed from cart');
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderBottom: '1px solid #f0f0f0'
        }}>
            <Space>
                <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <div>
                    <Text strong>{item.product.name}</Text>
                    <br />
                    <Text type="secondary">${item.unitPrice.toFixed(2)} each</Text>
                </div>
            </Space>

            <Space>
                <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    onBlur={() => handleQuantityChange(quantity)}
                    style={{ width: '60px' }}
                    disabled={loading}
                />
                <Text strong>${item.totalPrice.toFixed(2)}</Text>
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={handleRemove}
                    loading={loading}
                />
            </Space>
        </div>
    );
};

export default CartItem; 