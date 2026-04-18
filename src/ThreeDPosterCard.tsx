import React, { useRef, useState } from 'react';

interface ThreeDPosterCardProps {
    baseImage: string;
    hoverImage: string;
    logoImage: string;
    backgroundImage?: string; // New environment layer
    className?: string;
    children?: React.ReactNode;
}

export const ThreeDPosterCard: React.FC<ThreeDPosterCardProps> = ({
    baseImage,
    hoverImage,
    logoImage,
    backgroundImage,
    className = '',
    children
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation based on mouse position relative to center
        // -0.5 to 0.5 range
        const xPct = (mouseX / width - 0.5) * 2; 
        const yPct = (mouseY / height - 0.5) * 2;

        // Limit rotation to ~20 degrees
        const rotateY = xPct * 20; 
        const rotateX = -yPct * 20;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div 
            ref={cardRef}
            className={`threed-card ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                /* @ts-ignore */
                '--rotate-x': `${rotate.x}deg`,
                '--rotate-y': `${rotate.y}deg`
            }}
        >
            <div className="threed-wrapper">
                {/* Layer 1: Base Poster (Not Hovered) */}
                <img src={baseImage} className="threed-layer-base" alt="Poster Base" />

                {/* Layer 2: Environment Background (Visible on hover) */}
                {backgroundImage && <img src={backgroundImage} className="threed-layer-bg" alt="" />}
                
                {/* Layer 2.5: Custom Content Overlay (Inserted behind subject) */}
                {children}

                {/* Layer 3: Character/Subject (Hovered) */}
                <img src={hoverImage} className="threed-layer-hover" alt="" />
                
                {/* Layer 4: Logo (Hovered) */}
                <img src={logoImage} className="threed-layer-logo" alt="" />
            </div>
        </div>
    );
};
