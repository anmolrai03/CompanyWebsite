import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Section */}
        <div>
          <h3 className="uppercase text-gray-400 text-sm mb-3 tracking-wide">
            More Informations
          </h3>
          <ul className="space-y-2 text-primary">
            <li><a href="#" className="hover:underline">T&amp;CS</a></li>
            <li><a href="#" className="hover:underline">Returns and Exchanges</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-center text-center">
          {/* Replace with your logo */}
          <div className="text-3xl font-bold tracking-widest mb-4">
            LOGO
          </div>
          <ul className="space-y-2 text-primary">
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Facebook</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end space-y-3">
          <button className="text-btn">Contact Us</button>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-800 mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>
          Design by <a href="#" className="hover:underline">Thomas B</a>
        </p>
        <p>
          Dev by <a href="#" className="hover:underline">Teo3tc</a>
        </p>
      </div>
    </footer>
  );
}
