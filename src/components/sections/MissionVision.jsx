import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, ArrowUpRight } from "lucide-react";

const MissionVision = () => {
  const content = [
    {
      id: "01",
      label: "Mission",
      title: "Architecting the Frontier.",
      desc: "To fuse raw engineering power with human-centric design, enabling global brands to scale through digital ecosystems that are as indestructible as they are beautiful.",
      icon: <Target size={32} />,
      color: "from-orange-500/20",
      featured: true, // permanently gradient-filled, not just on hover
    },
    {
      id: "02",
      label: "Vision",
      title: "Defying the Standard.",
      desc: "To become the global standard for digital engineering, where logic meets art, defining the next decade of digital evolution across the Dubai and Paris landscapes.",
      icon: <Eye size={32} />,
      color: "from-indigo-500/20",
      featured: false,
    },
  ];

  return (
    <section className="py-40 px-6 md:px-12 transition-colors duration-1000 relative overflow-hidden bg-transparent">

      {/* ── BACKGROUND KINETICS ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%"><filter id="mv-noise"><feTurbulence baseFrequency="0.9"/></filter><rect width="100%" height="100%" filter="url(#mv-noise)"/></svg>
      </div>

      <div className="max-w-[1500px] mx-auto">

        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start max-w-3xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] uppercase tracking-[0.6em] font-black mb-6 text-orange-500"
          >
            Philosophy
          </motion.span>
          <h2 className="text-5xl md:text-[4rem] font-bold tracking-tight mb-6 text-white">
            Purpose <br /> <span className="text-[#F06A22]">&amp; Intent.</span>
          </h2>
        </div>

        {/* ── THE PILLARS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
          {content.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className={`group relative p-6 md:p-10 rounded-[40px] border overflow-hidden transition-all duration-700 bg-white/5 border-white/5 hover:border-white/10 ${
                item.featured ? "border-white/10" : ""
              }`}
            >
              {/* Color wash — permanently on for the featured card, hover-triggered for the other */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent transition-opacity duration-700 ${
                  item.featured ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />

              <div className="relative z-10">
                <div className="max-w-md">
                  <div className="flex flex-row mb-4 items-center gap-4">
                    <div className="px-3 py-1 rounded-full inline-block font-thin bg-[linear-gradient(135deg,_#1F1A4A_0%,_#8C4343_50%,_#E0531A_100%)] text-white">
                      {item.label}
                    </div>
                    
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl font-light leading-relaxed text-white/50">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Interactive Line */}
              <div
                className={`absolute bottom-0 left-0 h-[2px] bg-orange-500 transition-all duration-1000 ${
                  item.featured ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;