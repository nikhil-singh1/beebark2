import React from 'react';

const Contact1 = () => {
  return (
    <div className="min-h-screen bg-[#221912] text-white flex flex-col lg:flex-row items-center justify-center p-4 font-inter">
      {/* Left Section: Image and "Say hello" */}
      {/* On large screens, this section will take 60% of the width */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center lg:items-start p-8">
        <h1 className="text-5xl font-bold mb-8 text-yellow-400">Say hello</h1>
        <div className="relative w-full max-w-lg lg:max-w-none h-64 lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
          {/* Placeholder image - replace with your actual image */}
          <img
            src="https://placehold.co/800x600/221912/FFD700?text=Your+Image+Here"
            alt="Two men smiling"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/800x600/221912/FFD700?text=Image+Not+Found';
            }}
          />
        </div>
      </div>

      {/* Right Section: Contact Information */}
      {/* On large screens, this section will take 40% of the width */}
      <div className="w-full lg:w-2/5 bg-[#221912] p-8 rounded-lg shadow-xl mt-8 lg:mt-0 lg:ml-8">
        <div className="space-y-8">
          {/* Email */}
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Shoot us an Email</p>
              <a href="mailto:contact@oberhaeuser.info" className="text-yellow-400 text-lg font-medium hover:underline">contact@oberhaeuser.info</a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684L10.5 9.87a1 1 0 00.54 1.06l7.18 3.59a1 1 0 001.06.54l3.59-.718a1 1 0 01.718.106l.718.718a1 1 0 01.106.718l-.718 3.59a1 1 0 01-.54 1.06l-3.59.718a1 1 0 01-1.06-.54l-7.18-3.59a1 1 0 00-1.06-.54l-3.59.718a1 1 0 01-.718-.106l-.718-.718a1 1 0 01-.106-.718l.718-3.59a1 1 0 01.54-1.06z"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Give us a Call</p>
              <a href="tel:+49.40.5069118" className="text-yellow-400 text-lg font-medium hover:underline">+49.40.5069118</a>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m11.314 0A8.996 8.996 0 0012 15c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Say Hello, and Grab a Coffee or Beer</p>
              <p className="text-yellow-400 text-lg font-medium">Kampstr. 15</p>
              <p className="text-yellow-400 text-lg font-medium">20357 Hamburg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact1;
