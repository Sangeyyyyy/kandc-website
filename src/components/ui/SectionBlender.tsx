export const SectionBlender = ({ position = 'bottom', className = '', intensity = 'h-64' }: { position?: 'top' | 'bottom', className?: string, intensity?: string }) => {
    return (
        <div className={`absolute inset-x-0 ${position === 'top' ? 'top-0 bg-gradient-to-b' : 'bottom-0 bg-gradient-to-t'} from-ink to-transparent ${intensity} z-30 pointer-events-none ${className}`} />
    );
};
