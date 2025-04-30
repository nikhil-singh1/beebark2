import { motion } from "framer-motion";
import { beeBarkPattern } from "./hexPattern";

const hexSize = 18;
const xSpacing = hexSize * 1.5;
const ySpacing = Math.sqrt(3) * hexSize;

const Hexagon = ({ finalX, finalY, delay, animateToForm, color }) => {
  const randomX = Math.random() * 1500 - 750; // Wider scatter
  const randomY = Math.random() * 1500 - 750;

  return (
    <motion.svg
      width={hexSize * 2}
      height={hexSize * 2}
      viewBox="0 0 60 60"
      className="absolute"
      style={{ color }}
      initial={{
        x: animateToForm ? randomX : finalX,
        y: animateToForm ? randomY : finalY,
        scale: 0,
        opacity: 0,
      }}
      animate={{
        x: finalX,
        y: finalY,
        scale: 1,
        opacity: 1,
      }}
      transition={{
        delay,
        duration: 1.5,
        type: "spring",
        stiffness: 70,
        damping: 8,
      }}
    >
      <path d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z" fill="currentColor" />
    </motion.svg>
  );
};

const HexagonGrid = ({ animateToForm }) => {
  const hexagons = [];
  const centerX = (beeBarkPattern[0].length * xSpacing) / 2;
  const centerY = (beeBarkPattern.length * ySpacing) / 2;

  beeBarkPattern.forEach((rowStr, row) => {
    [...rowStr].forEach((cell, col) => {
      if (cell !== " ") {
        const finalX = col * xSpacing - centerX;
        const finalY = row * ySpacing + (col % 2 === 0 ? 0 : ySpacing / 2) - centerY;
        const delay = Math.random();
        hexagons.push(
          <Hexagon
            key={`${row}-${col}`}
            finalX={finalX}
            finalY={finalY}
            delay={delay}
            animateToForm={animateToForm}
            color={cell === "B" ? "#facc15" : "#f1f5f9"}
          />
        );
      }
    });
  });

  return <>{hexagons}</>;
};

export default HexagonGrid;
