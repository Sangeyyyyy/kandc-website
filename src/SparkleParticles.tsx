import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const SparkleParticles = React.memo(({ opacity }: { opacity?: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        if (prefersReduced) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const numParticles = width < 768 ? 60 : 120;
        const particles: { x: number, y: number, radius: number, alpha: number, speedY: number, glowSpeed: number }[] = [];

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.2 + 0.2, 
                alpha: Math.random(),
                speedY: Math.random() * 0.4 + 0.1,
                glowSpeed: Math.random() * 0.01 + 0.005 
            });
        }

        let animationFrameId: number;
        let lastScrollY = window.scrollY;
        
        const render = () => {
             const currentScrollY = window.scrollY;
             const scrollDiff = currentScrollY - lastScrollY;
             lastScrollY = currentScrollY;

             ctx.clearRect(0, 0, width, height);
             ctx.globalCompositeOperation = 'screen';

             for (let i = 0; i < numParticles; i++) {
                 const p = particles[i];
                 
                 p.y -= p.speedY; 
                 p.y -= scrollDiff * 0.015 * p.speedY;

                 p.alpha += p.glowSpeed;
                 if (p.alpha >= 0.8 || p.alpha <= 0.1) {
                     p.glowSpeed = -p.glowSpeed;
                 }
                 
                 if (p.y < -10) {
                     p.y = height + 10;
                     p.x = Math.random() * width;
                 } else if (p.y > height + 10) {
                     p.y = -10;
                 }

                 const a = Math.max(0, p.alpha);
                 
                 ctx.beginPath();
                 ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                 ctx.fillStyle = `rgba(238, 192, 191, ${a})`;
                 ctx.fill();
                 
                 if (p.radius > 0.8) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(238, 192, 191, ${a * 0.3})`;
                    ctx.fill();
                 }
             }
             
             animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
             width = canvas.width = window.innerWidth;
             height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            style={{ opacity: opacity || 1 }}
            className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
        />
    );
});
