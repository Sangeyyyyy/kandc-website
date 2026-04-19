import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useScroll } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import React, { createContext, useContext } from 'react';
import { CustomCursor } from './CustomCursor';

// ─── CONTEXT: MODAL STATE ────────────────────────────────────────────────────
interface ModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error('useModal must be used within a ModalProvider');
    return context;
};

// ─── HOOK: INTERSECTION OBSERVER ─────────────────────────────────────────────
export const useInView = (threshold = 0.12) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
            { threshold }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);
    return [ref, visible] as const;
};

// ─── HOOK: MAGNETIC EFFECT ──────────────────────────────────────────────────
export const useMagnetic = (strength = 40) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
        
        const el = ref.current;
        if (!el) return;
        const onMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;
            el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
        };
        const onMouseLeave = () => { el.style.transform = ''; };
        el.addEventListener('mousemove', onMouseMove);
        el.addEventListener('mouseleave', onMouseLeave);
        return () => {
            el.removeEventListener('mousemove', onMouseMove);
            el.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [strength]);
    return ref;
};

// ─── MAGNETIC WRAPPER ────────────────────────────────────────────────────────
export const MagneticWrapper = ({ children, className = '', strength = 40 }: { children: React.ReactNode, className?: string, strength?: number }) => {
    const ref = useMagnetic(strength);
    return <div ref={ref} className={`magnetic-button inline-block ${className}`}>{children}</div>;
};

// ─── SECTION BLENDER (Cinematic Fading) ───────────────────────────────────────
export const SectionBlender = ({ position = 'bottom', className = '', intensity = 'h-64' }: { position?: 'top' | 'bottom', className?: string, intensity?: string }) => {
    return (
        <div className={`absolute inset-x-0 ${position === 'top' ? 'top-0 bg-gradient-to-b' : 'bottom-0 bg-gradient-to-t'} from-ink to-transparent ${intensity} z-30 pointer-events-none ${className}`} />
    );
};

