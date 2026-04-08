import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Reveal, TopNav, CalendlyModal, FooterCTA, UtilityFooter } from './SharedComponents';

// ─── SERVICES DATA ────────────────────────────────────────────────────────────
const servicesData = [
  { id: '01', title: 'Experiential, Integrated Activations & Premieres', description: 'Immersive brand moments, cinematic premieres, and elite staffing management.', image: '/service_activation.png' },
  { id: '02', title: 'Executive Brand Partnership', description: 'Senior-level strategic alliances and brand management.', image: '/service_strategy.png' },
  { id: '03', title: 'Brand Partnerships', description: 'Strategic alliances built on cultural alignment.', image: '/service_cultural.png' },
  { id: '04', title: 'Digital Marketing', description: 'Data-driven strategies that command attention.', image: '/service_digital.png' },
  { id: '05', title: 'Creative Production', description: 'High-end content designed for the cinematic brand narrative.', image: '/service_production.png' },
  { id: '06', title: 'Event Producing and Programming', description: 'End-to-end management from logistical blueprints to the final guest experience.', image: '/service_event_proc.png' },
  { id: '07', title: 'Vendor Management', description: 'Sourcing the best. Managing excellence.', image: '/service_vendor.png' },
  { id: '08', title: 'Media Management', description: 'Capturing the conversation. Commanding the spotlight.', image: '/service_media.png' }
];

// ─── HELPER: SECTION HEADER ───────────────────────────────────────────────────
const LayoutIntro = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div className="pt-32 pb-16 px-8 md:px-16 container mx-auto border-t border-rose/10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 bg-ink">
    <div>
      <p className="text-rose/50 text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
        <span className="w-8 h-px bg-rose/30"></span> Option {num}
      </p>
      <h2 className="text-4xl md:text-6xl font-serif text-cream tracking-tight max-w-3xl">
        {title}
      </h2>
    </div>
    <div className="md:text-right max-w-sm">
      <p className="font-serif italic text-cream/40 text-lg md:text-xl">
        {desc}
      </p>
    </div>
  </div>
);

