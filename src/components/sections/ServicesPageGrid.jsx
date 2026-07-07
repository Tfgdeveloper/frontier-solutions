import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  Smartphone,
  Palette,
  CloudCog,
  ShoppingBag,
  TrendingUp,
  Sparkles,
  BrainCircuit,
  Landmark,
} from "lucide-react";

// ── DATA (single source of truth) — each service gets an icon identity, one shared theme accent ──

const SERVICES = [
  {
    category: "Engineering",
    title: "Custom Software",
    desc: "Bespoke platforms, internal tools, SaaS products. Architecture that scales with your operation, code your team can maintain five years from now.",
    tags: ["Architecture", "API Design", "Web App", "QA", "DevOps", "Maintenance"],
    Icon: Code2,
  },
  {
    category: "Web",
    title: "Web Development",
    desc: "Conversion-tuned, fast, accessible. Built on Next.js with a headless CMS your marketers will actually use — from marketing sites to dashboards to headless storefronts.",
    tags: ["Next.js", "Headless CMS", "E-commerce", "Performance"],
    Icon: Globe,
  },
  {
    category: "Mobile",
    title: "Mobile Apps",
    desc: "Native iOS & Android, plus React Native when cross-platform is the right call. App Store and Play Store deployment included.",
    tags: ["Swift", "Kotlin", "React Native", "Expo", "Push"],
    Icon: Smartphone,
  },
  {
    category: "Product",
    title: "UI / UX Design",
    desc: "Research, IA, prototyping, visual systems. We don't ship Figma files — we ship validated, production-ready designs.",
    tags: ["Usability", "Wireframes", "Prototype", "Design System"],
    Icon: Palette,
  },
  {
    category: "Infrastructure",
    title: "Cloud & DevOps",
    desc: "AWS, GCP, Azure. CI/CD pipelines, infra-as-code, observability and security. We keep your team shipping while costs stay sane.",
    stats: [
      { label: "Average uptime", value: "99.98%" },
      { label: "Faster deploys", value: "14x" },
      { label: "Deploy frequency", value: "+42%" },
      { label: "Security breaches", value: "0" },
    ],
    Icon: CloudCog,
  },
  {
    category: "Commerce",
    title: "E-commerce",
    desc: "Shopify Plus, custom stacks, headless storefronts. Stores that load fast and convert harder.",
    tags: ["Shopify Plus", "Headless", "Checkout UX"],
    Icon: ShoppingBag,
  },
  {
    category: "Growth",
    title: "Marketing & SEO",
    desc: "Search, paid, content, lifecycle. Compounding growth measured against revenue, not vanity metrics.",
    tags: ["SEO", "Paid Media", "Lifecycle", "Content"],
    Icon: TrendingUp,
  },
  {
    category: "Identity",
    title: "Branding & Graphics",
    desc: "Logos, identity systems, packaging, motion. Brands that look unmistakable in every channel.",
    tags: ["Identity Systems", "Packaging", "Motion"],
    Icon: Sparkles,
  },
  {
    category: "Artificial Intelligence",
    title: "AI Automation & Custom Models",
    desc: "From workflow automation to bespoke AI models — we ship intelligence that actually moves the needle. Agents that handle the boring work, models tuned to your domain.",
    stats: [
      { label: "Efficiency gain", value: "10x" },
      { label: "Active support", value: "24/7" },
      { label: "Niche datasets", value: "Custom" },
      { label: "Privacy level", value: "Full" },
    ],
    Icon: BrainCircuit,
  },
  {
    category: "Public Sector",
    title: "Judicial Digital Transformation",
    desc: "Built on a future-ready framework with FinTech integration in mind — One Bill, One Link, and State Bank of Pakistan compliance.",
    tags: ["SBP Compliant", "One Bill / One Link", "Enterprise Grade", "Audit Ready"],
    Icon: Landmark,
  },
];

const ACCENT = "#F06A22";

const tagContainer = { hidden: {}, shown: { transition: { staggerChildren: 0.05 } } };
const tagItem = {
  hidden: { opacity: 0, scale: 0.7, y: 8 },
  shown: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 18 } },
};

