import React from "react";

const Thankyou = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-120">
        <div className="bg-gray-200 h-60 flex items-center justify-center">
          <img
            src="/thankyou.png" // Placeholder illustration
            alt="Illustration"
            className="h-56"
          />
        </div>
        <div className="p-6 ">
          <h3 className="text-lg font-medium text-black">Hi There,</h3>
          <h2 className="text-2xl font-bold my-2 text-black">Thanks You!</h2>
          <p className="text-gray-600 text-sm md:text-md mb-4">
            Thank you for subscribing to Beebark! We're so excited to welcome
            you as a Beebark Premium user.
          </p>
          <button className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-full w-full hover:bg-yellow-500">
            Confirm Email
          </button>
        </div>
        <div className="bg-gray-100 text-center py-4">
          <p className="text-gray-500 text-sm">Follow us on:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-gray-600 hover:text-black text-lg">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-black text-lg">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-black text-lg">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
