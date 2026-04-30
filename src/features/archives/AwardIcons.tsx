import { motion } from 'framer-motion';

export const AwardIcon = ({ type, className = "" }: { type: string; className?: string }) => {
    const t = type.toLowerCase();

    // Gradient definitions are handled in index.css or inline
    const goldGradient = "url(#gold-gradient)";

    if (t.includes('academy') || t.includes('oscar')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className} role="img" aria-label="Academy Award">
                <defs>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDB931" />
                        <stop offset="50%" stopColor="#9E7E38" />
                        <stop offset="100%" stopColor="#FDB931" />
                    </linearGradient>
                </defs>
                <path d="M12 2L9 7H15L12 2Z" fill={goldGradient} />
                <path d="M10 7H14V17H10V7Z" fill={goldGradient} />
                <path d="M8 17H16V19H8V17Z" fill={goldGradient} />
                <path d="M7 19H17V21H7V19Z" fill={goldGradient} />
                <path d="M12 4.5L10.5 7H13.5L12 4.5Z" fill="#FFF" fillOpacity="0.3" />
            </svg>
        );
    }

    if (t.includes('bafta')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className} role="img" aria-label="BAFTA Award">
                <path d="M12 2C7.58 2 4 5.58 4 10C4 13.5 6.25 16.5 9.38 17.61L10.5 21H13.5L14.62 17.61C17.75 16.5 20 13.5 20 10C20 5.58 16.42 2 12 2ZM12 16C8.69 16 6 13.31 6 10C6 6.69 8.69 4 12 4C15.31 4 18 6.69 18 10C18 13.31 15.31 16 12 16Z" fill="url(#gold-gradient)" />
                <circle cx="9" cy="9" r="1.5" fill="url(#gold-gradient)" />
                <circle cx="15" cy="9" r="1.5" fill="url(#gold-gradient)" />
                <path d="M9 13C9 13 10.5 14.5 12 14.5C13.5 14.5 15 13 15 13" stroke="url(#gold-gradient)" strokeWidth="1" strokeLinecap="round" />
            </svg>
        );
    }

    if (t.includes('grammy')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className} role="img" aria-label="Grammy Award">
                <path d="M5 19H19V21H5V19Z" fill="url(#gold-gradient)" />
                <path d="M7 17H17V19H7V17Z" fill="url(#gold-gradient)" />
                <path d="M12 17C10.5 17 8 16 8 13V11C8 9.34 9.34 8 11 8H13V17H12Z" fill="url(#gold-gradient)" />
                <path d="M13 3L13 11H17C18.66 11 20 12.34 20 14V17H13V3Z" fill="url(#gold-gradient)" />
                <circle cx="11.5" cy="11.5" r="2.5" stroke="url(#gold-gradient)" strokeWidth="1" />
            </svg>
        );
    }

    if (t.includes('critics')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className} role="img" aria-label="Critics Choice Award">
                <path d="M12 2L14.5 8.5L21.5 9.5L16.5 14.5L17.5 21.5L12 18L6.5 21.5L7.5 14.5L2.5 9.5L9.5 8.5L12 2Z" fill="url(#gold-gradient)" />
                <path d="M11 18H13V22H11V18Z" fill="url(#gold-gradient)" opacity="0.5" />
            </svg>
        );
    }

    if (t.includes('globe')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className} role="img" aria-label="Golden Globe Award">
                <circle cx="12" cy="8" r="6" fill="url(#gold-gradient)" />
                <path d="M12 2V14M6 8H18" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" />
                <path d="M10 14H14V20H10V14Z" fill="url(#gold-gradient)" />
                <path d="M8 20H16V22H8V20Z" fill="url(#gold-gradient)" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} role="img" aria-label={`${type} Award`}>
            <path d="M12 2L15 8H21L16 12L18 18L12 14L6 18L8 12L3 8H9L12 2Z" fill="url(#gold-gradient)" />
        </svg>
    );
};

export const FloatingAwardIcon = ({ type }: { type: string }) => {
    return (
        <motion.div
            animate={{
                y: [0, -10, 0],
                rotateZ: [-1, 1, -1]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="relative z-30 drop-shadow-[0_20px_40px_rgba(253,185,49,0.2)]"
        >
            <AwardIcon type={type} className="h-28 md:h-36 w-auto" />
        </motion.div>
    );
};
