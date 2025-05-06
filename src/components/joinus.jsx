import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const JoinUs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [agree, setAgree] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);

    const businessData = {
      firstname,
      lastname,
      name,
      email,
      password,
      phone,
      countryCode,
      category,
      otherCategory: category === "others" ? otherCategory : "",
    };

    try {
      const response = await fetch("https://beebark-backend-2.vercel.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      toast.success("Registration successful!");
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6 sm:px-8 font-poppins mt-24">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 sm:p-10 flex flex-col sm:flex-row space-y-6 sm:space-y-0">
        <div className="w-full sm:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-herocolor">
            Join TheBeeBark <span className="text-yellow-500">PRO</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Unlock TheBeeBark <span className="text-yellow-500">PRO!</span> Complete your profile to start using it today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>

            <div className="flex items-center space-x-4">
              <div className="w-2/3">
                <label className="block text-sm font-medium text-gray-600">First Name</label>
                <input
                type="text"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                required
              />
              </div>
              <div className="w-2/3">
                <label className="block text-sm font-medium text-gray-600">Last Name</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                  required
                />
              </div>
            </div>
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
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

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Business Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Professional Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
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

            {/* Other Category */}
            {category === "others" && (
              <div>
                <label className="block text-sm font-medium text-gray-600">Please specify</label>
                <input
                  type="text"
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                  required
                />
              </div>
            )}

            {/* Country Code and Phone */}
            <div className="flex items-center space-x-4">
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-600">Code</label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="mt-2 w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                  required
                >
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
              <div className="w-2/3">
                <label className="block text-sm font-medium text-gray-600">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-600"
                  required
                />
              </div>
            </div>

            {/* Agree to Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 mr-2"
              />
              <label className="text-sm text-gray-600">
                I agree to the <span className="text-yellow-500 font-medium">Terms and Conditions</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white transition ${
                loading
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
