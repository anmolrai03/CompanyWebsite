import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const logoRef = useRef(null);
  const textRef = useRef([]);

  useEffect(() => {
    // Animate DEV SEP letter by letter
    const animateText = () => {
      gsap.fromTo(
        textRef.current,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    };

    // Infinite Y-axis spin for circle + C
    gsap.to(logoRef.current, {
      rotateY: 360,
      duration: 6,
      repeat: -1,
      ease: "linear",
      transformOrigin: "center center",
    });

    // Replay animation every time footer is visible
    ScrollTrigger.create({
      trigger: ".footer-container",
      start: "top bottom",
      end: "bottom top",
      onEnter: () => animateText(),
      onEnterBack: () => animateText(),
    });
  }, []);

  return (
    <footer className="footer-container relative bg-gradient-to-b from-black via-[#020617] to-black text-white py-28 flex items-center justify-between px-16 overflow-hidden">
      
      {/* Rotating C Logo inside Circle Outline */}
      <div className="flex-shrink-0">
        <div
          ref={logoRef}
          className="w-[8vw] h-[8vw] md:w-[8vw] md:h-[8vw] rounded-full border-4 border-white flex items-center justify-center"
        >
          <span className="text-[6vw] md:text-[4vw] font-serif">C</span>
        </div>
      </div>

      {/* DEV SEP text */}
      <h1 className="flex-1 text-right text-[12vw] md:text-[8vw] font-serif tracking-wide leading-none perspective-[1000px]">
        {"DEV SEP".split("").map((letter, i) => (
          <span
            key={i}
            ref={(el) => (textRef.current[i] = el)}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>

      {/* Bottom Strip */}
      <div className="absolute bottom-6 w-full flex flex-col md:flex-row justify-between items-center px-10 text-sm text-gray-400">
        <p>
          Design by{" "}
          <a href="#" className="hover:underline text-white">
            Ankit Pacharui
          </a>
        </p>
        <p className="pr-20">
          Dev by{" "}
          <a href="#" className="hover:underline text-white">
            Anmol Chauhan
          </a>
        </p>
      </div>
    </footer>
  );
}
