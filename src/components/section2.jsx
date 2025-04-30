// import React, { useEffect, useState } from 'react';
// import '../HoneycombReveal.css';

// const HoneycombReveal = () => {
//   const rows = 30;
//   const cols = 30;

//   const [shrinkTrigger, setShrinkTrigger] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => setShrinkTrigger(true), 500);
//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div className="honeycomb-shrink-container">
//       {[...Array(rows)].map((_, row) => (
//         <div key={row} className="hex-row">
//           {[...Array(cols)].map((_, col) => {
//             const distanceFromCenter = Math.sqrt(
//               Math.pow(row - rows / 2, 2) + Math.pow(col - cols / 2, 2)
//             );

//             const delay = distanceFromCenter * 70;

//             return (
//               <div
//                 key={col}
//                 className={`hex ${shrinkTrigger ? 'shrink' : ''}`}
//                 style={{ animationDelay: `${delay}ms` }}
//               />
//             );
//           })}
//         </div>
//       ))}
//       {shrinkTrigger && (
//         <h1 className="final-text">Welcome to the Future</h1>
//       )}
//     </div>
//   );
// };

// export default HoneycombReveal;

// import React, { useEffect, useState } from 'react';
// import '../HoneycombReveal.css'; // for custom animation
// const hexSize = 50;

// const generateHexGrid = (rows, cols) => {
//   const hexes = [];
//   const hexWidth = hexSize * 2;
//   const hexHeight = Math.sqrt(3) * hexSize;

//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       const x = col * (hexWidth * 0.75);
//       const y = row * hexHeight + (col % 2 ? hexHeight / 2 : 0);
//       hexes.push({ x, y, row, col });
//     }
//   }

//   return hexes;
// };

// const HoneycombReveal = () => {
//   const [hexagons, setHexagons] = useState([]);
//   const [revealed, setRevealed] = useState(false);
//   const rows = 12;
//   const cols = 14;

//   useEffect(() => {
//     const layout = generateHexGrid(rows, cols);
//     setHexagons(layout);

//     setTimeout(() => setRevealed(true), 4000); // Reveal text after animation
//   }, []);

//   return (
//     <div className="relative w-screen h-screen bg-[#2e221b] overflow-hidden">
//       {hexagons.map((hex, i) => {
//         const distFromEdge = Math.min(hex.row, rows - hex.row, hex.col, cols - hex.col);
//         const delay = distFromEdge * 150;

//         return (
//           <div
//             key={i}
//             className={`absolute hexagon bg-yellow-500 transition-transform duration-1000 ease-out`}
//             style={{
//               left: hex.x,
//               top: hex.y,
//               width: hexSize * 2,
//               height: hexSize * 2,
//               transformOrigin: 'center',
//               animation: `shrinkIn 1s ease-out ${delay}ms forwards`,
//             }}
//           />
//         );
//       })}

//       {revealed && (
//         <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold fade-in">
//           Welcome to the Future
//         </div>
//       )}
//     </div>
//   );
// };

// export default HoneycombReveal;


// // HoneyIntro.jsx
// import React, { useEffect, useState } from 'react';
// import '../HoneycombReveal.css';

// const hexSize = 20;
// const rows = 60;
// const cols = 80;

// const generateHexGrid = () => {
//   const hexes = [];
//   const hexWidth = hexSize * 2;
//   const hexHeight = Math.sqrt(3) * hexSize;

//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       const x = col * (hexWidth * 0.75);
//       const y = row * hexHeight + (col % 2 ? hexHeight / 2 : 0);
//       hexes.push({ x, y, row, col });
//     }
//   }

//   return hexes;
// };

// const HoneycombReveal = ({ onFinish }) => {
//   const [hexagons, setHexagons] = useState([]);
//   const [hidden, setHidden] = useState(false);

//   useEffect(() => {
//     setHexagons(generateHexGrid());
//     setTimeout(() => {
//       setHidden(true);
//       if (onFinish) onFinish();
//     }, 4000);
//   }, [onFinish]);

//   const centerRow = Math.floor(rows / 2);
//   const centerCol = Math.floor(cols / 2);

//   return (
//     <div className="relative w-screen h-screen bg-white overflow-hidden">
//       {!hidden &&
//         hexagons.map((hex, i) => {
//           let distance = Math.max(
//             Math.abs(hex.row - centerRow),
//             Math.abs(hex.col - centerCol)
//           );
//           let delay = distance * 100;

