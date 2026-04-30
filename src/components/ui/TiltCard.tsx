import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    const springConfig = { damping: 20, stiffness: 200, mass: 1 };
    const smoothRotateX = useSpring(rotateX, springConfig);
    const smoothRotateY = useSpring(rotateY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = (e.clientX - rect.left) / width - 0.5;
        const y = (e.clientY - rect.top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <div 
            ref={ref}
            style={{ perspective: 1000 }}
            className={`w-full h-full relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                mouseX.set(0);
                mouseY.set(0);
            }}
        >
            <motion.div
                style={{
                    rotateX: isHovered ? smoothRotateX : 0,
                    rotateY: isHovered ? smoothRotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative"
            >
                {/* Parallax Content Container */}
                <div style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(0px)", transition: "transform 0.5s ease-out" }} className="w-full h-full">
                    {children}
                </div>
                
                {/* Responsive Glare Effect */}
                <motion.div 
                    className="absolute inset-x-0 inset-y-0 z-50 pointer-events-none rounded-sm transition-opacity duration-500"
                    style={{
                        background: isHovered ? `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)` : 'transparent',
                        opacity: isHovered ? 1 : 0,
                    }}
                />
            </motion.div>
        </div>
    );
};
