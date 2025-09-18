// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// function FeatureMedia() {
//   const sectionRefs = useRef([]);
//   const mediaRefs = useRef([]);

//   // Helper to add refs safely
//   const addToRefs = (el, refArray) => {
//     if (el && !refArray.current.includes(el)) {
//       refArray.current.push(el);
//     }
//   };

//   useEffect(() => {
//     // Detect if device is mobile based on window width
//     const isMobile = window.innerWidth <= 768;

//     sectionRefs.current.forEach((section, index) => {
//       const media = mediaRefs.current[index];

//       // Check if media exists to avoid null errors
//       if (!media) return;

//       // Adjust parallax intensity for mobile vs desktop
//       const parallaxRange = isMobile ? 15 : 30; // Smaller range for mobile
//       const scaleRange = isMobile ? [1.05, 1] : [1.15, 1]; // Subtle scale for mobile

//       // Parallax animation with enhanced effects
//       gsap.fromTo(
//         media,
//         {
//           yPercent: -parallaxRange, // Start above
//           scale: scaleRange[0], // Slightly zoomed
//           opacity: 0.8, // Fade in for depth
//         },
//         {
//           yPercent: parallaxRange, // Move downward
//           scale: scaleRange[1], // Zoom out to normal
//           opacity: 1, // Fade to full opacity
//           ease: "none", // Linear for smooth parallax
//           scrollTrigger: {
//             trigger: section,
//             start: isMobile ? "top 90%" : "top bottom", // Tighter start on mobile
//             end: isMobile ? "bottom 10%" : "bottom top", // Tighter end on mobile
//             scrub: 0.5, // Smoother scrub for responsiveness
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     });

//     // Cleanup ScrollTriggers on component unmount
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div className="flex flex-col">
//       {/* Image Section with Enhanced Parallax */}
//       <section
//         ref={(el) => addToRefs(el, sectionRefs)}
//         className="w-screen h-[180vh] overflow-hidden relative"
//       >
//         <div
//           ref={(el) => addToRefs(el, mediaRefs)}
//           className="w-full h-full bg-cover bg-center absolute top-0 left-0"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
//           }}
//         />
//       </section>
//     </div>
//   );
// }
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import "./featuremedia.css";

gsap.registerPlugin(ScrollTrigger);

function FeatureMedia () {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#feature-clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="feature-media" className="min-h-screen w-screen pt-14 border-t border-gray-300/30">
      <div className="text-center py-14">
        <h2 className="text-2xl md:text-4xl font-kite text-white">Our Team</h2>
      </div>
      
      <div className="h-dvh w-screen" id="feature-clip">
        <div className="mask-clip-path feature-image">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureMedia;
