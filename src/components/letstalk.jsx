import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header"

export default function LetsTalk() {
  const location = useLocation();
  const [helpType, setHelpType] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");

  useEffect(() => {
    if (location.state && location.state.helpType) {
      setHelpType(location.state.helpType);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form submitted with industry:", category, "Other Category:", otherCategory);
  };

  return (
    <>
       <Header />
   
    <div className="bg-white pt-28 pb-16 px-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="min-h-[300px]">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Let's Talk</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full p-4 border border-gray-300 rounded-md text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full p-4 border border-gray-300 rounded-md text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full p-4 border border-gray-300 rounded-md text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="regarding">
                Regarding
              </label>
              <input
                type="text"
                id="regarding"
                value={helpType}
                readOnly
                className="w-full p-4 border border-gray-300 rounded-md bg-yellow-300 text-black"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Industry
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md text-black"
                required
              >
                <option value="">Select Category</option>
                <option value="architect">Architect</option>
                <option value="web_developer">Web Developer</option>
                <option value="real_estate">Real Estate</option>
                <option value="designer">Designer</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Additional input for "Others" category */}
            {category === "others" && (
              <div className="mb-6">
                <label htmlFor="otherCategory" className="block text-gray-700 font-medium mb-2">
                  Please Specify
                </label>
                <input
                  type="text"
                  id="otherCategory"
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-md text-black"
                  required
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                Tell Us More
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-4 border border-gray-300 rounded-md text-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 text-white py-3 px-8 rounded-lg hover:bg-yellow-600"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="items-center justify-center hidden md:flex">
          <img
            src="/c5.jpeg"
            alt="Let's talk"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
    </>
  );
}
