import { useState, useEffect } from 'react';
import {
    Reveal,
    TopNav,
    useModal,
    FooterCTA,
    UtilityFooter,
    TiltCard
} from './SharedComponents';
import { getAssetUrl } from './utils/assets';
import './index.css';

// ─── PROJECT DATA ─────────────────────────────────────────────────────────────
const projects = [
    {
        id: 1,
        title: 'Sinners',
        category: 'Experiential, Integrated Activations & Premieres',
        client: 'Warner Bros. Pictures',
        year: '2024',
        role: 'Activation Strategy & Creative Production',
        img: getAssetUrl('/assets/posters/sinners.jpg'),
        video: getAssetUrl('/assets/sinners/sinners video.mp4'),
        teaserImg: getAssetUrl('/assets/posters/sinners.jpg'),
        teaser: 'A cinematic premiere event that redefined the red carpet experience.',
        description: `Kelsey & Company partnered with Warner Bros. to produce the premiere activation for Sinners—a full-scale, immersive launch experience that blurred the line between film and lived reality. Our team curated every touchpoint of the evening, from spatial architecture to talent coordination.`,
        deliverables: ['Red Carpet Production', 'VIP Experience Design', 'Media & Press Coordination', 'Live Brand Activation'],
        subtitle: 'Warner Bros. Pictures Production',
        highlight: 'Premiere Launch',
        themeLabel: 'CREATIVE PRODUCTION & ACTIVATION',
        themeDescription: 'Kelsey & Company partnered with Warner Bros. to produce the premiere activation for Sinners—a full-scale, immersive launch experience that blurred the line between film and lived reality. Our team curated every touchpoint of the evening, from spatial architecture to talent coordination.',
        scaleValue: 'Global Premiere Event',
        gallery: [
            getAssetUrl('/assets/sinners/sinners .png'),
            getAssetUrl('/assets/sinners/sinners 1.png'),
            getAssetUrl('/assets/sinners/sinners 2.png'),
            getAssetUrl('/assets/sinners/sinners 3.png'),
            getAssetUrl('/assets/sinners/sinners 4.png'),
            getAssetUrl('/assets/sinners/sinners 5.png'),
            getAssetUrl('/assets/sinners/sinners 6.png'),
            getAssetUrl('/assets/sinners/sinners brochure.png'),
            getAssetUrl('/assets/sinners/sinners poster.png'),
            getAssetUrl('/assets/posters/sinners front.jpg'),
            getAssetUrl('/assets/posters/sinners.jpg')
        ],
    },
    {
        id: 2,
        title: 'Tron: Ares',
        category: 'Experiential, Integrated Activations & Premieres',
        client: 'Walt Disney Studios',
        year: '2025',
        role: 'Integrated Marketing & Brand Activation',
        img: getAssetUrl('/assets/posters/tron.jpeg'),
        teaserImg: getAssetUrl('/assets/posters/tron.jpeg'),
        teaser: 'A neon-drenched, world-building marketing campaign built for the digital age.',
        description: 'For the long-awaited Tron: Ares, K&C was brought on to lead the integrated activation strategy. We designed an immersive digital-physical campaign spanning pop-up experiences, social amplification, and influencer integration that captured the film\'s futuristic energy.',
        deliverables: ['Pop-Up Experience Design', 'Influencer & Talent Relations', 'Digital Content Strategy', 'Launch Event Production'],
        subtitle: 'Walt Disney Studios Campaign',
        highlight: 'Digital Identity',
        themeLabel: 'INTEGRATED MARKETING STRATEGY',
        themeDescription: 'For the long-awaited Tron: Ares, K&C was brought on to lead the integrated activation strategy. We designed an immersive digital-physical campaign spanning pop-up experiences, social amplification, and influencer integration that captured the film\'s futuristic energy.',
        scaleValue: 'Multi-Market Integration',
        gallery: [getAssetUrl('/assets/posters/tron.jpeg'), getAssetUrl('/assets/posters/tron.jpeg')],
    },
    {
        id: 3,
        title: 'Zootopia',
        category: 'Brand Partnerships',
        client: 'Walt Disney Animation',
        year: '2023',
        role: 'Brand Partnership Management',
        img: getAssetUrl('/assets/posters/zootopia.jpg'),
        teaserImg: getAssetUrl('/assets/posters/zootopia.jpg'),
        teaser: 'Strategic partnerships that extended the world of Zootopia into everyday culture.',
        description: `K&C curated and managed a suite of co-branded partnerships for the Zootopia franchise, connecting the animated world with premium lifestyle brands. Our curation drove unprecedented cultural penetration and brand affinity across key demographics.`,
        deliverables: ['Brand Partner Curation', 'Co-Branded Campaign Strategy', 'Deal Negotiation & Execution', 'Cultural Alignment Oversight'],
        subtitle: 'Disney Animation Franchise',
        highlight: 'Co-Branded Fusion',
        themeLabel: 'PARTNERSHIP MANAGEMENT',
        themeDescription: 'K&C curated and managed a suite of co-branded partnerships for the Zootopia franchise, connecting the animated world with premium lifestyle brands. Our curation drove unprecedented cultural penetration and brand affinity across key demographics.',
        scaleValue: '360° Partner Integration',
        gallery: [getAssetUrl('/assets/posters/zootopia.jpg'), getAssetUrl('/assets/posters/zootopia.jpg')],
    },
    {
        id: 4,
        title: 'Avatar',
        category: 'Experiential, Integrated Activations & Premieres',
        client: '20th Century Studios',
        year: '2023',
        role: 'Experiential Production Lead',
        img: getAssetUrl('/assets/posters/avatar.jpeg'),
        teaserImg: getAssetUrl('/assets/posters/avatar.jpeg'),
        teaser: 'An otherworldly launch experience that transported audiences to Pandora.',
        description: `For Avatar: The Way of Water, Kelsey & Company designed and produced an immersive theatrical world-preview event. Guests were transported through the film's oceanic environments via multi-sensory staging, setting a new benchmark for blockbuster experiential marketing.`,
        deliverables: ['Immersive Environment Design', 'Multi-Sensory Event Production', 'Talent & Talent Management', 'Press Activation Strategy'],
        subtitle: '20th Century Studios Experience',
        highlight: 'Pandora Immersion',
        themeLabel: 'EXPERIENTIAL PRODUCTION',
        themeDescription: 'For Avatar: The Way of Water, Kelsey & Company designed and produced an immersive theatrical world-preview event. Guests were transported through the film\'s oceanic environments via multi-sensory staging, setting a new benchmark for blockbuster experiential marketing.',
        scaleValue: 'Multi-Sensory World Building',
        gallery: [getAssetUrl('/assets/posters/avatar.jpeg'), getAssetUrl('/assets/posters/avatar.jpeg')],
    },
    {
        id: 5,
        title: 'Hoppers',
        category: 'Experiential, Integrated Activations & Premieres',
        client: 'Netflix',
        year: '2024',
        role: 'Live Experience Production',
        img: getAssetUrl('/assets/posters/hoppers.jpeg'),
        teaserImg: getAssetUrl('/assets/posters/hoppers.jpeg'),
        teaser: 'A live-to-screen event series that brought Netflix\'s biggest series to life.',
        description: 'Kelsey & Company produced the live experience strategy for Netflix\'s Hoppers series, converting episodic storytelling into a set of curated live events. From intimate screenings to large-scale activations, each event deepened fan engagement and drove cultural conversation.',
        deliverables: ['Live Event Series', 'Fan Engagement Strategy', 'Venue Production & Staffing', 'Social Media Amplification'],
        subtitle: 'Netflix Event Series',
        highlight: 'Live Narrative',
        themeLabel: 'LIVE EXPERIENCE STRATEGY',
        themeDescription: 'Kelsey & Company produced the live experience strategy for Netflix\'s Hoppers series, converting episodic storytelling into a set of curated live events. From intimate screenings to large-scale activations, each event deepened fan engagement and drove cultural conversation.',
        scaleValue: 'Nationwide Activation',
        gallery: [getAssetUrl('/assets/posters/hoppers.jpeg'), getAssetUrl('/assets/posters/hoppers.jpeg')],
    },
    {
        id: 6,
        title: 'The Devil Wears Prada 2',
        category: 'Strategic Partnerships',
        client: 'Fox Entertainment',
        year: '2025',
        role: 'Strategic Brand & Fashion Partnerships',
        img: getAssetUrl('/assets/posters/devil wears prada.jpg'),
        teaserImg: getAssetUrl('/assets/posters/devil wears prada.jpg'),
        teaser: 'A fashion-forward partnership strategy that made the world pay attention.',
        description: `For the highly anticipated sequel, K&C architected the fashion and luxury brand partnership strategy. We brokered relationships with top-tier fashion houses, coordinated editorial integrations, and produced a press preview event that set the tone for the entire campaign.`,
        deliverables: ['Luxury Fashion Partnerships', 'Editorial Integration', 'Press Preview Production', 'Global Brand Strategy'],
        subtitle: 'Fox Entertainment Strategic Tie-ins',
        highlight: 'Fashion Forward',
        themeLabel: 'LUXURY BRAND STRATEGY',
        themeDescription: 'For the highly anticipated sequel, K&C architected the fashion and luxury brand partnership strategy. We brokered relationships with top-tier fashion houses, coordinated editorial integrations, and produced a press preview event that set the tone for the entire campaign.',
        scaleValue: 'Global Luxury Strategy',
        gallery: [getAssetUrl('/assets/posters/devil wears prada.jpg'), getAssetUrl('/assets/posters/devil wears prada.jpg')],
    },
    {
        id: 7,
        title: 'BET+',
        category: 'Creative Production',
        client: 'Black Entertainment Television',
        year: '2024',
        role: 'Activation Strategy & Content Production',
        img: getAssetUrl('/assets/BET+/BET+.png'),
        video: getAssetUrl('/assets/BET+/BET+ Is the Cookout .mp4'),
        teaserImg: getAssetUrl('/assets/BET+/BET+.png'),
        teaser: 'Strategic content production and activation for the premier streaming service for Black culture.',
        description: 'Kelsey & Company collaborated with BET+ to develop and execute a comprehensive activation strategy. We focused on high-impact content production and cultural storytelling that resonated deeply with the platform\'s audience, strengthening its position as a cultural leader.',
        deliverables: ['Content Production', 'Activation Strategy', 'Culture-First Storytelling', 'Brand Integration'],
        subtitle: 'BET+ Content Strategy',
        highlight: 'Culture First',
        themeLabel: 'CONTENT PRODUCTION',
        themeDescription: 'Kelsey & Company collaborated with BET+ to develop and execute a comprehensive activation strategy. We focused on high-impact content production and cultural storytelling that resonated deeply with the platform\'s audience, strengthening its position as a cultural leader.',
        scaleValue: 'Streaming Content Reach',
        gallery: [getAssetUrl('/assets/BET+/BET+.png'), getAssetUrl('/assets/BET+/BET+.png')],
    },
    {
        id: 8,
        title: 'Jason Harvey',
        category: 'Executive Brand Partnership',
        client: 'Blue Blood',
        year: '2023',
        role: 'Brand Partnership & Creative Direction',
        img: getAssetUrl('/assets/jason harvey/jason harvey.png'),
        video: getAssetUrl('/assets/jason harvey/jason harvey video.mp4'),
        teaserImg: getAssetUrl('/assets/jason harvey/JasonHarveyLogo_Bug.png'),
        teaser: 'Elevating creative direction and strategic partnerships for Jason Harvey\'s Blue Blood.',
        description: 'We provided creative direction and managed strategic brand partnerships for Jason Harvey and his Blue Blood initiative. Our work bridged the gap between high fashion and cultural impact, creating meaningful connections with premium brands.',
        deliverables: ['Creative Direction', 'Brand Partnership Management', 'Strategic Positioning', 'Talent Curation'],
        subtitle: 'EVP, Head of Paramount\'s BET+',
        highlight: '4 Stages',
        themeLabel: 'SENIOR DIRECTOR LEVEL - BRAND MANAGEMENT',
        themeDescription: 'Kelsey & Company supports Jason Harvey as his primary brand manager. Our engagement functions at a senior director level across strategy, planning, and execution — including complex brand high-stakes bookings, coordination, and overarching multi-platform development.',
        scaleValue: 'Proven Engaging Speaker',
        bookPdf: getAssetUrl('/assets/jason harvey/LeavingMoney-JasonEHarvey (1) (1).pdf'),
        pressKitPdf: getAssetUrl('/assets/jason harvey/Jason-Harvey-Visionary-Tech-and-Media-Executive_Aug_2025.key.pdf'),
        gallery: [
            getAssetUrl('/assets/jason harvey/jason harvey.png'),
            getAssetUrl('/assets/jason harvey/jason harvey 1.png'),
            getAssetUrl('/assets/jason harvey/jason harvey 2.png'),
            getAssetUrl('/assets/jason harvey/Copy of Jason H Speaks Adweek house.png'),
            getAssetUrl('/assets/jason harvey/ChinaPanelnuggets1.jpeg'),
            getAssetUrl('/assets/jason harvey/IMG_0343.jpeg'),
            getAssetUrl('/assets/jason harvey/IMG_2125.jpeg'),
            getAssetUrl('/assets/jason harvey/IMG_2543.jpeg'),
            getAssetUrl('/assets/jason harvey/gettyimages-2264115507-612x612.jpg')
        ],
    },
    {
        id: 9,
        title: 'Sneaker Ball',
        category: 'Live Experiences',
        client: 'Sneaker Ball Gala',
        year: '2024',
        role: 'Event Production & Strategy',
        img: getAssetUrl('/assets/sneaker ball/sneakerball.png'),
        teaserImg: getAssetUrl('/assets/sneaker ball/sneakerball.png'),
        teaser: 'Where luxury meets street culture in an annual celebratory gala.',
        description: 'K&C led the production and strategic planning for the Sneaker Ball, a unique event that celebrates the intersection of luxury fashion and sneaker culture. We managed everything from venue transformation to guest experience and cultural programming.',
        deliverables: ['Event Production', 'Spatial Design', 'Guest Experience Strategy', 'Talent Programming'],
        subtitle: 'Sneaker Ball Gala Strategy',
        highlight: 'Street Luxury',
        themeLabel: 'EVENT PRODUCTION',
        themeDescription: 'K&C led the production and strategic planning for the Sneaker Ball, a unique event that celebrates the intersection of luxury fashion and sneaker culture. We managed everything from venue transformation to guest experience and cultural programming.',
        scaleValue: 'Premium Gala Experience',
        gallery: [getAssetUrl('/assets/sneaker ball/sneakerball.png'), getAssetUrl('/assets/sneaker ball/sneakerball.png')],
    },
    {
        id: 10,
        title: 'Spike Lee',
        category: 'Creative Production',
        client: 'Creative Conversations',
        year: '2023',
        role: 'Executive Production & Curation',
        img: getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/9D59202B-5E08-4F1F-8FB4-DE0B60EAC5CC.poster.JPG'),
        teaserImg: getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/9D59202B-5E08-4F1F-8FB4-DE0B60EAC5CC.poster.JPG'),
        teaser: 'An intimate, high-impact conversation with a legendary filmmaker.',
        description: 'We executive produced and curated an exclusive fireside chat with Spike Lee. This high-profile event focused on the power of storytelling and cultural impact, providing an intimate platform for one of cinema\'s most influential voices.',
        deliverables: ['Executive Production', 'Talent Curation', 'Set Design & Staging', 'Press Coordination'],
        subtitle: 'Spike Lee Fireside Chat',
        highlight: 'Cultural Voice',
        themeLabel: 'EXECUTIVE PRODUCTION',
        themeDescription: 'We executive produced and curated an exclusive fireside chat with Spike Lee. This high-profile event focused on the power of storytelling and cultural impact, providing an intimate platform for one of cinema\'s most influential voices.',
        scaleValue: 'Direct Talent Management',
        gallery: [
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/9D59202B-5E08-4F1F-8FB4-DE0B60EAC5CC.poster.JPG'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/097092A5-2DFA-42E8-908A-D246FFF2C967_4_5005_c.jpeg'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/0A47E56A-4AC9-44A3-86AE-25F5B2EFBDEF_4_5005_c.jpeg'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/0B3648C1-7949-4D36-856E-0401E343B1AA.JPG'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/0B9BC777-27AB-47EC-9770-89E54E5EE775.JPG'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/0BBD07DF-229D-45C9-B339-ED6078A47A7D.JPG'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/1FFB132C-3D82-40F5-9A90-83904B4F8580.JPG'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/41D6B12A-636A-49AC-B951-9A1AB7234CC9_4_5005_c.jpeg'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/925DF716-D0DC-4157-83F3-172E9AA6335B_4_5005_c.jpeg'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/93397C95-4601-4D48-9660-0B6D7E1389EA_4_5005_c.jpeg'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/9D59202B-5E08-4F1F-8FB4-DE0B60EAC5CC.poster.JPG'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/9D59202B-5E08-4F1F-8FB4-DE0B60EAC5CC_4_5005_c.jpeg'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/C9070FC2-3617-4B04-BC72-9F033B72B76D.poster (1).JPG'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/C9070FC2-3617-4B04-BC72-9F033B72B76D.poster.JPG'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/D441AE26-BD60-4A00-8833-5FFEC1DE2D84_4_5005_c.jpeg'),
            getAssetUrl('/assets/Spike Lee Fireside Chat (BTS)/D9CD118B-69B1-4DBA-A564-1BA8CABD52BC_4_5005_c.jpeg')
        ],
    },
    {
        id: 11,
        title: 'Creatives at Sea',
        category: 'Event Producing and Programming',
        client: 'Juneteenth Celebration',
        year: '2024',
        role: 'Event Production & Curation',
        img: getAssetUrl('/assets/creatives at sea/creatives at sea.png'),
        teaserImg: getAssetUrl('/assets/creatives at sea/creatives at sea.png'),
        teaser: 'A Juneteenth celebration promoting diversity in media on the water.',
        description: 'A Juneteenth celebration promoting diversity in media, featuring an insightful panel w/ NAACP president, CBS & Roc Nation executives. The exclusive event offered networking on the water, lite bites, signature cocktails, and an unforgettable mix of conversation and music.',
        deliverables: ['Insightful Panel Coordination', 'Networking Event Production', 'Signature Cocktail Curation', 'Live Music & Conversation'],
        subtitle: 'Diversity in Media Panel',
        highlight: 'Juneteenth',
        themeLabel: 'JUNETEENTH CELEBRATION',
        themeDescription: 'A Juneteenth celebration promoting diversity in media, featuring an insightful panel w/ NAACP president, CBS & Roc Nation executives. The exclusive event offered networking on the water, lite bites, signature cocktails, and an unforgettable mix of conversation and music.',
        scaleValue: 'Capacity | 120 people',
        gallery: [
            getAssetUrl('/assets/creatives at sea/creatives at sea.png'),
            getAssetUrl('/assets/creatives at sea/creatives at sea 1.png'),
            getAssetUrl('/assets/creatives at sea/creatives at sea 2.png'),
            getAssetUrl('/assets/creatives at sea/creatives at sea 3.png')
        ],
    },
    {
        id: 12,
        title: 'Spike Lee Dinner',
        category: 'Event Producing and Programming',
        client: 'Cannes Lions 2023',
        year: '2023',
        role: 'Event Production & Strategy',
        img: getAssetUrl('/assets/spike lee dinner/spike lee dinner 1.png'),
        teaserImg: getAssetUrl('/assets/spike lee dinner/spike lee dinner 1.png'),
        teaser: 'A luxurious 5-course meal powered by Jordan Brand for 50 top creatives.',
        description: '50 top creatives and executives enjoyed a luxurious 5-course meal, with each guest presenting their creative cause. The night concluded with an exclusive Spike Lee-branded Jordan drop, signing, and personalized merch for all attendees.',
        deliverables: ['5-Course Luxurious Meal', 'Creative Cause Presentations', 'Exclusive Jordan Drop', 'Personalized Merch & Signing'],
        subtitle: 'Powered by Jordan Brand',
        highlight: 'Jordan Brand',
        themeLabel: 'LUXURY DINNER EXPERIENCE',
        themeDescription: '50 top creatives and executives enjoyed a luxurious 5-course meal, with each guest presenting their creative cause. The night concluded with an exclusive Spike Lee-branded Jordan drop, signing, and personalized merch for all attendees.',
        scaleValue: 'Capacity | 50 guests',
        gallery: [
            getAssetUrl('/assets/spike lee dinner/spike lee dinner 1.png'),
            getAssetUrl('/assets/spike lee dinner/spike lee dinner.png'),
            getAssetUrl('/assets/spike lee dinner/spike lee dinner 2.png'),
            getAssetUrl('/assets/spike lee dinner/03A1307A-9BDE-4511-AE75-CAD027D829FA_1_105_c.jpeg'),
            getAssetUrl('/assets/spike lee dinner/0B3648C1-7949-4D36-856E-0401E343B1AA.JPG'),
            getAssetUrl('/assets/spike lee dinner/0F4514D5-BBF6-4C5C-8693-5BECE6012D48.JPG'),
            getAssetUrl('/assets/spike lee dinner/34017AB7-4935-4D27-AE74-F4C010F74EE1.JPG'),
            getAssetUrl('/assets/spike lee dinner/55C9A9D2-6B78-41F4-B07F-8CE97C902828.JPG'),
            getAssetUrl('/assets/spike lee dinner/84733DF7-1A5E-4167-B4EC-829F6CA34504.JPG'),
            getAssetUrl('/assets/spike lee dinner/E870BD89-51F3-489F-8AC6-544AED22DF90.JPG')
        ],
    },
    {
        id: 13,
        title: 'CEO/CMO Brunch',
        category: 'Event Producing and Programming',
        client: 'Industry Executives',
        year: '2024',
        role: 'Event Production & Programming',
        img: getAssetUrl('/assets/CMO brunch/CEOCMO BRUNCH.png'),
        teaserImg: getAssetUrl('/assets/CMO brunch/CEOCMO BRUNCH.png'),
        teaser: 'An intimate gathering with the industries most creative executives.',
        description: 'A small intimate gathering with some of the industries most creative executives. With brunch served hot, and the poetic accompaniment of Grammy award winner J.Ivy.',
        deliverables: ['Intimate Programming', 'Brunch Catering Coordination', 'Artist Performance Management', 'Executive Networking'],
        subtitle: 'Poetic Accompaniment by J.Ivy',
        highlight: 'Intimate Gathering',
        themeLabel: 'EXECUTIVE NETWORKING',
        themeDescription: 'A small intimate gathering with some of the industries most creative executives. With brunch served hot, and the poetic accompaniment of Grammy award winner J.Ivy.',
        scaleValue: 'Capacity | 50 People',
        gallery: [getAssetUrl('/assets/CMO brunch/CEOCMO BRUNCH.png')],
    },
    {
        id: 14,
        title: 'Logitech x Vice Luncheon',
        category: 'Event Producing and Programming',
        client: 'Logitech & Vice',
        year: '2023',
        role: 'Event Production & Management',
        img: getAssetUrl('/assets/logitech x vice luncheon/logitech x vice luncheon.png'),
        teaserImg: getAssetUrl('/assets/logitech x vice luncheon/logitech x vice luncheon.png'),
        teaser: 'A private, seated Luncheon and fireside chat for industry executives.',
        description: 'A private, seated Luncheon and fireside chat for industry executives powered by Logitech and Vice.',
        deliverables: ['Private Seated Luncheon', 'Fireside Chat Management', 'Partner Integration', 'Executive Guest Management'],
        subtitle: 'Powered by Logitech and Vice',
        highlight: 'Seated Luncheon',
        themeLabel: 'STRATEGIC PARTNERSHIP LUNCHEON',
        themeDescription: 'A private, seated Luncheon and fireside chat for industry executives powered by Logitech and Vice.',
        scaleValue: 'Capacity | 50 People',
        gallery: [getAssetUrl('/assets/logitech x vice luncheon/logitech x vice luncheon.png')],
    },
    {
        id: 15,
        title: 'Thought Leadership Brunch',
        category: 'Event Producing',
        client: 'Black at Cannes',
        year: '2023',
        role: 'Global Director and Producer',
        img: getAssetUrl('/assets/thought leadership brunch/thought leadership brunch.png'),
        teaserImg: getAssetUrl('/assets/thought leadership brunch/thought leadership brunch.png'),
        teaser: 'A premier summit celebrating global Black excellence.',
        description: 'As Global Director and Producer, I led the end-to-end execution of Black at Cannes, a premier summit celebrating global Black excellence. I managed an international team and global vendors to deliver high-level programming, ranging from executive-led panels to an exclusive gala for Nedbank. This world-class experience successfully connected top-tier industry leaders on a global stage. \n\nThought Leadership Brunch Cannes @ The Martinez',
        deliverables: ['High-level Programming', 'Executive-Led Panels', 'Exclusive Gala Execution', 'Global Vendor Management'],
        subtitle: 'Cannes @ The Martinez',
        highlight: 'Black at Cannes',
        themeLabel: 'GLOBAL BLACK EXCELLENCE',
        themeDescription: 'As Global Director and Producer, I led the end-to-end execution of Black at Cannes, a premier summit celebrating global Black excellence. I managed an international team and global vendors to deliver high-level programming, ranging from executive-led panels to an exclusive gala for Nedbank. This world-class experience successfully connected top-tier industry leaders on a global stage.',
        scaleValue: 'Thought Leadership Brunch',
        gallery: [
            getAssetUrl('/assets/thought leadership brunch/thought leadership brunch.png'),
            getAssetUrl('/assets/thought leadership brunch/thought leadership brunch 1.png'),
            getAssetUrl('/assets/thought leadership brunch/thought leadership brunch 2.png'),
            getAssetUrl('/assets/thought leadership brunch/thought leadership brunch 3.png'),
            getAssetUrl('/assets/thought leadership brunch/thought leadership brunch 4.png'),
            getAssetUrl('/assets/thought leadership brunch/thought leadership brunch poster 1.png'),
            getAssetUrl('/assets/thought leadership brunch/thought leadership brunch poster 2.png')
        ],
    },
];

