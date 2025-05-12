import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Typography, Tag, Button, Space, Spin, message, Input, Select, DatePicker, Row, Col, Dropdown } from 'antd';
import { ShoppingOutlined, SearchOutlined, DownloadOutlined, DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const OrdersListPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        status: 'ALL',
        paymentStatus: 'ALL',
        dateRange: null
    });
    const [exportLoading, setExportLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders');
                setOrders(response.data);
                setFilteredOrders(response.data);
            } catch (error) {
                message.error('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, orders]);

    const applyFilters = () => {
        let result = [...orders];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(order => 
                order.id.toString().includes(searchLower) ||
                order.status.toLowerCase().includes(searchLower) ||
                order.payment.status.toLowerCase().includes(searchLower)
            );
        }

        // Apply status filter
        if (filters.status !== 'ALL') {
            result = result.filter(order => order.status === filters.status);
        }

        // Apply payment status filter
        if (filters.paymentStatus !== 'ALL') {
            result = result.filter(order => order.payment.status === filters.paymentStatus);
        }

        // Apply date range filter
        if (filters.dateRange) {
            const [startDate, endDate] = filters.dateRange;
            result = result.filter(order => {
                const orderDate = dayjs(order.createdAt);
                return orderDate.isAfter(startDate) && orderDate.isBefore(endDate.add(1, 'day'));
            });
        }

        setFilteredOrders(result);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return 'orange';
            case 'PAID':
                return 'blue';
            case 'SHIPPED':
                return 'green';
            case 'DELIVERED':
                return 'green';
            case 'CANCELLED':
                return 'red';
            default:
                return 'default';
        }
    };

    const exportToCSV = async (format) => {
        setExportLoading(true);
        try {
            const data = filteredOrders.map(order => ({
                'Order ID': order.id,
                'Date': new Date(order.createdAt).toLocaleDateString(),
                'Total': `$${order.totalPrice.toFixed(2)}`,
                'Status': order.status,
                'Payment Status': order.payment.status,
                'Payment Method': order.payment.paymentMethod || 'N/A',
                'Transaction ID': order.payment.transactionId || 'N/A'
            }));

            if (format === 'csv') {
                const csvContent = [
                    Object.keys(data[0]).join(','),
                    ...data.map(row => Object.values(row).join(','))
                ].join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else if (format === 'json') {
                const jsonContent = JSON.stringify(data, null, 2);
                const blob = new Blob([jsonContent], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.json`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            message.success('Orders exported successfully');
        } catch (error) {
            message.error('Failed to export orders');
        } finally {
            setExportLoading(false);
        }
    };

    const exportMenuItems = [
        {
            key: 'csv',
            label: 'Export as CSV',
            icon: <DownloadOutlined />,
            onClick: () => exportToCSV('csv')
        },
        {
            key: 'json',
            label: 'Export as JSON',
            icon: <DownloadOutlined />,
            onClick: () => exportToCSV('json')
        }
    ];

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => `#${id}`,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString(),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Total',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => `$${price.toFixed(2)}`,
            sorter: (a, b) => a.totalPrice - b.totalPrice,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {status}
                </Tag>
            ),
            filters: [
                { text: 'PENDING', value: 'PENDING' },
                { text: 'PAID', value: 'PAID' },
                { text: 'SHIPPED', value: 'SHIPPED' },
                { text: 'DELIVERED', value: 'DELIVERED' },
                { text: 'CANCELLED', value: 'CANCELLED' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Payment Status',
            dataIndex: ['payment', 'status'],
            key: 'paymentStatus',
            render: (status) => (
                <Tag color={status === 'COMPLETED' ? 'green' : status === 'FAILED' ? 'red' : 'orange'}>
                    {status}
                </Tag>
            ),
            filters: [
                { text: 'PENDING', value: 'PENDING' },
                { text: 'COMPLETED', value: 'COMPLETED' },
                { text: 'FAILED', value: 'FAILED' },
                { text: 'REFUNDED', value: 'REFUNDED' },
            ],
            onFilter: (value, record) => record.payment.status === value,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button 
                        type="link" 
                        onClick={() => navigate(`/orders/${record.id}`)}
                    >
                        View Details
                    </Button>
                </Space>
            ),
        },
    ];

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <Title level={2}>My Orders</Title>
                    <Space>
                        <Dropdown
                            menu={{ items: exportMenuItems }}
                            placement="bottomRight"
                            disabled={filteredOrders.length === 0}
                        >
                            <Button 
                                type="primary" 
                                icon={<DownloadOutlined />}
                                loading={exportLoading}
                            >
                                Export <DownOutlined />
                            </Button>
                        </Dropdown>
                        <Button 
                            type="primary" 
                            icon={<ShoppingOutlined />}
                            onClick={() => navigate('/products')}
                        >
                            Continue Shopping
                        </Button>
                    </Space>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={6}>
                            <Input
                                placeholder="Search orders..."
                                prefix={<SearchOutlined />}
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Filter by status"
                                value={filters.status}
                                onChange={(value) => setFilters({ ...filters, status: value })}
                            >
                                <Option value="ALL">All Statuses</Option>
                                <Option value="PENDING">Pending</Option>
                                <Option value="PAID">Paid</Option>
                                <Option value="SHIPPED">Shipped</Option>
                                <Option value="DELIVERED">Delivered</Option>
                                <Option value="CANCELLED">Cancelled</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Filter by payment status"
                                value={filters.paymentStatus}
                                onChange={(value) => setFilters({ ...filters, paymentStatus: value })}
                            >
                                <Option value="ALL">All Payment Statuses</Option>
                                <Option value="PENDING">Pending</Option>
                                <Option value="COMPLETED">Completed</Option>
                                <Option value="FAILED">Failed</Option>
                                <Option value="REFUNDED">Refunded</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <RangePicker
                                style={{ width: '100%' }}
                                onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
                            />
                        </Col>
                    </Row>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredOrders}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} orders`,
                    }}
                />
            </Card>
        </div>
    );
};

export default OrdersListPage; 