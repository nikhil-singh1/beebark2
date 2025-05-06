import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

// Named export
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendUrl = "https://beebark-backend-2.vercel.app";

  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserProfileData = async () => {
    try {
      setLoading(true);
      // After making the route basic, we need to send the userId in the query
      const storedUserDetails = localStorage.getItem('userDetails');
      const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
      const userId = userDetails?._id;

      if (userId) {
        const { data } = await axios.get(`${backendUrl}/api/users/get-profile?userId=${userId}`);

        if (data.success) {
          setUserData(data.userData);
        } else {
          setUserData(null);
          toast.error(data.message);
        }
      } else {
        setUserData(null);
        toast.error("User ID not found after login.");
      }
    } catch (err) {
      setUserData(null);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
      setLoading(false);
    }
  }, [token]);

  const login = (userData, token) => {
    setUserData(userData);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userDetails', JSON.stringify(userData)); // Store user details on login
    navigate(`/users/${userData._id}`);
  };

  const logout = () => {
    setUserData(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      token,
      setToken,
      backendUrl,
      userData,
      setUserData,
      loadUserProfileData,
      login,
      logout,
      loading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};
