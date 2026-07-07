import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "../ui/GradientButton";
import { FaMoon, FaSun } from "react-icons/fa";
import { X } from "lucide-react";

export default function Header({ dark, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll while the fullscreen menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* NOTE: header z-index raised above the overlay (was the bug — a nested
          z-110 button can't out-stack a sibling z-105 overlay once its parent
          header creates its own stacking context at z-100). */}
      <header
        className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-500 px-4 sm:px-6 md:px-10 ${
          scrolled ? "py-2 backdrop-blur-sm" : "py-5 md:py-10"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* ── LOGO ── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="z-[110] shrink-0">
            <img
              src={dark ? "images/Frontier Solution Final File-01.png" : "images/Frontier Solution Final File-03.png"}
              alt="Frontier Solution"
              className="h-7 sm:h-8 md:h-16 lg:h-18 w-auto object-contain transition-all duration-500"
            />
          </motion.div>

          {/* ── DESKTOP NAV (THE PILL) ── */}
          <nav
            className={`hidden lg:flex items-center gap-2 p-1.5 rounded-full border transition-all duration-500 ${
              dark ? "bg-black/20 border-white/10 backdrop-blur-xl" : "bg-white/60 border-black/5 backdrop-blur-xl"
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

          {/* ── RIGHT ACTIONS (desktop) ── */}
          <div className="hidden lg:flex items-center gap-6 z-[110]">
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                dark ? "border-white/10 text-white hover:bg-white/10" : "border-black/5 text-black hover:bg-black/5"
              }`}
            >
              {dark ? <FaSun className="w-5 h-5 text-white/60" /> : <FaMoon className="w-5 h-5 text-black/60" />}
            </button>
            <GradientButton />
          </div>

          {/* ── MOBILE ACTIONS: theme toggle + hamburger, both stay visible below lg ── */}
          <div className="flex items-center gap-3 lg:hidden z-[110]">
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                dark ? "border-white/10 text-white hover:bg-white/10" : "border-black/5 text-black hover:bg-black/5"
              }`}
            >
              {dark ? <FaSun className="w-4 h-4 text-white/60" /> : <FaMoon className="w-4 h-4 text-black/60" />}
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="p-2"
            >
              <div
                className={`w-7 h-[2px] mb-1.5 transition-all duration-300 ${
                  dark || menuOpen ? "bg-white" : "bg-black"
                } ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <div
                className={`w-7 h-[2px] transition-all duration-300 ${dark || menuOpen ? "bg-white" : "bg-black"} ${
                  menuOpen ? "-rotate-45" : ""
                }`}
              />
            </button>
          </div>
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
            className="fixed inset-0 z-[115] bg-[#0A0A0B] flex flex-col justify-center px-6 sm:px-10"
          >
            {/* Grain texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none invert">
              <svg width="100%" height="100%">
                <filter id="n"><feTurbulence baseFrequency="0.7" /></filter>
                <rect width="100%" height="100%" filter="url(#n)" />
              </svg>
            </div>

            {/* Explicit close button — always visible, top-right, safe-area aware */}
            

            <nav className="relative flex flex-col space-y-3 sm:space-y-4">
              <p className="text-orange-500 text-[10px] uppercase tracking-[0.6em] sm:tracking-[1em] mb-4">Nav</p>
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                  className="text-white/70 hover:text-orange-500 text-4xl sm:text-5xl font-bold tracking-tighter transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + navLinks.length * 0.06 }}
                className="pt-6"
              >
                <GradientButton />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}