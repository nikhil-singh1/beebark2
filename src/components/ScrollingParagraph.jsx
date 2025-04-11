// import React, { useRef, useEffect, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const services = [
//   {
//     title: "Web Development & Social Marketing",
//     description:
//       "Web development builds and optimizes websites, while social media marketing leverages platforms to enhance brand visibility and audience engagement.",
//     image: "/image1.jpeg",
//   },
//   {
//     title: "Branding",
//     description:
//       "Branding is the process of creating a unique identity for a company or product, shaping how it is perceived by consumers.",
//     image: "/image2.jpeg",
//   },
//   {
//     title: "Exclusive Networking & Industry Collaboration",
//     description:
//       "Exclusive networking and industry collaboration create powerful alliances that drive innovation, enhance business opportunities, and foster growth within a specific sector.",
//     image: "/image3.jpeg",
//   },
//   {
//     title: "Client Acquisition & Lead Generation",
//     description:
//       "Client acquisition and lead generation involve attracting and converting prospects into clients through targeted marketing and effective sales strategies.",
//     image: "/image4.jpeg",
//   },
//   {
//     title: "Project Showcasing & Portfolio Management",
//     description:
//       "Project showcasing and portfolio management involve curating and presenting your best work in a well-organized manner to demonstrate expertise and attract opportunities.",
//     image: "/image5.jpeg",
//   },
//   {
//     title: "Hiring & Talent Acquisition",
//     description:
//       "Hiring and talent acquisition focus on identifying, attracting, and recruiting top talent to meet an organization's staffing needs and drive business success.",
//     image: "/image6.jpeg",
//   },
//   {
//     title: "Project Binding & Business Expansion",
//     description:
//       "Project bidding and business expansion involve submitting competitive bids for projects while pursuing opportunities to grow and diversify the business in new markets.",
//     image: "/image7.jpeg",
//   },
//   {
//     title: "Industry Events & Growth Opportunities",
//     description:
//       "Industry events and growth opportunities provide platforms for networking, learning, and discovering new avenues for business development and market expansion",
//     image: "/image8.jpeg",
//   },
//   {
//     title: "Property Listing (Buy, Sell, Rent and Lease)",
//     description:
//       "Property listing involves showcasing properties for sale, rent, or lease, helping buyers, sellers, and renters connect to meet their real estate needs.",
//     image: "/image9.jpeg",
//   },
//   {
//     title: "Ecommerce",
//     description:
//       "Ecommerce is the buying and selling of goods and services online, enabling businesses to reach a global audience and streamline transactions.",
//     image: "/image10.jpeg",
//   },
// ];

// const Scrolling = () => {
//   const containerRef = useRef(null);
//   const wrapperRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(1);

//   useEffect(() => {
//     const container = containerRef.current;
//     const totalScrollWidth = container.scrollWidth - window.innerWidth;

//     // Animate cards scroll
//     gsap.to(container, {
//       x: () => `-${totalScrollWidth}px`,
//       ease: "none",
//       scrollTrigger: {
//         trigger: wrapperRef.current,
//         start: "top top",
//         end: () => `+=${totalScrollWidth}`,
//         scrub: 1,
//         pin: true,
//         anticipatePin: 1,
//         onUpdate: (self) => {
//           const progress = self.progress; // value from 0 to 1
//           const index = Math.round(progress * (services.length - 1)) + 1;
//           setCurrentIndex(index);
//         },
//       },
//     });

//     return () => ScrollTrigger.killAll();
//   }, []);

//   return (
//     <section ref={wrapperRef} className="relative w-full h-screen overflow-hidden bg-gray-50">


//       {/* 🚀 Cards container */}
//       <div
//         ref={containerRef}
//         className="flex space-x-6 px-10 h-full items-center relative z-10"
//         style={{
//           width: `${services.length * 340}px`,
//         }}
//       >
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="w-[320px] flex-shrink-0 bg-white rounded-xl shadow-lg p-5 border-4 border-yellow-500"
//           >
//             <img
//               src={service.image}
//               alt={service.title}
//               className="w-full h-48 object-cover rounded-lg"
//             />
//             <h3 className="text-xl font-bold mt-4">{service.title}</h3>
//             <p className="text-gray-600 mt-2">{service.description}</p>
            
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Scrolling;


import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
   {
    title: "Web Development & Social Marketing",
    description:
      "Web development builds and optimizes websites, while social media marketing leverages platforms to enhance brand visibility and audience engagement.",
    image: "/image1.jpeg",
  },
  {
    title: "Branding",
    description:
      "Branding is the process of creating a unique identity for a company or product, shaping how it is perceived by consumers.",
    image: "/image2.jpeg",
  },
  {
    title: "Exclusive Networking & Industry Collaboration",
    description:
      "Exclusive networking and industry collaboration create powerful alliances that drive innovation, enhance business opportunities, and foster growth within a specific sector.",
    image: "/image3.jpeg",
  },
  {
    title: "Client Acquisition & Lead Generation",
    description:
      "Client acquisition and lead generation involve attracting and converting prospects into clients through targeted marketing and effective sales strategies.",
    image: "/image4.jpeg",
  },
  {
    title: "Project Showcasing & Portfolio Management",
    description:
      "Project showcasing and portfolio management involve curating and presenting your best work in a well-organized manner to demonstrate expertise and attract opportunities.",
    image: "/image5.jpeg",
  },
  {
    title: "Hiring & Talent Acquisition",
    description:
      "Hiring and talent acquisition focus on identifying, attracting, and recruiting top talent to meet an organization's staffing needs and drive business success.",
    image: "/image6.jpeg",
  },
  {
    title: "Project Binding & Business Expansion",
    description:
      "Project bidding and business expansion involve submitting competitive bids for projects while pursuing opportunities to grow and diversify the business in new markets.",
    image: "/image7.jpeg",
  },
  {
    title: "Industry Events & Growth Opportunities",
    description:
      "Industry events and growth opportunities provide platforms for networking, learning, and discovering new avenues for business development and market expansion",
    image: "/image8.jpeg",
  },
  {
    title: "Property Listing (Buy, Sell, Rent and Lease)",
    description:
      "Property listing involves showcasing properties for sale, rent, or lease, helping buyers, sellers, and renters connect to meet their real estate needs.",
    image: "/image9.jpeg",
  },
  {
    title: "Ecommerce",
    description:
      "Ecommerce is the buying and selling of goods and services online, enabling businesses to reach a global audience and streamline transactions.",
    image: "/image10.jpeg",
  },
];

const Scrolling = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    const totalScrollWidth = container.scrollWidth - window.innerWidth;

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
    <section ref={wrapperRef} className="relative w-full h-screen flex items-center bg-gray-50 px-10">
      {/* Left Title */}
      <div className="w-[500px] text-left pr-10">
        <h2 className="text-4xl font-bold text-gray-800">Our SaaS Services</h2>
      </div>

      {/* 🚀 Cards Container */}
      <div
        ref={containerRef}
        className="flex space-x-6 px-10 h-full items-center relative z-10"
        style={{
          width: `${services.length * 340}px`,
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="w-[320px] h-[500px] flex-shrink-0 bg-white  shadow-lg  border-4 border-yellow-500"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover "
            />
            <h3 className="text-xl font-bold mt-4 p-4">{service.title}</h3>
            <p className="text-gray-600 mt-2 p-4">{service.description}</p>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default Scrolling;
