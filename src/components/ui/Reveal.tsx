import React from 'react';
import { useInView } from '../../hooks/useInView';

export const Reveal = ({
    children,
    className = '',
    delay = 0,
    onClick,
    mode = 'slide' // 'slide' or 'mask'
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    onClick?: () => void;
    mode?: 'slide' | 'mask';
}) => {
    const [ref, visible] = useInView();
    
    if (mode === 'mask') {
        return (
            <div ref={ref} className={`overflow-hidden ${className}`}>
                <div 
                    className={`mask-inner ${visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                        animationPlayState: visible ? 'running' : 'paused',
                        animationDelay: `${delay}ms` 
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${className}`}
            style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
};
