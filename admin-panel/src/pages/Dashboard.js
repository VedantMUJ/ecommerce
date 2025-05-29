import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaHome, FaBox, FaSignOutAlt, FaSun, FaMoon, FaUsers, FaChartLine, FaCog, FaChartBar } from 'react-icons/fa';
import { API_URL, THEME_CONFIG } from '../config';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  transition: all 0.3s ease;
`;

const Sidebar = styled.div`
  width: 250px;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  padding: 2rem;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    transform: translateX(5px);
  }

  &.active {
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
    color: ${THEME_CONFIG.light.buttonText};
    box-shadow: ${props => props.theme === 'dark' ? '0 0 15px rgba(99, 102, 241, 0.5)' : '0 0 15px rgba(99, 102, 241, 0.3)'};
  }

  svg {
    font-size: 1.25rem;
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: ${props => props.theme === 'dark' ? '#ffffff' : THEME_CONFIG.light.text};
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-weight: 500;

  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : THEME_CONFIG.light.hover};
    transform: translateX(5px);
    box-shadow: ${props => props.theme === 'dark' 
      ? '0 0 15px rgba(59, 130, 246, 0.5)' 
      : '0 0 10px rgba(37, 99, 235, 0.3)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme === 'dark' 
      ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))' 
      : 'linear-gradient(45deg, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.1))'};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  svg {
    font-size: 1.2rem;
    transition: all 0.3s ease;
    color: ${props => props.theme === 'dark' ? '#ffffff' : THEME_CONFIG.light.text};
  }

  &:hover svg {
    transform: scale(1.1);
    color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: ${props => props.theme === 'dark' ? '#ff4444' : THEME_CONFIG.light.error};
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-top: auto;
  position: relative;
  overflow: hidden;
  font-weight: 500;

  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 68, 68, 0.1)' : THEME_CONFIG.light.hover};
    transform: translateX(5px);
    box-shadow: ${props => props.theme === 'dark' 
      ? '0 0 15px rgba(255, 68, 68, 0.5)' 
      : '0 0 10px rgba(220, 38, 38, 0.3)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme === 'dark' 
      ? 'linear-gradient(45deg, rgba(255, 68, 68, 0.1), rgba(255, 68, 68, 0.05))' 
      : 'linear-gradient(45deg, rgba(220, 38, 38, 0.1), rgba(248, 113, 113, 0.1))'};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  svg {
    font-size: 1.2rem;
    transition: all 0.3s ease;
    color: ${props => props.theme === 'dark' ? '#ff4444' : THEME_CONFIG.light.error};
  }

  &:hover svg {
    transform: scale(1.1);
    color: ${props => props.theme === 'dark' ? '#ff4444' : THEME_CONFIG.light.error};
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const WelcomeCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};

  h1 {
    color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme === 'dark' ? '0 8px 16px rgba(0, 0, 0, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.1)'};
  }
`;

const StatTitle = styled.h3`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.div`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  color: ${props => props.positive ? THEME_CONFIG.light.success : THEME_CONFIG.light.error};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const RecentActivity = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  margin-bottom: 2rem;
`;

const ActivityTitle = styled.h2`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  border-radius: 8px;
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.hover : THEME_CONFIG.light.hover};
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

const ActivityText = styled.p`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ActivityTime = styled.span`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
  font-size: 0.75rem;
`;

const QuickActions = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};

  &:hover {
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
    color: ${THEME_CONFIG.light.buttonText};
    transform: translateY(-2px);
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0
  });
  const [recentActivities, setRecentActivities] = useState([
    {
      icon: '📦',
      text: 'New product added: Premium Headphones',
      time: '2 minutes ago'
    },
    {
      icon: '💰',
      text: 'New order received: #12345',
      time: '15 minutes ago'
    },
    {
      icon: '👤',
      text: 'New user registered: john.doe@example.com',
      time: '1 hour ago'
    }
  ]);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_URL}/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Container theme={theme}>
      <Sidebar theme={theme}>
        <Logo theme={theme}>
          <FaBox /> Admin Panel
        </Logo>
        <NavLinks>
          <NavLink to="/dashboard" active={true} theme={theme}>
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="/products" theme={theme}>
            <FaBox /> Products
          </NavLink>
          <NavLink to="/users" theme={theme}>
            <FaUsers /> Users
          </NavLink>
          <NavLink to="/reports" theme={theme}>
            <FaChartBar /> Reports
          </NavLink>
          <NavLink to="/settings" theme={theme}>
            <FaCog /> Settings
          </NavLink>
        </NavLinks>
        <ThemeToggle onClick={toggleTheme} theme={theme}>
          {isDark ? <FaSun /> : <FaMoon />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </ThemeToggle>
        <LogoutButton onClick={handleLogout} theme={theme}>
          <FaSignOutAlt /> Logout
        </LogoutButton>
      </Sidebar>

      <MainContent>
        <WelcomeCard
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1>Welcome back, Admin!</h1>
          <p>Here's what's happening with your store today.</p>
        </WelcomeCard>

        <DashboardGrid>
          <StatCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StatTitle theme={theme}>Total Products</StatTitle>
            <StatValue theme={theme}>{stats.totalProducts}</StatValue>
            <StatChange positive theme={theme}>↑ 12% from last month</StatChange>
          </StatCard>

          <StatCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <StatTitle theme={theme}>Total Orders</StatTitle>
            <StatValue theme={theme}>{stats.totalOrders}</StatValue>
            <StatChange positive theme={theme}>↑ 8% from last month</StatChange>
          </StatCard>

          <StatCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <StatTitle theme={theme}>Total Revenue</StatTitle>
            <StatValue theme={theme}>{formatCurrency(stats.totalRevenue)}</StatValue>
            <StatChange positive theme={theme}>↑ 15% from last month</StatChange>
          </StatCard>

          <StatCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <StatTitle theme={theme}>Total Users</StatTitle>
            <StatValue theme={theme}>{stats.totalUsers}</StatValue>
            <StatChange positive theme={theme}>↑ 5% from last month</StatChange>
          </StatCard>
        </DashboardGrid>

        <RecentActivity
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <ActivityTitle theme={theme}>Recent Activity</ActivityTitle>
          <ActivityList>
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                theme={theme}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ActivityIcon theme={theme}>
                  {activity.icon}
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText theme={theme}>{activity.text}</ActivityText>
                  <ActivityTime theme={theme}>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </ActivityList>
        </RecentActivity>

        <QuickActions
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <ActionButton
            theme={theme}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaBox /> Add New Product
          </ActionButton>
          <ActionButton
            theme={theme}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaChartBar /> View Reports
          </ActionButton>
          <ActionButton
            theme={theme}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaUsers /> Manage Users
          </ActionButton>
          <ActionButton
            theme={theme}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaCog /> Settings
          </ActionButton>
        </QuickActions>
      </MainContent>
    </Container>
  );
};

export default Dashboard; 