import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const logoRef = useRef(null);
  const textRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set(footerRef.current, {
      x: '-100%',
      opacity: 0
    });

    gsap.set(textRef.current, {
      y: 120,
      opacity: 0,
      rotateX: -90
    });

    // Animate DEV SEP letter by letter
    const animateText = () => {
      // Reset to initial state first
      gsap.set(textRef.current, {
        y: 120,
        opacity: 0,
        rotateX: -90
      });
      
      // Animate the text in with a slight delay to ensure footer slide is visible
      gsap.to(textRef.current, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.25,
        ease: "power3.out",
        delay: 0.5 // Increased delay after footer slides in
      });
    };

    // Animate footer sliding in from left
    const animateFooterIn = () => {
      gsap.to(footerRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
      });
    };

    // Reset footer position
    const resetFooter = () => {
      gsap.to(footerRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 1.2,
        ease: "power3.in"
      });
      
      gsap.to(textRef.current, {
        y: 120,
        opacity: 0,
        rotateX: -90,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.in"
      });
    };

    // Infinite Y-axis spin for circle + C
    const startLogoAnimation = () => {
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          rotateY: 360,
          duration: 6,
          repeat: -1,
          ease: "linear",
          transformOrigin: "center center",
        });
      }
    };

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 90%",
      end: "bottom top",
      onEnter: () => {
        console.log("Footer entered");
        animateFooterIn();
        animateText();
        startLogoAnimation();
      },
      onEnterBack: () => {
        console.log("Footer entered back");
        animateFooterIn();
        animateText();
        startLogoAnimation();
      },
      onLeave: () => {
        console.log("Footer left");
        resetFooter();
      },
      onLeaveBack: () => {
        console.log("Footer left back");
        resetFooter();
      },
      toggleActions: "play none none reverse",
      refreshPriority: -90,
      markers: false,
    });

    // Force ScrollTrigger to refresh after layout stabilizes
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Clean up on component unmount
    return () => {
      clearTimeout(refreshTimeout);
      if (scrollTrigger) scrollTrigger.kill();
      gsap.killTweensOf([textRef.current, logoRef.current, footerRef.current]);
    };
  }, []); // Empty dependency array to run only once

  // Simplified ref management
  const addToRefs = (el, index) => {
    if (el) {
      textRef.current[index] = el;
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="footer-container font-kite relative w-full h-max py-32 bg-gradient-to-b from-black via-[#020617] to-black text-white flex flex-col items-center justify-between px-6 md:px-16 overflow-hidden border-t border-gray-400/30"
    >
      
      {/* DEV SEP container */}
      <div className="relative flex items-center justify-center flex-1 w-full">
        
        {/* DEV SEP text */}
        <h1 className="relative text-center text-[16vw] md:text-[12vw] font-serif tracking-wide leading-none perspective-[1000px] w-full">
          {"DEV SEP".split("").map((letter, i) => (
            <span
              key={i}
              ref={el => addToRefs(el, i)}
              className="inline-block relative"
            >
              {letter === " " ? "\u00A0" : letter}

              {/* Superscript rotating C above the D */}
              {i === 0 && (
                <div
                  ref={logoRef}
                  className="absolute -top-[55%] -left-[55%] w-[8vw] h-[8vw] md:w-[5vw] md:h-[5vw] rounded-full border-4 border-white flex items-center justify-center"
                >
                  <span className="text-[5vw] md:text-[3vw] font-serif">C</span>
                </div>
              )}
            </span>
          ))}
        </h1>
      </div>

      {/* BOTTOM STRIP */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-6 text-sm md:text-base text-gray-400 gap-2">
        <p>
          Design by{" "}
          <a href="#" className="hover:underline text-white">
            Ankit Pachauri
          </a>
        </p>
        <p>
          Dev by{" "}
          <a href="#" className="hover:underline text-white">
            Anmol Chauhan
          </a>
        </p>
      </div>
    </footer>
  );
}