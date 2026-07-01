import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

export default function TestimonialSlider({ dark }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── FUNCTION: SCROLL TO SPECIFIC DOT ──
  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (container) {
      // Find the card and gap widths
      const card = container.querySelector(".testimonial-card");
      const cardWidth = card.clientWidth;
      const gap = 16; // This matches gap-4 (1rem = 16px)

      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  // ── FUNCTION: SYNC DOTS WHILE SCROLLING ──
  const handleScroll = () => {
    const container = scrollRef.current;
    if (container) {
      const card = container.querySelector(".testimonial-card");
      const cardWidth = card.clientWidth;
      const gap = 16;
      const scrollPosition = container.scrollLeft;
      
      // Calculate which index we are currently at
      const newIndex = Math.round(scrollPosition / (cardWidth + gap));
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <section className={`py-24 px-6 md:px-12 transition-colors duration-1000 ${
      dark ? "bg-[#0A0A0B]" : "bg-[#F9F9F9]"
    }`}>
      <div className="max-w-[1600px] mx-auto">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-4xl text-left">
            <h2 className={`text-4xl md:text-[4rem] font-bold tracking-tight leading-[1.1] ${
              dark ? "text-white" : "text-[#262262]"
            }`}>
              Don't just take our word for it. <br/>
              We've scaled <span className="text-orange-500">50+ businesses.</span>
            </h2>
          </div>
          
          
        </div>

        {/* ── INTERACTIVE SLIDER ── */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-12 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              className={`testimonial-card snap-start min-w-[320px] md:min-w-[400px] p-8 rounded-2xl flex flex-col justify-between transition-colors shadow-sm ${
                dark ? "bg-[#2A2A2A] text-white" : "bg-white text-[#262262] border border-black/5"
              }`}
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={dark ? "#fff" : "#262262"} stroke="none" className="opacity-80" />
                  ))}
                </div>
                <h4 className="font-bold text-lg mb-3 leading-tight text-left">{item.title}</h4>
                <p className={`text-sm leading-relaxed mb-10 text-left ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  {item.body}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {item.img ? (
                  <img src={item.img} className="w-10 h-10 rounded-full object-cover" alt={item.author} />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ${item.color}`}>
                    {item.initial}
                  </div>
                )}
                <div className="text-left flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.author}</span>
                  <span className="text-[10px] opacity-40 font-medium">{item.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── PAGINATION DOTS (Now Clickable) ── */}
        <div className="flex gap-3 mt-4 items-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === i 
                ? "w-8 h-2 bg-orange-500" 
                : `w-2 h-2 ${dark ? "bg-white/20 hover:bg-white/40" : "bg-black/10 hover:bg-black/30"}`
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}