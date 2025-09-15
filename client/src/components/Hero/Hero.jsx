import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import SmallTile from "../blocks/SmallTile";

// Icon components for the buttons
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const VolumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const MuteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoContainerRef = useRef(null);
  const fullscreenVideoRef = useRef(null);
  const previewVideoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const originalOverflowRef = useRef("");
  const hiddenElementsRef = useRef([]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Lock scroll and hide everything when video is playing
  useEffect(() => {
    if (isPlaying) {
      // Store original overflow value
      originalOverflowRef.current = document.body.style.overflow;
      
      // Lock scroll
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      
      // Reset the array
      hiddenElementsRef.current = [];
      
      // Find the React root element (usually has id="root" or similar)
      const rootElement = document.getElementById('root') || 
                         document.querySelector('[data-reactroot]') || 
                         document.body.children[0]; // fallback to first child
      
      if (rootElement) {
        // Hide all direct children of the root element
        const rootChildren = rootElement.children;
        
        for (let i = 0; i < rootChildren.length; i++) {
          const element = rootChildren[i];
          
          // Skip if this element contains our video container
          if (element === videoContainerRef.current || 
              element.contains(videoContainerRef.current) ||
              element.classList.contains('fullscreen-video-container')) {
            continue;
          }
          
          // Store the original visibility state and hide the element
          hiddenElementsRef.current.push({
            element: element,
            originalVisibility: element.style.visibility || ''
          });
          
          element.style.visibility = "hidden";
        }
      }
      
      // Also hide any direct children of body that aren't the root
      const bodyChildren = document.body.children;
      for (let i = 0; i < bodyChildren.length; i++) {
        const element = bodyChildren[i];
        
        // Skip the root element (already handled above) and our video container
        if (element === rootElement || 
            element === videoContainerRef.current || 
            element.contains(videoContainerRef.current) ||
            element.classList.contains('fullscreen-video-container')) {
          continue;
        }
        
        // Store the original visibility state and hide the element
        hiddenElementsRef.current.push({
          element: element,
          originalVisibility: element.style.visibility || ''
        });
        
        element.style.visibility = "hidden";
      }
      
      // Also ensure our video container is visible and properly positioned
      if (videoContainerRef.current) {
        videoContainerRef.current.style.visibility = "visible";
        videoContainerRef.current.style.zIndex = "9999";
      }
      
    } else {
      // Restore scroll and show all elements
      document.body.style.overflow = originalOverflowRef.current;
      document.documentElement.style.overflow = "auto";
      
      // Show all previously hidden elements
      hiddenElementsRef.current.forEach(({ element, originalVisibility }) => {
        element.style.visibility = originalVisibility;
      });
      
      hiddenElementsRef.current = []; // Clear the array
    }
    
    return () => {
      // Cleanup in case component unmounts during fullscreen
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      
      // Restore all hidden elements
      hiddenElementsRef.current.forEach(({ element, originalVisibility }) => {
        element.style.visibility = originalVisibility;
      });
      hiddenElementsRef.current = [];
    };
  }, [isPlaying]);

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (isPlaying) {
      setShowControls(true);
      
      // Clear any existing timeout
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      // Set new timeout to hide controls
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, isVideoPlaying, isMuted, currentTime]);

  // Show controls on mouse move
  useEffect(() => {
    const handleMouseMove = () => {
      if (isPlaying) {
        setShowControls(true);
        
        // Reset the timeout to hide controls
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
        
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying]);

  // ---- Handlers ----
  const handleOpen = () => {
    setIsPlaying(true);
    
    if (isMobile) {
      // Mobile animation - scale from small centered video to fullscreen
      const previewRect = previewVideoRef.current.getBoundingClientRect();
      
      gsap.fromTo(
        videoContainerRef.current,
        { 
          x: previewRect.left + previewRect.width/2,
          y: previewRect.top + previewRect.height/2,
          width: previewRect.width,
          height: previewRect.height,
          scale: 1,
          borderRadius: "12px"
        },
        {
          x: window.innerWidth/2,
          y: window.innerHeight/2,
          width: window.innerWidth,
          height: window.innerHeight,
          scale: 1,
          borderRadius: "0px",
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            if (fullscreenVideoRef.current) {
              fullscreenVideoRef.current.play().then(() => {
                setIsVideoPlaying(true);
              }).catch(error => {
                console.error("Error playing video:", error);
              });
            }
          },
        }
      );
    } else {
      // Desktop animation - scale up from center
      gsap.fromTo(
        videoContainerRef.current,
        { scale: 0.7, borderRadius: "12px" },
        {
          scale: 1,
          borderRadius: "0px",
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            if (fullscreenVideoRef.current) {
              fullscreenVideoRef.current.play().then(() => {
                setIsVideoPlaying(true);
              }).catch(error => {
                console.error("Error playing video:", error);
              });
            }
          },
        }
      );
    }
  };

  const handleClose = () => {
    if (isMobile) {
      // Mobile animation - scale back to small centered video
      const previewRect = previewVideoRef.current.getBoundingClientRect();
      
      gsap.fromTo(
        videoContainerRef.current,
        { 
          x: window.innerWidth/2,
          y: window.innerHeight/2,
          width: window.innerWidth,
          height: window.innerHeight,
          scale: 1,
          borderRadius: "0px"
        },
        {
          x: previewRect.left + previewRect.width/2,
          y: previewRect.top + previewRect.height/2,
          width: previewRect.width,
          height: previewRect.height,
          scale: 1,
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
    } else {
      // Desktop animation - scale down to center
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
    }
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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // ---- Escape key ----
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === " ") handlePlayPause(); // Space to play/pause
      if (e.key === "m") handleMute(); // M to mute/unmute
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVideoPlaying, isMuted]);

  // ---- Video listeners ----
  useEffect(() => {
    const video = fullscreenVideoRef.current;
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration || 0);

      video.addEventListener("timeupdate", updateTime);
      video.addEventListener("loadedmetadata", updateDuration);
      video.addEventListener("ended", () => setIsVideoPlaying(false));

      return () => {
        video.removeEventListener("timeupdate", updateTime);
        video.removeEventListener("loadedmetadata", updateDuration);
        video.removeEventListener("ended", () => setIsVideoPlaying(false));
      };
    }
  }, [isPlaying]);

  return (
    <section className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden pt-12">
      {/* Side text - hidden on mobile */}
      <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 text-white text-sm z-10">
        DEV SPHERE
      </div>
      <div className="hidden md:block absolute left-1/4 top-1/2 -translate-y-1/2 text-white text-sm z-10">
        MEMORY
      </div>
      <div className="hidden md:block absolute right-1/4 top-1/2 -translate-y-1/2 text-white text-sm z-10">
        COLLECTION
      </div>
      <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 text-white text-sm z-10">
        2025
      </div>

      {/* Preview state */}
      {!isPlaying && (
        <div className={`relative z-10 ${isMobile ? 'w-[90%] mx-auto' : 'w-[60%]'} max-w-3xl aspect-video bg-black`}>
          <video
            ref={previewVideoRef}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            src="/hero-video.mp4"
            muted
            autoPlay
            loop
            playsInline
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
            <SmallTile name="Watch Video" onClick={handleOpen} />
          </div>
        </div>
      )}

      {/* Fullscreen state - This is always in the DOM but positioned off-screen when not playing */}
      <div
        ref={videoContainerRef}
        className="fullscreen-video-container fixed inset-0 z-[9999] bg-transparent flex items-center justify-center"
        style={{ 
          display: isPlaying ? "flex" : "none",
          left: isPlaying ? "0" : "-100vw",
          top: isPlaying ? "0" : "-100vh"
        }}
        onClick={(e) => {
          // Toggle play/pause when clicking on the video
          if (e.target === videoContainerRef.current || e.target === fullscreenVideoRef.current) {
            handlePlayPause();
          }
        }}
      >
        {/* Video */}
        <video
          ref={fullscreenVideoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          autoPlay={isPlaying}
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Controls Overlay - only show when showControls is true */}
        {showControls && (
          <div 
            className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-wrap items-center justify-between gap-2"
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to video
          >
            {/* Left controls */}
            <div className="flex items-center gap-2">
              <SmallTile 
                name={isMuted ? "Unmute" : "Mute"} 
                icon={isMuted ? MuteIcon : VolumeIcon} 
                onClick={handleMute} 
              />
            </div>

            {/* Center controls on mobile */}
            {isMobile && (
              <div className="flex items-center gap-2 order-first w-full justify-center mb-2">
                <SmallTile 
                  name={isVideoPlaying ? "Pause" : "Play"} 
                  icon={isVideoPlaying ? PauseIcon : PlayIcon} 
                  onClick={handlePlayPause} 
                />
              </div>
            )}

            {/* Right controls */}
            <div className="flex items-center gap-2 ml-auto">
              {!isMobile && (
                <SmallTile 
                  name={isVideoPlaying ? "Pause" : "Play"} 
                  icon={isVideoPlaying ? PauseIcon : PlayIcon} 
                  onClick={handlePlayPause} 
                />
              )}
              <SmallTile 
                name={`${formatTime(currentTime)} / ${formatTime(duration)}`} 
              />
              <SmallTile 
                name="Close" 
                icon={CloseIcon} 
                onClick={handleClose} 
              />
            </div>
          </div>
        )}

        {/* Show play button in center when paused and controls are hidden */}
        {!isVideoPlaying && !showControls && (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            onClick={handlePlayPause}
          >
            <div className="bg-black/50 rounded-full p-4 cursor-pointer">
              <PlayIcon />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}