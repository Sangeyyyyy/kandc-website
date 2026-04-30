import React from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

export const MagneticWrapper = ({ children, className = '', strength = 40 }: { children: React.ReactNode, className?: string, strength?: number }) => {
    const ref = useMagnetic(strength);
    return <div ref={ref} className={`magnetic-button inline-block ${className}`}>{children}</div>;
};
