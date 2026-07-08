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
    <div className='bg-[linear-gradient(100deg,_#1F1A4A_0%,_#8C4343_50%,_#E0531A_100%)]'>
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
        dark ? "bg-transaprent" : "bg-transaprent"
      }`}
    >
     

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-24 pb-16 overflow-hidden relative z-10">
        <div className="relative z-20 max-w-5xl mx-auto">
          
          {/* Heading - Dynamic Color */}
          <h2
            className={`text-[34px] md:text-[56px] font-bold [word-spacing:-8px] md:[word-spacing:-14px] text-center leading-tight transition-colors duration-1000 ${
              dark ? "text-white" : "text-white"
            }`}
          >
            About Frontier  <br className="hidden md:block" /> 
            <span className={dark ? "text-orange-500" : "text-orange-500"}>Solutions</span>
          </h2>

          {/* Text Content - Dynamic Color */}
          
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={0}
              blurStrength={8}
              textClassName={`mt-10 text-center text-lg md:text-xl leading-relaxed transition-colors duration-1000 ${
            dark ? "text-white/70" : "text-white/70"
          }`}
            >
              At Frontier Solutions, we believe technology should do more than solve problems—it should create opportunities. We partner with ambitious startups, growing businesses, and established enterprises to build digital products that are scalable, intelligent, and designed for long-term success.Our team combines strategy, creativity, and engineering excellence to transform ideas into high-performance software. From custom web platforms and mobile applications to AI-powered automation, cloud infrastructure, and digital experiences, every solution we deliver is tailored to our clients' unique goals.
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
    </div>
  );
}

export default About