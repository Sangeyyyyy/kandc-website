import { useState, useEffect, useRef } from 'react';

export const StatCounter = ({ to, duration = 1.5 }: { to: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const [hasRun, setHasRun] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasRun) {
                    setHasRun(true);
                    let start = 0;
                    const end = to;
                    if (start === end) return;

                    const incrementTime = (duration * 1000) / end;
                    const timer = setInterval(() => {
                        start += 1;
                        setCount(start);
                        if (start >= end) clearInterval(timer);
                    }, incrementTime);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, [to, duration, hasRun]);

    return <span ref={elementRef}>{count}</span>;
};
