import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";


export default function ProductGrid() {
const items = [
{ id: 1, title: "FRAGMENT", price: "120€", tags: ["Nouveau", "Hoodie"], img: "/assets/hoodie.jpg" },
{ id: 2, title: "AMNESIA", price: "35€", tags: ["Nouveau", "Bob"], img: "/assets/bob.jpg" },
{ id: 3, title: "QUIET REMORSE", price: "44€", tags: ["Nouveau", "T-shirt"], img: "/assets/tshirt.jpg" },
];


return (
<section className="px-8 py-8">
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
{items.map((it) => (<ProductCard key={it.id} item={it} />))}
</div>
</section>
);
}


function ProductCard({ item }) {
const ref = useRef();


useEffect(() => {
const el = ref.current;
const enter = () => gsap.to(el, { y: -6, duration: 0.35, ease: "power2.out" });
const leave = () => gsap.to(el, { y: 0, duration: 0.45, ease: "power2.out" });
el.addEventListener("mouseenter", enter);
el.addEventListener("mouseleave", leave);
return () => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); };
}, []);


return (
<article ref={ref} className="bg-gray-900/40 rounded-md overflow-hidden relative border border-white/10">
<div className="absolute top-4 left-4 flex gap-2 z-10">{item.tags.map((t) => (<span key={t} className="px-3 py-1 rounded-md bg-white/6 border border-white/12 text-sm">{t}</span>))}</div>
<div className="aspect-[4/5] bg-gray-200"><div className="w-full h-full bg-[url('/assets/placeholder.jpg')] bg-center bg-cover" /></div>
<div className="p-6 bg-black"><h3 className="font-mono tracking-wide">{item.title}</h3>
<div className="mt-4 flex items-center justify-between"><div className="text-sm text-white/70">{item.price}</div>
<div className="flex items-center gap-3"><button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">◑</button><button className="px-3 py-2 border border-white/20 rounded-md">Voir</button></div></div></div>
</article>
);
}