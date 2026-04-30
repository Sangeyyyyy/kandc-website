import { useEffect, useRef } from 'react';

export const useMagnetic = (strength = 40) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
        
        const el = ref.current;
        if (!el) return;
        const onMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;
            el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
        };
        const onMouseLeave = () => { el.style.transform = ''; };
        el.addEventListener('mousemove', onMouseMove);
        el.addEventListener('mouseleave', onMouseLeave);
        return () => {
            el.removeEventListener('mousemove', onMouseMove);
            el.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [strength]);
    return ref;
};
