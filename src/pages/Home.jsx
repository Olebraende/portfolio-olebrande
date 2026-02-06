import { useLanguage } from '../hooks/useLanguage';
import { usePageMeta } from '../utils/usePageMeta';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import FeaturedProjects from '../components/sections/FeaturedProjects';

const Home = () => {
  const { language } = useLanguage();
  
  // Set page meta tags
  usePageMeta(
    language === 'no' 
      ? 'Ole Mathias Brænde | Frontend Developer & IT-Konsulent'
      : 'Ole Mathias Brænde | Frontend Developer & IT Consultant',
    language === 'no'
      ? 'Ole Mathias Brænde - Frontend utvikler og IT-konsulent. Spesialisert i webutvikling, hosting og vedlikehold av moderne webløsninger.'
      : 'Ole Mathias Brænde - Frontend developer and IT consultant. Specialized in web development, hosting, and maintenance of modern web solutions.'
  );

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
    </>
  );
};

export default Home;