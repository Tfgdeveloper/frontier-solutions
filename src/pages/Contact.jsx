import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Clock, ChevronDown, Send } from "lucide-react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import PageHero from "../components/sections/UniversalPageHero";


const PROJECT_TAGS = ["Custom Software", "API", "Mobile App", "Cloud / DevOps", "E-commerce", "AI / Automation", "Branding", "SEO / Marketing"];
const BUDGET_OPTIONS = ["Not yet set", "$5k – 15k", "$15k – 50k", "$50k+"];
const TIMELINE_OPTIONS = ["This quarter", "Next quarter", "ASAP", "Just exploring"];

// Static overlap hours (local time) — update these if your actual working hours differ.
const OVERLAP_HOURS = [
  { city: "Karachi", abbr: "PKT", hours: "10:00 – 19:00" },
  { city: "Dubai", abbr: "GST", hours: "09:00 – 18:00" },
  { city: "London", abbr: "GMT/BST", hours: "06:00 – 15:00" },
  { city: "New York", abbr: "ET", hours: "01:00 – 10:00" },
  { city: "Los Angeles", abbr: "PT", hours: "22:00 – 07:00" },
];

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-wider mb-2 text-white/50">{label}</span>
      {children}
    </label>
  );
}

function IconBadge({ icon: Icon }) {
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-[#F06A22]/15">
      <Icon size={18} className="text-[#F06A22]" strokeWidth={2.25} />
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    countryCode: "+92",
    phone: "",
    budget: BUDGET_OPTIONS[0],
    timeline: TIMELINE_OPTIONS[0],
    message: "",
  });
  const [tags, setTags] = useState([]);

  const inputClasses = "w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all duration-200 bg-white/5 border-white/10 text-white placeholder:text-white/30 hover:border-white/20 focus:border-orange-500 focus:bg-white/[0.07]";

  const selectClasses = "w-full appearance-none px-4 py-3 pr-10 rounded-2xl border text-sm outline-none transition-all duration-200 cursor-pointer bg-white/5 border-white/10 text-white hover:border-white/20 focus:border-orange-500";

  const toggleTag = (tag) => setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your email/CRM endpoint of choice
    console.log("Contact form submitted:", { ...form, tags });
  };

  return (
    <div className='bg-[linear-gradient(100deg,_#1F1A4A_0%,_#8C4343_50%,_#E0531A_100%)]'>
      <Header />

      <PageHero
        eyebrow="Let's talk"
        title="Tell us what you're working on."
        description="The more concrete, the better. We'll come back with a starting point — usually a 30-minute call — within one working day."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        tags={["Strategy call", "Scoping", "Proposal", "Kickoff"]}
      />

      <section className="py-20 md:py-28 px-6 md:px-12 transition-colors duration-1000 bg-transparent">
        <div className="max-w-[1400px] mx-auto">
          {/* ── FORM + INFO GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            {/* Form card */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="rounded-[32px] border p-7 md:p-11 space-y-7 shadow-sm bg-[#000]/50 border-white/10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Your name">
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Jane Cooper" className={inputClasses} />
                </Field>
                <Field label="Company">
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc." className={inputClasses} />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Work email">
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputClasses} />
                </Field>
                <Field label="Phone (optional)">
                  <div className="flex gap-2">
                    <div className="relative shrink-0">
                      <select
                        name="countryCode"
                        value={form.countryCode}
                        onChange={handleChange}
                        className={`h-full ${selectClasses} w-[92px] pr-8`}
                      >
                        <option value="+92">PK +92</option>
                        <option value="+971">UAE +971</option>
                        <option value="+44">UK +44</option>
                        <option value="+1">US +1</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" />
                    </div>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="300 1234567" className={`flex-1 ${inputClasses}`} />
                  </div>
                </Field>
              </div>

              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider mb-3 text-white/50">What are you building?</span>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TAGS.map((tag) => {
                    const selected = tags.includes(tag);
                    return (
                      <motion.button
                        type="button"
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                          selected
                            ? "bg-[#F06A22] border-[#F06A22] text-white shadow-[0_4px_14px_rgba(240,106,34,0.35)]"
                            : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
                        }`}
                      >
                        {tag}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="What's your budget range?">
                  <div className="relative">
                    <select name="budget" value={form.budget} onChange={handleChange} className={selectClasses}>
                      {BUDGET_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" />
                  </div>
                </Field>
                <Field label="Timeline">
                  <div className="relative">
                    <select name="timeline" value={form.timeline} onChange={handleChange} className={selectClasses}>
                      {TIMELINE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" />
                  </div>
                </Field>
              </div>

              <Field label="Tell us everything you know about the project">
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Goals, constraints, anything you know so far..."
                  className={`${inputClasses} resize-none`}
                />
              </Field>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                <p className="text-xs max-w-xs text-white/30">
                  By submitting, you agree to our privacy policy. No spam, ever.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-white bg-[linear-gradient(135deg,_#1F1A4A_0%,_#8C4343_50%,_#E0531A_100%)] shadow-[0_10px_25px_rgba(224,83,26,0.25)] hover:shadow-[0_15px_35px_rgba(224,83,26,0.45)] transition-shadow"
                >
                  Send message
                  <Send size={15} />
                </motion.button>
              </div>
            </motion.form>

            {/* ── INFO COLUMN ── */}
            <div className="flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5 }}
                className="rounded-[28px] border p-6 shadow-sm transition-shadow hover:shadow-md bg-[#000]/50 border-white/10"
              >
                <IconBadge icon={Mail} />
                <span className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-white/40">Email</span>
                <a href="mailto:hello@frontiersolutions.pk" className="block text-lg font-bold text-[#F06A22] hover:underline">
                  hello@frontiersolutions.pk
                </a>
                <p className="text-xs mt-1 text-white/40">We reply within one working day.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="rounded-[28px] border p-6 shadow-sm transition-shadow hover:shadow-md bg-[#000]/50 border-white/10"
              >
                <IconBadge icon={MapPin} />
                <span className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-white/40">Karachi HQ</span>
                <p className="text-sm font-semibold leading-relaxed text-white">
                  43/M, 43rd Street,
                  <br />
                  PECHS Block 6, Karachi, Pakistan
                </p>
                <p className="text-xs mt-2 text-white/40">Visits by appointment.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="relative overflow-hidden rounded-[28px] border-2 p-6 shadow-sm transition-shadow hover:shadow-md bg-[#000]/50 border-[#F06A22]"
              >
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] pointer-events-none"
                  style={{ background: "rgba(240,106,34,0.18)" }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <IconBadge icon={Clock} />
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#F06A22] text-white">Mon – Sat</span>
                  </div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-white/40">Live overlap</span>
                  <div className="divide-y divide-white/5">
                    {OVERLAP_HOURS.map((c) => (
                      <div key={c.city} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white/80">{c.city}</span>
                          <span className="text-[10px] uppercase font-semibold text-white/30">{c.abbr}</span>
                        </div>
                        <span className="text-sm font-mono tabular-nums text-white/60">{c.hours}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] mt-3 text-white/30">We're online during any of these windows.</p>
                </div>
              </motion.div>
            </div>
          </div>

          
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;