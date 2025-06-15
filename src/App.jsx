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
import OAuthSuccess from "./pages/OAuthSuccess.jsx";

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
    <Route path="/oauth-success" element={<OAuthSuccess/>} />

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