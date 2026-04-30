import React, { useState, useEffect, useRef } from 'react';
import { type Project } from '../../data/projects';
import { useModal } from '../../SharedComponents';

const WaveformBars = ({ isPlaying }: { isPlaying: boolean }) => {
    const bars = Array.from({ length: 28 });
    return (
        <div className="flex items-center gap-[3px] h-16">
            {bars.map((_, i) => (
                <div
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-rose to-burgundy/60"
                    style={{
                        height: isPlaying ? `${20 + Math.sin(i * 0.7) * 16 + 8}px` : '6px',
                        animation: isPlaying
                            ? `waveBar ${0.6 + (i % 5) * 0.12}s ease-in-out infinite alternate`
                            : 'none',
                        animationDelay: `${(i % 7) * 0.07}s`,
                        transition: 'height 0.4s ease',
                        opacity: isPlaying ? 1 : 0.3,
                    }}
                />
            ))}
        </div>
    );
};

export const RadioHero = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    const { openModal } = useModal();
    const [activeIdx, setActiveIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const spots = project.audioSpots!;

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Load new track whenever activeIdx changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.pause();
        audio.src = spots[activeIdx].src;
        audio.load();
        setProgress(0);
        setCurrentTime('0:00');
        if (isPlaying) audio.play().catch(() => { });
    }, [activeIdx]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => { });
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => {
            setIsPlaying(false);
            setProgress(0);
            if (activeIdx < spots.length - 1) setActiveIdx(i => i + 1);
        };
        const onTime = () => {
            if (!audio.duration) return;
            setProgress((audio.currentTime / audio.duration) * 100);
            setCurrentTime(formatTime(audio.currentTime));
        };
        const onLoaded = () => setDuration(formatTime(audio.duration));
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('timeupdate', onTime);
        audio.addEventListener('loadedmetadata', onLoaded);
        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('timeupdate', onTime);
            audio.removeEventListener('loadedmetadata', onLoaded);
        };
    }, [activeIdx, spots.length]);

    useEffect(() => {
        return () => { audioRef.current?.pause(); };
    }, []);

    const scrub = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        const val = parseFloat(e.target.value);
        audio.currentTime = (val / 100) * audio.duration;
        setProgress(val);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        setIsMuted(val === 0);
        if (audioRef.current) {
            audioRef.current.volume = val;
            audioRef.current.muted = val === 0;
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isMuted) {
            const restored = volume === 0 ? 0.8 : volume;
            audio.muted = false;
            audio.volume = restored;
            setVolume(restored);
            setIsMuted(false);
        } else {
            audio.muted = true;
            setIsMuted(true);
        }
    };

    // Sync initial volume to audio element
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, []);

    return (
        <div className="fixed inset-0 z-[200] bg-ink flex flex-col pointer-events-auto animate-slide-in-right">
            {/* Hidden audio element */}
            <audio ref={audioRef} src={spots[0].src} preload="metadata" />

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 flex items-center justify-center bg-cream/5 border border-cream/10 rounded-full text-cream/40 hover:bg-cream hover:text-ink transition-all duration-500 z-50 group"
            >
                <span className="text-xl group-hover:rotate-90 transition-transform duration-500">✕</span>
            </button>

            {/* Main layout */}
            <div className="flex flex-col lg:flex-row h-full">

                {/* ── LEFT: Player ── */}
                <div className="lg:w-[42%] flex flex-col items-center justify-center bg-[#0a0507] border-r border-white/5 p-10 md:p-16 relative overflow-hidden flex-shrink-0">
                    {/* Background glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose/10 blur-[100px] transition-all duration-1000 ${isPlaying ? 'opacity-100 scale-110' : 'opacity-30 scale-100'}`} />
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-burgundy/20 blur-[60px] transition-all duration-700 ${isPlaying ? 'opacity-100' : 'opacity-20'}`} />
                    </div>

                    {/* Poster/Logo */}
                    <div className="relative z-10 flex items-center justify-center mb-10">
                        <img
                            src={project.img}
                            alt={project.title}
                            className="h-48 md:h-64 w-auto object-contain rounded-lg shadow-2xl border border-white/5"
                        />
                    </div>

                    {/* Waveform */}
                    <div className="relative z-10 mb-10">
                        <WaveformBars isPlaying={isPlaying} />
                    </div>

                    {/* Play / Pause */}
                    <button
                        onClick={togglePlay}
                        className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 mb-8 group ${isPlaying
                            ? 'border-rose bg-rose/10 shadow-[0_0_40px_rgba(220,38,38,0.3)]'
                            : 'border-cream/20 bg-white/5 hover:border-rose/60 hover:bg-rose/10'
                            }`}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            /* Pause icon */
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-cream" aria-hidden="true">
                                <rect x="6" y="4" width="4" height="16" rx="1" />
                                <rect x="14" y="4" width="4" height="16" rx="1" />
                            </svg>
                        ) : (
                            /* Play icon */
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-cream ml-1" aria-hidden="true">
                                <path d="M8 5.14v14l11-7-11-7z" />
                            </svg>
                        )}
                    </button>

                    {/* Track name */}
                    <div className="relative z-10 text-center mb-6 px-4">
                        <p className="text-rose text-[0.55rem] tracking-[0.4em] uppercase mb-2">Now Playing</p>
                        <h3 className="text-cream font-serif text-xl md:text-2xl leading-tight">{spots[activeIdx].title}</h3>
                        <p className="text-cream/40 text-xs tracking-widest mt-1">{spots[activeIdx].credit}</p>
                    </div>

                    {/* Scrubber */}
                    <div className="relative z-10 w-full max-w-xs">
                        <input
                            type="range" min="0" max="100" step="0.1"
                            value={progress}
                            onChange={scrub}
                            className="radio-scrubber w-full"
                        />
                        <div className="flex justify-between text-cream/30 text-[0.6rem] mt-1 font-mono">
                            <span>{currentTime}</span>
                            <span>{duration}</span>
                        </div>
                    </div>

                    {/* Volume Control */}
                    <div className="relative z-10 w-full max-w-xs mt-6">
                        <div className="flex items-center gap-3">
                            {/* Mute toggle */}
                            <button
                                onClick={toggleMute}
                                className="flex-shrink-0 text-cream/40 hover:text-cream transition-colors duration-200 outline-none"
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMuted || volume === 0 ? (
                                    /* Muted speaker */
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </svg>
                                ) : volume < 0.5 ? (
                                    /* Low volume */
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                ) : (
                                    /* Full volume */
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                )}
                            </button>

                            {/* Volume slider */}
                            <input
                                type="range" min="0" max="1" step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="radio-scrubber flex-1"
                                aria-label="Volume"
                            />

                            {/* Percentage */}
                            <span className="text-cream/25 text-[0.55rem] font-mono w-8 text-right flex-shrink-0">
                                {isMuted ? '0' : Math.round(volume * 100)}%
                            </span>
                        </div>
                    </div>

                    {/* Label */}
                    <div className="relative z-10 mt-8 border-t border-white/5 pt-6 text-center">
                        <p className="text-[0.55rem] tracking-[0.5em] uppercase text-cream/20">Radio Spots for FM Radio</p>
                        <p className="text-[0.55rem] tracking-[0.3em] text-cream/15 mt-1">by Copywriter: Kelsey Matthews</p>
                    </div>
                </div>

                {/* ── RIGHT: Track List + Project Info ── */}
                <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">

                    {/* Track list header */}
                    <div className="px-10 md:px-16 pt-16 pb-6 border-b border-white/5">
                        <p className="text-rose/50 text-[0.55rem] tracking-[0.5em] uppercase mb-2">Copywriting · {project.year}</p>
                        <h2 className="text-4xl md:text-6xl font-serif text-cream uppercase leading-[0.9] tracking-tighter">{project.title}</h2>
                        <p className="text-cream/40 font-serif italic text-base md:text-lg mt-3">{project.client}</p>
                    </div>

                    {/* Tracks */}
                    <div className="px-10 md:px-16 py-6 border-b border-white/5">
                        <p className="text-rose/50 text-[0.55rem] tracking-[0.4em] uppercase mb-4">Spots</p>
                        <ul className="space-y-1">
                            {spots.map((spot, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => { setActiveIdx(i); if (!isPlaying) setTimeout(() => audioRef.current?.play().catch(() => { }), 80); }}
                                        className={`w-full text-left group flex items-center justify-between px-4 py-4 rounded-sm transition-all duration-300 ${activeIdx === i
                                            ? 'bg-rose/10 border border-rose/20'
                                            : 'hover:bg-white/5 border border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-center gap-5 min-w-0">
                                            {/* Track number / playing indicator */}
                                            <span className={`text-[0.65rem] font-mono w-5 text-center flex-shrink-0 ${activeIdx === i ? 'text-rose' : 'text-cream/25 group-hover:text-cream/50'
                                                }`}>
                                                {activeIdx === i && isPlaying ? (
                                                    <span className="inline-flex gap-[2px] items-end h-3">
                                                        <span className="w-[2px] bg-rose rounded-full animate-[waveBar_0.5s_ease_infinite_alternate]" style={{ height: '6px' }} />
                                                        <span className="w-[2px] bg-rose rounded-full animate-[waveBar_0.7s_ease_infinite_alternate]" style={{ height: '10px', animationDelay: '0.1s' }} />
                                                        <span className="w-[2px] bg-rose rounded-full animate-[waveBar_0.4s_ease_infinite_alternate]" style={{ height: '7px', animationDelay: '0.2s' }} />
                                                    </span>
                                                ) : String(i + 1).padStart(2, '0')}
                                            </span>
                                            <div className="min-w-0">
                                                <p className={`text-sm md:text-base truncate transition-colors ${activeIdx === i ? 'text-cream' : 'text-cream/60 group-hover:text-cream/90'
                                                    }`}>{spot.title}</p>
                                                <p className="text-cream/25 text-[0.65rem] tracking-wider mt-0.5">{spot.credit}</p>
                                            </div>
                                        </div>
                                        <span className={`text-xs font-mono flex-shrink-0 ml-4 ${activeIdx === i ? 'text-rose' : 'text-cream/30'
                                            }`}>{spot.duration}</span>
                                    </button>
                                    {i < spots.length - 1 && <div className="h-px bg-white/5 mx-4" />}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Project narrative */}
                    <div className="px-10 md:px-16 py-10 border-b border-white/5 space-y-10">
                        <div>
                            <p className="text-rose/50 text-[0.55rem] tracking-[0.4em] uppercase mb-4">The Work</p>
                            <p className="text-cream/70 font-serif italic text-lg md:text-2xl leading-relaxed">{project.description}</p>
                        </div>
                        {project.themeDescription && (
                            <div>
                                <p className="text-rose/50 text-[0.55rem] tracking-[0.4em] uppercase mb-4">{project.themeLabel}</p>
                                <p className="text-cream/50 font-serif italic text-base md:text-lg leading-relaxed border-l-2 border-burgundy/30 pl-5">{project.themeDescription}</p>
                            </div>
                        )}
                    </div>

                    {/* Deliverables */}
                    {project.deliverables && project.deliverables.length > 0 && (
                        <div className="px-10 md:px-16 py-10 border-b border-white/5">
                            <p className="text-rose/50 text-[0.55rem] tracking-[0.4em] uppercase mb-6">Key Deliverables</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                {project.deliverables.map((d, i) => (
                                    <li key={i} className="flex items-center gap-4 text-cream font-sans text-sm group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-burgundy/40 group-hover:bg-rose transition-colors flex-shrink-0" />
                                        <span className="opacity-60 group-hover:opacity-100 transition-opacity">{d}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="px-10 md:px-16 py-16 flex items-center justify-center">
                        <button
                            onClick={() => { onClose(); openModal(); }}
                            className="inline-flex items-center gap-6 border border-rose/30 px-10 py-5 text-rose hover:bg-rose hover:text-ink transition-all duration-700 text-[0.65rem] tracking-[0.5em] uppercase font-sans group"
                        >
                            Start A Project
                            <span className="text-xl group-hover:translate-x-3 transition-transform duration-500">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
