import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import GradientButton from "../ui/GradientButton";

const projects = [
  {
    id: 1,
    title: "Klyne Fintech",
    category: "Fintech",
    year: "2025",
    tags: ["Fintech", "Banking dashboard"],
    image: "images/Work — TFG Solutions/klyne.jpg",
  },
  {
    id: 2,
    title: "Metamorph",
    category: "SaaS",
    year: "2025",
    tags: ["SaaS", "Workflow automation"],
    image: "images/Work — TFG Solutions/imgi_10_metamorph.jpg",
  },
  {
    id: 3,
    title: "KoalaBridge",
    category: "Fintech",
    year: "2025",
    tags: ["Fintech", "Currency bridge"],
    image: "images/Work — TFG Solutions/imgi_8_koalabridge.jpg",
  },
  {
    id: 4,
    title: "Ember Goods",
    category: "D2C",
    year: "2025",
    tags: ["D2C", "Cookware brand"],
    image: "images/Work — TFG Solutions/imgi_12_ember.jpg",
  },
  {
    id: 5,
    title: "Nara",
    category: "Hospitality",
    year: "2024",
    tags: ["Hospitality", "Brand identity"],
    image: "images/Work — TFG Solutions/imgi_16_nara.jpg",
  },
  
];

// ── SINGLE CASE STUDY TILE ──
function CaseStudyTile({ project, index, gridClass, dark, onEnter, onLeave }) {
  const wrapRef = useRef(null);

  // Scroll-linked parallax: image drifts as the tile passes through the viewport
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`${gridClass} group`}
      onMouseEnter={() => onEnter(project)}
      onMouseLeave={onLeave}
    >
      <div
        className={`relative h-full overflow-hidden rounded-[32px] border transition-colors duration-500 ${
          dark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"
        }`}
      >
        {/* Image with subtle scroll parallax — always visible, no reveal-mask dependency */}
        <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%]">
          <motion.img
            src={encodeURI(project.image)}
            alt={project.title}
            onError={(e) => {
              console.error("Image failed to load:", project.image);
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.parentElement.style.background =
                "repeating-linear-gradient(45deg, #F06A22 0, #F06A22 2px, transparent 2px, transparent 12px)";
            }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

        {/* Eyebrow: category / year, always visible */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/70 text-[11px] font-semibold uppercase tracking-[0.2em]">
          <span>{project.category}</span>
          <span className="text-[#F06A22]">&bull;</span>
          <span>{project.year}</span>
        </div>

        {/* Tags: reveal staggered on hover */}
        <div className="absolute top-16 left-6 z-10 flex flex-wrap gap-2 max-w-[70%]">
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className="opacity-0 -translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white text-[10px] uppercase tracking-wider font-semibold transition-all duration-400 ease-out"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        {/* Title + corner icon */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between z-10">
          <div className="overflow-hidden">
            <motion.h3
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.06 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white text-2xl font-bold tracking-tight"
            >
              {project.title}
            </motion.h3>
          </div>

          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies({ dark }) {
  const [hovered, setHovered] = useState(null);
  const gridRef = useRef(null);

  // ── Cursor-follow "View Case Study" label ──
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  const handleGridMouseMove = (e) => {
    const rect = gridRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <section
      className={`py-24 px-6 md:px-12 transition-colors duration-1000 overflow-hidden relative ${
        dark ? "bg-[#0A0A0B]" : "bg-[#F9F9F9]"
      }`}
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence baseFrequency="0.80" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className={`block w-8 h-[2px] ${dark ? "bg-orange-500" : "bg-orange-600"}`} />
              <span className={`text-xs font-bold uppercase tracking-[0.35em] ${dark ? "text-orange-500" : "text-orange-600"}`}>
                Selected work
              </span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`text-6xl md:text-[4rem] font-bold tracking-tight leading-[0.9] ${
                  dark ? "text-white" : "text-[#262262]"
                }`}
              >
                Discover Our <br /> Case <span className="text-[#F06A22]">Studies</span>
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`max-w-xs text-sm leading-relaxed ${dark ? "text-white/50" : "text-black/50"}`}
          >
            {String(projects.length).padStart(2, "0")} projects across fintech, SaaS, D2C and hospitality — hover any tile to take a closer look.
          </motion.p>
        </div>

        {/* ── ASYMMETRIC MOSAIC GRID WITH CURSOR FOLLOWER ── */}
        <div
          ref={gridRef}
          onMouseMove={handleGridMouseMove}
          className="relative grid grid-cols-12 gap-6 auto-rows-[120px]"
        >
          {/* Cursor-follow pill (desktop only) */}
          <motion.div
            className="hidden md:flex absolute z-30 pointer-events-none items-center gap-2 px-5 py-3 rounded-full bg-[#F06A22] text-white text-xs font-bold uppercase tracking-[0.15em] whitespace-nowrap"
            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
            transition={{ duration: 0.25 }}
          >
            View case study
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M5 12h14m-7 7l7-7-7-7" />
            </svg>
          </motion.div>

          {projects.map((project, index) => {
            const gridClass =
              index === 0 || index === 1
                ? "col-span-12 lg:col-span-6 row-span-3"
                : "col-span-12 sm:col-span-6 lg:col-span-4 row-span-2";

            return (
              <CaseStudyTile
                key={project.id}
                project={project}
                index={index}
                gridClass={gridClass}
                dark={dark}
                onEnter={setHovered}
                onLeave={() => setHovered(null)}
              />
            );
          })}
        </div>

        {/* ── FOOTER BUTTON ── */}
        <div className="mt-10 flex justify-center">
          <GradientButton />
        </div>
      </div>
    </section>
  );
}