import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    rating: 5,
    title: "Unrivaled Technical Innovation",
    body: "Working with Frontier was the best decision for our rebranding. The speed and precision of their dev team is unmatched.",
    author: "Aurelio Barreto",
    date: "06 DEC",
    initial: "A",
    color: "bg-orange-600",
  },
  {
    rating: 5,
    title: "Perfect for growing brands",
    body: "Great service and fast turnaround, perfect for our growing e-commerce business model. They really understand scale.",
    author: "Daryl Johnson",
    date: "29 NOV",
    initial: "D",
    color: "bg-purple-600",
  },
  {
    rating: 5,
    title: "Exceptional Communication",
    body: "I've worked with many agencies, but Frontier's communication and delivery speed are on another level. Highly specialized.",
    author: "Matt Fracek",
    date: "27 NOV",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    rating: 5,
    title: "Expertise in the Edge",
    body: "Efficient, reliable and trustworthy. We recommend them for any startup looking for a high-performance digital presence.",
    author: "Tereza Cipra",
    date: "26 NOV",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const AUTOPLAY_MS = 6000;

const starContainer = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
};
const starItem = {
  hidden: { scale: 0, opacity: 0, rotate: -45 },
  shown: { scale: 1, opacity: 1, rotate: 0 },
};

export default function TestimonialSlider({ dark }) {
  const len = testimonials.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragStartX = useRef(0);

  const goTo = (i) => setActiveIndex(((i % len) + len) % len);
  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  // Autoplay — pauses on hover/drag, restarts whenever the active card changes
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isPaused]);

  return (
    <section
      className={`py-24 px-6 md:px-12 transition-colors duration-1000 overflow-hidden ${
        dark ? "bg-[#0A0A0B]" : "bg-[#F9F9F9]"
      }`}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-4xl text-left">
            <h2 className={`text-4xl md:text-[4rem] font-bold tracking-tight leading-[1.1] ${dark ? "text-white" : "text-[#262262]"}`}>
              Don't just take our word for it. <br />
              We've scaled <span className="text-orange-500">50+ businesses.</span>
            </h2>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${
                dark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
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

        {/* ── COVERFLOW STAGE ── */}
        <div
          className="relative h-[440px] md:h-[420px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials.map((item, idx) => {
            let diff = idx - activeIndex;
            diff = ((diff % len) + len) % len;
            if (diff > len / 2) diff -= len;
            const abs = Math.abs(diff);
            const isActive = diff === 0;
            if (abs > 2) return null;

            return (
              <motion.div
                key={idx}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragStart={(e, info) => {
                  setIsPaused(true);
                  dragStartX.current = info.point.x;
                }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -70) next();
                  else if (info.offset.x > 70) prev();
                  setIsPaused(false);
                }}
                onClick={() => !isActive && goTo(idx)}
                animate={{
                  x: `calc(-50% + ${diff * 78}%)`,
                  scale: isActive ? 1 : 0.82 - abs * 0.06,
                  opacity: isActive ? 1 : abs === 1 ? 0.45 : 0,
                  filter: isActive ? "blur(0px)" : "blur(2px)",
                }}
                style={{
                  left: "50%",
                  position: "absolute",
                  top: 0,
                  zIndex: 10 - abs,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className={`testimonial-card w-[300px] md:w-[420px] p-8 rounded-[28px] flex flex-col justify-between shadow-xl ${
                  isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                } ${dark ? "bg-[#17181A] text-white" : "bg-white text-[#262262] border border-black/5"}`}
              >
                {/* Faint decorative quote mark */}
                <Quote
                  className={`absolute top-6 right-6 ${dark ? "text-white/5" : "text-black/5"}`}
                  size={72}
                  strokeWidth={0}
                  fill="currentColor"
                />

                <div className="relative">
                  <motion.div
                    variants={starContainer}
                    initial="hidden"
                    animate={isActive ? "shown" : "hidden"}
                    className="flex gap-1 mb-6"
                  >
                    {[...Array(item.rating)].map((_, i) => (
                      <motion.div key={i} variants={starItem}>
                        <Star size={14} fill={dark ? "#fff" : "#262262"} stroke="none" className="opacity-80" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <h4 className="font-bold text-lg mb-3 leading-tight text-left">{item.title}</h4>
                  <p className={`text-sm leading-relaxed mb-10 text-left ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    {item.body}
                  </p>
                </div>

                <div className="relative flex items-center gap-3">
                  {/* Avatar with story-style autoplay progress ring (active card only) */}
                  <div className="relative w-11 h-11 shrink-0">
                    {isActive && (
                      <svg
                        key={`${activeIndex}-${isPaused}`}
                        viewBox="0 0 44 44"
                        className="absolute inset-0 -rotate-90"
                      >
                        <circle cx="22" cy="22" r="20" fill="none" stroke={dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"} strokeWidth="2" />
                        <circle
                          cx="22"
                          cy="22"
                          r="20"
                          fill="none"
                          stroke="#F06A22"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={125.6}
                          className="testimonial-ring"
                          style={{ animationPlayState: isPaused ? "paused" : "running" }}
                        />
                      </svg>
                    )}
                    <div className="absolute inset-[3px] rounded-full overflow-hidden flex items-center justify-center">
                      {item.img ? (
                        <img src={item.img} className="w-full h-full object-cover" alt={item.author} />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center text-xs font-bold text-white ${item.color}`}>
                          {item.initial}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-left flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.author}</span>
                    <span className="text-[10px] opacity-40 font-medium">{item.date}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── PAGINATION DOTS ── */}
        <div className="flex gap-3 mt-8 items-center justify-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === i ? "w-8 h-2 bg-orange-500" : `w-2 h-2 ${dark ? "bg-white/20 hover:bg-white/40" : "bg-black/10 hover:bg-black/30"}`
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonial-ring {
          stroke-dashoffset: 125.6;
          animation: ringFill ${AUTOPLAY_MS}ms linear forwards;
        }
        @keyframes ringFill {
          from {
            stroke-dashoffset: 125.6;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}