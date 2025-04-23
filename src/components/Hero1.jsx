import React, { useEffect, useRef, useState } from "react";
import { useSpring, useTrail, animated } from "@react-spring/web";

const Hero1 = () => {
  const canvasRef = useRef(null);
  const letters = "BeeBark".split("");
  const tagline = "Strongest Web, Built For Builders".split(" ");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect screen resize and update `isMobile`
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Left logo animation (initial state)
  const [leftLogoSpring, setLeftLogoSpring] = useSpring(() => ({
    transform: "translateX(0px)",
    opacity: 1,
    config: { tension: 100, friction: 20 },
  }));

  // Right logo animation (moves out slowly)
  const [rightLogoSpring, setRightLogoSpring] = useSpring(() => ({
    transform: "translateX(0px)",
    opacity: 1,
    config: { tension: 50, friction: 30 },
  }));

  // Letter animation (gradually revealed)
  const letterTrail = useTrail(letters.length, {
    opacity: 1,
    transform: "translateX(0px)",
    from: { opacity: 0, transform: "translateX(20px)" },
    delay: 1500, // Delay before letters appear
    config: { tension: 100, friction: 25 },
  });

  // Tagline animation (gradually revealed)
  const taglineTrail = useTrail(tagline.length, {
    opacity: 1,
    transform: "translateX(0px)",
    from: { opacity: 0, transform: "translateX(20px)" },
    delay: 2000, // Delay before tagline appears
    config: { tension: 100, friction: 25 },
  });

  useEffect(() => {
    setTimeout(() => {
      setRightLogoSpring({
        transform: isMobile ? "translateX(400px)" : "translateX(1000px)", // Different for mobile & laptop
      });
    }, 1000);

    setTimeout(() => {
      setLeftLogoSpring({
        transform: isMobile ? "translateX(-140px)" : "translateX(-380px)", // Different for mobile & laptop
      });
    }, 1000);
  }, [setRightLogoSpring, setLeftLogoSpring, isMobile]);

  return (
    <section className="w-full h-[420px] md:h-screen bg-white flex items-center justify-center relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Logos */}
      <div className="absolute flex items-center justify-center">
        {/* Left logo (shifts slightly left after 2 sec) */}
        <animated.img
          src="bbark.png"
          alt="Left Logo"
          className="relative z-10 w-[40%] md:w-[80%]"
          style={leftLogoSpring}
        />
        {/* Right logo (moves out slowly) */}
        <animated.img
          src="bbark.png"
          alt="Right Logo"
          className="absolute z-10 w-[40%] md:w-[80%]"
          style={rightLogoSpring}
        />
      </div>

      {/* Animated Text "BeeBark" */}
      <div className="absolute left-[30%] md:left-[35%] top-[43%] md:top-[35%] flex gap-2 text-[13vw] md:text-[10vw] font-extrabold text-herocolor z-20">
        {letterTrail.map((props, index) => (
          <animated.span key={index} style={props}>
            {letters[index]}
          </animated.span>
        ))}
      </div>

      {/* Animated Tagline */}
      <div className="absolute left-[30%] md:left-[35%] top-[58%] md:top-[65%] flex gap-2 text-[4vw] md:text-[3vw] font-medium text-gray-600 z-20">
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