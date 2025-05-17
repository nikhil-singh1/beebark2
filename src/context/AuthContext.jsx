import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null); // Explicitly set initial value to null

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendUrl = "https://beebark-backend-2.vercel.app";


  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Start with true for initial load
  const [error, setError] = useState(null);

    // Load data from localStorage
  useEffect(() => {
      const storedToken = localStorage.getItem('userToken');
      const storedUser = localStorage.getItem('userDetails');

      if (storedToken) {
          setToken(storedToken);
      }
      if (storedUser) {
          setUserData(JSON.parse(storedUser));
      }
      setLoading(false); //important, set to false after trying to load.
  }, []);



  const loadUserProfileData = async () => {
    if (!token) {
      setLoading(false);
      return; // Exit if no token
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.userData);
        localStorage.setItem('userDetails', JSON.stringify(data.userData));
      } else {
        setError(data.message || "Failed to load profile");
        toast.error(data.message || "Failed to load profile");
        //removed setToken(null) and logout()
      }
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || "An error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
        //removed setToken(null) and logout()
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
    }, [token]);


  const login = async (email, password, rememberMe) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
        rememberMe,
      });

      setToken(data.token);
      setUserData(data.user); //set user data
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userDetails', JSON.stringify(data.user));
      toast.success(data.message || "Login successful");
      navigate(`/users/${data.user._id}`);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
      setToken(null);
      setUserData(null);
      localStorage.removeItem('userToken');
      localStorage.removeItem('userDetails');

    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userDetails');
    navigate('/login');
    toast.info("Logged out");
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
