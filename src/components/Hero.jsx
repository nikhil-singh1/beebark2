import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

const Hero = () => {
  const canvasRef = useRef(null);
  const totalFrames = 64;
  const [images, setImages] = useState([]);

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

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(totalFrames - 1, Math.floor(scrollFraction * totalFrames));
    renderFrame(frameIndex);
  };

  useEffect(() => {
    preloadImages();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [springLeftImage, setSpringLeftImage] = useSpring(() => ({
    transform: "translateX(0px)",
    opacity: 1,
    config: { tension: 400, friction: 20 },
  }));

  const [springRightImage, setSpringRightImage] = useSpring(() => ({
    transform: "translateX(0px)",
    opacity: 1,
    config: { tension: 400, friction: 20 },
  }));

  const [springText, setSpringText] = useSpring(() => ({
    opacity: 0,
    transform: "scale(0.5)",
    config: { tension: 200, friction: 25 },
  }));

  useEffect(() => {
    const handleScrollAnimation = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;

      setSpringLeftImage({
        transform: `translateX(-${scrollFraction * 5600}px)`,
        opacity: 1 - scrollFraction * 0.5,
      });

      setSpringRightImage({
        transform: `translateX(${scrollFraction *  5600}px)`,
        opacity: 1 - scrollFraction * 0.5,
      });

      setSpringText({
        opacity: Math.min(1, scrollFraction * 2),
        transform: `scale(${0.9 + scrollFraction * 0.5})`,
      });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    return () => window.removeEventListener("scroll", handleScrollAnimation);
  }, [setSpringLeftImage, setSpringRightImage, setSpringText]);

  return (
    <section className="w-full h-screen bg-white relative flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <animated.h1
        className="absolute text-black font-bold text-[7vw] sm:text-[8vw] md:text-[10vw] z-0"
        style={springText}
      >
        BeeBark
      </animated.h1>

      <div className="absolute inset-0 flex items-center justify-center gap-8">
        <animated.img
          src="bbark.png"
          alt="Left"
          className="w-[40%] max-w-[300px] z-10"
          style={springLeftImage}
        />
        <animated.img
          src="bbark_1.png"
          alt="Right"
          className="w-[40%] max-w-[300px] z-10"
          style={springRightImage}
        />
      </div>
    </section>
  );
};

export default Hero;
