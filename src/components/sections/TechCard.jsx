import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiVercel,
  SiPostgresql,
  SiRedis,
  SiSwift,
  SiKotlin,
  SiFigma,
  SiWebflow,
  SiShopify,
  SiStripe,
} from "react-icons/si";

const partners = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },

  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Vercel", Icon: SiVercel, color: "#000000" },

  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Redis", Icon: SiRedis, color: "#DC382D" },
  { name: "Swift", Icon: SiSwift, color: "#F05138" },
  { name: "Kotlin", Icon: SiKotlin, color: "#7F52FF" },

  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Webflow", Icon: SiWebflow, color: "#4353FF" },
  { name: "Shopify", Icon: SiShopify, color: "#95BF47" },
  { name: "Stripe", Icon: SiStripe, color: "#008CDD" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PartnerStack() {
  return (
    <section className="py-32 px-6 transition-colors duration-1000 bg-transprent">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* ── HEADER ── */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-medium tracking-tight mb-20 max-w-4xl mx-auto leading-relaxed text-white/90"
        >
          Frontier Solutions is working with industry-leading <br className="hidden md:block" /> 
          technology and implementation partners
        </motion.h2>

        {/* ── THE BADGE GRID ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 lg:px-20"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex items-center gap-3 px-4 py-2 border rounded-xl transition-all duration-300 shadow-sm group bg-[#000]/50 border-white/5 hover:border-orange-500/50"
            >
              {/* Logo Box */}
              <div className="p-1.5 rounded-lg flex items-center justify-center transition-colors bg-white/5 group-hover:bg-white/10">
                <partner.Icon 
                  size={18} 
                  style={{ color: "#fff" }} 
                  className="transition-colors group-hover:text-orange-500"
                />
              </div>

              {/* Text */}
              <span className="text-sm md:text-base font-semibold transition-colors text-white/80 group-hover:text-white">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── FOOTER DECOR ── */}
        <div className="mt-24 h-[1px] w-full max-w-xs mx-auto bg-white/10" />
      </div>
    </section>
  );
}