//           return (
//             <div
//               key={i}
//               className="absolute hexagon"
//               style={{
//                 left: hex.x,
//                 top: hex.y,
//                 backgroundColor: (hex.row + hex.col) % 2 === 0 ? '#2e221b' : '#facc15',
//                 width: hexSize * 2,
//                 height: hexSize * 2,
//                 animation: `shrinkCenter 0.7s ease-in ${delay}ms backwards`,
//               }}
//             />
//           );
//         })}

//       {hidden && (
//         <div className="absolute inset-0 flex items-center justify-center text-black text-4xl font-bold fade-in">
//           Welcome to the Future
//         </div>
//       )}
//     </div>
//   );
// };

// export default HoneycombReveal;

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSpring, animated } from "@react-spring/web";

// const HEX_ROWS = 9; // should be odd
// const HEX_COLUMNS = 9; // should be odd

// const generateGrid = () => {
//   const grid = [];
//   for (let row = 0; row < HEX_ROWS; row++) {
//     const cols = [];
//     for (let col = 0; col < HEX_COLUMNS; col++) {
//       cols.push({ row, col });
//     }
//     grid.push(cols);
//   }
//   return grid;
// };

// const getCenter = () => {
//   return {
//     row: Math.floor(HEX_ROWS / 2),
//     col: Math.floor(HEX_COLUMNS / 2),
//   };
// };

// const getDistance = (row, col) => {
//   const center = getCenter();
//   return Math.abs(center.row - row) + Math.abs(center.col - col);
// };

// const HoneycombReveal = ({ step, visibleCells }) => {
//     return (
//       <div className="grid grid-cols-9 gap-2">
//         {visibleCells.flat().map(({ row, col }) => {
//           const distance = getDistance(row, col);
//           const show = distance >= step;
//           const isAltColor = (row + col) % 2 === 0;
//           const color = isAltColor ? "#FACC15" : "#2e221b";
  
//           return (
//             <AnimatePresence key={`${row}-${col}`}>
//               {show && (
//                 <motion.div
//                   initial={{ scale: 1, opacity: 1 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0.5, opacity: 0 }}
//                   transition={{ duration: 0.4 }}
//                   className="w-[42px] h-[48px]"
//                   style={{
//                     backgroundColor: color,
//                     clipPath:
//                       "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
//                     boxShadow: "0 0 4px rgba(0,0,0,0.4)",
//                     border: "1px solid #2e221b",
//                   }}
//                 ></motion.div>
//               )}
//             </AnimatePresence>
//           );
//         })}
//       </div>
//     );
//   };
// const Hero1 = () => {
//   const canvasRef = useRef(null);
//   const letters = "BeeBark".split("");
//   const tagline = "Strongest Web, Built For Builders".split(" ");
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [visibleCells, setVisibleCells] = useState(generateGrid());
//   const [step, setStep] = useState(0);

//   const [logoVisible, setLogoVisible] = useState(false);
//   const [textVisible, setTextVisible] = useState(false);
  
//   const [leftLogoSpring, setLeftLogoSpring] = useSpring(() => ({
//     transform: "translateX(0px)",
//     opacity: 0,
//     config: { tension: 100, friction: 20 },
//   }));

//   const [rightLogoSpring, setRightLogoSpring] = useSpring(() => ({
//     transform: "translateX(0px)",
//     opacity: 0,
//     config: { tension: 50, friction: 30 },
//   }));

//   const [letterTrail, setLetterTrail] = useState([]);

//   useEffect(() => {
//     // Handle resize
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     // Step animation for honeycomb grid reveal
//     const interval = setInterval(() => {
//       setStep((prev) => prev + 1);
//     }, 500);

//     // After honeycomb grid is done, animate logo
//     setTimeout(() => {
//       setLogoVisible(true); // Start logo animation
//       setLeftLogoSpring({
//         transform: isMobile ? "translateX(-140px)" : "translateX(-380px)",
//         opacity: 1,
//       });
//       setRightLogoSpring({
//         transform: isMobile ? "translateX(400px)" : "translateX(1000px)",
//         opacity: 1,
//       });
//     }, 5000); // After 2 seconds, start logo animation

//     // After logo finishes moving, show text
//     setTimeout(() => {
//       setTextVisible(true); // Show text
//     }, 7000); // After 4 seconds, start text animation

//     return () => clearInterval(interval);
//   }, [setLeftLogoSpring, setRightLogoSpring, isMobile]);

//   useEffect(() => {
//     if (textVisible) {
//       // Trigger letter animations after text is visible
//       const newLetterTrail = letters.map((_, index) => ({
//         opacity: 1,
//         transform: "translateX(0px)",
//         from: { opacity: 0, transform: "translateX(20px)" },
//         delay: index * 200, // Delay each letter a bit more
//       }));
//       setLetterTrail(newLetterTrail);
//     }
//   }, [textVisible]);

