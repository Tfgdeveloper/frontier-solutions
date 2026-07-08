import {React , useState} from "react";
import PageHero from "../components/sections/UniversalPageHero";
import CaseStudies from "../components/sections/CaseStudies";
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CaseStudies2 from "../components/sections/CaseStudies2";

const Work = () => {
  const [dark, setDark] = useState(false);
  return (
    <div className='bg-[linear-gradient(100deg,_#1F1A4A_0%,_#8C4343_50%,_#E0531A_100%)]'>
    <Header dark={dark} toggleDark={() => setDark(!dark)} />
      <PageHero
        dark={dark}
        eyebrow="Selected work"
        title="Portfolio"
        description="A look at the campaigns and products we've shipped for our partners."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        tags={["Fintech", "SaaS", "D2C", "Hospitality"]}
      />
      <CaseStudies2 dark={dark} />
      <Footer dark={dark} toggleDark={() => setDark(!dark)} />
    </div>
  );
}

export default Work