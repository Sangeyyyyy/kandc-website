import { useState, useEffect, useRef } from 'react';
import {
    Reveal,
    TopNav,
    useModal,
    useMagnetic,
    FooterCTA,
    UtilityFooter,
    ScrollProgressBar
} from './SharedComponents';
import { RoadmapSection } from './RoadmapSection';
import { Volume2, VolumeX, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './index.css';

import { projects, type Project, type Award } from './data/projects';



const StatCounter = ({ to, duration = 1.5 }: { to: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const [hasRun, setHasRun] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasRun) {
                    setHasRun(true);
                    let start = 0;
                    const end = to;
                    if (start === end) return;

                    const incrementTime = (duration * 1000) / end;
                    const timer = setInterval(() => {
                        start += 1;
                        setCount(start);
                        if (start >= end) clearInterval(timer);
                    }, incrementTime);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, [to, duration, hasRun]);

    return <span ref={elementRef}>{count}</span>;
};

const GoldDust = ({ active }: { active: boolean }) => {
    const particles = Array.from({ length: 15 });
    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
            <AnimatePresence>
                {active && particles.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: 0,
                            y: 0,
                            scale: 0,
                            opacity: 1
                        }}
                        animate={{
                            x: (Math.random() - 0.5) * 300,
                            y: (Math.random() - 0.5) * 300,
                            scale: Math.random() * 1.5,
                            opacity: 0,
                            rotate: Math.random() * 360
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.8 + Math.random() * 0.4,
                            ease: "easeOut"
                        }}
                        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#fbbf24] mix-blend-screen"
                        style={{
                            filter: `blur(${Math.random() * 2}px)`
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const AwardIcon = ({ type, className = "" }: { type: string; className?: string }) => {
    const t = type.toLowerCase();

    // Gradient definitions are handled in index.css or inline
    const goldGradient = "url(#gold-gradient)";

    if (t.includes('academy') || t.includes('oscar')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className}>
                <defs>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDB931" />
                        <stop offset="50%" stopColor="#9E7E38" />
                        <stop offset="100%" stopColor="#FDB931" />
                    </linearGradient>
                </defs>
                <path d="M12 2L9 7H15L12 2Z" fill={goldGradient} />
                <path d="M10 7H14V17H10V7Z" fill={goldGradient} />
                <path d="M8 17H16V19H8V17Z" fill={goldGradient} />
                <path d="M7 19H17V21H7V19Z" fill={goldGradient} />
                <path d="M12 4.5L10.5 7H13.5L12 4.5Z" fill="#FFF" fillOpacity="0.3" />
            </svg>
        );
    }

    if (t.includes('bafta')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className}>
                <path d="M12 2C7.58 2 4 5.58 4 10C4 13.5 6.25 16.5 9.38 17.61L10.5 21H13.5L14.62 17.61C17.75 16.5 20 13.5 20 10C20 5.58 16.42 2 12 2ZM12 16C8.69 16 6 13.31 6 10C6 6.69 8.69 4 12 4C15.31 4 18 6.69 18 10C18 13.31 15.31 16 12 16Z" fill="url(#gold-gradient)" />
                <circle cx="9" cy="9" r="1.5" fill="url(#gold-gradient)" />
                <circle cx="15" cy="9" r="1.5" fill="url(#gold-gradient)" />
                <path d="M9 13C9 13 10.5 14.5 12 14.5C13.5 14.5 15 13 15 13" stroke="url(#gold-gradient)" strokeWidth="1" strokeLinecap="round" />
            </svg>
        );
    }

    if (t.includes('grammy')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className}>
                <path d="M5 19H19V21H5V19Z" fill="url(#gold-gradient)" />
                <path d="M7 17H17V19H7V17Z" fill="url(#gold-gradient)" />
                <path d="M12 17C10.5 17 8 16 8 13V11C8 9.34 9.34 8 11 8H13V17H12Z" fill="url(#gold-gradient)" />
                <path d="M13 3L13 11H17C18.66 11 20 12.34 20 14V17H13V3Z" fill="url(#gold-gradient)" />
                <circle cx="11.5" cy="11.5" r="2.5" stroke="url(#gold-gradient)" strokeWidth="1" />
            </svg>
        );
    }

    if (t.includes('critics')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className}>
                <path d="M12 2L14.5 8.5L21.5 9.5L16.5 14.5L17.5 21.5L12 18L6.5 21.5L7.5 14.5L2.5 9.5L9.5 8.5L12 2Z" fill="url(#gold-gradient)" />
                <path d="M11 18H13V22H11V18Z" fill="url(#gold-gradient)" opacity="0.5" />
            </svg>
        );
    }

    if (t.includes('globe')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className}>
                <circle cx="12" cy="8" r="6" fill="url(#gold-gradient)" />
                <path d="M12 2V14M6 8H18" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" />
                <path d="M10 14H14V20H10V14Z" fill="url(#gold-gradient)" />
                <path d="M8 20H16V22H8V20Z" fill="url(#gold-gradient)" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M12 2L15 8H21L16 12L18 18L12 14L6 18L8 12L3 8H9L12 2Z" fill="url(#gold-gradient)" />
        </svg>
    );
};

