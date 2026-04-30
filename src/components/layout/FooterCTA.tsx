import React from 'react';
import { Link } from 'react-router-dom';
import { useMagnetic } from '../../hooks/useMagnetic';
import { Reveal } from '../ui/Reveal';

export const FooterCTA = ({ onBookClick }: { onBookClick: () => void }) => {
    const magneticBook = useMagnetic(30);
    const magneticWork = useMagnetic(30);

    return (
        <footer id="contact" className="py-24 md:py-40 text-center bg-ink relative overflow-hidden shadow-ember-intense border-t border-rose/5">
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(96,33,58,0.25)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose/20 to-transparent" />
            <Reveal className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
                <h2 className="text-4xl md:text-8xl mb-6 md:mb-8 font-serif tracking-[0.1em] text-cream uppercase">
                    Kelsey <span className="font-light italic text-rose/60">&</span> Company
                </h2>
                <p className="font-serif italic text-rose/60 text-xl md:text-2xl mb-12">Where Culture Meets Commerce.</p>
                <p className="caps-detail !text-rose/60 mb-16 mx-auto">Building Bridges · Driving Impact</p>
                <div className="flex flex-col items-center gap-8">
                    <div ref={magneticBook} className="magnetic-button">
                        <button
                            onClick={onBookClick}
                            className="bg-cream text-burgundy border-none py-5 px-12 font-sans font-semibold tracking-widest uppercase hover:bg-rose hover:text-burgundy transition-colors text-sm"
                        >
                            Book Consultation
                        </button>
                    </div>
                    <div ref={magneticWork} className="magnetic-button">
                        <Link
                            to="/our-work"
                            className="inline-block border border-rose/30 px-10 py-5 text-[0.6rem] tracking-[0.4em] uppercase font-sans text-rose hover:bg-rose hover:text-burgundy transition-all duration-500 rounded-sm"
                        >
                            View Our Work
                        </Link>
                    </div>
                </div>
            </Reveal>
        </footer>
    );
};
