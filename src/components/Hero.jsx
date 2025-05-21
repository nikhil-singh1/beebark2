import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Play/pause based on viewport visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          if (videoRef.current) {
            videoRef.current.play().catch((e) => {
              console.warn("Autoplay with sound might be blocked by browser:", e);
            });
          }
        } else {
          setIsInView(false);
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] mt-10 pt-10 overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        // No muted, to allow sound
        // No autoplay — controlled via JS for intersection
      >
        <source src="video.mp4" type="video/mp4" />
        <source src="video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Yellow Strip at the Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-400" />
    </div>
  );
}
