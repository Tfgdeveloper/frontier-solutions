import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PricingCard = ({ title, price, desc, features, isSpecial }) => {
  // LOGIC FOR CARDS 1 & 2
  const normalCardStyles = "bg-[#0A0A0B]/50 text-white border-white/5";

  const normalButtonStyles =
    "bg-[linear-gradient(135deg,_#1F1A4A_0%,_#8C4343_50%,_#E0531A_100%)] text-white shadow-[0_10px_25px_rgba(224,83,26,0.25)] hover:shadow-[0_15px_35px_rgba(224,83,26,0.45)] ";

  // LOGIC FOR CARD 3 (INVERTED)
  const specialCardStyles = "bg-white text-[#0A0A0B] border-transparent shadow-2xl";

  const specialButtonStyles =
    "bg-[linear-gradient(135deg,_#1F1A4A_0%,_#8C4343_50%,_#E0531A_100%)] text-white shadow-[0_10px_25px_rgba(224,83,26,0.25)] hover:shadow-[0_15px_35px_rgba(224,83,26,0.45)] ";

  const cardClasses = isSpecial ? specialCardStyles : normalCardStyles;
  const buttonClasses = isSpecial ? specialButtonStyles : normalButtonStyles;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative flex flex-col p-10 rounded-[24px] border transition-all duration-700 h-full ${cardClasses}`}
    >
      <div className="flex-1">
        <h3 className="text-3xl font-black mb-2 tracking-tight">{title}</h3>
        <p className={`text-sm mb-4 leading-relaxed opacity-70`}>
          {desc}
        </p>

        <div className="flex items-baseline gap-1 mb-5">
          <span className="text-4xl font-medium tracking-tighter">{price}</span>
          <span className="text-xl opacity-40">/mo</span>
        </div>

        <div className="space-y-4 mb-12">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check size={18} className="text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <button className={`w-full py-5 rounded-full font-medium text-sm uppercase tracking-widest transition-all ${buttonClasses}`}>
        Start with {title}
      </button>
    </motion.div>
  );
};

export default function PricingSection() {
  return (
    <section className="py-40 px-6 md:px-12 transition-colors duration-1000 bg-transprent">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-5xl md:text-[4rem] font-black tracking-tighter leading-[0.85] mb-4 text-white">
            One ecosystem.<br /> Infinite <span className="text-[#F06A22]">Growth.</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-white/40">
            Tiered engineering solutions designed to scale with your brand's evolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          <PricingCard 
             title="Sprint"
             price="$8k"
             desc="Best for focused work — a landing page, a feature, a brand refresh."
             features={["Custom React Frontend", "Brand Identity Core", "SEO Foundation", "Performance Analytics"]}
             isSpecial={false}
          />

          <PricingCard 
             title="Retainer"
             price="$5,500"
             desc="Our flagship tier for market leaders requiring full-cycle engineering."
             features={["Next.js Application Engine", "Cloud Infrastructure", "Monthly Creative Sprints", "Full Growth Strategy", "E-Commerce Optimization"]}
             isSpecial={false}
          />

          <PricingCard 
             title="Project"
             price="$12k"
             desc="Horizontal scaling and dedicated bandwidth for global market dominance."
             features={["Dedicated Engineering Team", "Multi-Region Deployment", "Custom AI/Neural Logic", "Security Pentesting", "Priority CMO Feedback"]}
             isSpecial={true}
          />

        </div>
      </div>
    </section>
  );
}