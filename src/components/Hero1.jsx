import React, { useEffect, useRef, useState } from "react";
import { useSpring, useTrail, animated } from "@react-spring/web";
import "../assets/fonts.css"; // ✅ Import custom font CSS

const fontFamily = "'Myriad Pro', 'Myriad', sans-serif";

const Hero1 = () => {
  const canvasRef = useRef(null);
  const letters = "BeeBark".split("");
  const tagline = "Architecture| Interior| Real Estate| Construction".split(" "); // ✅ Fix spacing

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [leftLogoSpring, setLeftLogoSpring] = useSpring(() => ({
    transform: "translateX(0px)",
    opacity: 1,
    config: { tension: 100, friction: 20 },
  }));

  const [rightLogoSpring, setRightLogoSpring] = useSpring(() => ({
    transform: "translateX(0px)",
    opacity: 1,
    config: { tension: 50, friction: 30 },
  }));

  const letterTrail = useTrail(letters.length, {
    opacity: 1,
    transform: "translateX(0px)",
    from: { opacity: 0, transform: "translateX(20px)" },
    delay: 1500,
    config: { tension: 100, friction: 25 },
  });

  const taglineTrail = useTrail(tagline.length, {
    opacity: 1,
    transform: "translateX(0px)",
    from: { opacity: 0, transform: "translateX(20px)" },
    delay: 2000,
    config: { tension: 100, friction: 25 },
  });

  useEffect(() => {
    const rightShift = isMobile ? 400 : 1000;
    const leftShift = isMobile ? -140 : -380;

    const timer1 = setTimeout(() => {
      setRightLogoSpring({ transform: `translateX(${rightShift}px)` });
    }, 1000);

    const timer2 = setTimeout(() => {
      setLeftLogoSpring({ transform: `translateX(${leftShift}px)` });
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [setRightLogoSpring, setLeftLogoSpring, isMobile]);

  return (
    <section
      className="w-full h-screen bg-white flex items-center justify-center relative overflow-hidden"
      style={{ fontFamily }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Logos */}
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

      {/* Animated "BeeBark" */}
      <div
        className="absolute left-[30%] md:left-[35%] top-[45%] md:top-[33%] flex gap-2 text-[12.4vw] md:text-[13vw] font-extrabold text-herocolor z-20"
        style={{ fontFamily }}
      >
        {letterTrail.map((props, index) => (
          <animated.span key={index} style={props}>
            {letters[index]}
          </animated.span>
        ))}
      </div>

      {/* Animated Tagline */}
      <div
        className="absolute left-[30%] md:left-[35%] top-[52%] md:top-[65%] flex gap-1 text-[3vw] md:text-[3vw] font-medium text-gray-600 z-20"
        style={{ fontFamily }}
      >
        {taglineTrail.map((props, index) => (
          <animated.span key={index} style={props}>
            {tagline[index]}
          </animated.span>
        ))}
      </div>
    </section>
  );
};

export default Hero1;
