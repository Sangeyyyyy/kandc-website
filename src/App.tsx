import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Reveal,
  LoadingScreen,
  TopNav,
  FooterCTA,
  UtilityFooter,
  WhyKelseyCompany,
  SectionBlender,
  useModal,
  ScrollIndicator,
  ScrollProgressBar
} from './SharedComponents';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    objectPosition: p.objectPosition || 'top center',
  }));

  return (
    <section id="work" className="w-full bg-ink relative">
      <SectionBlender position="top" intensity="h-48" />
      <div className="py-24 px-8 md:px-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <Reveal>
          <h2 className="text-[4rem] lg:text-[7rem] font-serif leading-none tracking-tighter text-cream uppercase">
            OUR <br /><i className="font-light italic text-rose/60">Work.</i>
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-cream/10">
        {featuredProjects.map((project, i) => (
          <div
            key={i}
            className="relative overflow-hidden cursor-pointer group border-r border-cream/10 last:border-r-0 lg:last:border-r"
            style={{ aspectRatio: '2/3' }}
          >
            <span className="absolute top-5 right-5 z-20 font-sans text-[0.55rem] tracking-[0.35em] text-white/40 select-none">
              {project.num}
            </span>

            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              style={{ objectPosition: project.objectPosition }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-opacity duration-700" />
            <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/40 transition-colors duration-700" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
              <p className="font-sans text-[0.5rem] tracking-[0.4em] uppercase text-rose mb-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                {project.category}
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-cream leading-none tracking-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {project.title}
              </h3>
            </div>
          </div>
        ))}

        <Link
          to="/our-work"
          className="relative overflow-hidden cursor-pointer group bg-ink flex flex-col justify-center p-8 md:p-12 border-r border-cream/10 last:border-r-0 shadow-ember hover:shadow-ember-intense transition-shadow duration-700"
          style={{ aspectRatio: '2/3' }}
        >
          <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/20 transition-colors duration-700" />
          
          <div className="relative z-10">
            <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-rose/60 mb-6 group-hover:text-rose transition-colors duration-500">
              Collection Overview
            </p>
            <h3 className="font-serif text-4xl md:text-5xl text-cream leading-[1.1] tracking-tight mb-12">
              View All<br /><i className="font-light italic">Work.</i>
            </h3>
            
            <div className="flex items-center gap-4 text-cream/40 group-hover:text-cream transition-colors duration-500">
              <span className="text-[0.6rem] tracking-[0.3em] uppercase font-sans">{projects.length} Productions</span>
              <div className="h-px w-8 bg-current transform origin-left scale-x-100 group-hover:scale-x-150 transition-transform duration-500" />
              <span className="text-xl">⟶</span>
            </div>
          </div>

          <div className="absolute -bottom-10 -right-10 text-[15rem] font-serif italic text-cream/[0.03] pointer-events-none select-none group-hover:text-cream/[0.05] transition-colors duration-700">
            &
          </div>
        </Link>
      </div>

      <div className="py-12 px-8 md:px-16 border-t border-cream/10">
        <Reveal>
          <p className="text-cream/35 font-serif italic text-lg">{projects.length} productions. One collective.</p>
        </Reveal>
      </div>
    </section>
  );
};

