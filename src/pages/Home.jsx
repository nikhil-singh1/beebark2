
import Hero from '../components/Hero';
import Header from '../components/Header';
import HeroSection from '../components/Hero';
import Scrolling from '../components/ScrollingParagraph';
import SpecialOffer from '../components/SpecialOffer';
import WelcomeBanner from '../components/Welcome';

import ReferralSection from '../components/refer';
import ExclusiveOffer from '../components/exclusiveoffer';
import RegisterNowSection from '../components/section1';
import FuturisticTimer from '../components/Welcome';

const Home = () => {
  return (
    <main className="bg-white overflow-auto h-full">
      <Header />
      <HeroSection />
      {/* <Hero /> */}
      <FuturisticTimer />
      <Scrolling />
      <SpecialOffer />
      {/* <Highlights />
      <Model />
      <Features />
      <HowItWorks /> */}
      <ExclusiveOffer />
        <ReferralSection />
        <RegisterNowSection />
    
    
    </main>
  )
}

export default Home;
