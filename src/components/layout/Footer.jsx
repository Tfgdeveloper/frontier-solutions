import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import GradientButton from "../ui/GradientButton";

// ── LINK: underline draws in on hover ──
function FooterLink({ href, children }) {
  return (
    <a href={href} className="relative inline-block group/link w-fit">
      {children}
      <span className="absolute left-0 -bottom-0.5 h-[1px] w-full bg-orange-500 scale-x-0 origin-left transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
    </a>
  );
}

const columnVariants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.12 } },
};
const colItem = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  // ── MOUSE TRACKING FOR CTA SPOTLIGHT ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlightX = useTransform(smoothX, (val) => `${val}px`);
  const spotlightY = useTransform(smoothY, (val) => `${val}px`);

  // Show "back to top" after scrolling a bit
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative pt-20 pb-10 transition-colors duration-1000 bg-transparent">
      <div className="max-w-[1600px] mx-auto px-6 mb-24">
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full rounded-[60px] overflow-hidden group flex flex-col items-center justify-center p-10 transition-shadow duration-700 shadow-2xl 
            bg-[#0A0A0B] shadow-orange-950/20 border border-white/5"
      
        >
          {/* ── BACKGROUND ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-10%] left-[-10%] w-[60%] h-[70%] rounded-full blur-[120px] opacity-40 bg-[#262262] "
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full blur-[140px] opacity-30 bg-[#F06A22]"
            />
            <motion.div
              className="absolute z-10 w-[600px] h-[600px] rounded-full opacity-60"
              style={{
                left: spotlightX,
                top: spotlightY,
                translateX: "-50%",
                translateY: "-50%",
                background: "radial-gradient(circle, rgba(240, 106, 34, 0.15) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
            <svg width="100%" height="100%">
              <filter id="cta-noise"><feTurbulence baseFrequency="0.6" /></filter>
              <rect width="100%" height="100%" filter="url(#cta-noise)" />
            </svg>
          </div>

          {/* ── CONTENT ── */}
          <div className="relative z-20 text-center max-w-4xl px-4">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] md:text-[12px] uppercase font-semibold mb-6 block text-orange-500"
            >
              Ready for your next frontier?
            </motion.span>

            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4 text-white">
              Growth without <br /> limits
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#F06A22]"
              >
                .
              </motion.span>
            </h2>

            <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-6 leading-relaxed text-white/50">
              Scale your digital presence today. We combine engineering excellence with brand intuition to build your future.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <GradientButton />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── MAIN LINKS SECTION ── */}
      <motion.div
        variants={columnVariants}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1600px] mx-auto px-10 md:px-20 pb-14 grid grid-cols-1 md:grid-cols-12 gap-16"
      >
        {/* Brand Column */}
        <motion.div variants={colItem} className="md:col-span-6 max-w-full space-y-6">
          <img
            src="images/Frontier Solution Final File-01.png"
            alt="Frontier Solution"
            className="h-15 md:h-18 w-auto object-contain transition-all duration-500"
          />
          <p className="max-w-sm text-md text-white/60 font-thin">
            Based in Dubai & Paris. We engineer high-performance visual ecosystems for market leaders.
          </p>
        </motion.div>

        {/* Links Columns */}
        <div className="md:col-span-6 grid grid-cols-2 lg:grid-cols-3 gap-2">
          <motion.div variants={colItem} className="space-y-6">
            <h4 className="text-[14px] uppercase font-thin text-white">Main</h4>
            <ul className="text-md font-thin space-y-4 text-white/60">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/about">About</FooterLink></li>
              <li><FooterLink href="/services">Services</FooterLink></li>
              <li><FooterLink href="/work">Work</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </motion.div>

          <motion.div variants={colItem} className="space-y-6">
            <h4 className="text-[14px] uppercase font-thin text-white">Services</h4>
            <ul className="text-md font-thin space-y-4 text-white/60">
              <li><FooterLink href="#">Web Development</FooterLink></li>
              <li><FooterLink href="#">Mobile Apps</FooterLink></li>
              <li><FooterLink href="#">AI & Automation</FooterLink></li>
              <li><FooterLink href="#">UI/UX Design</FooterLink></li>
              <li><FooterLink href="#">Cloud / DevOps</FooterLink></li>
              <li><FooterLink href="#">Branding</FooterLink></li>
              <li><FooterLink href="#">Public Sector</FooterLink></li>
            </ul>
          </motion.div>

          <motion.div variants={colItem} className="space-y-6">
            <h4 className="text-[14px] uppercase font-thin text-white">Contact Us</h4>
            <ul className="text-md font-thin space-y-4 text-white/60">
              <li><FooterLink href="mailto:hello@frontier-solution.pk">hello@frontier-solution.pk</FooterLink></li>
              <li><FooterLink href="#">43/M, 43rd Street, PECHS Block 6, Karachi, Pakistan</FooterLink></li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* ── FOOTER BOTTOM ── */}
      <div className="max-w-[1600px] mx-auto px-10 md:px-20 pt-5 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <p className="text-[16px] font-thin text-center text-white/20">
            Copyright © {currentYear} Frontier Solutions Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── BACK TO TOP ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center border shadow-lg bg-white text-black border-white/10"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}