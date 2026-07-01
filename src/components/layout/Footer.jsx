import React, { useRef } from "react";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {  Search, Globe, ArrowRight } from "lucide-react";
import GradientButton from "../ui/GradientButton";

export default function Footer({ dark }) {
  const currentYear = new Date().getFullYear();
    const containerRef = useRef(null);

  // ── MOUSE TRACKING LOGIC ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the banner
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Spotlight position
  const spotlightX = useTransform(smoothX, (val) => `${val}px`);
  const spotlightY = useTransform(smoothY, (val) => `${val}px`);

  return (
    <footer className={`pt-20 pb-10 transition-colors duration-1000 ${
      dark ? "bg-[#0A0A0B]" : "bg-[#F9F9F9]"
    }`}>
      
     <div className="max-w-[1600px] mx-auto px-6 mb-24">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative w-full rounded-[60px] overflow-hidden group flex flex-col items-center justify-center p-10 transition-shadow duration-700 shadow-2xl ${
          dark 
            ? "bg-[#0A0A0B] shadow-orange-950/20 border border-white/5" 
            : "bg-[#F3F4F6] shadow-indigo-900/10 border border-black/5"
        }`}
      >
        {/* ── INTERACTIVE GRADIENT LAYER ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Main Animated Orbs (Hero Style) */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className={`absolute top-[-10%] left-[-10%] w-[60%] h-[70%] rounded-full blur-[120px] opacity-40 ${
              dark ? "bg-[#262262]" : "bg-indigo-200"
            }`}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full blur-[140px] opacity-30 ${
              dark ? "bg-[#F06A22]" : "bg-orange-200"
            }`}
          />

          {/* MOUSE SPOTLIGHT GLOW */}
          <motion.div
            className="absolute z-10 w-[600px] h-[600px] rounded-full opacity-60"
            style={{
              left: spotlightX,
              top: spotlightY,
              translateX: "-50%",
              translateY: "-50%",
              background: dark
                ? "radial-gradient(circle, rgba(240, 106, 34, 0.15) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(38, 34, 98, 0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* ── TEXTURE LAYER (Noise) ── */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%">
            <filter id="cta-noise"><feTurbulence baseFrequency="0.6" /></filter>
            <rect width="100%" height="100%" filter="url(#cta-noise)" />
          </svg>
        </div>

        {/* ── CONTENT (CENTERED) ── */}
        <div className="relative z-20 text-center max-w-4xl px-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`text-[10px] md:text-[12px] uppercase font-semibold mb-6 block ${
              dark ? "text-orange-500" : "text-[#F06A22]"
            }`}
          >
            Ready for your next frontier?
          </motion.span>
          
          <h2 className={`text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4 ${
            dark ? "text-white" : "text-[#262262]"
          }`}>
            Growth without <br /> <span className="text-[#F06A22]">limits.</span>
          </h2>
          
          <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto mb-6 leading-relaxed ${
            dark ? "text-white/50" : "text-black/50"
          }`}>
            Scale your digital presence today. We combine engineering excellence with brand intuition to build your future.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* The Main High-Impact Button */}
            <GradientButton/>
          </div>
        </div>

        {/* ── DECORATIVE LOGO MASK ── */}
        
      </motion.div>
    </div>

      {/* ── MAIN LINKS SECTION ── */}
      <div className="max-w-[1600px] mx-auto px-10 md:px-20 pb-20 grid grid-cols-1 md:grid-cols-12 gap-16">
        
        {/* Brand Column */}
        <div className="md:col-span-6 max-w-full space-y-6 ">
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
           <p className={`max-w-sm text-md  ${dark ? "text-white/60 font-thin" : "text-black"}`}>
             Based in Dubai & Paris. We engineer high-performance visual ecosystems for market leaders.
           </p>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-6 grid grid-cols-2 lg:grid-cols-3 gap-2 ">
            {/* Column 1 */}
            <div className="space-y-6">
               <h4 className={`text-[14px] uppercase font-thin ${dark ? "text-white" : "text-black"}`}>Main</h4>
               <ul className={`text-md font-thin space-y-4 ${dark ? "text-white/60 font-thin" : "text-black"}`}>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Services</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Work</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
               </ul>
            </div>
            {/* Column 2 */}
            <div className="space-y-6">
               <h4 className={`text-[14px] uppercase font-thin ${dark ? "text-white" : "text-black"}`}>Services</h4>
               <ul className={`text-md font-thin space-y-4 ${dark ? "text-white/60 font-thin" : "text-black"}`}>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Web Development</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Mobile Apps</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">AI & Automation</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">UI/UX Design</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Cloud / DevOps</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Branding</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">Public Sector</a></li>
               </ul>
            </div>
            {/* Column 3 */}
            <div className="space-y-6">
               <h4 className={`text-[14px] uppercase font-thin ${dark ? "text-white" : "text-black"}`}>Contact Us</h4>
               <ul className={`text-md font-thin space-y-4 ${dark ? "text-white/60 font-thin" : "text-black"}`}>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">hello@frontier-solution.pk</a></li>
                  <li><a href="#" className="hover:text-orange-500 transition-colors">43/M, 43rd Street,
PECHS Block 6, Karachi, Pakistan</a></li>
               </ul>
            </div>
           
        </div>
      </div>

      {/* ── FOOTER BOTTOM (Copyright & Legal) ── */}
      <div className={`max-w-[1600px] mx-auto px-10 md:px-20 pt-5 border-t ${dark ? "border-white/5" : "border-black/5"}`}>
        <div className="flex flex-col md:flex-row justify-center items-center ">
           <p className={`text-[16px] font-thin text-center ${dark ? "text-white/20" : "text-black"}`}>
             Copyright © {currentYear} Frontier Solutions Inc. All rights reserved.
           </p>
           
        </div>
      </div>
    </footer>
  );
}