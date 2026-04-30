import { useState, useEffect, lazy, Suspense } from 'react';
import {
    Reveal,
    TopNav,
    useModal,
    FooterCTA,
    UtilityFooter,
    ScrollProgressBar
} from './SharedComponents';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

import { projects, type Project } from './data/projects';
const DetailPanel = lazy(() => import('./features/archives/DetailPanel').then(m => ({ default: m.DetailPanel })));
import { ProjectCard } from './features/archives/ProjectCard';
import { ProjectSection } from './features/archives/ProjectSection';

export default function ArchivesPage() {
    const { openModal } = useModal();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (selectedProject) {
            document.title = `${selectedProject.title} | Our Work | Kelsey & Company`;
        } else {
            document.title = "Our Work | Kelsey & Company";
        }
    }, [selectedProject]);

    const moviePremieres = [1, 2, 3, 4, 5, 6].map(id => projects.find(p => p.id === id)).filter((p): p is Project => p !== undefined);
    const executiveBrand = projects.filter(p => [8].includes(p.id));
    const digitalCampaigns = projects.filter(p => [7, 16, 17, 18].includes(p.id));

    // Categorized Programming & Production
    const blackat2023Projects = projects.filter(p => [9, 11, 13, 14].includes(p.id));
    const blackat2025Projects = projects.filter(p => [15].includes(p.id));
    const spikeLeeProjects = projects.filter(p => [10, 12].includes(p.id));
    const comeUpProjects = projects.filter(p => [19].includes(p.id));
    const kingdomBusinessProjects = projects.filter(p => [31].includes(p.id));
    const copywritingProjects = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        .map(id => projects.find(p => p.id === id))
        .filter((p): p is Project => p !== undefined);

    return (
        <div className={`bg-ink text-cream min-h-screen selection:bg-rose selection:text-ink transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <ScrollProgressBar />
            <TopNav active={loaded} forceDark={false} />
            <div className="noise-overlay opacity-[0.03]"></div>
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] watermark-text" style={{ transform: 'rotate(-5deg)' }}>Our Work</div>
                <div className="absolute top-[40%] -right-[15%] watermark-text" style={{ transform: 'rotate(15deg)', opacity: 0.02 }}>Cultural</div>
                <div className="absolute -bottom-[10%] -left-[5%] watermark-text" style={{ transform: 'rotate(-2deg)', opacity: 0.025 }}>K&C</div>
            </div>
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-burgundy/5 blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[0%] w-[50vw] h-[50vw] rounded-full bg-icy/10 blur-[150px]"></div>
            </div>

            <div className="py-48 container mx-auto px-8 max-w-7xl">
                <ProjectSection title="Movie Premieres & Integrated Activations" description="Blockbuster activations and immersive launch strategies for Hollywood's most anticipated releases." items={moviePremieres} onProjectClick={setSelectedProject} />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-48 md:mb-64" />
                <ProjectSection title="Executive Brand Management" description="Strategic brand positioning and high-stakes coordination for industry visionaries and cultural leaders." items={executiveBrand} onProjectClick={setSelectedProject} cols={4} />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-48 md:mb-64" />
                {/* ── Digital Campaigns Section ── */}
                <section className="mb-48 md:mb-64">
                    <div className="mb-20 md:mb-32 max-w-4xl">
                        <Reveal mode="mask">
                            <h2 className="text-4xl md:text-7xl font-serif text-cream uppercase mb-8 leading-[0.9]">
                                Digital <i>Campaigns</i>
                            </h2>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="text-lg md:text-2xl text-cream/40 font-serif italic border-l-2 border-rose/30 pl-8 ml-1 leading-relaxed">
                                Strategic digital marketing and culture-first storytelling for streaming platforms and digital identity.
                            </p>
                        </Reveal>
                    </div>

                    <div className="space-y-48 md:space-y-64">
                        {/* Primary Campaigns */}
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                                {digitalCampaigns.map((p, i) => (
                                    <Reveal key={p.id} delay={(i % 4) * 60}>
                                        <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        {/* Copywriting Subsection */}
                        <div>
                            <Reveal>
                                <h3 className="text-xl md:text-2xl text-rose/50 uppercase tracking-[0.4em] font-sans mb-12 border-b border-white/5 pb-4">
                                    COPYWRITING
                                </h3>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                                {copywritingProjects.map((p, i) => (
                                    <Reveal key={p.id} delay={(i % 4) * 60}>
                                        <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-48 md:mb-64" />

                {/* ── International Events Section ── */}
                <section className="mb-48 md:mb-64">
                    <div className="mb-20 md:mb-32 max-w-4xl">
                        <Reveal mode="mask">
                            <h2 className="text-4xl md:text-7xl font-serif text-cream uppercase mb-8 leading-[0.9]">
                                Programming and <i>Producing</i> International <i>Events</i>
                            </h2>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="text-lg md:text-2xl text-cream/40 font-serif italic border-l-2 border-rose/30 pl-8 ml-1 leading-relaxed">
                                Curated luxury experiences and global summits at the intersection of culture and industry.
                            </p>
                        </Reveal>
                    </div>

                    <div className="space-y-48 md:space-y-64">
                        {/* Spike Lee Subsection */}
                        <div>
                            <Reveal>
                                <h3 className="text-xl md:text-2xl text-rose/50 uppercase tracking-[0.4em] font-sans mb-12 border-b border-white/5 pb-4">
                                    SPIKE LEE
                                </h3>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                                {spikeLeeProjects.map((p, i) => (
                                    <Reveal key={p.id} delay={(i % 4) * 60}>
                                        <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        {/* Blackat Subsection */}
                        <div>
                            <Reveal>
                                <h3 className="text-xl md:text-2xl text-rose/50 uppercase tracking-[0.4em] font-sans mb-16 border-b border-white/5 pb-4">
                                    the BLACKAT
                                </h3>
                            </Reveal>

                            <div className="space-y-32">
                                {/* 2023 Programming */}
                                <div>
                                    <Reveal>
                                        <h4 className="text-lg md:text-xl text-cream/40 uppercase tracking-[0.2em] font-serif italic mb-10">
                                            2023 Programming
                                        </h4>
                                    </Reveal>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                                        {blackat2023Projects.map((p, i) => (
                                            <Reveal key={p.id} delay={(i % 4) * 60}>
                                                <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                            </Reveal>
                                        ))}
                                    </div>
                                </div>

                                {/* 2025 Programming */}
                                <div className="pt-24 md:pt-32">
                                    <Reveal>
                                        <h4 className="text-lg md:text-xl text-cream/40 uppercase tracking-[0.2em] font-serif italic mb-10">
                                            2025 Programming
                                        </h4>
                                    </Reveal>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                                        {blackat2025Projects.map((p, i) => (
                                            <Reveal key={p.id} delay={(i % 4) * 60}>
                                                <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                            </Reveal>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* The Come Up Subsection */}
                        <div>
                            <Reveal>
                                <h3 className="text-xl md:text-2xl text-rose/50 uppercase tracking-[0.4em] font-sans mb-12 border-b border-white/5 pb-4">
                                    THE COME UP
                                </h3>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32 mb-32">
                                {comeUpProjects.map((p, i) => (
                                    <Reveal key={p.id} delay={(i % 4) * 60}>
                                        <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        {/* Kingdom Business Subsection */}
                        <div>
                            <Reveal>
                                <h3 className="text-xl md:text-2xl text-rose/50 uppercase tracking-[0.4em] font-sans mb-12 border-b border-white/5 pb-4">
                                    KINGDOM BUSINESS
                                </h3>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32 mb-32 md:mb-48">
                                {kingdomBusinessProjects.map((p, i) => (
                                    <Reveal key={p.id} delay={(i % 4) * 60}>
                                        <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <FooterCTA onBookClick={openModal} />
            <UtilityFooter />
            <Suspense fallback={null}>
                <DetailPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
            </Suspense>
        </div>
    );
}

