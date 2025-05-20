import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin, FaArrowRight } from 'react-icons/fa';

const Thankyou = () => {
    const location = useLocation();
    const firstname = location.state?.firstname || "";

    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-120">
                <div className="bg-gray-50 h-60 flex items-center justify-center">
                    <img
                        src="/thankyou.png" // Placeholder illustration
                        alt="Thank You Illustration"
                        className="h-56"
                    />
                </div>
                <div className="p-6 ">
                    <h3 className="text-lg font-medium text-black">Hi User,</h3>
                    <h2 className="text-2xl font-bold my-2 text-black">Thank You!</h2>
                    <p className="text-gray-600 text-sm md:text-md mb-4">
                        Thank you for subscribing to Beebark! We're so excited to welcome
                        you as a Beebark Premium user.
                    </p>
                    <button
                        onClick={handleLoginRedirect}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 px-6 rounded-full w-full shadow-md hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 flex items-center justify-center"
                    >
                        <span className="flex items-center">
                            Proceed to Login
                            <FaArrowRight className="w-5 h-5 ml-2" />
                        </span>
                    </button>
                </div>
                <div className="bg-black text-center py-4">
                    <p className="text-white text-sm">Follow us on:</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <a href="https://www.instagram.com/thebeebark/" className="text-white hover:text-gray-200 text-lg" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61560873622756" className="text-white hover:text-gray-200 text-lg" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://www.linkedin.com/company/thebeebark/" className="text-white hover:text-gray-200 text-lg" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thankyou;