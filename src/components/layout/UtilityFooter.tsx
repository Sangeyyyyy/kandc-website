import { Link } from 'react-router-dom';
import { Reveal } from '../ui/Reveal';

export const UtilityFooter = () => (
    <footer className="bg-ink py-20 border-t border-rose/5">
        <div className="container mx-auto px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
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
