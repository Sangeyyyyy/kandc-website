import React, { useState } from 'react';
import { type Award } from '../../data/projects';
import { Reveal } from '../../SharedComponents';
import { StatCounter } from './StatCounter';
import { FloatingAwardIcon } from './AwardIcons';
import { GoldDust } from './GoldDust';

export const AwardCard = ({ award, i }: { award: Award; i: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    const tierStyles = {
        gold: 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-yellow-900/5',
        silver: 'border-slate-400/50 shadow-[0_0_20px_rgba(148,163,184,0.1)] bg-slate-900/5',
        bronze: 'border-orange-700/50 shadow-[0_0_20px_rgba(194,120,57,0.1)] bg-orange-900/5',
        standard: 'border-white/10 transition-colors hover:border-white/30 bg-white/5'
    }[award.tier || 'standard'];

    return (
        <Reveal key={i} delay={i * 100}>
            <div
                className={`group border-l-2 p-10 backdrop-blur-sm rounded-r-lg flex flex-col justify-between min-h-[380px] relative overflow-hidden transition-all duration-700 ${tierStyles}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Suggestion: Gold Dust Burst */}
                <GoldDust active={isHovered} />

                {/* Suggestion: Expansion Spotlight Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-yellow-500/10 blur-[60px] transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:scale-150 z-0 pointer-events-none`} />

                <div className="space-y-10 relative z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex items-end gap-5">
                            <span className="text-6xl md:text-8xl font-serif text-cream font-light leading-none">
                                <StatCounter to={award.count} />
                            </span>
                            <span className="text-cream/40 text-xs md:text-sm tracking-[0.4em] uppercase mb-4">
                                {award.count === 1 ? 'Win' : 'Wins'}
                            </span>
                        </div>

                        {/* Suggestion: Floating 3D PNG Icon */}
                        <FloatingAwardIcon
                            type={award.group}
                        />
                    </div>

                    <div className="space-y-5">
                        <h5 className="text-cream text-3xl md:text-4xl font-sans font-medium tracking-tight uppercase group-hover:text-rose transition-colors leading-tight">
                            {award.group}
                        </h5>
                        {award.nominations && (
                            <p className="text-white/40 text-sm md:text-base tracking-[0.25em] uppercase font-sans font-light">
                                {award.nominations} Total Nominations
                            </p>
                        )}
                    </div>
                </div>

                {award.note && (
                    <p className="text-cream/70 font-serif italic text-lg md:text-xl leading-relaxed pt-10 border-t border-white/10 mt-10 relative z-10">
                        {award.note}
                    </p>
                )}
            </div>
        </Reveal>
    );
};
