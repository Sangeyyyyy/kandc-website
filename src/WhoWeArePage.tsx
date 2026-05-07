import { useState, useEffect } from 'react';
import { Reveal, TopNav, UtilityFooter, useModal, FooterCTA } from './SharedComponents';
import { getAssetUrl } from './utils/assets';

// ─── Inline stat counter component ───────────────────────────────────────────
const StatItem = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
    <Reveal delay={delay}>
        <div className="flex flex-col gap-1 border-l border-cream/10 pl-6">
            <strong className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] font-light leading-none text-cream tracking-[-0.02em]">
                {value}
            </strong>
            <span className="text-[9px] tracking-[0.3em] uppercase text-cream/30 font-sans">
                {label}
            </span>
        </div>
    </Reveal>
);

// ─── Numbered editorial panel ─────────────────────────────────────────────────
const EditorialPanel = ({
    num,
    heading,
    body,
    accent,
    delay = 0,
}: {
    num: string;
    heading: string;
    body: string;
    accent?: string;
    delay?: number;
}) => (
    <Reveal delay={delay}>
        <div className="group grid grid-cols-[64px_1fr] md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 py-10 md:py-14 border-b border-cream/[0.07] items-start cursor-default transition-all duration-700 hover:bg-cream/[0.02] px-2">
            {/* Number */}
            <div className="pt-1">
                <span className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-light text-cream/20 leading-none tracking-[-0.02em] group-hover:text-rose/40 transition-colors duration-700">
                    {num}
                </span>
            </div>
            {/* Heading */}
            <div>
                <h3 className="font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] font-light leading-[1.1] text-cream tracking-[-0.02em]">
                    {heading}
                    {accent && (
                        <em className="italic text-rose/70 not-italic"> {accent}</em>
                    )}
                </h3>
            </div>
            {/* Body */}
            <div className="col-span-2 md:col-span-1 md:pt-1">
                <p className="text-[15px] leading-[1.85] text-cream/50 max-w-lg">
                    {body}
                </p>
            </div>
        </div>
    </Reveal>
);

