
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLoading } from "./context/LoadingContext/LoadingContext";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function Layout() {
  const { isLoading } = useLoading();

  return (
    <>
      <Header isLoading={isLoading} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
