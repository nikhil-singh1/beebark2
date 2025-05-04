// src/pages/AdminDashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <div>You are not authorized to access this page.</div>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Admin-specific content */}
    </div>
  );
};

export default AdminDashboard;
