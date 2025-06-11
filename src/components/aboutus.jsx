import React from "react";
import logo from "../assets/bbark.png"

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop and Laptop View */}
      <div className="hidden md:grid md:grid-cols-2 min-h-screen">
        {/* Left Grid - Content */}
        <div className="bg-[#221912] flex flex-col justify-center items-center p-8">
          <div className="max-w-md text-left">
            <h2 className="text-5xl font-bold mb-4 text-white font-montserrat">
              Real Solutions for Real Estate
            </h2>
            <p className="text-2xl text-gray-100 mb-6 text-left font-poppins">
              At <span className="font-bold text-yellow-300">TheBeeBark</span>,
              we craft digital solutions inspired by nature’s architects. With
              integrity and creativity, we empower builders, architects, and
              designers.
            </p>
            <button className="px-6 py-3 text-yellow-300 font-medium border-2 border-yellow-300 rounded hover:bg-yellow-300 hover:text-white font-poppins">
              Company
            </button>
          </div>
        </div>

        {/* Right Grid - Logo */}
        <div className="bg-yellow-400 flex items-center justify-center">
          <div className="bg-white p-6 rounded-full shadow-lg">
            <img
              src={logo}
              alt="TheBeeBark Logo"
              className="w-40 h-40 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-yellow-400 flex flex-col justify-between min-h-screen p-6">
        {/* Logo Section */}
        <div className="flex flex-grow items-center justify-center">
          <div className="bg-white p-6 rounded-full shadow-lg">
            <img
              src={logo}
              alt="TheBeeBark Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        {/* Text Section */}
        <div className="text-left text-white max-w-sm mt-auto">
          <h2 className="text-2xl font-bold mb-4 font-montserrat">
            Real Solutions for Real Estate
          </h2>
          <p className="text-base mb-6 font-poppins">
            At <span className="font-bold">TheBeeBark</span>, we craft digital
            solutions inspired by nature’s architects. With integrity and
            creativity, we empower builders, architects, and designers.
          </p>
          <button className="px-6 py-3 text-[#221912] font-medium bg-white rounded border-2 border-white hover:text-white font-poppins">
            Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
