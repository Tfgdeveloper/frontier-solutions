import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function ParticleField() {
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

    const COUNT = Math.floor((window.innerWidth * window.innerHeight) / 16000);
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

    const dotColor = "255, 255, 255";
    const lineColor = "255, 180, 120";

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}

export default function PageHero({
  eyebrow = "",
  title = "",
  description = "",
  breadcrumbs = [],
  tags = [],
}) {
  return (
    <>
    <section className="relative w-full overflow-hidden transition-colors duration-1000 pt-40 pb-20 md:pt-48 md:pb-28 bg-transparent">
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <ParticleField />
      </div>

      
      {/* ── FILM GRAIN OVERLAY (kept for brand continuity, subtle here) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.25] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="pageHeroGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#pageHeroGrain)" />
        </svg>
      </div>

      {/* ── FAINT CORNER GLOW (much smaller/quieter than homepage orb) ── */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full blur-[120px] opacity-30 pointer-events-none bg-orange-900"
      />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* ── BREADCRUMB ── */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] mb-10 text-white/40"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-orange-500">{crumb.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span>/</span>}
              </span>
            ))}
          </motion.nav>
        )}

        {/* ── EYEBROW ── */}
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block w-10 h-[1px] bg-orange-500" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-orange-500">
              {eyebrow}
            </span>
          </motion.div>
        )}

        {/* ── TITLE: clip-path wipe reveal (distinct from homepage's per-letter drop-in) ── */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.75rem,9vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight text-white"
          >
            {title}
          </motion.h1>
        </div>

        {/* ── DESCRIPTION ── */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-xl text-base md:text-lg font-light leading-relaxed text-white/70"
          >
            {description}
          </motion.p>
        )}
      </div>

     
    </section>
    <div>
       {/* ── SIGNATURE ELEMENT: marquee ticker ── */}
      {tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative z-10 border-y border-white/10 bg-transparent"
        >
          <Marquee tags={tags} />
        </motion.div>
      )}
    </div>
    </>
  );
}

// ── MARQUEE: infinite scrolling ticker of keywords ──
function Marquee({ tags }) {
  const trackRef = useRef(null);

  // Duplicate the tag list so the loop is seamless
  const loopTags = [...tags, ...tags];

  return (
    <div className="relative overflow-hidden py-4 md:py-6">
      <motion.div
        ref={trackRef}
        className="flex w-max items-center gap-8 md:gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {loopTags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-8 md:gap-12 text-sm md:text-base font-semibold uppercase tracking-[0.3em] whitespace-nowrap text-white/50"
          >
            {tag}
            <span className="text-orange-500">&bull;</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}