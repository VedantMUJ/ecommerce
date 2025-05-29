import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Static admin credentials
  const ADMIN_CREDENTIALS = {
    email: 'admin@ecommerce.com',
    password: 'admin123'
  };

  const login = async (email, password) => {
    try {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const adminData = {
          email: ADMIN_CREDENTIALS.email,
          role: 'admin'
        };
        localStorage.setItem('admin', JSON.stringify(adminData));
        setAdmin(adminData);
        return { success: true };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const value = {
    admin,
    loading,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
}; 