import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.background};
  transition: all 0.3s ease;
`;

const LoginCard = styled(motion.div)`
  background-color: ${props => props.theme.card};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: ${props => props.theme.shadow};
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;
`;

const Title = styled.h1`
  color: ${props => props.theme.text};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.inputText};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }

  &::placeholder {
    color: ${props => props.theme.text}80;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.buttonText};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px ${props => props.theme.primary}40;
  font-weight: 600;

  &:hover {
    background-color: ${props => props.theme.secondary};
    box-shadow: 0 0 20px ${props => props.theme.secondary}60;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled(motion.div)`
  color: ${props => props.theme.error};
  text-align: center;
  margin-top: 1rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <LoginContainer theme={theme}>
      <LoginCard
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title theme={theme}>Admin Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            theme={theme}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            theme={theme}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            theme={theme}
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </Button>
        </Form>
        {error && (
          <ErrorMessage
            theme={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </ErrorMessage>
        )}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 