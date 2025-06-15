import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // Import your AuthContext
import toast from "react-hot-toast"; // Import toast

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Local loading state
  const navigate = useNavigate();
  const { setToken, setUserData } = useContext(AuthContext); // Access context values

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts

    try {
      const { data } = await axios.post(
        "https://beebark-backend-2.vercel.app/api/auth/login",
        {
          email,
          password,
          rememberMe,
        }
      );

      localStorage.setItem("userToken", data.token);

      if (data.user) {
        localStorage.setItem("userDetails", JSON.stringify(data.user));
        setUserData(data.user); // Update AuthContext user data
      }

      setToken(data.token); // Update AuthContext token state
      toast.success(data.message || "Login successful");
      navigate(`/users/${data.user._id}`); // Redirect to home page
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Error logging in");
    } finally {
      setLoading(false); // Set loading to false when login process completes
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="flex flex-col sm:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg">
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
              disabled={loading}
              className={`w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading ? "Logging In..." : "Sign In"}
            </button>

            <div className="text-center text-sm text-yellow-500  hover:text-yellow-600 mt-4">
              <Link to="/forgot-password" className="hover:text-blue-600">
                Forgot Password?
              </Link>
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              <span>Don't have an account? </span>
              <Link
                to="/register"
                className="text-yellow-500 hover:text-yellow-600"
              >
                Sign Up
              </Link>
            </div>
          </form>

          <div className="text-xs text-center text-gray-500">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-yellow-500 hover:text-yellow-600">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-yellow-500 hover:text-yellow-600"
            >
              Privacy Policy
            </Link>
            .
          </div>
        </div>

        {/* Right Side: Image + OAuth Buttons */}
{/* Right Side: Image + OAuth Buttons Below It */}
<div className="w-full sm:w-1/2 p-6 flex flex-col items-center justify-start bg-white rounded-b-lg sm:rounded-r-lg">
  {/* Image at the top */}
  <div className="w-full mb-6">
    <img
      src="/logo-chill.png"
      alt="Login Illustration"
      className="w-full h-auto object-cover rounded-lg"
    />
  </div>

  {/* Social Login Buttons */}
  <div className="flex flex-col items-center gap-3 w-full">
    <button
      onClick={() =>
        (window.location.href =
          "https://beebark-backend-2.vercel.app/api/auth/google")
      }
      className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition"
    >
      <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
      Continue with Google
    </button>

    <button
      onClick={() =>
        (window.location.href =
          "https://beebark-backend-2.vercel.app/api/auth/facebook")
      }
      className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-md hover:bg-[#155ec0] transition"
    >
      <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
      Continue with Facebook
    </button>

    <button
      onClick={() =>
        (window.location.href =
          "https://beebark-backend-2.vercel.app/api/auth/apple")
      }
      className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
    >
      <img src="/apple-icon.png" alt="Apple" className="w-5 h-5" />
      Continue with Apple
    </button>
  </div>
</div>

      
      </div>
    </div>
  );
};

export default Login;