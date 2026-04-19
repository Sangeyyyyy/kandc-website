import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { SectionBlender } from './SharedComponents';

// ─── CONSTANTS ─────────────────────────────────────────────────────────────────
const CANVAS_W    = 3000;  // SVG coordinate space width
const CANVAS_H    = 2000;  // SVG coordinate space height
// Camera sits at (50vw, 48vh) — the "star focus point"
const CAM_X_VH = 0.50;
const CAM_Y_VH = 0.48;

// ─── TYPES ─────────────────────────────────────────────────────────────────────
export type Milestone = {
    id: string;
    role: string;
    company: string;
    period: string;
    era: string;
    bullets: string[];
    starX: number;
    starY: number;
    t: number;
    align: 'left' | 'right';
    color: string;
    isHero?: boolean;
    starName?: string;
    coordinates?: string;
};

// ─── MILESTONE / STAR DATA — mapped to actual Aquarius (♒) key stars ─────────────
// Traced from the real constellation image:
//   • Top-right diagonal arm: stars 01 & 02
//   • Central hub (β Sadalsuud / brightest): star 03
//   • Right arm from hub (α Sadalmelik): star 04
//   • Left-down cluster (water jar: π, γ, ζη): stars 05-06-07
//   • Water-flow cascade (θ, δ Skat, λ): stars 08-09-10 → K&C
export const MILESTONES: Milestone[] = [
    {
        id: '01', role: 'Marketing Assistant', company: 'Aramark',
        period: 'Oct 2011 – Mar 2014', era: '2011',
        bullets: ['Sales ↑20% YOY', 'Led team of 8+', 'Starbucks & Chick-fil-A'],
        // ε Aquarii (Albali) — far upper-right arm tip; career entrance
        starX: 1920, starY: 190, t: 0.07, align: 'right', color: 'rgba(200,175,90,1)',
        starName: 'ε Albali', coordinates: 'RA 22h 05m | DEC -00° 19\'',
    },
    {
        id: '02', role: 'Radio Ad Sales Rep', company: 'CBS Radio',
        period: 'Oct 2015 – Sept 2016', era: '2015',
        bullets: ['Military & gov. accounts', 'Revenue growth YOY', 'Broadcast partnerships'],
        // Mid upper-right arm — second star of the NE diagonal
        starX: 1380, starY: 485, t: 0.17, align: 'left', color: 'rgba(190,210,255,1)',
        starName: 'μ Aquarii', coordinates: 'RA 20h 52m | DEC -08° 58\'',
    },
    {
        id: '03', role: 'Freestyle Project Specialist', company: 'Coca-Cola Company',
        period: 'Oct 2015 – Sept 2016', era: '2015',
        bullets: ['Freestyle data platforms', 'Large-scale conversions', '30+ Dunkin\' brands'],
        // β Aquarii (Sadalsuud) — the hub where all arms meet
        starX: 885, starY: 775, t: 0.27, align: 'right', color: 'rgba(180,205,255,1)',
        starName: 'β Sadalsuud', coordinates: 'RA 21h 31m | DEC -05° 34\'',
    },
    {
        id: '04', role: 'Marketing Director', company: 'Sodexo',
        period: 'Oct 2016 – Aug 2019', era: '2016',
        bullets: ['Team of 8 managed', 'Record-breaking sales', 'Starbucks · Subway · CFA'],
        // α Aquarii (Sadalmelik) — right arm from the hub
        starX: 1560, starY: 990, t: 0.37, align: 'left', color: 'rgba(215,225,255,1)',
        starName: 'α Sadalmelik', coordinates: 'RA 22h 05m | DEC -00° 19\'',
    },
    {
        id: '05', role: 'Brand Strategist', company: 'The Resource Group',
        period: 'Aug 2019 – Aug 2021', era: '2019',
        bullets: ['Brand partnerships', 'Media pitching', 'Red-carpet activations'],
        // π Aquarii — top of the water-jar cluster
        starX: 695, starY: 1025, t: 0.47, align: 'right', color: 'rgba(145,120,220,1)',
        starName: 'π Aquarii', coordinates: 'RA 22h 25m | DEC +01° 22\'',
    },
    {
        id: '06', role: 'Contract Copywriter', company: 'Majority · GUT · R/GA',
        period: 'Sept 2020 – July 2022', era: '2020',
        bullets: ['Sprite "Clear Bottle"', 'Samsung "Stop" campaign', 'NBA G League & Shake Shack'],
        // γ Aquarii (Sadachbia) — water-jar central
        starX: 770, starY: 1145, t: 0.57, align: 'left', color: 'rgba(130,195,255,1)',
        starName: 'γ Sadachbia', coordinates: 'RA 22h 21m | DEC -01° 23\'',
    },
    {
        id: '07', role: 'Brand Strategist & Editorial Mgr.', company: 'BET+',
        period: 'Aug 2021 – Feb 2024', era: '2021',
        bullets: ['Brand voice guardian', 'BET Hip-Hop Awards', 'Partner editorial team'],
        // ζ / η Aquarii — lower water-jar stars
        starX: 705, starY: 1260, t: 0.67, align: 'right', color: 'rgba(200,90,105,1)',
        starName: 'ζ² Aquarii', coordinates: 'RA 22h 28m | DEC -00° 01\'',
    },
    {
        id: '08', role: 'Global Director of Programming', company: 'BLK',
        period: 'April 2023 – July 2023', era: '2023',
        bullets: ['Cannes Lions 2023', 'Spike Lee "Creator of the Year"', 'Jordan Brand collab'],
        // θ Aquarii — where water begins to pour
        starX: 1255, starY: 1405, t: 0.77, align: 'left', color: 'rgba(178,82,148,1)',
        starName: 'θ Ancha', coordinates: 'RA 22h 16m | DEC -07° 46\'',
    },
    {
        id: '09', role: 'Brand Manager', company: 'BET+',
        period: 'Feb 2024 – Sept 2024', era: '2024',
        bullets: ['"Tech for an Equitable Future"', 'BET Awards 2024', 'B2B impact leadership'],
        // δ Aquarii (Skat) — deep in the water flow
        starX: 1690, starY: 1595, t: 0.87, align: 'right', color: 'rgba(200,90,105,1)',
        starName: 'δ Skat', coordinates: 'RA 22h 54m | DEC -15° 49\'',
    },
    {
        id: '10', role: 'Founder & Chief Brand Strategist', company: 'Kelsey & Company',
        period: 'Aug 2021 – Present', era: '2021–',
        bullets: ['40+ Senior specialists', 'NY · LDN · ATL', 'Cannes · Sinners · ONE Musicfest'],
        // λ Aquarii — the final destination
        starX: 2085, starY: 1755, t: 0.97, align: 'left', color: 'rgba(238,192,191,1)',
        isHero: true,
        starName: 'λ Aquarii', coordinates: 'RA 22h 52m | DEC -07° 34\'',
    },
];

