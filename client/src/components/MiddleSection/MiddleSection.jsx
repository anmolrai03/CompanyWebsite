import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

// your blocks
import MiddlePage from "../blocks/MiddlePage";
import LargeImage from "../blocks/LargeImage";
import ProductGrid from "../blocks/ProductGrid";
import Showcase from "../blocks/Showcase";
import BottomPage from "../blocks/BottomPage";

// register plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // example scroll animation
    gsap.from(".animate-me", {
      scrollTrigger: {
        trigger: ".animate-me",
        start: "top 80%",   // when element enters viewport
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* <TopPage /> */}
      {/* <MiddlePage /> */}

      {/* <ProductGrid /> */}

      {/* <LargeImage
        src="https://imgs.search.brave.com/md2jlyFiuXs1zxy-dUYFMaUYYzqRW4-6z2GVjnV4Vh0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM5LzMx/Lzg2LzM5MzE4Njky/YmFmN2ZhYWRlMTNk/MWQ1ZTJjOWJhMDg5/LmpwZw"
        alt="Models wearing collection"
        height="140vh"
        pinSpacer={true}
        caption="Qui sommes-nous"
        showDots={true}
        cover={true}
      /> */}

      {/* <Showcase /> */}
      <BottomPage />
    </div>
  );
}