const FloatingAwardIcon = ({ type }: { type: string }) => {
    return (
        <motion.div
            animate={{
                y: [0, -10, 0],
                rotateZ: [-1, 1, -1]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="relative z-30 drop-shadow-[0_20px_40px_rgba(253,185,49,0.2)]"
        >
            <AwardIcon type={type} className="h-28 md:h-36 w-auto" />
        </motion.div>
    );
};

const AwardCard = ({ award, i }: { award: Award; i: number }) => {
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

// ─── RADIO PLAYER ────────────────────────────────────────────────────────────
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

const RadioHero = ({ project, onClose }: { project: Project; onClose: () => void }) => {
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

                    {/* Logos */}
                    <div className="relative z-10 flex items-center justify-center gap-6 mb-10">
                        <img
                            src={project.img}
                            alt="BP x Dairy Queen"
                            className="h-28 md:h-36 w-auto object-contain brightness-0 invert opacity-80"
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
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-cream">
                                <rect x="6" y="4" width="4" height="16" rx="1" />
                                <rect x="14" y="4" width="4" height="16" rx="1" />
                            </svg>
                        ) : (
                            /* Play icon */
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-cream ml-1">
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
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </svg>
                                ) : volume < 0.5 ? (
                                    /* Low volume */
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                ) : (
                                    /* Full volume */
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                    {project.deliverables.length > 0 && (
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

const DetailPanel = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
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
        return <RadioHero project={project} onClose={onClose} />;
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
                                const row1 = project.partnerLogos.filter((l: any) => l.size !== 'full');
                                const row2 = project.partnerLogos.filter((l: any) => l.size === 'full');
                                const filterClass = (mode: string) => {
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
                                                {row1.map((logo: any, i: number) => {
                                                    const src = logo.src || logo;
                                                    const mode = logo.mode || 'monochrome';
                                                    const size = logo.size || 'wide';
                                                    const scale = logo.scale || 1;
                                                    const sizeClass = size === 'icon' ? 'h-14 md:h-16 w-auto' :
                                                        size === 'square' ? 'h-12 md:h-14 w-auto max-w-[100px]' :
                                                            'h-9 md:h-11 w-auto max-w-[180px] md:max-w-[240px]';
                                                    return (
                                                        <div key={i} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
                                                            <img src={src} alt={logo.alt || 'Partner'} className={`object-contain ${sizeClass} ${filterClass(mode)}`} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {row2.length > 0 && (
                                                <div className="flex flex-row flex-wrap items-center gap-x-12 gap-y-8 border-t border-white/5 pt-8">
                                                    {row2.map((logo: any, i: number) => (
                                                        <div key={i} style={{ transform: `scale(${logo.scale || 1})`, transformOrigin: 'left center' }}>
                                                            <img src={logo.src || logo} alt={logo.alt || 'Partner'} className={`h-7 md:h-9 w-auto object-contain object-left ${filterClass(logo.mode || 'monochrome')}`} />
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
                    <RoadmapSection steps={project.roadmap} scrollRef={scrollRef} />
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
            <DetailPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
}

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { amount: 0.1 });

    return (
        <div 
            ref={cardRef}
            className={`group cursor-pointer relative hover:z-50 ${index % 2 === 1 ? 'md:mt-24' : ''}`} 
            onClick={onClick}
        >

            {/* ── Card Image (clean, no labels) ── */}
            <div className="aspect-[4/5] relative overflow-visible">
                <div className="w-full h-full overflow-hidden relative rounded-sm bg-burgundy/5 border border-rose/5 transition-colors">
                    {project.img ? (
                        <img
                            src={project.img}
                            alt={project.title}
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

const ProjectSection = ({ title, description, items, onProjectClick, cols = 3 }: { title: string; description: string; items: Project[]; onProjectClick: (p: Project) => void; cols?: number }) => (
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
