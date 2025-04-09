import React, { useState } from "react";
import { ArrowUp, Facebook, Twitter, Instagram, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDemoPopup = () => {
    setIsDemoOpen(!isDemoOpen);
  };

  return (
    <>
      <footer className="bg-herocolor text-white py-12 font-montserrat">
        {/* Footer Container */}
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between lg:space-x-12">
            {/* Left Section */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              {/* Scroll to Top Arrow */}
              <div className="mb-6">
                <button
                  onClick={scrollToTop}
                  className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full hover:bg-gray-600 transition"
                  title="Scroll to Top"
                >
                  <ArrowUp className="text-white" size={24} />
                </button>
              </div>

              {/* Get Started Section */}
              <div className="mb-8">
                <button
                  onClick={toggleDemoPopup}
                  className="text-2xl font-bold mb-4 md:text-4xl font-poppins flex items-center justify-center bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
                >
                  Get Started
                </button>
                <p className="text-md text-gray-100 leading-relaxed md:text-xl font-semibold">
                  Beebark is committed to delivering excellence and providing
                  high-quality services to meet your needs. We strive for innovation
                  and customer satisfaction.
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-6">
                <a href="#" className="hover:text-gray-400 transition">
                  <Facebook size={24} />
                </a>
                <a href="#" className="hover:text-gray-400 transition">
                  <Twitter size={24} />
                </a>
                <a href="#" className="hover:text-gray-400 transition">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:w-1/2 lg:mt-14">
              {/* Get in Touch */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 md:text-3xl font-poppins">Get in Touch</h3>
                <p className="text-md text-yellow-400 font-semibold md:text-xl">
                  <span className="block mb-2">
                    <a href="tel:+917701858312" className="hover:text-yellow-500">+91 7701858312</a>
                  </span>
                  <span className="block">
                    <a href="mailto:info@thebeebark.com" className="hover:text-yellow-500">info@thebeebark.com</a>
                  </span>
                </p>
              </div>

              {/* Explore Links */}
              <div>
                <h3 className="text-2xl font-bold mb-4 md:text-3xl font-poppins">Explore</h3>
                <div className="flex flex-col md:flex-row flex-wrap gap-4 md:text-xl font-semibold text-gray-500">
                  <a href="#work" className="text-md hover:text-gray-400 transition">
                    Work
                  </a>
                  <a href="#services" className="text-md hover:text-gray-400 transition">
                    Services
                  </a>
                  <a href="#aboutus" className="text-md hover:text-gray-400 transition">
                    About
                  </a>
                  <a href="#contact" className="text-md hover:text-gray-400 transition">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-6 text-center">
            <p className="text-gray-500 text-sm lg:text-md">© 2025 Beebark. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Demo Popup */}
      {isDemoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-lg p-8 relative">
            {/* Close Button */}
            <button
              onClick={toggleDemoPopup}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>

            {/* Demo Content */}
            <h2 className="text-2xl font-bold mb-4 font-poppins text-black">Book a Demo</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}