const AboutFounder = () => (
  <section id="who-we-are" className="relative min-h-screen bg-[#0c0508] overflow-hidden flex items-center justify-center border-y border-rose/5">
    <SectionBlender position="top" intensity="h-32" />
    <SectionBlender position="bottom" intensity="h-32" />
    
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <p className="font-serif text-[40vw] leading-none text-cream/[0.025] tracking-tighter watermark-drift" style={{ fontStyle: 'italic', whiteSpace: 'nowrap' }}>KM</p>
    </div>

    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-rose/[0.04] rounded-full blur-[120px] pointer-events-none"></div>

    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 px-8 lg:px-0 max-w-6xl w-full mx-auto py-20 lg:py-24">
      <Reveal className="flex-shrink-0 z-10">
        <div className="float-slow relative">
          <div className="w-[240px] md:w-[280px] lg:w-[340px] aspect-[3/4] rounded-sm overflow-hidden border-2 border-rose/20 shadow-ember-intense relative">
            <img src={getAssetUrl('founder')} alt="Kelsey Matthews" className="w-full h-full object-cover object-top brightness-90 contrast-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
          <div className="absolute inset-[-20px] rounded-sm border border-rose/10 pointer-events-none" style={{ borderStyle: 'dashed' }}></div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-ink border border-rose/20 px-6 py-2 whitespace-nowrap">
            <p className="text-[0.58rem] uppercase tracking-[0.35em] text-rose/70">Kelsey Matthews</p>
          </div>
        </div>
      </Reveal>

      <div className="flex-1 text-center lg:text-left z-10">
        <Reveal delay={200}>
          <p className="text-rose/50 text-[0.62rem] tracking-[0.5em] uppercase mb-8">The Founder</p>

          <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif text-cream leading-[0.88] tracking-tighter mb-8 md:mb-10">
            Where<br /><span className="italic text-rose/85">Culture</span><br />Becomes<br />Brand.
          </h2>

          <p className="text-lg text-cream/50 font-light leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
            An architect of cultural moments. Kelsey Matthews leads a senior collective that transforms brands into cultural institutions.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
            <span className="border border-rose/20 px-5 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-rose/60">Webby Winner</span>
            <span className="border border-rose/20 px-5 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-rose/60">Clio Shortlist</span>
            <span className="border border-rose/20 px-5 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-rose/60">UWG Alumni</span>
          </div>

          <Link
            to="/who-we-are"
            className="inline-block bg-rose/10 border border-rose/40 px-10 py-4 text-[0.65rem] tracking-[0.4em] uppercase text-rose hover:bg-rose hover:text-ink transition-all duration-500"
          >
            Learn More ⟶
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

const ServicesCarousel = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "-70%" : "-74%"]
  );

  return (
    <section id="services" ref={targetRef} className="h-[400vh] bg-ink relative">
      <SectionBlender position="top" intensity="h-48" />
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(96,33,58,0.1)_0%,_transparent_70%)] pointer-events-none" />
        <motion.div style={{ x }} className="flex gap-6 md:gap-12 md:px-32 w-max">
          <div className="w-screen md:w-[40vw] shrink-0 h-[65vh] flex flex-col justify-center px-8 md:px-0 md:pr-12">
            <Reveal>
              <p className="text-rose/50 text-[0.6rem] md:text-xs tracking-[0.3em] uppercase mb-6 md:mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-rose/30"></span> Expertise
              </p>
              <h2 className="text-[3.5rem] md:text-[4rem] lg:text-[7rem] font-serif leading-none tracking-tighter text-cream uppercase mb-6">
                Our <br /><i className="font-light italic text-rose/60">Services.</i>
              </h2>
              <p className="text-cream/50 font-serif italic text-lg md:text-xl max-w-sm md:ml-12">
                From creative inception to flawless execution. Scroll to explore our holistic approach.
              </p>
              <ScrollIndicator text="Scroll horizontally" className="mt-12 md:mt-16 md:ml-12 !justify-start" />
            </Reveal>
          </div>

          {SERVICES_DATA.map((s) => (
            <div key={s.id} className="w-[88vw] md:w-[60vw] lg:w-[45vw] shrink-0 h-[70vh] relative group overflow-hidden border border-cream/10">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-60 group-hover:opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-700" />
              <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end">
                <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                   <span className="text-4xl md:text-6xl font-serif text-rose/40 italic leading-none">{s.id}</span>
                   <div className="h-px bg-rose/30 flex-grow" />
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-cream mb-6 tracking-tight leading-[1.1] transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                  {s.title}
                </h3>
                <p className="text-cream/60 font-sans text-sm md:text-base max-w-md transform translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-150">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
          <div className="w-[6vw] md:hidden shrink-0" />
        </motion.div>
      </div>
      <div className="absolute bottom-0 w-full z-50">
        <SectionBlender position="bottom" intensity="h-48" />
      </div>
    </section>
  );
};

const TrustedBrands = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Task 2.3: Auto-advance
  useEffect(() => {
    if (animating || isHovered) return;
    const interval = setInterval(() => go('next'), 5000);
    return () => clearInterval(interval);
  }, [animating, current, isHovered]);

  const go = (dir: 'next' | 'prev') => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(prev =>
        dir === 'next'
          ? (prev + 1) % PARTNERS.length
          : (prev - 1 + PARTNERS.length) % PARTNERS.length
      );
      setAnimating(false);
    }, 500);
  };

  // Task 2.3: Swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      go(delta > 0 ? 'next' : 'prev');
    }
    touchStartX.current = null;
  };

  const partner = PARTNERS[current];

  return (
    <section 
      id="partnerships" 
      className="bg-ink overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <SectionBlender position="bottom" intensity="h-48" />
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(96,33,58,0.15)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(238,192,191,0.04)_0%,_transparent_60%)] pointer-events-none" />

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[65vh]">

        {/* ─── LEFT: Text Panel ─── */}
        <div className="flex flex-col justify-between p-6 md:p-12 lg:p-16 relative z-10">
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="text-rose/60" style={{ fontSize: '8px' }}>◆</span>
              <span className="text-[0.6rem] tracking-[0.4em] uppercase font-sans text-rose/60">
                {partner.category}
              </span>
            </div>

            {/* Partner Name */}
            <div
              key={`name-${current}`}
              className={`transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              <h2
                className="text-3xl md:text-6xl lg:text-7xl font-serif text-cream leading-none tracking-tighter uppercase mb-4 md:mb-6"
              >
                {partner.name}
              </h2>
              <p className="text-[0.6rem] tracking-[0.3em] uppercase font-sans text-rose/50 mb-6 flex items-center gap-3">
                <span className="w-6 h-px bg-rose/30 inline-block" />
                {partner.role}
              </p>
              <p className="text-rose/50 font-serif italic text-lg md:text-xl leading-relaxed max-w-md">
                {partner.description}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6 md:gap-8 mt-6 md:mt-10">
            <button
              onClick={() => go('prev')}
              className="w-10 h-10 md:w-12 md:h-12 border border-cream/10 flex items-center justify-center text-cream/40 hover:bg-rose/10 hover:border-rose/40 hover:text-rose transition-all duration-500 group"
              aria-label="Previous partner"
            >
              <span className="text-lg group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
            </button>
            <button
              onClick={() => go('next')}
              className="w-10 h-10 md:w-12 md:h-12 border border-cream/10 flex items-center justify-center text-cream/40 hover:bg-rose/10 hover:border-rose/40 hover:text-rose transition-all duration-500 group"
              aria-label="Next partner"
            >
              <span className="text-lg group-hover:translate-x-0.5 transition-transform duration-300">→</span>
            </button>
            <span className="text-[0.6rem] tracking-[0.3em] uppercase font-sans text-cream/20 ml-2 md:ml-2">
              {String(current + 1).padStart(2, '0')} / {String(PARTNERS.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ─── RIGHT: Image Panel ─── */}
        <div className="relative overflow-hidden min-h-[40vh] md:min-h-[50vh] lg:min-h-0">
          {PARTNERS.map((p, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full"
                style={{
                  objectFit: p.objectFit || 'cover',
                  objectPosition: p.objectPosition || 'center',
                  transform: i === current ? 'scale(1.03)' : 'scale(1)',
                  transition: 'transform 8s ease-out',
                }}
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>
          ))}

          {/* Progress dots */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-2 z-20">
            {PARTNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (!animating && i !== current) { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 500); } }}
                className="group p-3 -m-3"
                aria-label={`Go to partner ${i + 1}`}
              >
                <div className={`transition-all duration-500 h-px ${i === current ? 'w-8 md:w-10 bg-rose' : 'w-3 md:w-4 bg-cream/20 group-hover:bg-cream/40'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BOTTOM LOGO STRIP ─── */}
      <div className="border-t border-cream/5 px-4 md:px-16">
        <div className="flex items-center gap-6 md:gap-20 overflow-x-auto hide-scrollbar py-6 md:py-10">
          <span className="text-[0.65rem] tracking-[0.4em] uppercase font-sans text-cream/50 whitespace-nowrap shrink-0">
            All Partners
          </span>
          <div className="w-px h-8 bg-cream/20 shrink-0" />
          {ALL_LOGOS.map((logo, i) => {
            const isActive = logo.name === PARTNERS[current]?.name;
            return (
              <div 
                key={i} 
                className={`shrink-0 group cursor-pointer pt-8 pb-4 px-4 ${PARTNERS.some(p => p.name === logo.name) ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => {
                  const partnerIndex = PARTNERS.findIndex(p => p.name === logo.name);
                  if (partnerIndex !== -1 && !animating && partnerIndex !== current) {
                    setAnimating(true);
                    setTimeout(() => {
                      setCurrent(partnerIndex);
                      setAnimating(false);
                    }, 500);
                  }
                }}
              >
                <img
                  src={getAssetUrl(logo.fileName)}
                  alt={logo.name}
                  className={`h-10 md:h-14 w-auto object-contain transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive 
                      ? 'opacity-100 scale-[1.25] -translate-y-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]' 
                      : 'opacity-40 hover:opacity-80'
                  }`}
                  style={{
                    filter: 'brightness(0) invert(1)',
                    transformOrigin: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
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
        <ServicesCarousel />
        <SelectedWork />
        <TrustedBrands />
        <FooterCTA onBookClick={openModal} />
        <UtilityFooter />
      </div>
    </>
  );
}

export default App;
