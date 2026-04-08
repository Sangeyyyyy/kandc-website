import React, { useRef, useEffect } from 'react';
import { MotionValue } from 'framer-motion';

export const DiamondEdgeSparkles = React.memo(({ progress }: { progress: MotionValue<number> }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        type Particle = { x: number, y: number, vx: number, vy: number, life: number, maxLife: number, radius: number, active: boolean };
        
        // --- OBJECT POOL ---
        const MAX_PARTICLES = 300; 
        const particles: Particle[] = Array.from({ length: MAX_PARTICLES }, () => ({
            x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, radius: 0, active: false
        }));

        let lastP = progress.get();

        const render = () => {
            const currentP = progress.get();
            const dp = currentP - lastP;
            lastP = currentP;

            let clampedP = (currentP - 0.1) / 0.7;
            if (clampedP < 0) clampedP = 0;
            if (clampedP > 1) clampedP = 1;

            const X_vw = clampedP * 150;
            const X_px = (X_vw / 100) * width; 
            
            const cx = width / 2;
            const cy = height / 2;

            if (Math.abs(dp) > 0.00001 && clampedP > 0 && clampedP < 1) {
                let spawnCount = Math.floor(Math.abs(dp) * 5000); 
                if (spawnCount > 50) spawnCount = 50; 

                let spawned = 0;
                for (let i = 0; i < MAX_PARTICLES && spawned < spawnCount; i++) {
                    if (!particles[i].active) {
                        const edge = Math.floor(Math.random() * 4);
                        const t = Math.random();
                        let px = 0, py = 0;
                        
                        if (edge === 0) { // Top to Right
                            px = cx + t * X_px;
                            py = (cy - X_px) + t * X_px;
                        } else if (edge === 1) { // Right to Bottom
                            px = (cx + X_px) - t * X_px;
                            py = cy + t * X_px;
                        } else if (edge === 2) { // Bottom to Left
                            px = cx - t * X_px;
                            py = cy + X_px - t * X_px;
                        } else if (edge === 3) { // Left to Top
                            px = cx - X_px + t * X_px;
                            py = cy - t * X_px;
                        }

                        const scatter = Math.random() * 10 - 5;
                        
                        particles[i].active = true;
                        particles[i].x = px + scatter;
                        particles[i].y = py + scatter;
                        particles[i].vx = (Math.random() - 0.5) * 3;
                        particles[i].vy = (Math.random() - 0.5) * 3 - Math.sign(dp) * 2;
                        particles[i].life = 0;
                        particles[i].maxLife = Math.random() * 20 + 20;
                        particles[i].radius = Math.random() * 1.5 + 0.5;
                        spawned++;
                    }
                }
            }

            ctx.clearRect(0, 0, width, height);
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'screen';
            
            for (let i = 0; i < MAX_PARTICLES; i++) {
                const p = particles[i];
                if (!p.active) continue;

                p.x += p.vx;
                p.y += p.vy;
                p.life++;

                const lifeRatio = p.life / p.maxLife;
                if (lifeRatio >= 1) {
                    p.active = false;
                    continue;
                }

                const alpha = (1 - lifeRatio) * Math.min(1, lifeRatio * 4);
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(238, 192, 191, ${alpha * 0.25})`;
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            }

            requestAnimationFrame(render);
        };

        const animId = requestAnimationFrame(render);

        const handleResize = () => {
             width = canvas.width = window.innerWidth;
             height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
             cancelAnimationFrame(animId);
             window.removeEventListener('resize', handleResize);
        };
    }, [progress]);

    return (
        <canvas ref={canvasRef} className="absolute inset-0 z-[25] pointer-events-none mix-blend-screen" />
    );
});
