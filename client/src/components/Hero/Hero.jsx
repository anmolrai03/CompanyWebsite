
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

import ButtonElement from "../utils/ButtonElement/ButtonElement";

import {PlayIcon, PauseIcon, MuteIcon, VolumeIcon, CloseIcon} from '../../assets/buttons/buttons.js'

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
  const mobileVideoRef = useRef(null);
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

  // Lock scroll and hide everything when desktop video is playing
  useEffect(() => {
    if (isPlaying && !isMobile) {
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
      
    } else if (!isPlaying || isMobile) {
      // Restore scroll and show all elements
      document.body.style.overflow = originalOverflowRef.current || "auto";
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
  }, [isPlaying, isMobile]);

  // Auto-hide controls after 3 seconds (desktop only)
  useEffect(() => {
    if (isPlaying && !isMobile) {
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
  }, [isPlaying, isMobile, isVideoPlaying, isMuted, currentTime]);

  // Show controls on mouse move (desktop only)
  useEffect(() => {
    const handleMouseMove = () => {
      if (isPlaying && !isMobile) {
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
  }, [isPlaying, isMobile]);

  // ---- Handlers ----
  const handleOpen = () => {
    // Only for desktop/tablet
    if (!isMobile) {
      setIsPlaying(true);
      
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
    // Only for desktop/tablet
    if (!isMobile) {
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
    if (!isMobile && fullscreenVideoRef.current) {
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
    if (!isMobile && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // ---- Escape key (desktop only) ----
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!isMobile && isPlaying) {
        if (e.key === "Escape") {
          handleClose();
        }
        if (e.key === " ") {
          e.preventDefault();
          handlePlayPause();
        }
        if (e.key === "m") {
          handleMute();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVideoPlaying, isMuted, isPlaying, isMobile]);

  // ---- Video listeners for desktop ----
  useEffect(() => {
    const video = fullscreenVideoRef.current;
    if (video && !isMobile) {
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
  }, [isPlaying, isMobile]);

  return (
    <section className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden pt-12">
      {/* Desktop/Tablet Hero Section */}
      {!isMobile && (
        <>
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
            <div className="relative z-10 w-[60%] max-w-3xl aspect-video bg-white justify-center items-center flex rounded-lg">
              <video
                ref={previewVideoRef}
                className="w-1/2 h- 1/2 object-cover rounded-lg shadow-lg"
                src="/hero-video.mp4"
                muted
                autoPlay
                loop
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                <ButtonElement name="Watch Video" onClick={handleOpen} />
              </div>
            </div>
          )}

          {/* Desktop Fullscreen state */}
          <div
            ref={videoContainerRef}
            className="fullscreen-video-container fixed inset-0 z-[9999] bg-transparent flex items-center justify-center"
            style={{ 
              display: isPlaying ? "flex" : "none",
              left: isPlaying ? "0" : "-100vw",
              top: isPlaying ? "0" : "-100vh"
            }}
            onClick={(e) => {
              if (e.target === videoContainerRef.current || e.target === fullscreenVideoRef.current) {
                handlePlayPause();
              }
            }}
          >
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

            {/* Desktop Controls Overlay */}
            {showControls && (
              <div 
                className="absolute bottom-8 left-8 right-8 flex items-center justify-between gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <ButtonElement 
                    name={isMuted ? "Unmute" : "Mute"} 
                    icon={isMuted ? MuteIcon : VolumeIcon} 
                    onClick={handleMute} 
                  />
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <ButtonElement 
                    name={isVideoPlaying ? "Pause" : "Play"} 
                    icon={isVideoPlaying ? PauseIcon : PlayIcon} 
                    onClick={handlePlayPause} 
                  />
                  <ButtonElement 
                    name={`${formatTime(currentTime)} / ${formatTime(duration)}`} 
                  />
                  <ButtonElement 
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
        </>
      )}

      {/* Mobile Hero Section - Background Video */}
      {isMobile && (
        <>
          {/* Background Video */}
          <video
            ref={mobileVideoRef}
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/hero-video.mp4"
            muted
            autoPlay
            loop
            playsInline
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 z-5"></div>
          
          {/* Mobile content overlay */}
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              DEV SPHERE
            </h1>
            <h2 className="text-xl md:text-2xl font-light mb-8">
              Memory Collection 2025
            </h2>
            <p className="text-sm md:text-base opacity-80 max-w-md mx-auto leading-relaxed">
              Experience our latest development showcase featuring innovative solutions and creative implementations.
            </p>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}