import React from "react";

const ScrollingHighlight = () => {
  return (
    <div className="relative w-full h-48 bg-herocolor overflow-hidden flex flex-col justify-center items-center gap-4">
      {/* First Line: Right to Left, Starts from Left */}
      <div className="w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-right-to-left">
          {Array(20) // Increased repetitions to remove gaps
            .fill("WELCOME TO THE FUTURE")
            .map((text, index) => (
              <span
                key={index}
                className="text-2xl font-bold mx-4 text-yellow-400 drop-shadow-[0_0_10px_#FFD700] animate-pulse"
              >
                {text}
              </span>
            ))}
        </div>
      </div>

      {/* Second Line: Left to Right, Starts from Left */}
      <div className="w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-left-to-right">
          {Array(20)
            .fill("WELCOME TO THE FUTURE")
            .map((text, index) => (
              <span
                key={index}
                className="text-2xl font-bold mx-4 text-yellow-400 drop-shadow-[0_0_10px_#FFD700] animate-pulse"
              >
                {text}
              </span>
            ))}
        </div>
      </div>

      {/* Third Line: Right to Left, Starts from Left */}
      <div className="w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-right-to-left">
          {Array(20)
            .fill("WELCOME TO THE FUTURE")
            .map((text, index) => (
              <span
                key={index}
                className="text-2xl font-bold mx-4 text-yellow-400 drop-shadow-[0_0_10px_#FFD700] animate-pulse"
              >
                {text}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingHighlight;
