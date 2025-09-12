import React from "react";

export default function TopPage() {
  return (
    <header className="w-full px-8 py-6 flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <NavButton>Boutique</NavButton>
        <NavButton>Notre histoire</NavButton>
        <NavButton>Lookbook</NavButton>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="w-12 h-12 flex items-center justify-center text-black bg-white rounded-full shadow">
          LOGO
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <CartButton />
      </div>
    </header>
  );
}

function NavButton({ children }) {
  return (
    <button className="bg-black/60 border border-white/20 px-4 py-2 rounded-md text-white/90 backdrop-blur-sm hover:bg-white/5 transition">
      {children}
    </button>
  );
}

function CartButton() {
  return (
    <div className="flex items-center gap-3">
      <button className="bg-black/60 border border-white/20 px-4 py-2 rounded-md">
        Tous nos articles
      </button>
      <button className="bg-black/60 border border-white/20 px-4 py-2 rounded-md flex items-center gap-2">
        👜 SAC / 0
      </button>
    </div>
  );
}