// ─── BACKGROUND STARS (deterministic pseudo-random) ────────────────────────────
const BG_STARS = Array.from({ length: 400 }, (_, i) => ({
    x:       ((i * 1234.567 + 789.3)  % CANVAS_W),
    y:       ((i * 876.543  + 234.7)  % CANVAS_H),
    r:       ((i * 456.789) % 2.0) + 0.5,
    opacity: ((i * 321.987) % 0.4)  + 0.1,
    blink:   i % 7 === 0 ? 'slow' : i % 11 === 0 ? 'fast' : 'none',
}));

// Secondary parallax layer (moves at different speed)
const PARALLAX_STARS = Array.from({ length: 150 }, (_, i) => ({
    x: (i * 987.654 + 123.4) % CANVAS_W,
    y: (i * 567.890 + 543.2) % CANVAS_H,
    r: (i * 123.456 % 1.2) + 0.3,
    opacity: (i * 987.654 % 0.25) + 0.05,
}));

// ─── NEBULA PATCHES (positioned around the Aquarius constellation region) ────────
const NEBULAE = [
    { cx: 1640, cy: 330,  rx: 420, ry: 250, color: 'rgba(200,175,80,0.07)'  }, // upper arm area (01-02)
    { cx: 885,  cy: 720,  rx: 350, ry: 250, color: 'rgba(180,200,255,0.06)' }, // hub β Sadalsuud (03)
    { cx: 720,  cy: 1110, rx: 310, ry: 290, color: 'rgba(120,185,255,0.06)' }, // water jar cluster (05-07)
    { cx: 1450, cy: 1490, rx: 440, ry: 260, color: 'rgba(200,90,105,0.055)' }, // water flow (08-09)
    { cx: 2085, cy: 1730, rx: 360, ry: 250, color: 'rgba(238,192,191,0.07)' }, // K&C final (10)
];

