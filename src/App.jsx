import { useState, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as Sentry from "@sentry/react";

import Home from "./pages/Home";
import AdminLogin from "./components/AdminLogin";
import Register from "./pages/Register";
import Thankyou from "./components/thankyou";
import ManifestoPage from "./pages/Manifesto";
import TermsConditions from "./pages/terms";
import LetsTalk from "./components/letstalk";
import Contact from "./components/contact";
import FloatingChatIcon from "./components/FloatingChatIcon";
import LoadingPage from "./components/Loading";
import ProfileSetup from "./pages/ProfileSetup";
import HoneycombReveal from "./components/section2";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./pages/Login";
import { AuthProvider } from './context/AuthContext.jsx';
import VerifyOtp from "./pages/VerifyEmail.jsx";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRoutes = () => (
<AuthProvider>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin" element={<AdminLogin />} />
    <Route path="/LetsTalk" element={<LetsTalk />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/register" element={<Register />} />
    <Route path="/manifesto" element={<ManifestoPage />} />
    <Route path="/terms" element={<TermsConditions />} />
    <Route path="/users/:userId" element={<ProfileSetup />} />
    <Route path="/thankyou" element={<Thankyou />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/verify-otp"  element={<VerifyOtp/>} />
    {/* <Route path="/users/:userId" element={<VerifyOtp/>}  /> */}

  </Routes>
  </AuthProvider>
);

const App = () => {
  const [loading, setLoading] = useState(() => {
    // This runs only once (on first render)
    return sessionStorage.getItem("hasLoaded") !== "true";
  });

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
      {loading ? <LoadingPage /> : <AppRoutes />}
      <FloatingChatIcon />
    </>
  );
};

export default Sentry.withProfiler(App);
