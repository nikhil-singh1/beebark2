// import React, { useState } from "react";
// import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
// import { Instagram, Twitter, Facebook } from "lucide-react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   return (
//     <>
//       {/* Header Section */}
//       <header className="fixed top-0 left-0 w-full p-5 flex justify-between items-center z-50 bg-white shadow-md">
//         {/* Logo and Name */}
//         <div className="flex items-center space-x-3">
//           <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
//             <img src="/bbark.png" alt="BeeBark Logo" className="h-12 w-auto" />
//             <span className="text-2xl font-bold text-black">BeeBark</span>
//           </Link>
//         </div>

//         {/* Register Now Button */}
//         <div>
//           <Link
//             to="/manifesto"
//             className="border font-semibold text-black bg-yellow-300 px-4 py-2 rounded-md hover:bg-yellow-400 transition-all duration-200"
//           >
//             BeeBark Manifesto
//           </Link>
//         </div>
//       </header>
//     </>
//   );
// }

import React, { useState, useContext } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { LogIn, UserPlus, Instagram, Twitter, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { token, userData, logout } = useContext(AuthContext); // Get user data and token from context

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  const handleLogout = () => {
    logout(); // Call logout from context
    setProfileMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Header Section */}
      <header className="fixed top-0 left-0 w-full p-5 flex justify-between items-center z-50 bg-white shadow-md">
        <div className="flex items-center space-x-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
            <img src="/bbark.png" alt="BeeBark Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-black">BeeBark</span>
          </Link>
        </div>

        {/* Right-side Icons and Menu */}
        <div className="flex items-center space-x-5">
          {token ? (
            <div className="flex items-center space-x-4 relative">
              {/* Profile Avatar */}
              <div className="relative cursor-pointer" onClick={toggleProfileMenu}>
                <img
                  src={userData?.profilePhoto || "/profile_icon.png"} // Fetch profile photo from userData
                  alt="Profile Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
                {profileMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-[#221912] border border-gray-200 rounded-lg shadow-lg z-50"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ul className="py-2">
                      <li
                        className="px-4 py-2 hover:bg-yellow-300  cursor-pointer"
                        onClick={() => navigate(`/users/${userData._id}`)} 
                      >
                        Profile
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-yellow-300 cursor-pointer text-red-600"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>

              <div>
                <Link
                  to="/manifesto"
                  className="border font-semibold text-black px-4 py-2 rounded-md hover:bg-yellow-300 transition-all duration-200"
                >
                  BeeBark Manifesto
                </Link>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-5">
              <Link
                to="/login"
                className="flex items-center text-black font-bold space-x-2 cursor-pointer font-poppins border p-2 rounded-md hover:bg-yellow-300"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>

              <div>
                <Link
                  to="/manifesto"
                  className="border font-semibold text-black px-4 py-2 rounded-md hover:bg-yellow-300 transition-all duration-200"
                >
                  BeeBark Manifesto
                </Link>
              </div>
            </div>
          )}

          {/* Menu Icon */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer border-2 border-black bg-black"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <XMarkIcon className="w-8 h-8 text-white" />
            ) : (
              <Bars3Icon className="w-8 h-8 text-white" />
            )}
          </div>
        </div>
      </header>

      {/* Fixed Full-Screen Menu */}
      <motion.div
        className={`fixed top-0 left-0 w-full h-full bg-white text-black p-6 z-40 ${
          menuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
        initial={{ x: "-100%" }}
        animate={{ x: menuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-row h-full">
          {/* Menu Items */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left flex-1">
            <div className="flex flex-col pt-12 mt-12 items-start h-full md:mx-10">
              <ul className="space-y-7 text-2xl md:text-5xl font-bold font-montserrat text-left md:mx-12">
                <li>
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-700"
                  >
                    Services
                  </a>
                </li>

                <li>
                  <a
                    href="#aboutus"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-700"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-gray-700"
                  >
                    Contact Us
                  </Link>
                </li>

                {/* Mobile Only: Sign In and Join as a Pro */}
                <li className="md:hidden mt-8 border-t pt-4">
                  <div className="flex flex-col items-start space-y-4">
                    <div className="flex items-center space-x-2 font-poppins">
                      <LogIn className="w-5 h-5" />
                      <span>
                        <Link
                          to="/login"
                          onClick={() => setMenuOpen(false)}
                          className="hover:text-gray-700"
                        >
                          Login
                        </Link>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 font-poppins">
                      <UserPlus className="w-5 h-5" />
                      <span>
                        <Link
                          to="/join"
                          onClick={() => setMenuOpen(false)}
                          className="hover:text-gray-700"
                        >
                          Join as a Pro
                        </Link>
                      </span>
                    </div>
                    <div className="md:hidden text-sm underline text-[#221912] mt-5 font-poppins">
                      info@thebeebark.com
                    </div>
                    <div className="md:hidden text-sm underline text-[#221912] font-poppins">
                      +91 7701858312
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info and Social Media Icons */}
          <div className="hidden md:flex flex-col items-start space-y-5 justify-center mx-12 mt-10">
            <div className="text-xl underline font-bold text-[#221912] font-poppins">
              info@thebeebark.com
            </div>
            <div className="text-xl underline font-bold text-[#221912] font-poppins">
              +91 7701858312
            </div>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61560873622756"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6 text-black hover:text-gray-700" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6 text-black hover:text-gray-700" />
              </a>
              <a
                href="https://www.instagram.com/thebeebark/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6 text-black hover:text-gray-700" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
