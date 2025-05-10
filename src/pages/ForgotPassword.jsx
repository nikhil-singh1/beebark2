import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      await axios.post("https://beebark-backend-2.vercel.app/api/auth/forgot-password", { email });
      alert("OTP sent to your email. Please check Spam folder too.");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post("https://beebark-backend-2.vercel.app/api/auth/verify-forgot-otp", { email, otp });
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid or expired OTP");
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post("https://beebark-backend-2.vercel.app/api/auth/reset-password", { email, newPassword });
      alert("Password updated successfully!");
      navigate("/login"); // Adjust to your login route
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-4">Forgot Password</h2>

        {step === 1 && (
          <>
            <p className="text-gray-600 text-center mb-4">Enter your registered email address</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:ring-2 focus:ring-yellow-500"
              placeholder="Your email"
            />
            <button
              onClick={sendOtp}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded font-semibold"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-gray-600 text-center mb-4">Check your email for the OTP</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter 6-digit OTP"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded font-semibold"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-gray-600 text-center mb-4">Enter your new password</p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:ring-2 focus:ring-yellow-500"
              placeholder="New password"
            />
            <button
              onClick={resetPassword}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded font-semibold"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
