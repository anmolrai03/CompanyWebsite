// Home.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Hero from "../../components/Hero/Hero";
import MiddleSection from "../../components/MiddleSection/MiddleSection";

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
      <section ref={heroRef} className="w-full h-max">
        <Hero />
      </section>

      <MiddleSection />
    </div>
  );
}

export default Home;