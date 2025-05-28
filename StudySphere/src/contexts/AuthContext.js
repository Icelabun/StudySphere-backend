import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Check for existing token and user data in localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      // Set the token in axios headers
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (token, userData) => {
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Set the token in axios headers
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    setUser(userData);
    setIsNewUser(!userData.profileCompleted);
  };

  const logout = () => {
    // Clear token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Remove token from axios headers
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    setUser(null);
    setIsNewUser(false);
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsNewUser(false);
  };

  const value = {
    user,
    loading,
    isNewUser,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;