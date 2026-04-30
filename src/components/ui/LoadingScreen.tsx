import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
    const [fading, setFading] = useState(false);
    
    useEffect(() => {
        const isReturning = sessionStorage.getItem('kc_loaded');
        
        if (isReturning) {
            // Very fast transition for returning users
            const t1 = setTimeout(() => setFading(true), 100);
            const t2 = setTimeout(() => {
                onDone();
            }, 600);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        } else {
            // Standard but slightly faster animation for first-time visitors
            const t1 = setTimeout(() => setFading(true), 1800);
            const t2 = setTimeout(() => {
                sessionStorage.setItem('kc_loaded', '1');
                onDone();
            }, 2600);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
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
