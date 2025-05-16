import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const firstname = location.state?.firstname | "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://beebark-backend-2.vercel.app/api/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Verification failed");
        throw new Error(data.message || "Verification failed");
      }

      toast.success("OTP Verified Successfully!");
      navigate("/thankyou", { state: { firstname } });
    } catch (err) {
      console.error("OTP Verification Error:", err);
      // toast.error(err.message); // Already called above
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-4">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 mb-1">
          An OTP has been sent to <strong>{email}.</strong>
        </p>
        <p className="text-center text-yellow-600 mb-4">
          Please check your Spam or Junk folder if you haven't received the email.
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 p-3 text-black rounded mb-4 focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter 6-digit OTP"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded font-semibold ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;