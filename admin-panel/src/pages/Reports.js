import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaShoppingCart, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { THEME_CONFIG } from '../config';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  transition: all 0.3s ease;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme === 'dark' ? '0 8px 16px rgba(0, 0, 0, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.1)'};
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatTitle = styled.h3`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
  margin: 0;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${THEME_CONFIG.light.buttonText};
`;

const StatValue = styled.div`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.isPositive ? '#10B981' : '#EF4444'};
  font-size: 0.875rem;
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h2`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  margin: 0;
  font-size: 1.25rem;
`;

const ChartPlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
`;

const RecentActivity = styled.div`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${THEME_CONFIG.light.buttonText};
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.h4`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  margin: 0 0 0.25rem 0;
`;

const ActivityTime = styled.p`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
  margin: 0;
  font-size: 0.875rem;
`;

const Reports = () => {
  const { theme } = useTheme();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      isPositive: true,
      icon: <FaDollarSign />
    },
    {
      title: 'Total Orders',
      value: '2,338',
      change: '+15.3%',
      isPositive: true,
      icon: <FaShoppingCart />
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '-2.5%',
      isPositive: false,
      icon: <FaUsers />
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+4.1%',
      isPositive: true,
      icon: <FaChartLine />
    }
  ];

  const recentActivities = [
    {
      title: 'New order #1234',
      time: '2 minutes ago',
      icon: <FaShoppingCart />,
      amount: '$299.99'
    },
    {
      title: 'User registration',
      time: '5 minutes ago',
      icon: <FaUsers />,
      user: 'alex.morgan@example.com'
    },
    {
      title: 'Payment received',
      time: '10 minutes ago',
      icon: <FaDollarSign />,
      amount: '$1,299.99'
    },
    {
      title: 'New product added',
      time: '15 minutes ago',
      icon: <FaChartLine />,
      product: 'Premium Headphones'
    },
    {
      title: 'Order shipped',
      time: '20 minutes ago',
      icon: <FaShoppingCart />,
      order: '#1233'
    },
    {
      title: 'New review',
      time: '25 minutes ago',
      icon: <FaUsers />,
      rating: '5 stars'
    }
  ];

  const monthlyStats = {
    revenue: [
      { month: 'Jan', value: 25000 },
      { month: 'Feb', value: 32000 },
      { month: 'Mar', value: 28000 },
      { month: 'Apr', value: 35000 },
      { month: 'May', value: 42000 },
      { month: 'Jun', value: 45231 }
    ],
    orders: [
      { month: 'Jan', value: 1500 },
      { month: 'Feb', value: 1800 },
      { month: 'Mar', value: 1600 },
      { month: 'Apr', value: 2000 },
      { month: 'May', value: 2200 },
      { month: 'Jun', value: 2338 }
    ],
    users: [
      { month: 'Jan', value: 800 },
      { month: 'Feb', value: 950 },
      { month: 'Mar', value: 1100 },
      { month: 'Apr', value: 1200 },
      { month: 'May', value: 1180 },
      { month: 'Jun', value: 1234 }
    ]
  };

  return (
    <Container theme={theme}>
      <MainContent>
        <Header>
          <Title theme={theme}>Reports & Analytics</Title>
        </Header>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              theme={theme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <StatHeader>
                <StatTitle theme={theme}>{stat.title}</StatTitle>
                <StatIcon theme={theme}>{stat.icon}</StatIcon>
              </StatHeader>
              <StatValue theme={theme}>{stat.value}</StatValue>
              <StatChange isPositive={stat.isPositive}>
                {stat.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                {stat.change}
              </StatChange>
            </StatCard>
          ))}
        </StatsGrid>

        <ChartSection>
          <ChartCard
            theme={theme}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChartHeader>
              <ChartTitle theme={theme}>Revenue Overview</ChartTitle>
            </ChartHeader>
            <ChartPlaceholder theme={theme}>
              Revenue Chart Placeholder
            </ChartPlaceholder>
          </ChartCard>

          <RecentActivity
            theme={theme}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChartHeader>
              <ChartTitle theme={theme}>Recent Activity</ChartTitle>
            </ChartHeader>
            {recentActivities.map((activity, index) => (
              <ActivityItem key={index} theme={theme}>
                <ActivityIcon theme={theme}>{activity.icon}</ActivityIcon>
                <ActivityContent>
                  <ActivityTitle theme={theme}>{activity.title}</ActivityTitle>
                  <ActivityTime theme={theme}>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </RecentActivity>
        </ChartSection>

        <ChartSection>
          <ChartCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChartHeader>
              <ChartTitle theme={theme}>Order Statistics</ChartTitle>
            </ChartHeader>
            <ChartPlaceholder theme={theme}>
              Order Statistics Chart Placeholder
            </ChartPlaceholder>
          </ChartCard>

          <ChartCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ChartHeader>
              <ChartTitle theme={theme}>User Growth</ChartTitle>
            </ChartHeader>
            <ChartPlaceholder theme={theme}>
              User Growth Chart Placeholder
            </ChartPlaceholder>
          </ChartCard>
        </ChartSection>
      </MainContent>
    </Container>
  );
};

export default Reports; 