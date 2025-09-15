// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";

// export default function MiddlePage() {
//   const ref = useRef();

//   useEffect(() => {
//     const q = gsap.utils.selector(ref);
//     const ctx = gsap.context(() => {
//       gsap.from(q(".hero-title"), {
//         y: 30,
//         opacity: 0,
//         duration: 1,
//         ease: "power3.out",
//       });
//     }, ref);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={ref}
//       className="relative h-[65vh] flex items-center justify-center"
//     >
//       <div className="absolute inset-0 bg-black" />
//       <h1 className="hero-title z-10 text-center text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-tight font-light tracking-tight">
//         Mode durable exclusive, conçue et personnalisée en{" "}
//         <span className="inline-block">🇫🇷</span> France pour ceux qui
//         privilégient la qualité et l'authenticité plutôt que la production de
//         masse.
//       </h1>
//       <div className="absolute right-12 top-1/2 -translate-y-1/2 space-y-4">
//         <Dot />
//         <Dot active />
//         <Dot />
//       </div>
//     </section>
//   );
// }

// function Dot({ active }) {
//   return (
//     <div
//       className={`w-8 h-8 rounded-full border ${
//         active ? "bg-white/90" : "bg-black/30 border-white/40"
//       } flex items-center justify-center`}
//     />
//   );
// }


import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function MiddlePage() {
  const ref = useRef();

  useEffect(() => {
    const q = gsap.utils.selector(ref);

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(q(".line"), { opacity: 0, y: 30, filter: "blur(6px)" });

      // Animate lines one by one
      gsap.to(q(".line"), {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.3, // delay between lines
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[65vh] flex items-center justify-center px-6"
    >
      <div className="absolute inset-0 bg-black" />

      <h1 className="hero-title z-10 text-center text-3xl md:text-5xl lg:text-6xl max-w-5xl leading-tight font-light tracking-tight space-y-2">
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

      <div className="absolute right-12 top-1/2 -translate-y-1/2 space-y-4">
        <Dot />
        <Dot active />
        <Dot />
      </div>
    </section>
  );
}

function Dot({ active }) {
  return (
    <div
      className={`w-8 h-8 rounded-full border ${
        active ? "bg-white/90" : "bg-black/30 border-white/40"
      } flex items-center justify-center`}
    />
  );
}
