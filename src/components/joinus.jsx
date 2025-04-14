import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Phone, Briefcase, MapPin, FileText, Eye, EyeOff } from "lucide-react";

const JoinUs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [agree, setAgree] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }
  
    const businessData = {
      businessName,
      email,
      password,
      phone,
      countryCode,
      category,
      otherCategory: category === "others" ? otherCategory : "", // Only send if "Others" is selected
    };
  
    try {
      const response = await fetch("https://beebark-backend1.vercel.app/api/business/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      alert("Registration Successful! You can now log in.");
      navigate("/thankyou"); // Redirecting after successful registration
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6 sm:px-8 font-poppins mt-24">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 sm:p-10 flex flex-col sm:flex-row space-y-6 sm:space-y-0">
        {/* Left side: Form */}
        <div className="w-full sm:w-1/2 space-y-6">
          <span className="text-3xl font-bold text-herocolor text-left">
            Join TheBeeBark
          </span>
          <span className="text-3xl font-bold text-yellow-500"> PRO</span>
          <p className="text-left text-gray-600 text-lg">
            Unlock TheBeeBark <span className="text-yellow-500"> PRO! </span>Complete your profile to start using TheBeeBark<span className="text-yellow-500"> PRO! </span>today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-5 text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-600">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                required
              />
            </div>

            {/* Professional Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                Professional Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                required
              >
                <option value="">Select Category</option>
                <option value="architect">Architect</option>
                <option value="construction">Construction</option>
                <option value="real_estate">Real Estate</option>
                <option value="designer">Designer</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Additional input for "Others" category */}
            {category === "others" && (
              <div>
                <label htmlFor="otherCategory" className="block text-sm font-medium text-gray-600">
                  Please specify
                </label>
                <input
                  type="text"
                  id="otherCategory"
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                  required
                />
              </div>
            )}

            {/* Business Phone Number with Country Code */}
            <div className="flex items-center space-x-4">
              <div className="w-1/4">
                <label htmlFor="countryCode" className="block text-sm font-medium text-gray-600">
                  Country Code
                </label>
                <select
                  id="countryCode"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                  required
                >
                  {/* Country options */}
                  <option value="+91">+91 (India)</option>
                <option value="+1">+1 (US, Canada, etc.)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+33">+33 (France)</option>
                <option value="+49">+49 (Germany)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+55">+55 (Brazil)</option>
                <option value="+86">+86 (China)</option>
                <option value="+27">+27 (South Africa)</option>
                <option value="+34">+34 (Spain)</option>
                <option value="+39">+39 (Italy)</option>
                <option value="+7">+7 (Russia, Kazakhstan)</option>
                <option value="+52">+52 (Mexico)</option>
                <option value="+47">+47 (Norway)</option>
                <option value="+41">+41 (Switzerland)</option>
                <option value="+47">+47 (Norway)</option>
                <option value="+46">+46 (Sweden)</option>
                <option value="+55">+55 (Brazil)</option>
                <option value="+971">+971 (UAE)</option>
                <option value="+92">+92 (Pakistan)</option>
                <option value="+20">+20 (Egypt)</option>
                <option value="+62">+62 (Indonesia)</option>
                <option value="+63">+63 (Philippines)</option>
                <option value="+45">+45 (Denmark)</option>
                <option value="+20">+20 (Egypt)</option>
                <option value="+28">+28 (Algeria)</option>
                <option value="+66">+66 (Thailand)</option>
                <option value="+92">+92 (Pakistan)</option>
                <option value="+90">+90 (Turkey)</option>
                <option value="+54">+54 (Argentina)</option>
                <option value="+64">+64 (New Zealand)</option>
                <option value="+48">+48 (Poland)</option>
                <option value="+53">+53 (Cuba)</option>
                <option value="+356">+356 (Malta)</option>
                <option value="+961">+961 (Lebanon)</option>
                <option value="+973">+973 (Bahrain)</option>
                <option value="+962">+962 (Jordan)</option>
                <option value="+357">+357 (Cyprus)</option>
                <option value="+421">+421 (Slovakia)</option>
                <option value="+380">+380 (Ukraine)</option>
                <option value="+383">+383 (Kosovo)</option>
                <option value="+385">+385 (Croatia)</option>
                <option value="+354">+354 (Iceland)</option>
                <option value="+32">+32 (Belgium)</option>
                <option value="+31">+31 (Netherlands)</option>
                <option value="+31">+31 (Luxembourg)</option>
                <option value="+420">+420 (Czech Republic)</option>
                <option value="+41">+41 (Switzerland)</option>
                <option value="+961">+961 (Lebanon)</option>
                <option value="+974">+974 (Qatar)</option>
                 
                </select>
              </div>
              <div className="w-3/4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                  Business Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                  required
                />
              </div>
            </div>

            {/* Agree Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="h-4 w-4 text-yellow-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="agree" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="text-yellow-500 hover:text-yellow-400">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-yellow-500 hover:text-yellow-400">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-herocolor"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right side: Benefits with Icons */}
        <div className="w-full sm:w-1/2 space-y-8 pt-8 sm:pt-0 sm:pl-8">
          <div className="space-y-6">
            {[
              { Icon: CheckCircle, text: "Your Pro directory profile is how potential clients find you on TheBeeBark." },
              { Icon: Briefcase, text: "Include your business name, and it will appear in TheBeeBark PRO directory search results." },
              { Icon: MapPin, text: "Choose the business type that best fits your business to target the right clients." },
              { Icon: Phone, text: "Provide your phone number for clients to contact you directly from your Pro directory profile." },
              { Icon: FileText, text: "Complete your profile to start showcasing your services and get more clients." },
            ].map(({ Icon, text }, index) => (
              <div key={index} className="flex items-start space-x-6">
                <Icon className="h-7 w-7 text-yellow-500" />
                <p className="text-base text-herocolor">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
