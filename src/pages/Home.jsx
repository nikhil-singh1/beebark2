import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Header from '../components/Header';
import HeroSection from '../components/Hero';
import Service from '../components/Service';
import SpecialOffer from '../components/SpecialOffer';
import WelcomeBanner from '../components/Welcome';

import ReferralSection from '../components/refer';
import ExclusiveOffer from '../components/exclusiveoffer';
import RegisterNowSection from '../components/section1';
import FuturisticTimer from '../components/Welcome';
import AboutUs from '../components/aboutus';
import Hero1 from '../components/DreamHero';
import AutoScrollPortfolio from '../components/Portfolio_auto';
import Footer from '../components/Footer';
import Animation from '../components/Animation';

const Home = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/service') {
      const serviceSection = document.getElementById('services');
      if (serviceSection) {
        serviceSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname]);

  return (
    <main className="bg-white overflow-auto h-full">
        <Header/>
        <Animation />
      {/* <Hero /> */}
      <Hero1 />
      <AboutUs />
      <Service />
       <AutoScrollPortfolio/>
      
      {/* <Highlights />
      <Model />
      <Features />
      <HowItWorks /> */}
     
        <ReferralSection />
        <Footer />
        
    
    
    </main>
  )
}

export default Home;