// ─── EXTRA AQUARIUS MINOR STARS (decorative, not milestones) ──────────────────
const AQUARIUS_MINOR_STARS = [
    // Near upper arm (01-02 area)
    { x: 2020, y: 125,  r: 4.0, opacity: 0.50 }, // above ε
    { x: 1760, y: 80,   r: 3.0, opacity: 0.40 }, // above ε alt
    // Between hub and upper arm
    { x: 1140, y: 375,  r: 3.5, opacity: 0.45 }, // minor between 02 and 03
    // Near right arm (04)
    { x: 1720, y: 875,  r: 4.0, opacity: 0.50 }, // near α right arm
    // Cluster helpers (near 05-07)
    { x: 750,  y: 960,  r: 3.5, opacity: 0.48 }, // 86 Aqr near π
    { x: 795,  y: 1220, r: 3.0, opacity: 0.42 }, // between γ and lower  
    // Water flow helpers
    { x: 1490, y: 1510, r: 4.0, opacity: 0.50 }, // between θ and δ
    { x: 1855, y: 1650, r: 3.5, opacity: 0.45 }, // between δ and λ
    // Tail beyond K&C
    { x: 2260, y: 1800, r: 4.0, opacity: 0.38 }, // τ₁ Aqr
    { x: 2460, y: 1870, r: 3.0, opacity: 0.30 }, // τ₂ Aqr
];

// ─── EXTRA AQUARIUS CONSTELLATION LINES (traditional cross-connections) ─────────
// Beyond the career path (01→10), the real Aquarius has these additional connections
// that complete the constellation's famous shape.
const AQUARIUS_EXTRA_LINES = [
    // β(hub/03) → π(05): the LEFT arm from β Sadalsuud — the key fork at the hub
    // (Career path goes hub→α-right-arm-04 first, but Aquarius also branches hub→cluster)
    { x1: 885, y1: 775, x2: 695, y2: 1025 },
    // γ(Sadachbia/06) → η(07 position next): completes the Y shape (direct link)
    // Career goes 06→07 via ζ, but γ→η is also traditionally drawn
    { x1: 770, y1: 1145, x2: 705, y2: 1260 },
    // δ(Skat/09) extension hint: minor faint line continuing past K&C
    { x1: 2085, y1: 1755, x2: 2310, y2: 1850 },
];

// ─── CAMERA INTERPOLATION (smooth pan between stars) ───────────────────────────
function getCameraPos(val: number): { x: number; y: number } {
    if (val <= MILESTONES[0].t) {
        // Start exactly on the first star (ε Aquarii / Aramark)
        return { x: MILESTONES[0].starX, y: MILESTONES[0].starY };
    }
    for (let i = 0; i < MILESTONES.length - 1; i++) {
        if (val <= MILESTONES[i + 1].t) {
            const raw = (val - MILESTONES[i].t) / (MILESTONES[i + 1].t - MILESTONES[i].t);
            const e   = raw * raw * (3 - 2 * raw); // smoothstep
            return {
                x: MILESTONES[i].starX + (MILESTONES[i + 1].starX - MILESTONES[i].starX) * e,
                y: MILESTONES[i].starY + (MILESTONES[i + 1].starY - MILESTONES[i].starY) * e,
            };
        }
    }
    return { x: MILESTONES[MILESTONES.length - 1].starX, y: MILESTONES[MILESTONES.length - 1].starY };
}

