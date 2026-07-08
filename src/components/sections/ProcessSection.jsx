import React, { useRef, useState, useEffect } from "react";
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

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

const StepCard = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  const [completed, setCompleted] = useState(false);

  // Once a step scrolls past (above the viewport), mark it permanently done —
  // turns the timeline into a self-completing checklist rather than a static list.
  useEffect(() => {
    if (!isInView && ref.current) {
      const top = ref.current.getBoundingClientRect().top;
      if (top < 0) setCompleted(true);
    }
  }, [isInView]);

  const status = completed ? "Complete" : isInView ? "Active" : "Upcoming";
  const isDone = completed || isInView;
  const fromSide = index % 2 === 0 ? -36 : 36;

  return (
    <div ref={ref} className="relative flex gap-8 md:gap-8 pb-12 last:pb-0">
      {/* ── LEFT SIDE: THE DOT ── */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: isInView ? 1.25 : completed ? 1.05 : 1,
            backgroundColor: isDone ? "#F06A22" : "transparent",
            borderColor: isDone ? "#F06A22" : "rgba(150,150,150,0.3)",
          }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 bg-[#0A0A0B] flex items-center justify-center"
        >
          {isDone ? (
            <Check size={10} className="text-white" strokeWidth={3} />
          ) : (
            <div className="w-1 h-1 rounded-full bg-transparent" />
          )}
        </motion.div>

        {isInView && (
          <motion.div
            layoutId="dotGlow"
            className="absolute w-10 h-10 bg-orange-500/20 blur-lg rounded-full pointer-events-none"
          />
        )}
      </div>

      {/* ── RIGHT SIDE: THE CARD ── */}
      <motion.div
        initial={{ opacity: 0, x: fromSide }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        animate={{
          opacity: isInView ? 1 : completed ? 0.75 : 0.2,
          scale: isInView ? 1 : 0.98,
        }}
        transition={{ duration: 0.6 }}
        className={`relative w-full p-8 md:p-8 rounded-[30px] border overflow-hidden transition-colors duration-700 ${
          isInView
            ? "bg-[#000]/30 border-[#F06A22]/30 shadow-[0_0_40px_rgba(240,106,34,0.1)]"
            : "bg-transparent border-white/5"
        }`}
      >
        {/* Ghost numeral watermark */}
        <span
          aria-hidden
          className={`absolute -top-4 right-4 font-black text-transparent select-none transition-opacity duration-700 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.08)",
            fontSize: "6rem",
            lineHeight: 1,
          }}
        >
          {step.id}
        </span>

        <div className="relative flex items-center gap-4 mb-2">
          <span className={`font-mono text-sm font-bold ${isDone ? "text-orange-500" : "text-gray-400"}`}>
            {step.id}
          </span>
          <div className={`h-[1px] w-8 ${isDone ? "bg-orange-500" : "bg-gray-800"}`} />
          <span
            className={`text-[10px] uppercase tracking-[0.3em] font-bold ${
              isInView ? "text-orange-500" : completed ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Phase // {status}
          </span>
        </div>

        <h3
          className={`relative text-2xl md:text-3xl font-black mb-2 tracking-tighter transition-colors duration-500 ${
            isInView ? "text-white" : completed ? "text-white/70" : "text-gray-800"
          }`}
        >
          {step.title}
        </h3>

        <p
          className={`relative max-w-xl text-sm md:text-base leading-relaxed transition-colors duration-500 ${
            isInView ? "text-white/60" : "text-gray-900"
          }`}
        >
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
};

export default function ProcessTimeline() {
  const containerRef = useRef(null);

  // Scroll progress for the filling line + the traveling marker
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const cometY = useSpring(scrollYProgress, { stiffness: 160, damping: 22 });
  const cometTop = useTransform(cometY, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);
  const progressLabel = useTransform(scrollYProgress, (v) => `${Math.round(Math.min(Math.max(v, 0), 1) * 100)}%`);

  return (
    <section className="py-10 px-4 transition-colors duration-1000 bg-transparent">
      <div className="max-w-7xl mx-auto overflow-visible">
        {/* Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <h2 className="text-5xl md:text-[4rem] font-black tracking-tighter leading-none text-white">
            {NUMBER_WORDS[steps.length] || steps.length} milestones. <br />
            <span className="text-[#F06A22]">Predictable as a metronome.</span>
          </h2>

          {/* Live scroll-synced progress readout */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-white/40">
              Journey mapped
            </span>
            <motion.span className="font-mono text-2xl font-bold tabular-nums text-white">
              {progressLabel}
            </motion.span>
          </div>
        </div>

        {/* ── THE TIMELINE ── */}
        <div ref={containerRef} className="relative">
          {/* Vertical Progress Line (Base) */}
          <div className="absolute left-[7px] md:left-[11px] top-0 bottom-0 w-[2px] bg-white/5" />

          {/* Vertical Progress Line (Active Fill) */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-[7px] md:left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#262262] to-[#F06A22] origin-top z-0"
          />

          {/* Traveling comet marker — a live "you are here" on the line */}
          <motion.div
            style={{ top: cometTop }}
            className="hidden md:block absolute left-[11px] z-20 pointer-events-none"
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-orange-500"
              />
              <div className="relative w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_12px_3px_rgba(240,106,34,0.6)]" />
            </div>
          </motion.div>

          <div className="flex flex-col">
            {steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}