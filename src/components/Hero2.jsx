import React, { useEffect, useState, useRef } from "react";
import { useSpring, useTrail, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const Hero2 = () => {
  const canvasRef = useRef(null);
  const totalFrames = 64;
  const [images, setImages] = useState([]);

  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once when visible
    threshold: 0.2, // Starts animation when 20% of the section is in view
  });

  const preloadImages = () => {
    const loadedImages = [];
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/path/to/frames/frame_${String(i).padStart(4, "0")}.png`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  };

  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const img = images[index];
    if (img && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    preloadImages();
  }, []);

  const springRightImage = useSpring({
    transform: inView ? "translateX(80px)" : "translateX(-110px)", // Shifted right on scroll
    opacity: inView ? 1 : 0,
    config: { tension: 200, friction: 25 },
  });

  const letters = "BeeBark".split("");
  const tagline = "Strongest Web, Built For Builders".split(" ");

  const trail = useTrail(letters.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(-20px)",
    config: { tension: 200, friction: 20 },
  });

  const taglineTrail = useTrail(tagline.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(-20px)",
    config: { tension: 200, friction: 20 },
  });

  return (
    <section
      ref={ref}
      className="w-full h-screen bg-white relative flex flex-col items-center justify-center"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="absolute inset-0 flex items-center justify-left md:mx-20 gap-8"> {/* Shifted right */}
        {/* Left logo (Stays in place) */}
        <img
          src="bbark.png"
          alt="Left"
          className="w-[40%] max-w-[300px] z-10"
        />

        {/* Right logo (Moves out of screen) */}
        <animated.img
          src="bbark_1.png"
          alt="Right"
          className="w-[40%] max-w-[300px] z-10"
          style={springRightImage}
        />
      </div>

      {/* Animated Main Text "BeeBark" */}
      <div className="absolute top-[35%] flex gap-2 text-[7vw] sm:text-[8vw] md:text-[10vw] font-bold text-black z-20">
        {trail.map((props, index) => (
          <animated.span key={index} style={props}>
            {letters[index]}
          </animated.span>
        ))}
      </div>

      {/* Animated Tagline */}
      <div className="absolute top-[60%] flex gap-2 text-[3vw] sm:text-[3.5vw] md:text-[2.7vw] font-medium text-gray-600 z-20">
        {taglineTrail.map((props, index) => (
          <animated.span key={index} style={props}>
            {tagline[index]}
          </animated.span>
        ))}
      </div>
    </section>
  );
};

export default Hero2;
