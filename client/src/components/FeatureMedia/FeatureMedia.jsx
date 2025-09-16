// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// function FeatureMedia() {
//   const sectionRefs = useRef([]);
//   const mediaRefs = useRef([]);

//   useEffect(() => {
//     sectionRefs.current.forEach((section, index) => {
//       const media = mediaRefs.current[index];

//       // Parallax animation for image and video
//       gsap.fromTo(
//         media,
//         {
//           yPercent: -20, // Start slightly above
//           scale: 1.1, // Slightly zoomed for effect
//         },
//         {
//           yPercent: 20, // Move downward for parallax
//           scale: 1,
//           ease: "none", // Linear for smooth parallax
//           scrollTrigger: {
//             trigger: section,
//             start: "top bottom", // Start when section top hits viewport bottom
//             end: "bottom top", // End when section bottom hits viewport top
//             scrub: true, // Sync with scroll
//             toggleActions: "play none none reverse", // Reverse on scroll back
//           },
//         }
//       );

//       // Video playback control
//       if (media.tagName === "VIDEO") {
//         ScrollTrigger.create({
//           trigger: section,
//           start: "top bottom",
//           end: "bottom top",
//           onEnter: () => media.play(),
//           onLeave: () => media.pause(),
//           onEnterBack: () => media.play(),
//           onLeaveBack: () => media.pause(),
//         });

//         // Ensure the video pauses at the end to show the final frame
//         media.addEventListener("ended", () => {
//           media.pause();
//           // Optionally, set currentTime to the end to ensure the final frame is displayed
//           media.currentTime = media.duration;
//         });
//       }
//     });

//     // Cleanup ScrollTriggers and event listeners on component unmount
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       mediaRefs.current.forEach((media) => {
//         if (media.tagName === "VIDEO") {
//           media.removeEventListener("ended", () => {});
//         }
//       });
//     };
//   }, []);

//   return (
//     <div className="flex flex-col">
//       {/* First Image Section (Video's Starting Frame) */}
//       <section
//         ref={(el) => (sectionRefs.current[0] = el)}
//         className="w-screen h-[120vh] overflow-hidden"
//       >
//         <div
//           ref={(el) => (mediaRefs.current[0] = el)}
//           className="w-full h-full bg-cover bg-center"
//           style={{
//             backgroundImage: `url('/path/to/video-start-frame.jpg')`,
//           }}
//         />
//       </section>

//       {/* Video Section (Transitions to Final Frame) */}
//       <section
//         ref={(el) => (sectionRefs.current[1] = el)}
//         className="w-screen h-[120vh] overflow-hidden relative"
//       >
//         <video
//           ref={(el) => (mediaRefs.current[1] = el)}
//           className="w-full h-full object-cover"
//           muted
//           playsInline
//           loop={false}
//         >
//           <source src="/path/to/your-video.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         {/* Overlay Image for Final Frame */}
//         <div
//           className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0"
//           style={{
//             backgroundImage: `url('/path/to/video-end-frame.jpg')`,
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

      {/* Video Section */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="w-screen h-[120vh] overflow-hidden"
      >
        <video
          ref={(el) => (mediaRefs.current[1] = el)}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop={false}
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Final Image Section (Video's Final Frame) */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="w-screen h-[120vh] overflow-hidden"
      >
        <div
          ref={(el) => (mediaRefs.current[2] = el)}
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
      </section>
    </div>
  );
}

export default FeatureMedia;