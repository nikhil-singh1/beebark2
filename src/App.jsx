import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
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

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
      <>
      <ScrollToTop /> {/* Ensures scrolling to top on route change */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/LetsTalk" element={<LetsTalk />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="/terms" element={<TermsConditions />} />
      
        <Route path="/thankyou" element={<Thankyou />} />
      </Routes>
      <FloatingChatIcon />
      </>
  );
};

export default Sentry.withProfiler(App);
