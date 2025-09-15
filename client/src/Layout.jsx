
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLoading } from "./context/LoadingContext/LoadingContext";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function Layout() {
  const { isLoading } = useLoading();
  const headerRef = useRef(null);

  useEffect(() => {
    if (!isLoading && headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 }, // slide down from top OR bottom (your choice)
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }
  }, [isLoading]);

  return (
    <>
      {/* <div ref={headerRef}> */}
        <Header isLoading={isLoading} />
      {/* </div> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
