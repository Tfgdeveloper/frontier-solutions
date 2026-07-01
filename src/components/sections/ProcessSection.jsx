import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  { id: "01", title: "Discovery", desc: "Workshops, audits and stakeholder interviews to map the problem and the opportunity." },
  { id: "02", title: "Define", desc: "Strategy, scope, success metrics. We commit to a finish before we commit to tools." },
  { id: "03", title: "Design", desc: "Prototypes, design systems and copy. Validated with users at every milestone." },
  { id: "04", title: "Build", desc: "Two-week sprints, demos every Friday. Production-quality code from week one." },
  { id: "05", title: "Launch", desc: "Migration, training, content. We treat go-live as the start of the relationship, not the end." },
  { id: "06", title: "Iterate", desc: "Analytics, experiments, ongoing roadmap. We grow with you, quarter after quarter." },
  { id: "07", title: "Live", desc: "Production & beyond. From spinoff to launch in 12 weeks. Then we keep shipping." },
];

const StepCard = ({ step, index, dark }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  return (
    <div ref={ref} className="relative flex gap-8 md:gap-8 pb-12 last:pb-0">
      
      {/* ── LEFT SIDE: THE DOT ── */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: isInView ? 1.2 : 1,
            backgroundColor: isInView ? "#F06A22" : "transparent",
            borderColor: isInView ? "#F06A22" : "rgba(150,150,150,0.3)",
          }}
          className={`z-10 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 bg-[#F9F9F9] dark:bg-[#0A0A0B] flex items-center justify-center transition-colors duration-500`}
        >
          {isInView && index === steps.length - 1 ? (
             <Check size={12} className="text-white" />
          ) : (
             <div className={`w-1 h-1 rounded-full ${isInView ? "bg-white" : "bg-transparent"}`} />
          )}
        </motion.div>
        
        {/* Shadow/Glow behind active dot */}
        {isInView && (
          <motion.div 
            layoutId="dotGlow"
            className="absolute w-10 h-10 bg-orange-500/20 blur-lg rounded-full" 
          />
        )}
      </div>

      {/* ── RIGHT SIDE: THE CARD ── */}
      <motion.div
        initial={{ opacity: 0.2, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={{ 
            opacity: isInView ? 1 : 0.2,
            scale: isInView ? 1 : 0.98,
        }}
        transition={{ duration: 0.6 }}
        className={`w-full p-8 md:p-8 rounded-[30px] border transition-all duration-700 ${
          isInView 
            ? dark 
              ? "bg-[#111112] border-[#F06A22] shadow-[0_0_40px_rgba(240,106,34,0.1)]" 
              : "bg-white border-[#F06A22] shadow-xl shadow-orange-500/5"
            : dark ? "bg-transparent border-white/5" : "bg-transparent border-black/5"
        }`}
      >
        <div className="flex items-center gap-4 mb-2">
           <span className={`font-mono text-sm font-bold ${isInView ? "text-orange-500" : "text-gray-400"}`}>
             {step.id}
           </span>
           <div className={`h-[1px] w-8 ${isInView ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-800"}`} />
           <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isInView ? "text-gray-400" : "text-gray-300 dark:text-gray-600"}`}>
             Phase // Staged
           </span>
        </div>

        <h3 className={`text-2xl md:text-3xl font-black mb-2 tracking-tighter transition-colors duration-500 ${
           isInView ? (dark ? "text-white" : "text-[#262262]") : "text-gray-300 dark:text-gray-800"
        }`}>
          {step.title}
        </h3>
        
        <p className={`max-w-xl text-sm md:text-base leading-relaxed transition-colors duration-500 ${
           isInView ? (dark ? "text-white/60" : "text-gray-600") : "text-gray-200 dark:text-gray-900"
        }`}>
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
};

export default function ProcessTimeline({ dark }) {
  const containerRef = useRef(null);

  // Scroll Progress for the filling line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className={`py-10 transition-colors duration-1000 ${
      dark ? "bg-[#0A0A0B]" : "bg-[#F9F9F9]"
    }`}>
      <div className="max-w-7xl mx-auto overflow-visible">
        
        {/* Header */}
        <div className="mb-32 text-left ">
          
          <h2 className={`text-5xl md:text-[4rem] font-black tracking-tighter leading-none ${dark ? "text-white" : "text-[#262262]"}`}>
            Six milestones. <br/>
          <span className="text-[#F06A22]">Predictable as a metronome.</span>
          </h2>
        </div>

        {/* ── THE TIMELINE ── */}
        <div ref={containerRef} className="relative ">
          
          {/* Vertical Progress Line (Base) */}
          <div className={`absolute left-[7px] md:left-[11px] top-0 bottom-0 w-[2px] ${dark ? "bg-white/5" : "bg-black/5"}`} />
          
          {/* Vertical Progress Line (Active Fill) */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-[7px] md:left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#262262] to-[#F06A22] origin-top z-0"
          />

          <div className="flex flex-col">
            {steps.map((step, index) => (
              <StepCard 
                key={step.id} 
                step={step} 
                index={index} 
                dark={dark} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}