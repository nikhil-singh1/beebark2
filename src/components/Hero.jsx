import React, { useState, useRef, useEffect } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false); // To track if the video is in view
  const videoRef = useRef(null); // Reference to the video element
  const navigate = useNavigate(); // Initialize the navigate function

  // Toggle mute/unmute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle "Learn More" button click
  const handleLearnMore = () => {
    navigate("/other-page"); // Example: Navigating to '/other-page'
  };

  // Handle intersection observer for lazy loading the video
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          if (videoRef.current) {
            videoRef.current.play(); // Play video when in view
          }
        } else {
          setIsInView(false);
          if (videoRef.current) {
            videoRef.current.pause(); // Pause video when out of view
          }
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the video is in the viewport
    );

    // Observe the video element
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Cleanup the observer
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full h-[400px] md:h-[600px] mt-10 pt-10 overflow-hidden"
    
    >
      {/* Video Background */}
      <video
        ref={videoRef} // Reference to the video element
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
        // The autoPlay is not needed here as we manually control it
      >
        <source src="video.mp4" type="video/mp4" />
        <source src="video.webm" type="video/webm" />
        {/* Fallback Message */}
        Your browser does not support the video tag.
      </video>

      {/* Mute/Unmute Button */}
      <div className="absolute bottom-5 right-5  p-2 rounded-full cursor-pointer z-10">
        {isMuted ? (
          <SpeakerXMarkIcon
            className="w-6 h-6 md:w-8 md:h-8 text-white"
            onClick={toggleMute}
          />
        ) : (
          <SpeakerWaveIcon
            className="w-6 h-6 md:w-8 md:h-8 text-white"
            onClick={toggleMute}
          />
        )}
      </div>
       {/* Yellow Strip at the Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-400 ">
        {/* You can add text or other content here if needed */}
      </div>
    </div>
  );
}