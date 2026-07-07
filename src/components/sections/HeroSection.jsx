import React, { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import GradientButton from "../../components/ui/GradientButton";

// ── PARTICLE FIELD (particles.js-style canvas background) ──
function ParticleField({ dark }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();

    const COUNT = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    const LINK_DIST = 130;
    const MOUSE_DIST = 160;

    particlesRef.current = Array.from({ length: COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 1.6 + 0.6,
      phase: Math.random() * Math.PI * 2,
    }));

    const dotColor = dark ? "255, 255, 255" : "38, 34, 98";
    const lineColor = dark ? "255, 180, 120" : "38, 34, 98";

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);
    window.addEventListener("resize", resize);

    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);
      const pts = particlesRef.current;
      const mouse = mouseRef.current;

      // update + draw dots
      for (const p of pts) {
        p.x += p.vx + Math.sin(t + p.phase) * 0.3;
        p.y += p.vy + Math.cos(t + p.phase) * 0.3;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const twinkle = 0.5 + 0.5 * Math.sin(t * 1.5 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + twinkle * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${0.35 + twinkle * 0.35})`;
        ctx.fill();
      }

      // connecting lines between nearby particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${lineColor}, ${0.12 * (1 - dist / LINK_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // lines to mouse
        if (mouse.x !== null) {
          const dx = pts[i].x - mouse.x;
          const dy = pts[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_DIST) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${0.3 * (1 - dist / MOUSE_DIST)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
      window.removeEventListener("resize", resize);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}

function AnimatedO({ dark, delay = 0 }) {
  return (
    <motion.span
      className="relative inline-block align-middle"
      style={{ width: "0.72em", height: "0.72em", marginInline: "0.02em" }}
      initial={{ opacity: 0, scale: 0.2, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* the ring that "draws" itself into a full circle */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="50" cy="50" r="42"
          fill="none"
          stroke={dark ? "#333" : "#ddd"}
          strokeWidth="7"
        />
        <motion.circle
          cx="50" cy="50" r="42"
          fill="none"
          stroke={dark ? "#f97316" : "#262262"}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={264}
          initial={{ strokeDashoffset: 264 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* continuous slow rotation once it's fully drawn */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: delay + 1.6 }}
      >
        <circle
          cx="50" cy="50" r="42"
          fill="none"
          stroke={dark ? "#f97316" : "#262262"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 18"
          opacity="0.6"
        />
      </motion.svg>

      {/* pulsing glowing core */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1.15, 1], opacity: [0, 1, 0.7, 1] }}
        transition={{ duration: 1.8, delay: delay + 1.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        className={`absolute inset-[26%] rounded-full ${dark ? "bg-orange-500" : "bg-[#262262]"}`}
        style={{ filter: "blur(0.5px)" }}
      />
    </motion.span>
  );
}


// ── Split text into animated letters ──
function AnimatedWord({ text, delay = 0, className, dark, animateO = false }) {
  return (
    <span className={`inline-flex items-center overflow-hidden ${className}`}>
      {text.split("").map((char, i) => {
        if (animateO && char === "O") {
          return <AnimatedO key={i} dark={dark} delay={delay + i * 0.03} />;
        }
        return (
          <motion.span
            key={i}
            initial={{ y: "110%", rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </span>
  );
}



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

      {/* ── PARTICLE FIELD ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <ParticleField dark={dark} />
      </div>

      {/* ── TEXTURE: FILM GRAIN OVERLAY ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.4] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grainy">
            <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grainy)" />
        </svg>
      </div>

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

          <h1 className={`text-[clamp(3.5rem,15vw,10rem)] font-extrabold leading-[1] tracking-tighter ${dark ? "text-white" : "text-[#262262]"}`}>
  <AnimatedWord text="FRONTIER" delay={0.1} dark={dark} animateO />
</h1>
        </div>

        {/* BOTTOM LINE: OFFSET TEXT & CTA */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between mt-[-2vw]">
          {/* Decorative Circle (Liquid feel) */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 10, -6, 0],
              y: [0, -8, 6, 0],
              rotate: [0, 90, 180],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={`hidden lg:block w-32 h-32 rounded-full border ${dark ? "border-white/10" : "border-black/10"}`}
          />

          <h1
            className={`text-[clamp(3.5rem,15vw,10rem)] font-extrabold leading-[0.8] tracking-tighter ${dark ? "text-white" : "text-[#262262]"}`}
          >
            <AnimatedWord text="SOLUTIONS" delay={0.25} />
          </h1>
        </div>

        {/* ── INTERACTIVE ROW ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-col md:flex-row items-center gap-12 pointer-events-auto"
        >
          {/* The Magnetic Button Area, with a breathing glow behind it */}
          <div className="relative group p-4">
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute inset-0 rounded-full blur-2xl -z-10 ${
                dark ? "bg-orange-500/30" : "bg-orange-400/30"
              }`}
            />
            <GradientButton />
          </div>

          <p className={`max-w-md text-base md:text-xl font-light leading-relaxed ${dark ? "text-white" : "text-black"}`}>
            A hybrid digital engine specializing in high-end experiences performance advertising, and brand identity
          </p>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
         animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
         transition={{ repeat: Infinity, duration: 2 }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className={`w-[1px] h-20 ${dark ? "bg-gradient-to-b from-white/40 to-transparent" : "bg-gradient-to-b from-black/40 to-transparent"}`} />
      </motion.div>
    </section>
  );
}