// import React from "react";


// function CartButton() {
//   return (
//     <div className="flex items-center gap-3">
//       {/* <button className="bg-black/60 border border-white/20 px-4 py-2 rounded-md">
//         Tous nos articles
//       </button> */}
//       <button className="bg-black/60 border border-white/20 px-4 py-2 rounded-md flex items-center gap-2">
//         👜 BAG / 0
//       </button>
//     </div>
//   );
// }

// function NavButton({ children }) {
//   return (
//     <button className="bg-black/60 border border-white/20 px-4 py-2 rounded-md text-white/90 backdrop-blur-sm hover:bg-white/5 transition">
//       {children}
//     </button>
//   );
// }

// export default function Header() {
//   return (
//     <header className="fixed z-50 w-full px-8 py-6 flex items-center justify-between">
//       <div className="flex gap-3 items-center">
//         <NavButton>Shop</NavButton>
//         <NavButton>Our Story</NavButton>
//         <NavButton>Lookbook</NavButton>
//       </div>

//       <div className="absolute left-1/2 transform -translate-x-1/2">
//         <div className="w-12 h-12 flex items-center justify-center text-black bg-white rounded-full shadow">
//           LOGO
//         </div>
//       </div>

//       <div className="flex gap-3 items-center">
//         <CartButton />
//       </div>
//     </header>
//   );
// }


import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import LogoModel from '../Loader/LogoModel'

// Component to handle logo rotation based on scroll
function ScrollRotatingLogo() {
  const groupRef = useRef();
  const scrollY = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate based on scroll position
      groupRef.current.rotation.y = scrollY.current * 0.005;
      // Soft up-down float animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <LogoModel scale={1.3} />
    </group>
  );
}

