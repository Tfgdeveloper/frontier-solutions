import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "../ui/GradientButton";

export default function Header() {
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
              src="images/Frontier Solution Final File-01.png"
              alt="Frontier Solution"
              className="h-7 sm:h-8 md:h-16 lg:h-18 w-auto object-contain transition-all duration-500"
            />
          </motion.div>

          {/* ── DESKTOP NAV (THE PILL) ── */}
          <nav
            className={`hidden lg:flex items-center gap-2 p-1.5 rounded-full border bg-black/20 border-white/10 backdrop-blur-xl transition-all duration-500 ${
              scrolled ? "px-4" : "px-6"
            }`}
          >
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-[11px] uppercase font-semibold transition-colors text-white/70 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* ── RIGHT ACTIONS (desktop) ── */}
          <div className="hidden lg:flex items-center gap-6 z-[110]">
            <GradientButton />
          </div>

          {/* ── MOBILE ACTIONS: hamburger, stays visible below lg ── */}
          <div className="flex items-center gap-3 lg:hidden z-[110]">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="p-2"
            >
              <div
                className={`w-7 h-[2px] mb-1.5 bg-white transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <div
                className={`w-7 h-[2px] bg-white transition-all duration-300 ${
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