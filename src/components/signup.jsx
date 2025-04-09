export default function Signup() {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="flex w-full rounded-lg bg-white shadow-lg overflow-hidden">
          {/* Left Side (Image & Text) */}
          <div className="w-1/2 relative hidden lg:block">
            <img
              src="/building.jpeg" 
              alt="Buildings"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-8 text-white">
              <h2 className="text-2xl font-bold">Create your Account</h2>
              <p className="mt-2 text-sm">Lorem ipsum king dolor with awoeinto skeets.</p>
            </div>
          </div>
  
          {/* Right Side (Form) */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign Up</h2>
            <form className="mt-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="mt-4 flex items-center">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Accept Terms & Conditions
                </label>
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-herocolor text-white py-2 rounded-lg "
              >
                JOIN US
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  