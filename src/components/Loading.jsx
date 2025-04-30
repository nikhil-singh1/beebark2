import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero1 from "./Hero1"; // Import your Hero1 component

const HexGridLoader = () => {
    const hexSize = 30; // Radius
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;
    const vertSpacing = hexHeight * 0.75;
  
    const rows = 30;
    const cols = 30;
  
    const hexPoints = (x, y) => {
      let points = [];
      for (let i = 0; i < 6; i++) {
        const angle_deg = 60 * i - 30;
        const angle_rad = (Math.PI / 180) * angle_deg;
        const px = x + hexSize * Math.cos(angle_rad);
        const py = y + hexSize * Math.sin(angle_rad);
        points.push(`${px},${py}`);
      }
      return points.join(" ");
    };
  
    const hexes = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexWidth + ((row % 2) * hexWidth) / 2;
        const y = row * vertSpacing;
  
        // Alternate colors based on row + column sum being even or odd
        const color = (row + col) % 2 === 0 ? "#FACC15" : "#221912"; // Yellow and dark brown

      hexes.push(
        <motion.polygon
          key={`${row}-${col}`}
          points={hexPoints(x, y)}
          stroke="black"
          strokeWidth="1"
          fill={color}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}  // Shrink and fade out
          exit={{ opacity: 0, scale: 0.3 }}
          transition={{
            duration: 0.6, // Reduced duration for faster animation
            delay: (row * cols + col) * 0.007,  // Adjusted delay for faster stagger effect
          }}
        />
      );
    }
  }

  return (
      <motion.svg
      width="100%"
      height="100vh"
      className="absolute top-0 left-0 flex justify-center items-center"
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <g transform="translate(50%, 50%)">
        {hexes}
      </g>
    </motion.svg>
  );
};

// Main Component to Switch from Loader to Hero1
const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000); // Changed to 4 seconds for faster transition

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      <AnimatePresence>
        {loading ? (
          <HexGridLoader key="loader" />
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Hero1 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingPage;