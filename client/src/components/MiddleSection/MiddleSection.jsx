// =====================
// File: src/App.jsx
// =====================
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// updated imports with new names
import TopPage from "./components/blocks/TopPage";
import MiddlePage from "./components/blocks/MiddlePage";
import LargeImage from "./components/blocks/LargeImage";
import SmallTile from "./components/blocks/SmallTile";
import ProductGrid from "./components/blocks/ProductGrid";
import Showcase from "./components/blocks/Showcase";
import BottomPage from "./components/blocks/BottomPage";


// register ScrollTrigger once at app start
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <TopPage />
      <MiddlePage />

      <LargeImage
        src={
          "https://imgs.search.brave.com/md2jlyFiuXs1zxy-dUYFMaUYYzqRW4-6z2GVjnV4Vh0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM5LzMx/Lzg2LzM5MzE4Njky/YmFmN2ZhYWRlMTNk/MWQ1ZTJjOWJhMDg5/LmpwZw"
        }
        alt="Models wearing collection"
        height="140vh"
        pinSpacer={true}
        caption="Qui sommes-nous"
        showDots={true}
        cover={true}
      />

      <SmallTile title="NOUVELLE COLLECTION" subtitle="Nos produits" />
      <ProductGrid />
      <Showcase />
      <BottomPage />
    </div>
  );
}