// ─── MILESTONE CARD ──────────────────────────────────────────────────────────── 
const MilestoneCard = ({ milestone }: { milestone: Milestone }) => {
    const isLeft = milestone.align === 'left';
    const isHero = !!milestone.isHero;
    const xIn  = isLeft ? -120 : 120;
    const xOut = isLeft ? -50  : 50;
    const col  = milestone.color;
    const colFaint = col.replace('1)', '0.15)');
    const colMid   = col.replace('1)', '0.4)');

    return (
        <motion.div
            key={milestone.id}
            initial={{ x: xIn, opacity: 0, scale: 0.90 }}
            animate={{ x: 0,   opacity: 1, scale: 1,   transition: { type: 'spring', stiffness: 180, damping: 24 } }}
            exit={{    x: xOut, opacity: 0, scale: 0.95, transition: { duration: 0.22, ease: 'easeIn' } }}
            style={{
                position: 'absolute',
                top: `${CAM_Y_VH * 100}vh`,
                [isLeft ? 'right' : 'left']: 'calc(50% + 70px)',
                y: '-50%',
                zIndex: 40,
                pointerEvents: 'none',
                width: isHero ? 'min(500px, 36vw)' : 'min(360px, 30vw)',
            }}
        >
            {/* Outer glow behind card */}
            <div className="absolute inset-0 rounded-sm blur-2xl opacity-30"
                style={{ background: `radial-gradient(ellipse, ${colFaint} 0%, transparent 70%)`, transform: 'scale(1.3)' }}
            />

            {/* Era pill */}
            <div
                className="absolute -top-3 left-4 px-3 py-0.5 rounded-full text-[9px] tracking-[0.3em] uppercase font-sans z-10"
                style={{ background: colFaint, border: `1px solid ${colMid}`, color: col }}
            >
                {milestone.era}
            </div>

            {/* Card */}
            <div
                className="relative overflow-hidden"
                style={{
                    background: 'linear-gradient(145deg, rgba(5,5,18,0.97) 0%, rgba(10,4,15,0.99) 100%)',
                    border: `1px solid ${col.replace('1)', '0.12)')}`,
                    borderLeft: `3px solid ${col.replace('1)', '0.7)')}`,
                    backdropFilter: 'blur(30px)',
                    boxShadow: isHero
                        ? `0 0 120px ${col.replace('1)', '0.18)')}, 0 30px 70px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)`
                        : `0 0 50px ${col.replace('1)', '0.1)')}, 0 15px 45px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}
            >
                {/* Ghost ID watermark */}
                <div
                    className="absolute -right-1 -bottom-4 select-none pointer-events-none font-serif italic font-bold leading-none"
                    style={{ fontSize: '140px', color: col.replace('1)', '0.04)') }}
                >
                    {milestone.id}
                </div>

                {/* Hero header */}
                {isHero && (
                    <div className="flex items-center gap-3 px-5 pt-4 pb-0">
                        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${col})` }} />
                        <span className="text-[8px] tracking-[0.6em] uppercase font-sans" style={{ color: col }}>Final Destination</span>
                        <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, transparent, ${col})` }} />
                    </div>
                )}

                <div className="relative z-10 pl-5 pr-5 pt-5 pb-5">
                    {/* Star Metadata (Subtle branding) */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                            <span className="text-[7px] tracking-[0.3em] font-sans text-cream/40 uppercase mb-0.5">Constellation Point</span>
                            <span className="text-[11px] tracking-[0.1em] font-serif italic text-cream/90">{milestone.starName}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[7px] tracking-[0.3em] font-sans text-cream/40 uppercase mb-0.5">Coordinates</span>
                            <span className="text-[9px] tracking-[0.05em] font-mono text-cream/60">{milestone.coordinates}</span>
                        </div>
                    </div>

                    {/* Company + ID */}
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[8px] font-bold text-cream leading-none"
                            style={{ background: colFaint, border: `1px solid ${colMid}` }}
                        >
                            {milestone.id}
                        </div>
                        <span className="text-[9px] tracking-[0.38em] uppercase font-sans text-cream/50">{milestone.company}</span>
                    </div>

                    {/* Role */}
                    <h4
                        className="font-serif text-cream leading-tight mb-3"
                        style={{
                            fontSize: isHero ? 'clamp(1.25rem,2.5vw,1.75rem)' : 'clamp(1rem,1.8vw,1.3rem)',
                            fontStyle: isHero ? 'italic' : 'normal',
                            color: isHero ? col : undefined,
                        }}
                    >
                        {milestone.role}
                    </h4>

                    {/* Timeline */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${col.replace('1)', '0.6)')}, transparent)` }} />
                        <span className="text-[9px] tracking-[0.2em] text-cream/28 uppercase font-sans shrink-0">{milestone.period}</span>
                    </div>

                    {/* Bullets */}
                    <div className="space-y-1.5 mb-1">
                        {milestone.bullets.map((b, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span className="text-[7px] mt-[4px] shrink-0" style={{ color: col }}>★</span>
                                <span className="text-[12px] font-sans leading-snug text-cream/50">{b}</span>
                            </div>
                        ))}
                    </div>

                    {/* Hero footer */}
                    {isHero && (
                        <div className="mt-4 pt-3 flex items-center justify-between"
                            style={{ borderTop: `1px solid ${col.replace('1)', '0.15)')}` }}>
                            <div className="flex gap-1.5">
                                {['NY', 'ATL', 'LDN'].map(c => (
                                    <span key={c} className="text-[8px] tracking-widest uppercase font-sans px-2 py-0.5"
                                        style={{ border: `1px solid ${col.replace('1)', '0.4)')}`, color: col }}
                                    >{c}</span>
                                ))}
                            </div>
                            <span className="text-[8px] font-sans tracking-widest text-cream/30 uppercase">Est. 2021</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// ─── MINI MAP HUD ──────────────────────────────────────────────────────────────
const ConstellationHUD = ({
    scrollYProgress,
    activeMilestoneIdx,
}: {
    scrollYProgress: import('framer-motion').MotionValue<number>;
    activeMilestoneIdx: number;
}) => {
    const hudOpacity = useTransform(scrollYProgress, [0, 0.04, 0.97, 1], [0, 1, 1, 0]);
    const activeMilestone = MILESTONES[activeMilestoneIdx];
    const pts = MILESTONES.map(m => `${m.starX},${m.starY}`).join(' ');

    return (
        <motion.div
            style={{ opacity: hudOpacity }}
            className="absolute bottom-8 right-8 z-50 pointer-events-none flex flex-col items-end gap-3"
        >
            {/* Milestone label */}
            <div className="text-right">
                <p className="text-[8px] tracking-[0.5em] uppercase font-sans text-cream/25 mb-0.5"
                    style={{ color: activeMilestone.color.replace('1)', '0.6)') }}>
                    {activeMilestone.company}
                </p>
                <div className="flex items-baseline gap-2 justify-end">
                    <span className="font-serif italic text-cream/60 leading-none" style={{ fontSize: 'clamp(2rem,3.5vw,2.5rem)' }}>
                        {activeMilestone.id}
                    </span>
                    <span className="text-[10px] text-cream/20 font-sans">/ {String(MILESTONES.length).padStart(2, '0')}</span>
                </div>
            </div>

            {/* Mini constellation map */}
            <div className="relative" style={{ border: '1px solid rgba(255,255,255,0.06)', padding: '6px', background: 'rgba(5,5,18,0.7)', backdropFilter: 'blur(10px)' }}>
                <svg width="130" height="88" viewBox="-100 0 3200 2000" className="block">
                    {/* Full path line  */}
                    <polyline points={pts} stroke="rgba(255,255,255,0.12)" strokeWidth="12" fill="none" strokeLinejoin="round" />
                    {/* Driven path (passed milestones) */}
                    {MILESTONES.slice(0, activeMilestoneIdx + 1).map((m, i, arr) => i > 0 && (
                        <line key={m.id}
                            x1={arr[i-1].starX} y1={arr[i-1].starY}
                            x2={m.starX}        y2={m.starY}
                            stroke={m.color.replace('1)', '0.55)')}
                            strokeWidth="10"
                        />
                    ))}
                    {/* All star dots */}
                    {MILESTONES.map((m, i) => (
                        <circle key={m.id} cx={m.starX} cy={m.starY} r="22"
                            fill={i <= activeMilestoneIdx ? m.color.replace('1)', '0.8)') : 'rgba(255,255,255,0.15)'}
                        />
                    ))}
                    {/* Active star ring */}
                    <circle cx={activeMilestone.starX} cy={activeMilestone.starY} r="42"
                        fill="none" stroke={activeMilestone.color} strokeWidth="10" opacity="0.7"
                    />
                </svg>
                <p className="text-[7px] tracking-[0.4em] uppercase font-sans text-cream/20 text-center mt-1">Career Path</p>
            </div>
        </motion.div>
    );
};

// ─── SHOOTING STARS ──────────────────────────────────────────────────────────── 
const ShootingStars = () => {
    return (
        <g className="pointer-events-none">
            {[0, 1, 2].map((i) => (
                <motion.path
                    key={i}
                    d="M 0 0 L 120 -40" 
                    stroke="url(#shootingGrad)"
                    strokeWidth="2"
                    initial={{ x: 500 + i * 800, y: 300 + i * 400, opacity: 0, pathLength: 0 }}
                    animate={{ 
                        x: [null, 1000 + i * 800], 
                        y: [null, 100 + i * 400], 
                        opacity: [0, 1, 0],
                        pathLength: [0, 1, 1] 
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatDelay: 4 + i * 3,
                        ease: "easeOut",
                        delay: i * 2,
                    }}
                />
            ))}
        </g>
    );
};

// ─── CONSTELLATION LINE SEGMENT ────────────────────────────────────────────────
const ConstellationLine = ({
    from,
    to,
    scrollYProgress,
}: {
    from: Milestone;
    to: Milestone;
    scrollYProgress: any;
}) => {
    const draw = useTransform(scrollYProgress, [from.t, to.t], [0, 1]);
    const pathLength = useSpring(draw, { stiffness: 45, damping: 15 });

    return (
        <g>
            {/* Outer glow line */}
            <motion.line
                x1={from.starX} y1={from.starY}
                x2={to.starX}   y2={to.starY}
                stroke={from.color}
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength, opacity: 0.15, filter: 'blur(5px)' }}
            />
            {/* Core line */}
            <motion.line
                x1={from.starX} y1={from.starY}
                x2={to.starX}   y2={to.starY}
                stroke="white"
                strokeWidth="0.8"
                strokeLinecap="round"
                style={{ pathLength, opacity: 0.4 }}
            />
        </g>
    );
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export const ResumeRoadmap = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 20, restDelta: 0.001 });

    const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(0);
    const [windowSize, setWindowSize] = useState({ w: 1920, h: 953 });

    useEffect(() => {
        const update = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useMotionValueEvent(smoothProgress, 'change', (val) => {
        let idx = 0;
        MILESTONES.forEach((m, i) => {
            if (val >= m.t - 0.03) idx = i;
        });
        setActiveMilestoneIdx(idx);
    });

    // Dynamic Scale: Constant 1.45 during journey, then zoom out to 0.6 at the very end
    const sceneScale = useTransform(smoothProgress, [0.97, 1.0], [1.45, 0.6]);

    // ── Camera transform: pans to keep active star at (CAM_X_VH, CAM_Y_VH) ───
    // For the final zoom-out (0.97 -> 1.0), we shift the camera to the center of the constellation
    const worldX = useTransform(smoothProgress, (val) => {
        const { x } = getCameraPos(val);
        const scale = val > 0.97 ? 1.45 + (0.6 - 1.45) * ((val - 0.97) / 0.03) : 1.45;
        
        if (val > 0.97) {
            // Smoothly interpolate to center of CANVAS_W during zoom out
            const hubX = CANVAS_W / 2;
            const t = (val - 0.97) / 0.03;
            const targetX = x + (hubX - x) * t;
            return windowSize.w * 0.5 - targetX * scale;
        }
        return windowSize.w * CAM_X_VH - x * scale;
    });

    const worldY = useTransform(smoothProgress, (val) => {
        const { y } = getCameraPos(val);
        const scale = val > 0.97 ? 1.45 + (0.6 - 1.45) * ((val - 0.97) / 0.03) : 1.45;

        if (val > 0.97) {
            // Smoothly interpolate to center of CANVAS_H during zoom out
            const hubY = CANVAS_H / 2;
            const t = (val - 0.97) / 0.03;
            const targetY = y + (hubY - y) * t;
            return windowSize.h * 0.5 - targetY * scale;
        }
        return windowSize.h * CAM_Y_VH - y * scale;
    });

    // Intro title fade
    const titleOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);
    const titleY       = useTransform(smoothProgress, [0, 0.06], [0, -50]);

    // Background parallax stars drift
    const parallaxX = useTransform(smoothProgress, [0, 1], [0, -40]);
    const parallaxY = useTransform(smoothProgress, [0, 1], [0, -20]);

    // Final Summary Text Fade
    const summaryOpacity = useTransform(smoothProgress, [0.985, 1.0], [0, 1]);
    const summaryBlur    = useTransform(smoothProgress, [0.985, 1.0], ['blur(20px)', 'blur(0px)']);
    const finalCardOpacity = useTransform(smoothProgress, [0.97, 0.985], [1, 0]);
    const pointerOpacity   = useTransform(smoothProgress, [0.97, 0.98], [1, 0]);

    const activeMilestone = MILESTONES[activeMilestoneIdx];

    // Pointer Tracking: calculates the current star's screen position to avoid drift
    const ptrX = useTransform(smoothProgress, (val) => {
        const { x } = getCameraPos(val);
        const scale = val > 0.97 ? 1.45 + (0.6 - 1.45) * ((val - 0.97) / 0.03) : 1.45;
        
        // Base viewport center logic
        const basePx = windowSize.w * CAM_X_VH;
        if (val > 0.97) return basePx; // Freeze during final zoom out

        // The "Drift Fix": Adjust pointer center by the diff between star and camera target
        const offset = (activeMilestone.starX - x) * scale;
        return basePx + offset;
    });

    const ptrY = useTransform(smoothProgress, (val) => {
        const { y } = getCameraPos(val);
        const scale = val > 0.97 ? 1.45 + (0.6 - 1.45) * ((val - 0.97) / 0.03) : 1.45;

        const basePx = windowSize.h * CAM_Y_VH;
        if (val > 0.97) return basePx;

        const offset = (activeMilestone.starY - y) * scale;
        return basePx + offset;
    });

    return (
        <section ref={containerRef} className="relative h-[750vh] border-t border-white/5"
            style={{ background: 'linear-gradient(180deg, #030210 0%, #050318 50%, #040215 100%)' }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">

                <SectionBlender position="top" intensity="h-48" />

                {/* Deep space background gradient */}
                <div className="absolute inset-0 z-0"
                    style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 50%, #06041a 0%, #020108 65%, #000005 100%)' }}
                />

                {/* Milky way band */}
                <motion.div
                    className="absolute inset-0 z-[1] pointer-events-none"
                    style={{
                        x: parallaxX,
                        background: 'linear-gradient(105deg, transparent 20%, rgba(150,120,255,0.025) 40%, rgba(200,150,255,0.035) 50%, rgba(180,140,255,0.025) 60%, transparent 80%)',
                    }}
                />

                {/* ── THE STAR MAP (translates as camera pans) ── */}
                <motion.div
                    className="absolute top-0 left-0 z-[5]"
                    style={{
                        width:  CANVAS_W, 
                        height: CANVAS_H,
                        x: worldX,
                        y: worldY,
                    }}
                >
                    <motion.svg
                        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                        width={CANVAS_W} 
                        height={CANVAS_H}
                        fill="none"
                        style={{ position: 'absolute', inset: 0, scale: sceneScale, transformOrigin: '0 0' }}
                    >
                        {/* ── Nebula atmospheric patches ── */}
                        {NEBULAE.map((neb, i) => (
                            <motion.ellipse 
                                key={i} 
                                cx={neb.cx} 
                                cy={neb.cy} 
                                rx={neb.rx} 
                                ry={neb.ry}
                                fill={neb.color} 
                                filter="url(#nebBlur)"
                                animate={{ 
                                    rx: [neb.rx, neb.rx * 1.05, neb.rx], 
                                    opacity: [0.7, 1, 0.7] 
                                }}
                                transition={{ 
                                    duration: 8 + i * 2, 
                                    repeat: Infinity, 
                                    ease: 'easeInOut' 
                                }}
                            />
                        ))}
                        <defs>
                            <filter id="nebBlur"><feGaussianBlur stdDeviation="60" /></filter>
                            <filter id="starGlow"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                            <linearGradient id="shootingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="100%" stopColor="white" />
                            </linearGradient>
                        </defs>

                        {/* ── Shooting Stars ── */}
                        <ShootingStars />

                        {/* ── Background stars (Static Layer) ── */}
                        {BG_STARS.map((s, i) => (
                            <circle key={i} cx={s.x} cy={s.y} r={s.r}
                                fill="white" fillOpacity={s.opacity}
                                className={s.blink === 'slow' ? 'animate-pulse' : ''}
                            />
                        ))}

                        {/* ── Parallax stars (Deep Layer) ── */}
                        <motion.g style={{ x: parallaxX, y: parallaxY }}>
                            {PARALLAX_STARS.map((s, i) => (
                                <circle key={`p-${i}`} cx={s.x} cy={s.y} r={s.r}
                                    fill="white" fillOpacity={s.opacity}
                                />
                            ))}
                        </motion.g>



                        {/* ── Extra Aquarius traditional cross-lines (static, dim grey) ── */}
                        {AQUARIUS_EXTRA_LINES.map((l, i) => (
                            <line key={`xtra-${i}`}
                                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                                stroke="rgba(160,185,255,0.12)" strokeWidth="1"
                                strokeDasharray="4 6" strokeLinecap="round"
                            />
                        ))}

                        {/* ── Extra minor Aquarius stars ── */}
                        {AQUARIUS_MINOR_STARS.map((s, i) => (
                            <g key={`minor-${i}`}>
                                <circle cx={s.x} cy={s.y} r={s.r * 2.5}
                                    fill="rgba(160,185,255,0.06)" />
                                <circle cx={s.x} cy={s.y} r={s.r}
                                    fill="white" fillOpacity={s.opacity} />
                            </g>
                        ))}

                        {/* ── Constellation lines (career path, draw progressively) ── */}
                        {MILESTONES.slice(0, -1).map((m, i) => (
                            <ConstellationLine
                                key={`seg-${i}`}
                                from={m}
                                to={MILESTONES[i + 1]}
                                scrollYProgress={smoothProgress}
                            />
                        ))}

                        {/* ── Milestone Stars ── */}
                        {MILESTONES.map((m, i) => {
                            const isActive = i === activeMilestoneIdx;
                            const isPast   = i < activeMilestoneIdx;
                            const col      = m.color;
                            return (
                                <g key={m.id} filter={isActive ? 'url(#starGlow)' : undefined}>
                                    {/* Far corona */}
                                    <circle cx={m.starX} cy={m.starY}
                                        r={isActive ? 75 : 45}
                                        fill={col.replace('1)', isActive ? '0.1)' : '0.03)')}
                                        style={{ transition: 'all 0.8s ease' }}
                                    />
                                    {/* Mid glow */}
                                    <circle cx={m.starX} cy={m.starY}
                                        r={isActive ? 28 : 16}
                                        fill={col.replace('1)', isActive ? '0.38)' : isPast ? '0.15)' : '0.05)')}
                                        style={{ transition: 'all 0.7s ease' }}
                                    />
                                    {/* Star ring */}
                                    {isActive && (
                                        <circle cx={m.starX} cy={m.starY} r="38"
                                            stroke={col.replace('1)', '0.3)')} strokeWidth="1" fill="none"
                                            strokeDasharray="6 4"
                                        />
                                    )}
                                    {/* Core */}
                                    <circle cx={m.starX} cy={m.starY}
                                        r={isActive ? 10 : isPast ? 7 : 5}
                                        fill={isPast || isActive ? col : 'rgba(255,255,255,0.25)'}
                                        style={{ transition: 'all 0.6s ease' }}
                                    />
                                    {/* Hot center */}
                                    <circle cx={m.starX} cy={m.starY} r="3.5"
                                        fill="white"
                                        fillOpacity={isActive ? 1 : isPast ? 0.65 : 0.2}
                                        style={{ transition: 'fill-opacity 0.6s ease' }}
                                    />
                                    {/* Company label */}
                                    <text
                                        x={m.starX} y={m.starY - (isActive ? 26 : 20)}
                                        textAnchor="middle"
                                        fontFamily="sans-serif"
                                        fontSize={isActive ? '11' : '9'}
                                        fill={col}
                                        fillOpacity={isActive ? 0.9 : isPast ? 0.5 : 0.25}
                                        letterSpacing="2"
                                        style={{ textTransform: 'uppercase', transition: 'all 0.6s ease' }}
                                    >
                                        {m.company}
                                    </text>
                                </g>
                            );
                        })}
                    </motion.svg>
                </motion.div>

                {/* Crosshair at viewport center (marks camera lock-on point) */}
                <motion.div 
                    className="absolute z-[30] pointer-events-none" 
                    style={{
                        left: ptrX,
                        top: ptrY,
                        opacity: pointerOpacity,
                        x: '-50%',
                        y: '-50%',
                    }}
                >
                    {/* Pulsing outer ring */}
                    <motion.div
                        className="absolute rounded-full border"
                        style={{
                            width: 60, height: 60,
                            top: -30, left: -30,
                            borderColor: activeMilestone.color.replace('1)', '0.25)'),
                        }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Static ring */}
                    <div className="absolute rounded-full border"
                        style={{
                            width: 28, height: 28, top: -14, left: -14,
                            borderColor: activeMilestone.color.replace('1)', '0.45)'),
                        }}
                    />
                    {/* Center dot */}
                    <div className="w-2 h-2 rounded-full absolute -top-1 -left-1"
                        style={{ background: activeMilestone.color }}
                    />
                </motion.div>

                {/* ── MILESTONE CARD (one at a time via AnimatePresence) ── */}
                <motion.div style={{ opacity: finalCardOpacity }}>
                    <AnimatePresence mode="wait">
                        <MilestoneCard key={activeMilestone.id} milestone={activeMilestone} />
                    </AnimatePresence>
                </motion.div>

                {/* ── GRAND FINALE SUMMARY TEXT ── */}
                <motion.div
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
                    style={{ opacity: summaryOpacity, filter: summaryBlur }}
                >
                    <p className="text-[10px] md:text-xs tracking-[1em] uppercase text-cream/30 mb-6">
                        The Journey Continued
                    </p>
                    <h2 className="font-serif italic text-cream leading-tight"
                        style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
                    >
                        Where Strategy<br />
                        <span className="not-italic opacity-80">Meets</span> Legacy
                    </h2>
                    <div className="mt-12 w-24 h-px bg-gradient-to-r from-transparent via-cream/40 to-transparent" />
                    <p className="mt-8 text-[9px] tracking-[0.5em] uppercase text-cream/20">
                        Aquarius · ♒ · Feb 10
                    </p>
                </motion.div>

                {/* Intro Title */}
                <motion.div
                    className="absolute top-16 md:top-24 left-8 md:left-[8vw] z-40"
                    style={{ opacity: titleOpacity, y: titleY }}
                >
                    <p className="text-[9px] tracking-[0.7em] uppercase font-sans text-cream/25 mb-3">
                        Kelsey Matthews
                    </p>
                    <h2 className="font-serif tracking-tighter text-cream leading-[0.92]"
                        style={{ fontSize: 'clamp(3rem,8vw,5.5rem)' }}
                    >
                        Career<br />
                        <i className="font-light" style={{ color: 'rgba(238,192,191,0.9)' }}>Constellation</i>
                    </h2>
                    <p className="mt-4 text-[10px] font-sans tracking-[0.45em] uppercase text-cream/25 border border-white/8 inline-block px-4 py-2">
                        Navigate by the Stars
                    </p>
                </motion.div>

                {/* HUD: Mini-map + Milestone counter */}
                <ConstellationHUD
                    scrollYProgress={smoothProgress}
                    activeMilestoneIdx={activeMilestoneIdx}
                />

                {/* Vignette edges */}
                <div className="absolute inset-0 z-[35] pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 45%, rgba(2,2,12,0.7) 100%)' }}
                />

                <SectionBlender position="bottom" intensity="h-48" />
            </div>
        </section>
    );
};
