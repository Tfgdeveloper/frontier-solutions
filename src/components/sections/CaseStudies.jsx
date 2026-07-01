import React from "react";
import { motion } from "framer-motion";
import GradientButton from "../ui/GradientButton";

const projects = [
  {
    id: 1,
    title: "Klyne Fintech",
    category: "Kidswear",
    year: "2025",
    tags: ["Fintech", "Banking dashboard" ,"2026"],
    image: "https://tfgsolutions.pk/assets/work/subshare.jpg",
    gridClass: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 2,
    title: "Metamorph",
    category: "Home Hardware",
    year: "2025",
    tags: ["SaaS","Workflow automation"," 2026"],
    image: "images/Work — TFG Solutions/imgi_10_metamorph.jpg",
    gridClass: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 3,
    title: "KoalaBridge",
    category: "Real Estate",
    year: "2025",
    tags: ["Fintech","Currency bridge"," 2026"],
    image: "images/Work — TFG Solutions/imgi_8_koalabridge.jpg",
    gridClass: "lg:col-span-2 lg:row-span-2", // Big hero on the right
  },
  {
    id: 4,
    title: "Ember Goods",
    category: "Corporate",
    year: "2025",
    tags: ["D2C","Cookware brand"," 2025"],
    image: "images/Work — TFG Solutions/imgi_12_ember.jpg",
    gridClass: "lg:col-span-2 lg:row-span-1", // Wide hero on the bottom left
  },
  {
    id: 5,
    title: "Nara",
    category: "Corporate",
    year: "2025",
    tags: ["Hospitality","Brand identity"," 2024"],
    image: "images/Work — TFG Solutions/imgi_16_nara.jpg",
    gridClass: "lg:col-span-2 lg:row-span-1", // Wide hero on the bottom left
  },
];

export default function CaseStudies({ dark }) {
  return (
    <section className={`py-24 px-6 md:px-12 transition-colors duration-1000 overflow-hidden relative ${
      dark ? "bg-[#0A0A0B]" : "bg-[#F9F9F9]" // Light blue tint background from your screenshot
    }`}>
      
      {/* Subtle Grain Overlay for Premium feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%"><filter id="noise"><feTurbulence baseFrequency="0.80"/></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* ── HEADER ── */}
        <div className="text-left mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-6xl md:text-[4rem] font-bold tracking-tight leading-[0.9] ${
              dark ? "text-white" : "text-[#262262]" // Branding Indigo
            }`}
          >
            Discover 
            Our <br /> Case <span className="text-[#F06A22]">Studies</span>
          </motion.h2>
        </div>

        {/* ── ASYMMETRIC MOSAIC GRID ── */}
        <div className="grid grid-cols-12 gap-6 auto-rows-[120px]">

  {projects.map((project, index) => {
    let gridClass = "";

    // Layout
    if (index === 0 || index === 1) {
      gridClass = "col-span-12 lg:col-span-6 row-span-3";
    } else {
      gridClass = "col-span-12 sm:col-span-6 lg:col-span-4 row-span-2";
    }

    return (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: index * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`${gridClass} group`}
      >
        <div
          className={`relative h-full overflow-hidden rounded-[32px] border transition-all duration-500 ${
            dark
              ? "border-white/10 bg-white/5"
              : "border-black/10 bg-white"
          }`}
        >
          {/* Tags */}
          <div className="absolute bottom-18 left-5 z-20 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 text-white text-[10px] uppercase tracking-wider font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Image */}
          <motion.img
            src={project.image}
            alt={project.title}
            whileHover={{ scale: 1.08 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
            <div>
              <h3 className="text-white text-2xl font-bold tracking-tight ">
                {project.title}
              </h3>
            </div>

            <div
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center
              translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    );
  })}

</div>

        {/* ── FOOTER BUTTON ── */}
        <div className="mt-10 flex justify-center">
            <GradientButton/>
        </div>
      </div>
    </section>
  );
}