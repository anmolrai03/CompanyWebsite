// Home.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// COMPONENTS IMPORT
import Hero from "../../components/Hero/Hero";
import AboutText from "../../components/About/AboutText";
import Services from "../../components/Services/Services";
import FeatureMedia from "../../components/FeatureMedia/FeatureMedia";
import SampleWork from "../../components/SampleWork/SampleWork";
import SocialHandle from "../../components/SocialHandle/SocialHandle";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

    // Animate hero in (header will animate inside Layout)
    tl.fromTo(
      heroRef.current,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1 }
    );
  }, []);

  return (
    <div className="w-full h-max overflow-hidden">
      <Header />
      <section className="w-full h-max">
        <Hero />
      </section>

      <AboutText />
      <Services />
      <FeatureMedia />
      <SampleWork />
      <SocialHandle />
      
    </div>
  );
}

export default Home;