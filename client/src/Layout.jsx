
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { useLoading } from "./context/LoadingContext/LoadingContext";
// import Header from "./components/Header/Header";
// import { Outlet } from "react-router-dom";
// import Footer from "./components/Footer/Footer";

// function Layout() {
//   const { isLoading } = useLoading();

//   return (
//     <>
//       <Header isLoading={isLoading} />
//       <Outlet />
//       <Footer />
//     </>
//   );
// }

// export default Layout;




// Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Refresh ScrollTrigger whenever route changes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [location]);

  return (
    <>
    <Header />
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* ✅ Header at the top */}
      

      {/* ✅ Main content from nested routes */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ✅ Footer at the bottom */}
      <Footer />
    </div>
    </>
    
  );
}