//   return (
//     <section className="w-full h-screen bg-white flex items-center justify-center relative overflow-hidden">
//       {/* Canvas Animation */}
//       <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

//       {/* Honeycomb grid reveal */}
//       <HoneycombReveal step={step} visibleCells={visibleCells} />

//       {/* Logos */}
//       <div className="absolute flex items-center justify-center">
//         <animated.img
//           src="bbark.png"
//           alt="Left Logo"
//           className="relative z-10 w-[40%] md:w-[80%]"
//           style={leftLogoSpring}
//         />
//         <animated.img
//           src="bbark.png"
//           alt="Right Logo"
//           className="absolute z-10 w-[40%] md:w-[80%]"
//           style={rightLogoSpring}
//         />
//       </div>

//       {/* Animated Text "BeeBark" */}
//       {textVisible && (
//         <div className="absolute left-[30%] md:left-[35%] top-[43%] md:top-[35%] flex gap-2 text-[13vw] md:text-[10vw] font-extrabold text-herocolor z-20">
//           {letterTrail.map((props, index) => (
//             <animated.span key={index} style={props}>
//               {letters[index]}
//             </animated.span>
//           ))}
//         </div>
//       )}

//       {/* Animated Tagline */}
//       {textVisible && (
//         <div className="absolute left-[30%] md:left-[35%] top-[58%] md:top-[65%] flex gap-2 text-[4vw] md:text-[3vw] font-medium text-gray-600 z-20">
//           {tagline.map((word, index) => (
//             <motion.span
//               key={index}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 2 + index * 0.5, duration: 0.5 }}
//             >
//               {word}{" "}
//             </motion.span>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default Hero1;

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";

// Constants for grid size
const HEX_ROWS = 9; // Number of rows in the hex grid
const HEX_COLUMNS = 9; // Number of columns in the hex grid

// Generate grid data (No gaps between hexagons)
const generateGrid = () => {
  const grid = [];
  for (let row = 0; row < HEX_ROWS; row++) {
    const cols = [];
    for (let col = 0; col < HEX_COLUMNS; col++) {
      cols.push({ row, col });
    }
    grid.push(cols);
  }
  return grid;
};

