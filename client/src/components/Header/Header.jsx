// /* eslint-disable no-unused-vars */
// import { useEffect, useRef, useState, useCallback } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { gsap } from "gsap";
// import LogoModel from "../Loader/LogoModel";
// import SmallTile from "../blocks/SmallTile";

// // Component to handle logo rotation on scroll
// function ScrollRotatingLogo() {
//   const groupRef = useRef();
//   const scrollY = useRef(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       scrollY.current = window.scrollY;
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useFrame((state) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y = scrollY.current * 0.005;
//       groupRef.current.position.y =
//         Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <LogoModel scale={1.3} />
//     </group>
//   );
// }

// function Header({ isLoading = false }) {
//    // Add isLoading prop
//   const headerRef = useRef();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
//   const menuSidebarRef = useRef();
//   const cartSidebarRef = useRef();
//   const overlayRef = useRef();
//   const menuItemsRef = useRef([]);

//   // Responsive check
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleLogoClick = useCallback(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   // --- MENU & CART TOGGLES ---
//   const openMenu = useCallback(() => {
//     setIsMenuOpen(true);
//     document.body.style.overflow = "hidden";
//     gsap.to(menuSidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
//     gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out", pointerEvents: "auto" });
//     gsap.fromTo(
//       menuItemsRef.current,
//       { y: 60, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 0.3, ease: "power3.out" }
//     );
//   }, []);

//   const closeMenu = useCallback(() => {
//     gsap.to(menuItemsRef.current, { y: -30, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power2.in" });
//     gsap.to(menuSidebarRef.current, { x: "-100%", duration: 0.4, delay: 0.2, ease: "power3.in" });
//     gsap.to(overlayRef.current, {
//       opacity: 0,
//       duration: 0.4,
//       delay: 0.1,
//       ease: "power2.in",
//       onComplete: () => {
//         setIsMenuOpen(false);
//         document.body.style.overflow = "auto";
//       },
//     });
//   }, []);

//   const openCart = useCallback(() => {
//     setIsCartOpen(true);
//     document.body.style.overflow = "hidden";
//     gsap.to(cartSidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
//     gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out", pointerEvents: "auto" });
//   }, []);

//   const closeCart = useCallback(() => {
//     gsap.to(cartSidebarRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
//     gsap.to(overlayRef.current, {
//       opacity: 0,
//       duration: 0.4,
//       ease: "power2.in",
//       onComplete: () => {
//         setIsCartOpen(false);
//         document.body.style.overflow = "auto";
//       },
//     });
//   }, []);

//   // Close menu/cart on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMenuOpen && !menuSidebarRef.current.contains(event.target)) {
//         closeMenu();
//       }
//       if (isCartOpen && !cartSidebarRef.current.contains(event.target)) {
//         closeCart();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMenuOpen, isCartOpen, closeMenu, closeCart]);

//   return (
//     <>
//       {/* HEADER */}
//       <header
//         ref={headerRef}
//         className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-6 lg:px-[4.375rem] lg:pt-10 h-[4.688rem] transition-opacity duration-400 ${
//           isMenuOpen || isCartOpen ? "opacity-0 pointer-events-none" : "opacity-100"
//         }`}
//       >
//         {/* LEFT NAV */}
//         <div className="flex items-center">
//           <nav className="hidden lg:block">
//             <ul className="flex gap-x-2">
//               <li><SmallTile name="Home" /></li>
//               <li><SmallTile name="Our Story" /></li>
//             </ul>
//           </nav>

//           {/* MOBILE HAMBURGER */}
//           <button onClick={openMenu} className="lg:hidden text-white hover:text-indigo-300 transition-colors p-2">
//             <svg className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <path strokeLinecap="round" d="M3 8L21 8" />
//               <path strokeLinecap="round" d="M3 16L21 16" />
//               <path strokeLinecap="round" d="M3 24L21 24" />
//             </svg>
//           </button>
//         </div>

//         {/* CENTER LOGO - Only render when NOT loading */}
//         {/* w-[6.4rem] h-[4.7rem] */}
//         <div className="flex items-center justify-center h-24 w-24 md:h-28 md:w-28 cursor-pointer" onClick={handleLogoClick}>
//           {!isLoading && (
//             <Canvas
//               camera={{ position: [0, 0, 3] }}
//               gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
//               dpr={Math.min(window.devicePixelRatio, 2)}
//             >
//               <ambientLight intensity={0.8} />
//               <directionalLight position={[2, 2, 5]} intensity={1.2} color="#4f46e5" />
//               <pointLight position={[-3, -3, 2]} intensity={0.6} color="#8b5cf6" />
//               <ScrollRotatingLogo />
//             </Canvas>
//           )}
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-x-2">
//           <SmallTile name="LookBook" />
//           <SmallTile name="Services" />
//           {/* <button onClick={openCart} className="flex items-center">
//             <SmallTile name="LookBook" />
//             <SmallTile name="Services" />

//           </button> */}
//         </div>
//       </header>

//      {/* FULL SCREEN MOBILE SIDEBAR - Left side with cross button on left */}
//       <div 
//         ref={menuSidebarRef}
//         className="fixed inset-0 z-50 bg-[#f8f5f0] transform -translate-x-full"
//       >
//         <div className="h-full flex flex-col">
//           {/* Header with close button on LEFT side */}
//           <div className="flex items-center justify-between p-8 pt-12">
//             <button 
//               onClick={closeMenu}
//               className="text-black hover:text-gray-600 transition-colors p-2"
//               ref={el => menuItemsRef.current[0] = el}
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <span 
//               className="text-black text-2xl font-medium"
//               ref={el => menuItemsRef.current[1] = el}
//             >
//               DEV SPHERER
//             </span>
//           </div>
//           {/* Menu Items - Large and centered, appearing from bottom */}
//           <div className="flex-1 flex flex-col justify-center items-center space-y-16 px-8">
//             <span 
//               className="text-black text-4xl md:text-5xl uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer text-center"
//               ref={el => menuItemsRef.current[2] = el}
//             >
//               Home
//             </span>
//             <span 
//               className="text-black text-4xl md:text-5xl uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer text-center"
//               ref={el => menuItemsRef.current[3] = el}
//             >
//               Our Story
//             </span>
//             <span 
//               className="text-black text-4xl md:text-5xl uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer text-center"
//               ref={el => menuItemsRef.current[4] = el}
//             >
//               Lookbook
//             </span>

//             <span 
//               className="text-black text-4xl md:text-5xl uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer text-center"
//               ref={el => menuItemsRef.current[4] = el}
//             >
//               Services
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* CART SIDEBAR */}
//       <div 
//         ref={cartSidebarRef}
//         className="fixed inset-y-0 right-0 z-50 bg-[#f8f5f0] w-96 max-w-full transform translate-x-full"
//       >
//         <div className="h-full flex flex-col p-8 pt-12">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-16">
//             <span className="text-black text-2xl font-medium">Bag</span>
//             <button 
//               onClick={closeCart}
//               className="text-black hover:text-gray-600 transition-colors p-2"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* Cart Content */}
//           <div className="flex-1 flex items-center justify-center">
//             <p className="text-gray-500 text-center text-lg">Your bag is empty</p>
//           </div>

//           {/* Footer */}
//           <div className="border-t border-gray-200 pt-6">
//             <button className="w-full bg-black text-white py-4 px-6 text-base uppercase tracking-widest font-light hover:bg-gray-800 transition-colors">
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* OVERLAY */}
//       <button
//         ref={overlayRef}
//         type="button"
//         className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none"
//         onClick={() => {
//           if (isMenuOpen) closeMenu();
//           if (isCartOpen) closeCart();
//         }}
//         aria-label="Close overlay"
//         tabIndex={0}
//         style={{ all: 'unset', cursor: 'pointer', position: 'fixed', inset: 0, zIndex: 40 }}
//       />
//     </>
//   );
// }

