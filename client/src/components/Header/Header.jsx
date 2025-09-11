// import { useEffect, useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { gsap } from "gsap";
// import LogoModel from "../Loader/LogoModel";

// // Component to handle logo rotation based on scroll
// function ScrollRotatingLogo() {
//   const groupRef = useRef();
//   const scrollY = useRef(0);
  
//   useEffect(() => {
//     const handleScroll = () => {
//       scrollY.current = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useFrame(() => {
//     if (groupRef.current) {
//       // Rotate based on scroll position
//       groupRef.current.rotation.y = scrollY.current * 0.005;
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <LogoModel scale={1.3} />
//     </group>
//   );
// }

// function Header() {
//   const headerRef = useRef();
//   const leftTextRef = useRef();
//   const rightTextRef = useRef();
//   const logoRef = useRef();

//   const handleLogoClick = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   useEffect(() => {
//     // Scale up animation for the entire header
//     gsap.fromTo(headerRef.current,
//       {
//         scale: 0.8,
//         opacity: 0,
//         y: -10
//       },
//       {
//         scale: 1,
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         ease: "back.out(1.7)",
//         delay: 0.5
//       }
//     );

//     // Animate text elements with slight delay
//     gsap.fromTo(leftTextRef.current,
//       { x: -30, opacity: 0 },
//       { x: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: "power2.out" }
//     );

//     gsap.fromTo(rightTextRef.current,
//       { x: 30, opacity: 0 },
//       { x: 0, opacity: 1, duration: 0.8, delay: 0.9, ease: "power2.out" }
//     );

//     // Scale up logo with a bounce effect
//     gsap.fromTo(logoRef.current,
//       { scale: 0.7, opacity: 0 },
//       { scale: 1, opacity: 1, duration: 0.8, delay: 0.7, ease: "elastic.out(1, 0.5)" }
//     );
//   }, []);

//   return (
//     <header 
//       ref={headerRef}
//       className="fixed top-0 w-full z-50 flex items-center justify-around py-10 bg-black/90 backdrop-blur-lg px-16 md:px-32"
//     >
//       {/* Left side text elements */}
//       <div ref={leftTextRef} className="flex items-center space-x-12">
//         <span className="text-white text-sm uppercase tracking-widest font-light hover:text-indigo-300 transition-colors cursor-pointer">Shop</span>
//         <span className="text-white text-sm uppercase tracking-widest font-light hover:text-indigo-300 transition-colors cursor-pointer">Our Story</span>
//         <span className="text-white text-sm uppercase tracking-widest font-light hover:text-indigo-300 transition-colors cursor-pointer">Lookbook</span>
//       </div>

//       {/* Logo */}
//       <div 
//         ref={logoRef}
//         className="w-24 h-24 md:w-28 md:h-28 transition-all duration-300 cursor-pointer hover:scale-105"
//         onClick={handleLogoClick}
//       >
//         <Canvas camera={{ position: [0, 0, 3] }}>
//           <ambientLight intensity={0.8} />
//           <directionalLight 
//             position={[2, 2, 5]} 
//             intensity={1.2} 
//             color="#4f46e5" 
//           />
//           <pointLight 
//             position={[-3, -3, 2]} 
//             intensity={0.6} 
//             color="#8b5cf6" 
//           />
//           <ScrollRotatingLogo />
//         </Canvas>
//       </div>

//       {/* Right side text elements */}
//       <div ref={rightTextRef} className="flex items-center">
//         <span className="text-white text-sm uppercase tracking-widest font-light hover:text-indigo-300 transition-colors cursor-pointer">Bag</span>
//       </div>
//     </header>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import LogoModel from "../Loader/LogoModel";

