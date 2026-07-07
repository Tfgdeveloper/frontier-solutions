import React, { useState } from 'react'
import Header from '../components/layout/Header'
import HeroSection from '../components/sections/HeroSection'
import LogoLoop from '../components/sections/LogoCarousel'
import ServicesBento from '../components/sections/ServicesSlider'
import CaseStudies from '../components/sections/CaseStudies'
import ProcessSection from '../components/sections/ProcessSection'
import TechStack from '../components/sections/TechCard'
import TestimonialSection from '../components/sections/TestimonialSection'
import PricingSection from '../components/sections/PricingSection'
import FAQSection from '../components/sections/FAQSection'
import Footer from '../components/layout/Footer'
import UniversalPageHero from '../components/sections/UniversalPageHero'
import PageHero from '../components/sections/UniversalPageHero'

const Home = () => {
    const [dark, setDark] = useState(false);
  
  return (
    <div>
      <Header dark={dark} toggleDark={() => setDark(!dark)} />
      <HeroSection dark={dark}/>  
      <LogoLoop dark={dark}/>
      <ServicesBento dark={dark}/>
      <CaseStudies dark={dark}/>
      <ProcessSection dark={dark}/>
      <TechStack dark={dark}/>
      <TestimonialSection dark={dark}/>
      <PricingSection dark={dark}/>
      
      <Footer dark={dark} toggleDark={() => setDark(!dark)} />
    </div>
  )
}

export default Home
