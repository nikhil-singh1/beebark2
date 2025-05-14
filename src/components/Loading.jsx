import React, { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero1 from "./Hero1"; // Import your Hero1 component

const HexGridLoader = () => {
  const hexSize = 30; // Base radius
  const hexWidth = Math.sqrt(3) * hexSize;
  const hexHeight = 2 * hexSize;
  const vertSpacing = hexHeight * 0.75;

  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(30);

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

  // Calculate rows and columns dynamically based on screen size
  useLayoutEffect(() => {
    const updateGridSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Adjust number of rows and columns based on a ratio of screen dimensions
      const calculatedCols = Math.ceil(screenWidth / (hexWidth * 0.8)); // Adjust factor for tighter/looser fit
      const calculatedRows = Math.ceil(screenHeight / vertSpacing);

      setCols(calculatedCols);
      setRows(calculatedRows);
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, [hexWidth, vertSpacing]);

  const hexes = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexWidth + ((row % 2) * hexWidth) / 2;
      const y = row * vertSpacing;

      const color = (row + col) % 2 === 0 ? "#FACC15" : "#221912";

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
            delay: (row * cols + col) * 0.0048,  // Adjusted delay for faster stagger effect
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
      <g transform={`translate(${window.innerWidth / 2 - (cols * hexWidth) / 2}, ${window.innerHeight / 2 - (rows * vertSpacing) / 2})`}>
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
    }, 4000);

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