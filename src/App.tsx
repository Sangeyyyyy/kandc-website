import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Reveal,
  LoadingScreen,
  TopNav,
  FooterCTA,
  UtilityFooter,
  WhyKelseyCompany,
  ServicesExpertise,
  SectionBlender,
  useModal,
  ScrollIndicator,
  ScrollProgressBar
} from './SharedComponents';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import CinematicHero from './CinematicHero';
import { getAssetUrl } from './utils/assets';
import './index.css';


import { projects } from './data/projects';
import { SERVICES_DATA } from './data/services';
import { PARTNERS, ALL_LOGOS } from './data/partners';



const SelectedWork = () => {
  // Use a subset of projects for the homepage
  const featuredProjects = projects.slice(0, 3).map((p, i) => ({
    num: String(i + 1).padStart(2, '0'),
    title: p.title,
    category: p.category,
    img: p.img,
    slug: p.slug,
    objectPosition: p.objectPosition || 'top center',
  }));

  return (
    <section id="work" className="w-full bg-ink relative">
      <SectionBlender position="top" intensity="h-48" />

      {/* ─── Section Header ─── */}
      <div className="pt-32 pb-16 px-8 md:px-20">
        <Reveal>
          <h2 className="text-[4.5rem] lg:text-[8rem] font-serif leading-none tracking-tighter text-cream uppercase mb-6">
            OUR <br /><i className="font-light italic text-rose/60">Work.</i>
          </h2>
          <p className="text-cream/30 font-light font-sans text-sm max-w-xs leading-relaxed">
            A curated glimpse into our most celebrated productions and cultural campaigns.
          </p>
        </Reveal>
      </div>

      {/* ─── Project Grid ─── */}
      <div className="px-8 md:px-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {featuredProjects.map((project, i) => (
            <Link
              key={i}
              to={`/our-work#${project.slug}`}
              className="relative overflow-hidden cursor-pointer group block rounded-sm"
              style={{ aspectRatio: '2/3' }}
            >
              <span className="absolute top-5 right-5 z-20 font-sans text-[0.55rem] tracking-[0.35em] text-white/30 select-none">
                {project.num}
              </span>

              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                style={{ objectPosition: project.objectPosition }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-700" />
              <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/30 transition-colors duration-700" />

              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9 z-10">
                <p className="font-sans text-[0.5rem] tracking-[0.4em] uppercase text-rose mb-2.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                  {project.category}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl text-cream leading-none tracking-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}

          {/* ─── View All Card ─── */}
          <Link
            to="/our-work"
            className="relative overflow-hidden cursor-pointer group bg-ink/60 border border-cream/8 hover:border-rose/20 flex flex-col justify-end p-9 md:p-12 rounded-sm transition-all duration-700 hover:shadow-ember-intense"
            style={{ aspectRatio: '2/3' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-burgundy/10 via-transparent to-transparent group-hover:from-burgundy/20 transition-all duration-700 rounded-sm" />

            <div className="relative z-10 mt-auto">
              <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-rose/50 mb-8 group-hover:text-rose transition-colors duration-500">
                Full Collection
              </p>
              <h3 className="font-serif text-4xl md:text-5xl text-cream leading-[1.1] tracking-tight mb-10">
                View All<br /><i className="font-light italic">Work.</i>
              </h3>

              <div className="flex items-center gap-4 text-cream/30 group-hover:text-cream transition-colors duration-500">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase font-sans">{projects.length} Productions</span>
                <div className="h-px flex-1 bg-current transform origin-left group-hover:opacity-100 opacity-40 transition-opacity duration-500 max-w-[2rem] group-hover:max-w-[3rem]" />
                <span className="text-xl group-hover:translate-x-1 transition-transform duration-500">⟶</span>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 text-[13rem] font-serif italic text-cream/[0.025] pointer-events-none select-none group-hover:text-cream/[0.045] transition-colors duration-700 leading-none">
              &
            </div>
          </Link>
        </div>
      </div>

      {/* ─── Bottom Strip ─── */}
      <div className="pt-12 pb-20 px-8 md:px-20 flex items-center justify-between">
        <Reveal>
          <p className="text-cream/25 font-serif italic text-base tracking-wide">
            {projects.length} productions. One collective.
          </p>
        </Reveal>
        <Link
          to="/our-work"
          className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-rose/40 hover:text-rose transition-colors duration-500 flex items-center gap-3 group"
        >
          <span>See All Work</span>
          <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
        </Link>
      </div>
    </section>
  );
};

const AboutFounder = () => (
  <section id="who-we-are" className="relative min-h-screen bg-cream overflow-hidden flex items-center justify-center border-y border-burgundy/5 py-24 md:py-32">
    <div className="container mx-auto px-8 max-w-7xl relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left: Text Content */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink leading-tight tracking-tight mb-8">
              Hey, I'm Kelsey, founder of <i className="italic text-burgundy/80">Kelsey & Company.</i>
            </h2>
            
            <div className="space-y-6 text-ink/70 font-light leading-relaxed max-w-lg mb-12">
              <p className="text-lg">
                I’ve been shaping cultural narratives for over a decade, working with top-tier brands, entertainment powerhouses, and visionary leaders. 
              </p>
              <p className="text-lg">
                I built this senior collective to bridge the gap between bold creativity and measurable commerce. We don't just build brands; we build cultural institutions that last.
              </p>
              <p className="text-lg">
                If you're looking for a partner who understands the nuance of culture and the precision of strategy, let's talk. I'd love to hear what you're building.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/who-we-are"
                className="bg-ink text-cream px-10 py-4 text-[0.65rem] tracking-[0.4em] uppercase hover:bg-burgundy transition-all duration-500 rounded-full"
              >
                Learn More ⟶
              </Link>
              <button
                onClick={() => {
                  const footer = document.getElementById('contact');
                  if (footer) footer.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-burgundy/20 px-10 py-4 text-[0.65rem] tracking-[0.4em] uppercase text-ink hover:bg-burgundy/5 transition-all duration-500 rounded-full"
              >
                Book a Call
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right: High-Impact Portrait */}
        <div className="lg:col-span-7 order-1 lg:order-2 w-full">
          <Reveal delay={300}>
            <div className="relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl bg-ink aspect-[4/5] lg:aspect-auto lg:h-[80vh]">
              <img 
                src={getAssetUrl('founder')} 
                alt="Kelsey Matthews" 
                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] transition-transform duration-[3s] group-hover:scale-105" 
              />
              
              {/* Image Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-12 left-12 right-12 z-20 flex justify-between items-end">
                <div>
                  <h4 className="text-cream text-2xl md:text-3xl font-serif mb-1">Kelsey Matthews</h4>
                  <p className="text-rose/60 text-[0.6rem] tracking-[0.3em] uppercase">Founder & Creative Director</p>
                </div>
                
                {/* Social icons */}
                <div className="flex gap-4">
                  <a 
                    href="https://www.instagram.com/thekelseymatthews/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:bg-cream hover:text-ink transition-all duration-500 group"
                  >
                    <Instagram size={16} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/kelsey-matthews-44b60b83/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:bg-cream hover:text-ink transition-all duration-500 group"
                  >
                    <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-burgundy/10 to-transparent pointer-events-none" />
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  </section>
);



const TrustedBrands = () => {
  const brandLogos = [
    { name: 'Warner Bros', file: 'warner-bros-' },
    { name: 'Jordan Brand', file: 'https://img.icons8.com/ios/100/air-jordan.png' },
    { name: 'Disney', file: 'https://img.icons8.com/ios/100/disney-plus.png' },
    { name: 'Paramount', file: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Paramount_Pictures_Logo_2025.svg/500px-Paramount_Pictures_Logo_2025.svg.png' },
    { name: 'BET+', file: 'BET_logo' },
    { name: 'MACRO', file: 'macro_logo' },
    { name: 'NBA', file: 'nba_logo' },
    { name: 'Cannes Lions', file: 'cannes_lions_logo' },
    { name: 'Logitech', file: 'Logitech-Emblem' },
    { name: 'Vice', file: 'vice-logo-transparent', noFilter: true },
    { name: 'NAACP', file: 'NAACP_logo' },
    { name: 'ONE Musicfest', file: 'ONE_Musicfest_Logo' },
    { name: 'Eventnoire', file: 'https://res.cloudinary.com/dnocvgvnc/image/upload/v1778153542/eventnoire.png' },
    { name: 'News UK', file: 'News_UK_logo' },
    { name: 'Jason Harvey', file: 'jason_harvey_logo' },
    { name: 'SXSW', file: 'SXSW_logo' },
    { name: 'CES', file: 'CES_logo' },
    { name: 'Blackat Cannes', file: 'BLKAT_FinalLogoColor_2' },
  ];

  return (
    <section id="partnerships" className="bg-ink py-32 md:py-48 relative overflow-hidden">
      <SectionBlender position="bottom" intensity="h-48" />
      
      <div className="container mx-auto px-8 max-w-[1400px] relative z-10">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-sm md:text-base font-sans tracking-[0.8em] text-cream/60 uppercase">
              Chosen by Visionaries
            </h2>
            <div className="h-px w-12 bg-rose/10 mx-auto mt-8" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-cream/[0.05] border border-cream/[0.05] rounded-sm overflow-hidden shadow-2xl">
          {brandLogos.map((logo, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className="aspect-square bg-ink flex items-center justify-center p-10 group hover:bg-burgundy/[0.03] transition-all duration-700">
                <img
                  src={logo.file.startsWith('http') ? logo.file : getAssetUrl(logo.file)}
                  alt={logo.name}
                  className={`w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-all duration-1000 grayscale ${logo.noFilter ? '' : 'brightness-0 invert'} group-hover:scale-105`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(96,33,58,0.05)_0%,_transparent_70%)] pointer-events-none" />
    </section>
  );
};




// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function App() {
  const [loaded, setLoaded] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    document.title = "Kelsey & Company | Cultural Brand Architects";
  }, []);

  return (
    <>
      <ScrollProgressBar />
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <div
        className={`bg-ink text-cream min-h-screen selection:bg-rose selection:text-ink transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <TopNav active={loaded} />
        <CinematicHero onBookClick={openModal} />
        <AboutFounder />
        <WhyKelseyCompany />
        <ServicesExpertise />
        <SelectedWork />
        <TrustedBrands />
        <FooterCTA onBookClick={openModal} />
        <UtilityFooter />
      </div>
    </>
  );
}

export default App;
