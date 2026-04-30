import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
