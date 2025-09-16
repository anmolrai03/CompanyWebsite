import React, { useEffect, useRef } from "react";
// ScrollTrigger is registered in App.jsx; this import ensures type resolution in editors
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

export default function LargeImage({ src, alt = "", height = "140vh", pinSpacer = true, caption = "", cover = true }) {
const wrapRef = useRef(null);
const imgRef = useRef(null);
const tlRef = useRef(null);


useEffect(() => {
const wrap = wrapRef.current;
const img = imgRef.current;
if (!wrap || !img) return;


// Remove previously attached triggers for this element (HMR-safe)
ScrollTrigger.getAll().forEach((st) => {
if (st.vars && st.vars.trigger === wrap) st.kill();
});


const tl = gsap.timeline({
scrollTrigger: {
trigger: wrap,
start: "top top",
end: pinSpacer ? `+=${height}` : "bottom top",
scrub: 0.8,
pin: pinSpacer,
anticipatePin: 1,
},
});


// compute translateY amount (px) based on extra vh
const translateY = typeof height === "string" && height.endsWith("vh")
? (parseFloat(height) - 100) * (window.innerHeight / 100) * -0.8
: -300;


gsap.set(img, { willChange: "transform, filter" });
tl.to(img, { y: translateY, ease: "none" }, 0);


tlRef.current = tl;


return () => {
if (tlRef.current) {
tlRef.current.kill();
tlRef.current = null;
}
ScrollTrigger.getAll().forEach((st) => { if (st.vars && st.vars.trigger === wrap) st.kill(); });
};
}, []);


return (
<section ref={wrapRef} className="relative w-full overflow-hidden" style={{ height }} aria-label={alt || caption || "Large showcase image"}>
<img ref={imgRef} src={src} alt={alt} className={`w-full h-full object-${cover ? "cover" : "contain"} block`} style={{ willChange: "transform, opacity" }} loading="eager" />
<div className="absolute inset-0 pointer-events-none" />
{caption && (
<div className="absolute left-6 bottom-6 bg-black/60 border border-white/20 px-3 py-1 rounded-md text-sm backdrop-blur-sm">{caption}</div>
)}
</section>
);
}

