import { useState, useEffect, useRef } from 'react';
import { X, Plus, Volume2, VolumeX } from 'lucide-react';
import { Reveal, TopNav, useModal, useMagnetic, FooterCTA, UtilityFooter, SectionBlender, ScrollProgressBar } from './SharedComponents';
import { SERVICES_DATA } from './data/services';

const SERVICE_SLUGS: Record<string, string> = {
    '01': 'experiential-activations',
    '02': 'event-producing',
    '03': 'brand-partnerships',
    '04': 'executive-brand-management',
    '05': 'digital-marketing',
    '06': 'film-production',
};

const ServicesPage = () => {
    const { openModal } = useModal();
    const magneticRef = useMagnetic(30);
    const [overlayServiceId, setOverlayServiceId] = useState<string | null>(null);
    const [selectedEventClient, setSelectedEventClient] = useState<any | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);

        // Task 2.4: Deep-linking support
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const match = Object.entries(SERVICE_SLUGS).find(([, slug]) => slug === hash);
            if (match) setOverlayServiceId(match[0]);
        }
    }, []);

    useEffect(() => {
        if (selectedEventClient) {
            setIsMuted(true);
        }
    }, [selectedEventClient]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume, selectedEventClient]);

    useEffect(() => {
        if (overlayServiceId || selectedEventClient) {
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    if (selectedEventClient) {
                        setSelectedEventClient(null);
                    } else if (overlayServiceId) {
                        setOverlayServiceId(null);
                        window.history.pushState({}, '', window.location.pathname);
                    }
                }
            };
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        }
    }, [overlayServiceId, selectedEventClient]);

    const toggleOverlay = (id: string) => {
        const newId = overlayServiceId === id ? null : id;
        setOverlayServiceId(newId);

        // Task 2.4 & 4.1: Update hash and title
        const slug = newId ? SERVICE_SLUGS[newId] : '';
        const service = SERVICES_DATA.find(s => s.id === newId);
        window.history.pushState({}, '', slug ? `#${slug}` : window.location.pathname);

        if (service) {
            document.title = `${service.title} | Kelsey & Company`;
        } else {
            document.title = "Services | Kelsey & Company";
        }
    };

    const activeService = SERVICES_DATA.find(s => s.id === overlayServiceId);

    return (
        <div className={`bg-ink text-cream min-h-screen selection:bg-rose selection:text-ink transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <ScrollProgressBar />
            <TopNav active={loaded} forceDark={false} />

            {/* ─── MINIMAL HERO SECTION ─── */}
            <section className="pt-32 pb-12 flex flex-col items-center justify-center relative bg-ink">
                <div className="container mx-auto px-8 relative z-10 w-full max-w-4xl text-center">
                    <div className="overflow-hidden">
                        <Reveal mode="mask">
                            <h1 className="text-5xl md:text-7xl font-serif leading-none tracking-tighter text-cream uppercase mb-4 mt-8">
                                Our <i className="font-light italic text-rose">Services.</i>
                            </h1>
                        </Reveal>
                    </div>
                    <Reveal delay={200}>
                        <p className="text-sm md:text-lg text-cream/40 font-serif italic max-w-xl mx-auto leading-relaxed">
                            Beyond production. We curate immersive cultural moments that bridge the gap between audience and brand.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ─── SERVICES GRID ─── */}
            <section className="bg-ink pb-32 relative">
                <SectionBlender position="bottom" intensity="h-32" />
                <div className="container mx-auto px-8 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-rose/10 border border-rose/10">
                        {SERVICES_DATA.map((service) => (
                            <div
                                key={service.id}
                                className="relative aspect-[16/9] group overflow-hidden bg-ink cursor-pointer"
                                onClick={() => toggleOverlay(service.id)}
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1500ms] ease-out"
                                />
                                <div className="absolute inset-0 bg-ink/20 group-hover:bg-burgundy/60 transition-colors duration-700"></div>

                                <div className="absolute inset-x-8 bottom-8 z-10 group-hover:opacity-100 opacity-100 transition-all duration-700">
                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                        <span className="text-rose font-sans text-[0.6rem] tracking-[0.3em] uppercase mb-4 block opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {service.id} / 06
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-serif text-cream uppercase mb-4 tracking-tighter leading-none group-hover:text-cream transition-colors duration-500 opacity-100 md:opacity-0 group-hover:opacity-100">
                                            {service.title.split(' ').map((word, i) => (
                                                <span key={i} className="inline-block mr-2">{word}</span>
                                            ))}
                                        </h3>
                                        <div className="overflow-hidden">
                                            <p className="text-rose/80 text-sm md:text-base font-serif italic leading-relaxed line-clamp-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 translate-y-0 md:translate-y-full group-hover:translate-y-0">
                                                {service.description || "Comprehensive brand strategy and production services."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 md:opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
                                <div className="absolute inset-x-8 bottom-8 opacity-0 md:opacity-100 group-hover:opacity-0 transition-all duration-500 ease-in-out">
                                    <span className="text-rose/80 font-sans text-[0.6rem] tracking-[0.3em] uppercase block mb-3">{service.id}</span>
                                    <h3 className="text-xl md:text-2xl font-serif text-cream uppercase tracking-tighter leading-[1.1] max-w-[80%] drop-shadow-md">{service.title}</h3>
                                </div>

                                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-rose/10 group-hover:border-rose/30 transition-colors duration-500"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FULL VIEW OVERLAY ─── */}
            {activeService && (
                <div className={`fixed inset-0 z-[100] bg-ink flex flex-col md:flex-row transition-all duration-[800ms] ease-expo ${overlayServiceId ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    <div className="w-full md:w-[60%] h-[40vh] md:h-full relative overflow-hidden bg-black">
                        <img
                            src={activeService.image}
                            alt={activeService.title}
                            className="w-full h-full object-cover opacity-60 animate-ken-burns transition-transform duration-[3000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/40"></div>
                        <div className="absolute top-10 left-10 z-10 hidden md:block">
                            <button
                                onClick={() => setOverlayServiceId(null)}
                                className="group flex items-center gap-4 text-cream text-[0.65rem] tracking-[0.4em] uppercase font-sans hover:text-rose transition-colors"
                            >
                                <div className="w-10 h-10 flex items-center justify-center border border-cream/20 rounded-full group-hover:border-rose/40 transition-colors">
                                    <X size={16} />
                                </div>
                                <span>Return to Overview</span>
                            </button>
                        </div>
                        {/* Mobile Fixed Close Button */}
                        <button
                            onClick={() => setOverlayServiceId(null)}
                            className="md:hidden fixed top-6 right-6 z-[150] w-12 h-12 flex items-center justify-center bg-cream/80 backdrop-blur-md rounded-full shadow-lg border border-burgundy/10"
                        >
                            <X size={20} className="text-burgundy" />
                        </button>
                    </div>

                    <div className="w-full md:w-[40%] h-[60vh] md:h-full bg-ink md:bg-ink text-cream flex flex-col pt-16 md:pt-32 pb-20 overflow-y-auto scrollbar-none">
                        <div className="px-8 md:px-16 space-y-12">
                            <div>
                                <span className="text-rose font-sans text-[0.7rem] tracking-[0.4em] uppercase mb-6 block">
                                    Service · {activeService.id}
                                </span>
                                <h2 className="text-4xl md:text-7xl font-serif tracking-tighter uppercase leading-[0.9] text-cream mb-10">
                                    {activeService.title}
                                </h2>
                                <p className="text-xl md:text-3xl font-serif italic text-cream/80 leading-relaxed border-l border-rose/30 pl-8 ml-2">
                                    {activeService.description}
                                </p>

                                {activeService.id === '01' && (
                                    <div className="mt-12 p-8 border border-rose/10 bg-rose/[0.02]">
                                        <p className="text-[0.75rem] tracking-[0.4em] uppercase font-sans text-rose/60 mb-4">Core Inclusion</p>
                                        <p className="text-base font-serif italic text-cream/40 leading-relaxed">
                                            Our experiential model includes end-to-end staffing and management systems, ensuring elite representation and cultural fluency at every brand touchpoint.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-20 border-t border-rose/10">
                                <h4 className="text-[0.6rem] tracking-[0.5em] uppercase font-sans text-rose/50 mb-12">Selected Work</h4>
                                <div className="space-y-6">
                                    {activeService.clients?.map((client: any, idx) => (
                                        <div key={idx} className="relative">
                                            <div
                                                className={`group/client relative flex items-center gap-6 p-4 rounded-sm border border-transparent hover:border-rose/10 hover:bg-rose/[0.02] transition-all duration-500 ${client.eventDetail ? 'cursor-pointer' : ''}`}
                                                onClick={() => client.eventDetail && setSelectedEventClient(client)}
                                            >
                                                {/* Visual Representative */}
                                                <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-sm bg-ink/50 shadow-sm border border-rose/10">
                                                    {client.portrait ? (
                                                        <div className={`w-full h-full flex items-center justify-center ${client.objectFit === 'contain' ? 'bg-cream/5 p-4' : ''}`}>
                                                            <img
                                                                src={client.portrait}
                                                                className={`w-full h-full ${client.objectFit === 'contain' ? 'object-contain' : 'object-cover'} grayscale brightness-90 group-hover/client:grayscale-0 group-hover/client:scale-110 transition-all duration-1000`}
                                                                style={{ objectPosition: client.objectPosition || 'center' }}
                                                                alt={client.name}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-rose/10 text-rose/40 font-serif text-3xl italic">
                                                            {client.name.charAt(0)}
                                                        </div>
                                                    )}

                                                    {client.eventDetail && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-burgundy/40 opacity-0 group-hover/client:opacity-100 transition-opacity duration-500">
                                                            <Plus size={20} className="text-cream" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Information */}
                                                <div className="flex-grow min-w-0">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 md:mb-1.5 px-0.5 gap-1 md:gap-0">
                                                        <h5 className="text-[0.85rem] md:text-[0.9rem] tracking-[0.25em] font-sans uppercase text-cream group-hover/client:text-rose transition-colors duration-500 truncate md:whitespace-normal">
                                                            {client.name}
                                                        </h5>
                                                        {client.year && (
                                                            <span className="text-[0.6rem] md:text-[0.65rem] font-sans text-rose/30 tracking-[0.3em] font-light shrink-0">{client.year}</span>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-3 md:gap-8 mt-1 md:mt-0">
                                                        {client.role && (
                                                            <span className="text-[0.5rem] tracking-[0.2em] uppercase font-sans px-3 py-1.5 border border-rose/20 text-rose/60 rounded-[4px] bg-rose/[0.02] group-hover/client:border-rose/40 transition-colors">
                                                                {client.role}
                                                            </span>
                                                        )}
                                                        {client.eventDetail && (
                                                            <div className="flex items-center gap-3 group/cta">
                                                                <span className="text-[0.55rem] tracking-[0.4em] uppercase font-sans text-rose/30 group-hover/client:text-rose transition-all">
                                                                    Explore Moment
                                                                </span>
                                                                <div className="relative flex items-center">
                                                                    <span className="w-8 md:w-16 h-px bg-rose/10 group-hover/client:bg-rose group-hover/client:w-24 transition-all duration-1000"></span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>


                                                {/* Decorative Indicator */}
                                                {client.eventDetail && (
                                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover/client:opacity-100 transition-all duration-700 transform translate-x-4 group-hover:translate-x-0">
                                                        <div className="w-12 h-[1px] bg-rose/30"></div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Sub-Partnerships */}
                                            {client.subPartnerships && client.subPartnerships.length > 0 && (
                                                <div className="mt-2 ml-[7.5rem] pl-4 border-l border-rose/10 space-y-2">
                                                    <p className="text-[0.5rem] tracking-[0.35em] uppercase font-sans text-rose/30 mb-3">{client.subLabel || 'Partnerships'}</p>
                                                    {client.subPartnerships.map((partner: any, pIdx: number) => (
                                                        <div
                                                            key={pIdx}
                                                            className={`flex items-center gap-3 group/sub ${partner.eventDetail ? 'cursor-pointer' : ''}`}
                                                            onClick={(e) => {
                                                                if (partner.eventDetail) {
                                                                    e.stopPropagation();
                                                                    setSelectedEventClient({
                                                                        name: partner.name,
                                                                        year: client.year,
                                                                        eventDetail: partner.eventDetail
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            <span className="w-3 h-px bg-rose/20 group-hover/sub:bg-rose/50 transition-colors duration-500 shrink-0"></span>
                                                            <span className={`text-[0.65rem] tracking-[0.2em] uppercase font-sans transition-colors duration-500 ${partner.eventDetail ? 'text-cream/70 group-hover/sub:text-rose flex items-center gap-2' : 'text-cream/40 group-hover/sub:text-cream/70'}`}>
                                                                {partner.name}
                                                            </span>
                                                            {partner.eventDetail && (
                                                                <span className="text-[0.45rem] tracking-[0.2em] font-sans text-rose/40 uppercase px-2 py-0.5 border border-rose/20 rounded-[2px] ml-2 group-hover/sub:border-rose/50 opacity-0 group-hover/sub:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover/sub:translate-x-0">
                                                                    View Details
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {(!activeService.clients || activeService.clients.length === 0) && (
                                        <div className="py-20 text-center border border-dashed border-rose/20 rounded-sm">
                                            <p className="text-sm font-serif italic text-cream/30">Client work coming soon.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div ref={magneticRef} className="magnetic-button">
                                <Reveal delay={600}>
                                    <button
                                        onClick={() => {
                                            setOverlayServiceId(null);
                                            openModal();
                                        }}
                                        className="w-full border border-rose/20 py-8 text-[0.7rem] tracking-[0.5em] uppercase font-sans hover:bg-cream hover:text-ink transition-all duration-700"
                                    >
                                        Book Consultation
                                    </button>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── CLIENT CASE STUDY MODAL ─── */}
            {selectedEventClient && (
                <div className="fixed inset-0 z-[200] flex overflow-hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-ink/95 backdrop-blur-md"
                        onClick={() => setSelectedEventClient(null)}
                    />

                    {/* Modal Container */}
                    <div className="relative w-full m-4 md:m-10 flex flex-col md:flex-row bg-ink overflow-hidden shadow-ember-intense animate-fade-in-up rounded-sm border border-rose/10">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedEventClient(null)}
                            className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center border border-cream/20 rounded-full hover:bg-rose/20 hover:border-rose/40 transition-all duration-500 text-cream"
                        >
                            <X size={18} />
                        </button>

                        {/* Panel 1: Video or Portrait */}
                        <div className={`w-full h-[40vh] md:h-full relative overflow-hidden bg-black shrink-0 transition-all duration-700 ${selectedEventClient.eventDetail?.heroOrientation === 'portrait' ? 'md:w-[40%]' : 'md:w-[55%]'
                            }`}>
                            {selectedEventClient.eventDetail?.videoSrc ? (
                                <>
                                    {/* Cinematic Blur Background */}
                                    <div className="absolute inset-0 bg-black/80 overflow-hidden pointer-events-none">
                                        <video
                                            src={selectedEventClient.eventDetail.videoSrc}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover scale-[1.3] blur-[40px] opacity-30 transition-all duration-[1500ms]"
                                        />
                                    </div>

                                    {/* Main Video Layer */}
                                    <video
                                        ref={videoRef}
                                        src={selectedEventClient.eventDetail.videoSrc}
                                        poster={selectedEventClient.eventDetail.videoPoster}
                                        autoPlay
                                        muted={isMuted}
                                        loop
                                        playsInline
                                        className="w-full h-full object-contain relative z-10 transition-all duration-700 shadow-2xl"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-70 z-20 pointer-events-none" />

                                    {/* Audio & Volume Controls */}
                                    <div className="absolute bottom-8 right-8 z-[60] flex items-center gap-4 group/vol">
                                        <div className="flex items-center gap-0 overflow-hidden bg-ink/40 backdrop-blur-xl border border-cream/10 rounded-full h-14 pr-2 hover:pr-6 transition-all duration-700 ease-expo group-hover/vol:border-cream/30">
                                            <button
                                                onClick={() => setIsMuted(!isMuted)}
                                                className="w-14 h-14 flex items-center justify-center text-cream/70 hover:text-cream transition-all duration-500 shrink-0"
                                                title={isMuted ? "Unmute" : "Mute"}
                                            >
                                                {isMuted ? (
                                                    <VolumeX size={20} />
                                                ) : (
                                                    <Volume2 size={20} className="animate-pulse" />
                                                )}
                                            </button>

                                            <div className="flex items-center">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.01"
                                                    value={isMuted ? 0 : volume}
                                                    onChange={(e) => {
                                                        const newVal = parseFloat(e.target.value);
                                                        setVolume(newVal);
                                                        if (newVal > 0) setIsMuted(false);
                                                        else setIsMuted(true);
                                                    }}
                                                    className="volume-slider"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Film Title Treatment */}
                                    <div className="absolute bottom-6 left-10 z-30 pointer-events-none">
                                        <p className="text-[0.45rem] md:text-[0.55rem] tracking-[0.5em] uppercase font-sans text-rose/70 mb-2 drop-shadow-md">Creative Production · 2025</p>
                                        <h2 className="text-4xl md:text-7xl font-serif text-cream uppercase leading-none tracking-tighter drop-shadow-2xl">
                                            {selectedEventClient.eventDetail?.title || selectedEventClient.name}
                                        </h2>
                                        <p className="font-serif italic text-cream/40 text-base md:text-lg mt-1 drop-shadow-md">{selectedEventClient.eventDetail?.subtitle || "Selected Work"}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img src={selectedEventClient.eventDetail?.heroImage || selectedEventClient.portrait} alt={selectedEventClient.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-6 left-10 z-10">
                                        <p className="text-[0.55rem] tracking-[0.5em] uppercase font-sans text-rose/70 mb-3">Event Producing · {selectedEventClient.year}</p>
                                        <h2 className="text-5xl md:text-7xl font-serif text-cream uppercase leading-none tracking-tighter">{selectedEventClient.eventDetail?.title}</h2>
                                        <p className="font-serif italic text-cream/50 text-lg mt-2">{selectedEventClient.eventDetail?.subtitle}</p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Panel 2: Details + Gallery */}
                        <div className={`w-full h-full overflow-y-auto scrollbar-none transition-all duration-700 ${selectedEventClient.eventDetail?.heroOrientation === 'portrait' ? 'md:w-[60%]' : 'md:w-[45%]'
                            }`}>

                            {/* Details Section */}
                            <div className="p-10 md:p-16 space-y-10 border-b border-rose/5">
                                <div>
                                    <span className="text-[0.65rem] tracking-[0.5em] uppercase font-sans text-rose/70 block mb-6">The Theme</span>
                                    <p className="text-2xl md:text-3xl font-serif text-cream italic leading-tight uppercase tracking-tight">{selectedEventClient.eventDetail?.theme}</p>
                                </div>
                                <p className="text-xl md:text-2xl font-serif italic text-cream/80 leading-relaxed border-l-2 border-rose/30 pl-8">
                                    {selectedEventClient.eventDetail?.description}
                                </p>

                            </div>

                            {/* Brochure / Print Preview */}
                            {selectedEventClient.eventDetail?.brochure && (
                                <div className="p-10 md:p-16 border-b border-cream/5">
                                    <span className="text-[0.55rem] tracking-[0.5em] uppercase font-sans text-rose/60 block mb-6">Print Deliverable</span>
                                    <div className="relative overflow-hidden rounded-sm group">
                                        <img
                                            src={selectedEventClient.eventDetail.brochure}
                                            alt="Brochure"
                                            className="w-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                </div>
                            )}

                            {/* Publications & Media */}
                            {selectedEventClient.eventDetail?.bookPdf && (
                                <div className="p-10 md:p-16 border-b border-cream/5">
                                    <span className="text-[0.55rem] tracking-[0.5em] uppercase font-sans text-rose/60 block mb-6">Publications & Media</span>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <a href={selectedEventClient.eventDetail.bookPdf} target="_blank" rel="noopener noreferrer" className="border border-rose/30 text-rose/80 text-[0.6rem] tracking-[0.3em] uppercase font-sans px-8 py-4 hover:bg-rose/10 hover:border-rose/60 transition-all duration-500 text-center">
                                            Read: Leaving Money on the Table
                                        </a>
                                        {selectedEventClient.eventDetail.pressKitPdf && (
                                            <a href={selectedEventClient.eventDetail.pressKitPdf} target="_blank" rel="noopener noreferrer" className="border border-cream/20 text-cream/80 text-[0.6rem] tracking-[0.3em] uppercase font-sans px-8 py-4 hover:bg-cream/10 transition-all duration-500 text-center">
                                                Download Media Kit
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {selectedEventClient.eventDetail?.galleryImages?.length > 0 && (
                                <div className="p-10 md:p-16">
                                    <span className="text-[0.55rem] tracking-[0.5em] uppercase font-sans text-rose/60 block mb-6">Production Gallery</span>
                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedEventClient.eventDetail.galleryImages.map((item: any, i: number) => {
                                            const isString = typeof item === 'string';
                                            const imgSrc = isString ? item : item.src;
                                            const orientation = isString ? 'landscape' : item.orientation;

                                            return (
                                                <div
                                                    key={i}
                                                    className={`relative overflow-hidden group/gal bg-burgundy/5 ${orientation === 'landscape' ? 'col-span-2 aspect-[16/9]' : 'col-span-1 aspect-[3/4]'
                                                        }`}
                                                >
                                                    <img
                                                        src={imgSrc}
                                                        alt={`Gallery ${i + 1}`}
                                                        className="w-full h-full object-cover grayscale group-hover/gal:grayscale-0 group-hover/gal:scale-110 transition-all duration-[1500ms] opacity-70 group-hover/gal:opacity-100"
                                                    />
                                                    <div className="absolute top-3 left-3 text-[0.5rem] tracking-widest text-cream/30 font-sans uppercase opacity-0 group-hover/gal:opacity-100 transition-opacity">
                                                        {String(i + 1).padStart(2, '0')}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="px-10 md:px-16 py-12 flex justify-between items-center border-t border-cream/5">
                                <p className="text-[0.55rem] tracking-[0.5em] uppercase font-sans text-cream/20 hidden md:block">Kelsey & Company · Our Work</p>
                                <button
                                    onClick={() => { setSelectedEventClient(null); openModal(); }}
                                    className="group flex items-center gap-4 px-8 py-4 border border-rose/20 bg-rose/5 text-[0.6rem] tracking-[0.35em] uppercase font-sans text-rose/80 hover:bg-rose hover:text-ink hover:border-rose transition-all duration-500"
                                >
                                    <span>Book a Consultation</span>
                                    <span className="text-lg leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── CTA ─── */}
            <section className="py-32 bg-ink text-cream text-center relative overflow-hidden">
                <SectionBlender position="top" intensity="h-32" />
                <Reveal>
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-12 uppercase">
                        Ready to <i className="font-light italic text-rose/60">Launch?</i>
                    </h2>
                    <button onClick={openModal} className="border border-rose/30 text-rose/80 text-[0.7rem] tracking-[0.4em] uppercase font-sans px-12 py-5 hover:bg-rose/10 hover:border-rose/60 transition-all duration-500">Start a Partnership</button>
                </Reveal>
            </section>

            <FooterCTA onBookClick={openModal} />
            <UtilityFooter />
        </div>
    );
};

export default ServicesPage;
