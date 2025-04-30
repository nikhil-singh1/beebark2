// src/pages/VerifyEmail.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const token = params.get('token');
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email?token=${token}`);
        setTimeout(() => {
          navigate('/profile-setup');
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    };
    verify();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Verifying your email...</h1>
        <p className="text-gray-600">Please wait...</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
