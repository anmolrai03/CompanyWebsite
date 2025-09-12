import React from "react";

export default function BottomPage() {
  return (
    <footer className="px-8 py-12 border-t border-white/6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-sm text-white/60 tracking-widest">PLUS D'INFOS</h4>
          <ul className="mt-6 space-y-3 text-white/80">
            <li>CGV</li>
            <li>Retours et Échanges</li>
            <li>Politique de Confidentialité</li>
          </ul>
        </div>
        <div className="text-center">
          <h4 className="text-sm text-white/60 tracking-widest">Social</h4>
          <ul className="mt-6 space-y-3">
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
          </ul>
        </div>
        <div className="text-right">
          <button className="bg-black/60 border border-white/20 px-4 py-2 rounded-md">
            Nous contacter
          </button>
        </div>
      </div>
    </footer>
  );
}
