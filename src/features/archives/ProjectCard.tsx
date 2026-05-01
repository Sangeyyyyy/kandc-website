import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { type Project } from '../../data/projects';

export const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { amount: 0.1 });

    return (
        <div 
            ref={cardRef}
            className="group cursor-pointer relative hover:z-50" 
            onClick={onClick}
        >

            {/* ── Card Image (clean, no labels) ── */}
            <div className="aspect-[4/5] relative overflow-visible">
                <div className="w-full h-full overflow-hidden relative rounded-sm bg-burgundy/5 border border-rose/5 transition-colors">
                    {project.img ? (
                        <img
                            src={project.img}
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full transition-all duration-[1500ms] ease-out object-cover"
                        />
                    ) : project.video ? (
                        <video
                            src={isInView ? project.video : undefined}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                            <span className="text-[0.45rem] tracking-[0.4em] uppercase text-cream/10">Coming Soon</span>
                        </div>
                    )}
                </div>

                {/* Subtle tint — fades on hover */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-burgundy/20 transition-opacity duration-500 group-hover:opacity-0" />
            </div>

            {/* ── Hover Metadata Strip (below card, hidden until hover on desktop) ── */}
            <div className="overflow-hidden">
                <div className="translate-y-0 md:translate-y-3 opacity-70 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pt-4">
                    <div className="w-0 group-hover:w-full h-px bg-rose/15 transition-all duration-700 ease-out mb-3" />
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-[0.65rem] tracking-[0.4em] uppercase font-sans text-cream/30 shrink-0">
                            {String(project.id).padStart(2, '0')}
                        </span>
                        <h5 className="text-[0.9rem] md:text-[1rem] tracking-[0.2em] uppercase font-sans text-cream/70 flex-1">
                            {project.title}
                        </h5>
                        <span className="text-rose/80 text-lg shrink-0">→</span>
                    </div>
                </div>
            </div>

        </div>
    );
};
