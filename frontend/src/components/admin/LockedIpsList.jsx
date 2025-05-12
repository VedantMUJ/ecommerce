import React, { useState, useEffect } from 'react';
import { Table, Button, message, Space, Typography } from 'antd';
import { UnlockOutlined } from '@ant-design/icons';
import adminSecurityService from '../../services/adminSecurityService';

const { Title } = Typography;

const LockedIpsList = () => {
    const [lockedIps, setLockedIps] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLockedIps = async () => {
        try {
            const data = await adminSecurityService.getLockedIps();
            setLockedIps(data);
        } catch (error) {
            message.error('Failed to fetch locked IPs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLockedIps();
    }, []);

    const handleUnlockIp = async (ipAddress) => {
        try {
            await adminSecurityService.unlockIp(ipAddress);
            message.success('IP unlocked successfully');
            fetchLockedIps();
        } catch (error) {
            message.error('Failed to unlock IP');
        }
    };

    const columns = [
        {
            title: 'IP Address',
            dataIndex: 'ipAddress',
            key: 'ipAddress',
        },
        {
            title: 'Failed Attempts',
            dataIndex: 'failedAttempts',
            key: 'failedAttempts',
        },
        {
            title: 'Minutes Remaining',
            dataIndex: 'minutesRemaining',
            key: 'minutesRemaining',
        },
        {
            title: 'Last Attempt',
            dataIndex: 'lastAttemptTime',
            key: 'lastAttemptTime',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<UnlockOutlined />}
                        onClick={() => handleUnlockIp(record.ipAddress)}
                    >
                        Unlock
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title level={2}>Locked IP Addresses</Title>
            <Table
                columns={columns}
                dataSource={lockedIps}
                loading={loading}
                rowKey="ipAddress"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default LockedIpsList; 