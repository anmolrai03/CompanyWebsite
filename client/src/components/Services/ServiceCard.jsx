/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function ServiceCard({ service, index }) {
  const cardRef = useRef();
  const imageRef = useRef();
  const imageContainerRef = useRef();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const image = imageRef.current;
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

    const animateImageChange = () => {
      gsap.fromTo(
        image,
        {
          y: 40,
          opacity: 0,
          scale: isMobile ? 1 : 1.1,
        },
        {
          y: 0,
          opacity: 1,
          scale: isMobile ? 1 : 1.05,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            if (isHovered && !isMobile) {
              gsap.to(image, {
                scale: 1.05,
                duration: 0.1,
              });
            }
          },
        }
      );
    };

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
            setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
            animateImageChange();
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
            setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
            animateImageChange();
            start = now;
          }
          setProgress(Math.min(percent, 100));
          animationFrameRef.current = requestAnimationFrame(update);
        };

        animationFrameRef.current = requestAnimationFrame(update);
      }
    };

    if (isMobile || isHovered) {
      animateImageChange();
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
  }, [isHovered, service.images.length, currentImageIndex, isMobile]);

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
      navigate(service.link);
    }
  };

  return (
    <article
      ref={cardRef}
      className="bg-white rounded-lg overflow-hidden relative border shadow-sm cursor-pointer group mb-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...(service.href ? { href: service.href } : {})}
    >
      {(isMobile || isHovered) && (
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

      <div className="absolute top-3 left-3 flex gap-2 z-20">
        {service.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-white text-black text-xs font-medium px-2 py-1 rounded-md shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        ref={imageContainerRef}
        className="aspect-[4/5] relative overflow-hidden"
      >
        <div
          ref={imageRef}
          className="w-full h-full bg-gray-100 bg-cover bg-center"
          style={{
            backgroundImage: `url('${service.images[currentImageIndex]}')`,
          }}
        />
      </div>

      <div 
        className={`
          absolute bottom-0 left-0 right-0 py-6 ${isMobile ? "bg-black px-2" : " bg-white/95  transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-4"} 
        `}>
        <h3 className={`font-mono text-sm tracking-wide ${isMobile ? "text-white": "text-gray-800"} text-center`}>
          {service.name}
        </h3>
      </div>

      {/* {isMobile ? (
        <div className="absolute bottom-0 left-0 right-0 bg-black p-4 py-6">
          <h3 className="font-mono text-sm tracking-wide text-white text-center">
            {service.name}
          </h3>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-4 py-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-mono text-sm tracking-wide text-gray-800 text-center">
            {service.name}
          </h3>
        </div>
      )} */}
    </article>
  );
}

export default ServiceCard;
