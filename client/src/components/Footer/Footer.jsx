// Footer.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const logoRef = useRef(null);
  const textRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set(footerRef.current, { x: "-100%", opacity: 0 });
    gsap.set(textRef.current, { y: 120, opacity: 0, rotateX: -90 });

    const animateText = () => {
      gsap.to(textRef.current, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.25,
        ease: "power3.out",
        delay: 0.5,
      });
    };

    const animateFooterIn = () => {
      gsap.to(footerRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      });
    };

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

    // ScrollTrigger to animate in when visible
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 90%",
      onEnter: () => {
        animateFooterIn();
        animateText();
        startLogoAnimation();
      },
      onEnterBack: () => {
        animateFooterIn();
        animateText();
        startLogoAnimation();
      },
      markers: false,
    });

    // ✅ fallback if footer already in view (e.g. short pages)
    if (ScrollTrigger.isInViewport(footerRef.current)) {
      animateFooterIn();
      animateText();
      startLogoAnimation();
    }

    return () => {
      gsap.killTweensOf([textRef.current, logoRef.current, footerRef.current]);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el, index) => {
    if (el) textRef.current[index] = el;
  };

  return (
    <footer
      ref={footerRef}
      className="footer-container font-kite relative w-full h-max py-32 bg-gradient-to-b from-black via-[#020617] to-black text-white flex flex-col items-center justify-between px-6 md:px-16 overflow-hidden border-t border-gray-400/30"
    >
      {/* DEV SEP text */}
      <div className="relative flex items-center justify-center flex-1 w-full">
        <h1 className="relative text-center text-[16vw] md:text-[12vw] font-serif tracking-wide leading-none perspective-[1000px] w-full">
          {"UDYOG".split("").map((letter, i) => (
            <span
              key={i}
              ref={(el) => addToRefs(el, i)}
              className="inline-block relative"
            >
              {letter === " " ? "\u00A0" : letter}
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

      {/* Bottom strip */}
      {/* <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-6 text-sm md:text-base text-gray-400 gap-2">
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
      </div> */}
    </footer>
  );
}