// Honeycomb Reveal Component
const HoneycombReveal = ({ step, visibleCells }) => {
  return (
    <div className="relative flex justify-center items-center overflow-hidden">
      <div className="grid grid-cols-9 gap-0 relative">
        {visibleCells.flat().map(({ row, col }) => {
          const distance = Math.abs(row - Math.floor(HEX_ROWS / 2)) + Math.abs(col - Math.floor(HEX_COLUMNS / 2));
          const show = distance >= step;

          const isAltColor = (row + col) % 2 === 0; // Alternate colors
          const color = isAltColor ? "#FACC15" : "#2e221b";

          return (
            <AnimatePresence key={`${row}-${col}`}>
              {show && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-[60px] w-[60px]"
                  style={{
                    backgroundColor: color,
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Proper hexagon shape
                    margin: "1px", // Minimal gap between hexagons
                    boxShadow: "0 0 4px rgba(0,0,0,0.4)",
                    border: "1px solid #2e221b",
                  }}
                ></motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
};

// Main Hero1 Component
const Hero1 = () => {
  const canvasRef = useRef(null);
  const letters = "BeeBark".split("");
  const tagline = "Strongest Web, Built For Builders".split(" ");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [visibleCells, setVisibleCells] = useState(generateGrid());
  const [step, setStep] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const [leftLogoSpring, setLeftLogoSpring] = useSpring(() => ({
    transform: "translateX(0px)",
    opacity: 0,
    config: { tension: 100, friction: 20 },
  }));

  const [rightLogoSpring, setRightLogoSpring] = useSpring(() => ({
    transform: "translateX(0px)",
    opacity: 0,
    config: { tension: 50, friction: 30 },
  }));

  const [letterTrail, setLetterTrail] = useState([]);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Honeycomb step animation + logo animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 500);

    setTimeout(() => {
      setLogoVisible(true);
      setLeftLogoSpring({
        transform: isMobile ? "translateX(-140px)" : "translateX(-380px)",
        opacity: 1,
      });
      setRightLogoSpring({
        transform: isMobile ? "translateX(400px)" : "translateX(1000px)",
        opacity: 1,
      });
    }, 5000);

    setTimeout(() => {
      setTextVisible(true);
    }, 7000);

    return () => clearInterval(interval);
  }, [setLeftLogoSpring, setRightLogoSpring, isMobile]);

  // Letter animation after text reveal
  useEffect(() => {
    if (textVisible) {
      const newLetterTrail = letters.map((_, index) => ({
        opacity: 1,
        transform: "translateX(0px)",
        from: { opacity: 0, transform: "translateX(20px)" },
        delay: index * 200,
      }));
      setLetterTrail(newLetterTrail);
    }
  }, [textVisible]);

  return (
    <section className="w-full h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Canvas background (optional use) */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Honeycomb Reveal */}
      <HoneycombReveal step={step} visibleCells={visibleCells} />

      {/* Animated Logos */}
      <div className="absolute flex items-center justify-center">
        <animated.img
          src="bbark.png"
          alt="Left Logo"
          className="relative z-10 w-[40%] md:w-[80%]"
          style={leftLogoSpring}
        />
        <animated.img
          src="bbark.png"
          alt="Right Logo"
          className="absolute z-10 w-[40%] md:w-[80%]"
          style={rightLogoSpring}
        />
      </div>

      {/* BeeBark Title */}
      {textVisible && (
        <div className="absolute left-[30%] md:left-[35%] top-[43%] md:top-[35%] flex gap-2 text-[13vw] md:text-[10vw] font-extrabold text-herocolor z-20">
          {letterTrail.map((props, index) => (
            <animated.span key={index} style={props}>
              {letters[index]}
            </animated.span>
          ))}
        </div>
      )}

      {/* Tagline Animation */}
      {textVisible && (
        <div className="absolute left-[30%] md:left-[35%] top-[58%] md:top-[65%] flex gap-2 text-[4vw] md:text-[3vw] font-medium text-gray-600 z-20">
          {tagline.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 + index * 0.5, duration: 0.5 }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero1;

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Hero1 from "./Hero1"; // Import your Hero1 component

// const HexGridLoader = () => {
//     const hexSize = 30; // Radius
//     const hexWidth = Math.sqrt(3) * hexSize;
//     const hexHeight = 2 * hexSize;
//     const vertSpacing = hexHeight * 0.75;
  
//     const rows = 20;
//     const cols = 30;
  
//     const hexPoints = (x, y) => {
//       let points = [];
//       for (let i = 0; i < 6; i++) {
//         const angle_deg = 60 * i - 30;
//         const angle_rad = (Math.PI / 180) * angle_deg;
//         const px = x + hexSize * Math.cos(angle_rad);
//         const py = y + hexSize * Math.sin(angle_rad);
//         points.push(`${px},${py}`);
//       }
//       return points.join(" ");
//     };
  
//     const hexes = [];
//     for (let row = 0; row < rows; row++) {
//       for (let col = 0; col < cols; col++) {
//         const x = col * hexWidth + ((row % 2) * hexWidth) / 2;
//         const y = row * vertSpacing;
  
//         // Alternate colors based on row + column sum being even or odd
//         const color = (row + col) % 2 === 0 ? "#FACC15" : "#221912"; // Yellow and dark brown

//       hexes.push(
//         <motion.polygon
//           key={`${row}-${col}`}
//           points={hexPoints(x, y)}
//           stroke="black"
//           strokeWidth="1"
//           fill={color}
//           initial={{ opacity: 1, scale: 1 }}
//           animate={{ opacity: 0, scale: 0.3 }}  // Shrink and fade out
//           exit={{ opacity: 0, scale: 0.3 }}
//           transition={{
//             duration: 0.6, // Reduced duration for faster animation
//             delay: (row * cols + col) * 0.008,  // Adjusted delay for faster stagger effect
//           }}
//         />
//       );
//     }
//   }

//   return (
//     <motion.svg
//       width="100%"
//       height="100vh"
//       className="absolute top-0 left-0 flex justify-center items-center"
//       initial={{ opacity: 1 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 1 }}
//     >
//       <g transform="translate(50%, 50%)">
//         {hexes}
//       </g>
//     </motion.svg>
//   );
// };

// // Main Component to Switch from Loader to Hero1
// const HoneycombReveal = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setLoading(false);
//     }, 4000); // Changed to 4 seconds for faster transition

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div className="relative w-full h-screen bg-white overflow-hidden">
//       <AnimatePresence>
//         {loading ? (
//           <HexGridLoader key="loader" />
//         ) : (
//           <motion.div
//             key="hero"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <Hero1 />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default HoneycombReveal;



