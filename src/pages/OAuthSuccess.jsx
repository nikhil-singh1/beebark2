import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast"; // Use react-hot-toast for consistency

export default function OAuthSuccess() {
    // Get necessary functions and backendUrl from AuthContext
    const { setToken, setUserData, backendUrl } = useContext(AuthContext);
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const token = query.get("token"); // Extract the JWT token from the URL

    useEffect(() => {
        // If no token is found in the URL, something went wrong with OAuth, redirect to login
        if (!token) {
            toast.error("Login failed: No token received.");
            navigate("/login");
            return; // Stop execution
        }

        // Store the token in localStorage and AuthContext state
        localStorage.setItem("userToken", token);
        setToken(token);

        // Fetch user details using the newly acquired token
        axios.get(`${backendUrl}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(({ data }) => {
            // Update user data in AuthContext and localStorage
            setUserData(data.user);
            localStorage.setItem("userDetails", JSON.stringify(data.user));
            toast.success("Logged in successfully!");
            // Redirect to the user's profile page or dashboard
            navigate(`/users/${data.user._id}`);
        })
        .catch((error) => {
            console.error("Fetch user failed after OAuth:", error.response?.data?.message || error.message);
            toast.error("Failed to fetch user details after login. Please try again.");
            // If fetching user data fails, clear token and redirect to login
            setToken(null);
            setUserData(null);
            localStorage.removeItem("userToken");
            localStorage.removeItem("userDetails");
            navigate("/login");
        });

        // Clean the URL to remove the token from the address bar for security and cleanliness
        window.history.replaceState({}, document.title, window.location.pathname);

    }, [token, setToken, setUserData, navigate, backendUrl]); // Dependency array

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-['Inter']">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <p className="text-xl font-semibold text-gray-800">Logging you in...</p>
                <p className="text-gray-600 mt-2">Please wait while we set up your session.</p>
                {/* Simple loading spinner */}
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mt-6"></div>
            </div>
        </div>
    );
}