// export default Header;

// // import { useEffect, useRef, useState, useCallback } from "react";
// // import { Canvas, useFrame } from "@react-three/fiber";
// // import { gsap } from "gsap";
// // import LogoModel from "../Loader/LogoModel";
// // import SmallTile from "../blocks/SmallTile";

// // // Component to handle logo rotation on scroll
// // function ScrollRotatingLogo() {
// //   const groupRef = useRef();
// //   const scrollY = useRef(0);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       scrollY.current = window.scrollY;
// //     };
// //     window.addEventListener("scroll", handleScroll, { passive: true });
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   useFrame((state) => {
// //     if (groupRef.current) {
// //       groupRef.current.rotation.y = scrollY.current * 0.005;
// //       groupRef.current.position.y =
// //         Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
// //     }
// //   });

// //   return (
// //     <group ref={groupRef}>
// //       <LogoModel scale={1.3} />
// //     </group>
// //   );
// // }

// // function Header() {
// //   const headerRef = useRef();
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [isCartOpen, setIsCartOpen] = useState(false);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
// //   const menuSidebarRef = useRef();
// //   const cartSidebarRef = useRef();
// //   const overlayRef = useRef();
// //   const menuItemsRef = useRef([]);

// //   // Responsive check
// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth < 1024);
// //     };
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const handleLogoClick = useCallback(() => {
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   }, []);

// //   // --- MENU & CART TOGGLES ---
// //   const openMenu = useCallback(() => {
// //     setIsMenuOpen(true);
// //     document.body.style.overflow = "hidden";
// //     gsap.to(menuSidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
// //     gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out", pointerEvents: "auto" });
// //     gsap.fromTo(
// //       menuItemsRef.current,
// //       { y: 60, opacity: 0 },
// //       { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 0.3, ease: "power3.out" }
// //     );
// //   }, []);

// //   const closeMenu = useCallback(() => {
// //     gsap.to(menuItemsRef.current, { y: -30, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power2.in" });
// //     gsap.to(menuSidebarRef.current, { x: "-100%", duration: 0.4, delay: 0.2, ease: "power3.in" });
// //     gsap.to(overlayRef.current, {
// //       opacity: 0,
// //       duration: 0.4,
// //       delay: 0.1,
// //       ease: "power2.in",
// //       onComplete: () => {
// //         setIsMenuOpen(false);
// //         document.body.style.overflow = "auto";
// //       },
// //     });
// //   }, []);

// //   const openCart = useCallback(() => {
// //     setIsCartOpen(true);
// //     document.body.style.overflow = "hidden";
// //     gsap.to(cartSidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
// //     gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out", pointerEvents: "auto" });
// //   }, []);

// //   const closeCart = useCallback(() => {
// //     gsap.to(cartSidebarRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
// //     gsap.to(overlayRef.current, {
// //       opacity: 0,
// //       duration: 0.4,
// //       ease: "power2.in",
// //       onComplete: () => {
// //         setIsCartOpen(false);
// //         document.body.style.overflow = "auto";
// //       },
// //     });
// //   }, []);

// //   // Close menu/cart on outside click
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (isMenuOpen && !menuSidebarRef.current.contains(event.target)) {
// //         closeMenu();
// //       }
// //       if (isCartOpen && !cartSidebarRef.current.contains(event.target)) {
// //         closeCart();
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, [isMenuOpen, isCartOpen, closeMenu, closeCart]);

// //   return (
// //     <>
// //       {/* HEADER */}
// //       <header
// //         ref={headerRef}
// //         className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-6 lg:px-[4.375rem] lg:pt-10 h-[4.688rem] transition-opacity duration-400 ${
// //           isMenuOpen || isCartOpen ? "opacity-0 pointer-events-none" : "opacity-100"
// //         }`}
// //       >
// //         {/* LEFT NAV */}
// //         <div className="flex items-center">
// //           <nav className="hidden lg:block">
// //             <ul className="flex gap-x-2">
// //               <li><SmallTile name="Shop" /></li>
// //               <li><SmallTile name="Our Story" /></li>
// //               <li><SmallTile name="LookBook" /></li>
// //             </ul>
// //           </nav>

// //           {/* MOBILE HAMBURGER */}
// //           <button onClick={openMenu} className="lg:hidden text-white hover:text-indigo-300 transition-colors p-2">
// //             <svg className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
// //               <path strokeLinecap="round" d="M3 8L21 8" />
// //               <path strokeLinecap="round" d="M3 16L21 16" />
// //               <path strokeLinecap="round" d="M3 24L21 24" />
// //             </svg>
// //           </button>
// //         </div>

// //         {/* CENTER LOGO */}
// //         <div className="flex items-center justify-center w-[6.375rem] h-[4.688rem] cursor-pointer" onClick={handleLogoClick}>
// //           <Canvas
// //             camera={{ position: [0, 0, 3] }}
// //             gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
// //             dpr={Math.min(window.devicePixelRatio, 2)}
// //           >
// //             <ambientLight intensity={0.8} />
// //             <directionalLight position={[2, 2, 5]} intensity={1.2} color="#4f46e5" />
// //             <pointLight position={[-3, -3, 2]} intensity={0.6} color="#8b5cf6" />
// //             <ScrollRotatingLogo />
// //           </Canvas>
// //         </div>

// //         {/* RIGHT SIDE */}
// //         <div className="flex items-center gap-x-2">
// //           <button onClick={openCart} className="flex items-center">
// //             <SmallTile name="Bag/0" />
// //           </button>
// //         </div>
// //       </header>

// //      {/* FULL SCREEN MOBILE SIDEBAR - Left side with cross button on left */}
// //       <div 
// //         ref={menuSidebarRef}
// //         className="fixed inset-0 z-50 bg-[#f8f5f0] transform -translate-x-full"
// //       >
// //         <div className="h-full flex flex-col">
// //           {/* Header with close button on LEFT side */}
// //           <div className="flex items-center justify-between p-8 pt-12">
// //             <button 
// //               onClick={closeMenu}
// //               className="text-black hover:text-gray-600 transition-colors p-2"
// //               ref={el => menuItemsRef.current[0] = el}
// //             >
// //               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
// //                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
// //               </svg>
// //             </button>
// //             <span 
// //               className="text-black text-2xl font-medium"
// //               ref={el => menuItemsRef.current[1] = el}
// //             >
// //               Menu
// //             </span>
// //           </div>

// //           {/* Menu Items - Large and centered, appearing from bottom */}
// //           <div className="flex-1 flex flex-col justify-center items-center space-y-16 px-8">
// //             <span 
// //               className="text-black text-4xl md:text-5xl uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer text-center"
// //               ref={el => menuItemsRef.current[2] = el}
// //             >
// //               Shop
// //             </span>
// //             <span 
// //               className="text-black text-4xl md:text-5xl uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer text-center"
// //               ref={el => menuItemsRef.current[3] = el}
// //             >
// //               Our Story
// //             </span>
// //             <span 
// //               className="text-black text-4xl md:text-5xl uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer text-center"
// //               ref={el => menuItemsRef.current[4] = el}
// //             >
// //               Lookbook
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* CART SIDEBAR */}
// //       <div 
// //         ref={cartSidebarRef}
// //         className="fixed inset-y-0 right-0 z-50 bg-[#f8f5f0] w-96 max-w-full transform translate-x-full"
// //       >
// //         <div className="h-full flex flex-col p-8 pt-12">
// //           {/* Header */}
// //           <div className="flex items-center justify-between mb-16">
// //             <span className="text-black text-2xl font-medium">Bag</span>
// //             <button 
// //               onClick={closeCart}
// //               className="text-black hover:text-gray-600 transition-colors p-2"
// //             >
// //               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
// //                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
// //               </svg>
// //             </button>
// //           </div>

// //           {/* Cart Content */}
// //           <div className="flex-1 flex items-center justify-center">
// //             <p className="text-gray-500 text-center text-lg">Your bag is empty</p>
// //           </div>

// //           {/* Footer */}
// //           <div className="border-t border-gray-200 pt-6">
// //             <button className="w-full bg-black text-white py-4 px-6 text-base uppercase tracking-widest font-light hover:bg-gray-800 transition-colors">
// //               Checkout
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* OVERLAY */}
// //       <button
// //         ref={overlayRef}
// //         type="button"
// //         className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none"
// //         onClick={() => {
// //           if (isMenuOpen) closeMenu();
// //           if (isCartOpen) closeCart();
// //         }}
// //         aria-label="Close overlay"
// //         tabIndex={0}
// //         style={{ all: 'unset', cursor: 'pointer', position: 'fixed', inset: 0, zIndex: 40 }}
// //       />
// //     </>
// //   );
// // }

