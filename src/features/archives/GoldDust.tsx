import { motion, AnimatePresence } from 'framer-motion';

export const GoldDust = ({ active }: { active: boolean }) => {
    const particles = Array.from({ length: 15 });
    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
            <AnimatePresence>
                {active && particles.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: 0,
                            y: 0,
                            scale: 0,
                            opacity: 1
                        }}
                        animate={{
                            x: (Math.random() - 0.5) * 300,
                            y: (Math.random() - 0.5) * 300,
                            scale: Math.random() * 1.5,
                            opacity: 0,
                            rotate: Math.random() * 360
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.8 + Math.random() * 0.4,
                            ease: "easeOut"
                        }}
                        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#fbbf24] mix-blend-screen"
                        style={{
                            filter: `blur(${Math.random() * 2}px)`
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