// ─── LAYOUT 1: INTERACTIVE HOVER-LIST ─────────────────────────────────────────
const LayoutHoverList = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="min-h-screen bg-ink relative border-y border-rose/5 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative h-full min-h-[80vh]">
        {/* Left Column: Scrolling List */}
        <div className="flex flex-col py-12 px-8 md:px-16 relative z-10 lg:h-screen overflow-y-auto hide-scrollbar">
          {servicesData.map((s, i) => (
            <div
              key={s.id}
              onMouseEnter={() => setActiveIdx(i)}
              className="py-10 border-b border-cream/5 group cursor-pointer"
            >
              <div className="flex flex-col gap-4">
                <span className={`text-[0.6rem] tracking-[0.4em] font-sans transition-colors duration-500 ${activeIdx === i ? 'text-rose' : 'text-cream/20 group-hover:text-rose/60'}`}>
                  {s.id}
                </span>
                <h3 className={`text-4xl md:text-5xl lg:text-6xl font-serif transition-colors duration-500 ${activeIdx === i ? 'text-cream italic' : 'text-cream/40 group-hover:text-cream/70'}`}>
                  {s.title}
                </h3>
                
                {/* Expandable description on active */}
                <div className={`overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${activeIdx === i ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="text-rose/60 font-serif italic text-lg max-w-md">
                    {s.description}
                  </p>
                  <button className="mt-8 text-xs tracking-[0.2em] text-cream uppercase border-b border-cream/20 pb-1 hover:border-cream transition-colors duration-300">
                    Explore Service
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="py-20 lg:py-64" /> {/* Scrolling padding */}
        </div>

        {/* Right Column: Sticky Image Panel */}
        <div className="hidden lg:block lg:sticky top-0 h-screen w-full relative z-0">
          {servicesData.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${activeIdx === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
            >
              <img src={s.image} alt={s.title} className="w-full h-full object-cover grayscale-[30%]" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 bg-burgundy/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// ─── LAYOUT 2: ASYMMETRIC BENTO GRID ──────────────────────────────────────────
const LayoutBentoGrid = () => {
  return (
    <section className="bg-ink py-24 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[300px] gap-4">
          {servicesData.map((s, i) => {
            // Determine size based on index to create asymmetry
            let spanClasses = "col-span-1 row-span-1";
            let showImage = false;
            
            if (i === 0) { spanClasses = "md:col-span-2 md:row-span-2"; showImage = true; }
            else if (i === 4) { spanClasses = "md:col-span-3 md:row-span-2"; showImage = true; }
            else if (i === 7) { spanClasses = "md:col-span-2 md:row-span-2"; showImage = true; }
            else if (i % 3 === 0) { showImage = true; }

            return (
              <div
                key={s.id}
                className={`${spanClasses} relative group overflow-hidden bg-ink border border-cream/10 p-8 flex flex-col justify-end min-h-[250px] shadow-ember/5 hover:shadow-root hover:border-cream/20 transition-all duration-700`}
              >
                {showImage && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                     <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105 opacity-40 group-hover:opacity-60" />
                     <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                  </div>
                )}
                {!showImage && (
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-cream/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                )}

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <span className="text-[0.55rem] tracking-[0.4em] uppercase text-rose/50 mb-auto drop-shadow-md">
                    {s.id}
                  </span>
                  
                  <div>
                    <h3 className={`font-serif text-cream leading-tight ${showImage ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'} mb-4 drop-shadow-md`}>
                      {s.title}
                    </h3>
                    
                    <div className="grid max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
                      <p className="text-cream/60 font-sans text-sm md:text-base mb-6 drop-shadow-md pb-2">
                        {s.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-cream/40 group-hover:text-rose transition-colors duration-500">
                      <span className="text-[0.6rem] tracking-[0.3em] uppercase font-sans">Details</span>
                      <div className="h-px w-8 bg-current transform origin-left scale-x-100 group-hover:scale-x-150 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


// ─── LAYOUT 3: CINEMATIC HORIZONTAL SCROLL ────────────────────────────────────
const LayoutHorizontalScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate translation based on number of items vs viewport width
  // We want to scroll across perfectly. 
  // Map 0 -> 1 scroll to 0% -> -80% translation roughly
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} className="h-[400vh] bg-ink relative">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden border-y border-rose/10">
        
        {/* Background ambient noise */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(96,33,58,0.1)_0%,_transparent_70%)] pointer-events-none" />

        <motion.div style={{ x }} className="flex gap-12 px-16 md:px-32 w-max">
          
          {/* Title Card */}
          <div className="w-[80vw] md:w-[40vw] shrink-0 h-[65vh] flex flex-col justify-center pr-12">
            <p className="text-rose/50 text-xs tracking-[0.3em] uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-rose/30"></span> Our Capabilities
            </p>
            <h2 className="text-5xl md:text-8xl font-serif text-cream leading-none tracking-tighter uppercase mb-6">
              The <br /><i className="font-light italic text-rose/60">Practice.</i>
            </h2>
            <p className="text-cream/50 font-serif italic text-xl max-w-sm ml-12">
              From creative inception to flawless execution. Scroll to explore our holistic approach.
            </p>
            <div className="mt-16 ml-12 flex items-center gap-4 text-rose/40 animate-pulse">
              <div className="w-16 h-px bg-rose/40" />
              <span className="text-xs tracking-widest uppercase">Scroll horizontally</span>
            </div>
          </div>

          {/* Service Cards */}
          {servicesData.map((s) => (
            <div key={s.id} className="w-[85vw] md:w-[60vw] lg:w-[45vw] shrink-0 h-[70vh] relative group overflow-hidden border border-cream/10">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-60 group-hover:opacity-80" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-700" />
              
              <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end">
                <div className="flex items-center gap-6 mb-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                   <span className="text-4xl md:text-6xl font-serif text-rose/40 italic leading-none">{s.id}</span>
                   <div className="h-px bg-rose/30 flex-grow" />
                </div>
                
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-cream mb-6 tracking-tight leading-[1.1] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                  {s.title}
                </h3>
                
                <p className="text-cream/60 font-sans text-sm md:text-base max-w-md transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-150">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
          
        </motion.div>
      </div>
    </section>
  );
};


// ─── LAYOUT 4: EXPANDABLE VERTICAL ACCORDION ──────────────────────────────────
const LayoutAccordion = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section className="bg-ink py-24 md:py-40 border-y border-rose/10">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="border-t border-cream/20">
          {servicesData.map((s, i) => {
            const isExpanded = expanded === i;
            return (
              <div key={s.id} className="border-b border-cream/20 group">
                {/* Header (Clickable) */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  className="w-full py-8 md:py-12 flex items-center justify-between text-left hover:bg-cream/[0.02] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full">
                    <span className="text-rose text-sm tracking-[0.3em] font-sans opacity-60 w-12 shrink-0">{s.id}</span>
                    <h3 className={`text-3xl md:text-5xl lg:text-6xl font-serif transition-colors duration-500 ${isExpanded ? 'text-cream italic' : 'text-cream/60 group-hover:text-cream'}`}>
                      {s.title}
                    </h3>
                  </div>
                  
                  {/* Plus/Minus Icon */}
                  <div className="w-8 h-8 relative shrink-0 ml-8 text-cream/40 group-hover:text-rose transition-colors">
                     <span className={`absolute top-1/2 left-0 w-full h-[1px] bg-current transform -translate-y-1/2 transition-transform duration-500`} />
                     <span className={`absolute top-1/2 left-0 w-full h-[1px] bg-current transform -translate-y-1/2 transition-transform duration-500 ${isExpanded ? 'rotate-0' : 'rotate-90'}`} />
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 md:pb-16 flex flex-col lg:flex-row gap-12 lg:gap-24 pl-0 md:pl-28">
                        <div className="lg:w-1/3 flex flex-col justify-end">
                          <p className="text-lg md:text-xl font-serif italic text-rose/80 mb-8 leading-relaxed">
                            "{s.description}"
                          </p>
                          <button className="text-[0.6rem] tracking-[0.3em] font-sans uppercase text-cream/50 hover:text-rose flex items-center gap-4 group/btn w-max">
                            View Case Studies 
                            <span className="w-8 h-px bg-current transform origin-left group-hover/btn:scale-x-150 transition-transform duration-300" />
                          </button>
                        </div>
                        
                        <div className="lg:w-2/3 max-h-[400px] overflow-hidden">
                          <img src={s.image} alt={s.title} className="w-full h-full object-cover grayscale-[20%]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


// ─── LAYOUT 5: STICKY SCROLLSPY INDEX ─────────────────────────────────────────
const LayoutScrollspy = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Simple scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const viewportMid = window.innerHeight / 2;
      let closestIdx = activeIdx;
      let minDistance = Infinity;

      itemRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        // Distance from middle of element to middle of viewport
        const elMid = rect.top + rect.height / 2;
        const distance = Math.abs(elMid - viewportMid);
        
        // Element is somewhat on screen
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      if (closestIdx !== activeIdx) {
        setActiveIdx(closestIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIdx]);

  return (
    <section className="bg-ink relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 relative h-full">
        
        {/* Left Column: List */}
        <div className="flex flex-col relative z-10 pt-20 pb-64 px-8 md:px-16 container mx-auto">
          {servicesData.map((s, i) => (
            <div
              key={s.id}
              ref={el => { itemRefs.current[i] = el; }}
              className={`py-24 md:py-48 transition-opacity duration-1000 ${activeIdx === i ? 'opacity-100' : 'opacity-20'}`}
            >
              <div className="flex items-center gap-6 mb-8 text-rose uppercase tracking-[0.3em] text-[0.6rem] font-sans">
                <span>{s.id}</span>
                <div className="w-12 h-px bg-rose/40" />
              </div>
              
              <h3 className={`text-4xl md:text-6xl lg:text-7xl font-serif text-cream mb-8 leading-[1.1] tracking-tight ${activeIdx === i ? 'italic' : ''}`}>
                {s.title}
              </h3>
              
              <p className="text-cream/60 font-serif italic text-xl md:text-2xl max-w-md mb-12 leading-relaxed">
                {s.description}
              </p>
              
              <button className="border border-cream/20 px-8 py-4 text-[0.6rem] tracking-[0.3em] font-sans uppercase text-cream/70 hover:bg-cream hover:text-ink transition-all duration-500">
                Explore Process
              </button>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Media Display */}
        <div className="hidden md:flex sticky top-0 h-screen w-full items-center justify-center p-16">
          <div className="w-full h-full max-h-[85vh] relative overflow-hidden border border-cream/10 bg-ink">
             <AnimatePresence mode="wait">
               <motion.img
                 key={activeIdx}
                 src={servicesData[activeIdx].image}
                 alt={servicesData[activeIdx].title}
                 initial={{ opacity: 0, scale: 1.05 }}
                 animate={{ opacity: 0.8, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 transition={{ duration: 0.8, ease: "easeInOut" }}
                 className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
               />
             </AnimatePresence>
             
             {/* Gradient framing to blend perfectly with ink bg */}
             <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
             <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink via-ink/20 to-transparent" />
             <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
             <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink via-ink/20 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
};


// ─── MAIN TEST PAGE COMPONENT ─────────────────────────────────────────────────
export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-ink min-h-screen text-cream selection:bg-rose selection:text-ink pb-32">
        <TopNav active={true} />
        
        {/* Intro Header */}
        <div className="pt-48 pb-24 px-8 md:px-16 container mx-auto text-center border-b border-rose/10 bg-[radial-gradient(ellipse_at_top,_rgba(96,33,58,0.2)_0%,_rgba(11,11,11,1)_70%)]">
          <Reveal>
            <p className="font-sans tracking-[0.4em] uppercase text-[0.6rem] text-rose/60 mb-6">Prototyping Sandbox</p>
            <h1 className="text-5xl md:text-8xl font-serif text-cream mb-8 leading-[0.9] tracking-tighter uppercase">
              Services <span className="font-light italic text-rose">Layouts</span>.
            </h1>
            <p className="font-serif italic text-cream/40 text-lg md:text-xl max-w-2xl mx-auto">
              5 distinct, premium layout options to replace the current single-slide Service Carousel. Scroll down to review.
            </p>
          </Reveal>
        </div>

        <LayoutIntro num="01" title="Interactive Hover-List" desc="The Luxury Standard. Instantly scannable, highly interactive, and beautiful." />
        <LayoutHoverList />
        
        <LayoutIntro num="02" title="Asymmetric Bento Grid" desc="Dynamic & Editorial. Perfect for injecting visual rhythm and breaking monotonicity." />
        <LayoutBentoGrid />
        
        <LayoutIntro num="03" title="Cinematic Horizontal Scroll" desc="Immersive storytelling. Uses vertical scroll to drive horizontal movement." />
        <LayoutHorizontalScroll />
        
        <LayoutIntro num="04" title="Expandable Vertical Accordion" desc="Clean & tactile. Saves vertical space while providing satisfying reveals." />
        <LayoutAccordion />

        <LayoutIntro num="05" title="Sticky Scrollspy Index" desc="Structured & elegant. List formats on the left while a massive sticky image updates on the right." />
        <LayoutScrollspy />

        {/* Closing spacer before footer */}
        <div className="py-24 bg-ink" />

        <FooterCTA onBookClick={() => setIsModalOpen(true)} />
        <UtilityFooter />
      </div>

      <CalendlyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
