import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { RoadmapStep } from './RoadmapSection'; // Reuse the type

// ─── DATA ───────────────────────────────────────────────────────────────────
const TEST_STEPS: RoadmapStep[] = [
    {
        phase: 'Pre-Production',
        step: '01',
        title: 'Audience Acquisition',
        description: 'Webinar series with key talent and production staff, ahead of premiere to promote film. Social Solicitation across HBCU Student Activities Boards — to amplify premiere.',
        tag: 'Strategy',
    },
    {
        phase: 'Coordination',
        step: '02',
        title: 'Partner Coordination',
        description: 'Coordination with Warner Brothers and NBA for execution and serving as Local market representative — walkthrough, operations, coordinating with university officials, and event staffing.',
        tag: 'Operations',
    },
    {
        phase: 'On-Site Production',
        step: '03',
        title: 'Production & Logistics',
        description: 'Shot list curation, production staff directing, and onsite logistics.',
        tag: 'Execution',
    },
];

// ─── OPTION 1: HORIZONTAL SCROLL ───────────────────────────────────────────
const Option1Horizontal = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%']);

    return (
        <div ref={sectionRef} className="h-[300vh] bg-black">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.div style={{ x }} className="flex w-[300%] h-full">
                    {TEST_STEPS.map((step, i) => (
                        <div key={i} className="w-screen h-full flex flex-col justify-center px-12 md:px-32 bg-[#0d0609] border-r border-white/5">
                            <span className="text-rose/50 text-xs tracking-widest uppercase mb-4">{step.phase}</span>
                            <h2 className="text-7xl font-serif text-cream italic mb-8">{step.title}</h2>
                            <p className="max-w-2xl text-xl text-cream/60 leading-relaxed italic font-serif">{step.description}</p>
                            <div className="mt-12 text-[10vw] font-serif text-burgundy/10 pointer-events-none absolute bottom-10 right-10">{step.step}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const Option2Step = ({ step, i, total, scrollYProgress }: { step: RoadmapStep, i: number, total: number, scrollYProgress: any }) => {
    const start = i / total;
    const end = (i + 1) / total;
    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [start, end], [0.8, 1.2]);
    const y = useTransform(scrollYProgress, [start, end], [100, -100]);

    return (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            <motion.div style={{ opacity, scale, y }} className="text-center px-12">
                <h2 className="text-[12vw] font-serif italic text-cream leading-none tracking-tighter opacity-10 absolute inset-0 flex items-center justify-center select-none">{step.step}</h2>
                <div className="relative z-10">
                    <span className="text-rose text-sm tracking-[0.5em] uppercase mb-12 block">{step.phase}</span>
                    <h3 className="text-6xl md:text-8xl font-serif text-cream italic leading-tight mb-8 max-w-5xl mx-auto">{step.title}</h3>
                    <p className="text-rose/60 text-lg uppercase tracking-widest">{step.tag}</p>
                </div>
            </motion.div>
        </div>
    );
};

// ─── OPTION 2: CINEMATIC TYPOGRAPHY ──────────────────────────────────────────
const Option2Cinematic = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    return (
        <div ref={containerRef} className="h-[400vh] bg-[#0d0609]">
            {TEST_STEPS.map((step, i) => (
                <Option2Step key={i} step={step} i={i} total={TEST_STEPS.length} scrollYProgress={scrollYProgress} />
            ))}
        </div>
    );
};

const Option3Number = ({ step, i, total, scrollYProgress }: { step: RoadmapStep, i: number, total: number, scrollYProgress: any }) => {
    const start = i / total;
    const end = (i + 1) / total;
    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
    const rotate = useTransform(scrollYProgress, [start, end], [0, 360]);
    
    return (
        <motion.div key={i} className="absolute inset-0 flex items-center justify-center text-[30vw] font-serif text-burgundy opacity-10" style={{ opacity, rotate }}>
            {step.step}
        </motion.div>
    );
};

// ─── OPTION 3: STICKY SCRUB MORPHING ────────────────────────────────────────
const Option3Morphing = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    return (
        <div ref={targetRef} className="h-[300vh] bg-black flex py-24">
            <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center">
                <div className="relative w-full h-full">
                     {TEST_STEPS.map((step, i) => (
                        <Option3Number key={i} step={step} i={i} total={TEST_STEPS.length} scrollYProgress={scrollYProgress} />
                     ))}
                </div>
            </div>
            <div className="w-1/2">
                {TEST_STEPS.map((step, i) => (
                    <div key={i} className="h-screen flex flex-col justify-center px-24 border-l border-white/5">
                         <span className="text-rose/50 text-xs tracking-widest uppercase mb-4">{step.phase}</span>
                         <h2 className="text-5xl font-serif text-cream italic mb-8">{step.title}</h2>
                         <p className="text-lg text-cream/70 leading-relaxed font-serif italic">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Option4Step = ({ step, i, total, scrollYProgress }: { step: RoadmapStep, i: number, total: number, scrollYProgress: any }) => {
    const start = i / total;
    const end = (i + 1) / total;
    const clip = useTransform(scrollYProgress, [start, end], [0, 100]);
    const clipPath = useTransform(clip, v => i === 0 ? 'inset(0% 0% 0% 0%)' : `circle(${v}% at 50% 50%)`);
    
    return (
        <motion.div 
            key={i} 
            style={{ clipPath }}
            className="fixed inset-0 h-screen w-full bg-[#0d0609] flex flex-col items-center justify-center text-center px-24 z-10"
        >
             <span className="text-rose text-sm tracking-widest uppercase mb-6">{step.phase}</span>
             <h2 className="text-7xl font-serif text-cream italic mb-10">{step.title}</h2>
             <p className="max-w-2xl text-xl text-cream/50 leading-relaxed font-serif italic">{step.description}</p>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif text-white/5 -z-10">{step.step}</div>
        </motion.div>
    );
};

// ─── OPTION 4: CLIP-PATH REVEAL ─────────────────────────────────────────────
const Option4ClipPath = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    return (
        <div ref={containerRef} className="h-[300vh] bg-black">
             {TEST_STEPS.map((step, i) => (
                <Option4Step key={i} step={step} i={i} total={TEST_STEPS.length} scrollYProgress={scrollYProgress} />
             ))}
        </div>
    );
};

// ─── OPTION 5: 3D DRUM ─────────────────────────────────────────────────────
const Option5Drum = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const rotateX = useTransform(scrollYProgress, [0, 1], [45, -225]);

    return (
        <div ref={targetRef} className="h-[400vh] bg-[#0d0609] overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center" style={{ perspective: '2000px' }}>
                <motion.div 
                    style={{ rotateX, transformStyle: 'preserve-3d' }}
                    className="relative w-[80vw] h-[60vh]"
                >
                    {TEST_STEPS.map((step, i) => {
                        const angle = i * 90;
                        return (
                             <div 
                                key={i}
                                className="absolute inset-0 bg-white/[0.02] border border-white/5 flex flex-col justify-center px-24 p-12 overflow-hidden"
                                style={{ transform: `rotateX(${angle}deg) translateZ(30vh)`, backfaceVisibility: 'hidden' }}
                             >
                                <span className="text-rose text-xs tracking-widest uppercase mb-10">{step.phase}</span>
                                <h2 className="text-6xl font-serif text-cream italic mb-8">{step.title}</h2>
                                <p className="text-lg text-cream/60 leading-relaxed font-serif italic max-w-xl">{step.description}</p>
                                <div className="absolute bottom-0 right-0 text-[20vh] font-serif text-burgundy opacity-10">{step.step}</div>
                             </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

const Option6Step = ({ step, i, total, scrollYProgress }: { step: RoadmapStep, i: number, total: number, scrollYProgress: any }) => {
    const start = i / total;
    const end = (i + 1) / total;
    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [100, 0, 0, -100]);
    
    return (
        <motion.div key={i} className="absolute inset-0 flex flex-col justify-center px-12 md:px-32" style={{ opacity, x }}>
             <span className="text-rose text-xs tracking-widest uppercase mb-4">{step.phase}</span>
             <h2 className="text-6xl font-serif text-cream italic mb-8">{step.title}</h2>
             <p className="text-xl text-cream/60 leading-relaxed font-serif italic max-w-xl">{step.description}</p>
             <div className="mt-12">
                 <span className="roadmap-tag">{step.tag}</span>
             </div>
        </motion.div>
    );
};

// ─── OPTION 6: SPLIT SCREEN ────────────────────────────────────────────────
const Option6Split = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    return (
        <div ref={targetRef} className="h-[300vh] bg-black">
             <div className="sticky top-0 h-screen flex">
                <div className="w-1/3 border-r border-white/5 flex flex-col justify-center items-center">
                    <div className="relative h-2/3 w-px bg-white/10">
                        <motion.div 
                            className="absolute top-0 w-px bg-rose shadow-[0_0_15px_rgba(238,192,191,0.5)]"
                            style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                        />
                         {TEST_STEPS.map((_, i) => (
                            <Option6Dot key={i} i={i} total={TEST_STEPS.length} scrollYProgress={scrollYProgress} />
                        ))}
                    </div>
                </div>
                <div className="w-2/3 overflow-hidden relative">
                    {TEST_STEPS.map((step, i) => (
                        <Option6Step key={i} step={step} i={i} total={TEST_STEPS.length} scrollYProgress={scrollYProgress} />
                    ))}
                </div>
             </div>
        </div>
    );
};

const Option6Dot = ({ i, total, scrollYProgress }: { i: number, total: number, scrollYProgress: any }) => {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-white/20 bg-black z-20" style={{ top: `${(i / (total - 1)) * 100}%` }}>
            <motion.div 
                className="absolute inset-0 rounded-full bg-rose"
                style={{ 
                    scale: useTransform(scrollYProgress, [(i-0.5)/total, i/total, (i+0.5)/total], [0.5, 1.5, 0.5]),
                    opacity: useTransform(scrollYProgress, [(i-0.5)/total, i/total, (i+0.5)/total], [0.2, 1, 0.2])
                }}
            />
        </div>
    );
}

// ─── MAIN PLAYGROUND ────────────────────────────────────────────────────────
const RoadmapPlayground = () => {
    const [selectedOption, setSelectedOption] = useState(1);

    const menuItems = [
        { id: 1, label: '1. Horizontal Scroll' },
        { id: 2, label: '2. Cinematic Typography' },
        { id: 3, label: '3. Morphing Numbers' },
        { id: 4, label: '4. Clip-Path Reveal' },
        { id: 5, label: '5. 3D Drum' },
        { id: 6, label: '6. Split Screen' },
    ];

    return (
        <div className="min-h-screen bg-black text-cream overflow-x-hidden pt-20">
            {/* FIXED SELECTOR */}
            <div className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 py-4">
                <h1 className="text-rose font-serif italic text-xl">Roadmap Prototypes</h1>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedOption(item.id)}
                            className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all whitespace-nowrap ${
                                selectedOption === item.id 
                                ? 'bg-rose text-black font-bold' 
                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* RENDER SELECTED */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedOption}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {selectedOption === 1 && <Option1Horizontal />}
                    {selectedOption === 2 && <Option2Cinematic />}
                    {selectedOption === 3 && <Option3Morphing />}
                    {selectedOption === 4 && <Option4ClipPath />}
                    {selectedOption === 5 && <Option5Drum />}
                    {selectedOption === 6 && <Option6Split />}
                </motion.div>
            </AnimatePresence>

            {/* FOOTER NAV HINT */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-30 z-50">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[0.6rem] tracking-[0.5em] uppercase">Scroll to Test</span>
                    <div className="w-px h-12 bg-gradient-to-b from-rose/50 to-transparent" />
                </div>
            </div>
        </div>
    );
};

export default RoadmapPlayground;
