import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useMagnetic } from '../../hooks/useMagnetic';

export const CalendlyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [step, setStep] = useState<'briefing' | 'calendly'>('briefing');
    const [formData, setFormData] = useState({ projectType: '', company: '', timeline: '' });
    const magneticClose = useMagnetic(20);

    useEffect(() => {
        if (isOpen) {
            setStep('briefing'); // Reset on open
        }
    }, [isOpen]);

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('calendly');
    };
    
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
                <div className="flex items-center justify-between p-6 md:p-10 border-b border-rose/5 relative z-10 bg-ink">
                    <div>
                        <h3 className="font-serif text-3xl md:text-4xl text-cream tracking-tight uppercase italic">
                            {step === 'briefing' ? 'Project Briefing' : 'Secure Your Slot'}
                        </h3>
                        <p className="text-[0.6rem] tracking-[0.3em] uppercase font-sans text-rose/50 mt-2">
                            {step === 'briefing' ? 'Step 01 / Context' : 'Step 02 / Scheduling'}
                        </p>
                    </div>
                    <div ref={magneticClose}>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-rose/5 rounded-full transition-all duration-500 text-rose/30 hover:text-rose border border-transparent hover:border-rose/10"
                        >
                            <X size={28} strokeWidth={1} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {step === 'briefing' ? (
                            <motion.div
                                key="briefing"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="p-8 md:p-16 max-w-2xl mx-auto"
                            >
                                <form onSubmit={handleNext} className="space-y-12">
                                    <div className="space-y-6">
                                        <p className="text-rose/60 text-xs tracking-widest uppercase">What are we building?</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {['Experiential', 'Digital Campaign', 'Brand Strategy', 'Other'].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, projectType: type })}
                                                    className={`px-6 py-4 text-left border transition-all duration-500 text-xs tracking-widest uppercase font-sans ${
                                                        formData.projectType === type 
                                                        ? 'bg-rose text-ink border-rose' 
                                                        : 'border-rose/10 text-cream/40 hover:border-rose/30'
                                                    }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-rose/60 text-xs tracking-widest uppercase">Company or Entity</p>
                                        <input 
                                            type="text"
                                            required
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                            placeholder="Who are you representing?"
                                            className="w-full bg-transparent border-b border-rose/20 py-4 text-cream font-serif text-xl focus:border-rose outline-none transition-colors placeholder:text-cream/10"
                                        />
                                    </div>

                                    <div className="pt-8">
                                        <button 
                                            type="submit"
                                            disabled={!formData.projectType || !formData.company}
                                            className="w-full md:w-auto px-12 py-6 bg-cream text-ink text-[0.7rem] tracking-[0.5em] uppercase font-sans hover:bg-rose transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                                        >
                                            Next: Schedule Time
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="calendly"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full bg-cream"
                            >
                                <iframe
                                    src="https://calendly.com/kelseyandcompanymedia/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                ></iframe>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