// // export default Header;
import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import LogoModel from "../Loader/LogoModel";
import SmallTile from "../blocks/SmallTile";
import { X, ChevronRight } from "lucide-react";

// Logo rotation on scroll
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

function Header({ isLoading = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const menuSidebarRef = useRef();
  const overlayRef = useRef();
  const menuItemsRef = useRef([]);
  const devRef = useRef(null);
  const closeBtnRef = useRef(null);

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

  // --- MENU TOGGLES ---
  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";

    gsap.to(menuSidebarRef.current, {
      x: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      pointerEvents: "auto",
    });

    // Animate DEV SPHERER alphabet by alphabet
    if (devRef.current) {
      const letters = devRef.current.querySelectorAll("span");
      gsap.fromTo(
        letters,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }

    // Animate menu items
    gsap.fromTo(
      menuItemsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.8,
        ease: "power3.out",
      }
    );

    // Animate close button
    gsap.fromTo(
      closeBtnRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  const closeMenu = useCallback(() => {
    gsap.to(menuSidebarRef.current, {
      x: "-100%",
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        setIsMenuOpen(false);
        document.body.style.overflow = "auto";
      },
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      pointerEvents: "none",
    });
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-6 lg:px-[4.375rem] lg:pt-10 h-[4.688rem]">
        {/* HAMBURGER LEFT (mobile only) */}
        {isMobile && (
          <button
            onClick={openMenu}
            className="lg:hidden text-white hover:text-indigo-300 transition-colors p-2"
          >
            <svg
              className="h-8 w-8 md:h-10 md:w-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* LEFT NAV (desktop only) */}
        {!isMobile && (
          <div className="flex items-center gap-x-3">
            <SmallTile name="Home" />
            <SmallTile name="Our Story" />
          </div>
        )}

        {/* CENTER LOGO */}
        <div
          className="flex items-center justify-center h-24 w-24 md:h-28 md:w-28 cursor-pointer"
          onClick={handleLogoClick}
        >
          {!isLoading && (
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
          )}
        </div>

        {/* RIGHT NAV (desktop only) */}
        {!isMobile && (
          <div className="flex items-center gap-x-3">
            <SmallTile name="LookBook" />
            <SmallTile name="Services" />
          </div>
        )}
      </header>

      {/* FULL SCREEN MOBILE SIDEBAR */}
      <div
        ref={menuSidebarRef}
        className="fixed inset-0 z-50 bg-[#f8f5f0] transform -translate-x-full"
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 pt-10 border-b border-gray-200">
            {/* Close button (left, rectangular outline) */}
            <button
              ref={closeBtnRef}
              onClick={closeMenu}
              className="border border-black text-black px-3 py-1 rounded-sm text-sm sm:text-base hover:bg-black hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* DEV SPHERER (right, responsive) */}
            <div
              ref={devRef}
              className="text-black text-lg sm:text-xl md:text-2xl font-semibold flex space-x-1 tracking-wider"
            >
              {"DEV SPHERE".split("").map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col px-6">
            {["Home", "Our Story", "Lookbook", "Services"].map((item, i) => (
              <div
                key={i}
                ref={(el) => (menuItemsRef.current[i] = el)}
                className="flex items-center justify-between text-gray-800 text-sm sm:text-base md:text-lg font-medium py-4 border-t border-gray-200 cursor-pointer hover:text-gray-600"
              >
                <span>{item}</span>
                <ChevronRight size={18} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      <button
        ref={overlayRef}
        type="button"
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none"
        onClick={closeMenu}
      />
    </>
  );
}

export default Header;
