import React, { useState, useRef, useEffect } from "react";


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// COMPONENT IMPORTS
import ButtonElement from "../utils/ButtonElement/ButtonElement";

/// data import
import categories from "../../assets/data/categories";

gsap.registerPlugin(ScrollTrigger);

function SampleWork() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [direction, setDirection] = useState("right");
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const tagsRef = useRef(null);
  const iconsRef = useRef(null);

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);

  // CHEKING IF MOBILE VIEW STARTS HERE
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  // CHECKING IF MOBILE VIEW ENDS HERE

  // IMAGE TRANSITION EFFECT STARTS HERE
  useEffect(() => {
    const wrapper = imageWrapperRef.current;
    if (!wrapper) return;

    // Create new image element
    const newImg = document.createElement("div");
    newImg.className = "absolute inset-0 bg-cover bg-center";
    newImg.style.backgroundImage = `url(${categories[activeCategory].image})`;
    newImg.style.zIndex = "2";

    const xStart = direction === "left" ? "100%" : "-100%";

    // Set initial position
    gsap.set(newImg, { x: xStart });

    // Add to wrapper
    wrapper.appendChild(newImg);

    // Animate in
    gsap.to(newImg, {
      x: "0%",
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        // Remove old images except the current one
        const allImages = wrapper.querySelectorAll("div");
        allImages.forEach((img, index) => {
          if (index < allImages.length - 1) {
            img.remove();
          }
        });
        // Reset z-index
        newImg.style.zIndex = "1";
      },
    });
  }, [activeCategory, direction]);
  // IMAGE TRANSITION EFFECT ENDS HERE

  // SCROLL TRIGGER STARTS HERE
  useEffect(() => {
    const ctx = gsap.context(() => {
      // TITLE ANIMATION FROM BOTTOM STARTS HERE
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100 }, // Start from bottom (positive y value)
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current, // Individual trigger
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
            refreshPriority: -1,
          },
        }
      );
      // TITLE ANIMATION FROM BOTTOM ENDS HERE

      // TAGLINE ANIMATION FROM LEFT LINE BY LINE STARTS HERE
      const taglineElements = taglineRef.current.children || [
        taglineRef.current,
      ];

      gsap.fromTo(
        taglineElements,
        { opacity: 0, x: -100 }, // Start from far left
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.2, // Animate each line with 0.2s delay
          scrollTrigger: {
            trigger: taglineRef.current, // Individual trigger
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
            refreshPriority: -1,
          },
        }
      );
      // TAGLINE ANIMATION FROM LEFT LINE BY LINE ENDS HERE

      // TAGS SECTION ANIMATION FROM BOTTOM STARTS HERE
      const tagElements = tagsRef.current?.children || [];
      gsap.fromTo(
        tagElements,
        { opacity: 0, y: 80 }, // Start from bottom
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
          stagger: 0.1, // Animate each tag with slight delay
          scrollTrigger: {
            trigger: tagsRef.current, // Individual trigger
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
            refreshPriority: -1,
          },
        }
      );
      // TAGS SECTION ANIMATION FROM BOTTOM ENDS HERE

      // ICONS SECTION ANIMATION FROM BOTTOM STARTS HERE
      const iconElements = iconsRef.current?.children || [];
      gsap.fromTo(
        iconElements,
        { opacity: 0, y: 80 }, // Start from bottom
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
          stagger: 0.1, // Animate each icon with slight delay
          scrollTrigger: {
            trigger: iconsRef.current, // Individual trigger
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
            refreshPriority: -1,
          },
        }
      );
      // ICONS SECTION ANIMATION FROM BOTTOM ENDS HERE

      // IMAGE WRAPPER ANIMATION FROM BOTTOM STARTS HERE
      gsap.fromTo(
        imageWrapperRef.current,
        { opacity: 0, y: 100, scale: 0.95 }, // Start from bottom with slight scale
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapperRef.current, // Individual trigger
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
            refreshPriority: -1,
          },
        }
      );
      // IMAGE WRAPPER ANIMATION FROM BOTTOM ENDS HERE

      // Optional: Refresh ScrollTrigger to ensure proper functioning
      ScrollTrigger.refresh();
    }, sectionRef); // Add sectionRef as dependency

    return () => ctx.revert(); // Cleanup
  }, []);
  // SCROLL TRIGGER ENDS HERE

  const handleChange = (index) => {
    if (index === activeCategory) return;

    if (index > activeCategory) setDirection("right");
    else if (index < activeCategory) setDirection("left");
    setActiveCategory(index);
  };

  const handleHover = (index) => {
    if (!isMobile) {
      handleChange(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen font-kite w-full bg-black text-white flex flex-col items-center justify-start py-20 px-5 lg:px-12 rounded-sm"
    >
      {/* Header Title - Centered with more space below */}
      <div className="text-center mb-24 lg:mb-32">
        <h2
          ref={titleRef}
          className="text-2xl lg:text-7xl font-light tracking-wide mb-8"
        >
          Our Work
        </h2>
      </div>

      {/* Content Layout */}
      <div className="content-wrapper flex flex-col lg:flex-row w-full items-start justify-between gap-16 lg:gap-20">
        {/* Left side: Large Tagline + Tags + Icons */}
        <div className="lg:w-2/5 flex flex-col gap-12">
          {/* TAGLINE SECTION STARTS HERE */}
          <div ref={taglineRef}>
            <h3 className="text-4xl lg:text-6xl font-light text-white/90 leading-tight">
              <div>Creativity &</div>
              <div>Innovation</div>
            </h3>
          </div>
          {/* TAGLINE SECTION ENDS HERE */}

          {/* TAGS SECTION STARTS HERE*/}
          <div ref={tagsRef} className="flex flex-col gap-4">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className={`cursor-pointer text-xl lg:text-2xl transition-all duration-300 ${
                  activeCategory === idx
                    ? "text-white font-medium transform translate-x-2"
                    : "text-white/50 hover:text-white/80"
                }`}
                onClick={() => handleChange(idx)}
                onMouseEnter={() => handleHover(idx)}
              >
                {cat.name}
              </span>
            ))}
          </div>
          {/* TAGS SECTIONS ENDS HERE */}

          {/* ICONS SECTION STARTS HERE */}
          <div ref={iconsRef} className="flex flex-row gap-4 flex-wrap">
            {categories.map((cat, idx) => (
              <div key={idx} onMouseEnter={() => handleHover(idx)}>
                <ButtonElement
                  icon={cat.icon}
                  isActive={activeCategory === idx}
                  onClick={() => handleChange(idx)}
                />
              </div>
            ))}
          </div>
          {/* ICONS SECTION ENDS HERE */}
        </div>

        {/* Right side: Image */}
        <div
          ref={imageWrapperRef}
          className="relative lg:w-3/5 w-full h-[50vh] lg:h-[70vh] rounded-md overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Initial image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${categories[0].image})`,
              zIndex: 1,
            }}
          />
        </div>

      </div>
    </section>
  );
}

export default SampleWork;
