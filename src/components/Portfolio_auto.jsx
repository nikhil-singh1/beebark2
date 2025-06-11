import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import img1 from "../assets/Sample1.png";
import img2 from "../assets/Sample2.png";
import img3 from "../assets/Sample3.png";

const portfolioGroups = [
  {
    name: "Potterzwheel",
    description:
      "Building homes, shaping dreams. We specialize in connecting you with the perfect property while redefining trust and transparency in real estate. Let's create a seamless journey toward your ideal home.",
    items: [
      {
        title: "Hero Section",
        subtitle: "",
        bullets: [
          "Minimalist structure with natural materials",
          "Vastu-compliant spatial arrangement",
          "Integrated indoor-outdoor living",
        ],
        img: img1,
      },
      {
        title: "Featured Listing",
        subtitle: "Semi-custom workspace interior",
        bullets: [
          "Open office layout with breakout zones",
          "Smart lighting and ventilation system",
          "Modern branding integrations",
        ],
        img: img2,
      },
      {
        title: "About Us",
        subtitle: "Interior and landscape fusion",
        bullets: [
          "Terrace garden & water feature",
          "Premium Italian stone finishes",
          "Smart home integration",
        ],
        img: img3,
      },
    ],
  },
  {
    name: "Trizzone",
    description:
      "Premium architecture and design firm portfolio coming soon.",
    items: [], // no images yet
  },
];

const AutoScrollPortfolio = () => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const activeGroup = portfolioGroups[currentGroup];
  const portfolioItems = activeGroup.items;
  const hasImages = portfolioItems.length > 0;

  useEffect(() => {
    if (!hasImages) return;

    const scrollContainer = scrollRef.current;
    let index = 0;

    const interval = setInterval(() => {
      if (!scrollContainer) return;

      index = (index + 1) % portfolioItems.length;
      scrollContainer.scrollTo({
        top: index * 220,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentGroup]);

  const nextGroup = () =>
    setCurrentGroup((prev) => (prev + 1) % portfolioGroups.length);
  const prevGroup = () =>
    setCurrentGroup((prev) =>
      prev === 0 ? portfolioGroups.length - 1 : prev - 1
    );

  const activeItem = portfolioItems[activeIndex] || {};

  return (
    <div className="bg-black text-white py-16 px-4 md:px-16">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevGroup}
          className="text-yellow-400 font-bold text-2xl"
        >
          ←
        </button>
        <h1 className="text-2xl font-semibold">{activeGroup.name}</h1>
        <button
          onClick={nextGroup}
          className="text-yellow-400 font-bold text-2xl"
        >
          →
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left Text Section */}
        <motion.div
          key={activeItem.title || activeGroup.name}
          className="md:w-1/2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            {activeItem.title || activeGroup.name}
          </h2>
          <p className="text-lg text-gray-100 mb-4">
            {activeItem.subtitle || activeGroup.description}
          </p>

          {activeItem.bullets ? (
            <ul className="list-disc pl-5 text-gray-400 space-y-2">
              {activeItem.bullets.map((point, i) => (
                <li key={i} className="text-sm">
                  {point}
                </li>
              ))}
            </ul>
          ) : null}

          <button className="mt-6 bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-300">
            LEARN MORE
          </button>
        </motion.div>

        {/* Right Image Section */}
        {hasImages ? (
          <div
            ref={scrollRef}
            className="md:w-1/3 w-full h-[220px] overflow-hidden flex flex-col gap-4 scroll-smooth"
          >
            {portfolioItems.map((item, i) => (
              <img
                key={i}
                src={item.img}
                alt={item.title}
                className={`w-full h-[200px] object-cover rounded-lg transition-all duration-500 ${
                  i === activeIndex ? "ring-4 ring-yellow-400" : "grayscale"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="md:w-1/2 w-full h-[220px] flex items-center justify-center text-gray-200 border border-dashed rounded-lg">
            No visuals available yet
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoScrollPortfolio;
