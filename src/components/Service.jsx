import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
 
  {
    title: "AI-Driven Client Acquisition & Smart Lead Generation",
    description:
      "Leveraging Al to attract, engage, and convert high-quality leads efficiently. Optimizing outreach with data-driven insights and automation.",
    image: "/image4.jpeg",
  },
  {
    title: "Immersive Project Showcasing & Intelligent Portfolio Curation",
    description:
      "Showcasing projects with dynamic, interactive experiences. Curating portfolios with Al-driven precision for maximum impact.",
    image: "/image5.jpeg",
  },
  {
    title: "Precision Talent Sourcing & AI-Powered Hiring Solutions",
    description:
      "Leveraging Al to identify top talent with speed and accuracy. Streamlining recruitment for smarter, data-driven hiring decisions",
    image: "/image6.jpeg",
  },
  {
    title: "Strategic Project Bidding & Scalable Business Expansion",
    description:
      "Optimizing bids for high-value projects with data-driven strategies. Driving sustainable growth through smart scaling solutions.",
    image: "/image7.jpeg",
  },
  {
    title: "Premier Industry Summits & AI-Backed Growth Acceleration",
    description:
      "Hosting elite summits to foster innovation and collaboration. Leveraging Al to drive strategic business growth and expansion.",
    image: "/image8.jpeg",
  },
  {
    title: "AI-Optimized Property Marketplace: Buy, Sell, Rent and Lease",
    description:
      "Streamlining real estate transactions with intelligent automation. Connecting buyers, sellers, and renters with data-driven precision.",
    image: "/image9.jpeg",
  },
  {
    title: "Architectural Commerce & Bespoke Design Marketplace",
    description:
      "A premier hub for exclusive architectural solutions and custom designs. Connecting visionaries with tailored, high-end design innovations.",
    image: "/image10.jpeg",
  },
];

const Service = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    const extraScroll = 450;
    const totalScrollWidth = container.scrollWidth - window.innerWidth + extraScroll;

    // Animate cards scroll
    gsap.to(container, {
      x: () => `-${totalScrollWidth}px`,
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress; // value from 0 to 1
          const index = Math.round(progress * (services.length - 1)) + 1;
          setCurrentIndex(index);
        },
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <section id="services" ref={wrapperRef} className="relative w-full h-screen overflow-hidden flex items-center bg-gray-50">

 <div className="w-1/3 text-left px-5 mr-20 pr-20 z-10">
    <h2 className="text-3xl md:text-7xl font-bold text-[#221912]">
      Our <span className="text-yellow-400 text-4xl md:text-8xl">Features</span>
    </h2>
  </div>
    
      {/* 🚀 Cards container */}
      <div
        ref={containerRef}
        className="flex space-x-10 mx-12 px-12 h-full items-center relative z-10 bg-transparent"
        style={{
          width: `${services.length * 400}px`,
         
        }}
        >

      
       {services.map((service, index) => (
          <div
            key={index}
            className="w-[340px] h-[500px] flex-shrink-0 bg-white shadow-lg border-4 border-yellow-500"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-56 object-cover"
            />
            <h3 className="text-xl font-bold mt-4 text-gray-900 p-4">{service.title}</h3>
            <p className="text-gray-600 mt-2 p-4 ">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;


