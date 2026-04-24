import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type RoadmapStep = {
    phase: string;
    step: string;
    title: string;
    description: string;
    tag: string;
    media?: string;
    mediaPosition?: string;
};

interface RoadmapSectionProps {
    steps: RoadmapStep[];
    scrollRef?: React.RefObject<HTMLDivElement | null>; // kept optional for compat
}

// ─── BACKGROUND ───────────────────────────────────────────────────────────────
const Bg: React.FC<{ step: RoadmapStep }> = ({ step }) => (
    <motion.div
        key={`${step.step}-${step.phase}`}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
        {step.media ? (
            <img
                src={step.media}
                alt=""
                aria-hidden
                className="w-full h-full object-contain"
                style={{
                    objectPosition: step.mediaPosition || 'center',
                    filter: 'grayscale(80%) brightness(0.3) contrast(1.05)',
                }}
            />
        ) : (
            <div className="absolute inset-0 bg-[#0c0508]" />
        )}
        {/* Left-heavy vignette so "The Playbook." text pops */}
        <div
            className="absolute inset-0"
            style={{
                background:
                    'linear-gradient(110deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.5) 100%)',
            }}
        />
        {/* Top & bottom fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
    </motion.div>
);

// ─── MILESTONE DIAMOND ────────────────────────────────────────────────────────
const Diamond: React.FC<{
    step: RoadmapStep;
    index: number;
    total: number;
    isActive: boolean;
    isPast: boolean;
    onHover: (i: number) => void;
}> = ({ step, index, total, isActive, isPast, onHover }) => {
    // Horizontal % position along the line
    const leftPct = total === 1 ? 50 : (index / (total - 1)) * 100;

    return (
        <div
            className="absolute flex flex-col items-center"
            style={{ left: `${leftPct}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => onHover(index)}
        >
            {/* Hover area */}
            <div className="flex flex-col items-center group relative cursor-default">
                
                {/* Centered Diamond and Glow Container */}
                <div className="relative flex items-center justify-center" style={{ width: 40, height: 40 }}>
                    {/* Diamond shape */}
                    <motion.div
                        animate={{
                            scale: isActive ? 1.8 : isPast ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            width: 12,
                            height: 12,
                            rotate: '45deg',
                            backgroundColor: isActive
                                ? 'rgb(238,192,191)'
                                : isPast
                                ? 'rgb(120, 96, 96)'
                                : 'rgb(64, 64, 64)',
                            transition: 'background-color 0.4s ease',
                            flexShrink: 0,
                            zIndex: 2,
                        }}
                    />

                    {/* Glow ring on active */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                className="absolute"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    rotate: '45deg',
                                    border: '1.5px solid rgba(238,192,191,0.3)',
                                    zIndex: 1,
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Labels below diamond */}
                <div
                    className="absolute flex flex-col items-center gap-1 pointer-events-none"
                    style={{ top: 'calc(50% + 38px)', width: 'max-content', maxWidth: '140px' }}
                >
                    <p
                        className="text-center font-sans uppercase leading-tight"
                        style={{
                            fontSize: '0.65rem',
                            letterSpacing: '0.35em',
                            color: isActive ? 'rgba(238,192,191,0.95)' : 'rgba(255,255,255,0.3)',
                            transition: 'color 0.4s ease',
                            lineHeight: 1.4,
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {step.phase}
                    </p>
                    <p
                        className="text-center font-sans uppercase leading-tight"
                        style={{
                            fontSize: '0.55rem',
                            letterSpacing: '0.25em',
                            color: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.18)',
                            transition: 'color 0.4s ease',
                            lineHeight: 1.3,
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {step.title}
                    </p>
                </div>
            </div>
        </div>
    );
};

// ─── ROADMAP SECTION ─────────────────────────────────────────────────────────
export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ steps }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeStep = steps[activeIndex];

    const handleHover = useCallback((i: number) => {
        setActiveIndex(i);
    }, []);

    if (!steps || steps.length === 0) return null;

    // Progress fill: 0% → leftmost, 100% → rightmost
    const progressPct =
        steps.length === 1 ? 100 : (activeIndex / (steps.length - 1)) * 100;

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ height: '100vh', minHeight: '600px' }}
        >
            {/* ── BACKGROUND ── */}
            <div className="absolute inset-0 z-0 bg-black">
                <AnimatePresence mode="sync">
                    <Bg key={`${activeStep.step}-${activeStep.phase}`} step={activeStep} />
                </AnimatePresence>
            </div>

            {/* ── CONTENT ── */}
            <div className="relative z-10 w-full h-full flex flex-col">

                {/* TOP-LEFT: "Design" header */}
                <div className="px-8 md:px-16 lg:px-24 pt-10 md:pt-14">
                    <p
                        className="font-sans uppercase tracking-[0.6em] mb-2 md:mb-4"
                        style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}
                    >
                        What We Do
                    </p>
                    <p
                        className="font-sans uppercase tracking-[0.5em]"
                        style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', fontWeight: 300 }}
                    >
                        From
                    </p>
                    <h2
                        className="font-serif italic text-white leading-none tracking-tighter uppercase"
                        style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
                    >
                        Design
                    </h2>
                </div>

                {/* FLEX SPACER — pushes timeline to center */}
                <div className="flex-1" />

                {/* ── HORIZONTAL TIMELINE ── */}
                <div className="px-8 md:px-16 lg:px-24 relative" style={{ marginBottom: '4.5rem' }}>
                    {/* Timeline rail + diamonds */}
                    <div className="relative w-full" style={{ height: '4px' }}>

                        {/* Background track line */}
                        <div
                            className="absolute inset-y-0 left-0 right-0"
                            style={{ background: 'rgba(255,255,255,0.14)', top: '50%', height: '2px', transform: 'translateY(-50%)' }}
                        />

                        {/* Filled progress line (left → active milestone) */}
                        <motion.div
                            className="absolute"
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                left: 0,
                                top: '50%',
                                height: '2px',
                                transform: 'translateY(-50%)',
                                background: 'rgba(238,192,191,0.55)',
                            }}
                        />

                        {/* Diamond milestones — positioned absolutely along the track */}
                        {steps.map((step, i) => (
                            <Diamond
                                key={`${step.step}-${step.phase}`}
                                step={step}
                                index={i}
                                total={steps.length}
                                isActive={activeIndex === i}
                                isPast={i <= activeIndex}
                                onHover={handleHover}
                            />
                        ))}
                    </div>

                    {/* Space below track for the labels */}
                    <div style={{ height: '3.5rem' }} />
                </div>

                {/* FLEX SPACER */}
                <div className="flex-1" />

                {/* BOTTOM-RIGHT: Static "Execution" header */}
                <div className="px-8 md:px-16 lg:px-24 pb-10 md:pb-14 flex justify-end">
                    <div className="text-right">
                        <p
                            className="font-sans uppercase tracking-[0.5em] mb-2"
                            style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}
                        >
                            To
                        </p>
                        <h3
                            className="font-serif italic leading-none tracking-tighter uppercase text-white"
                            style={{
                                fontSize: 'clamp(2.5rem, 8vw, 8rem)',
                                opacity: 0.72,
                            }}
                        >
                            Execution
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
};
