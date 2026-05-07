import React from 'react';
import { Reveal } from '../ui/Reveal';
import { Target, Heart, Zap, ShieldCheck } from 'lucide-react';

export const WhyKelseyCompany = ({ forceLight = false }: { forceLight?: boolean }) => {
    const ethos = [
        {
            num: '01',
            label: 'Relationships Come First',
            sub: 'With clients, partners, and communities. We build on a foundation of mutual respect and long-term vision.',
            icon: <Heart size={64} strokeWidth={0.5} />,
            bg: 'bg-[#f5f1ed]', // Cream
            darkText: true
        },
        {
            num: '02',
            label: 'Strategy & Creativity',
            sub: 'Impact requires both vision and precision. We bridge the gap between bold ideas and measurable results.',
            icon: <Target size={64} strokeWidth={0.5} />,
            bg: 'bg-[#eec0bf]/20', // Rose tint
            darkText: false
        },
        {
            num: '03',
            label: 'Culture Drives Connection',
            sub: 'We build bridges to what matters most by staying at the heart of the cultural conversation.',
            icon: <Zap size={64} strokeWidth={0.5} />,
            bg: 'bg-[#60213a]/10', // Burgundy tint
            darkText: false
        },
        {
            num: '04',
            label: 'Consistency Builds Trust',
            sub: 'Every touchpoint is an opportunity for excellence. We maintain a standard that speaks for itself.',
            icon: <ShieldCheck size={64} strokeWidth={0.5} />,
            bg: 'bg-[#8d8076]/20', // Taupe tint
            darkText: false
        }
    ];

    return (
        <section className={`${forceLight ? 'bg-cream' : 'bg-ink'} py-24 md:py-40 relative overflow-hidden transition-colors duration-1000`}>
            <div className="container mx-auto px-8 max-w-7xl relative z-10">
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 md:mb-32">
                    <Reveal>
                        <h2 className={`text-5xl md:text-8xl font-serif tracking-tighter uppercase leading-[0.9] ${forceLight ? 'text-ink' : 'text-cream'}`}>
                            Why Choose<br />Us?
                        </h2>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className={`text-lg md:text-xl font-light leading-relaxed max-w-xl ${forceLight ? 'text-ink/60' : 'text-rose/50'}`}>
                            We are committed to offering the highest standards of strategic excellence and a touch of exclusivity that meets the unique desires of each client. Our senior-led approach ensures that every project feels truly valued and well-cared for—whether perfecting a brand's visual identity or orchestrating a large-scale cultural campaign.
                        </p>
                    </Reveal>
                </div>

                {/* Ethos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ethos.map((item, i) => {
                        const isDarkText = item.darkText || forceLight;
                        return (
                            <Reveal key={i} delay={i * 100}>
                                <div className={`${item.bg} min-h-[400px] md:min-h-[480px] flex flex-col items-center justify-center p-10 md:p-12 text-center group hover:scale-[1.02] transition-all duration-700 cursor-default relative overflow-hidden rounded-sm shadow-sm`}>
                                    {/* Minimalist Icon */}
                                    <div className={`mb-10 transition-all duration-700 group-hover:-translate-y-4 ${isDarkText ? 'text-ink/60' : 'text-rose/30'}`}>
                                        {item.icon}
                                    </div>
                                    
                                    <div className="mt-4">
                                        <h3 className={`text-sm md:text-base tracking-[0.5em] uppercase font-sans mb-4 transition-colors duration-500 ${isDarkText ? 'text-ink' : 'text-cream/80'}`}>
                                            {item.label}
                                        </h3>
                                        <p className={`text-[0.65rem] md:text-[0.7rem] leading-relaxed uppercase tracking-[0.2em] max-w-[200px] mx-auto transition-opacity duration-700 ${isDarkText ? 'text-ink/60' : 'text-rose/50'} opacity-0 group-hover:opacity-100`}>
                                            {item.sub}
                                        </p>
                                    </div>

                                    {/* Corner Accents */}
                                    <div className={`absolute top-0 right-0 w-10 h-10 border-t border-r ${isDarkText ? 'border-ink/10' : 'border-rose/10'}`}></div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>

            {/* Subtle background element */}
            {!forceLight && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(96,33,58,0.03)_0%,_transparent_70%)] pointer-events-none" />
            )}
        </section>
    );
};

