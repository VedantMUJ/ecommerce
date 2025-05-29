import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import { THEME_CONFIG } from './config';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
    color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
    transition: all 0.3s ease;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  }

  /* Selection Styles */
  ::selection {
    background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
    color: ${THEME_CONFIG.light.buttonText};
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyle />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
); 