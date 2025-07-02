// import React, { useState, useLayoutEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import * as Sentry from "@sentry/react";
// import { Toaster } from "react-hot-toast"; // Import Toaster for global notifications

// // Import your custom components and pages
// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Thankyou from "./components/thankyou";
// import ManifestoPage from "./pages/Manifesto";
// import TermsConditions from "./pages/terms";
// import Contact from "./components/contact";
// import FloatingChatIcon from "./components/FloatingChatIcon";
// import LoadingPage from "./components/Loading"; // Your loading component
// import ProfileSetup from "./pages/ProfileSetup"; // This seems to be your UserProfilePage
// import Login from "./pages/Login";
// import VerifyOtp from "./pages/VerifyEmail.jsx";
// import ForgotPassword from "./pages/ForgotPassword.jsx";
// import LetsTalk from "./components/letstalk";
// import Header from "./components/Header.jsx"; // Your Header component
// import OAuthSuccess from "./pages/OAuthSuccess.jsx"; // OAuth success callback component
// import Feed from "./components/Feed.jsx"; // Your Feed component

// // Import AuthProvider from your context
// import { AuthProvider } from './context/AuthContext.js'; // Ensure correct path and .js extension


// // Component to scroll to top on route change
// const ScrollToTop = () => {
//     const { pathname } = useLocation();

//     useLayoutEffect(() => {
//         window.scrollTo(0, 0);
//     }, [pathname]);

//     return null;
// };

// // Define all your application routes
// const AppRoutes = () => (
//     <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/service" element={<Home />} /> {/* Assuming /service also shows Home */}
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/manifesto" element={<ManifestoPage />} />
//         <Route path="/terms" element={<TermsConditions />} />
//         <Route path="/users/:userId" element={<ProfileSetup />} /> {/* User Profile Setup/Display */}
//         <Route path="/thankyou" element={<Thankyou />} />
//         <Route path="/LetsTalk" element={<LetsTalk />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/oauth-success" element={<OAuthSuccess />} /> {/* Corrected OAuth callback path */}
//         <Route path="/feed" element={<Feed />} />

//         {/* Catch-all for undefined routes (optional, but good for user experience) */}
//         <Route path="*" element={
//             <div className="flex items-center justify-center min-h-screen bg-gray-100 font-poppins">
//                 <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
//                     <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
//                     <Link to="/login" className="text-blue-500 hover:underline">Go to Login</Link>
//                 </div>
//             </div>
//         } />
//     </Routes>
// );

// // Main App component
// const App = () => {
//     const [loading, setLoading] = useState(() => {
//         // This runs only once (on first render)
//         return sessionStorage.getItem("hasLoaded") !== "true";
//     });
//     const location = useLocation();
//     // Decide whether to show the chat icon based on current path
//     const shouldShowChatIcon = !["/LetsTalk", "/contact"].includes(location.pathname);

//     // Effect for handling the initial loading screen
//     useLayoutEffect(() => {
//         if (loading) {
//             const timeout = setTimeout(() => {
//                 setLoading(false);
//                 sessionStorage.setItem("hasLoaded", "true");
//             }, 8000); // 8 seconds loading time
//             return () => clearTimeout(timeout);
//         }
//     }, [loading]);

//     return (
//         <>
//             <ScrollToTop />
//             {loading ? (
//                 <LoadingPage /> // Show loading page initially
//             ) : (
//                 <>
//                     {/* Header should be outside Routes if it's common across pages */}
//                     <Header />
//                     <AppRoutes /> {/* All your application routes */}
//                     {shouldShowChatIcon && <FloatingChatIcon />} {/* Floating chat icon */}
//                 </>
//             )}
//             {/* Toaster for global notifications (toast.success, toast.error, etc.) */}
//             <Toaster position="top-center" reverseOrder={false} />
//         </>
//     );
// };

// // Export the App component wrapped with Sentry.withProfiler for performance monitoring
// export default Sentry.withProfiler(App);


import React, { useState, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Toaster } from "react-hot-toast"; // Import Toaster
import Home from "./pages/Home";
import Register from "./pages/Register";
import Thankyou from "./components/thankyou";
import ManifestoPage from "./pages/Manifesto";
import TermsConditions from "./pages/terms";
import Contact from "./components/contact";
import FloatingChatIcon from "./components/FloatingChatIcon";
import LoadingPage from "./components/Loading";
import ProfileSetup from "./pages/ProfileSetup";
import Login from "./pages/Login";
import { AuthProvider } from './context/AuthContext.jsx';
import VerifyOtp from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import LetsTalk from "./components/letstalk";
import Header from "./components/Header.jsx";
import Feed from "./components/Feed.jsx";
import Contact1 from "./components/contact1.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/service" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/register" element={<Register />} />
    <Route path="/manifesto" element={<ManifestoPage />} />
    <Route path="/terms" element={<TermsConditions />} />
    <Route path="/users/:userId" element={<ProfileSetup />} />
    <Route path="/thankyou" element={<Thankyou />} />
    <Route path="/LetsTalk" element={<LetsTalk />} />
    <Route path="/login" element={<Login />} />
    <Route path="/verify-otp" element={<VerifyOtp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/feed" element={<Feed />} />
                <Route path="/contact1" element={<Contact1 />} />
    {/* <Route path="/users/:userId" element={<VerifyOtp/>}  /> */}
  </Routes>
);

const App = () => {
  const [loading, setLoading] = useState(() => {
    // This runs only once (on first render)
    return sessionStorage.getItem("hasLoaded") !== "true";
  });
  const location = useLocation();
  const shouldShowChatIcon = !["/LetsTalk", "/contact"].includes(location.pathname);

  useLayoutEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <>
      <ScrollToTop />
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <AppRoutes />
          {shouldShowChatIcon && <FloatingChatIcon />}
        </>
      )}
      <Toaster position="top-center" reverseOrder={false} /> {/* Add Toaster here */}
    </>
  );
};

export default Sentry.withProfiler(App);