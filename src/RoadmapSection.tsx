import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
    scrollRef: React.RefObject<HTMLDivElement>;
}

// How much of scrollYProgress is reserved for the intro blast-off
const INTRO_FRACTION = 0.12;

// ─── RADIAL STARBURST LINES (shooting stars only) ────────────────────────────
const LINE_DATA = (() => {
    const lines: { x: number; y: number; opacity: number; width: number }[] = [];
    const count = 44;
    for (let i = 0; i < count; i++) {
        const angle = (i * 360) / count;
        const rad   = (angle * Math.PI) / 180;
        const isMain = i % 11 === 0;
        const isMed  = i % 4  === 0;
        const len    = isMain ? 1500 : isMed ? 1100 : 700;
        lines.push({
            x:       500 + Math.cos(rad) * len,
            y:       300 + Math.sin(rad) * len,
            opacity: isMain ? 0.18 : isMed ? 0.09 : 0.04,
            width:   isMain ? 1.2  : 0.65,
        });
    }
    return lines;
})();

const RadialLines: React.FC<{ scrollYProgress: any }> = ({ scrollYProgress }) => {
    const dashOffset = useTransform(scrollYProgress, [0, 1], [0, -6000]);
    // Stars are hidden during the initial intro, fading in as the intro title blasts away
    const starsOpacity = useTransform(
        scrollYProgress,
        [0, INTRO_FRACTION * 0.6, INTRO_FRACTION],
        [0, 0, 1]
    );

    return (
        <motion.div 
            style={{ opacity: starsOpacity }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
        >
            <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                {LINE_DATA.map((l, i) => {
                    const length = 20 + (i % 5) * 15;
                    const gap    = 600 + (i % 7) * 400;
                    return (
                        <motion.line
                            key={`shoot-${i}`}
                            x1={500} y1={300}
                            x2={l.x} y2={l.y}
                            stroke="white"
                            strokeWidth={l.width * 1.5}
                            strokeOpacity={Math.max(0.15, l.opacity * 6)}
                            strokeLinecap="round"
                            strokeDasharray={`${length} ${gap}`}
                            style={{ strokeDashoffset: dashOffset }}
                        />
                    );
                })}
            </svg>
        </motion.div>
    );
};

// ─── INTRO SCENE ─────────────────────────────────────────────────────────────
const IntroScene: React.FC<{ scrollYProgress: any }> = ({ scrollYProgress }) => {
    const end = INTRO_FRACTION;
    const scale   = useTransform(scrollYProgress, [0, end * 0.55, end], [1, 2.5, 28]);
    const opacity = useTransform(scrollYProgress, [0, end * 0.6,  end], [1, 1,   0]);

    return (
        <motion.div
            style={{ scale, opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
        >
            <h2
                className="font-serif italic text-white text-center tracking-tighter leading-none"
                style={{ fontSize: 'clamp(4.5rem, 11vw, 10rem)' }}
            >
                The Playbook.
            </h2>
            <p className="text-white/45 font-sans uppercase tracking-[0.55em] text-[0.6rem] md:text-[0.7rem] mt-10 border border-white/10 px-10 py-3 rounded-full bg-black/40 backdrop-blur-sm">
                How It Came To Life
            </p>
        </motion.div>
    );
};

// ─── STEP SCENE ───────────────────────────────────────────────────────────────
const StepScene: React.FC<{
    step: RoadmapStep;
    index: number;
    total: number;
    scrollYProgress: any;
}> = ({ step, index, total, scrollYProgress }) => {
    const available = 1 - INTRO_FRACTION;
    const stepSize  = available / total;
    const s         = INTRO_FRACTION + index * stepSize;
    const e         = INTRO_FRACTION + (index + 1) * stepSize;
    const isLast    = index === total - 1;

    const enterEnd  = s + stepSize * 0.28;
    const holdEnd   = s + stepSize * 0.65;
    const exitEnd   = s + stepSize * 0.88;

    // Phase number ENTRY: zooms in fast, disappears before content arrives
    const labelScale = useTransform(scrollYProgress, [s, enterEnd - stepSize * 0.02], [0.04, 1]);
    const labelOpacity = useTransform(
        scrollYProgress,
        [s, s + stepSize * 0.04, enterEnd - stepSize * 0.05, enterEnd + stepSize * 0.03],
        [0, 1, 1, 0]
    );

    // Ghost watermark: ultra-faint number behind the content layout
    const ghostScale = useTransform(scrollYProgress, [enterEnd, holdEnd], [1.1, 3.5]);
    const ghostOpacity = useTransform(
        scrollYProgress,
        [enterEnd, enterEnd + stepSize * 0.06, holdEnd - stepSize * 0.05, holdEnd],
        [0, 0.06, 0.04, 0]
    );

    // Text content (left panel)
    const contentOpacity = useTransform(
        scrollYProgress,
        [enterEnd, enterEnd + stepSize * 0.09, holdEnd - stepSize * 0.04, holdEnd + stepSize * 0.02],
        [0, 1, 1, 0]
    );
    const contentX = useTransform(scrollYProgress, [enterEnd, enterEnd + stepSize * 0.09], [-30, 0]);

    // Featured image (right panel)
    const mediaOpacity = useTransform(
        scrollYProgress,
        [enterEnd, enterEnd + stepSize * 0.12, holdEnd - stepSize * 0.05, holdEnd],
        [0, 1, 1, 0]
    );
    const mediaX = useTransform(scrollYProgress, [enterEnd, enterEnd + stepSize * 0.12], [80, 0]);

    // Ring burst
    const ringScale = useTransform(scrollYProgress, [s + stepSize * 0.05, enterEnd, holdEnd], [0, 1, 6]);
    const ringOpacity = useTransform(
        scrollYProgress,
        [s + stepSize * 0.05, enterEnd - stepSize * 0.05, holdEnd - stepSize * 0.10, holdEnd],
        [0, 0.35, 0.15, 0]
    );

    // Scene visibility
    const sceneOpacity = useTransform(
        scrollYProgress,
        [Math.max(0, s - 0.005), s + stepSize * 0.01, exitEnd, isLast ? 1.0 : e],
        [0, 1, 1, isLast ? 1 : 0]
    );

    return (
        <motion.div style={{ opacity: sceneOpacity }} className="absolute inset-0 pointer-events-none">
            {/* Ring burst */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="rounded-full border border-white/20"
                    style={{ width: '40vmin', height: '40vmin', scale: ringScale, opacity: ringOpacity }}
                />
            </div>

            {/* Ghost watermark */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <motion.span
                    className="font-serif italic text-white select-none leading-none"
                    style={{ fontSize: 'clamp(10rem, 26vw, 22rem)', scale: ghostScale, opacity: ghostOpacity }}
                >
                    {step.step}
                </motion.span>
            </div>

            {/* Entry zoom number */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                    className="font-serif italic text-white select-none leading-none"
                    style={{ fontSize: 'clamp(6rem, 14vw, 13rem)', scale: labelScale, opacity: labelOpacity }}
                >
                    {step.step}
                </motion.span>
            </div>

            {/* LEFT Content */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 left-[7%] md:left-[10%] z-10 flex flex-col gap-6"
                style={{ opacity: contentOpacity, x: contentX, maxWidth: '42vw' }}
            >
                <div className="flex items-center gap-4">
                    <span className="h-px w-10 bg-rose/60 flex-shrink-0" />
                    <span className="text-rose/75 text-[0.6rem] tracking-[0.55em] uppercase font-sans whitespace-nowrap">
                        {step.phase}
                    </span>
                </div>
                <h3
                    className="font-serif text-white italic leading-[1.03] tracking-tighter"
                    style={{ fontSize: 'clamp(3rem, 5vw, 6rem)' }}
                >
                    {step.title}
                </h3>
                <p className="text-white/45 text-base md:text-[1.1rem] font-serif italic leading-relaxed">
                    {step.description}
                </p>
                <span className="text-[0.55rem] tracking-[0.45em] uppercase font-sans text-white/25 border border-white/10 px-6 py-2 self-start">
                    {step.tag}
                </span>
            </motion.div>

            {/* RIGHT Panel */}
            {step.media && (
                <motion.div
                    className="absolute top-0 right-0 bottom-0 z-20"
                    style={{ opacity: mediaOpacity, x: mediaX, width: 'clamp(300px, 42vw, 620px)' }}
                >
                    <img
                        src={step.media}
                        alt={step.title}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: step.mediaPosition || 'center' }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.6) 25%, transparent 65%)' }} />
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
                </motion.div>
            )}
        </motion.div>
    );
};

// ─── HORIZONTAL TIMELINE ─────────────────────────────────────────────────────
const HorizontalTimelineDot: React.FC<{
    step: RoadmapStep;
    index: number;
    total: number;
    scrollYProgress: any;
}> = ({ step, index, total, scrollYProgress }) => {
    const available = 1 - INTRO_FRACTION;
    const stepSize  = available / total;
    const s         = INTRO_FRACTION + index * stepSize;
    const mid       = s + stepSize * 0.5;
    const e         = s + stepSize;

    const labelOpacity = useTransform(scrollYProgress, [s, mid, e], [0.25, 1, 0.25]);
    const dotScale     = useTransform(scrollYProgress, [s, mid, e], [0.85, 1.8, 0.85]);
    const dotOpacity   = useTransform(scrollYProgress, [s, mid, e], [0.35, 1, 0.35]);

    return (
        <div className="flex flex-col items-center">
            <motion.div style={{ opacity: labelOpacity }} className="text-center mb-5">
                <p className="text-[0.68rem] font-sans font-bold uppercase tracking-[0.22em] text-white/90 whitespace-nowrap">
                    {step.phase}
                </p>
                <p className="text-[0.62rem] font-sans text-white/35 whitespace-nowrap mt-1.5 px-0.5">
                    {step.title}
                </p>
            </motion.div>
            <motion.div
                style={{ opacity: dotOpacity, scale: dotScale }}
                className="w-2.5 h-2.5 rounded-full bg-white origin-center relative z-10"
            />
        </div>
    );
};

const HorizontalTimeline: React.FC<{
    steps: RoadmapStep[];
    scrollYProgress: any;
}> = ({ steps, scrollYProgress }) => (
    <div className="absolute bottom-12 left-10 right-10 md:left-20 md:right-20 z-50 pointer-events-none">
        <div className="relative flex items-end justify-between">
            <div className="absolute bottom-[0.31rem] left-0 right-0 h-px bg-white/15" />
            {steps.map((step, i) => (
                <HorizontalTimelineDot
                    key={i}
                    step={step}
                    index={i}
                    total={steps.length}
                    scrollYProgress={scrollYProgress}
                />
            ))}
        </div>
    </div>
);

// ─── ROADMAP SECTION ─────────────────────────────────────────────────────────
export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ steps, scrollRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: rawScrollProgress } = useScroll({
        container: scrollRef,
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Buttery smooth "chase" animation for the scroll
    const scrollYProgress = useSpring(rawScrollProgress, {
        stiffness: 80,
        damping: 25,
        restDelta: 0.001
    });

    if (!steps || steps.length === 0) return null;

    // Increased to 280vh per step to give each phase more breathing room
    const totalVh = 150 + steps.length * 280;

    return (
        <section className="relative">
            <div ref={containerRef} className="relative" style={{ height: `${totalVh}vh` }}>
                <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
                    <RadialLines scrollYProgress={scrollYProgress} />
                    <IntroScene scrollYProgress={scrollYProgress} />
                    {steps.map((step, i) => (
                        <StepScene
                            key={i}
                            step={step}
                            index={i}
                            total={steps.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                    <HorizontalTimeline steps={steps} scrollYProgress={scrollYProgress} />
                    <div className="absolute inset-0 pointer-events-none z-40" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(0,0,0,0.8) 100%)' }} />
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent pointer-events-none z-40" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-40" />
                </div>
            </div>
        </section>
    );
};
