import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Contact() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Professionals",
      image: "/c1.jpeg",
    },
    {
      title: "Social Media",
      image: "/c4.jpeg",
    },
    {
      title: "Website",
      image: "/c3.jpeg",
    },
    {
      title: "Customer",
      image: "/c2.jpeg",
    },
  ];

  return (
    <>
   
    <div className="bg-gray-50 pt-28 pb-20 px-6">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600">
            Need help? Click on a section below to learn more or reach out to us directly.
          </p>
        </div>

        {/* Help Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="relative group cursor-pointer w-full border-4 border-yellow-500"
              onClick={() => navigate("/LetsTalk", { state: { helpType: section.title } })}
            >
              {/* Image */}
              <img
                src={section.image}
                alt={section.title}
                className="w-full aspect-square object-cover  shadow-lg"
              />
              {/* Overlay and Title */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
                <h2 className="text-white text-xl font-bold">{section.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
