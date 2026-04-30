import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollIndicator = ({ text = "drag to explore", className = "" }: { text?: string; className?: string }) => (
    <div className={`flex items-center justify-center gap-4 text-rose/50 animate-pulse-slow ${className}`}>
        <span className="w-8 md:w-12 h-px bg-rose/30" />
        <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] uppercase font-sans whitespace-nowrap">
            ← {text} →
        </p>
        <span className="w-8 md:w-12 h-px bg-rose/30" />
    </div>
);

export const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-rose z-[999] origin-left"
            style={{ scaleX }}
        />
    );
};
