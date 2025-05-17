import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const firstname = location.state?.firstname || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(80); // Initial timer value in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [resendTimer]);

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

  const handleResendOtp = async () => {
    if (!canResend) {
      return; // Prevent resend if timer is active
    }

    setResendLoading(true);
    setCanResend(false);
    setResendTimer(80); // Reset the timer

    try {
      const response = await fetch("https://beebark-backend-2.vercel.app/api/otp/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to resend OTP");
        throw new Error(data.message || "Failed to resend OTP");
      }

      toast.success("New OTP sent successfully!");
    } catch (err) {
      console.error("Resend OTP Error:", err);
      toast.error(err.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
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

        <div className="mt-4 text-center">
          {canResend ? (
            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className={`text-yellow-500 hover:text-yellow-700 font-semibold ${
                resendLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          ) : (
            <p className="text-gray-600">
              Resend OTP in <strong>{resendTimer}</strong> seconds
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;