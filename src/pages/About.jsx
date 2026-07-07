import {React , useState} from "react";
import PageHero from "../components/sections/UniversalPageHero";
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ScrollReveal from "../components/ui/ScrollReveal";
import MissionVision from "../components/sections/MissionVision";
import ProcessTimeline2 from "../components/sections/ProcessSection2";

const About = () => {
    const [dark, setDark] = useState(false);


      
  return (
    <>
    <Header dark={dark} toggleDark={() => setDark(!dark)} />
      <PageHero
        dark={dark}
        eyebrow="Who we are"
        title="About Us"
        description="A hybrid digital engine specializing in high-end experiences, performance advertising, and brand identity."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        tags={["Strategy", "Design", "Development", "Growth"]}
      />

        <section 
      className={`relative w-full overflow-hidden z-0 transition-colors duration-1000 ${
        dark ? "bg-[#0A0A0B]" : "bg-[#F9F9F9]"
      }`}
    >
      {/* ── OPTIONAL: SIGNATURE GRAIN (To match your other sections) ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.4] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="mission-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#mission-noise)" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-24 pb-16 overflow-hidden relative z-10">
        <div className="relative z-20 max-w-5xl mx-auto">
          
          {/* Heading - Dynamic Color */}
          <h2
            className={`text-[34px] md:text-[56px] font-bold [word-spacing:-8px] md:[word-spacing:-14px] text-center leading-tight transition-colors duration-1000 ${
              dark ? "text-white" : "text-black"
            }`}
          >
            One-Stop Solution for All Your <br className="hidden md:block" /> 
            <span className={dark ? "text-orange-500" : "text-[#F06A22]"}>Publishing Needs</span>
          </h2>

          {/* Text Content - Dynamic Color */}
          
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={0}
              blurStrength={8}
              textClassName={`mt-10 text-center text-lg md:text-xl leading-relaxed transition-colors duration-1000 ${
            dark ? "text-white/70" : "text-black/70"
          }`}
            >
              At Seawings Publications, we believe every story deserves to take flight. 
              Our mission is to help authors transform their ideas into beautifully crafted 
              books through professional editing, design, publishing, and global distribution. 
              With creativity and care, we make the publishing process seamless, turning 
              inspiration into a finished book ready to reach readers worldwide. 
              We work closely with every author to ensure their vision shines on every page. 
              From layout and cover design to marketing and platform distribution across 
              Amazon, IngramSpark, Barnes & Noble, Kobo, and Apple Books, Seawings 
              Publications is your trusted partner in every step of the journey. 
              Your story has wings, we help it find the sky it was meant for.
            </ScrollReveal>
         

          {/* Optional: Branding Divider to ground the design */}
          <div className={`mt-16 h-[1px] w-24 mx-auto ${dark ? "bg-white/10" : "bg-black/10"}`} />
          
        </div>
      </div>
        </section>

        <MissionVision dark={dark}/>
        <ProcessTimeline2 dark={dark}/>
      <Footer dark={dark} toggleDark={() => setDark(!dark)} />
      {/* Add your team, story, values sections here */}
    </>
  );
}

export default About