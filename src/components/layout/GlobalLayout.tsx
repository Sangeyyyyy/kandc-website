import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScroll } from 'framer-motion';
import { ModalProvider } from '../../context/ModalContext';
import { CustomCursor } from '../../CustomCursor';
import { FloatingCTA } from './FloatingCTA';
import { CalendlyModal } from '../modals/CalendlyModal';

export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollY } = useScroll();
    const [showFloating, setShowFloating] = useState(false);
    const location = useLocation();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            if (location.pathname === '/') {
                setShowFloating(latest > window.innerHeight * 1.5);
            } else {
                setShowFloating(latest > 100);
            }
        });
    }, [scrollY, location.pathname]);

    useEffect(() => {
        if (location.pathname !== '/') {
            setShowFloating(window.scrollY > 100);
        } else {
            setShowFloating(window.scrollY > window.innerHeight * 1.5);
        }
    }, [location.pathname]);

    // Handle Dynamic Page Titles
    useEffect(() => {
        const path = location.pathname;
        const baseTitle = "Kelsey & Company";
        
        const titles: { [key: string]: string } = {
            "/": baseTitle,
            "/who-we-are": `Who We Are | ${baseTitle}`,
            "/services": `Services | ${baseTitle}`,
            "/our-work": `Our Work | ${baseTitle}`,
            "/upcoming-events": `Upcoming Events | ${baseTitle}`,
            "/services-test": `Test Page | ${baseTitle}`
        };

        document.title = titles[path] || baseTitle;
    }, [location.pathname]);

    // We implement the internal provider pattern here but proxy the open/close state through it, 
    // actually wait - ModalProvider creates its own state. 
    // Since we need to control CalendlyModal directly, we can either put CalendlyModal inside ModalProvider 
    // or pass the state down. Let's use ModalProvider correctly.

    return (
        <ModalProvider>
            <div className="relative">
                <CustomCursor />
                {children}
                <ModalConsumer showFloating={showFloating} />
            </div>
        </ModalProvider>
    );
};

// Helper component to access ModalContext within GlobalLayout
import { useModal } from '../../context/ModalContext';
const ModalConsumer = ({ showFloating }: { showFloating: boolean }) => {
    const { isModalOpen, closeModal, openModal } = useModal();
    return (
        <>
            <FloatingCTA 
                show={showFloating} 
                onClick={openModal} 
            />
            <CalendlyModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};
