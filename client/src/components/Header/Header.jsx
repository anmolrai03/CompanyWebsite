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
import LogoModel from "../Loader/LogoModel";
import SmallTile from "../blocks/SmallTile";

// Component to handle logo rotation on scroll
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
      groupRef.current.rotation.y = scrollY.current * 0.005;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
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

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // --- MENU & CART TOGGLES ---
  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
    gsap.to(menuSidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out", pointerEvents: "auto" });
    gsap.fromTo(
      menuItemsRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  const closeMenu = useCallback(() => {
    gsap.to(menuItemsRef.current, { y: -30, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power2.in" });
    gsap.to(menuSidebarRef.current, { x: "-100%", duration: 0.4, delay: 0.2, ease: "power3.in" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      delay: 0.1,
      ease: "power2.in",
      onComplete: () => {
        setIsMenuOpen(false);
        document.body.style.overflow = "auto";
      },
    });
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
    document.body.style.overflow = "hidden";
    gsap.to(cartSidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out", pointerEvents: "auto" });
  }, []);

  const closeCart = useCallback(() => {
    gsap.to(cartSidebarRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIsCartOpen(false);
        document.body.style.overflow = "auto";
      },
    });
  }, []);

  // Close menu/cart on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !menuSidebarRef.current.contains(event.target)) {
        closeMenu();
      }
      if (isCartOpen && !cartSidebarRef.current.contains(event.target)) {
        closeCart();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isCartOpen, closeMenu, closeCart]);

  return (
    <>
      {/* HEADER */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-6 lg:px-[4.375rem] lg:pt-10 h-[4.688rem] transition-opacity duration-400 ${
          isMenuOpen || isCartOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* LEFT NAV */}
        <div className="flex items-center">
          <nav className="hidden lg:block">
            <ul className="flex gap-x-2">
              <li><SmallTile name="Shop" /></li>
              <li><SmallTile name="Our Story" /></li>
              <li><SmallTile name="LookBook" /></li>
            </ul>
          </nav>

          {/* MOBILE HAMBURGER */}
          <button onClick={openMenu} className="lg:hidden text-white hover:text-indigo-300 transition-colors p-2">
            <svg className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" d="M3 8L21 8" />
              <path strokeLinecap="round" d="M3 16L21 16" />
              <path strokeLinecap="round" d="M3 24L21 24" />
            </svg>
          </button>
        </div>

        {/* CENTER LOGO */}
        <div className="flex items-center justify-center w-[6.375rem] h-[4.688rem] cursor-pointer" onClick={handleLogoClick}>
          <Canvas
            camera={{ position: [0, 0, 3] }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={Math.min(window.devicePixelRatio, 2)}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 2, 5]} intensity={1.2} color="#4f46e5" />
            <pointLight position={[-3, -3, 2]} intensity={0.6} color="#8b5cf6" />
            <ScrollRotatingLogo />
          </Canvas>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-x-2">
          <button onClick={openCart} className="flex items-center">
            <SmallTile name="Bag/0" />
          </button>
        </div>
      </header>

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

