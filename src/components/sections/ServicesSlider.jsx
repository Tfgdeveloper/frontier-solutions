import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "Custom Software",
    description: "Bespoke platforms, internal tools, SaaS products. Architecture that scales with your operation, code your team can maintain five years from now.",
    image: "images/Software.jpg",
  },
  {
    title: "Web Development",
    description: "Conversion-tuned, fast, accessible. Built on Next.js with a headless CMS your marketers will actually use.",
    image: "images/Website.jpg",
  },
  {
    title: "Mobile Apps",
    description: "Native iOS & Android, plus React Native when cross-platform is the right call. App Store and Play Store deployment included.",
    image: "images/Apps.jpg",
  },
  {
    title: "UI / UX Design",
    description: "Research, IA, prototyping, visual systems. We don't ship Figma files — we ship validated, production-ready designs.",
    image: "images/UIUX.jpg",
  },
  {
    title: "Cloud & DevOps",
    description: "AWS, GCP, Azure. CI/CD pipelines, infra-as-code, observability and security. We keep your team shipping while costs stay sane.",
    image: "images/Cloud.jpg",
  },
  {
    title: "E-commerce",
    description: "Shopify Plus, custom stacks, headless storefronts. Stores that load fast and convert harder.",
    image: "images/E-commerce.jpg",
  },
  {
    title: "Marketing & SEO",
    description: "Search, paid, content, lifecycle. Compounding growth measured against revenue, not vanity metrics.",
    image: "images/Marketing.jpg",
  },
  {
    title: "Branding & Graphics",
    description: "Logos, identity systems, packaging, motion. Brands that look unmistakable in every channel.",
    image: "images/Branding.jpg",
  },
  {
    title: "AI Automation & Custom Models",
    description: "From workflow automation to bespoke AI models — we ship intelligence that actually moves the needle. Agents that handle the boring work, models tuned to your domain, dashboards that turn data into decisions.",
    image: "images/Automation.jpg",
  },
  {
    title: "Judicial Digital Transformation",
    description: "Built on a future-ready framework with FinTech integration in mind — One Bill, One Link, and State Bank of Pakistan compliance.",
    image: "images/Judicial.jpg",
  },
];

// ── SINGLE CARD: isolated so each instance owns its own tilt/hover motion values ──
function ServiceCard({ service, index, dark }) {
  const cardRef = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200, scrollSnapStop: "always" }}
      className="shrink-0 w-[300px] md:w-[340px] select-none snap-center"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
       
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group relative h-[460px] rounded-[32px] overflow-hidden bg-[#111214] border border-white/10"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${service.image})` }}
        />

        {/* Cursor-follow glow, revealed on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(280px circle at ${gx}% ${gy}%, rgba(240,106,34,0.28), transparent 70%)`
            ),
          }}
        />

        {/* Base gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

        {/* Index badge */}
        <span
          className="absolute top-6 right-6 font-extrabold text-transparent select-none"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.35)",
            fontSize: "2.75rem",
            lineHeight: 1,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-7 z-10" style={{ transform: "translateZ(40px)" }}>
          <span className="block w-8 h-[2px] bg-[#F06A22] mb-4 transition-all duration-500 group-hover:w-14" />
          <h3 className="text-2xl md:text-[1.65rem] font-bold mb-3 leading-tight text-white">
            {service.title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
            {service.description}
          </p>

          {/* Explore affordance */}
          <div className="mt-5 flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-[0.2em] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="w-8 h-8 rounded-full bg-[#F06A22] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 12h14m-7 7l7-7-7-7" />
              </svg>
            </span>
            Explore
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSlider({ dark }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startScroll: 0 });

  const updateProgress = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const getStep = () => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return el ? el.clientWidth : 0;
    const cardEl = el.firstElementChild;
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || "0");
    return cardEl.getBoundingClientRect().width + gap;
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getStep();
    el.scrollTo({ left: el.scrollLeft + (direction === "left" ? -step : step), behavior: "smooth" });
  };

  // ── Pointer-based free-drag scrolling ──
  const onPointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current = { startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    const dx = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScroll - dx;
  };
  const onPointerUp = () => setIsDragging(false);

  return (
    <section
      className={`py-24 transition-colors duration-1000 ${
        dark ? "bg-[#0A0A0B] text-white" : "bg-[#F9F9F9] text-[#262262]"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-[4rem] font-bold tracking-tight mb-6">
              Services and <br /> <span className="text-[#F06A22]">solutions</span> we offer.
            </h2>
            <p className={`text-lg max-w-lg leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
              We work with creative teams and ambitious founders to turn vision into product — with intuitive UX, standout visuals, and seamless digital experiences.
            </p>
          </motion.div>

          {/* Counter + Navigation */}
          <div className="flex items-center gap-6 md:mt-40">
            <div className={`text-sm font-semibold tracking-widest tabular-nums ${dark ? "text-white/50" : "text-black/50"}`}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={Math.max(1, Math.round(progress * (services.length - 1)) + 1)}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25 }}
                  className={dark ? "text-white" : "text-[#262262]"}
                >
                  {String(Math.round(progress * (services.length - 1)) + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              {" "}/ {String(services.length).padStart(2, "0")}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${
                  dark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  dark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-7 7l7-7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── SLIDER ── */}
        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className={`flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory ${
            isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} dark={dark} />
          ))}
        </div>

        {/* ── PROGRESS BAR (synced to actual scroll position) ── */}
        <div className={`relative mt-4 h-[2px] rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-black/10"}`}>
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#F06A22] rounded-full"
            animate={{ width: `${Math.max(progress * 100, 6)}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .group:hover .group-hover\\:line-clamp-none {
          -webkit-line-clamp: unset;
          overflow: visible;
        }
      `}</style>
    </section>
  );
}