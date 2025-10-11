// frontend/src/components/Navbar.jsx

import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Employee Dashboard</div>
      {auth.user && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;