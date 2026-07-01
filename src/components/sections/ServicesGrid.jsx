import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "Website Design",
    desc: "Developing custom appearances tailored to your company values and business goals.",
    className: "md:col-span-2 md:row-span-1",
    bg: "rgba(38, 34, 98, 0.2)", // Subtle Frontier Indigo
    icon: "🌐",
    shadow: "shadow-indigo-500/10"
  },
  {
    title: "Digital Product",
    desc: "Innovative shapes and forms for the modern web.",
    className: "md:col-span-1 md:row-span-1",
    bg: "rgba(255, 255, 255, 0.03)",
    icon: "📱",
    shadow: "shadow-white/5"
  },
  {
    title: "Brand Identity",
    desc: "From logos to color palettes, we build height.",
    className: "md:col-span-1 md:row-span-2",
    bg: "rgba(255, 255, 255, 0.03)",
    icon: "✨",
    shadow: "shadow-white/5"
  },
  {
    title: "Frontier.", 
    desc: "Visual & Digital mutuality.",
    className: "md:col-span-1 md:row-span-1 flex items-center justify-center",
    bg: "linear-gradient(135deg, #262262 0%, #F06A22 100%)", // Brand Gradient
    isLogo: true,
    shadow: "shadow-orange-500/20"
  },
  {
    title: "Webflow Dev",
    desc: "Custom responsive sites and e-commerce.",
    className: "md:col-span-1 md:row-span-2",
    bg: "rgba(255, 255, 255, 0.03)",
    icon: "💻",
    shadow: "shadow-white/5"
  },
  {
    title: "Digital Strategy",
    desc: "Spanning across all digital touchpoints.",
    className: "md:col-span-1 md:row-span-1",
    bg: "rgba(255, 255, 255, 0.03)",
    icon: "📊",
    shadow: "shadow-white/5"
  },
  {
    title: "SEO Optimization",
    desc: "Get found by the right people at the right time.",
    className: "md:col-span-1 md:row-span-1",
    bg: "rgba(240, 106, 34, 0.1)", // Subtle Frontier Orange
    icon: "🚀",
    shadow: "shadow-orange-500/5"
  },
  {
    title: "Mobile Apps",
    desc: "Native and cross-platform experiences.",
    className: "md:col-span-1 md:row-span-1",
    bg: "rgba(255, 255, 255, 0.03)",
    icon: "📲",
    shadow: "shadow-white/5"
  },
  {
    title: "Content Creation",
    desc: "Storytelling that resonates with your audience.",
    className: "md:col-span-1 md:row-span-1",
    bg: "rgba(255, 255, 255, 0.03)",
    icon: "✍️",
    shadow: "shadow-white/5"
  }
];

const BentoCard = ({ service }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      style={{ background: service.bg }}
      className={`relative overflow-hidden group p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md flex flex-col justify-between transition-all duration-500 shadow-2xl ${service.shadow} ${service.className}`}
    >
      {/* ── CARD INNER SHADOW/GLOW ── */}
      <div className="absolute -right-16 -top-16 w-44 h-44 bg-white/5 blur-[60px] group-hover:bg-white/10 transition-all duration-700" />
      
      {service.isLogo ? (
         <div className="flex flex-col items-center justify-center h-full text-center">
            <motion.div 
               animate={{ rotate: [12, 15, 12] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl mb-4 border border-white/30" 
            />
            <h3 className="text-2xl font-black tracking-tighter text-white">FRONTIER.</h3>
         </div>
      ) : (
        <>
          <div className="relative z-10">
            <div className="text-4xl mb-6 filter drop-shadow-lg">{service.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[220px]">
              {service.desc}
            </p>
          </div>

          <div className="relative z-10 mt-8">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">
              Learn more
              <ArrowUpRight size={14} />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

const ServicesGrid = () => {
  return (
    <section className="relative py-32 px-6 bg-[#050508] overflow-hidden">
      
      {/* ── BACKGROUND AMBIENT SHADOWS (ORBS) ── */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-orange-500 text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block"
          >
            Capabilities
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
            Our <span className="text-white/30 italic">Expertise</span>
          </h2>
        </div>

        {/* ── THE BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[320px] gap-8">
          {services.map((service, index) => (
            <BentoCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;