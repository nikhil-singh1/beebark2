import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import * as Sentry from "@sentry/react";

import Home from "./pages/Home";
import AdminLogin from "./components/AdminLogin";
import Register from "./pages/Register";
import Thankyou from "./components/thankyou";

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
        <Route path="/register" element={<Register />} />
        <Route path="/thankyou" element={<Thankyou />} />
      </Routes>
      </>
  );
};

export default Sentry.withProfiler(App);