// Component to handle logo rotation based on scroll
function ScrollRotatingLogo() {
  const groupRef = useRef();
  const scrollY = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
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
  const menuSidebarRef = useRef();
  const cartSidebarRef = useRef();

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
      // Close cart if open
      if (isCartOpen) closeCart();
    }
  };

  const toggleCart = () => {
    if (isCartOpen) {
      closeCart();
    } else {
      openCart();
      // Close menu if open
      if (isMenuOpen) closeMenu();
    }
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    // Disable body scroll when menu is open
    document.body.style.overflow = 'hidden';
    gsap.to(menuSidebarRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const closeMenu = () => {
    gsap.to(menuSidebarRef.current, {
      x: '-100%',
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIsMenuOpen(false);
        // Re-enable body scroll when menu is closed
        document.body.style.overflow = 'auto';
      }
    });
  };

  const openCart = () => {
    setIsCartOpen(true);
    // Disable body scroll when cart is open
    document.body.style.overflow = 'hidden';
    gsap.to(cartSidebarRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const closeCart = () => {
    gsap.to(cartSidebarRef.current, {
      x: '100%',
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIsCartOpen(false);
        // Re-enable body scroll when cart is closed
        document.body.style.overflow = 'auto';
      }
    });
  };

  return (
    <>
      <header 
        ref={headerRef}
        className="fixed top-0 w-full z-50 flex items-center py-6 bg-transparent px-6 md:px-12 lg:px-24 h-16 md:h-20"
      >
        {/* DESKTOP LAYOUT SECITON HIDDEN IN TABLET AND MOBILE STARTS HERE */}
        <div className="hidden lg:flex items-center justify-between w-full">

          {/* LEFT SIDE ELEMENTS STARTS HERE */}
          <div className="flex items-center space-x-8">
            <span className="text-white text-sm uppercase tracking-widest font-light hover:text-indigo-300 transition-colors cursor-pointer">Shop</span>
            <span className="text-white text-sm uppercase tracking-widest font-light hover:text-indigo-300 transition-colors cursor-pointer">Our Story</span>
            <span className="text-white text-sm uppercase tracking-widest font-light hover:text-indigo-300 transition-colors cursor-pointer">Lookbook</span>
          </div>
          {/* LEFT SIDE ELEMENTS ENDS HERE  */}

          {/* LOGO SECTION STARTS HERE - FIXED POSITIONING ISSUE */}
          <div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 transition-all duration-300 cursor-pointer hover:scale-105"
            onClick={handleLogoClick}
          >
            <Canvas camera={{ position: [0, 0, 3] }}>
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
          {/* LOGO SECTION ENDS HERE */}

          {/* RIGHT SIDE ELEMENTS STARTS HERE */}
          <div className="flex items-center">
            <span className="text-white text-sm uppercase tracking-widest font-light hover:text-indigo-300 transition-colors cursor-pointer">Bag</span>
          </div>
          {/* RIGHT SIDE ELEMENTS ENDS HERE  */}

        </div>
        {/* DESKTOP LAYOUT SECITON HIDDEN IN TABLET AND MOBILE ENDS HERE */}

        {/* MOBILE AND TABLET VIEW STARTS HERE */}
        <div className="flex lg:hidden items-center justify-between w-full">

          {/* HAMBURGER SIGN STARTS HERE */}
          <button 
            onClick={toggleMenu}
            className="text-white hover:text-indigo-300 transition-colors p-3"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* HAMBURGER SECTION ENDS HERE */}

          {/* CENTERED LOGO STARTS HERE - FIXED SIZES FOR DIFFERENT SCREEN SIZES */}
          <div 
            className="w-16 h-16 md:w-24 md:h-24 transition-all duration-300 cursor-pointer hover:scale-105"
            onClick={handleLogoClick}
          >
            <Canvas camera={{ position: [0, 0, 3] }}>
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
          {/* CENTERED LOGO ENDS HERE */}

          {/* BAG BUTTON SECTION STARTS HERE */}
          <button 
            onClick={toggleCart}
            className="text-white text-sm md:text-base uppercase tracking-widest font-light hover:text-indigo-300 transition-colors cursor-pointer p-3"
          >
            Bag
          </button>
          {/* BAG BUTTON SECTION ENDS HERE */}

        </div>
        {/* MOBILE AND TABLET VIEW ENDS HERE */}
      </header>

      {/* MOBILE SIDE BAR STARTS HERE*/}
      <div 
        ref={menuSidebarRef}
        className="fixed inset-0 z-40 bg-[#f8f5f0] transform -translate-x-full lg:hidden"
      >
        <div className="h-full flex flex-col p-8 pt-24">
          {/* Header with Name and Close Button */}
          <div className="flex justify-between items-center mb-16 px-4">
            <span className="text-black text-xl font-medium">Name</span>
            <button 
              onClick={closeMenu}
              className="text-black hover:text-gray-600 transition-colors p-2"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items with proper spacing */}
          <div className="flex flex-col space-y-8 px-6">
            <span className="text-black text-lg uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer py-4 border-b border-gray-200">Shop</span>
            <span className="text-black text-lg uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer py-4 border-b border-gray-200">Our Story</span>
            <span className="text-black text-lg uppercase tracking-widest font-light hover:text-gray-600 transition-colors cursor-pointer py-4 border-b border-gray-200">Lookbook</span>
          </div>

        </div>
      </div>
      {/* MOBILE SIDEBAR ENDS HERE */}

      {/* MOBILE CART SIDEBAR STARTS HERE */}
      <div 
        ref={cartSidebarRef}
        className="fixed inset-0 z-40 bg-[#f8f5f0] transform translate-x-full lg:hidden"
      >
        <div className="h-full flex flex-col p-8 pt-24">
          {/* Header with Name and Close Button */}
          <div className="flex justify-between items-center mb-16 px-4">
            <span className="text-black text-xl font-medium">Bag</span>
            <button 
              onClick={closeCart}
              className="text-black hover:text-gray-600 transition-colors p-2"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 flex items-center justify-center px-6">
            <p className="text-gray-500 text-center text-lg">Your bag is empty</p>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 px-6">
            <button className="w-full bg-black text-white py-4 px-6 text-base uppercase tracking-widest font-light hover:bg-gray-800 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </div>
      {/* MOBILE CART SIDEBAR ENDS HERE */}

      {/* OVERLAY STARTS HERE */}
      {(isMenuOpen || isCartOpen) && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => {
            if (isMenuOpen) closeMenu();
            if (isCartOpen) closeCart();
          }}
        ></div>
      )}
      {/* OVERLAY ENDS HERE */}

    </>
  );
}

export default Header;