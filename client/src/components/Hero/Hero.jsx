
// function Hero() {
//   return (
//     <main className="h-screen w-full overflow-hidden">
      
//       <div className="pt-28 px-4">
//         <p className="text-white leading-relaxed mb-8">
//           Exclusive, designed and personalized sustainable fashion in France
//           for those who prioritize quality and authenticity rather than mass
//           production.
//         </p>

//         <p className="text-gray-400 mb-12">
//           Exclusive, designed and personalized sustainable fashion in France
//           for those who prioritize quality and authenticity rather than mass
//           production.
//         </p>

//         <section className="flex items-center justify-center min-h-[50vh]">
//           <p className="text-white text-2xl sm:text-3xl leading-relaxed text-center max-w-3xl mx-auto">
//             Exclusive, designed and personalized sustainable fashion <br />
//             in France for those who prioritize quality{" "}
//             <span className="inline-block">🇫🇷</span> <br />
//             and authenticity rather than mass production.
//           </p>
//         </section>
//       </div>
//     </main>
//   );
// }
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

function ControlButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-black/50 border border-white/10 px-4 py-2 rounded-md text-white/80 hover:text-white hover:bg-black/60 transition"
    >
      {children}
    </button>
  );
}

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoContainerRef = useRef(null);
  const fullscreenVideoRef = useRef(null);

  // ---- Handlers ----
  const handleOpen = () => {
    setIsPlaying(true);
    gsap.fromTo(
      videoContainerRef.current,
      { scale: 0.7, borderRadius: "12px" },
      {
        scale: 1,
        borderRadius: "0px",
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          if (fullscreenVideoRef.current) {
            fullscreenVideoRef.current.play();
            setIsVideoPlaying(true);
          }
        },
      }
    );
  };

  const handlePlayPause = () => {
    if (fullscreenVideoRef.current) {
      if (isVideoPlaying) {
        fullscreenVideoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        fullscreenVideoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleMute = () => {
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleClose = () => {
    gsap.fromTo(
      videoContainerRef.current,
      { scale: 1, borderRadius: "0px" },
      {
        scale: 0.7,
        borderRadius: "12px",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          setIsPlaying(false);
          setIsVideoPlaying(false);
          if (fullscreenVideoRef.current) {
            fullscreenVideoRef.current.pause();
            fullscreenVideoRef.current.currentTime = 0;
          }
        },
      }
    );
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // ---- Escape key ----
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ---- Video listeners ----
  useEffect(() => {
    const video = fullscreenVideoRef.current;
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);

      video.addEventListener("timeupdate", updateTime);
      video.addEventListener("loadedmetadata", updateDuration);

      return () => {
        video.removeEventListener("timeupdate", updateTime);
        video.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [isPlaying]);

  return (
    <section className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden pt-12">
      {/* Side text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-sm z-10">
        DEV SPHERE
      </div>
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 text-white text-sm z-10">
        MEMORY
      </div>
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 text-white text-sm z-10">
        COLLECTION
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-sm z-10">
        2025
      </div>

      {/* Preview state */}
      {!isPlaying && (
        <div className="relative z-10 w-[60%] max-w-3xl aspect-video bg-black">
          <video
            className="w-full h-full object-cover rounded-lg shadow-lg"
            src="/hero-video.mp4"
            muted
            autoPlay
            loop
            playsInline
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <ControlButton onClick={handleOpen}>▶ Watch Video</ControlButton>
          </div>
        </div>
      )}

      {/* Fullscreen state */}
      {isPlaying && (
        <div
          ref={videoContainerRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <video
            ref={fullscreenVideoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Controls */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
            {/* Left controls */}
            <div className="flex items-center gap-4">
              <ControlButton onClick={handleMute}>
                {isMuted ? "🔇" : "🔊"}
              </ControlButton>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-4">
              <ControlButton onClick={handlePlayPause}>
                {isVideoPlaying ? "⏸️" : "▶️"}
              </ControlButton>
              <ControlButton onClick={handleClose}>
                {formatTime(currentTime)} / {formatTime(duration || 0)}
              </ControlButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
