import React from 'react';
import { Tabs, Card } from 'antd';
import LockedIpsList from './LockedIpsList';
import LockedAccountsList from './LockedAccountsList';

const { TabPane } = Tabs;

const SecurityDashboard = () => {
    return (
        <Card>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Locked IPs" key="1">
                    <LockedIpsList />
                </TabPane>
                <TabPane tab="Locked Accounts" key="2">
                    <LockedAccountsList />
                </TabPane>
            </Tabs>
        </Card>
    );
};

export default SecurityDashboard; 