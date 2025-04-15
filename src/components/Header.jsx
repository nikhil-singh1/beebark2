import React, { useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Header Section */}
      <header className="fixed top-0 left-0 w-full p-5 flex justify-between items-center z-50 bg-white shadow-md">
        {/* Logo and Name */}
        <div className="flex items-center space-x-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
            <img src="/bbark.png" alt="BeeBark Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-black">BeeBark</span>
          </Link>
        </div>

        {/* Register Now Button */}
        <div>
          <Link
            to="/manifesto"
            className="border font-semibold text-black bg-yellow-300 px-4 py-2 rounded-md hover:bg-yellow-400 transition-all duration-200"
          >
            BeeBark Manifesto
          </Link>
        </div>
      </header>
    </>
  );
}
