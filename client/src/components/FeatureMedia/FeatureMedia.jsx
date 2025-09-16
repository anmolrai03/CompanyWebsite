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
//     sectionRefs.current.forEach((section, index) => {
//       const mediaElements = mediaRefs.current[index];

//       // Handle multiple media elements (video or images) in a section
//       const medias = Array.isArray(mediaElements) ? mediaElements : [mediaElements];

//       medias.forEach((media, mediaIndex) => {
//         if (!media) return;

//         // Parallax animation for the image section
//         if (index === 0) {
//           // Background image (center): move upward with scale effect
//           if (mediaIndex === 0) {
//             gsap.fromTo(
//               media,
//               { yPercent: 30, scale: 1.2 },
//               {
//                 yPercent: -30,
//                 scale: 1,
//                 ease: "none",
//                 scrollTrigger: {
//                   trigger: section,
//                   start: "top bottom",
//                   end: "bottom top",
//                   scrub: true,
//                 },
//               }
//             );
//           } 
//           // Left image: move further left and slightly up
//           else if (mediaIndex === 1) {
//             gsap.fromTo(
//               media,
//               { xPercent: 0, yPercent: 0 }, // Initial position
//               {
//                 xPercent: -50, // Increased from -30 to -50 for more movement
//                 yPercent: -15, // Slightly increased vertical movement
//                 ease: "none",
//                 scrollTrigger: {
//                   trigger: section,
//                   start: "top bottom",
//                   end: "bottom top",
//                   scrub: true,
//                 },
//               }
//             );
//           } 
//           // Right image: move further right and slightly up
//           else if (mediaIndex === 2) {
//             gsap.fromTo(
//               media,
//               { xPercent: 0, yPercent: 0 }, // Initial position
//               {
//                 xPercent: 50, // Increased from 30 to 50 for more movement
//                 yPercent: -15, // Slightly increased vertical movement
//                 ease: "none",
//                 scrollTrigger: {
//                   trigger: section,
//                   start: "top bottom",
//                   end: "bottom top",
//                   scrub: true,
//                 },
//               }
//             );
//           }
//         }
//       });
//     });

//     // Cleanup ScrollTriggers on component unmount
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div className="flex flex-col">
//       {/* Image Section (Three Images with Parallax) */}
//       <section
//         ref={(el) => addToRefs(el, sectionRefs)}
//         className="w-screen h-[150vh] overflow-hidden relative"
//       >
//         {/* Background Image (Center) */}
//         <div
//           ref={(el) => addToRefs(el, mediaRefs)}
//           className="w-full h-full bg-cover bg-center absolute top-0 left-0 z-10"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
//           }}
//         />
//         {/* Left Image */}
//         <div
//           ref={(el) => addToRefs(el, mediaRefs)}
//           className="w-[35%] h-[50%] bg-cover bg-center absolute top-[25%] left-[10%] z-20 rounded-lg shadow-2xl"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
//           }}
//         />
//         {/* Right Image */}
//         <div
//           ref={(el) => addToRefs(el, mediaRefs)}
//           className="w-[35%] h-[50%] bg-cover bg-center absolute top-[25%] right-[10%] z-20 rounded-lg shadow-2xl"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
//           }}
//         />
//       </section>
//     </div>
//   );
// }

// export default FeatureMedia;


import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function FeatureMedia() {
  const sectionRefs = useRef([]);
  const mediaRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      const media = mediaRefs.current[index];

      // Parallax animation for images and video
      gsap.fromTo(
        media,
        {
          yPercent: -20, // Start slightly above
          scale: 1.1, // Slightly zoomed for effect
        },
        {
          yPercent: 20, // Move downward for parallax
          scale: 1,
          ease: "none", // Linear for smooth parallax
          scrollTrigger: {
            trigger: section,
            start: "top bottom", // Start when section top hits viewport bottom
            end: "bottom top", // End when section bottom hits viewport top
            scrub: true, // Sync with scroll
            toggleActions: "play none none reverse", // Reverse on scroll back
          },
        }
      );

      // Video playback control
      if (media.tagName === "VIDEO") {
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => media.play(),
          onLeave: () => media.pause(),
          onEnterBack: () => media.play(),
          onLeaveBack: () => media.pause(),
        });
      }
    });

    // Cleanup ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* First Image Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="w-screen h-[120vh] overflow-hidden"
      >
        <div
          ref={(el) => (mediaRefs.current[0] = el)}
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
      </section>
    </div>
  );
}

export default FeatureMedia;