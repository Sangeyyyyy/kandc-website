import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Hero3D from './Hero3D';
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
      {/* 3D WebGL Canvas Layer (z-0) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
        >
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        </Canvas>
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
          className="pointer-events-auto"
        >
          <div ref={magneticRef} className="magnetic-button">
            <button
              onClick={onBookClick}
              className="flex items-center gap-3 border border-rose/40 text-rose/80 text-[0.65rem] tracking-[0.3em] uppercase font-sans px-10 py-4 hover:bg-rose/10 hover:border-rose/70 transition-all duration-500 bg-ink/20 backdrop-blur-md"
            >
              <span className="text-rose/40 font-semibold">◆</span>
              Book Consultation
            </button>
          </div>
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