type Project = typeof projects[0] & { video?: string };

// ─── PROJECT DETAIL PANEL ─────────────────────────────────────────────────────
const DetailPanel = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
    const { openModal } = useModal();
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                window.removeEventListener('keydown', handleEsc);
                document.body.style.overflow = '';
            };
        }
    }, [project, onClose]);

    if (!project) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-10"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-ink/95 backdrop-blur-md" />

            {/* Panel Container */}
            <div
                className="relative w-full max-w-[1400px] h-full md:h-[90vh] bg-ink flex flex-col md:flex-row overflow-hidden border border-rose/10 shadow-ember-intense"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'slideInRight 0.6s cubic-bezier(0.16,1,0.3,1) forwards' }}
            >
                {/* Left Column: Image / Video */}
                <div className={`relative w-full ${project.video ? 'md:w-[55%]' : 'md:w-[45%]'} h-[50vh] md:h-full overflow-hidden border-r border-cream/5 bg-ink`}>
                    {project.video ? (
                        <video 
                            src={project.video} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            className="w-full h-full object-contain transition-all duration-[2000ms]" 
                        />
                    ) : (
                        <img 
                            src={project.img} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-all duration-[2000ms]" 
                        />
                    )}
                    {/* Gradient only for images; for video keep it minimal so it doesn't obscure the frame */}
                    {!project.video && (
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                    )}
                    {project.video && (
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    )}
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-end">
                        <div className="mb-8">
                            <span className="text-cream/40 text-[0.6rem] tracking-[0.4em] uppercase mb-4 block">
                                {project.category} · {project.year}
                            </span>
                            <h2 className="text-6xl md:text-8xl font-serif text-cream leading-none tracking-tighter mb-4 uppercase">
                                {project.title}
                            </h2>
                            <p className="text-rose/80 font-serif italic text-xl md:text-2xl border-l-2 border-burgundy/40 pl-6 ml-1">
                                {project.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Narrative & Gallery */}
                <div className="flex-1 h-full overflow-y-auto bg-[#12080a] custom-scrollbar relative">
                    {/* Decorative Top Divider */}
                    <div className="sticky top-0 left-0 right-0 h-1 bg-burgundy/40 z-50" />
                    
                    {/* Close Button - Anchored to right column */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-cream/5 border border-cream/10 rounded-full text-cream/40 hover:bg-cream hover:text-ink transition-all duration-500 z-50 group hover:border-cream"
                    >
                        <span className="text-xl group-hover:rotate-90 transition-transform duration-500">✕</span>
                    </button>

                    <div className="p-10 md:p-24 pt-32">
                        {/* Theme Section */}
                        <div className="mb-20">
                            <p className="text-rose/30 text-[0.55rem] tracking-[0.4em] uppercase mb-4">The Theme</p>
                            <h4 className="text-cream/90 text-[0.6rem] tracking-[0.2em] uppercase font-sans mb-10 border-b border-cream/5 pb-6">
                                {project.themeLabel}
                            </h4>
                            <div className="relative pl-12">
                                <span className="absolute left-0 top-0 bottom-0 w-px bg-burgundy/40" />
                                <p className="text-rose/60 font-serif italic text-xl md:text-2xl leading-relaxed">
                                    {project.themeDescription}
                                </p>
                            </div>
                        </div>

                        {/* Scale & Details Row */}
                        <div className="mb-20 grid grid-cols-2 gap-10 border-t border-cream/5 pt-10">
                            <div>
                                <p className="text-rose/70 text-[0.65rem] tracking-[0.4em] uppercase mb-4">Scale</p>
                                <span className="text-cream text-2xl font-serif italic">{project.scaleValue}</span>
                            </div>
                            <div>
                                <p className="text-rose/70 text-[0.65rem] tracking-[0.4em] uppercase mb-4">Project Year</p>
                                <span className="text-cream text-2xl font-serif italic">{project.year}</span>
                            </div>
                        </div>

                        {/* Deliverables Section (Replacing duplicate gallery for clarity) */}
                        <div className="mb-20">
                            <p className="text-rose/70 text-[0.65rem] tracking-[0.4em] uppercase mb-10">Key Deliverables</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                {project.deliverables.map((d, i) => (
                                    <li key={i} className="flex items-center gap-4 text-cream font-sans text-lg group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-burgundy/40 group-hover:bg-burgundy transition-colors" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Production Gallery (Title only if empty, or show unique ones) */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div>
                                <p className="text-rose/70 text-[0.65rem] tracking-[0.4em] uppercase mb-10">Production Gallery</p>
                                <div className="grid grid-cols-2 gap-6">
                                    {[...new Set(project.gallery)].map((img, i) => (
                                        <div key={i} className="aspect-square overflow-hidden bg-rose/5 hover:bg-rose/10 transition-colors border border-rose/10">
                                            <img 
                                                src={img} 
                                                alt={`Gallery ${i}`} 
                                                className="w-full h-full object-cover hover:scale-105 transition-all duration-1000"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Publications & Media */}
                        {(project as any).bookPdf && (
                            <div className="mt-20">
                                <p className="text-rose/70 text-[0.65rem] tracking-[0.4em] uppercase mb-10">Publications & Media</p>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <a href={(project as any).bookPdf} target="_blank" rel="noopener noreferrer" className="border border-rose/30 text-rose/80 text-[0.6rem] tracking-[0.3em] uppercase font-sans px-8 py-4 hover:bg-rose/10 hover:border-rose/60 transition-all duration-500 text-center">
                                        Read: Leaving Money on the Table
                                    </a>
                                    {(project as any).pressKitPdf && (
                                        <a href={(project as any).pressKitPdf} target="_blank" rel="noopener noreferrer" className="border border-cream/20 text-cream/80 text-[0.6rem] tracking-[0.3em] uppercase font-sans px-8 py-4 hover:bg-cream/10 transition-all duration-500 text-center">
                                            Download Media Kit
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Consultation Button */}
                        <div className="mt-24 pt-12 border-t border-cream/5">
                            <button 
                                onClick={() => {
                                    onClose();
                                    openModal();
                                }}
                                className="group flex items-center justify-between w-full border border-cream/10 p-8 hover:bg-cream hover:text-ink transition-all duration-700 hover:border-cream text-cream/80"
                            >
                                <span className="text-[0.7rem] tracking-[0.4em] uppercase font-sans">Book A Consultation</span>
                                <span className="text-2xl group-hover:translate-x-2 transition-transform duration-500">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── ARCHIVES PAGE ────────────────────────────────────────────────────────────
export default function ArchivesPage() {
    const { openModal } = useModal();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    return (
        <div className={`bg-ink text-cream min-h-screen selection:bg-rose selection:text-ink transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <TopNav active={loaded} forceDark={false} />

            {/* ─── BACKGROUND ENHANCEMENTS ─── */}
            <div className="noise-overlay opacity-[0.03]"></div>
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div 
                    className="absolute -top-[10%] -left-[10%] watermark-text"
                    style={{ transform: 'rotate(-5deg)' }}
                >
                    Our Work
                </div>
                <div 
                    className="absolute top-[40%] -right-[15%] watermark-text"
                    style={{ transform: 'rotate(15deg)', opacity: 0.02 }}
                >
                    Cultural
                </div>
                <div 
                    className="absolute -bottom-[10%] -left-[5%] watermark-text"
                    style={{ transform: 'rotate(-2deg)', opacity: 0.025 }}
                >
                    K&C
                </div>
            </div>

            {/* Subtle Gradient Spotlights */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-burgundy/5 blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[0%] w-[50vw] h-[50vw] rounded-full bg-icy/10 blur-[150px]"></div>
            </div>



            {/* ─── HERO SECTION ─── */}
            <section className="pt-48 pb-20 bg-ink">
                <div className="container mx-auto px-8 max-w-7xl">
                    <div className="overflow-hidden">
                        <Reveal mode="mask">
                            <h1 className="text-7xl md:text-[10rem] font-serif leading-[0.85] tracking-tighter text-cream uppercase mb-12">
                                Our <br /><i className="font-light italic text-rose/60">Work.</i>
                            </h1>
                        </Reveal>
                    </div>
                    <Reveal>
                        <p className="text-xl md:text-2xl text-cream/40 font-serif italic max-w-2xl">
                            A curated selection of brand partnerships, experiential activations, and creative productions spanning 6 years.
                        </p>
                    </Reveal>
                </div>
            </section>

            <div className="pb-32 container mx-auto px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {projects.map((project, i) => (
                        <Reveal key={project.id} delay={i * 100}>
                            <TiltCard>
                                <div
                                    className={`group cursor-pointer ${i % 2 === 1 ? 'md:mt-24' : ''} shadow-ember hover:shadow-ember-intense transition-shadow duration-700`}
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="aspect-[4/5] overflow-hidden mb-8 relative rounded-sm bg-burgundy/5 border border-rose/5 group-hover:border-rose/10 transition-colors">
                                        <div className="absolute inset-0 bg-burgundy/20 group-hover:bg-burgundy/10 transition-colors duration-700 z-10"></div>
                                        <img
                                            src={project.img}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1500ms] ease-out"
                                        />
                                        <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="bg-cream text-ink text-[0.55rem] tracking-[0.3em] uppercase font-sans px-4 py-2">Explore the Moment</span>
                                        </div>
                                        <div className="absolute top-6 left-6 z-20">
                                            <span className="text-[0.6rem] font-sans text-cream/40 tracking-widest uppercase">No. {String(i + 1).padStart(2, '0')}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4 px-6 md:px-8 pb-6">
                                        <div className="flex justify-between items-baseline">
                                            <p className="text-[0.62rem] font-sans uppercase tracking-[0.3em] text-rose/80">{project.category}</p>
                                            <p className="text-[0.62rem] font-sans text-cream/50 italic">{project.year}</p>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-serif text-cream tracking-tight uppercase group-hover:italic transition-all duration-500">{project.title}</h3>
                                        <div className="w-0 group-hover:w-full h-px bg-rose/20 transition-all duration-700"></div>
                                    </div>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </div>

            <FooterCTA onBookClick={openModal} />
            <UtilityFooter />
            <DetailPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
}
