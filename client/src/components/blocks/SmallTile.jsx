
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

function SmallTile({ name, icon: Icon, onClick, isActive = false }) {
  const tileRef = useRef(null);
  const bgRef = useRef(null);
  const animation = useRef(null);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animation.current) {
        animation.current.kill();
      }
    };
  }, []);

  const onEnter = () => {
    if (animation.current) {
      animation.current.kill();
    }
    
    animation.current = gsap.to(bgRef.current, {
      scaleX: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true
    });
  };

  const onLeave = () => {
    if (animation.current) {
      animation.current.kill();
    }
    
    animation.current = gsap.to(bgRef.current, {
      scaleX: 0,
      duration: 0.5,
      ease: "power2.in",
      overwrite: true
    });
  };

  useEffect(() => {
    const tile = tileRef.current;
    
    if (bgRef.current) {
      gsap.set(bgRef.current, { scaleX: 0, transformOrigin: "left center" });
    }

    tile.addEventListener("mouseenter", onEnter, { passive: true });
    tile.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      tile.removeEventListener("mouseenter", onEnter);
      tile.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={tileRef}
      className="relative inline-flex items-center justify-center px-3 py-2 rounded-sm cursor-pointer overflow-hidden"
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        background: isActive ? "rgba(120, 120, 120, 0.2)" : "rgba(120, 120, 120, 0.08)"
      }}
      role="button"
      tabIndex={0}
      aria-label={name}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Animated background */}
      <span
        ref={bgRef}
        className="absolute inset-0 rounded-sm"
        style={{
          background: "linear-gradient(90deg, rgba(120, 120, 120, 0.4) 0%, rgba(100, 100, 100, 0.3) 100%)"
        }}
        aria-hidden="true"
      ></span>

      {/* Content */}
      <span className="relative text-white font-medium text-sm md:text-base flex items-center justify-center gap-1">
        {Icon ? <Icon size={16} aria-hidden="true" /> : null}
        {name}
      </span>
    </div>
  );
}

export default SmallTile;