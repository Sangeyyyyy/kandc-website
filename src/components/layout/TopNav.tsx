import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NavLabel = ({ label }: { label: string }) => (
    <span className="nav-label-inner">{label}</span>
);

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
