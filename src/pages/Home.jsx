
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import Model from '../components/Model';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Header from '../components/Header';
import Hero1 from '../components/Hero1';
import Hero2 from '../components/Hero2';
import Scrolling from '../components/ScrollingParagraph';
import SpecialOffer from '../components/SpecialOffer';
import WelcomeBanner from '../components/Welcome';
import ScrollingHighlight from '../components/Welcome';
import JoinUs from '../components/joinus';
import ReferralSection from '../components/refer';
import ExclusiveOffer from '../components/exclusiveoffer';

const Home = () => {
  return (
    <main className="bg-white">
      <Header />
      <Hero1 />
      {/* <Hero /> */}
      <ScrollingHighlight />
      <Scrolling />
      <SpecialOffer />
      {/* <Highlights />
      <Model />
      <Features />
      <HowItWorks /> */}
      <ExclusiveOffer />
        <ReferralSection />
    
    
    </main>
  )
}

export default Home;
