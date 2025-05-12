import React, { useState, useEffect } from 'react';
import { Table, Button, message, Space, Typography } from 'antd';
import { UnlockOutlined } from '@ant-design/icons';
import adminSecurityService from '../../services/adminSecurityService';

const { Title } = Typography;

const LockedAccountsList = () => {
    const [lockedAccounts, setLockedAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLockedAccounts = async () => {
        try {
            const data = await adminSecurityService.getLockedAccounts();
            setLockedAccounts(data);
        } catch (error) {
            message.error('Failed to fetch locked accounts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLockedAccounts();
    }, []);

    const handleUnlockAccount = async (userId) => {
        try {
            await adminSecurityService.unlockAccount(userId);
            message.success('Account unlocked successfully');
            fetchLockedAccounts();
        } catch (error) {
            message.error('Failed to unlock account');
        }
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Failed Attempts',
            dataIndex: 'failedLoginAttempts',
            key: 'failedLoginAttempts',
        },
        {
            title: 'Locked Until',
            dataIndex: 'accountLockedUntil',
            key: 'accountLockedUntil',
            render: (text) => text ? new Date(text).toLocaleString() : 'N/A',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<UnlockOutlined />}
                        onClick={() => handleUnlockAccount(record.id)}
                    >
                        Unlock
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title level={2}>Locked Accounts</Title>
            <Table
                columns={columns}
                dataSource={lockedAccounts}
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default LockedAccountsList; 