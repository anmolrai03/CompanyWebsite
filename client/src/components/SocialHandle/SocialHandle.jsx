import React from "react";
import ButtonElement from "../utils/ButtonElement/ButtonElement";
import { MoveUpRight, CornerDownRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SocialHandle() {
  return (
    <section className="px-6 py-12 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto">


        <div className="hidden md:flex md:flex-col items-start justify-between">

          {/* HEADINGS SECTION */}
          <div className="flex flex-row justify-between w-full mb-6 ">

            <div className="flex-1">
              <h4 className="text-sm text-white/60 tracking-widest font-kite">
                KNOW MORE
              </h4>
            </div>
            <div className="flex-1">
              <h4 className="text-sm text-white/60 tracking-widest font-kite">
                SOCIAL LINKS
              </h4>
            </div>
            <div className="flex-1">
              <h4 className="text-sm text-white/60 tracking-widest font-kite">
                EXTERNAL LINKS
              </h4>
            </div>
            <div className="flex-1">
              {/* Empty div to align with Contact Us section */}
            </div>
          </div>

          {/* LIST ITEMS SECTION */}
          <div className="flex flex-row justify-between w-full">

            {/* KNOW MORE ITEMS */}
            <div className="flex-1">
              <ul className="flex flex-col justify-between text-white/80 font-kite text-base w-full h-full">

                <li className="flex hover:text-white cursor-pointer transition">
                  Terms and Conditions
                </li>
                <li className="flex hover:text-white cursor-pointer transition">
                  Work Policy
                </li>
                <li className="flex hover:text-white cursor-pointer transition">
                  Privacy Policy
                </li>
              </ul>
            </div>

            {/* SOCIAL LINKS ITEMS */}
            <div className="flex-1">
              <ul className="flex flex-col justify-between text-white/80 font-kite text-base w-full h-full">
                <li className="hover:text-white cursor-pointer transition">
                  Instagram
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Twitter
                </li>
                <li className="hover:text-white cursor-pointer transition">
                  Facebook
                </li>
              </ul>
            </div>

            {/* EXTERNAL LINKS ITEMS */}
            <div className="flex-1">
              <div className="flex flex-col justify-between text-white/80 font-kite text-base w-full h-full gap-y-3">
                <div className="flex items-center gap-3">
                  <ButtonElement icon={MoveUpRight} />
                </div>
                <div className="flex items-center gap-3">
                  <ButtonElement icon={MoveUpRight} />
                </div>
                <div className="flex items-center gap-3">
                  <ButtonElement icon={MoveUpRight} />
                </div>
              </div>
            </div>

            {/* CONTACT BUTTON SECTION */}
            <NavLink to="/pages/contact" className="flex-1 flex justify-end">
              <div className="flex w-full h-full items-center gap-3 justify-center">
                <ButtonElement icon={CornerDownRight} />
                <ButtonElement name="Contact Us" />
              </div>
            </NavLink>

          </div>
        </div>

        {/* MOBILE LAYOUT SECTION STARTS HERE*/}
        <div className="flex flex-col md:hidden">
          {/* SOCIAL + MORE INFO INLINE SECTION starts here*/}
          <div className="flex justify-between gap-3 mb-8 ">
            {/* MORE INFO */}
            <div className="flex-1 text-left">
              <ul className="space-y-2 text-white/80 font-mono">
                <li>
                  <h4 className=" text-white/60 tracking-widest text-base">
                    KNOW MORE
                  </h4>
                </li>
                <li className="hover:text-white cursor-pointer transition text-kite text-sm">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer transition text-kite text-sm">
                  Work Policy
                </li>
                <li className="hover:text-white cursor-pointer transition text-kite text-sm">
                  Privacy Policy
                </li>
              </ul>
            </div>

            {/* SOCIALS */}
            <div className="flex-1 text-right">
              <ul className="space-y-1">
                <li>
                  <h4 className=" text-white/60 tracking-widest font-mono">
                    MEDIA
                  </h4>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white cursor-pointer transition text-kite text-sm"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white cursor-pointer transition text-kite text-sm"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white cursor-pointer transition text-kite text-sm"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* SOCIAL + MORE INFO INLINE SECTION ends here*/}

          {/* CONTACT US BUTTON */}
          <NavLink to="/pages/contact" className="flex-1">
            <button className="w-full bg-black/60 border border-white/20 px-4 py-4 rounded-md hover:bg-white/10 transition flex items-center justify-center gap-2 text-white/80 hover:text-white">
              <CornerDownRight size={16} />
              <span className="text-sm  text-kite">Contact us</span>
            </button>
          </NavLink>
        </div>
        {/* MOBILE LAYOUT SECTION ENDS HERE*/}

      </div>
    </section>
  );
}
