// frontend/src/components/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // --- UPDATED TO USE localStorage ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user'); // Changed from sessionStorage
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Changed from sessionStorage
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user'); // Changed from sessionStorage
    setUser(null);
  };
  // --- END OF UPDATE ---

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};