function Header() {
  const headerRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const menuSidebarRef = useRef();
  const cartSidebarRef = useRef();
  const overlayRef = useRef();
  const menuItemsRef = useRef([]);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
      // Close cart if open
      if (isCartOpen) closeCart();
    }
  }, [isMenuOpen, isCartOpen]);

  const toggleCart = useCallback(() => {
    if (isCartOpen) {
      closeCart();
    } else {
      openCart();
      // Close menu if open
      if (isMenuOpen) closeMenu();
    }
  }, [isCartOpen, isMenuOpen]);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Animate sidebar entrance
    gsap.to(menuSidebarRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power3.out"
    });
    
    // Animate overlay
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    // Animate menu items with stagger effect from bottom
    gsap.fromTo(menuItemsRef.current, 
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
        ease: "power3.out"
      }
    );
  }, []);

  const closeMenu = useCallback(() => {
    // Animate menu items out
    gsap.to(menuItemsRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in"
    });

    // Animate sidebar exit
    gsap.to(menuSidebarRef.current, {
      x: '-100%',
      duration: 0.4,
      delay: 0.2,
      ease: "power3.in"
    });
    
    // Animate overlay out
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      delay: 0.1,
      ease: "power2.in",
      onComplete: () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    });
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
    document.body.style.overflow = 'hidden';
    
    gsap.to(cartSidebarRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power3.out"
    });
    
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  }, []);

  const closeCart = useCallback(() => {
    gsap.to(cartSidebarRef.current, {
      x: '100%',
      duration: 0.4,
      ease: "power3.in"
    });
    
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIsCartOpen(false);
        document.body.style.overflow = 'auto';
      }
    });
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !menuSidebarRef.current.contains(event.target)) {
        closeMenu();
      }
      if (isCartOpen && !cartSidebarRef.current.contains(event.target)) {
        closeCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isCartOpen, closeMenu, closeCart]);

  return (
    <>
      {/* HEADER - Fixed positioning with proper alignment */}
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-6 lg:px-[4.375rem] lg:pt-10 h-[4.688rem] transition-opacity duration-400 ${
          isMenuOpen || isCartOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ 
          background: 'transparent',
          backdropFilter: 'none'
        }}
      >
        {/* LEFT SIDE - Desktop Navigation / Mobile Hamburger */}
        <div className="flex items-center">
          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:block">
            <ul className="flex gap-x-2">
              <li>
                <span className="text-white text-sm uppercase tracking-wider font-light hover:text-indigo-300 transition-colors cursor-pointer px-2 py-1">
                  Shop
                </span>
              </li>
              <li>
                <span className="text-white text-sm uppercase tracking-wider font-light hover:text-indigo-300 transition-colors cursor-pointer px-2 py-1">
                  Our Story
                </span>
              </li>
              <li>
                <span className="text-white text-sm uppercase tracking-wider font-light hover:text-indigo-300 transition-colors cursor-pointer px-2 py-1">
                  Lookbook
                </span>
              </li>
            </ul>
          </nav>

          {/* MOBILE HAMBURGER MENU */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden text-white hover:text-indigo-300 transition-colors p-2"
          >
            <svg className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" d="M3 8L21 8" />
              <path strokeLinecap="round" d="M3 16L21 16" />
              <path strokeLinecap="round" d="M3 16L21 24" />
            </svg>
          </button>
        </div>

        {/* CENTER - LOGO (This is just a placeholder, actual logo is positioned absolutely) */}
        <div className="w-[6.375rem] h-[4.688rem]">
          {/* This div maintains space for the centered logo */}
        </div>

        {/* RIGHT SIDE - BAG SECTION */}
        <div className="flex items-center gap-x-2">
          <button 
            onClick={toggleCart}
            className="flex items-center text-white text-sm uppercase tracking-wider font-light hover:text-indigo-300 transition-colors cursor-pointer px-2 py-1"
          >
            <svg className="h-[1.125rem] w-[1.125rem] lg:mr-2" viewBox="0 0 18 18" fill="none">
              <path d="M12.375 6.47248C12.0675 6.47248 11.8125 6.21748 11.8125 5.90998V4.87498C11.8125 4.08748 11.475 3.32248 10.89 2.78998C10.2975 2.24998 9.5325 2.00248 8.7225 2.07748C7.3725 2.20498 6.1875 3.58498 6.1875 5.02498V5.75248C6.1875 6.05998 5.9325 6.31498 5.625 6.31498C5.3175 6.31498 5.0625 6.05998 5.0625 5.75248V5.01748C5.0625 2.99998 6.69 1.13998 8.6175 0.95248C9.7425 0.84748 10.8225 1.19998 11.6475 1.95748C12.465 2.69998 12.9375 3.76498 12.9375 4.87498V5.90998C12.9375 6.21748 12.6825 6.47248 12.375 6.47248Z" fill="currentColor"/>
              <path d="M11.2499 17.0625H6.74986C3.28486 17.0625 2.63986 15.45 2.47486 13.8825L1.91236 9.39C1.82986 8.58 1.79986 7.4175 2.58736 6.5475C3.26236 5.7975 4.37986 5.4375 5.99986 5.4375H11.9999C13.6274 5.4375 14.7449 5.805 15.4124 6.5475C16.1924 7.4175 16.1699 8.58 16.0874 9.375L15.5249 13.8825C15.3599 15.45 14.7149 17.0625 11.2499 17.0625ZM5.99986 6.5625C4.73236 6.5625 3.86236 6.81 3.41986 7.305C3.05236 7.71 2.93236 8.3325 3.02986 9.2625L3.59236 13.755C3.71986 14.955 4.04986 15.945 6.74986 15.945H11.2499C13.9499 15.945 14.2799 14.9625 14.4074 13.77L14.9699 9.2625C15.0674 8.3475 14.9474 7.725 14.5799 7.3125C14.1374 6.81 13.2674 6.5625 11.9999 6.5625H5.99986Z" fill="currentColor"/>
              <path d="M11.5651 9.86255C11.1451 9.86255 10.8076 9.52505 10.8076 9.11255C10.8076 8.70005 11.1451 8.36255 11.5576 8.36255C11.9701 8.36255 12.3076 8.70005 12.3076 9.11255C12.3076 9.52505 11.9776 9.86255 11.5651 9.86255Z" fill="currentColor"/>
              <path d="M6.31512 9.86255C5.89512 9.86255 5.55762 9.52505 5.55762 9.11255C5.55762 8.70005 5.89512 8.36255 6.30762 8.36255C6.72012 8.36255 7.05762 8.70005 7.05762 9.11255C7.05762 9.52505 6.72762 9.86255 6.31512 9.86255Z" fill="currentColor"/>
            </svg>
            <span className="hidden lg:inline">Bag</span>
            <span className="hidden lg:inline">&nbsp;/&nbsp;</span>
            <span className="hidden lg:inline">0</span>
          </button>

        </div>

      </header>

      {/* 3D LOGO CANVAS - Absolutely positioned in center */}
      <div 
        className={`fixed left-1/2 top-[3.5rem] -translate-x-1/2 w-[6.375rem] h-[4.688rem] z-40 cursor-pointer transition-all duration-300 hover:scale-105 ${
          isMenuOpen || isCartOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onClick={handleLogoClick}
      >
        <Canvas
          camera={{ position: [0, 0, 3] }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <ambientLight intensity={0.8} />
          <directionalLight 
            position={[2, 2, 5]} 
            intensity={1.2} 
            color="#4f46e5" 
          />
          <pointLight 
            position={[-3, -3, 2]} 
            intensity={0.6} 
            color="#8b5cf6" 
          />
          <ScrollRotatingLogo />
        </Canvas>
      </div>

      {/* FULL SCREEN MOBILE SIDEBAR - Left side with cross button on left */}
      <div 
        ref={menuSidebarRef}
        className="fixed inset-0 z-50 bg-[#f8f5f0] transform -translate-x-full"
      >
        <div className="h-full flex flex-col">
          {/* Header with close button on LEFT side */}
          <div className="flex items-center justify-between p-8 pt-12">
            <button 
              onClick={closeMenu}
              className="text-black hover:text-gray-600 transition-colors p-2"
              ref={el => menuItemsRef.current[0] = el}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <span 
              className="text-black text-2xl font-medium"
              ref={el => menuItemsRef.current[1] = el}
            >
              Menu
            </span>
          </div>

          {/* Menu Items - Large and centered, appearing from bottom */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-16 px-8">
            <span 
              className="text-black text-4xl md:text-5xl uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer text-center"
              ref={el => menuItemsRef.current[2] = el}
            >
              Shop
            </span>
            <span 
              className="text-black text-4xl md:text-5xl uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer text-center"
              ref={el => menuItemsRef.current[3] = el}
            >
              Our Story
            </span>
            <span 
              className="text-black text-4xl md:text-5xl uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer text-center"
              ref={el => menuItemsRef.current[4] = el}
            >
              Lookbook
            </span>
          </div>
        </div>
      </div>

      {/* CART SIDEBAR */}
      <div 
        ref={cartSidebarRef}
        className="fixed inset-y-0 right-0 z-50 bg-[#f8f5f0] w-96 max-w-full transform translate-x-full"
      >
        <div className="h-full flex flex-col p-8 pt-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <span className="text-black text-2xl font-medium">Bag</span>
            <button 
              onClick={closeCart}
              className="text-black hover:text-gray-600 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-center text-lg">Your bag is empty</p>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6">
            <button className="w-full bg-black text-white py-4 px-6 text-base uppercase tracking-widest font-light hover:bg-gray-800 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      <button
        ref={overlayRef}
        type="button"
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none"
        onClick={() => {
          if (isMenuOpen) closeMenu();
          if (isCartOpen) closeCart();
        }}
        aria-label="Close overlay"
        tabIndex={0}
        style={{ all: 'unset', cursor: 'pointer', position: 'fixed', inset: 0, zIndex: 40 }}
      />

    </>
  );
}

export default Header;