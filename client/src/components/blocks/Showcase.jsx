import React from "react";
import SmallTile from "./SmallTile";


export default function Showcase() {
return (
<section className="px-8 py-16">
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
<div className="col-span-2">
<h3 className="text-6xl font-light leading-tight">ÉLÉGANCE ET AUTHENTICITÉ</h3>
<p className="mt-6 text-sm text-white/70">Une collection "Memory" disponible dès maintenant</p>
<div className="mt-8 flex gap-4"><SmallTile>👕</SmallTile><SmallTile>🧥</SmallTile><SmallTile>🎩</SmallTile></div>
</div>
<div className="col-span-1"><div className="rounded-md overflow-hidden border border-white/10"><div className="aspect-square bg-center bg-cover p-6 relative" style={{backgroundImage: "url('https://imgs.search.brave.com/md2jlyFiuXs1zxy-dUYFMaUYYzqRW4-6z2GVjnV4Vh0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM5LzMx/Lzg2LzM5MzE4Njky/YmFmN2ZhYWRlMTNk/MWQ1ZTJjOWJhMDg5/LmpwZw')"}}><div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-md">Chapeau</div></div></div></div>
</div>
</section>
);
}