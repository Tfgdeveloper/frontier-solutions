import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

// NOTE: items 6–10 are placeholders to reach a 10-project catalog for this
// dedicated page — swap in real titles/images/tags when you have them.
const projects = [
  { id: 1, title: "Klyne Fintech", category: "SaaS", year: "2025", tags: ["Fintech", "Banking dashboard"], image: "images/Work — TFG Solutions/klyne.jpg" },
  { id: 2, title: "Metamorph", category: "Web", year: "2025", tags: ["SaaS", "Workflow automation"], image: "images/Work — TFG Solutions/imgi_10_metamorph.jpg" },
  { id: 3, title: "KoalaBridge", category: "Web", year: "2025", tags: ["Fintech", "Currency bridge"], image: "images/Work — TFG Solutions/imgi_8_koalabridge.jpg" },
  { id: 4, title: "Saffron Delivery", category: "Mobile", year: "2025", tags: ["Mobile", "Food delivery"], image: "images/Work — TFG Solutions/imgi_14_saffron.jpg" },
  { id: 5, title: "Nara", category: "Hospitality", year: "2024", tags: ["Hospitality", "Brand identity"], image: "images/Work — TFG Solutions/imgi_16_nara.jpg" },
  { id: 6, title: "Pebble", category: "Mobile", year: "2024", tags: ["Mobile", "Mindfulness"], image: "images/Work — TFG Solutions/imgi_15_pebble.jpg" },
  { id: 7, title: "Featured Foundry IO — Industrial monitoring console", category: "SaaS", year: "2025", tags: ["Shop-floor ops", "Manufacturing"], image: "images/Work — TFG Solutions/imgi_17_foundry.jpg" },
  { id: 8, title: "Møn ", category: "E-Commerce", year: "2025", tags: ["Fashion", "D2C storefront"], image: "images/Work — TFG Solutions/imgi_13_mon.jpg" },
  { id: 9, title: "Black Horse Tyre", category: "D2C", year: "2026", tags: ["Automotive", "Tyre e-commerce"], image: "images/Work — TFG Solutions/imgi_7_black-horse-tyre.jpg" },
  { id: 10, title: " Featured Base of Casino — Live-table experience", category: "Web", year: "2026", tags: ["Gaming", "iGaming platform"], image: "images/Work — TFG Solutions/imgi_11_base-of-casino.jpg" },
];

// SINGLE PROJECT TILE - same tile design as the homepage teaser, for visual consistency
function ProjectTile({ project, index, gridClass, dark, onEnter, onLeave }) {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={wrapRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={`${gridClass} group`}
      onMouseEnter={() => onEnter(project)}
      onMouseLeave={onLeave}
    >
      <div className={`relative h-full overflow-hidden rounded-[32px] border transition-colors duration-500 ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"}`}>
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

        <div className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/70 text-[11px] font-semibold uppercase tracking-[0.2em]">
          <span>{project.category}</span>
          <span className="text-[#F06A22]">&bull;</span>
          <span>{project.year}</span>
        </div>

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

        <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between z-10">
          <div className="overflow-hidden">
            <h3 className="text-white text-2xl font-bold tracking-tight">{project.title}</h3>
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

export default function PortfolioGrid({ dark }) {
  const [hovered, setHovered] = useState(null);
  const gridRef = useRef(null);

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
    <section className={`py-20 md:py-24 px-6 md:px-12 transition-colors duration-1000 overflow-hidden relative ${dark ? "bg-[#0A0A0B]" : "bg-[#F9F9F9]"}`}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="noise2">
            <feTurbulence baseFrequency="0.80" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise2)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <span className={`text-xs font-bold uppercase tracking-[0.35em] ${dark ? "text-orange-500" : "text-orange-600"}`}>
              Full portfolio
            </span>
            <h2 className={`text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] mt-4 ${dark ? "text-white" : "text-[#262262]"}`}>
              Every project, <span className="text-[#F06A22]">start to finish.</span>
            </h2>
          </div>
          <p className={`max-w-xs text-sm leading-relaxed ${dark ? "text-white/50" : "text-black/50"}`}>
            {String(projects.length).padStart(2, "0")} projects — hover any tile to take a closer look.
          </p>
        </div>

        <div ref={gridRef} onMouseMove={handleGridMouseMove} className="relative grid grid-cols-12 gap-6 auto-rows-[120px]">
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

          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => {
              // A deliberate rhythm of shapes rather than a repeating 2-variant
              // pattern: full-width openers/closers, tall verticals, and wide
              // horizontals, cycling every 10.
              const PATTERN = [
                "col-span-12 row-span-3", // 0: full width
                "col-span-12 sm:col-span-4 row-span-2", // 1: vertical
                "col-span-12 sm:col-span-4 row-span-2", // 2: vertical
                "col-span-12 sm:col-span-4 row-span-4", // 3: vertical
                "col-span-12 sm:col-span-8 row-span-2", // 4: horizontal
                "col-span-12 sm:col-span-4 row-span-4", // 5: vertical
                "col-span-12 sm:col-span-8 row-span-4", // 6: horizontal
                "col-span-12 sm:col-span-8 row-span-3", // 7: horizontal
                "col-span-12 sm:col-span-4 row-span-3", // 8: vertical
                "col-span-12 sm:col-span-12 row-span-5", // 9: horizontal
              ];
              const gridClass = PATTERN[index % PATTERN.length];

              return (
                <ProjectTile
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}