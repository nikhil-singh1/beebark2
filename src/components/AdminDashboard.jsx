import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminUsers } from '../services/api'; // Create this API call

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAdminUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch users.');
        setLoading(false);
      }
    };

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/admin/login'); // Redirect if not logged in
    } else {
      fetchUsers();
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading users...</div>; // Create a Loading component
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <h3 className="text-lg font-semibold mb-2">Registered Users</h3>
      {users.length > 0 ? (
        <ul className="list-disc pl-5">
          {users.map((user) => (
            <li key={user._id}>{user.businessName} ({user.email})</li>
          ))}
        </ul>
      ) : (
        <p>No users registered yet.</p>
      )}
      {/* Add more admin functionalities here */}
    </div>
  );
};

export default AdminDashboard;