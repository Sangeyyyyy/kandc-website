import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, Sparkles } from 'lucide-react';
import { type Project, type Award, type PartnerLogo } from '../../data/projects';
import { Reveal, useModal, useMagnetic } from '../../SharedComponents';
const RadioHero = lazy(() => import('./RadioHero').then(m => ({ default: m.RadioHero })));
const RoadmapSection = lazy(() => import('../../RoadmapSection').then(m => ({ default: m.RoadmapSection })));
import { AwardCard } from './AwardCard';
import { StatCounter } from './StatCounter';

export const DetailPanel = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
    const { openModal } = useModal();
    const [isHeroInView, setIsHeroInView] = useState(true);
    const [volume, setVolume] = useState(0);
    const [showTooltip, setShowTooltip] = useState(true);
    const [isPipClosed, setIsPipClosed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isPortrait = project?.orientation === 'portrait';
    const magneticClose = useMagnetic(25);
    const [currentSlide, setCurrentSlide] = useState(0);

    const filteredGallery = project?.gallery?.filter(img =>
        !img.toLowerCase().includes('solo') &&
        !img.toLowerCase().includes('logo') &&
        !img.toLowerCase().includes('background')
    ) || [];

    useEffect(() => {
        if (project && !project.video && filteredGallery.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % filteredGallery.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [project, filteredGallery.length]);

    useEffect(() => {
        if (!isHeroInView) return;
        const timer = setTimeout(() => {
            setShowTooltip(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [isHeroInView]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        if (videoRef.current) {
            videoRef.current.volume = newVol;
            videoRef.current.muted = newVol === 0;
        }
    };

    const toggleMute = () => {
        const newVol = volume === 0 ? 1 : 0;
        setVolume(newVol);
        if (videoRef.current) {
            videoRef.current.volume = newVol;
            videoRef.current.muted = newVol === 0;
        }
    };

    useEffect(() => {
        if (isHeroInView) {
            setIsPipClosed(false);
        }
    }, [isHeroInView]);

    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                window.removeEventListener('keydown', handleEsc);
                document.body.style.overflow = '';
            };
        }
    }, [project, onClose]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrolled = e.currentTarget.scrollTop;
        if (scrolled > window.innerHeight * 0.75) {
            setIsHeroInView(false);
        } else {
            setIsHeroInView(true);
        }
    };

    useEffect(() => {
        if (project) {
            document.title = `${project.title} | Our Work | Kelsey & Company`;
        } else {
            document.title = "Our Work | Kelsey & Company";
        }
    }, [project]);

    if (!project) return null;

    // Radio-only projects get their own dedicated layout
    if (project.audioSpots && project.audioSpots.length > 0) {
        return (
            <Suspense fallback={<div className="fixed inset-0 bg-ink flex items-center justify-center text-cream/20 font-serif italic">Loading Player...</div>}>
                <RadioHero project={project} onClose={onClose} />
            </Suspense>
        );
    }

    return (
        <div className="fixed inset-0 z-[200] animate-slide-in-right pointer-events-none bg-ink">
            {(project.video || (filteredGallery.length > 0 && !project.video)) && (
                <motion.div
                    layout
                    initial={false}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`pointer-events-auto overflow-hidden transition-all duration-500 ${!isHeroInView && isPipClosed ? '!opacity-0 !pointer-events-none' : ''
                        } ${isHeroInView
                            ? isPortrait
                                ? 'absolute top-0 left-0 w-full h-screen lg:top-1/2 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[32vw] lg:h-auto lg:aspect-[9/16] lg:rounded-2xl z-0 lg:shadow-2xl'
                                : 'absolute top-0 left-0 w-full h-screen z-0'
                            : isPortrait
                                ? 'absolute bottom-8 right-8 w-40 md:w-56 aspect-[9/16] z-[250] rounded-xl flex shadow-2xl border border-cream/10 shadow-ember group/pip'
                                : 'absolute bottom-8 right-8 w-60 md:w-80 aspect-video z-[250] rounded-sm flex shadow-2xl border border-cream/10 shadow-ember group/pip'
                        }`}
                >
                    {project.video ? (
                        (() => {
                            const isYouTube = project.video.includes('youtube.com') || project.video.includes('youtu.be');
                            if (isYouTube) {
                                let videoId = '';
                                if (project.video.includes('v=')) {
                                    videoId = project.video.split('v=')[1].split('&')[0];
                                } else if (project.video.includes('youtu.be/')) {
                                    videoId = project.video.split('youtu.be/')[1].split('?')[0];
                                } else if (project.video.includes('embed/')) {
                                    videoId = project.video.split('embed/')[1].split('?')[0];
                                }
                                const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`;

                                return (
                                    <iframe
                                        src={embedUrl}
                                        className="w-full h-full border-none brightness-[0.7]"
                                        allow="autoplay; encrypted-media"
                                        title={project.title}
                                    />
                                );
                            }
                            return (
                                <video
                                    ref={videoRef}
                                    src={project.video}
                                    autoPlay
                                    loop
                                    muted={volume === 0}
                                    playsInline
                                    className="w-full h-full object-contain brightness-[0.7]"
                                />
                            );
                        })()
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentSlide}
                                src={filteredGallery[currentSlide]}
                                alt={project.title}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full object-contain brightness-[0.7]"
                            />
                        </AnimatePresence>
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent transition-opacity duration-700 pointer-events-none ${isHeroInView ? 'opacity-100' : 'opacity-0'}`} />
                    <button
                        onClick={() => setIsPipClosed(true)}
                        className={`absolute top-4 right-4 z-50 text-cream/70 hover:text-cream bg-black/40 hover:bg-black/80 rounded-full p-2 backdrop-blur-md transition-all duration-300 outline-none ${!isHeroInView ? 'opacity-0 group-hover/pip:opacity-100' : 'opacity-0 pointer-events-none'}`}
                        aria-label="Close Picture-in-Picture"
                    >
                        <X size={16} strokeWidth={1.5} />
                    </button>
                    {project.video && (
                        <button
                            onClick={toggleMute}
                            className={`absolute bottom-4 right-4 z-50 text-cream/70 hover:text-cream bg-black/40 hover:bg-black/80 rounded-full p-2 backdrop-blur-md transition-all duration-300 outline-none ${!isHeroInView ? 'opacity-0 group-hover/pip:opacity-100' : 'opacity-0 pointer-events-none'}`}
                        >
                            {volume === 0 ? <VolumeX size={16} strokeWidth={1.5} /> : <Volume2 size={16} strokeWidth={1.5} />}
                        </button>
                    )}
                </motion.div>
            )}

            <div ref={scrollRef} onScroll={handleScroll} className="absolute inset-0 overflow-y-auto custom-scrollbar pointer-events-auto">
                <section className="relative h-screen w-full flex flex-col justify-end p-12 md:p-24 pointer-events-none">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {!project.video && filteredGallery.length === 0 && (
                            <div className="w-full h-full relative">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full transition-all duration-[1500ms] ease-out pointer-events-auto object-contain brightness-[0.7]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                            </div>
                        )}
                    </div>

                    <div className="relative z-10 w-full pointer-events-auto">
                        <Reveal mode="mask">
                            <span className="text-rose text-[0.6rem] md:text-xs tracking-[0.5em] uppercase font-sans mb-6 block">
                                {project.category} · {project.year}
                            </span>
                        </Reveal>
                        <Reveal delay={200} mode="mask">
                            <h2 className="text-6xl md:text-[6.5rem] font-serif text-cream leading-[0.9] tracking-tighter uppercase mb-6 drop-shadow-2xl">
                                {project.title}
                            </h2>
                        </Reveal>
                        <Reveal delay={400} mode="mask">
                            <p className="text-cream/60 font-serif italic text-lg md:text-2xl max-w-2xl border-l-2 border-burgundy/40 pl-6 ml-1">
                                {project.subtitle || "Exploring the cultural intersection of brand and experience."}
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section className="py-32 md:py-48 px-8 md:px-24 bg-ink border-y border-white/5">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
                        <div className="space-y-16">
                            <Reveal>
                                <div>
                                    <p className="text-rose/50 text-[0.55rem] tracking-[0.4em] uppercase mb-4">The Narrative</p>
                                    <h4 className="text-cream text-[0.7rem] tracking-[0.2em] uppercase font-sans mb-10 border-b border-white/5 pb-6">
                                        {project.themeLabel || "Executive Narrative"}
                                    </h4>
                                    <p className="text-cream/70 font-serif italic text-2xl md:text-4xl leading-relaxed">
                                        {project.themeDescription || "A strategic production centered on cultural relevance and brand longevity."}
                                    </p>
                                </div>
                            </Reveal>
                        </div>

                        <div className="space-y-24">
                            <Reveal delay={200}>
                                <div className="grid grid-cols-2 gap-12 border-t border-white/5 pt-10">
                                    <div>
                                        <p className="text-rose/50 text-[0.65rem] tracking-[0.4em] uppercase mb-4">Project Scale</p>
                                        <span className="text-cream text-2xl font-serif italic">{project.scaleValue}</span>
                                    </div>
                                    <div>
                                        <p className="text-rose/50 text-[0.65rem] tracking-[0.4em] uppercase mb-4">Release Year</p>
                                        <span className="text-cream text-2xl font-serif italic">{project.year || "2025"}</span>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={300}>
                                <div>
                                    <p className="text-rose/50 text-[0.65rem] tracking-[0.4em] uppercase mb-10">Key Deliverables</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                        {project.deliverables?.map((d, i) => (
                                            <li key={i} className="flex items-center gap-4 text-cream font-sans text-lg group">
                                                <span className="w-1.5 h-1.5 rounded-full bg-burgundy/40 group-hover:bg-rose transition-colors" />
                                                <span className="opacity-60 group-hover:opacity-100 transition-opacity">{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>

                            {project.partnerLogos && (() => {
                                const row1 = project.partnerLogos.filter((l: PartnerLogo) => l.size !== 'full');
                                const row2 = project.partnerLogos.filter((l: PartnerLogo) => l.size === 'full');
                                const filterClass = (mode: string = 'monochrome') => {
                                    if (mode === 'none') return '';
                                    return mode === 'blend' ? 'invert mix-blend-screen' :
                                        mode === 'ces' ? 'brightness-[2] saturate-0 opacity-50' :
                                            'brightness-0 invert opacity-50';
                                };

                                return (
                                    <Reveal delay={400}>
                                        <div className="border-t border-white/5 pt-10">
                                            <p className="text-rose/50 text-[0.65rem] tracking-[0.4em] uppercase mb-10">Partners</p>
                                            <div className="flex flex-wrap items-center gap-x-12 gap-y-8 md:gap-x-16 mb-12">
                                                {row1.map((logo: PartnerLogo, i: number) => {
                                                    const scale = logo.scale || 1;
                                                    const sizeClass = logo.size === 'icon' ? 'h-14 md:h-16 w-auto' :
                                                        logo.size === 'square' ? 'h-12 md:h-14 w-auto max-w-[100px]' :
                                                            'h-9 md:h-11 w-auto max-w-[180px] md:max-w-[240px]';
                                                    return (
                                                        <div key={i} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
                                                            <img src={logo.src} alt={logo.alt || 'Partner'} className={`object-contain ${sizeClass} ${filterClass(logo.mode)}`} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {row2.length > 0 && (
                                                <div className="flex flex-row flex-wrap items-center gap-x-12 gap-y-8 border-t border-white/5 pt-8">
                                                    {row2.map((logo: PartnerLogo, i: number) => (
                                                        <div key={i} style={{ transform: `scale(${logo.scale || 1})`, transformOrigin: 'left center' }}>
                                                            <img src={logo.src} alt={logo.alt || 'Partner'} className={`h-7 md:h-9 w-auto object-contain object-left ${filterClass(logo.mode)}`} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Reveal>
                                );
                            })()}
                        </div>
                    </div>
                </section>

                {project.awards && project.awards.length > 0 && (
                    <section className="py-32 md:py-48 px-8 md:px-24 bg-[#0d0709] border-y border-white/5 overflow-hidden relative">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-burgundy/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                        <div className="max-w-7xl mx-auto relative z-10">
                            {/* Section Header */}
                            <Reveal>
                                <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                                    <div>
                                        <p className="text-rose text-[0.65rem] tracking-[0.5em] uppercase mb-4 flex items-center gap-3">
                                            <Sparkles size={12} className="animate-pulse" />
                                            Accolades & Recognition
                                        </p>
                                        <h3 className="text-5xl md:text-[6.5rem] font-serif text-cream italic uppercase tracking-tighter leading-none">
                                            The <span className="text-rose">Award</span> Season
                                        </h3>
                                    </div>

                                    {/* Suggestion 1: Summary Stat Bar */}
                                    {project.title === 'Sinners' && (
                                        <div className="flex items-center gap-12 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-6 rounded-sm">
                                            <div className="text-center">
                                                <p className="text-[0.6rem] tracking-[0.2em] text-cream/40 uppercase mb-1">Total Wins</p>
                                                <p className="text-3xl font-serif text-cream"><StatCounter to={project.awards.reduce((acc, curr) => acc + curr.count, 0)} /></p>
                                            </div>
                                            <div className="w-px h-12 bg-white/10" />
                                            <div className="text-center">
                                                <p className="text-[0.6rem] tracking-[0.2em] text-cream/40 uppercase mb-1">Nominations</p>
                                                <p className="text-3xl font-serif text-cream">{project.awards.find(a => a.group.includes('Academy'))?.nominations || 16}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Reveal>

                            {/* Awards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-24 mb-32">
                                {project.awards.map((award: Award, i: number) => (
                                    <AwardCard key={i} award={award} i={i} />
                                ))}
                            </div>

                            {/* Suggestion 4: Historic Callout Card */}
                            {project.title === 'Sinners' && (
                                <Reveal delay={600}>
                                    <div className="bg-gradient-to-r from-burgundy/20 to-rose/5 border border-rose/20 p-12 md:p-16 rounded-lg relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-96 h-96 bg-rose/10 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-rose/20 transition-colors duration-1000" />
                                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 items-center">
                                            <div className="w-24 h-24 rounded-full bg-rose/10 flex items-center justify-center border border-rose/30">
                                                <Sparkles className="text-rose" size={40} />
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-rose text-[0.7rem] tracking-[0.4em] uppercase font-sans">Historic Achievement</p>
                                                <h4 className="text-2xl md:text-4xl font-serif text-cream italic leading-tight">
                                                    “Autumn Durald Arkapaw made history as the <span className="text-rose underline decoration-rose/30 underline-offset-8">first woman to win</span> Best Cinematography at the Oscars for Sinners.”
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            )}
                        </div>
                    </section>
                )}

                {project.roadmap && project.roadmap.length > 0 && (
                    <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-cream/10 uppercase tracking-widest text-xs">Loading Playbook...</div>}>
                        <RoadmapSection steps={project.roadmap} scrollRef={scrollRef} />
                    </Suspense>
                )}

                <section className="py-32 md:py-48 px-8 md:px-24 bg-[#0a0507]">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-24 flex items-end justify-between border-b border-white/5 pb-8">
                            <p className="text-rose/50 text-[0.65rem] tracking-[0.4em] uppercase">Production Gallery</p>
                            <span className="text-cream/20 font-serif italic">{filteredGallery.length} Selected Assets</span>
                        </div>
                        {filteredGallery.length > 0 ? (
                            <div className={project.galleryLayout === 'poster' ? "flex flex-col gap-0 max-w-4xl mx-auto" : "columns-1 md:columns-2 lg:columns-2 gap-8 space-y-8"}>
                                {filteredGallery.map((img, i) => (
                                    <Reveal key={i} delay={i * 50}>
                                        <div className={project.galleryLayout === 'poster' ? "overflow-hidden group relative" : "break-inside-avoid overflow-hidden bg-white/5 border border-white/5 group relative"}>
                                            <img src={img} alt={`Gallery ${i}`} loading="lazy" className="w-full h-auto object-contain transition-transform duration-[2000ms] group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-ink opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        ) : (
                            <Reveal>
                                <div className="py-32 border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center text-center rounded-sm">
                                    <div className="w-12 h-12 rounded-full border border-rose/20 flex items-center justify-center mb-8">
                                        <span className="text-rose/40 text-xs">◆</span>
                                    </div>
                                    <p className="text-rose/40 text-[0.6rem] tracking-[0.5em] uppercase mb-4">Under Curation</p>
                                    <h4 className="text-2xl md:text-3xl font-serif text-cream/30 italic">Archive Assets Coming Soon</h4>
                                    <p className="text-cream/10 text-xs mt-6 tracking-widest uppercase">The Playbook is being digitized</p>
                                </div>
                            </Reveal>
                        )}
                    </div>
                </section>

                <section className="py-32 md:py-64 bg-ink flex items-center justify-center">
                    <div className="text-center space-y-12">
                        <Reveal>
                            <h3 className="text-5xl md:text-8xl font-serif italic text-cream uppercase tracking-tighter leading-none">
                                Let&apos;s Make <br />
                                Something <span className="text-rose">Iconic.</span>
                            </h3>
                        </Reveal>
                        <Reveal delay={200}>
                            <button onClick={() => { onClose(); openModal(); }} className="inline-flex items-center gap-6 border border-rose/30 px-12 py-6 text-rose hover:bg-rose hover:text-ink transition-all duration-700 text-[0.7rem] tracking-[0.5em] uppercase font-sans group">
                                Start A Project
                                <span className="text-2xl group-hover:translate-x-3 transition-transform duration-500">→</span>
                            </button>
                        </Reveal>
                    </div>
                </section>
            </div>

            {project.video && (
                <div className={`fixed right-8 bottom-8 md:right-12 md:bottom-12 z-[300] flex items-center group/vol transition-all duration-700 pointer-events-auto ${isHeroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <AnimatePresence>
                        {showTooltip && volume === 0 && (
                            <motion.div initial={{ opacity: 0, scale: 0.9, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }} className="absolute -top-12 right-0 pointer-events-none origin-bottom-right">
                                <div className="bg-cream text-ink text-[0.6rem] px-4 py-2 rounded-full font-sans tracking-widest uppercase animate-bounce whitespace-nowrap shadow-2xl relative">
                                    Click to unmute sound
                                    <div className="absolute -bottom-1 right-6 w-3 h-3 bg-cream rotate-45 rounded-sm z-[-1]" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button onClick={toggleMute} className="text-cream/50 group-hover/vol:text-cream transition-colors cursor-pointer mr-2 outline-none">
                        {volume === 0 ? <VolumeX size={20} strokeWidth={1.5} /> : <Volume2 size={20} strokeWidth={1.5} />}
                    </button>
                    <input type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolumeChange} className="volume-slider pointer-events-auto" />
                </div>
            )}

            <div ref={magneticClose} className="absolute top-8 right-8 md:top-12 md:right-12 z-[400] pointer-events-auto">
                <button 
                    onClick={onClose} 
                    className="w-12 h-12 flex items-center justify-center bg-cream/5 border border-cream/10 rounded-full text-cream/40 hover:bg-cream hover:text-ink transition-all duration-500 group"
                >
                    <span className="text-xl group-hover:rotate-90 transition-transform duration-500">✕</span>
                </button>
            </div>
        </div>
    );
};