export default function ServicesPageGrid({ dark }) {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];

  return (
    <section className={`relative py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-1000 ${dark ? "bg-[#0A0A0B]" : "bg-[#F9F9F9]"}`}>
      <div className="max-w-[1500px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-16">
          <h2 className={`text-4xl md:text-6xl font-black tracking-tighter leading-none ${dark ? "text-white" : "text-[#262262]"}`}>
            Ten disciplines.
            <br />
            <span style={{ color: ACCENT }}>One studio.</span>
          </h2>
        </div>

        {/* ── MOBILE: horizontal scroll tabs ── */}
        <div className="lg:hidden flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6 -mx-6 px-6">
          {SERVICES.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={s.title}
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.94 }}
                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors"
                style={{
                  backgroundColor: isActive ? ACCENT : "transparent",
                  borderColor: isActive ? ACCENT : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                  color: isActive ? "#fff" : dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                }}
              >
                <s.Icon size={14} />
                {s.title}
              </motion.button>
            );
          })}
        </div>

        {/* ── DESKTOP: sidebar + content panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 xl:gap-16">
          {/* Sidebar */}
          <nav className="hidden lg:flex flex-col gap-1 sticky top-28 self-start">
            {SERVICES.map((s, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={s.title}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 4 }}
                  className="relative text-left px-4 py-3 rounded-2xl transition-colors duration-300 flex items-center gap-3"
                  style={{ backgroundColor: isActive ? `${ACCENT}1A` : "transparent" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebarIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                  )}

                  <motion.span
                    animate={{
                      backgroundColor: isActive ? ACCENT : dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                      scale: isActive ? 1 : 0.9,
                    }}
                    whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  >
                    <s.Icon size={16} color={isActive ? "#fff" : ACCENT} />
                  </motion.span>

                  <span>
                    <span
                      className={`block text-sm font-semibold transition-colors duration-300 ${
                        isActive ? (dark ? "text-white" : "text-[#262262]") : dark ? "text-white/40" : "text-black/40"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className={`block text-[11px] mt-0.5 ${dark ? "text-white/25" : "text-black/25"}`}>{s.category}</span>
                  </span>
                </motion.button>
              );
            })}
          </nav>

          {/* Content panel */}
          <div className={`relative rounded-[32px] md:rounded-[40px] border p-8 md:p-14 min-h-[440px] overflow-hidden ${dark ? "bg-[#111112] border-white/5" : "bg-[#F9F9F9] border-black/5"}`}>
            {/* Morphing color blob — shifts hue with the active service */}
            <AnimatePresence>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.25, scale: 1, rotate: [0, 20, 0] }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 1.2, rotate: { duration: 10, repeat: Infinity, ease: "linear" } }}
                className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] pointer-events-none"
                style={{ background: ACCENT }}
              />
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative"
              >
                {/* Bouncy icon badge */}
                <motion.div
                  key={`icon-${active}`}
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.05 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: ACCENT }}
                >
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <service.Icon size={28} color="#fff" />
                  </motion.div>
                </motion.div>

                <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
                  {service.category}
                </span>
                <h3 className={`text-3xl md:text-5xl font-black tracking-tighter mt-4 mb-6 leading-none ${dark ? "text-white" : "text-[#262262]"}`}>
                  {service.title}
                </h3>
                <p className={`text-base md:text-lg leading-relaxed max-w-2xl mb-10 ${dark ? "text-white/60" : "text-black/60"}`}>
                  {service.desc}
                </p>

                {service.stats ? (
                  <motion.div variants={tagContainer} initial="hidden" animate="shown" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {service.stats.map((s) => (
                      <motion.div
                        key={s.label}
                        variants={tagItem}
                        whileHover={{ y: -3, scale: 1.03 }}
                        className={`p-5 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-black/5"}`}
                      >
                        <div className="text-2xl font-black leading-none mb-1" style={{ color: ACCENT }}>
                          {s.value}
                        </div>
                        <div className={`text-[10px] uppercase font-bold tracking-widest ${dark ? "text-white/40" : "text-black/40"}`}>{s.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div variants={tagContainer} initial="hidden" animate="shown" className="flex flex-wrap gap-2">
                    {service.tags.map((t) => (
                      <motion.span
                        key={t}
                        variants={tagItem}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono border"
                        style={{ backgroundColor: `${ACCENT}15`, borderColor: `${ACCENT}30`, color: ACCENT }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {/* Prev / Next */}
                <div className="flex items-center gap-3 mt-12 pt-8 border-t border-black/5 dark:border-white/5">
                  <motion.button
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActive((active - 1 + SERVICES.length) % SERVICES.length)}
                    className={`text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                      dark ? "border-white/10 text-white/50 hover:text-white" : "border-black/10 text-black/50 hover:text-black"
                    }`}
                  >
                    ← Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActive((active + 1) % SERVICES.length)}
                    className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Next →
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
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