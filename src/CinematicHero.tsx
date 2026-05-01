import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TopNav, useMagnetic, SectionBlender } from './SharedComponents';

interface CinematicHeroProps {
  onBookClick: () => void;
}

export default function CinematicHero({ onBookClick }: CinematicHeroProps) {
  const magneticRef = useMagnetic(30);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="h-screen w-full relative overflow-hidden bg-ink">
      {/* Video Background Layer (z-0) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://res.cloudinary.com/dnocvgvnc/video/upload/v1777654541/hero_video.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay to ensure text contrast and maintain brand color feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
      </div>

      {/* Top Navigation Layer (z-50) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 w-full z-50 mix-blend-difference"
      >
        <TopNav active={true} />
      </motion.div>

      {/* HTML Overlay Layer (z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center gap-8 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-6"
        >
          <p className="text-rose/50 text-[0.65rem] tracking-[0.5em] uppercase mb-6 font-sans mix-blend-difference">
            A Creative Collective
          </p>
          <h2 className="text-[10vw] md:text-[6vw] font-serif text-cream leading-[0.9] tracking-tighter uppercase drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] mix-blend-difference">
            Shaping <span className="italic font-light text-rose/80">Brands.</span>
            <br />Telling Stories.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto mt-6 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* PRIMARY CTA - Book Consultation */}
          <div ref={magneticRef} className="magnetic-button inline-block">
            <motion.button
              onClick={onBookClick}
              animate={{ 
                boxShadow: ['0px 0px 20px rgba(238,192,191,0.15)', '0px 0px 45px rgba(238,192,191,0.4)', '0px 0px 20px rgba(238,192,191,0.15)'] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-4 border border-rose/50 text-cream text-[0.65rem] md:text-[0.7rem] tracking-[0.4em] uppercase font-sans px-10 py-5 bg-ink/40 backdrop-blur-xl overflow-hidden group transition-colors duration-500 hover:bg-rose/10 hover:border-rose rounded-sm"
            >
              {/* Sweeping Shimmer Effect */}
              <motion.div 
                className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-rose/25 to-transparent skew-x-[-45deg] z-0"
                animate={{ left: ['-150%', '150%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
              />

              {/* Spinning Diamond */}
              <motion.span 
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="text-rose font-semibold text-[0.55rem] z-10"
              >
                ◆
              </motion.span>
              
              {/* Text */}
              <span className="z-10 font-medium drop-shadow-md tracking-[0.4em]">Book Consultation</span>
              
              {/* Arrow */}
              <span className="z-10 text-rose transform group-hover:translate-x-1.5 transition-transform duration-300">
                ⟶
              </span>
            </motion.button>
          </div>

          {/* SECONDARY CTA - View Our Work */}
          <button
            onClick={() => {
              const workSection = document.getElementById('work');
              if (workSection) {
                workSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative px-6 py-4 flex items-center gap-3 text-[0.65rem] md:text-[0.7rem] tracking-[0.4em] uppercase font-sans text-cream/60 hover:text-cream transition-colors duration-500"
          >
            View Our Work
            <span className="text-cream/40 group-hover:text-cream group-hover:translate-y-1 transition-all duration-300">↓</span>
            {/* Minimalist animated underline */}
            <div className="absolute bottom-2 left-6 right-6 h-[1px] bg-cream/20 group-hover:bg-cream/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40 pointer-events-none mix-blend-difference"
      >
        <span className="text-[0.55rem] tracking-[0.4em] uppercase text-rose/80 font-medium">Explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-rose/60"
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Transition to next section */}
      <div className="absolute bottom-0 w-full z-30">
        <SectionBlender position="bottom" intensity="h-[20vh]" />
      </div>
    </section>
  );
}
