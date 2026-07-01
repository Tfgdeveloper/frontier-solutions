import React, { useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Custom Software",
    description: "Bespoke platforms, internal tools, SaaS products. Architecture that scales with your operation, code your team can maintain five years from now.",
    gradient: "from-[#111111] to-[#222222]",
    image: "images/Software.jpg", // Replace with your MacBook mockup
    iconColor: "bg-white/10"
  },
  {
    title: "Web Development",
    description: "Conversion-tuned, fast, accessible. Built on Next.js with a headless CMS your marketers will actually use.",
    gradient: "from-[#111111] to-[#222222]",
    image: "images/Website.jpg", // Replace with your MacBook mockup
    iconColor: "bg-white/10"
  },
  {
    title: "Mobile Apps",
    description: "Native iOS & Android, plus React Native when cross-platform is the right call. App Store and Play Store deployment included.",
    gradient: "from-[#111111] to-[#222222]",
    image: "images/Apps.jpg", // Replace with your MacBook mockup
    iconColor: "bg-white/10"
  },
  {
    title: "UI / UX Design",
    description: "Research, IA, prototyping, visual systems. We don't ship Figma files — we ship validated, production-ready designs.",
    gradient: "from-[#111111] to-[#222222]",
    image: "images/UIUX.jpg", // Replace with your MacBook mockup
    iconColor: "bg-white/10"
  },
  {
    title: "Cloud & DevOps",
    description: "AWS, GCP, Azure. CI/CD pipelines, infra-as-code, observability and security. We keep your team shipping while costs stay sane.",
    gradient: "from-[#111111] to-[#222222]",
    image: "images/Cloud.jpg", // Replace with your MacBook mockup
    iconColor: "bg-white/10"
  },
  {
    title: "E-commerce",
    description: "Shopify Plus, custom stacks, headless storefronts. Stores that load fast and convert harder.",
    gradient: "from-[#111111] to-[#222222]",
    image: "images/E-commerce.jpg", // Replace with your MacBook mockup
    iconColor: "bg-white/10"
  },
  {
    title: "Marketing & SEO",
    description: "Search, paid, content, lifecycle. Compounding growth measured against revenue, not vanity metrics.",
    gradient: "from-[#111111] to-[#222222]",
    image: "images/Marketing.jpg", // Replace with your MacBook mockup
    iconColor: "bg-white/10"
  },
  {
    title: "Branding & Graphics",
    description: "Logos, identity systems, packaging, motion. Brands that look unmistakable in every channel.",
    gradient: "from-[#111111] to-[#222222]",
    image: "images/Branding.jpg", // Replace with your MacBook mockup
    iconColor: "bg-white/10"
  },
  {
    title: "AI Automation & Custom Models",
    description: "From workflow automation to bespoke AI models — we ship intelligence that actually moves the needle. Agents that handle the boring work, models tuned to your domain, dashboards that turn data into decisions.",
    gradient: "from-[#111111] to-[#222222]",
    image: "images/Automation.jpg", // Replace with your MacBook mockup
    iconColor: "bg-white/10"
  },
  {
    title: "Judicial Digital Transformation",
    description: "Built on a future-ready framework with FinTech integration in mind — One Bill, One Link, and State Bank of Pakistan compliance.",
    gradient: "from-[#111111] to-[#222222]",
    image: "images/Judicial.jpg", // Replace with your MacBook mockup
    iconColor: "bg-white/10"
  },
];

export default function ServicesSlider({ dark }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className={`py-24 transition-colors duration-1000 ${dark ? "bg-[#0A0A0B] text-white" : "bg-[#F9F9F9] text-[#262262]"}`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-[4rem] font-bold tracking-tight mb-6">
              Services and <br /> <span className="text-[#F06A22]">solutions</span> we offer.
            </h2>
            <p className={`text-lg max-w-lg leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
              We work with creative teams and ambitious founders to turn vision into product — with intuitive UX, standout visuals, and seamless digital experiences.
            </p>
          </div>

          {/* Custom Navigation Arrows */}
          <div className="flex gap-3 mt-40">
            <button 
              onClick={() => scroll("left")}
              className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${
                dark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={() => scroll("right")}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                dark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7 7l7-7-7-7"/></svg>
            </button>
          </div>
        </div>

        {/* ── SLIDER ── */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              
              className={`relative min-w-[320px] md:min-w-[320px] h-[450px] rounded-[40px] overflow-hidden flex flex-col bg-gradient-to-b ${service.gradient}`}
            >
              {/* Content Overlay */}
              <div className="absolute bottom-6 left-4 right-4 z-20 ">
                <h3 className="text-3xl font-bold mb-4 leading-tight text-white">{service.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed ">
                  {service.description}
                </p>
              </div>

              {/* Mockup Image Container */}
              <div className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-auto object-cover transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/50 w-full h-full z-0"></div>
              </div>

              {/* Arrow Icon Button (Bottom Left) */}
              
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSS to hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}