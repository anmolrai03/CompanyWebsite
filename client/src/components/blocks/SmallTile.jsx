// import React from "react";
// export default function SmallTile({ children }) { return (<div className="w-20 h-20 rounded-md border border-white/10 flex items-center justify-center bg-black/40">{children}</div>); }


import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function SmallTile({ name, icon: Icon }) {
  const tileRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.set(bgRef.current, { scaleX: 0, transformOrigin: "left center" });

    const tile = tileRef.current;

    const onEnter = () => {
      gsap.to(bgRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(bgRef.current, {
        scaleX: 0,
        duration: 0.6,
        ease: "power2.in",
      });
    };

    tile.addEventListener("mouseenter", onEnter);
    tile.addEventListener("mouseleave", onLeave);

    return () => {
      tile.removeEventListener("mouseenter", onEnter);
      tile.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={tileRef}
      className="relative inline-flex items-center justify-center px-3 py-1 rounded-sm border border-white/10 cursor-pointer overflow-hidden bg-gray-300/10"
    >
      {/* Animated background */}
      <span
        ref={bgRef}
        className="absolute inset-0 bg-gray-300/20 rounded-sm"
      ></span>

      {/* Content (either text or icon) */}
      <span className="relative text-white font-medium text-sm flex items-center justify-center text-primary ">
        {Icon ? <Icon size={20} /> : name}
      </span>
    </div>
  );
}
