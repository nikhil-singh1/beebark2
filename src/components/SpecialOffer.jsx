import React from "react";
import { useNavigate } from "react-router-dom";

const SpecialOffer = () => {
  const navigate = useNavigate();

  const handleAvailNow = () => {
    navigate("/register");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-800 pb-4">
            Exclusive offer for{" "}
            <span className="text-black underline decoration-pink-500">
              Architects, Interior Designers & Real Estate Industry.
            </span>
          </h2>

          <ul className="space-y-4 text-gray-700 text-lg">
            <li>
              <span className="text-yellow-500 font-bold">✔</span>{" "}
              <b>Comprehensive Digital Audit (<span className="underline decoration-green-500">₹10,000 Value</span>)</b> - Gain deep
              insights into your digital presence.
            </li>
            <li>
              <span className="text-yellow-500 font-bold">✔</span>{" "}
              <b>1-Year Free Access to Our Future SaaS Platform (<span className="underline decoration-green-500">₹2,50,000 Value</span>)</b>{" "}
              - Stay ahead with cutting-edge AI-driven tools.
            </li>
            <li>
              <span className="text-yellow-500 font-bold">✔</span>{" "}
              <b>Fully Customizable Website (<span className="underline decoration-green-500">₹1,00,000 Value</span>)</b> - A high-end
              digital identity tailored to your brand.
            </li>
            <li>
              <span className="text-yellow-500 font-bold">✔</span>{" "}
              <b>Premium Branding Package (Up to <span className="underline decoration-green-500">₹50,000 Value</span>)</b> - Elevate your
              brand presence with professional branding services.
            </li>
          </ul>
        </div>
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Unlock <span className="underline decoration-green-500">₹4,10,000</span>
          </h3>
          <p className="text-gray-700 text-lg">Worth of Premium Services -</p>
          <button
            onClick={handleAvailNow}
            className="mt-4 bg-yellow-300 text-black px-6 py-3 rounded-lg shadow-md font-bold hover:bg-yellow-400"
          >
            Avail Now!
          </button>
          <p className="text-gray-500 text-sm mt-2">
            See{" "}
            <a href="/terms" className="text-yellow-500 font-semibold hover:text-yellow-600"> Offer Terms.</a>{" "}
            Overages apply if contact or email send limit is exceeded.{" "}
          
          </p>
        
        </div>
      </div>
      <div className="mt-6 text-center">
  <p className="bg-yellow-400 text-black font-bold text-lg py-3 px-6 rounded-lg inline-block">
    Total Value - ₹4,10,000
  </p>
  <div className="mt-2"> {/* Added a div for better spacing */}
    <a href="/terms" className="text-black font-semibold hover:underline text-center block">
      See Offer Terms.
    </a>
  </div>
</div>
</div>
  );
};

export default SpecialOffer;
