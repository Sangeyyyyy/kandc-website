import { useEffect, useState } from 'react';
import { TopNav, UtilityFooter, FooterCTA, useModal, Reveal, SectionBlender } from './SharedComponents';


const ALL_EVENTS = [
    {
        id: 'ev-01',
        date: 'OCT 24',
        year: '2026',
        title: 'The Intersection: Culture & Commerce',
        location: 'Atlanta, GA',
        type: 'Industry Panel',
        description: 'An exclusive round-table featuring top brand architects discussing the fusion of long-term strategy and cultural relevance.',
        image: '/assets/thought leadership brunch/thought leadership brunch 1.png', 
        targetDate: '2026-10-24T19:00:00' // Target date for countdown
    },
    {
        id: 'ev-02',
        date: 'NOV 12',
        year: '2026',
        title: 'Kelsey & Co. Winter Gala',
        location: 'New York, NY',
        type: 'Private Mixer',
        description: 'An invitation-only gathering for our closest brand partners and creative collaborators to celebrate the year\'s milestones.',
        image: '/assets/spike lee dinner/spike lee dinner 1.png',
    },
    {
        id: 'ev-03',
        date: 'DEC 05',
        year: '2026',
        title: 'The Art of Activation',
        location: 'Miami, FL — Art Basel',
        type: 'Immersive Experience',
        description: 'A multi-sensory brand activation popup during Miami Art Week. Redefining how physical spaces convey digital narratives.',
        image: '/assets/sinners/sinners 1.png',
    }
];

const FEATURED_EVENT = ALL_EVENTS[0];
// Limit the remaining list to display a maximum of 6 events
const REMAINING_EVENTS = ALL_EVENTS.slice(1, 7);

// Countdown component helper
const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timeBlocks = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
    ];

    return (
        <div className="flex items-center gap-4 md:gap-8 mt-10">
            {timeBlocks.map((block) => (
                <div key={block.label} className="flex flex-col items-center">
                    <div className="font-serif text-3xl md:text-5xl lg:text-6xl text-rose tracking-tighter w-16 md:w-24 text-center">
                        {String(block.value).padStart(2, '0')}
                    </div>
                    <div className="text-[0.55rem] md:text-[0.65rem] tracking-[0.3em] uppercase text-cream/40 mt-2">
                        {block.label}
                    </div>
                    {/* Divider for all except last */}
                </div>
            ))}
        </div>
    );
};

