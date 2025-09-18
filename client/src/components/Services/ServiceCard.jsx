/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import ButtonElement from "../utils/ButtonElement/ButtonElement";

function ServiceCard({ service, index }) {
  const cardRef = useRef();
  const imageWrapperRef = useRef();
  const imageContainerRef = useRef();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState("right");
  const animationFrameRef = useRef(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection Observer for entrance animations
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // Set up the ref for intersection observer
  useEffect(() => {
    inViewRef(cardRef.current);
  }, [inViewRef]);

  // Entrance animation with line-by-line effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (inView) {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.2,
        }
      );
    } else {
      gsap.to(card, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [inView, index]);

  // Image transition effect
  useEffect(() => {
    const wrapper = imageWrapperRef.current;
    if (!wrapper || service.images.length <= 1) return;

    // Create new image element
    const newImg = document.createElement("div");
    newImg.className = "absolute inset-0 bg-cover bg-center";
    newImg.style.backgroundImage = `url(${service.images[currentImageIndex]})`;
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
  }, [currentImageIndex, direction, service.images]);

  useEffect(() => {
    const imageContainer = imageContainerRef.current;

    if (!isMobile) {
      if (isHovered) {
        gsap.to(imageContainer, {
          scale: 1.05,
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        gsap.to(imageContainer, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    }

    const startCycle = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (isMobile || !isHovered) {
        let currentProgress = 0;

        intervalRef.current = setInterval(() => {
          currentProgress += 1;

          if (currentProgress >= 100) {
            setDirection("right");
            setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
            currentProgress = 0;
          }

          setProgress(currentProgress);
        }, 20);
      } else if (isHovered && !isMobile) {
        let start = performance.now();

        const update = (now) => {
          if (!isHovered) return;

          const elapsed = now - start;
          const percent = (elapsed / 2000) * 100;

          if (percent >= 100) {
            setDirection("right");
            setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
            start = now;
          }
          setProgress(Math.min(percent, 100));
          animationFrameRef.current = requestAnimationFrame(update);
        };

        animationFrameRef.current = requestAnimationFrame(update);
      }
    };

    if (isMobile || isHovered) {
      startCycle();
    } else {
      setProgress(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, service.images.length, isMobile]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    if (service.link) {
      // If it's an external link
      if (service.link.startsWith('http')) {
        window.open(service.link, '_blank');
      } else {
        // Internal route navigation
        navigate(service.link);
      }
    } else if (service.href) {
      // Fallback to href if link is not provided
      if (service.href.startsWith('http')) {
        window.open(service.href, '_blank');
      } else {
        navigate(service.href);
      }
    }
  };

  return (
    <article
      ref={cardRef}
      className="bg-white rounded-lg font-kite overflow-hidden relative border shadow-sm cursor-pointer group mb-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {(isMobile || isHovered) && service.images.length > 1 && (
        <div className="absolute top-4 w-full h-[3px] flex z-20 px-4 gap-x-3">
          {service.images.map((_, index) => (
            <div
              key={index}
              className="h-full bg-gray-400 flex-1 mr-px last:mr-0 relative overflow-hidden rounded-full"
            >
              {index === currentImageIndex && (isMobile || isHovered) && (
                <div
                  className="h-full bg-white absolute top-0 left-0 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="absolute top-7 left-3 flex gap-2 z-20">
        {service.tags?.map((tag, idx) => (
          <ButtonElement key={idx} name={tag}/>
        ))}
      </div>

      <div
        ref={imageContainerRef}
        className="aspect-[4/5] relative overflow-hidden"
      >
        <div
          ref={imageWrapperRef}
          className="w-full h-full bg-gray-100 bg-cover bg-center"
          style={{
            backgroundImage: `url('${service.images[0]}')`,
          }}
        />
      </div>

      {/* HOVER SECTION STARTS HERE */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0 py-6 ${isMobile ? "bg-black px-2" : " bg-gray-300 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-4"} 
        `}>
        <h3 className={`font-kite text-base md:text-lg font-bold tracking-wide ${isMobile ? "text-white": "text-gray-800"} text-center`}>
          {service.name}
        </h3>
        {service.description && (
          <p className={`text-sm mt-2 text-center ${isMobile ? "text-gray-300" : "text-gray-600"}`}>
            {service.description}
          </p>
        )}
      </div>
      {/* HOVER SECTION ENDS HERE */}

    </article>
  );
}

export default ServiceCard;