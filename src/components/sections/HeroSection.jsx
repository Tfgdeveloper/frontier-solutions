import React, { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import GradientButton from "../../components/ui/GradientButton";

export default function HeroSection({ dark }) {
  const containerRef = useRef(null);
  
  // ── MOUSE INTERACTION (CUBERTO STYLE) ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax for the background orb
  const orbX = useTransform(smoothMouseX, [0, 1920], [-40, 40]);
  const orbY = useTransform(smoothMouseY, [0, 1080], [-40, 40]);

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen w-full flex flex-col justify-center overflow-hidden transition-colors duration-1000 py-35 ${
        dark ? "bg-[#0A0A0B]" : "bg-[#F9F9F9]"
      }`}
    >
      {/* ── BACKGROUND: THE "GRAINY LIQUID" ORB ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ x: orbX, y: orbY }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`relative w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full blur-[100px] opacity-40 ${
            dark 
            ? "bg-gradient-to-tr from-indigo-900 via-purple-800 to-orange-900" 
            : "bg-gradient-to-tr from-blue-100 via-orange-100 to-purple-100"
          }`}
        />
      </div>

      {/* ── TEXTURE: FILM GRAIN OVERLAY ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.4] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grainy">
            <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grainy)" />
        </svg>
      </div>

      {/* ── UI DECOR: AGENCY SPECS (Locomotive Style) ── */}
    

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pointer-events-none">
        
        {/* TOP LINE: ASYMMETRIC HEADER */}
        <div className="flex flex-col mb-4">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className={`text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-6 ${dark ? "text-orange-500" : "text-orange-600"}`}
          >
            Award Winning Excellence
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-[clamp(3.5rem,15vw,10rem)] font-extrabold leading-[0.8] tracking-tighter ${dark ? "text-white" : "text-[#262262]"}`}
            >
              FRONTIER
            </motion.h1>
          </div>
        </div>

        {/* BOTTOM LINE: OFFSET TEXT & CTA */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between mt-[-2vw]">
          {/* Decorative Circle (Liquid feel) */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`hidden lg:block w-32 h-32 rounded-full border ${dark ? "border-white/10" : "border-black/10"}`}
          />

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-[clamp(3.5rem,15vw,10rem)] font-extrabold leading-[0.8] tracking-tighter ${dark ? "text-white" : "text-[#262262]"}`}
            >
              SOLUTIONS
            </motion.h1>
          </div>
        </div>

        {/* ── INTERACTIVE ROW ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-col md:flex-row items-center gap-12 pointer-events-auto"
        >
          {/* The Magnetic Button Area */}
          <div className="relative group p-4">
             <GradientButton />
          </div>

          <p className={`max-w-md text-base md:text-xl font-light leading-relaxed ${dark ? "text-white/60" : "text-black/60"}`}>
            A hybrid digital engine specializing in high-end 
            <span className={dark ? "text-white" : "text-black"}> experiences</span>, 
            performance advertising, and 
            <span className={dark ? "text-white" : "text-black"}> brand identity</span>.
          </p>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div 
         animate={{ y: [0, 10, 0] }}
         transition={{ repeat: Infinity, duration: 2 }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className={`w-[1px] h-20 ${dark ? "bg-gradient-to-b from-white/40 to-transparent" : "bg-gradient-to-b from-black/40 to-transparent"}`} />
      </motion.div>
    </section>
  );
}