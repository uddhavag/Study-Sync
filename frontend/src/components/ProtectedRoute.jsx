import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check auth status

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
