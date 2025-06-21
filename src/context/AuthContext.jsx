// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-hot-toast'; // Standardized to react-hot-toast

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const navigate = useNavigate();
//     // Use your backend URL directly here, or if you use Vite's env,
//     // you would configure it like `import.meta.env.VITE_API_BASE`.
//     // For consistency with Login.jsx and for direct explanation, we'll hardcode here.
//     const backendUrl = "https://beebark-backend-2.vercel.app";

//     const [token, setToken] = useState(null);
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true); // Start with true for initial load
//     const [error, setError] = useState(null);

//     // Effect to load data from localStorage on initial mount
//     useEffect(() => {
//         try {
//             const storedToken = localStorage.getItem('userToken');
//             const storedUser = localStorage.getItem('userDetails');

//             if (storedToken) {
//                 setToken(storedToken);
//             }
//             if (storedUser) {
//                 setUserData(JSON.parse(storedUser));
//             }
//         } catch (e) {
//             console.error("Failed to load auth data from localStorage", e);
//             // Clear corrupted data if parsing fails
//             localStorage.removeItem('userToken');
//             localStorage.removeItem('userDetails');
//         } finally {
//             setLoading(false); // Set to false after attempting to load
//         }
//     }, []);

//     // Effect to fetch full user profile if token is present and userData is incomplete or fresh load
//     const loadUserProfileData = async () => {
//         // Only attempt to load if token exists and userData is not already loaded
//         // or if we specifically need to refresh it (e.g., after login)
//         if (!token) {
//             setLoading(false); // No token, so not loading profile
//             return;
//         }

//         setLoading(true);
//         setError(null);
//         try {
//             // Fetch the user's full profile using the token
//             const { data } = await axios.get(`${backendUrl}/api/users/get-profile`, { // Assuming backend can get profile by token
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (data.success && data.userData) {
//                 setUserData(data.userData);
//                 localStorage.setItem('userDetails', JSON.stringify(data.userData));
//             } else {
//                 setError(data.message || "Failed to load profile");
//                 toast.error(data.message || "Failed to load profile");
//                 // If profile load fails, it might mean the token is invalid or expired
//                 // Optionally log out the user here.
//                 // logout(); // Uncomment if you want to force logout on profile load failure
//             }
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || err.message || "An error occurred while loading profile";
//             setError(errorMessage);
//             toast.error(errorMessage);
//             // Optionally log out the user
//             // logout(); // Uncomment if you want to force logout on profile load error
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Trigger profile data load when token changes or on initial load if token exists
//     useEffect(() => {
//         if (token && !userData) { // Load if token exists but userData isn't set yet (e.g., initial load)
//             loadUserProfileData();
//         } else if (token && userData && !loading) { // If token and user data are present, and not currently loading, assume loaded
//             // Optional: If you want to force a refresh of profile data every time token changes,
//             // even if userData is already set, uncomment loadUserProfileData();
//             // loadUserProfileData();
//         } else if (!token && !loading) {
//              // If token is null and not loading, ensure userData is also null
//              setUserData(null);
//              localStorage.removeItem('userDetails');
//         }
//     }, [token, navigate, userData, loading]); // Added navigate, userData, loading to dependencies

//     // Manual email/password login function
//     const login = async (email, password, rememberMe) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
//                 email,
//                 password,
//                 rememberMe,
//             });

//             setToken(data.token);
//             setUserData(data.user); // Set user data received from login
//             localStorage.setItem('userToken', data.token);
//             localStorage.setItem('userDetails', JSON.stringify(data.user));
//             toast.success(data.message || "Login successful");
//             navigate(`/users/${data.user._id}`); // Redirect on successful login
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || err.message || "Login failed";
//             setError(errorMessage);
//             toast.error(errorMessage);
//             // Clear any partial login data
//             setToken(null);
//             setUserData(null);
//             localStorage.removeItem('userToken');
//             localStorage.removeItem('userDetails');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Logout function
//     const logout = () => {
//         setToken(null);
//         setUserData(null);
//         localStorage.removeItem('userToken');
//         localStorage.removeItem('userDetails');
//         navigate('/login'); // Redirect to login page on logout
//         toast.info("Logged out successfully!");
//     };

//     // The value provided to consumers of this context
//     return (
//         <AuthContext.Provider value={{
//             token,
//             setToken, // Allow OAuthSuccess to directly set token
//             backendUrl, // Provide backend URL for convenience
//             userData,
//             setUserData, // Allow OAuthSuccess to directly set user data
//             loadUserProfileData, // Function to refresh user data if needed
//             login, // Manual login function
//             logout,
//             loading,
//             error
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


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
  if (!token || !userData?._id) {
    setLoading(false);
    return;
  }

  setLoading(true);
  setError(null);
  try {
    const { data } = await axios.get(`${backendUrl}/api/users/get-profile?userId=${userData._id}`, {
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
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || "An error occurred";
    setError(errorMessage);
    toast.error(errorMessage);
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
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
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
