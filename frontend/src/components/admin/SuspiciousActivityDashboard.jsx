import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Select, Input, message, Card, Row, Col } from 'antd';
import { ReloadOutlined, FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import adminSecurityService from '../../services/adminSecurityService';

const { Option } = Select;

const SuspiciousActivityDashboard = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        activityType: null,
        status: null,
        sortBy: 'timestamp',
        ascending: false
    });

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const response = await adminSecurityService.getSuspiciousActivities(
                filters.activityType,
                filters.status,
                filters.sortBy,
                filters.ascending
            );
            setActivities(response.data);
        } catch (error) {
            message.error('Failed to fetch suspicious activities');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
        const interval = setInterval(fetchActivities, 30000);
        return () => clearInterval(interval);
    }, [filters]);

    const handleClearActivity = async (ipAddress) => {
        try {
            await adminSecurityService.clearActivity(ipAddress);
            message.success('Activity cleared successfully');
            fetchActivities();
        } catch (error) {
            message.error('Failed to clear activity');
        }
    };

    const columns = [
        {
            title: 'IP Address',
            dataIndex: 'ipAddress',
            key: 'ipAddress',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Activity Type',
            dataIndex: 'activityType',
            key: 'activityType',
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp) => new Date(timestamp).toLocaleString(),
        },
        {
            title: 'Attempt Count',
            dataIndex: 'attemptCount',
            key: 'attemptCount',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span style={{
                    color: status === 'HIGH' ? 'red' : 
                           status === 'MEDIUM' ? 'orange' : 'green'
                }}>
                    {status}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button 
                    type="link" 
                    danger 
                    onClick={() => handleClearActivity(record.ipAddress)}
                >
                    Clear
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Card title="Suspicious Activity Dashboard" extra={
                <Button 
                    type="primary" 
                    icon={<ReloadOutlined />} 
                    onClick={fetchActivities}
                >
                    Refresh
                </Button>
            }>
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Filter by Activity Type"
                            allowClear
                            onChange={(value) => setFilters({...filters, activityType: value})}
                        >
                            <Option value="LOGIN">Login Attempts</Option>
                            <Option value="PASSWORD_RESET">Password Reset</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Filter by Status"
                            allowClear
                            onChange={(value) => setFilters({...filters, status: value})}
                        >
                            <Option value="HIGH">High Risk</Option>
                            <Option value="MEDIUM">Medium Risk</Option>
                            <Option value="LOW">Low Risk</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Sort By"
                            value={filters.sortBy}
                            onChange={(value) => setFilters({...filters, sortBy: value})}
                        >
                            <Option value="timestamp">Timestamp</Option>
                            <Option value="attemptCount">Attempt Count</Option>
                            <Option value="status">Status</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Button
                            style={{ width: '100%' }}
                            icon={filters.ascending ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                            onClick={() => setFilters({...filters, ascending: !filters.ascending})}
                        >
                            {filters.ascending ? 'Ascending' : 'Descending'}
                        </Button>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={activities}
                    loading={loading}
                    rowKey="ipAddress"
                />
            </Card>
        </div>
    );
};

export default SuspiciousActivityDashboard; 