const WhoWeArePage = () => {
    const [loaded, setLoaded] = useState(false);
    const { openModal } = useModal();

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    const values = [
        {
            num: '01',
            heading: 'Relationships',
            accent: 'Come First.',
            body: 'With clients, partners, and communities. We build on a foundation of mutual respect and long-term vision — not short-term transactions.',
        },
        {
            num: '02',
            heading: 'Strategy &',
            accent: 'Creativity.',
            body: 'Impact requires both vision and precision. We bridge the gap between bold ideas and measurable results, never sacrificing one for the other.',
        },
        {
            num: '03',
            heading: 'Culture Drives',
            accent: 'Connection.',
            body: 'We build bridges to what matters most by staying at the heart of the cultural conversation — where brands become movements.',
        },
        {
            num: '04',
            heading: 'Consistency',
            accent: 'Builds Trust.',
            body: 'Every touchpoint is an opportunity for excellence. We maintain an uncompromising standard that speaks for itself across every deliverable.',
        },
    ];

    return (
        <div className={`bg-ink text-cream min-h-screen selection:bg-rose selection:text-ink transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <TopNav active={loaded} forceDark={false} />

            {/* ─── SECTION 1: HERO ─────────────────────────────────────────── */}
            <section className="bg-ink relative min-h-[100svh] flex flex-col">
                {/* Background image — full bleed, low opacity */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={getAssetUrl('sinners_5')}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover object-center opacity-25 grayscale-[0.2] scale-[1.04] transition-transform duration-[20s] ease-out"
                        style={{ transform: loaded ? 'scale(1)' : 'scale(1.06)', transition: 'transform 20s ease-out' }}
                    />
                    {/* Vignette */}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-ink) 0%, rgba(26,10,13,0.7) 40%, rgba(26,10,13,0.5) 100%)' }} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1 px-8 lg:px-[8vw] pt-36 pb-16 justify-between">
                    {/* Top label */}
                    <Reveal>
                        <span className="text-[9px] tracking-[0.4em] uppercase text-cream/20 font-sans">
                            Est. 2018 · Atlanta, GA · Global
                        </span>
                    </Reveal>

                    {/* Headline */}
                    <div className="my-auto py-16">
                        <Reveal delay={200}>
                            <h1 className="font-serif text-[clamp(4.5rem,10vw,10rem)] font-light leading-[0.88] tracking-[-0.03em] text-cream max-w-4xl">
                                Not just<br />
                                an <em className="italic text-rose">Agency.</em>
                            </h1>
                        </Reveal>
                        <Reveal delay={400}>
                            <p className="mt-8 text-[clamp(1rem,1.8vw,1.4rem)] font-serif font-light italic text-cream/35 max-w-md leading-relaxed">
                                A global creative collective built on culture, strategy, and uncompromising ambition.
                            </p>
                        </Reveal>
                    </div>

                    {/* Stat strip — anchored to bottom like Telkom-OT */}
                    <div className="flex flex-wrap gap-8 md:gap-12 pt-12 border-t border-cream/[0.06]">
                        <StatItem value="40+" label="Senior Specialists" delay={500} />
                        <StatItem value="3" label="Continents" delay={650} />
                        <StatItem value="7+" label="Years of Impact" delay={800} />
                        <StatItem value="200+" label="Projects Delivered" delay={950} />
                    </div>
                </div>
            </section>

            {/* ─── SECTION 2: ORIGIN STORY (LIGHT) ───────────────────────── */}
            <section className="bg-cream relative py-24 md:py-36">
                <div className="px-8 lg:px-[8vw]">

                    {/* Section label + headline — Telkom-OT style: large left-aligned */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-24 items-end mb-20 md:mb-28">
                        <Reveal>
                            <h2 className="font-serif text-[clamp(3rem,6vw,6rem)] font-light leading-[0.95] tracking-[-0.03em] text-ink">
                                The<br />
                                <em className="italic text-burgundy/70">Origin</em><br />
                                Story.
                            </h2>
                        </Reveal>
                        <div className="space-y-5">
                            <Reveal delay={200}>
                                <p className="text-[16px] leading-[1.9] text-ink/65">
                                    What started with a single radical hypothesis — that haute couture and digital strategy could occupy the same space — became Kelsey &amp; Company.
                                </p>
                            </Reveal>
                            <Reveal delay={350}>
                                <p className="text-[16px] leading-[1.9] text-ink/65">
                                    We operate as a curated collective, not a traditional agency. No account managers, no bloated teams, no diluted creativity. Just senior specialists assembled specifically for your project's DNA.
                                </p>
                            </Reveal>
                            <Reveal delay={500}>
                                <p className="text-[16px] leading-[1.9] text-ink/65">
                                    Every engagement is built from scratch. Every team is chosen for the moment. Every deliverable is held to an uncompromising standard of intent.
                                </p>
                            </Reveal>
                        </div>
                    </div>

                    {/* Pull Quote — full width, centred, with fine border */}
                    <Reveal>
                        <blockquote className="text-center py-16 md:py-24 border-y border-burgundy/10">
                            <p className="font-serif text-[clamp(1.6rem,3vw,3.2rem)] font-light italic leading-[1.3] text-ink/80 tracking-[-0.01em] max-w-4xl mx-auto">
                                "At the heart of our work is connection. Strong brands are built through meaningful relationships and stories that leave a lasting impression."
                            </p>
                            <cite className="block mt-8 text-[9px] tracking-[0.35em] uppercase text-burgundy/50 not-italic font-sans">
                                — Kelsey Matthews, Founder &amp; Senior Brand Director
                            </cite>
                        </blockquote>
                    </Reveal>
                </div>
            </section>

            {/* ─── SECTION 3: WHAT WE STAND FOR (DARK) ─────────────────── */}
            {/* Telkom-OT inspired: numbered editorial panels stacked with dividers */}
            <section className="bg-ink relative py-24 md:py-32">
                <div className="px-8 lg:px-[8vw]">
                    {/* Section header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4">
                        <Reveal>
                            <h2 className="font-serif text-[clamp(2.2rem,4vw,4rem)] font-light leading-[1.0] tracking-[-0.02em] text-cream">
                                What We<br />
                                <em className="italic text-rose/70">Stand For.</em>
                            </h2>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="text-[13px] tracking-[0.2em] uppercase text-cream/25 font-sans max-w-xs text-right hidden md:block">
                                The principles that drive every decision we make
                            </p>
                        </Reveal>
                    </div>

                    {/* Top border */}
                    <div className="border-t border-cream/[0.07] mt-8">
                        {values.map((v, i) => (
                            <EditorialPanel
                                key={v.num}
                                num={v.num}
                                heading={v.heading}
                                accent={v.accent}
                                body={v.body}
                                delay={i * 100}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SECTION 4: THE FOUNDER (LIGHT) ──────────────────────── */}
            <section className="bg-cream relative py-24 md:py-32 overflow-hidden">
                <div className="px-8 lg:px-[8vw]">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-24 items-center">

                        {/* Text side — leads on this version for editorial feel */}
                        <div>
                            <Reveal>
                                <span className="text-[9px] tracking-[0.4em] uppercase text-burgundy/40 font-sans mb-6 block">
                                    The Vision Behind It
                                </span>
                                <h2 className="font-serif text-[clamp(3rem,5.5vw,5.5rem)] font-light leading-[0.92] tracking-[-0.03em] text-ink mb-4">
                                    Kelsey<br />
                                    Matthews.
                                </h2>
                                <p className="text-[10px] tracking-[0.3em] uppercase text-burgundy/50 font-sans mb-10">
                                    Founder &amp; Senior Brand Director
                                </p>
                            </Reveal>

                            <div className="space-y-5 max-w-xl">
                                <Reveal delay={200}>
                                    <p className="text-[16px] leading-[1.9] text-ink/65">
                                        Kelsey Matthews founded K&amp;C on the belief that the world's most ambitious brands deserved an agency that operated at their level — not one that would simply take a brief and execute it.
                                    </p>
                                </Reveal>
                                <Reveal delay={350}>
                                    <p className="text-[16px] leading-[1.9] text-ink/65">
                                        She built a collective instead. A network of senior specialists — strategists, directors, producers, designers — each selected for their relevance to a specific brand, a specific moment, a specific opportunity.
                                    </p>
                                </Reveal>
                                <Reveal delay={500}>
                                    <p className="text-[16px] leading-[1.9] text-ink/65">
                                        Her work has earned recognition from the{' '}
                                        <em className="text-ink not-italic font-semibold">Clio Awards</em>
                                        {' '}and the{' '}
                                        <em className="text-ink not-italic font-semibold">Webby Awards</em>
                                        {' '}— two honours that reflect a singular belief: that creative rigour and cultural authenticity are never at odds.
                                    </p>
                                </Reveal>
                            </div>

                            {/* Inline stat row */}
                            <Reveal delay={600}>
                                <div className="flex gap-10 mt-12 pt-10 border-t border-ink/10">
                                    <div>
                                        <strong className="font-serif text-[2.8rem] font-light text-ink leading-none block">
                                            Clio
                                        </strong>
                                        <span className="text-[9px] tracking-[0.25em] uppercase text-ink/35 font-sans">Award Recognition</span>
                                    </div>
                                    <div>
                                        <strong className="font-serif text-[2.8rem] font-light text-ink leading-none block">
                                            Webby
                                        </strong>
                                        <span className="text-[9px] tracking-[0.25em] uppercase text-ink/35 font-sans">Award Recognition</span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* Portrait */}
                        <Reveal delay={300} className="w-full">
                            <div className="relative aspect-[3/4] overflow-hidden w-full max-w-[440px] mx-auto lg:mx-0">
                                <img
                                    src={getAssetUrl('/founder.png')}
                                    alt="Kelsey Matthews"
                                    className="w-full h-full object-cover grayscale-[0.15] transition-transform duration-[10s] ease-out hover:scale-[1.03]"
                                />
                                {/* Subtle dark edge on image */}
                                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 60px rgba(26,10,13,0.15)' }} />
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Watermark */}
                <div className="absolute bottom-0 right-0 font-serif text-[18vw] leading-none text-ink/[0.025] pointer-events-none select-none uppercase italic tracking-[-0.05em] translate-x-[10%] translate-y-[15%]">
                    K&amp;C
                </div>
            </section>

            {/* ─── SECTION 5: HOW WE WORK (DARK) ──────────────────────── */}
            {/* Telkom-OT inspired: numbered list with large serif numbers as decorative anchors */}
            <section className="bg-ink relative py-24 md:py-36 overflow-hidden">
                <div className="px-8 lg:px-[8vw]">
                    {/* Section header */}
                    <Reveal>
                        <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] font-light leading-[0.95] tracking-[-0.03em] text-cream mb-16 md:mb-24">
                            How We Bring<br />
                            <em className="italic text-rose/70">Ideas to Life.</em>
                        </h2>
                    </Reveal>

                    {/* 4-column approach grid — editorial card panels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cream/[0.05]">
                        {[
                            {
                                n: '01',
                                title: 'Discovery & Alignment',
                                desc: 'We immerse ourselves in your brand, your audience, and your competitive landscape. No brief taken at face value.',
                            },
                            {
                                n: '02',
                                title: 'Strategy & Creative Direction',
                                desc: 'A bespoke roadmap is crafted — positioning, narrative, and creative frameworks that connect culture with commerce.',
                            },
                            {
                                n: '03',
                                title: 'Production & Execution',
                                desc: 'Senior specialists mobilise. Every asset, event, and campaign is produced to a standard that justifies your ambition.',
                            },
                            {
                                n: '04',
                                title: 'Measure & Iterate',
                                desc: 'We track, learn, and optimise. The relationship deepens. The results compound.',
                            },
                        ].map((step, i) => (
                            <Reveal key={step.n} delay={i * 120}>
                                <div className="group p-10 md:p-14 bg-ink hover:bg-cream/[0.03] transition-all duration-700 relative overflow-hidden min-h-[280px] flex flex-col justify-between border border-cream/[0.05]">
                                    {/* Large ghost number */}
                                    <span className="absolute top-6 right-8 font-serif text-[6rem] font-light leading-none text-cream/[0.04] pointer-events-none select-none group-hover:text-rose/10 transition-colors duration-700">
                                        {step.n}
                                    </span>
                                    <div>
                                        <span className="text-[9px] tracking-[0.35em] uppercase text-rose/40 font-sans mb-4 block">
                                            Step {step.n}
                                        </span>
                                        <h3 className="font-serif text-[clamp(1.5rem,2.2vw,2rem)] font-light text-cream leading-[1.15] tracking-[-0.02em]">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-[14px] leading-[1.85] text-cream/45 mt-6 max-w-sm">
                                        {step.desc}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <FooterCTA onBookClick={openModal} />
            <UtilityFooter />
        </div>
    );
};

export default WhoWeArePage;
