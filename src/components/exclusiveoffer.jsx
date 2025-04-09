const ExclusiveOffer = () => {
    return (
      <div className="bg-yellow-400 p-10 text-center">
        <h2 className="text-2xl font-bold mb-6 text-black">Conditions to Avail This Exclusive Offer</h2>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {/* First Condition */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <img src="/registration.png" alt="Register" className="w-16 h-16" />
            </div>
            <h3 className="font-bold text-black">Register for Free</h3>
            <p className="text-black">on our platform</p>
          </div>
  
          {/* Second Condition */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <img src="/marketing.png" alt="Marketing" className="w-16 h-16" />
            </div>
            <h3 className="font-bold text-black">Opt for <span className="text-black">Meta & LinkedIn Marketing</span></h3>
            <p className="text-black">at just ₹35,000 for 6 months to supercharge your online growth.</p>
          </div>
  
          {/* Third Condition */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <img src="/limited.png" alt="Limited Seats" className="w-16 h-16" />
            </div>
            <h3 className="font-bold text-black">Limited to Just 10 Seats!</h3>
            <p className="text-black">Secure your spot today before this exclusive opportunity runs out.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ExclusiveOffer;
  