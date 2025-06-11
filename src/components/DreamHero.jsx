import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero1 = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');

  const handleSignup = () => {
    navigate('/signup', { state: { email } });
  };

  const handleJoin = () => {
    navigate('/join', { state: { email: businessEmail } });
  };

  return (
    <div className="flex flex-col lg:flex-row font-montserrat min-h-screen">
      {/* About Us Section (78%) */}
      <div className="lg:w-[78vw] bg-[url('/d1.jpg')] bg-cover bg-center text-[#221912] flex flex-col justify-center px-4 sm:px-[5vw] py-[5vh]">
        <div className="bg-white bg-opacity-80 p-6 sm:p-[3vw] rounded-lg shadow-lg max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-poppins text-[#221912]">
            The Best Place to Find Professionals
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="p-4 sm:p-[1.2vw] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <button
              type="submit"
              className="bg-[#221912] text-white py-4 sm:py-[1vw] px-8 sm:px-[2vw] rounded-md hover:bg-gray-800 transition-all"
            >
              Sign Up with Email
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4 sm:mt-[1vw]">
            By signing up, you agree to our{' '}
            <a href="/terms" className="text-yellow-500 underline">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-yellow-500 underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>

      {/* TheBeeBark PRO Section (38%) */}
      <div className="lg:w-[38vw] bg-[#221912] text-white flex flex-col justify-center px-4 sm:px-[4vw] py-[5vh]">
        <h2 className="text-3xl md:text-left mb-6 font-poppins">
          <span className="text-white font-bold">TheBeeBark</span>{' '}
          <span className="text-yellow-300 font-semibold">PRO</span>
        </h2>

        <p className="text-gray-100 mb-6 leading-relaxed">
          Join as a professional to connect with clients and grow your business today.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleJoin();
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            placeholder="Business Email"
            className="p-4 sm:p-[15px] border bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
          <button
            type="submit"
            className="bg-white text-black py-4 sm:py-[15px] px-8 sm:px-[2vw] rounded-md hover:bg-gray-300 transition-all"
          >
            Join for Free
          </button>
        </form>
        <p className="text-sm text-gray-100 mt-4 sm:mt-[1.5vw]">
          By joining, you agree to our{' '}
          <a href="/terms" className="text-yellow-300 underline">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-yellow-300 underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Hero1;
