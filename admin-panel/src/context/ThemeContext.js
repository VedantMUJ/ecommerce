import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
    light: {
        background: '#f5f5f5',
        text: '#333',
        primary: '#1976d2',
        secondary: '#dc004e',
        sidebar: '#fff',
        card: '#fff',
        border: '#e0e0e0',
        hover: '#f0f0f0',
        shadow: '0 2px 4px rgba(0,0,0,0.1)',
        inputBackground: '#fff',
        inputText: '#333',
        modalBackground: 'rgba(0, 0, 0, 0.5)',
        modalContent: '#fff',
        buttonText: '#fff',
        error: '#d32f2f',
        success: '#2e7d32'
    },
    dark: {
        background: '#121212',
        text: '#fff',
        primary: '#90caf9',
        secondary: '#f48fb1',
        sidebar: '#1e1e1e',
        card: '#1e1e1e',
        border: '#333',
        hover: '#2c2c2c',
        shadow: '0 2px 4px rgba(0,0,0,0.2)',
        inputBackground: '#2c2c2c',
        inputText: '#fff',
        modalBackground: 'rgba(0, 0, 0, 0.7)',
        modalContent: '#1e1e1e',
        buttonText: '#fff',
        error: '#ef5350',
        success: '#66bb6a'
    }
};

export const ThemeProvider = ({ children }) => {
    // Check if user has a theme preference in localStorage
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    // Update theme in localStorage when it changes
    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        // Update document body class for global theme
        document.body.className = isDark ? 'dark-theme' : 'light-theme';
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    const theme = isDark ? 'dark' : 'light';

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 