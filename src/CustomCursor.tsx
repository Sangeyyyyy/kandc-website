import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Target specific interactive elements
            const isClickable = target.closest('a, button, .magnetic-button');
            const isProject = target.closest('.group'); // Covers Our Work / Services cards
            
            if (isClickable || isProject) {
                setIsHovering(true);
                
                // Optional context text
                if (isProject && !isClickable) {
                    setHoverText('VIEW');
                } else if (target.closest('.overflow-x-auto')) {
                    setHoverText('DRAG');
                } else {
                    setHoverText('');
                }
            } else {
                setIsHovering(false);
                setHoverText('');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999] flex items-center justify-center mix-blend-difference"
            style={{ x: cursorXSpring, y: cursorYSpring }}
        >
            <motion.div
                animate={{
                    width: isHovering ? (hoverText ? 64 : 48) : 8,
                    height: isHovering ? (hoverText ? 64 : 48) : 8,
                    opacity: 1,
                    backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,1)',
                    border: isHovering ? '1px solid rgba(255,255,255,0.5)' : 'none',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            >
                {hoverText && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[0.45rem] tracking-[0.2em] uppercase font-sans text-white text-center"
                    >
                        {hoverText}
                    </motion.span>
                )}
            </motion.div>
        </motion.div>
    );
};
