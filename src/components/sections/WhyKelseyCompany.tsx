import React, { useRef, useState } from 'react';
import { getAssetUrl } from '../../utils/assets';
import { Reveal } from '../ui/Reveal';
import { ScrollIndicator } from '../ui/ScrollComponents';

export const WhyKelseyCompany = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!trackRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - trackRef.current.offsetLeft);
        setScrollLeft(trackRef.current.scrollLeft);
    };
    const onMouseLeave = () => setIsDragging(false);
    const onMouseUp = () => setIsDragging(false);
    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !trackRef.current) return;
        e.preventDefault();
        const x = e.pageX - trackRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        trackRef.current.scrollLeft = scrollLeft - walk;
    };

    const beliefs = [
        {
            num: '01',
            label: 'Relationships Come First',
            sub: 'With clients, partners, and communities. We build on a foundation of mutual respect and long-term vision.',
            img: getAssetUrl('spike_lee_fireside_chat_1')
        },
        {
            num: '02',
            label: 'Strategy & Creativity',
            sub: 'Impact requires both vision and precision. We bridge the gap between bold ideas and measurable results.',
            img: getAssetUrl('braze_1')
        },
        {
            num: '03',
            label: 'Culture Drives Connection',
            sub: 'We build bridges to what matters most by staying at the heart of the cultural conversation.',
            img: getAssetUrl('sneakerball_1')
        },
        {
            num: '04',
            label: 'Consistency Builds Trust',
            sub: 'Every touchpoint is an opportunity for excellence. We maintain a standard that speaks for itself.',
            img: getAssetUrl('thought_leadership_brunch_1')
        }
    ];

    return (
        <section className="bg-ink text-cream py-20 md:py-32 overflow-hidden relative border-t border-rose/5">
            <div className="container mx-auto px-6 md:px-8 mb-16 md:mb-20 max-w-7xl">
                <Reveal className="text-center">
                    <p className="caps-detail !text-rose/40 mb-4">The Ethos</p>
                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif tracking-tighter uppercase mb-6 md:mb-8">
                        Why Kelsey <i className="font-light italic text-rose/60">&</i> Company.
                    </h2>
                    <p className="max-w-xl mx-auto text-rose/60 font-serif italic text-lg md:text-xl">
                        The principles that guide every decision we make and every connection we build.
                    </p>
                </Reveal>
            </div>

            <div 
                ref={trackRef}
                className={`flex overflow-x-auto border-y border-rose/5 transition-[scroll-behavior] duration-300 ${isDragging ? 'scroll-auto' : 'snap-x snap-mandatory scroll-smooth'}`}
                style={{ scrollbarWidth: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                {beliefs.map((belief, i) => (
                    <div key={i} className="flex-none w-[85vw] md:w-[480px] h-[500px] md:h-[600px] snap-start relative overflow-hidden border-r border-rose/5 group select-none">
                        <img
                            src={belief.img}
                            alt={belief.label}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-105 pointer-events-none"
                            draggable="false"
                        />
                        <span className="absolute top-8 left-10 font-serif text-[6rem] md:text-[8rem] font-light text-rose/10 group-hover:text-rose/20 leading-none pointer-events-none transition-colors duration-700">
                            {belief.num}
                        </span>
                        
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent pointer-events-none">
                            <span className="text-[0.55rem] tracking-[0.4em] uppercase text-rose/40 mb-5">The Ethos · {belief.num}</span>
                            <h3 className="font-serif text-3xl md:text-[2.2rem] font-light mb-4 leading-[1.1] text-cream">
                                {belief.label}
                            </h3>
                            <div className="w-10 group-hover:w-[90px] h-px bg-rose/20 mb-5 transition-all duration-700"></div>
                            <p className="text-[0.85rem] text-rose/55 leading-[1.7] max-w-[340px]">
                                {belief.sub}
                            </p>
                        </div>
                    </div>
                ))}
                
                {/* Closing Card */}
                <div className="flex-none w-[85vw] md:w-[480px] h-[500px] md:h-[600px] snap-start bg-burgundy/10 flex flex-col justify-center items-center md:items-start p-12 select-none text-center md:text-left transition-colors duration-700">
                    <p className="font-serif text-[2.5rem] md:text-[3rem] font-light italic text-rose/80 leading-[1.3] pointer-events-none">
                        "Where Culture<br/>Meets Commerce."
                    </p>
                    <div className="w-10 h-px bg-rose/30 mt-10 mb-5 pointer-events-none"></div>
                    <span className="text-[0.55rem] tracking-[0.4em] uppercase text-rose/70 pointer-events-none">Kelsey & Company · Est. 2018</span>
                </div>
                {/* Spacer for right margin on scroll */}
                <div className="flex-none w-[15vw] md:w-[5vw]"></div>
            </div>
            
            <ScrollIndicator className="pt-10" />

            {/* Custom scrollbar hiding specifically for webkit within track */}
            <style dangerouslySetInnerHTML={{__html: `
                .snap-x::-webkit-scrollbar,
                .scroll-auto::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </section>
    );
};
