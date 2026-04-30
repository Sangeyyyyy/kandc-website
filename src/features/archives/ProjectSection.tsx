import { Reveal } from '../../SharedComponents';
import { type Project } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

export const ProjectSection = ({ title, description, items, onProjectClick, cols = 3 }: { title: string; description: string; items: Project[]; onProjectClick: (p: Project) => void; cols?: number }) => (
    <section className="mb-48 md:mb-64">
        <div className="mb-20 md:mb-32 max-w-4xl">
            <Reveal mode="mask"><h2 className="text-4xl md:text-7xl font-serif text-cream uppercase mb-8 leading-[0.9]">{title.split(' ').map((word, idx) => (<span key={idx}>{idx % 2 === 1 ? <i className="font-light italic text-rose/60">{word}</i> : word}{' '}</span>))}</h2></Reveal>
            <Reveal delay={200}><p className="text-lg md:text-2xl text-cream/40 font-serif italic border-l-2 border-rose/30 pl-8 ml-1 leading-relaxed">{description}</p></Reveal>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-x-12 gap-y-32`}>
            {items.map((project, i) => (
                <Reveal key={project.id} delay={(i % cols) * 60}>
                    <ProjectCard project={project} index={i} onClick={() => onProjectClick(project)} />
                </Reveal>
            ))}
        </div>
    </section>
);
