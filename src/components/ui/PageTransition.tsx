import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState('entering');

    useEffect(() => {
        if (location !== displayLocation) {
            setTransitionStage('exiting');
        }
    }, [location, displayLocation]);

    const onAnimationEnd = () => {
        if (transitionStage === 'exiting') {
            setTransitionStage('entering');
            setDisplayLocation(location);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="relative">
            {/* Curtain Overlay */}
            <div 
                key={location.pathname}
                onAnimationEnd={onAnimationEnd}
                className="fixed inset-0 z-[5000] bg-ink pointer-events-none curtain-entrance flex items-center justify-center font-serif text-cream italic text-6xl"
                style={{ 
                    animationDirection: transitionStage === 'entering' ? 'normal' : 'reverse',
                    animationDuration: '0.8s'
                }}
            >
            </div>
            <div className={transitionStage === 'entering' ? 'opacity-100' : 'opacity-0 transition-opacity duration-300'}>
                {children}
            </div>
        </div>
    );
};
