import {React , useState} from "react";
import PageHero from "../components/sections/UniversalPageHero";
import ServicesSlider from "../components/sections/ServicesSlider";
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ServicesPageGrid from "../components/sections/ServicesPageGrid";
import PortfolioGrid from "../components/sections/CaseStudies2";

const Services = () => {
  const [dark, setDark] = useState(false);
  return (
    <>
    <Header dark={dark} toggleDark={() => setDark(!dark)} />
      <PageHero
        dark={dark}
        eyebrow="What we do"
        title="Services"
        description="Full-cycle engineering, design, and growth — under one roof."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        tags={["Software", "Web", "Mobile", "Design", "Cloud", "Marketing"]}
      />
      <ServicesPageGrid dark={dark}/>
      <Footer dark={dark} toggleDark={() => setDark(!dark)} />
    </>
  );
}

export default Services