// ─── REVEAL WRAPPER (scroll-triggered) ───────────────────────────────────────
export const Reveal = ({
    children,
    className = '',
    delay = 0,
    onClick,
    mode = 'slide' // 'slide' or 'mask'
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    onClick?: () => void;
    mode?: 'slide' | 'mask';
}) => {
    const [ref, visible] = useInView();
    
    if (mode === 'mask') {
        return (
            <div ref={ref} className={`overflow-hidden ${className}`}>
                <div 
                    className={`mask-inner ${visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                        animationPlayState: visible ? 'running' : 'paused',
                        animationDelay: `${delay}ms` 
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${className}`}
            style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
};

// ─── PAGE TRANSITION WRAPPER ─────────────────────────────────────────────────
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState('entering');

    useEffect(() => {
        if (location !== displayLocation) {
            setTransitionStage('exiting');
        }
    }, [location, displayLocation]);

    const onAnimationEnd = () => {
        if (transitionStage === 'exiting') {
            setTransitionStage('entering');
            setDisplayLocation(location);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="relative">
            {/* Curtain Overlay */}
            <div 
                key={location.pathname}
                onAnimationEnd={onAnimationEnd}
                className="fixed inset-0 z-[5000] bg-ink pointer-events-none curtain-entrance flex items-center justify-center font-serif text-cream italic text-6xl"
                style={{ 
                    animationDirection: transitionStage === 'entering' ? 'normal' : 'reverse',
                    animationDuration: '0.8s'
                }}
            >
            </div>
            <div className={transitionStage === 'entering' ? 'opacity-100' : 'opacity-0 transition-opacity duration-300'}>
                {children}
            </div>
        </div>
    );
};

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
export const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
    const [fading, setFading] = useState(false);
    useEffect(() => {
        const t1 = setTimeout(() => setFading(true), 2600);
        const t2 = setTimeout(onDone, 3400);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onDone]);

    return (
        <AnimatePresence>
            {!fading && (
                <motion.div
                    exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                    className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-ink pointer-events-none"
                >
                    {/* The Diamond Stamp */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 text-rose/60 text-sm md:text-base tracking-widest mt-10 md:mt-0"
                    >
                        ◆
                    </motion.div>

                    {/* Wordmark with Mask Reveal */}
                    <div className="overflow-hidden mb-6 px-6 relative">
                        <motion.p
                            initial={{ y: '110%' }}
                            animate={{ y: '0%' }}
                            transition={{ duration: 1.2, delay: 0.6, ease: [0.77, 0, 0.175, 1] }}
                            className="font-serif text-cream text-3xl sm:text-5xl md:text-7xl tracking-[0.15em] sm:tracking-[0.2em] uppercase text-center leading-tight pb-2"
                        >
                            Kelsey <span className="font-light italic">&</span> Company
                        </motion.p>
                    </div>

                    {/* Expanding Line */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 1.2, ease: [0.77, 0, 0.175, 1] }}
                        className="h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent w-48 md:w-96"
                        style={{ transformOrigin: 'center' }}
                    />

                    {/* Est. 2018 */}
                    <div className="overflow-hidden mt-6">
                        <motion.p
                            initial={{ y: '-110%' }}
                            animate={{ y: '0%' }}
                            transition={{ duration: 1, delay: 1.6, ease: [0.77, 0, 0.175, 1] }}
                            className="caps-detail !text-rose/50 !mb-0 text-center tracking-[0.4em]"
                        >
                            Est. 2018
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ─── NAV LABEL (pill fill z-index wrapper) ───────────────────────────────────
const NavLabel = ({ label }: { label: string }) => (
    <span className="nav-label-inner">{label}</span>
);

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
export const TopNav = ({ active, forceDark = false }: { active: boolean, forceDark?: boolean }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { label: 'Who We Are', href: '/who-we-are', delay: '0.4s' },
        { label: 'Services', href: '/services', delay: '0.5s' },
        { label: 'Our Work', href: '/our-work', delay: '0.7s' },
        { label: 'Upcoming Events', href: '/upcoming-events', delay: '0.8s' },
    ];

    const revealStyle = (delay: string) => ({
        animation: active ? `reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) ${delay} forwards` : 'none',
        opacity: active ? 0 : 0
    });

    const isDark = scrolled || forceDark;

    const scrolledClasses = isDark
        ? 'top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-[1100px] py-4 px-6 md:px-10 rounded-[100px] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-ember'
        : 'top-0 left-0 w-full py-6 md:py-10 px-6 md:px-10 bg-transparent';

    const wordmarkClass = isDark ? 'text-cream hover:text-rose' : 'text-cream hover:text-rose';
    
    const getNavLinkClass = (href: string) => {
        const isActive = location.pathname === href;
        const baseClass = isDark ? 'nav-link-dark' : 'nav-link';
        return `${baseClass} ${isActive ? 'active' : ''}`;
    };

    return (
        <>
            <nav className={`fixed z-[100] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex justify-between items-center ${scrolledClasses}`}>
                <div className="hidden md:flex gap-10 items-center w-1/3">
                    {navLinks.slice(0, 2).map(link => (
                        <Link key={link.href} to={link.href} className={getNavLinkClass(link.href)} style={revealStyle(link.delay)}>
                            <NavLabel label={link.label} />
                        </Link>
                    ))}
                </div>
                
                {/* Spacer for mobile to keep wordmark centered */}
                <div className="md:hidden w-8" style={revealStyle('0.1s')}></div>

                <Link
                    to="/"
                    className={`font-serif text-lg md:text-2xl tracking-[0.15em] uppercase transition-all duration-700 no-underline absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${wordmarkClass} ${scrolled ? 'scale-90 md:scale-90 scale-75' : 'scale-100 md:scale-100 scale-90'}`}
                    style={revealStyle('0.2s')}
                >
                    Kelsey <span className="font-light italic">&</span> Company
                </Link>

                <div className="hidden md:flex gap-10 items-center ml-auto w-1/3 justify-end">
                    {navLinks.slice(2).map(link => (
                        link.href.startsWith('#') ? (
                            <a key={link.href} href={link.href} className={getNavLinkClass(link.href)} style={revealStyle(link.delay)}>
                                <NavLabel label={link.label} />
                            </a>
                        ) : (
                            <Link key={link.href} to={link.href} className={getNavLinkClass(link.href)} style={revealStyle(link.delay)}>
                                <NavLabel label={link.label} />
                            </Link>
                        )
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex justify-end" style={revealStyle('0.3s')}>
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className={`p-2 transition-colors duration-300 ${wordmarkClass}`}
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed inset-0 z-[200] bg-ink/95 backdrop-blur-2xl flex flex-col items-center justify-center border-b border-rose/10"
                    >
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 md:top-10 md:right-10 p-4 text-cream hover:text-rose transition-colors duration-300"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                >
                                    {link.href.startsWith('#') ? (
                                        <a 
                                            href={link.href} 
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`font-serif text-4xl hover:text-rose tracking-widest uppercase italic transition-colors ${location.pathname === link.href ? 'text-rose' : 'text-cream'}`}
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link 
                                            to={link.href} 
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`font-serif text-4xl hover:text-rose tracking-widest uppercase italic transition-colors ${location.pathname === link.href ? 'text-rose' : 'text-cream'}`}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute bottom-12 flex flex-col items-center"
                        >
                            <p className="text-[0.6rem] tracking-[0.4em] uppercase font-sans text-rose/40 mb-2">Book a consultation</p>
                            <a href="mailto:kelseyandcompanymedia@gmail.com" className="text-xs text-cream/60 underline decoration-rose/20 underline-offset-4">
                                kelseyandcompanymedia@gmail.com
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// ─── CALENDLY MODAL ───────────────────────────────────────────────────────────
export const CalendlyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                window.removeEventListener('keydown', handleEsc);
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-ink/80 backdrop-blur-xl transition-opacity duration-700"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl h-[80vh] bg-ink rounded-2xl overflow-hidden shadow-ember-intense border border-rose/10 flex flex-col animate-in fade-in zoom-in duration-500">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-rose/5">
                    <div>
                        <h3 className="font-serif text-2xl text-cream tracking-tight">Book a Consultation</h3>
                        <p className="text-[0.6rem] tracking-[0.2em] uppercase font-sans text-rose/40">Select a time that works for you</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-burgundy/5 rounded-full transition-colors text-burgundy/40 hover:text-burgundy"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 w-full bg-cream">
                    <iframe
                        src="https://calendly.com/kelseyandcompanymedia/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

// ─── FOOTER CTA ───────────────────────────────────────────────────────────────
export const FooterCTA = ({ onBookClick }: { onBookClick: () => void }) => (
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
                <button
                    onClick={onBookClick}
                    className="bg-cream text-burgundy border-none py-5 px-12 font-sans font-semibold tracking-widest uppercase hover:bg-rose hover:text-burgundy transition-colors text-sm"
                >
                  Book Consultation
                </button>
                <Link
                    to="/our-work"
                    className="inline-block border border-rose/30 px-10 py-5 text-[0.6rem] tracking-[0.4em] uppercase font-sans text-rose hover:bg-rose hover:text-burgundy transition-all duration-500 rounded-sm mt-8"
                >
                    View Our Work
                </Link>
            </div>
        </Reveal>
    </footer>
);

// ─── UTILITY FOOTER ───────────────────────────────────────────────────────────

// ─── TILT CARD (3D HOVER) ─────────────────────────────────────────────────────
export const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    const springConfig = { damping: 20, stiffness: 200, mass: 1 };
    const smoothRotateX = useSpring(rotateX, springConfig);
    const smoothRotateY = useSpring(rotateY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = (e.clientX - rect.left) / width - 0.5;
        const y = (e.clientY - rect.top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <div 
            ref={ref}
            style={{ perspective: 1000 }}
            className={`w-full h-full relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                mouseX.set(0);
                mouseY.set(0);
            }}
        >
            <motion.div
                style={{
                    rotateX: isHovered ? smoothRotateX : 0,
                    rotateY: isHovered ? smoothRotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative"
            >
                {/* Parallax Content Container */}
                <div style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(0px)", transition: "transform 0.5s ease-out" }} className="w-full h-full">
                    {children}
                </div>
                
                {/* Responsive Glare Effect */}
                <motion.div 
                    className="absolute inset-x-0 inset-y-0 z-50 pointer-events-none rounded-sm transition-opacity duration-500"
                    style={{
                        background: isHovered ? `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)` : 'transparent',
                        opacity: isHovered ? 1 : 0,
                    }}
                />
            </motion.div>
        </div>
    );
};
export const UtilityFooter = () => (
    <footer className="bg-ink py-20 border-t border-rose/5">
        <div className="container mx-auto px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                {/* Brand Column */}
                <Reveal delay={0}>
                    <div className="space-y-6">
                        <h4 className="font-serif text-2xl text-cream tracking-[0.15em] uppercase">
                            Kelsey <span className="font-light italic text-rose/60">&</span> Company
                        </h4>
                        <p className="text-[0.65rem] tracking-[0.3em] uppercase font-sans text-rose/60">Est. 2018</p>
                    </div>
                </Reveal>

                {/* Navigation Column */}
                <Reveal delay={100}>
                    <div className="space-y-8">
                        <p className="caps-detail !text-rose/60 !mb-0">Navigate</p>
                        <nav className="flex flex-col gap-4">
                            {['Who We Are', 'Services', 'Our Work', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Contact' ? '/#contact' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                                    className="text-[0.7rem] tracking-[0.2em] uppercase font-sans text-cream/50 hover:text-rose transition-colors duration-500 w-fit"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </Reveal>

                {/* Contact Column */}
                <Reveal delay={200}>
                    <div className="space-y-8">
                        <p className="caps-detail !text-rose/60 !mb-0">Contact</p>
                        <div className="flex flex-col gap-4">
                            <a
                                href="mailto:Kelseyandcompanymedia@gmail.com"
                                className="text-sm font-sans text-cream/50 hover:text-rose transition-colors duration-500 underline decoration-rose/20 underline-offset-8"
                            >
                                kelseyandcompanymedia@gmail.com
                            </a>
                            <p className="text-sm font-sans text-cream/50">Atlanta, GA</p>
                        </div>
                    </div>
                </Reveal>

                {/* Social Column */}
                <Reveal delay={300}>
                    <div className="space-y-8">
                        <p className="caps-detail !text-rose/60 !mb-0">Follow</p>
                        <div className="flex flex-col gap-4">
                                    {/* Temporarily hiding broken social links until real ones are provided */}
                                    {/* {['LinkedIn', 'Instagram'].map((social) => (
                                        <a
                                            key={social}
                                            href="#"
                                            className="group flex items-center gap-3 text-[0.65rem] tracking-[0.3em] uppercase font-sans text-cream/50 hover:text-rose transition-colors duration-500"
                                        >
                                            {social}
                                            <span className="w-8 h-px bg-rose/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 shadow-[0_0_8px_rgba(238,192,191,0.5)]"></span>
                                        </a>
                                    ))} */}
                                    <p className="text-[0.65rem] tracking-[0.3em] uppercase font-sans text-cream/30">Profiles coming soon</p>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Bottom Legal Bar */}
            <Reveal delay={400} className="pt-10 border-t border-rose/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[0.55rem] tracking-[0.25em] uppercase font-sans text-cream/20">
                    © {new Date().getFullYear()} KELSEY & COMPANY. ALL RIGHTS RESERVED.
                </p>
                <p className="text-[0.55rem] tracking-[0.25em] uppercase font-sans text-cream/20">
                    BUILDING BRIDGES · DRIVING IMPACT
                </p>
            </Reveal>
        </div>
    </footer>
);

// ─── WHY KELSEY & COMPANY (REUSABLE SECTION) ──────────────────────────────────
// ─── SCROLL INDICATOR ─────────────────────────────────────────────────────────
export const ScrollIndicator = ({ text = "drag to explore", className = "" }: { text?: string; className?: string }) => (
    <div className={`flex items-center justify-center gap-4 text-rose/50 animate-pulse-slow ${className}`}>
        <span className="w-8 md:w-12 h-px bg-rose/30" />
        <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] uppercase font-sans whitespace-nowrap">
            ← {text} →
        </p>
        <span className="w-8 md:w-12 h-px bg-rose/30" />
    </div>
);

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
            img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200'
        },
        {
            num: '02',
            label: 'Strategy & Creativity',
            sub: 'Impact requires both vision and precision. We bridge the gap between bold ideas and measurable results.',
            img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200'
        },
        {
            num: '03',
            label: 'Culture Drives Connection',
            sub: 'We build bridges to what matters most by staying at the heart of the cultural conversation.',
            img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200'
        },
        {
            num: '04',
            label: 'Consistency Builds Trust',
            sub: 'Every touchpoint is an opportunity for excellence. We maintain a standard that speaks for itself.',
            img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200'
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

// ─── GLOBAL LAYOUT ────────────────────────────────────────────────────────────
export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollY } = useScroll();
    const [showFloating, setShowFloating] = useState(false);
    const location = useLocation();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            if (location.pathname === '/') {
                setShowFloating(latest > window.innerHeight * 1.5);
            } else {
                setShowFloating(latest > 100);
            }
        });
    }, [scrollY, location.pathname]);

    useEffect(() => {
        if (location.pathname !== '/') {
            setShowFloating(window.scrollY > 100);
        } else {
            setShowFloating(window.scrollY > window.innerHeight * 1.5);
        }
    }, [location.pathname]);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            <div className="relative">
                <CustomCursor />
                {children}
                <FloatingCTA 
                    show={showFloating} 
                    onClick={openModal} 
                />
                <CalendlyModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </ModalContext.Provider>
    );
};

// ─── FLOATING CTA ─────────────────────────────────────────────────────────────
export const FloatingCTA = ({ onClick, show }: { onClick: () => void; show: boolean }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed z-[90] bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm md:left-auto md:translate-x-0 md:w-auto md:bottom-12 md:right-12 pointer-events-auto"
                >
                    <motion.button
                        layoutId="book-consultation"
                        onClick={onClick}
                        className="w-full md:w-auto flex items-center justify-center gap-3 border border-rose/40 text-rose/80 text-[0.65rem] tracking-[0.3em] uppercase font-sans px-10 py-5 bg-ink/60 backdrop-blur-xl shadow-ember hover:bg-rose/10 hover:border-rose/70 transition-all duration-500 rounded-sm md:rounded-none group"
                    >
                        <span className="text-rose/40 group-hover:text-rose transition-colors duration-500">◆</span>
                        Book Consultation
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
