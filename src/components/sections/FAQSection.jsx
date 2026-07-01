import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqData = [
  {
    category: "General",
    questions: [
      { q: "What is Frontier Solutions?", a: "Frontier Solutions is a hybrid digital engineering and brand house specializing in high-performance web products and growth strategies." },
      { q: "How long does it take to set up?", a: "Discovery usually takes 1-2 weeks. A full build can range from 4 to 12 weeks depending on the complexity of the ecosystem." },
      { q: "Do I need technical knowledge?", a: "Not at all. We handle the heavy engineering and provide you with a simplified dashboard and documentation to manage your brand easily." },
      { q: "Is our data secure?", a: "Yes. We implement enterprise-level security protocols and type-safe architecture to ensure 99.9% uptime and bulletproof data integrity." }
    ]
  },
  {
    category: "Design & Features",
    questions: [
      { q: "Do you offer custom branding?", a: "Yes, we build visual identity systems from the ground up, including logos, typography, and motion guidelines." },
      { q: "Can you migrate my existing site?", a: "We specialize in migrating brands from legacy systems to modern stacks like Next.js for better speed and SEO." }
    ]
  },
  {
    category: "Privacy & Access",
    questions: [
      { q: "Who owns the code?", a: "Once the final payment is cleared, you own 100% of the IP and source code of your project." }
    ]
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick, dark }) => (
  <div className={`mb-4 overflow-hidden rounded-[32px] border transition-all duration-500 ${
    dark ? "bg-[#111112] border-white/5" : "bg-white border-black/5"
  }`}>
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between p-8 text-left outline-none"
    >
      <h4 className={`text-lg md:text-xl font-bold tracking-tight ${dark ? "text-white" : "text-[#262262]"}`}>
        {question}
      </h4>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        className={`p-2 rounded-full border ${dark ? "border-white/10" : "border-black/10"}`}
      >
        <ChevronDown size={20} className={dark ? "text-white/40" : "text-black/40"} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={`px-8 pb-8 text-base leading-relaxed ${dark ? "text-white/50" : "text-black/60"}`}>
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FAQSection({ dark }) {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={`py-32 px-6 md:px-12 transition-colors duration-1000 ${
      dark ? "bg-[#050508]" : "bg-[#F9FAFB]"
    }`}>
      <div className="max-w-[1500px] mx-auto">
        
        {/* ── HEADER AREA ── */}
        <div className="">
          <div className="">
            
            <h2 className={`text-5xl md:text-[4rem] font-black tracking-tighter leading-[0.9] ${dark ? "text-white" : "text-[#262262]"}`}>
              Answers To The Questions that <br/><span className="text-[#F06A22]">Come Up Most.</span>
            </h2>
          </div>
          <div className="">
            <p className={`my-4 max-w-2xl text-lg leading-relaxed ${dark ? "text-white/40" : "text-[#262262]/60"}`}>
              Learn how we work, our technical ecosystem, and what to expect when you join the frontier of digital growth.
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          
          {/* LEFT: TABS & CTA */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            
            {/* Tab Selector */}
            

            {/* CTA Card */}
            <div className={`rounded-[40px] p-10 flex flex-col justify-between h-[300px] border ${
              dark ? "bg-[#111112] border-white/5" : "bg-[#262262] text-white"
            }`}>
              <div>
                <h3 className="text-3xl font-black mb-4">Got Questions?</h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-white/40" : "text-white/70"}`}>
                  Can't find what you're looking for? Reach out to our engineers — we're fast.
                </p>
              </div>
              <a href="#" className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:gap-5 transition-all">
                Contact us <ArrowRight size={18} className="text-orange-500" />
              </a>
            </div>
          </div>

          {/* RIGHT: ACCORDION LIST */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                {faqData[activeTab].questions.map((item, i) => (
                  <AccordionItem
                    key={i}
                    question={item.q}
                    answer={item.a}
                    isOpen={openIndex === i}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    dark={dark}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}