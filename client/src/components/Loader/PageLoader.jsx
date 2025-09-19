import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function PageLoader({ onLoadComplete = null }) {
  const containerRef = useRef(null);
  const circularTextRef = useRef(null);
  const straightTextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canComplete, setCanComplete] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const circularText = circularTextRef.current;
    const straightText = straightTextRef.current;

    if (!container || !circularText || !straightText) return;

    // Set initial states with entrance animation
    gsap.set(container, { opacity: 0, scale: 0.95 });
    gsap.set(straightText, { opacity: 0 });
    gsap.set(circularText, { opacity: 0, scale: 0.8 });

    // Entrance animation
    const entranceTl = gsap.timeline();
    entranceTl.to(container, { 
      opacity: 1, 
      scale: 1, 
      duration: 0.8, 
      ease: 'power2.out' 
    }).to(circularText, { 
      opacity: 1, 
      scale: 1, 
      duration: 0.6,
      ease: 'back.out(1.7)' 
    }, '-=0.3');

    // Create timeline for the loading animation
    const tl = gsap.timeline();

    // Circular motion animation for letters
    const letters = circularText.children;
    const radius = 75;
    const centerX = 0;
    const centerY = 0;

    // Position letters in circle and animate rotation
    Array.from(letters).forEach((letter, index) => {
      const angle = (index / letters.length) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      gsap.set(letter, {
        x: x,
        y: y,
        transformOrigin: 'center center',
        opacity: 0.9
      });
    });

    // Continuous circular rotation during loading
    const rotationTween = gsap.to(circularText, {
      rotation: 360,
      duration: 6,
      ease: 'none',
      repeat: -1
    });

    // Minimum animation time before allowing completion
    setTimeout(() => {
      setCanComplete(true);
    }, 2500);

    const completeAnimation = () => {
      // Stop rotation and animate to straight line
      rotationTween.kill();
      
      // Animate letters to straight line position
      tl.to(Array.from(letters), {
        x: (index) => (index - (letters.length - 1) / 2) * 32,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: 'back.out(1.4)',
        stagger: 0.1
      })
      .to(circularText, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5
      }, '-=0.4')
      .to(straightText, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3')
      .to('.dev-part', {
        color: '#60a5fa',
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.2')
      .to('.sep-part', {
        color: '#fbbf24',
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.2')
      .to(container, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsLoading(false);
          if (onLoadComplete) onLoadComplete();
        }
      }, '+=0.8');
    };

    // Check if we can complete every 100ms
    const checkComplete = setInterval(() => {
      if (canComplete) {
        clearInterval(checkComplete);
        completeAnimation();
      }
    }, 100);

    return () => {
      rotationTween.kill();
      tl.kill();
      clearInterval(checkComplete);
    };
  }, [onLoadComplete, canComplete]);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-24 bg-gradient-to-b from-blue-500/30 to-purple-500/30 rounded-full"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + i * 7}%`,
              animation: `float ${5 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative">
        {/* Circular Text Animation */}
        <div 
          ref={circularTextRef} 
          className="relative w-40 h-40 md:w-44 md:h-44 flex items-center justify-center"
        >
          {'DEVSEP'.split('').map((letter, index) => (
            <span
              key={index}
              className="absolute text-2xl md:text-3xl font-bold text-white tracking-wider"
              style={{ 
                textShadow: '0 0 12px rgba(96, 165, 250, 0.5)',
                fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif'
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Straight Text (appears after circular animation) */}
        <div 
          ref={straightTextRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-widest">
            <span className="dev-part text-gray-300">DEV</span>
            <span className="sep-part text-gray-500 ml-3">SEP</span>
          </h1>
        </div>

        {/* Central glow effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Progress ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 md:w-52 md:h-52 border border-gray-800 rounded-full">
            <div 
              className="w-full h-full border-2 border-transparent border-t-blue-500 rounded-full"
              style={{
                animation: 'spin 2.5s linear infinite'
              }}
            />
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 bg-blue-400 rounded-full"
            style={{
              animation: `pulse 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: '0 0 8px rgba(96, 165, 250, 0.6)'
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3; 
          }
          50% { 
            transform: translateY(-25px) rotate(5deg); 
            opacity: 0.6; 
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.3);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}