import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendUrl = "https://beebark-backend-2.vercel.app/api"; // Use your actual backend URL

  const [token, setToken] = useState(localStorage.getItem('userToken') || null);
  const [userData, setUserData] = useState(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserProfileData = async () => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem('userToken');
      const storedUserDetails = localStorage.getItem('userDetails');
      const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
      const userId = userDetails?._id;

      if (userId && storedToken) {
        const { data } = await axios.get(
          `${backendUrl}/api/users/get-profile?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (data.success) {
          setUserData(data.userData);
        } else {
          setUserData(null);
          toast.error(data.message);
        }
      } else {
        setUserData(null);
        // Don't show an error here on initial load if no token
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
    loadUserProfileData(); // Call on initial load
  }, []);

  const login = async (email, password, rememberMe) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
        rememberMe,
      });

      localStorage.setItem("userToken", data.token);
      setToken(data.token);

      if (data.user) {
        localStorage.setItem("userDetails", JSON.stringify(data.user));
        setUserData(data.user);
      }

      toast.success(data.message || "Login successful");
      await loadUserProfileData(); // Fetch profile data immediately after login
      navigate(`/users/${data.user._id}`); // Navigate to profile after data is likely loaded
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || err.message);
      setUserData(null);
      setToken(null);
      localStorage.removeItem('userToken');
      localStorage.removeItem('userDetails');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserData(null);
    setToken(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userDetails');
    navigate('/login');
    toast.info("Logged out successfully");
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