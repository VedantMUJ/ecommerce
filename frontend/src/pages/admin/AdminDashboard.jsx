import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBox, FaChartBar, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f6fa;
`;

const Sidebar = styled(motion.div)`
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SidebarHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const MenuItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ToggleButton = styled(motion.button)`
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const AdminDashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: <FaBox />, text: 'Products', path: '/admin/products' },
    { icon: <FaChartBar />, text: 'Analytics', path: '/admin/analytics' },
  ];

  return (
    <DashboardContainer>
      <Sidebar
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
      >
        <SidebarHeader>Admin Panel</SidebarHeader>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            whileHover={{ x: 5 }}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.text}
          </MenuItem>
        ))}
        <MenuItem
          whileHover={{ x: 5 }}
          onClick={handleLogout}
          style={{ marginTop: 'auto' }}
        >
          <FaSignOutAlt />
          Logout
        </MenuItem>
      </Sidebar>

      <Content>
        <Header>
          <ToggleButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </ToggleButton>
        </Header>
        {children}
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard; 