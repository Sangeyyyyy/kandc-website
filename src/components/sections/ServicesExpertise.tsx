import React from 'react';
import { Reveal } from '../ui/Reveal';
import { Share2, Layout, Mic2, Megaphone, Zap, Users } from 'lucide-react';

export const ServicesExpertise = () => {
    const expertise = [
        {
            id: '01',
            title: 'Experiential Activations',
            icon: <Megaphone size={24} strokeWidth={1.5} />,
            services: [
                'Integrated Marketing',
                'Movie Premieres',
                'Live Experience Strategy',
                'Multi-Market Integration'
            ]
        },
        {
            id: '02',
            title: 'Event Producing',
            icon: <Mic2 size={24} strokeWidth={1.5} />,
            services: [
                'Logistical Planning',
                'Strategic Programming',
                'Hospitality & Staffing',
                'Elite Execution'
            ]
        },
        {
            id: '03',
            title: 'Brand Partnerships',
            icon: <Share2 size={24} strokeWidth={1.5} />,
            services: [
                'Strategic Alliances',
                'Cultural Alignment',
                'Relationship Management',
                'Mutual Growth Strategy'
            ]
        },
        {
            id: '04',
            title: 'Executive Management',
            icon: <Users size={24} strokeWidth={1.5} />,
            services: [
                'Senior Brand Management',
                'High-Stakes Bookings',
                'Multi-Platform Dev',
                'Authority Elevation'
            ]
        },
        {
            id: '05',
            title: 'Digital Marketing',
            icon: <Zap size={24} strokeWidth={1.5} />,
            services: [
                'Data-Driven Strategy',
                'Engagement Growth',
                'Digital Innovation',
                'Social Amplification'
            ]
        },
        {
            id: '06',
            title: 'Film Production',
            icon: <Layout size={24} strokeWidth={1.5} />,
            services: [
                'Cinematic Narratives',
                'High-End Content',
                'Visual Asset Creation',
                'Purposeful Storytelling'
            ]
        }
    ];

    return (
        <section id="services" className="bg-cream py-24 md:py-32 overflow-hidden relative min-h-screen flex items-start border-y border-burgundy/5">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <div className="container mx-auto px-8 max-w-[1600px] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-20 items-start">
                    
                    {/* Left Side: Title */}
                    <div className="lg:col-span-1 lg:sticky lg:top-24">
                        <Reveal>
                            <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif text-ink leading-[0.85] tracking-tighter mb-8">
                                Our<br />Expertise.
                            </h2>
                            <p className="text-ink/80 text-base md:text-lg font-normal leading-relaxed">
                                A high-stakes intersection of culture and commerce, delivering senior-led strategies for global icons.
                            </p>
                        </Reveal>
                    </div>

                    {/* Right Side: Services Grid (3 Columns, 2 Rows) */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 lg:gap-y-24">
                            {expertise.map((item, i) => (
                                <Reveal key={i} delay={i * 100}>
                                    <div className="group relative pt-12 border-t border-burgundy/20">
                                        {/* Icon Circle */}
                                        <div className="absolute -top-6 left-0 w-12 h-12 rounded-full border border-burgundy/30 flex items-center justify-center text-burgundy/60 group-hover:bg-ink group-hover:text-cream transition-all duration-500">
                                            {React.cloneElement(item.icon as React.ReactElement, { size: 22 })}
                                        </div>
                                        
                                        <h3 className="text-2xl md:text-3xl font-serif text-ink mb-8 group-hover:translate-x-2 transition-transform duration-500">
                                            {item.title}
                                        </h3>
                                        
                                        <ul className="space-y-5">
                                            {item.services.map((service, idx) => (
                                                <li key={idx} className="text-ink/85 font-normal text-base hover:text-burgundy transition-colors duration-300 flex items-center gap-4">
                                                    <div className="w-2 h-2 rounded-full bg-burgundy/20 group-hover:bg-burgundy/40 transition-colors shrink-0" />
                                                    {service}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
