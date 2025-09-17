import React from "react";
import ButtonElement from "../utils/ButtonElement/ButtonElement";
import { ExternalLink, ArrowLeft } from "lucide-react";

export default function SocialHandle() {
  return (
    <section className="px-8 py-12 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left Section - More Info */}
        <div>
          <h4 className="text-sm text-white/60 tracking-widest">MORE INFO</h4>
          <ul className="mt-6 space-y-3 text-white/80 text-sm font-mono">
            <li className="hover:text-white cursor-pointer transition">Terms and Conditions</li>
            <li className="hover:text-white cursor-pointer transition">Returns and Exchanges</li>
            <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Center Section - Social Links */}
        <div className="text-left md:text-center">
          <ul className="space-y-5 font-mono">
            <li className="flex items-center justify-start md:justify-center gap-3">
              <span className="text-white/80 hover:text-white cursor-pointer">Instagram</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <ButtonElement icon={ExternalLink} />
              </a>
            </li>
            <li className="flex items-center justify-start md:justify-center gap-3">
              <span className="text-white/80 hover:text-white cursor-pointer">Twitter</span>
              <ButtonElement icon={ExternalLink} />
            </li>
            <li className="flex items-center justify-start md:justify-center gap-3">
              <span className="text-white/80 hover:text-white cursor-pointer">Facebook</span>
              <ButtonElement icon={ExternalLink} />
            </li>
          </ul>
        </div>

        {/* Right Section - Contact Button */}
        <div className="flex md:justify-end justify-start">
          <div className="flex items-center gap-2">
            <ButtonElement icon={ArrowLeft} />
            <button className="bg-black/60 border border-white/20 px-4 py-2 rounded-md hover:bg-white/10 transition">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
