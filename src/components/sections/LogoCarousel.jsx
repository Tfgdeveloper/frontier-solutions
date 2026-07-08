import React from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "TechFlow", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Quantum", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Velocity", url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.svg" },
  { name: "Pulse", url: "https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20210618074127%21Google_logos_2014.svg" },
  { name: "Aether", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Nimbus", url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
];

// Double the logos to create the seamless loop
const duplicatedLogos = [...logos, ...logos, ...logos];

export default function LogoCarousel({ dark }) {
  return (
    <div className={`relative py-8 overflow-hidden transition-colors duration-1000 ${
      dark ? "bg-tranaprent" : "bg-tranaprent"
    }`}>
      
      {/* ── TOP LABEL ── */}

      {/* ── LOGO TRACK ── */}
      <div className="relative flex items-center">
        
        {/* Left/Right Fading Gradients (The "Premium" Mask) */}
       
        
        
        {/* Marquee Motion Container */}
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-12 md:px-20 shrink-0"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className={`h-6 md:h-8 w-auto object-contain transition-all duration-500 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 ${
                  dark ? "invert brightness-200" : ""
                }`}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── BOTTOM DIVIDER (Optional Agency Spec) ── */}
      
    </div>
  );
}