import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

function AboutText() {
  const ref = useRef();
  const [isInView, setIsInView] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY.current) {
        setScrollDirection("down");
      } else if (currentScrollY < prevScrollY.current) {
        setScrollDirection("up");
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const q = gsap.utils.selector(ref);
    const direction = scrollDirection === "down" ? 1 : -1;

    const ctx = gsap.context(() => {
      // Clear any existing animations
      gsap.killTweensOf([q(".line"), q(".bg-animate")]);
      
      // Set initial states based on scroll direction
      gsap.set(q(".line"), {
        opacity: 0,
        y: direction === 1 ? 40 : -40,
        filter: "blur(10px)",
        scale: 1.1
      });

      // Animate background
      gsap.fromTo(q(".bg-animate"), 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1.2, 
          ease: "power2.inOut" 
        }
      );
      
      // Animate text lines with direction-aware animation
      gsap.to(q(".line"), 
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)", 
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: {
            each: 0.4,
            from: direction === 1 ? "start" : "end"
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [isInView, scrollDirection]);

  return (
    <section
      ref={ref}
      className="relative h-[65vh] min-h-[500px] flex items-center justify-center px-4 sm:px-6 overflow-hidden bg-black"
    >
      <div className="bg-animate absolute inset-0 bg-black" />
      
      <h1 className="hero-title z-10 text-center text-3xl md:text-5xl lg:text-6xl max-w-5xl leading-tight tracking-tight space-y-2 font-extralight font-kite">
        <span className="line block">
          Welcome to the Dev Sphere official
        </span>
        <span className="line block">
          The website for your one-on solution 
        </span>
        <span className="line block">
          to your tech needs
        </span>
      </h1>
    </section>
  );
}

export default AboutText;