import React from "react";

const HexagonGrid = () => {
  const pattern = [
  "  WWW   ",
  "  WWWWWW  ",
  "  WWWWWWWWW   ",
  "  WWWWWWWWWWWW   ",
  "  WWWWWWWWWWWWWWW   ",
  "  WWWWWWWWWWWWWWWWWW   ",
  "  YYYYYYYYYYWWWWWWWWW  ",
  "  YYYYYYYYYYYYWWWWWW   ",
  "  YYYYYYYYYYYYYYWWWW   ",
  "  YYYYYYYYYYYYYYWWW",
  "  YYYYYYYYYYYYYYWWW  ",
  "   YYYYYYYYYYYYYYYW ",
  "    YYYYYYYYYYYYYY   ",
  "     YYYYYYYYYYYYYY   ",
  "      YYYYYYYYYYYYYY    ",
  "       YYYYYYYYYYYYYY     ",
  "        YYYYYYYYYYYYYY     ",
  "         YYYYYYYYYYYYYY     ",
  "          YYYYYYYYYYYYYY     ",
  "           YYYYYYYYYYYYYY      ",
  "            YYYYYYYYYYYYYY      ",
  "             YYYYYYYYYYYYYY      ",
  ];

  const getColor = (row, col) => {
    if (row >= pattern.length || col >= pattern[row].length) return "bg-white";
    const cell = pattern[row][col];
    if (cell === "W") return "bg-[#2e221b]";
    if (cell === "Y") return "bg-yellow-400";
    return "bg-white"; // background dark brown
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {pattern.map((rowString, rowIndex) => (
        <div
          key={rowIndex}
          className="flex"
          style={{
            marginLeft: rowIndex % 2 === 0 ? "0px" : "18px",
          }}
        >
          {rowString.split("").map((_, colIndex) => (
            <div
              key={colIndex}
              className={`w-6 h-6 ${getColor(rowIndex, colIndex)} m-0.5`}
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HexagonGrid;