export default function UpcomingEventsPage() {
    const { openModal } = useModal();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-ink min-h-screen text-cream relative">
            <TopNav active={true} forceDark />

            {/* ─── DARK TICKER (FEATURED EVENT HERO) ────────────────────────────────────────────────────────── */}
            <section className="relative min-h-[90vh] md:min-h-screen flex items-end justify-start pb-20 md:pb-32 overflow-hidden border-b border-rose/10">
                {/* Cinematic Background */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={FEATURED_EVENT.image} 
                        alt={FEATURED_EVENT.title} 
                        className="w-full h-full object-cover opacity-30 transform scale-105"
                    />
                    {/* Multiply Gradient to darken and keep text readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 md:px-12 w-full max-w-7xl pt-40">
                    <Reveal mode="slide" className="flex flex-col md:flex-row gap-12 md:gap-24 items-start md:items-end w-full">
                        
                        {/* Event Info Left */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-rose/80 text-[10px] animate-pulse">◆</span>
                                <p className="text-[0.65rem] tracking-[0.4em] uppercase text-rose/80 font-sans">
                                    Next Featured Event
                                </p>
                            </div>
                            
                            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem] font-serif leading-[0.9] tracking-tighter text-cream uppercase mb-6 max-w-4xl">
                                {FEATURED_EVENT.title}
                            </h1>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 text-cream/60 font-sans text-xs tracking-widest uppercase mt-8 border-l border-rose/30 pl-6 border-b sm:border-b-0 pb-6 sm:pb-0">
                                <p><span className="text-rose/40 block mb-1 text-[0.55rem]">Date</span> {FEATURED_EVENT.date}, {FEATURED_EVENT.year}</p>
                                <p><span className="text-rose/40 block mb-1 text-[0.55rem]">Location</span> {FEATURED_EVENT.location}</p>
                                <p><span className="text-rose/40 block mb-1 text-[0.55rem]">Type</span> {FEATURED_EVENT.type}</p>
                            </div>
                        </div>

                        {/* Interactive Countdown Right */}
                        <div className="flex-shrink-0 flex flex-col items-start md:items-end w-full md:w-auto mt-8 md:mt-0 pb-8 md:pb-0">
                            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-cream/40 font-sans text-left md:text-right w-full">
                                Experience Begins In
                            </p>
                            <CountdownTimer targetDate={FEATURED_EVENT.targetDate as string} />
                        </div>
                        
                    </Reveal>
                </div>
            </section>

            {/* ─── EDITORIAL ITINERARY (UPCOMING EVENTS) ────────────────────────────────────────────────── */}
            <div className="relative border-t border-cream/5 min-h-[50vh]">
                
                {/* Global Background image */}
                <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 bg-ink">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050203_100%)]"></div>
                </div>

                <div className="relative z-10 block pb-32">
                    {/* Header Label */}
                    <div className="pt-24 px-8 max-w-7xl mx-auto flex items-center gap-6">
                        <p className="caps-detail !text-cream/30 !mb-0 shrink-0">The Itinerary</p>
                        <div className="h-px bg-cream/10 w-full"></div>
                    </div>

                    <div className="mt-12 w-full max-w-7xl mx-auto px-4 md:px-8">
                        {REMAINING_EVENTS.map((event, index) => (
                            <div 
                                key={event.id}
                                className="group relative border-b border-cream/10 transition-colors duration-500 hover:bg-rose/5"
                            >
                                <Reveal delay={index * 100} className="w-full">
                                    <div className="flex flex-col md:flex-row py-12 md:py-20 gap-8 items-start md:items-center cursor-pointer px-4">
                                        
                                        {/* Left col: Date */}
                                        <div className="w-full md:w-1/4 flex-shrink-0 flex md:flex-col justify-between md:justify-start items-baseline md:items-start gap-4">
                                            <h2 className="text-5xl md:text-6xl font-serif tracking-tighter leading-none text-cream/40 group-hover:text-cream transition-colors duration-500 uppercase">
                                                {event.date}
                                            </h2>
                                            <span className="text-[0.65rem] tracking-[0.4em] text-rose/50 font-sans uppercase">
                                                {event.year}
                                            </span>
                                        </div>

                                        {/* Center col: Details */}
                                        <div className="w-full md:w-2/4 flex flex-col items-start gap-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-rose/40 text-[10px]">◆</span>
                                                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-rose/60 font-sans">{event.type}</p>
                                            </div>
                                            <h3 className="font-serif text-3xl md:text-4xl tracking-tight leading-[1.1] text-cream group-hover:text-rose transition-colors duration-500">
                                                {event.title}
                                            </h3>
                                            <p className="text-cream/50 text-sm font-light leading-relaxed max-w-md group-hover:text-cream/80 transition-colors duration-500 mt-2">
                                                {event.description}
                                            </p>
                                        </div>

                                        {/* Right col: Location */}
                                        <div className="w-full md:w-1/4 flex flex-row justify-end md:justify-end items-center md:items-center gap-6 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500 mt-4 md:mt-0">
                                            <p className="text-[0.65rem] md:text-xs tracking-[0.2em] uppercase font-sans text-cream/60 md:text-right">
                                                {event.location}
                                            </p>
                                        </div>
                                        
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SectionBlender position="bottom" intensity="h-48" />
            <FooterCTA onBookClick={openModal} />
            <UtilityFooter />
        </div>
    );
}
