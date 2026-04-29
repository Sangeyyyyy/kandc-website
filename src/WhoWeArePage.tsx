import { useState, useEffect } from 'react';
import { Reveal, TopNav, UtilityFooter, useModal, FooterCTA, WhyKelseyCompany, SectionBlender } from './SharedComponents';
import { getAssetUrl } from './utils/assets';


const WhoWeArePage = () => {
    const [loaded, setLoaded] = useState(false);
    const { openModal } = useModal();

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    return (
        <div className={`bg-ink text-cream min-h-screen selection:bg-rose selection:text-ink transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <TopNav active={loaded} forceDark={false} />

            {/* ─── DARK MAGAZINE CENTREFOLD ─── */}
            <section className="bg-ink relative border-b border-rose/10">
                {/* Opener */}
                <div className="relative overflow-hidden min-h-[100svh] md:h-[100svh] flex flex-col md:grid md:grid-cols-2">
                    <div className="pt-32 pb-20 px-8 lg:pl-[8vw] lg:pr-16 flex flex-col justify-between relative z-10 min-h-[60vh] md:min-h-full bg-ink">
                        <div>
                            <Reveal>
                                <span className="text-[9px] tracking-[0.4em] uppercase text-rose/40 font-medium">Who We Are</span>
                            </Reveal>
                        </div>
                        <div className="my-10 md:my-0">
                            <Reveal delay={200}>
                                <h1 className="font-serif text-[clamp(4rem,9vw,8.5rem)] font-light leading-[0.9] tracking-[-0.03em] text-cream">
                                    Not<br />just an<br /><em className="italic text-rose">Agency.</em>
                                </h1>
                                <p className="font-serif text-[clamp(1.2rem,2.5vw,2.2rem)] font-light italic text-cream/40 mt-4 md:mt-6">
                                    A global creative collective.
                                </p>
                            </Reveal>
                        </div>
                        <div>
                            <Reveal delay={400}>
                                <span className="text-[9px] tracking-[0.3em] uppercase text-cream/20">Est. 2018 · Atlanta, GA</span>
                            </Reveal>
                        </div>
                    </div>

                    <div className="relative overflow-hidden group h-[50vh] md:h-full w-full">
                        <img
                            src={getAssetUrl('sinners_4')}
                            alt="K&C"
                            className="w-full h-full object-cover brightness-75 grayscale-[0.1] transition-transform duration-[12s] ease-out group-hover:scale-[1.04]"
                        />
                        <div 
                            className="absolute inset-0 pointer-events-none hidden md:block" 
                            style={{ background: 'linear-gradient(270deg, transparent 60%, var(--color-ink) 100%)' }}
                        ></div>
                        <div 
                            className="absolute inset-0 pointer-events-none md:hidden" 
                            style={{ background: 'linear-gradient(0deg, transparent 60%, var(--color-ink) 100%)' }}
                        ></div>
                    </div>
                </div>

                {/* 3-Col Lead Text */}
                <div className="py-24 md:py-32 px-8 lg:px-[8vw]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 mb-24 md:mb-32">
                        <div className="col-span-1">
                            <Reveal>
                                <h3 className="font-serif text-[clamp(2.5rem,3.5vw,3.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-cream mb-6">
                                    The<br /><em className="italic text-rose/80">Origin</em><br />Story.
                                </h3>
                            </Reveal>
                            <Reveal delay={200}>
                                <p className="text-[16px] leading-[1.9] text-cream/60 mt-6 lg:mt-9">
                                    What started with a single radical hypothesis — that haute couture and digital strategy could occupy the same space — became Kelsey & Company.
                                </p>
                            </Reveal>
                        </div>

                        <div className="col-span-1 lg:pt-2">
                            <Reveal>
                                <p className="text-[16px] leading-[1.9] text-cream/60">
                                    We operate as a curated collective, not a traditional agency. That means no account managers, no bloated teams, no diluted creativity. Just senior specialists assembled specifically for your project's DNA.
                                </p>
                            </Reveal>
                            <Reveal delay={200}>
                                <p className="text-[16px] leading-[1.9] text-cream/60 mt-5">
                                    Every engagement is built from scratch. Every team is chosen for the moment. Every deliverable is held to an uncompromising standard of intent.
                                </p>
                            </Reveal>
                        </div>

                        <div className="col-span-1 lg:pt-2 md:col-span-2 lg:col-span-1">
                            <Reveal>
                                <p className="text-[16px] leading-[1.9] text-cream/60">
                                    Our work lives at the intersection of culture, entertainment, and brand ambition — three forces that, when orchestrated properly, create something the world cannot ignore.
                                </p>
                            </Reveal>

                            <div className="mt-10 grid grid-cols-2 gap-6">
                                <Reveal delay={200}>
                                    <div>
                                        <strong className="font-serif text-[44px] block text-rose/60 font-medium leading-none mb-2">40+</strong>
                                        <span className="text-[10px] tracking-[0.25em] uppercase text-cream/40">Specialists</span>
                                    </div>
                                </Reveal>
                                <Reveal delay={400}>
                                    <div>
                                        <strong className="font-serif text-[44px] block text-rose/60 font-medium leading-none mb-2">3</strong>
                                        <span className="text-[10px] tracking-[0.25em] uppercase text-cream/40">Continents</span>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>

                    {/* Pull Quote */}
                    <div className="text-center py-20 px-6 lg:px-[12vw] border-y border-rose/10 mb-24 md:mb-32">
                        <Reveal>
                            <blockquote className="font-serif text-[clamp(2rem,3.5vw,4rem)] font-light italic leading-[1.25] text-cream/85 tracking-[-0.01em]">
                                "At the heart of our work is connection. Strong brands are built through meaningful relationships and stories that leave a lasting impression."
                            </blockquote>
                            <cite className="block mt-8 text-[10px] tracking-[0.3em] uppercase text-rose/40 not-italic">
                                — Kelsey Matthews, Founder & Senior Brand Director
                            </cite>
                        </Reveal>
                    </div>

                    {/* Founder Strip */}
                    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-20 items-start pb-10">
                        <div className="relative aspect-[3/4] overflow-hidden w-full max-w-[400px] mx-auto lg:mx-0">
                            <Reveal className="w-full h-full">
                                <img
                                    src={getAssetUrl('/founder.png')}
                                    alt="Kelsey Matthews"
                                    className="w-full h-full object-cover grayscale-[0.15] brightness-80"
                                />
                                <div className="absolute inset-x-0 bottom-0 pt-20 pb-6 px-6 bg-gradient-to-t from-ink via-ink/80 to-transparent">
                                    <p className="font-serif text-[28px] font-light mb-1 text-cream text-shadow-sm">Kelsey Matthews</p>
                                    <p className="text-[9px] tracking-[0.3em] uppercase text-rose/70 font-medium pb-2 relative z-10">Founder & Sen. Brand Director</p>
                                </div>
                            </Reveal>
                        </div>

                        <div className="lg:pt-5">
                            <Reveal>
                                <span className="text-[10px] tracking-[0.4em] uppercase text-rose/40 font-medium block mb-4">The Founder</span>
                                <h3 className="font-serif text-[clamp(2.5rem,4vw,3.8rem)] font-light leading-[1.1] text-cream mb-8">
                                    Strategy-led.<br /><em className="italic text-rose/80">Human-driven.</em>
                                </h3>
                            </Reveal>

                            <div className="flex flex-wrap gap-10 mb-10 pb-10 border-b border-rose/10">
                                <Reveal delay={200}>
                                    <div>
                                        <strong className="block font-serif text-[36px] text-rose/60 font-medium leading-none mb-2">2018</strong>
                                        <span className="text-[9px] tracking-[0.25em] uppercase text-cream/40">Established</span>
                                    </div>
                                </Reveal>
                                <Reveal delay={400}>
                                    <div>
                                        <strong className="block font-serif text-[36px] text-rose/60 font-medium leading-none mb-2">NY · LDN · ATL</strong>
                                        <span className="text-[9px] tracking-[0.25em] uppercase text-cream/40">Base of Operations</span>
                                    </div>
                                </Reveal>
                            </div>

                            <div className="space-y-5 max-w-2xl text-cream/60">
                                <Reveal delay={200}>
                                    <p className="text-[16px] leading-[1.9]">
                                        Kelsey Matthews founded K&C on the belief that the world's most ambitious brands deserved an agency that operated at their level — not an agency that would simply take their brief and execute it.
                                    </p>
                                </Reveal>
                                <Reveal delay={400}>
                                    <p className="text-[16px] leading-[1.9]">
                                        She built a collective instead. A network of senior specialists — strategists, directors, producers, designers — each selected for their relevance to a specific brand, a specific moment, a specific opportunity.
                                    </p>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* ─── CHAPTER IV: THE CAPABILITIES / WHY US ─── */}
            <div className="bg-ink relative min-h-screen">
                <SectionBlender position="top" intensity="h-48" />
                
                <div className="container mx-auto px-8 pt-32 pb-16 relative z-10 text-center max-w-4xl">
                    <Reveal>
                        <span className="text-cream/50 text-[10px] md:text-xs tracking-[0.4em] font-medium mb-8 block uppercase font-sans">Chapter IV: The Execution</span>
                        <h2 className="text-5xl md:text-6xl font-serif tracking-tighter leading-[1.1]">
                            How we bring <i className="text-rose/80 font-light italic">ideas to life.</i>
                        </h2>
                    </Reveal>
                </div>

                <WhyKelseyCompany />
            </div>

            <FooterCTA onBookClick={openModal} />
            <UtilityFooter />
        </div>
    );
};

export default WhoWeArePage;
