import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "../ui/GradientButton";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header({ dark, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#work" },
    { name: "About", href: "#industries" },
    { name: "Services", href: "#about" },
    { name: "Work", href: "#about" },
    { name: "Contact", href: "#about" },
  ];
  
  

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-10 ${
          scrolled ? "py-2 backdrop-blur-sm" : "py-10"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* ── LOGO ── */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-[110]"
          >
            <img
              src={dark ? "images/Frontier Solution Final File-01.png" : "images/Frontier Solution Final File-03.png"}
              alt="Frontier Solution"
              className="h-8 md:h-18 w-auto object-contain transition-all duration-500"
            />
          </motion.div>

          {/* ── DESKTOP NAV (THE PILL) ── */}
          <nav 
            className={`hidden lg:flex items-center gap-2 p-1.5 rounded-full border transition-all duration-500 ${
              dark 
                ? "bg-black/20 border-white/10 backdrop-blur-xl" 
                : "bg-white/ border-black/5 backdrop-blur-xl"
            } ${scrolled ? "px-4" : "px-6"}`}
          >
                    {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`px-4 py-2 text-[11px] uppercase font-semibold transition-colors ${
                  dark ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* ── RIGHT ACTIONS ── */}
          <div className="hidden lg:flex items-center gap-6 z-[110]">
            {/* Theme Toggle */}
            <button 
              onClick={toggleDark}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                dark ? "border-white/10 text-white hover:bg-white/10" : "border-black/5 text-black hover:bg-black/5"
              }`}
            >
              {dark ? (
                <FaSun className="w-5 h-5 text-white/60" />
              ) : (
                <FaMoon className="w-5 h-5 text-black/60" />
              )}
            </button>
            <GradientButton />
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden z-[110] p-2"
          >
            <div className={`w-8 h-[2px] mb-2 transition-all ${dark || menuOpen ? "bg-white" : "bg-black"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-8 h-[2px] transition-all z-50 ${dark || menuOpen ? "bg-white" : "bg-black"} ${menuOpen ? "-rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* ── FULLSCREEN OVERLAY MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] bg-[#0A0A0B] flex flex-col justify-center px-10"
          >
            
            {/* Grain Texture */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none invert">
               <svg width="100%" height="100%"><filter id="n"><feTurbulence baseFrequency="0.7"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
            </div>

            <nav className="flex flex-col space-y-4">
              <p className="text-orange-500 text-[10px] uppercase tracking-[1em] mb-4">Nav</p>
             {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`text-white text-5xl font-bold tracking-tighter hover:text-orange-500 transition-colors ${
                  dark ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black"
                }`}
              >
                {item.name}
              </a>
            ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
