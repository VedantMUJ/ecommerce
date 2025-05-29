import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEdit, FaTrash, FaUserShield } from 'react-icons/fa';
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

const AddButton = styled(motion.button)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  color: ${THEME_CONFIG.light.buttonText};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};

  &:hover {
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.hover : THEME_CONFIG.light.hover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const UserCard = styled(motion.div)`
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

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: ${THEME_CONFIG.light.buttonText};
  font-size: 2rem;
`;

const UserName = styled.h3`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

const UserEmail = styled.p`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
  margin: 0.5rem 0;
  text-align: center;
  opacity: 0.8;
`;

const UserRole = styled.div`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  font-weight: bold;
  margin: 0.5rem 0;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.875rem;
`;

const UserActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  color: ${THEME_CONFIG.light.buttonText};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};

  &:hover {
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.hover : THEME_CONFIG.light.hover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  border-radius: 4px;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.textSecondary : THEME_CONFIG.light.textSecondary};
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  border-radius: 4px;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  }
`;

const Users = () => {
  const { theme } = useTheme();
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Arjun Sharma',
      email: 'arjun.sharma@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-02-20 10:30 AM'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-02-20 09:15 AM'
    },
    {
      id: 3,
      name: 'Rahul Gupta',
      email: 'rahul.gupta@example.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: '2024-02-19 03:45 PM'
    },
    {
      id: 4,
      name: 'Ananya Singh',
      email: 'ananya.singh@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-02-20 11:20 AM'
    },
    {
      id: 5,
      name: 'Vikram Malhotra',
      email: 'vikram.malhotra@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-02-20 08:45 AM'
    },
    {
      id: 6,
      name: 'Meera Kapoor',
      email: 'meera.kapoor@example.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: '2024-02-18 02:30 PM'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingUser 
        ? `http://localhost:5000/api/admin/users/${editingUser._id}`
        : 'http://localhost:5000/api/admin/users';
      
      const method = editingUser ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to save user');
      }

      const savedUser = await response.json();
      
      if (editingUser) {
        setUsers(users.map(u => 
          u._id === savedUser._id ? savedUser : u
        ));
      } else {
        setUsers([savedUser, ...users]);
      }
      
      setIsModalOpen(false);
      setFormData({ name: '', email: '', role: 'user' });
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        setUsers(users.filter(u => u._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'user'
    });
    setIsModalOpen(true);
  };

  return (
    <Container theme={theme}>
      <MainContent>
        <Header>
          <Title theme={theme}>Users Management</Title>
          <AddButton
            theme={theme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingUser(null);
              setFormData({ name: '', email: '', role: 'user' });
              setIsModalOpen(true);
            }}
          >
            <FaUserPlus /> Add User
          </AddButton>
        </Header>

        <UserGrid>
          {users.map((user) => (
            <UserCard
              key={user._id}
              theme={theme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserAvatar theme={theme}>
                <FaUserShield />
              </UserAvatar>
              <UserName theme={theme}>{user.name}</UserName>
              <UserEmail theme={theme}>{user.email}</UserEmail>
              <UserRole theme={theme}>{user.role}</UserRole>
              <UserActions>
                <ActionButton
                  theme={theme}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(user)}
                >
                  <FaEdit />
                </ActionButton>
                <ActionButton
                  theme={theme}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(user._id)}
                >
                  <FaTrash />
                </ActionButton>
              </UserActions>
            </UserCard>
          ))}
        </UserGrid>

        {isModalOpen && (
          <Modal
            theme={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <ModalContent
              theme={theme}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label theme={theme}>Name</Label>
                  <Input
                    theme={theme}
                    type="text"
                    placeholder="User Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>Email</Label>
                  <Input
                    theme={theme}
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label theme={theme}>Role</Label>
                  <Select
                    theme={theme}
                    value="user"
                    disabled
                    required
                  >
                    <option value="user">User</option>
                  </Select>
                </FormGroup>
                <AddButton theme={theme} type="submit">
                  {editingUser ? 'Update User' : 'Add User'}
                </AddButton>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </MainContent>
    </Container>
  );
};

export default Users; 