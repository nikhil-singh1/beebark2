import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // Import your AuthContext
import { toast } from "react-hot-toast"; // Use react-hot-toast for consistency

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // Use loading state from AuthContext if you want to disable form during context-level operations
    // For local form submission, we'll keep a local loading state for UI feedback.
    const [localLoading, setLocalLoading] = useState(false);
    const navigate = useNavigate();
    const { login, backendUrl } = useContext(AuthContext); // Get login function and backendUrl from context

    const handleLogin = async (e) => {
        e.preventDefault();
        setLocalLoading(true); // Set local loading to true
        try {
            await login(email, password, rememberMe); // Use the login function from AuthContext
            // Navigation and toast are handled inside AuthContext.login
        } catch (error) {
            // Error handling is managed by AuthContext.login, so no specific action here
        } finally {
            setLocalLoading(false); // Set local loading to false
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="flex flex-col sm:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Left Side: Login Form */}
                <div className="w-full sm:w-1/2 p-8 space-y-6 flex flex-col justify-between">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center font-montserrat">
                        Login
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2 w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-10 transform text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 text-sm text-gray-600"
                            >
                                Keep me signed in
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={localLoading} // Use local loading state for button
                            className={`w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                                localLoading ? "cursor-not-allowed opacity-70" : ""
                            }`}
                        >
                            {localLoading ? "Logging In..." : "Sign In"}
                        </button>

                        <div className="text-center text-sm text-yellow-500 hover:text-yellow-600 mt-4">
                            <Link to="/forgot-password" className="hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <div className="text-center text-sm text-gray-600 mt-4">
                            <span>Don't have an account? </span>
                            <Link
                                to="/register"
                                className="text-yellow-500 hover:text-yellow-600 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>

                    <div className="text-xs text-center text-gray-500">
                        By signing in, you agree to our{" "}
                        <Link to="/terms" className="text-yellow-500 hover:text-yellow-600 hover:underline">
                            Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                            to="/privacy"
                            className="text-yellow-500 hover:text-yellow-600 hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </div>
                </div>

                {/* Right Side: Image + OAuth Buttons Below It */}
                <div className="w-full sm:w-1/2 p-6 flex flex-col items-center justify-start bg-white rounded-b-lg sm:rounded-r-lg">
                    {/* Image at the top */}
                    <div className="w-full mb-6">
                        <img
                            src="/logo-chill.png" // Use your actual asset path here
                            alt="Login Illustration"
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="flex flex-col items-center gap-3 w-full px-4">
                        <button
                            onClick={() =>
                                (window.location.href = `${backendUrl}/api/auth/google`)
                            }
                            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 shadow-sm"
                        >
                            <img src="/google-icon.png" alt="Google" className="w-5 h-5" /> {/* Use your actual asset path here */}
                            Continue with Google
                        </button>

                        <button
                            onClick={() =>
                                (window.location.href = `${backendUrl}/api/auth/facebook`)
                            }
                            className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-md hover:bg-[#155ec0] transition duration-200 shadow-sm"
                        >
                            <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" /> {/* Use your actual asset path here */}
                            Continue with Facebook
                        </button>

                        {/* Apple Button Removed as per request */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
