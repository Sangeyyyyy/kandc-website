import { useState, useEffect, useRef } from 'react';
import {
    Reveal,
    TopNav,
    useModal,
    FooterCTA,
    UtilityFooter
} from './SharedComponents';
import { getAssetUrl } from './utils/assets';
import { ThreeDPosterCard } from './ThreeDPosterCard';
import { RoadmapSection } from './RoadmapSection';
import { Volume2, VolumeX, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// ─── TYPES ──────────────────────────────────────────────────────────────────
export type Award = {
    group: string;
    count: number;
    nominations?: number;
    note?: string;
    tier?: 'gold' | 'silver' | 'bronze' | 'standard';
};

export type Project = {
    id: number;
    title: string;
    category: string;
    client: string;
    year: string;
    role: string;
    img: string;
    video?: string;
    teaserImg?: string;
    teaser?: string;
    description: string;
    deliverables: string[];
    subtitle: string;
    highlight: string;
    themeLabel: string;
    themeDescription: string;
    scaleValue: string;
    awards?: Award[];
    gallery?: string[];
    partnerLogos?: any[];
    roadmap?: any[];
    orientation?: string;
    highlightLabel?: string;
    theme?: string;
    bookPdf?: string;
    pressKitPdf?: string;
};

// ─── PROJECT DATA ─────────────────────────────────────────────────────────────
const projects: Project[] = [
    {
        id: 2,
        title: 'Sinners',
        category: 'Experiential Integrated Activations and Premieres',
        client: 'Warner Bros. Pictures',
        year: '2024',
        role: 'Live Activation Creative Producer | HBCU & Film Community Amplification',
        img: getAssetUrl('sinners_poster'),
        video: getAssetUrl('Sinners_video'),
        teaserImg: getAssetUrl('sinners_poster'),
        teaser: 'A cinematic premiere event that redefined the red carpet experience.',
        description: `Kelsey & Company partnered with Warner Bros. and MACRO to produce the premiere activation for Sinners—a full-scale, immersive launch experience that blurred the line between film and lived reality. We led the HBCU & Film Community Amplification strategy, including the "HBCU Classic" partnership during All-Star Weekend, the Morehouse Student Poster Contest, and 4 high-impact virtual fireside chats featuring filmmakers Ryan Coogler and Michael B. Jordan.`,
        deliverables: ['HBCU Community Amplification', 'Virtual Fireside Chat Series', 'Morehouse Student Poster Contest', 'Core Market Strategy (ATL, NC, FL, TN, AL)', 'Red Carpet Production', 'Live Brand Activation'],
        subtitle: 'Warner Bros. Pictures Production',
        highlight: 'Premiere Launch',
        themeLabel: 'CREATIVE PRODUCTION & AMPLIFICATION',
        themeDescription: 'Kelsey & Company spearheaded the end-to-end production and marketing for branded events in partnership with MACRO, NBA and Warner Bros. Pictures. Our team directed on-site execution, red carpet, and audience engagement while coordinating all outreach to bridge the gap between blockbuster film and cultural community.',
        scaleValue: 'Global Premiere & Multi-Market Tour',
        awards: [
            { group: 'Academy Awards (Oscars)', count: 4, nominations: 16, tier: 'gold', note: 'Winner: Best Actor, Best Original Screenplay, Best Cinematography, Best Original Score' },
            { group: 'Critics Choice Awards', count: 4, tier: 'silver', note: 'Winner: Best Picture, Best Young Actor' },
            { group: 'BAFTA Film Awards', count: 3, tier: 'silver', note: 'Winner: Best Director, Best Film, Best Screenplay' },
            { group: 'Golden Globe Awards', count: 2, nominations: 7, tier: 'bronze' },
            { group: 'Grammy Awards', count: 2, tier: 'bronze', note: 'Best Compilation Soundtrack & Best Score' },
            { group: 'Industry Recognition', count: 1, tier: 'standard', note: 'Winner: ACE Eddie Awards - Best Edited Feature Film' }
        ],
        gallery: [
            getAssetUrl('sinners_5'),
            getAssetUrl('sinners_1'),
            getAssetUrl('sinners_2'),
            getAssetUrl('sinners_3'),
            getAssetUrl('sinners_4'),
            getAssetUrl('sinners_5'),
            getAssetUrl('sinners_6'),
            getAssetUrl('sinners_brochure'),
            getAssetUrl('sinners_poster'),
            getAssetUrl('Sinners_background'),
            getAssetUrl('Sinners_logo')
        ],
        partnerLogos: [
            { src: getAssetUrl('warner-bros-'), mode: 'monochrome', size: 'icon',   alt: 'Warner Bros' },
            { src: getAssetUrl('macro_logo'), mode: 'monochrome', size: 'square', alt: 'Macro' },
            { src: getAssetUrl('nba_logo'), mode: 'monochrome', size: 'icon',   alt: 'NBA' }
        ],
        roadmap: [
            {
                phase: 'Pre-Production',
                step: '01',
                title: 'Community Amplification',
                description: 'Launching a virtual fireside chat series with Ryan Coogler and Michael B. Jordan. Organizing the Morehouse Student Poster Contest to engage the next generation of creatives.',
                tag: 'Strategy',
                media: getAssetUrl('sinners_brochure'),
                mediaPosition: 'right',
            },
            {
                phase: 'Coordination',
                step: '02',
                title: 'HBCU Classic Partnership',
                description: 'Coordinating with Warner Bros, MACRO, and the NBA during the HBCU Classic at All-Star Weekend. Serving as the local market representative for Morehouse and Tuskegee screenings.',
                tag: 'Operations',
                media: getAssetUrl('sinners_3'),
            },
            {
                phase: 'On-Site Production',
                step: '03',
                title: 'Premiere & Execution',
                description: 'Directing on-site red carpet production, managing asset delivery, and overseeing audience engagement for advanced screenings.',
                tag: 'Execution',
                media: getAssetUrl('sinners_5'),
            },
        ],
    },
    {
        id: 3,
        title: 'Tron: Ares',
        category: 'Experiential Integrated Activations and Premieres',
        client: 'Walt Disney Studios',
        year: '2025',
        role: 'Integrated Marketing & Brand Activation',
        img: getAssetUrl('tron'),
        teaserImg: getAssetUrl('tron'),
        teaser: 'A neon-drenched, world-building marketing campaign built for the digital age.',
        description: 'For the long-awaited Tron: Ares, K&C was brought on to lead the integrated activation strategy. We designed an immersive digital-physical campaign spanning pop-up experiences, social amplification, and influencer integration that captured the film\'s futuristic energy.',
        deliverables: ['Pop-Up Experience Design', 'Influencer & Talent Relations', 'Digital Content Strategy', 'Launch Event Production'],
        subtitle: 'Walt Disney Studios Campaign',
        highlight: 'Digital Identity',
        themeLabel: 'INTEGRATED MARKETING STRATEGY',
        themeDescription: 'For the long-awaited Tron: Ares, K&C was brought on to lead the integrated activation strategy. We designed an immersive digital-physical campaign spanning pop-up experiences, social amplification, and influencer integration that captured the film\'s futuristic energy.',
        scaleValue: 'Multi-Market Integration',
        gallery: [
            getAssetUrl('Tron_1'),
            getAssetUrl('Tron_2'),
            getAssetUrl('Tron_3'),
            getAssetUrl('Tron_4'),
            getAssetUrl('Tron_5'),
            getAssetUrl('Tron_6'),
        ],
        partnerLogos: [
            { src: getAssetUrl('icons8-disney-50'), mode: 'monochrome', size: 'icon', alt: 'Disney' }
        ],
        roadmap: [
            { phase: 'Strategy', step: '01', title: 'Immersive Campaign Design', description: 'Architecting an immersive digital-physical campaign that merged the neon aesthetic of Tron with modern real-world touchpoints.', tag: 'Creative', media: getAssetUrl('tron') },
            { phase: 'Integration', step: '02', title: 'Influencer Amplification', description: 'Coordinating heavy-hitting tech and lifestyle influencers to build organic hype and amplify the campaign reach.', tag: 'Social', media: getAssetUrl('Tron_3'), mediaPosition: 'right' },
            { phase: 'Execution', step: '03', title: 'Launch Production', description: 'Executing the pop-up experiences and premiere launch, ensuring a seamless translation from digital hype to physical presence.', tag: 'Production', media: getAssetUrl('Tron_5') },
        ],
    },
    {
        id: 4,
        title: 'Zootopia 2',
        category: 'Experiential Integrated Activations and Premieres',
        client: 'Walt Disney Animation',
        year: '2023',
        role: 'Brand Partnership Management',
        img: getAssetUrl('zootopia'),
        teaserImg: getAssetUrl('zootopia'),
        teaser: 'Strategic partnerships that extended the world of Zootopia into everyday culture.',
        description: `K&C curated and managed a suite of co-branded partnerships for the Zootopia franchise, connecting the animated world with premium lifestyle brands. Our curation drove unprecedented cultural penetration and brand affinity across key demographics.`,
        deliverables: ['Brand Partner Curation', 'Co-Branded Campaign Strategy', 'Deal Negotiation & Execution', 'Cultural Alignment Oversight'],
        subtitle: 'Disney Animation Franchise',
        highlight: 'Co-Branded Fusion',
        themeLabel: 'PARTNERSHIP MANAGEMENT',
        themeDescription: 'K&C curated and managed a suite of co-branded partnerships for the Zootopia franchise, connecting the animated world with premium lifestyle brands. Our curation drove unprecedented cultural penetration and brand affinity across key demographics.',
        scaleValue: '360° Partner Integration',
        gallery: [getAssetUrl('zootopia'), getAssetUrl('zootopia')],
        video: getAssetUrl('Zootopia_video'),
        orientation: 'portrait',
    },
    {
        id: 5,
        title: 'Avatar',
        category: 'Experiential Integrated Activations and Premieres',
        client: '20th Century Studios',
        year: '2023',
        role: 'Experiential Production Lead',
        img: getAssetUrl('avatar_2'),
        teaserImg: getAssetUrl('avatar_2'),
        teaser: 'An otherworldly launch experience that transported audiences to Pandora.',
        description: `For Avatar: The Way of Water, Kelsey & Company designed and produced an immersive theatrical world-preview event. Guests were transported through the film's oceanic environments via multi-sensory staging, setting a new benchmark for blockbuster experiential marketing.`,
        deliverables: ['Immersive Environment Design', 'Multi-Sensory Event Production', 'Talent & Talent Management', 'Press Activation Strategy'],
        subtitle: '20th Century Studios Experience',
        highlight: 'Pandora Immersion',
        themeLabel: 'EXPERIENTIAL PRODUCTION',
        themeDescription: 'For Avatar: The Way of Water, Kelsey & Company designed and produced an immersive theatrical world-preview event. Guests were transported through the film\'s oceanic environments via multi-sensory staging, setting a new benchmark for blockbuster experiential marketing.',
        scaleValue: 'Multi-Sensory World Building',
        video: getAssetUrl('avatar_video'),
        gallery: [
            getAssetUrl('avatar_1'),
            getAssetUrl('avatar_2'),
            getAssetUrl('avatar_3'),
            getAssetUrl('avatar_4'),
            getAssetUrl('avatar_5'),
            getAssetUrl('avatar_6'),
            getAssetUrl('avatar_7'),
            getAssetUrl('avatar_8'),
            getAssetUrl('avatar_9'),
            getAssetUrl('avatar_10'),
            getAssetUrl('avatar_11'),
            getAssetUrl('avatar_12'),
        ],
        orientation: 'portrait',
        roadmap: [
            { phase: 'Conceptualization', step: '01', title: 'World-Preview Concept', description: 'Designing a theatrical preview event that authentically mirrored the aquatic environments of Pandora.', tag: 'Design', media: getAssetUrl('avatar_2') },
            { phase: 'Build', step: '02', title: 'Multi-Sensory Staging', description: 'Constructing immersive sets with specialized lighting, water effects, and ambient soundscapes to transport attendees.', tag: 'Fabrication', media: getAssetUrl('avatar_5'), mediaPosition: 'right' },
            { phase: 'The Event', step: '03', title: 'Talent & Press', description: 'Managing the arrival, flow, and experience of A-list talent and top-tier press to maximize earned media.', tag: 'Management', media: getAssetUrl('avatar_8') },
        ],
    },
    {
        id: 6,
        title: 'Hoppers',
        category: 'Experiential Integrated Activations and Premieres',
        client: 'Netflix',
        year: '2024',
        role: 'Live Experience Production',
        img: getAssetUrl('hoppers_1'),
        teaserImg: getAssetUrl('hoppers_1'),
        teaser: 'A live-to-screen event series that brought Netflix\'s biggest series to life.',
        description: 'Kelsey & Company produced the live experience strategy for Netflix\'s Hoppers series, converting episodic storytelling into a set of curated live events. From intimate screenings to large-scale activations, each event deepened fan engagement and drove cultural conversation.',
        deliverables: ['Live Event Series', 'Fan Engagement Strategy', 'Venue Production & Staffing', 'Social Media Amplification'],
        subtitle: 'Netflix Event Series',
        highlight: 'Live Narrative',
        themeLabel: 'LIVE EXPERIENCE STRATEGY',
        themeDescription: 'Kelsey & Company produced the live experience strategy for Netflix\'s Hoppers series, converting episodic storytelling into a set of curated live events. From intimate screenings to large-scale activations, each event deepened fan engagement and drove cultural conversation.',
        scaleValue: 'Nationwide Activation',
        video: getAssetUrl('hoppers_video'),
        gallery: [
            getAssetUrl('hoppers_1'),
            getAssetUrl('hoppers_2'),
            getAssetUrl('hoppers_3'),
            getAssetUrl('hoppers_4'),
            getAssetUrl('hoppers_5'),
            getAssetUrl('hoppers_6'),
            getAssetUrl('hoppers_7'),
            getAssetUrl('hoppers_8'),
            getAssetUrl('hoppers_9'),
            getAssetUrl('hoppers_10'),
            getAssetUrl('hoppers_11'),
            getAssetUrl('hoppers_12'),
            getAssetUrl('hoppers_13'),
        ],
        orientation: 'portrait',
        roadmap: [
            { phase: 'Planning', step: '01', title: 'Fan Engagement Strategy', description: 'Developing a live event strategy designed to deepen the connection between the series narrative and its fanbase.', tag: 'Strategy', media: getAssetUrl('hoppers_1') },
            { phase: 'Operations', step: '02', title: 'Live Event Build', description: 'Sourcing venues, handling staffing, and building out the physical footprint for nationwide activations.', tag: 'Production', media: getAssetUrl('hoppers_5'), mediaPosition: 'right' },
            { phase: 'Amplification', step: '03', title: 'Social Amplification', description: 'Creating shareable moments and coordinating with social teams to ensure the live events trended globally.', tag: 'Digital', media: getAssetUrl('hoppers_9') },
        ],
    },
    {
        id: 1,
        title: 'The Devil Wears Prada 2',
        category: 'Experiential Integrated Activations and Premieres',
        client: 'Fox Entertainment',
        year: '2025',
        role: 'Strategic Brand & Fashion Partnerships',
        img: getAssetUrl('devil_wears_prada'),
        teaserImg: getAssetUrl('devil_wears_prada'),
        teaser: 'A fashion-forward partnership strategy that made the world pay attention.',
        description: `For the highly anticipated sequel, K&C architected the fashion and luxury brand partnership strategy. We brokered relationships with top-tier fashion houses, coordinated editorial integrations, and produced a press preview event that set the tone for the entire campaign.`,
        deliverables: ['Luxury Fashion Partnerships', 'Editorial Integration', 'Press Preview Production', 'Global Brand Strategy'],
        subtitle: 'Fox Entertainment Strategic Tie-ins',
        highlight: 'Fashion Forward',
        themeLabel: 'LUXURY BRAND STRATEGY',
        themeDescription: 'For the highly anticipated sequel, K&C architected the fashion and luxury brand partnership strategy. We brokered relationships with top-tier fashion houses, coordinated editorial integrations, and produced a press preview event that set the tone for the entire campaign.',
        scaleValue: 'Global Luxury Strategy',
        gallery: [getAssetUrl('devil_wears_prada'), getAssetUrl('devil_wears_prada')],
    },
    {
        id: 7,
        title: 'BET+ Is the Cookout',
        category: 'Digital Marketing',
        client: 'Black Entertainment Television',
        year: '2024',
        role: 'Activation Strategy & Content Production',
        img: getAssetUrl('BET_is_the_cookout_poster'),
        video: getAssetUrl('BET_is_the_cookout_poster'),
        teaserImg: getAssetUrl('BET_is_the_cookout_poster'),
        teaser: 'Strategic content production and activation for the premier streaming service for Black culture.',
        description: 'Kelsey & Company collaborated with BET+ to develop and execute a comprehensive activation strategy. We focused on high-impact content production and cultural storytelling that resonated deeply with the platform\'s audience, strengthening its position as a cultural leader.',
        deliverables: ['Content Production', 'Activation Strategy', 'Culture-First Storytelling', 'Brand Integration'],
        subtitle: 'BET+ Content Strategy',
        highlight: 'Culture First',
        themeLabel: 'CONTENT PRODUCTION',
        themeDescription: 'Kelsey & Company collaborated with BET+ to develop and execute a comprehensive activation strategy. We focused on high-impact content production and cultural storytelling that resonated deeply with the platform\'s audience, strengthening its position as a cultural leader.',
        scaleValue: 'Streaming Content Reach',
        gallery: [getAssetUrl('BET_is_the_cookout_solo'), getAssetUrl('BET_is_the_cookout_background')],
        partnerLogos: [
            { src: getAssetUrl('BET_logo'), mode: 'monochrome', size: 'wide',   alt: 'BET+', scale: 1.3 }
        ],
        roadmap: [
            { phase: 'Ideation', step: '01', title: 'Culture-First Brief', description: 'Developing a strategic approach that honors and elevates Black culture, aligning perfectly with the BET+ streaming audience.', tag: 'Strategy', media: getAssetUrl('BET_is_the_cookout_poster') },
            { phase: 'Creation', step: '02', title: 'Content Production', description: 'Directing and capturing high-impact footage, focusing on authentic storytelling and premium visual aesthetics.', tag: 'Production', media: getAssetUrl('BET_is_the_cookout_background'), mediaPosition: 'right' },
            { phase: 'Delivery', step: '03', title: 'Brand Integration', description: 'Weaving the BET+ brand naturally into the activation, creating a cohesive experience that drives platform affinity.', tag: 'Execution', media: getAssetUrl('BET_is_the_cookout_solo') },
        ],
    },
    {
        id: 8,
        title: 'Jason Harvey',
        category: 'Executive Brand Management',
        client: 'Blue Blood',
        year: '2023',
        role: 'Brand Partnership & Creative Direction',
        img: getAssetUrl('jason_harvey_poster'),
        video: getAssetUrl('jason_harvey_video'),
        teaserImg: getAssetUrl('jason_harvey_poster'),
        teaser: 'Elevating creative direction and strategic partnerships for Jason Harvey\'s Blue Blood.',
        description: 'We provided creative direction and managed strategic brand partnerships for Jason Harvey and his Blue Blood initiative. Our work bridged the gap between high fashion and cultural impact, creating meaningful connections with premium brands.',
        deliverables: ['Creative Direction', 'Brand Partnership Management', 'Strategic Positioning', 'Talent Curation'],
        subtitle: 'EVP, Head of Paramount\'s BET+',
        highlight: '4 Stages',
        themeLabel: 'SENIOR DIRECTOR LEVEL - BRAND MANAGEMENT',
        themeDescription: 'Kelsey & Company supports Jason Harvey as his primary brand manager. Our engagement functions at a senior director level across strategy, planning, and execution — including complex brand high-stakes bookings, coordination, and overarching multi-platform development.',
        scaleValue: 'Proven Engaging Speaker',
        gallery: [
            getAssetUrl('jason_harvey_background'),
            getAssetUrl('jason_harvey_solo'),
            getAssetUrl('jason_harvey_2'),
            getAssetUrl('jason_harvey_1'),
            getAssetUrl('jason_harvey_2'),
            getAssetUrl('Copy_of_Jason_H_Speaks_Adweek_house'),
            getAssetUrl('ChinaPanelnuggets1'),
            getAssetUrl('IMG_0343'),
            getAssetUrl('IMG_2125'),
            getAssetUrl('IMG_2543'),
            getAssetUrl('gettyimages-2264115507-612x612')
        ],
        partnerLogos: [
            { src: getAssetUrl('BET_logo'), mode: 'monochrome', size: 'wide',   alt: 'BET+', scale: 1.3 },
            { src: getAssetUrl('paramount-plus-64'),        mode: 'monochrome', size: 'icon',   alt: 'Paramount' },
            { src: getAssetUrl('SXSW_logo'),           mode: 'monochrome', size: 'wide',   alt: 'SXSW' },
            { src: getAssetUrl('CES_logo'),            mode: 'monochrome', size: 'wide',   alt: 'CES', scale: 1.15 },
            { src: getAssetUrl('jason_harvey_logo'), mode: 'monochrome', size: 'full',   alt: 'Jason Harvey', scale: 1.1 },
            { src: getAssetUrl('Convergence_logo'),    mode: 'monochrome', size: 'full',   alt: 'Convergence' },
        ],
        orientation: 'portrait',
    },
    {
        id: 9,
        title: 'Renaissance Noir: Sneaker Ball',
        category: 'Event Producing and Programming',
        client: 'Sneaker Ball Gala',
        year: '2023',
        role: 'Event Production & Strategy',
        img: getAssetUrl('sneaker_ball_poster'),
        teaserImg: getAssetUrl('sneaker_ball_poster'),
        teaser: 'Where luxury meets street culture in an annual celebratory gala.',
        description: 'K&C led the production and strategic planning for the Sneaker Ball, a unique event that celebrates the intersection of luxury fashion and sneaker culture. We managed everything from venue transformation to guest experience and cultural programming.',
        deliverables: ['Event Production', 'Spatial Design', 'Guest Experience Strategy', 'Talent Programming'],
        subtitle: 'Sneaker Ball Gala Strategy',
        highlight: 'Street Luxury',
        themeLabel: 'EVENT PRODUCTION',
        themeDescription: 'K&C led the production and strategic planning for the Sneaker Ball, a unique event that celebrates the intersection of luxury fashion and sneaker culture. We managed everything from venue transformation to guest experience and cultural programming.',
        scaleValue: 'Premium Gala Experience',
        gallery: [
            getAssetUrl('sneaker_ball_solo'),
            getAssetUrl('sneaker_ball_background'),
            getAssetUrl('sneakerball'),
            getAssetUrl('sneakerball_1'),
            getAssetUrl('sneaker_ball_2'),
            getAssetUrl('sneaker_ball_3')
        ],
        partnerLogos: [
            { src: getAssetUrl('BLKAT_FinalLogoColor_2'), mode: 'monochrome', size: 'wide', alt: 'Blackat' },
        ],
        roadmap: [
            { phase: 'Vision', step: '01', title: 'Concept & Spatial Design', description: 'Merging the elegance of a traditional gala with the raw energy of street and sneaker culture into a singular spatial experience.', tag: 'Creative', media: getAssetUrl('sneaker_ball_poster') },
            { phase: 'Curation', step: '02', title: 'Guest Experience', description: 'Curating the attendee journey from red carpet arrival through the main room, ensuring luxury touchpoints at every step.', tag: 'Curation', media: getAssetUrl('sneaker_ball_2'), mediaPosition: 'right' },
            { phase: 'Execution', step: '03', title: 'Event Night Production', description: 'Calling the show, managing talent, and overseeing front-of-house and back-of-house operations to ensure flawless delivery.', tag: 'Production', media: getAssetUrl('sneakerball') },
        ],
    },
    {
        id: 10,
        title: 'Spike Lee',
        category: 'Event Producing and Programming',
        client: 'Creative Conversations',
        year: '2023',
        role: 'Executive Production & Curation',
        img: getAssetUrl('spike_lee_fireside_chat_poster'),
        teaserImg: getAssetUrl('spike_lee_fireside_chat_poster'),
        teaser: 'An intimate, high-impact conversation with a legendary filmmaker.',
        description: 'We executive produced and curated an exclusive fireside chat with Spike Lee. This high-profile event focused on the power of storytelling and cultural impact, providing an intimate platform for one of cinema\'s most influential voices.',
        deliverables: ['Executive Production', 'Talent Curation', 'Set Design & Staging', 'Press Coordination'],
        subtitle: 'Spike Lee Fireside Chat',
        highlight: 'Cultural Voice',
        themeLabel: 'EXECUTIVE PRODUCTION',
        themeDescription: 'We executive produced and curated an exclusive fireside chat with Spike Lee. This high-profile event focused on the power of storytelling and cultural impact, providing an intimate platform for one of cinema\'s most influential voices.',
        scaleValue: 'Direct Talent Management',
        gallery: [
            getAssetUrl('spike_lee_fireside_chat_poster'),
            getAssetUrl('spike_lee_fireside_chat_background'),
            getAssetUrl('spike_lee_fireside_chat_solo'),
            getAssetUrl('spike_lee_fireside_logo'),
            getAssetUrl('spike_lee_fireside_chat_1'),
            getAssetUrl('spike_lee_fireside_chat_2'),
            getAssetUrl('spike_lee_fireside_chat_3'),
            getAssetUrl('spike_lee_fireside_chat_4'),
        ],
        partnerLogos: [
            { src: getAssetUrl('BLKAT_FinalLogoColor_2'),          mode: 'monochrome', size: 'wide', alt: 'Blackat Cannes', scale: 1.2 },
            { src: getAssetUrl('-air-jordan'),                            mode: 'monochrome', size: 'icon', alt: 'Jordan', scale: 1.2 },
            { src: getAssetUrl('cannes_lions_logo'), mode: 'monochrome', size: 'wide', alt: 'Cannes Lions', scale: 1.2 },
        ],
        roadmap: [
            { phase: 'Strategy', step: '01', title: 'Executive Booking', description: 'Securing the talent and structuring the conversational arc to ensure high-impact dialogue around storytelling.', tag: 'Curation', media: getAssetUrl('spike_lee_fireside_chat_poster') },
            { phase: 'Design', step: '02', title: 'Set & Staging', description: 'Designing an intimate, camera-ready environment that felt both premium and relaxed for an authentic fireside feel.', tag: 'Production', media: getAssetUrl('spike_lee_fireside_chat_2'), mediaPosition: 'right' },
            { phase: 'Operations', step: '03', title: 'Live Show Production', description: 'Managing press access, live audience seating, and the technical execution of the chat.', tag: 'Execution', media: getAssetUrl('spike_lee_fireside_chat_1') },
        ],
    },
    {
        id: 11,
        title: 'Creatives at Sea',
        category: 'Event Producing and Programming',
        client: 'Juneteenth Celebration',
        year: '2023',
        role: 'Event Production & Curation',
        img: getAssetUrl('creatives_at_sea_poster'),
        teaserImg: getAssetUrl('creatives_at_sea_poster'),
        teaser: 'A Juneteenth celebration promoting diversity in media on the water.',
        description: 'A Juneteenth celebration promoting diversity in media, featuring an insightful panel w/ NAACP president, CBS & Roc Nation executives. The exclusive event offered networking on the water, lite bites, signature cocktails, and an unforgettable mix of conversation and music.',
        deliverables: ['Insightful Panel Coordination', 'Networking Event Production', 'Signature Cocktail Curation', 'Live Music & Conversation'],
        subtitle: 'Diversity in Media Panel',
        highlight: 'Juneteenth',
        themeLabel: 'JUNETEENTH CELEBRATION',
        themeDescription: 'A Juneteenth celebration promoting diversity in media, featuring an insightful panel w/ NAACP president, CBS & Roc Nation executives. The exclusive event offered networking on the water, lite bites, signature cocktails, and an unforgettable mix of conversation and music.',
        scaleValue: 'Capacity | 120 people',
        video: getAssetUrl('creatives_at_sea_video'),
        gallery: [
            getAssetUrl('creatives_at_sea_poster'),
            getAssetUrl('creatives_at_sea_background'),
            getAssetUrl('creatives_at_sea_solo'),
            getAssetUrl('creatives_at_sea_logo'),
            getAssetUrl('creatives_at_sea_1'),
            getAssetUrl('creatives_at_sea_2'),
            getAssetUrl('creatives_at_sea_3'),
            getAssetUrl('creatives_at_sea_4')
        ],
        partnerLogos: [
            { src: getAssetUrl('NAACP_logo'),           mode: 'monochrome', size: 'wide', alt: 'NAACP', scale: 1.1 },
            { src: getAssetUrl('BLKAT_FinalLogoColor_2'), mode: 'monochrome', size: 'wide', alt: 'Blackat Cannes' },
        ],
        orientation: 'portrait',
        roadmap: [
            { phase: 'Curation', step: '01', title: 'Panel Recruitment', description: 'Assembling a powerhouse lineup of executives from NAACP, CBS, and Roc Nation to speak on diversity in media.', tag: 'Strategy', media: getAssetUrl('creatives_at_sea_poster') },
            { phase: 'Logistics', step: '02', title: 'Maritime Build', description: 'Adapting standard event production requirements for a maritime setting, ensuring safety, audio quality, and premium catering.', tag: 'Operations', media: getAssetUrl('creatives_at_sea_2'), mediaPosition: 'right' },
            { phase: 'Execution', step: '03', title: 'The Voyage', description: 'Facilitating the panel discussion, managing the networking flow, and ensuring an unforgettable experience on the water.', tag: 'Production', media: getAssetUrl('creatives_at_sea_4') },
        ],
    },
    {
        id: 12,
        title: 'Spike Lee Dinner',
        category: 'Event Producing and Programming',
        client: 'Cannes Lions 2023',
        year: '2023',
        role: 'Event Production & Strategy',
        img: getAssetUrl('spike_lee_dinner_poster'),
        teaserImg: getAssetUrl('spike_lee_dinner_poster'),
        teaser: 'A luxurious 5-course meal powered by Jordan Brand for 50 top creatives.',
        description: '50 top creatives and executives enjoyed a luxurious 5-course meal, with each guest presenting their creative cause. The night concluded with an exclusive Spike Lee-branded Jordan drop, signing, and personalized merch for all attendees.',
        deliverables: ['5-Course Luxurious Meal', 'Creative Cause Presentations', 'Exclusive Jordan Drop', 'Personalized Merch & Signing'],
        subtitle: 'Powered by Jordan Brand',
        highlight: 'Jordan Brand',
        themeLabel: 'LUXURY DINNER EXPERIENCE',
        themeDescription: '50 top creatives and executives enjoyed a luxurious 5-course meal, with each guest presenting their creative cause. The night concluded with an exclusive Spike Lee-branded Jordan drop, signing, and personalized merch for all attendees.',
        scaleValue: 'Capacity | 50 guests',
        gallery: [
            getAssetUrl('spike_lee_dinner_poster'),
            getAssetUrl('spike_lee_dinner_background'),
            getAssetUrl('spike_lee_dinner_solo'),
            getAssetUrl('spike_lee_dinner_1'),
            getAssetUrl('spike_lee_dinner'),
            getAssetUrl('spike_lee_dinner_2'),
            getAssetUrl('34017AB7-4935-4D27-AE74-F4C010F74EE1')
        ],
        partnerLogos: [
            { src: getAssetUrl('-air-jordan'),                   mode: 'monochrome', size: 'icon', alt: 'Jordan', scale: 1.2 },
            { src: getAssetUrl('BLKAT_FinalLogoColor_2'), mode: 'monochrome', size: 'wide', alt: 'Blackat Cannes', scale: 1.2 },
            { src: getAssetUrl('cannes_lions_logo'), mode: 'monochrome', size: 'wide', alt: 'Cannes Lions', scale: 1.2 },
        ],
        roadmap: [
            { phase: 'Planning', step: '01', title: 'Targeted Curation', description: 'Curating an invite-only list of 50 top-tier creative executives to foster high-level networking and intimate cause presentations.', tag: 'Strategy', media: getAssetUrl('spike_lee_dinner_poster') },
            { phase: 'Hospitality', step: '02', title: '5-Course Experience', description: 'Working with elite culinary teams to design and serve a seamless 5-course luxury dining experience.', tag: 'Operations', media: getAssetUrl('spike_lee_dinner_1'), mediaPosition: 'right' },
            { phase: 'Fulfillment', step: '03', title: 'Jordan Brand Drop', description: 'Executing the surprise gifting moment, including personalized merch distribution and managing the exclusive signing.', tag: 'Execution', media: getAssetUrl('spike_lee_dinner_2') },
        ],
    },
    {
        id: 13,
        title: 'CEO/CMO Brunch',
        category: 'Event Producing and Programming',
        client: 'Industry Executives',
        year: '2023',
        role: 'Event Production & Programming',
        img: getAssetUrl('CMO_brunch_poster'),
        teaserImg: getAssetUrl('CEOCMO_BRUNCH'),
        teaser: 'An intimate gathering with the industries most creative executives.',
        description: 'A small intimate gathering with some of the industries most creative executives. With brunch served hot, and the poetic accompaniment of Grammy award winner J.Ivy.',
        deliverables: ['Intimate Programming', 'Brunch Catering Coordination', 'Artist Performance Management', 'Executive Networking'],
        subtitle: 'Poetic Accompaniment by J.Ivy',
        highlight: 'Intimate Gathering',
        themeLabel: 'EXECUTIVE NETWORKING',
        themeDescription: 'A small intimate gathering with some of the industries most creative executives. With brunch served hot, and the poetic accompaniment of Grammy award winner J.Ivy.',
        scaleValue: 'Capacity | 50 People',
        gallery: [getAssetUrl('CEOCMO_BRUNCH')],
        partnerLogos: [
            { src: getAssetUrl('BLKAT_FinalLogoColor_2'), mode: 'monochrome', size: 'wide', alt: 'Blackat' },
        ],
        roadmap: [
            { phase: 'Talent', step: '01', title: 'Programming & Booking', description: 'Securing Grammy award winner J.Ivy to provide the emotional and poetic anchor for the executive gathering.', tag: 'Programming', media: getAssetUrl('CMO_brunch_poster') },
            { phase: 'Design', step: '02', title: 'Intimate Venue Setup', description: 'Crafting a warm, inviting environment that encouraged open dialogue among high-level attendees.', tag: 'Production', media: getAssetUrl('CEOCMO_BRUNCH'), mediaPosition: 'right' },
            { phase: 'Delivery', step: '03', title: 'Executive Experience', description: 'Running the front-of-house operations to ensure seamless catering and a flawless program flow.', tag: 'Execution', media: getAssetUrl('CMO_brunch_poster') },
        ],
    },
    {
        id: 14,
        title: 'Logitech x Vice Luncheon',
        category: 'Event Producing and Programming',
        client: 'Logitech & Vice',
        year: '2023',
        role: 'Event Production & Management',
        img: getAssetUrl('logitech_x_vice_luncheon'),
        teaserImg: getAssetUrl('logitech_x_vice_luncheon'),
        teaser: 'A private, seated Luncheon and fireside chat for industry executives.',
        description: 'A private, seated Luncheon and fireside chat for industry executives powered by Logitech and Vice.',
        deliverables: ['Private Seated Luncheon', 'Fireside Chat Management', 'Partner Integration', 'Executive Guest Management'],
        subtitle: 'Powered by Logitech and Vice',
        highlight: 'Seated Luncheon',
        themeLabel: 'STRATEGIC PARTNERSHIP LUNCHEON',
        themeDescription: 'A private, seated Luncheon and fireside chat for industry executives powered by Logitech and Vice.',
        scaleValue: 'Capacity | 50 People',
        gallery: [getAssetUrl('logitech_x_vice_luncheon')],
        partnerLogos: [
            { src: getAssetUrl('Logitech-Emblem'),      mode: 'monochrome', size: 'wide', alt: 'Logitech', scale: 1.2 },
            { src: getAssetUrl('vice-logo-transparent'), mode: 'none', size: 'wide', alt: 'Vice', scale: 1.1 },
            { src: getAssetUrl('BLKAT_FinalLogoColor_2'),          mode: 'monochrome', size: 'wide', alt: 'Blackat' },
        ],
    },
    {
        id: 15,
        title: 'Thought Leadership Brunch',
        category: 'Event Producing and Programming',
        client: 'Black at Cannes',
        year: '2025',
        role: 'Global Director and Producer',
        img: getAssetUrl('thought_leadership_brunch_poster'),
        teaserImg: getAssetUrl('thought_leadership_brunch_poster'),
        teaser: 'A premier summit celebrating global Black excellence.',
        description: 'As Global Director and Producer, I led the end-to-end execution of Black at Cannes, a premier summit celebrating global Black excellence. I managed an international team and global vendors to deliver high-level programming, ranging from executive-led panels to an exclusive gala for Nedbank. This world-class experience successfully connected top-tier industry leaders on a global stage. \n\nThought Leadership Brunch Cannes @ The Martinez',
        deliverables: ['High-level Programming', 'Executive-Led Panels', 'Exclusive Gala Execution', 'Global Vendor Management'],
        subtitle: 'Cannes @ The Martinez',
        highlight: 'Black at Cannes',
        themeLabel: 'GLOBAL BLACK EXCELLENCE',
        themeDescription: 'As Global Director and Producer, I led the end-to-end execution of Black at Cannes, a premier summit celebrating global Black excellence. I managed an international team and global vendors to deliver high-level programming, ranging from executive-led panels to an exclusive gala for Nedbank. This world-class experience successfully connected top-tier industry leaders on a global stage.',
        scaleValue: 'Thought Leadership Brunch',
        gallery: [
            getAssetUrl('thought_leadership_brunch_poster'),
            getAssetUrl('thought_leadership_brunch'),
            getAssetUrl('thought_leadership_brunch_1'),
            getAssetUrl('thought_leadership_brunch_2'),
            getAssetUrl('thought_leadership_brunch_3'),
            getAssetUrl('thought_leadership_brunch_4'),
            getAssetUrl('thought_leadership_brunch_poster_1'),
            getAssetUrl('thought_leadership_brunch_poster_2')
        ],
        partnerLogos: [
            { src: getAssetUrl('BLKAT_FinalLogoColor_2'), mode: 'monochrome', size: 'wide', alt: 'Blackat' },
        ],
    },
    {
        id: 16,
        title: 'ONE Musicfest x Eventnoire',
        category: 'Digital Campaigns',
        client: 'Eventnoire / ONE Musicfest',
        year: '2025',
        role: 'Partnership Broker & Digital Strategy Lead',
        img: getAssetUrl('assets/onemusicfest x eventnoire/onemusicfest poster.jpg'),
        teaserImg: getAssetUrl('assets/onemusicfest x eventnoire/onemusicfest poster.jpg'),
        teaser: 'Secured a high-impact partnership with ONE Musicfest on behalf of client Eventnoire, leveraging over 1.2M subscribers for targeted audience acquisition.',
        description: 'Secured a high-impact partnership with ONE Musicfest on behalf of client Eventnoire. Led efforts around presale ticketing, audience engagement, and in-festival brand integrations to deepen consumer connection and drive platform visibility. The collaboration leveraged Eventnoire\'s ecosystem of over 1.2M culturally engaged subscribers through targeted email campaigns, SMS, banner ads, and national/regional newsletters. Additionally, we used first-party data strategies to drive new audience acquisition for ONE Musicfest—expanding their marketing funnel with qualified, affinity-aligned leads across key markets.',
        deliverables: ['Presale Ticketing Strategy', 'Audience Engagement', 'In-Festival Brand Integrations', 'First-Party Data Acquisition', 'Email & SMS Campaigns'],
        subtitle: 'High-impact partnership across digital and live channels.',
        highlight: 'Partnership',
        themeLabel: 'STRATEGIC AUDIENCE ACQUISITION',
        themeDescription: 'Secured a high-impact partnership with ONE Musicfest on behalf of client Eventnoire. Led efforts around presale ticketing, audience engagement, and in-festival brand integrations to deepen consumer connection and drive platform visibility.',
        scaleValue: '1.2M+ Engaged Subscribers',
        gallery: [
            getAssetUrl('assets/onemusicfest x eventnoire/onemusicfest poster.jpg'),
            getAssetUrl('assets/onemusicfest x eventnoire/onemusicfest.png')
        ],
        partnerLogos: [
            { src: getAssetUrl('assets/brands/ONE_Musicfest_Logo.png'), mode: 'monochrome', size: 'wide', alt: 'ONE Musicfest', scale: 1.2 },
            { src: getAssetUrl('assets/eventnoire/eventnoire logo.webp'), mode: 'monochrome', size: 'wide', alt: 'Eventnoire', scale: 1.2 }
        ],
        roadmap: [
            {
                phase: 'The Partnership',
                step: '01',
                title: 'Brokerage & Strategy',
                description: 'Securing a high-impact partnership with ONE Musicfest on behalf of client Eventnoire, leveraging a deep ecosystem of culturally engaged subscribers.',
                tag: 'Strategy',
                media: getAssetUrl('assets/onemusicfest x eventnoire/onemusicfest.png')
            },
            {
                phase: 'Digital Campaign',
                step: '02',
                title: 'Campaign Execution',
                description: 'Leading efforts around presale ticketing, targeted email campaigns, SMS, and newsletter distribution to drive platform visibility.',
                tag: 'Activation',
                media: getAssetUrl('assets/onemusicfest x eventnoire/onemusicfest poster.jpg'),
                mediaPosition: 'right'
            },
            {
                phase: 'Integration',
                step: '03',
                title: 'In-Festival Data Acquisition',
                description: 'Using first-party data strategies and in-festival brand integrations to drive new audience acquisition and expand the marketing funnel.',
                tag: 'Integration',
                media: getAssetUrl('assets/onemusicfest x eventnoire/onemusicfest.png')
            }
        ]
    },
    {
        id: 17,
        title: 'BET+ x Braze',
        category: 'Digital Campaigns',
        client: 'BET+ & Braze',
        year: '2024 - 2025',
        role: 'Partnership Facilitator & Brand Programming',
        img: getAssetUrl('assets/BET+ x Braze/braze poster.png'),
        teaserImg: getAssetUrl('assets/BET+ x Braze/braze poster.png'),
        teaser: 'A product grant program working to break down barriers for underrepresented startup founders.',
        description: 'We partnered with Braze to launch the "Tech for an Equitable Future" initiative alongside BET+. This product grant program is dedicated to breaking down barriers for underrepresented startup founders. Providing 20 startups across the US, EMEA, and APAC with 12 months of free Braze access, a dedicated Customer Success Manager, and a private digital community. In return, BET+ provided 1:1 mentorship, hosted a Branding Masterclass, and gave founders access to their 4M+ subscriber base for unprecedented visibility.',
        deliverables: ['Partnership Facilitator', 'Internal Comms', 'Programming', 'Brand Messaging'],
        subtitle: 'Tech for an Equitable Future',
        highlight: 'PR & Brand Programming',
        themeLabel: 'STRATEGIC BRAND PROGRAMMING',
        themeDescription: 'In a world where Black-founded startups receive less than 0.5% of U.S. venture capital funding, and women-founded startups receive just 2.2%, this partnership mattered. We developed the strategic framework to connect Braze\'s customer engagement platform with BET+\'s cultural reach, launching at Cannes Lions 2024 and integrating into major conferences like FORGE and AFROTECH.',
        scaleValue: '20 Startups | 4M Subscribers',
        gallery: [
            getAssetUrl('assets/BET+ x Braze/braze poster.png'),
            getAssetUrl('assets/BET+ x Braze/IMG_0509.JPG'),
            getAssetUrl('assets/BET+ x Braze/IMG_4960.PNG'),
            getAssetUrl('assets/BET+ x Braze/IMG_4966.PNG'),
            getAssetUrl('assets/BET+ x Braze/IMG_4967.PNG'),
            getAssetUrl('assets/BET+ x Braze/IMG_4968.PNG'),
            getAssetUrl('assets/BET+ x Braze/IMG_4969.PNG'),
            getAssetUrl('assets/BET+ x Braze/IMG_9696.PNG')
        ],
        partnerLogos: [
            { src: getAssetUrl('BET_logo'), mode: 'monochrome', size: 'wide', alt: 'BET+', scale: 1.3 }
        ],
        roadmap: [
            {
                phase: 'The Partnership',
                step: '01',
                title: 'Tech for an Equitable Future',
                description: 'Structuring a robust product grant where Braze provided enterprise-level access and support, while BET+ delivered 1:1 mentorship and subscriber spotlights.',
                tag: 'Strategy',
                media: getAssetUrl('assets/BET+ x Braze/IMG_4966.PNG')
            },
            {
                phase: 'Global Launch',
                step: '02',
                title: 'PR & Brand Programming',
                description: 'Launching the initiative globally at the Cannes Lions Festival 2024 in the Braze Lounge alongside Roc Nation.',
                tag: 'Activation',
                media: getAssetUrl('assets/BET+ x Braze/IMG_4967.PNG'),
                mediaPosition: 'right'
            },
            {
                phase: 'Amplification',
                step: '03',
                title: 'Conference Integrations',
                description: 'Expanding the program\'s footprint through high-visibility conference integrations at FORGE 2024 and AFROTECH 2024.',
                tag: 'Integration',
                media: getAssetUrl('assets/BET+ x Braze/IMG_4968.PNG')
            }
        ]
    },
    {
        id: 18,
        title: 'Average Joe',
        category: 'Digital Campaigns',
        client: 'BET+',
        year: '2023',
        role: 'Lead Brand Strategist & Copywriter',
        img: getAssetUrl('assets/average joe/average joe poster.jpg'),
        teaserImg: getAssetUrl('assets/average joe/average joe poster.jpg'),
        video: getAssetUrl('assets/average joe/average joe main video.mp4'),
        teaser: 'A Clio Award-winning integrated campaign combining CRM, interactive games, and sports integration.',
        description: 'At Paramount I contributed to a Clio Award-winning campaign for Average Joe, combining brand messaging, lifecycle marketing, CRM, Snapchat filters, an awards show, and a Pittsburgh Steelers integration to engage audiences and deliver measurable results. Using metrics and focus group insights, I\'ve built strategies that connect the BET+ brand with its audiences in unforgettable ways.',
        deliverables: ['Lifecycle Marketing', 'CRM Strategy', 'Gamified AR Lenses', 'Interactive Gaming', 'Social Ad Rollout', 'Sports Integration'],
        subtitle: 'BET+ Original Series',
        highlight: 'Clio Integrated Campaign',
        themeLabel: 'DIGITAL INNOVATION & LIFECYCLE',
        themeDescription: 'Using metrics and focus group insights, I built strategies that connected the BET+ brand with its audiences in unforgettable ways—rolling out immersive interactive games, gamified AR lenses, and a bespoke Pittsburgh Steelers broadcast integration.',
        scaleValue: 'Multi-Platform Campaign',
        gallery: [
            getAssetUrl('assets/average joe/average joe poster.jpg'),
            getAssetUrl('assets/average joe/average joe.png'),
            getAssetUrl('assets/average joe/average joe 1 .png'),
            getAssetUrl('assets/average joe/average joe 3.png'),
            getAssetUrl('assets/average joe/average joe 4.png'),
            getAssetUrl('assets/average joe/average joe main video.mp4'),
            getAssetUrl('assets/average joe/average joe phone video.mp4')
        ],
        partnerLogos: [
             { src: getAssetUrl('BET_logo'), mode: 'monochrome', size: 'wide', alt: 'BET+', scale: 1.3 }
        ],
        roadmap: [
            {
                phase: 'Digital Ecosystem',
                step: '01',
                title: 'Interactive Experiences',
                description: 'Developing a gamified Snapchat AR Lens, an Adikteev interactive game ("Search for Joe\'s Millions"), and multi-platform countdown elements natively connecting users to the show\'s narrative.',
                tag: 'Digital',
                media: getAssetUrl('assets/average joe/average joe phone video.mp4')
            },
            {
                phase: 'Partnership Integration',
                step: '02',
                title: 'Pittsburgh Steelers',
                description: 'Executing an anchor sports partnership featuring in-show product integration and custom promotional spots with the Pittsburgh Steelers during wildcard weekend.',
                tag: 'Integration',
                media: getAssetUrl('assets/average joe/average joe 3.png'),
                mediaPosition: 'right'
            },
            {
                phase: 'Accolades',
                step: '03',
                title: 'Clio Award Shortlist',
                description: 'The campaign successfully reached audiences across all fragmented channels, earning a prestigious Clio Entertainment Shortlist designation for Integrated Campaign.',
                tag: 'Awards',
                media: getAssetUrl('assets/average joe/average joe 1 .png')
            }
        ],
        awards: [
            { group: 'CLIO Entertainment Awards', count: 1, tier: 'standard', note: 'Shortlist: Television | Series: Integrated Campaign' }
        ]
    },
    {
        id: 19,
        title: 'The Come Up Brunch',
        category: 'Event Producing and Programming',
        client: 'The Come Up / The One Club for Creativity',
        year: '2024',
        role: 'Co-Founder, Programming Director & Creative Strategist',
        img: '',
        teaserImg: '',
        teaser: 'A networking experience providing marginalized groups a pathway to a seat at the table.',
        description: 'The Come Up Brunch is natively a networking event series designed to give marginalized groups a pathway to a seat at the table, spark conversation, build relationships, and gain resources. The event is an industry-wide call to all mid-level advertisers and above to join important conversations accompanied by a soulful brunch and lively music. All disciplines including creative, strategy, account, media, entertainment, etc., were welcome to attend.',
        deliverables: ['Strategic Partnerships', 'Panel Programming', 'Creative Strategy', 'Vendor & Volunteer Management'],
        subtitle: 'Networking Experience & Panel Series',
        highlight: '11,175+ Connections',
        themeLabel: 'COMMUNITY & CULTURAL EMPOWERMENT',
        themeDescription: 'It\'s no secret that you can find Black people at brunch. Food is a way our BIPOC community comes together to share culture. We transformed a cultural staple into an actionable pathway connecting diverse professionals with career coaching, job opportunities with Black HR reps, and thousands of networking connections.',
        scaleValue: '150+ Attendees | 11,175+ Interactions',
        gallery: [],
        roadmap: [
            {
                phase: 'The Vision',
                step: '01',
                title: 'Strategic Partnerships',
                description: 'Collaborating with The One Club for Creativity and major sponsors like Chemistry to build an industry-wide call to all mid-level advertisers.',
                tag: 'Strategy',
                media: ''
            },
            {
                phase: 'Programming',
                step: '02',
                title: 'Curated Panels',
                description: 'Directing multiple impactful panel series including "Breaking Into Advertising," "Access Granted," "Laid Off: The Good, The Bad, & The Ugly," and "Your Network Is Your Net Worth."',
                tag: 'Curation',
                media: '',
                mediaPosition: 'right'
            },
            {
                phase: 'Impact',
                step: '03',
                title: 'Tangible Connections',
                description: 'Facilitating over 11,175 networking connections, providing career coaching, and generating job opportunities directly with Black HR representatives.',
                tag: 'Result',
                media: ''
            }
        ]
    },
    {
        id: 20,
        title: 'Sprite',
        category: 'Copywriting',
        client: 'Sprite',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('assets/sprite/sprite poster.png'),
        teaserImg: getAssetUrl('assets/sprite/sprite poster.png'),
        description: '',
        deliverables: [],
        subtitle: '',
        highlight: '',
        themeLabel: '',
        themeDescription: '',
        scaleValue: '',
    },
    {
        id: 24,
        title: 'Kids Foot Locker',
        category: 'Copywriting',
        client: 'Foot Locker',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('assets/kids foot locker/kids foot locker poster.png'),
        teaserImg: getAssetUrl('assets/kids foot locker/kids foot locker poster.png'),
        description: '',
        deliverables: [],
        subtitle: '',
        highlight: '',
        themeLabel: '',
        themeDescription: '',
        scaleValue: '',
    },
    {
        id: 21,
        title: 'Instagram Shop',
        category: 'Copywriting',
        client: 'Instagram',
        year: '2023',
        role: 'Copywriter',
        img: '',
        description: '',
        deliverables: [],
        subtitle: '',
        highlight: '',
        themeLabel: '',
        themeDescription: '',
        scaleValue: '',
    },
    {
        id: 22,
        title: 'Cards Against Concussions',
        category: 'Copywriting',
        client: 'PADV',
        year: '2023',
        role: 'Copywriter',
        img: '',
        description: '',
        deliverables: [],
        subtitle: '',
        highlight: '',
        themeLabel: '',
        themeDescription: '',
        scaleValue: '',
    },
    {
        id: 23,
        title: 'Philadelphia',
        category: 'Copywriting',
        client: 'Kraft Philadelphia',
        year: '2023',
        role: 'Copywriter',
        img: '',
        description: '',
        deliverables: [],
        subtitle: '',
        highlight: '',
        themeLabel: '',
        themeDescription: '',
        scaleValue: '',
    },
    {
        id: 24,
        title: 'Popeyes',
        category: 'Copywriting',
        client: 'Popeyes',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('assets/popeyes/Gemini_Generated_Image_gtyk2gtyk2gtyk2g.png'),
        teaserImg: getAssetUrl('assets/popeyes/Gemini_Generated_Image_gtyk2gtyk2gtyk2g.png'),
        description: '',
        deliverables: [],
        subtitle: '',
        highlight: '',
        themeLabel: '',
        themeDescription: '',
        scaleValue: '',
    },
    {
        id: 25,
        title: 'Holiday Slay Shuffle',
        category: 'Copywriting',
        client: 'Kelsey Nashe',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('assets/shuffle slay/Gemini_Generated_Image_9tf0619tf0619tf0.png'),
        teaserImg: getAssetUrl('assets/shuffle slay/Gemini_Generated_Image_9tf0619tf0619tf0.png'),
        description: '',
        deliverables: [],
        subtitle: '',
        highlight: '',
        themeLabel: '',
        themeDescription: '',
        scaleValue: '',
    },
    {
        id: 26,
        title: 'Radio Spots',
        category: 'Copywriting',
        client: 'BP / Dairy Queen',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('assets/bp x dq/dp x dq.png'),
        teaserImg: getAssetUrl('assets/bp x dq/dp x dq.png'),
        description: '',
        deliverables: [],
        subtitle: '',
        highlight: '',
        themeLabel: '',
        themeDescription: '',
        scaleValue: '',
    },
    {
        id: 27,
        title: "A Father's Love",
        category: 'Film Production',
        client: 'K&C',
        year: '2025',
        role: 'Copywriter',
        img: '',
        description: 'Copywriting and strategic development for the short film "A Father\'s Love," exploring themes of legacy and emotional resonance.',
        deliverables: ['Copywriting', 'Script Consulting', 'Brand Narrative'],
        subtitle: 'Short Film',
        highlight: 'Cinematic Storytelling',
        themeLabel: 'FILM PRODUCTION',
        themeDescription: 'Copywriting and strategic development for the short film "A Father\'s Love," exploring themes of legacy and emotional resonance.',
        scaleValue: '2025 Release',
    },
    {
        id: 28,
        title: "Minute Maid Twist 'n Sip",
        category: 'Copywriting',
        client: 'Minute Maid',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('assets/minute maid/Gemini_Generated_Image_8yqxm38yqxm38yqx.png'),
        teaserImg: getAssetUrl('assets/minute maid/Gemini_Generated_Image_8yqxm38yqxm38yqx.png'),
        description: '',
        deliverables: [],
        subtitle: '',
        highlight: '',
        themeLabel: '',
        themeDescription: '',
        scaleValue: '',
    },
    {
        id: 29,
        title: 'Kingdom Business',
        category: 'Digital Campaigns',
        client: 'BET+',
        year: '2023',
        role: 'Lead Brand Strategist & Copywriter',
        img: '',
        video: getAssetUrl('assets/kingdom business/kingdom business video.mov'),
        teaserImg: '',
        description: 'Lead brand strategy and copywriting for the BET+ original series Kingdom Business, creating a cohesive narrative across digital and broadcast channels.',
        deliverables: ['Brand Strategy', 'Copywriting', 'Digital Content', 'Broadcast Integration'],
        subtitle: 'BET+ Original Series',
        highlight: 'Series Launch',
        themeLabel: 'BRAND STRATEGY & COPYWRITING',
        themeDescription: 'Lead brand strategy and copywriting for the BET+ original series Kingdom Business, creating a cohesive narrative across digital and broadcast channels.',
        scaleValue: 'BET+ Original',
        gallery: [getAssetUrl('assets/kingdom business/kingdom business video.mov')],
    },
    {
        id: 30,
        title: 'Black At Cannes ATLANTA',
        category: 'Event Producing and Programming',
        client: 'Black At Cannes',
        year: '2024',
        role: 'Global Director and Producer',
        img: getAssetUrl('assets/Black At Cannes ATLANTA/blackat_atlanta (1).JPG'),
        teaserImg: getAssetUrl('assets/Black At Cannes ATLANTA/blackat_atlanta (1).JPG'),
        video: getAssetUrl('assets/Black At Cannes ATLANTA/ABE.mp4'),
        description: 'The Atlanta activation of Black At Cannes, celebrating excellence in the local market with high-level networking and insightful panels.',
        deliverables: ['Event Production', 'Talent Curation', 'Sponsor Integration', 'Community Engagement'],
        subtitle: 'Atlanta Activation',
        highlight: 'Community Excellence',
        themeLabel: 'EVENT PRODUCTION',
        themeDescription: 'The Atlanta activation of Black At Cannes, celebrating excellence in the local market with high-level networking and insightful panels.',
        scaleValue: 'Local Market Leader',
        gallery: [
            getAssetUrl('assets/Black At Cannes ATLANTA/blackat_atlanta (1).JPG'),
            getAssetUrl('assets/Black At Cannes ATLANTA/blackat_atlanta (2).JPG'),
            getAssetUrl('assets/Black At Cannes ATLANTA/blackat_atlanta (2).jpeg'),
            getAssetUrl('assets/Black At Cannes ATLANTA/blackat_atlanta (3).jpeg'),
            getAssetUrl('assets/Black At Cannes ATLANTA/blackat_atlanta (5).jpeg'),
            getAssetUrl('assets/Black At Cannes ATLANTA/blackat_atlanta (6).jpeg'),
            getAssetUrl('assets/Black At Cannes ATLANTA/blackat_atlanta (7).JPG'),
            getAssetUrl('assets/Black At Cannes ATLANTA/blackat_atlanta (9).JPG'),
            getAssetUrl('assets/Black At Cannes ATLANTA/ABE.mp4')
        ],
    },
];


const StatCounter = ({ to, duration = 1.5 }: { to: number; duration?: number }) => {
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

const GoldDust = ({ active }: { active: boolean }) => {
    const particles = Array.from({ length: 15 });
    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
            <AnimatePresence>
                {active && particles.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ 
                            x: 0, 
                            y: 0, 
                            scale: 0, 
                            opacity: 1 
                        }}
                        animate={{ 
                            x: (Math.random() - 0.5) * 300, 
                            y: (Math.random() - 0.5) * 300, 
                            scale: Math.random() * 1.5, 
                            opacity: 0,
                            rotate: Math.random() * 360
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            duration: 0.8 + Math.random() * 0.4, 
                            ease: "easeOut" 
                        }}
                        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#fbbf24] mix-blend-screen"
                        style={{ 
                            filter: `blur(${Math.random() * 2}px)`
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const FloatingAwardIcon = ({ src, alt }: { src: string; alt: string }) => {
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
            className="relative z-30 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
        >
            <img 
                src={src} 
                alt={alt} 
                className="h-28 md:h-36 w-auto object-contain scale-110"
            />
        </motion.div>
    );
};

const AwardCard = ({ award, i }: { award: Award; i: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    const tierStyles = {
        gold: 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-yellow-900/5',
        silver: 'border-slate-400/50 shadow-[0_0_20px_rgba(148,163,184,0.1)] bg-slate-900/5',
        bronze: 'border-orange-700/50 shadow-[0_0_20px_rgba(194,120,57,0.1)] bg-orange-900/5',
        standard: 'border-white/10 transition-colors hover:border-white/30 bg-white/5'
    }[award.tier || 'standard'];

    const getAwardImg = (group: string) => {
        const g = group.toLowerCase();
        if (g.includes('academy')) return getAssetUrl('oscar');
        if (g.includes('bafta')) return getAssetUrl('bafta');
        if (g.includes('grammy')) return getAssetUrl('grammy');
        if (g.includes('critics')) return getAssetUrl('bafta');
        if (g.includes('globe')) return getAssetUrl('globe');
        return getAssetUrl('oscar');
    };

    return (
        <Reveal key={i} delay={i * 100}>
            <div 
                className={`group border-l-2 p-10 backdrop-blur-sm rounded-r-lg flex flex-col justify-between min-h-[380px] relative overflow-hidden transition-all duration-700 ${tierStyles}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Suggestion: Gold Dust Burst */}
                <GoldDust active={isHovered} />

                {/* Suggestion: Expansion Spotlight Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-yellow-500/10 blur-[60px] transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:scale-150 z-0 pointer-events-none`} />

                <div className="space-y-10 relative z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex items-end gap-5">
                            <span className="text-6xl md:text-8xl font-serif text-cream font-light leading-none">
                                <StatCounter to={award.count} />
                            </span>
                            <span className="text-cream/40 text-xs md:text-sm tracking-[0.4em] uppercase mb-4">
                                {award.count === 1 ? 'Win' : 'Wins'}
                            </span>
                        </div>
                        
                        {/* Suggestion: Floating 3D PNG Icon */}
                        <FloatingAwardIcon 
                            src={getAwardImg(award.group)} 
                            alt={award.group} 
                        />
                    </div>

                    <div className="space-y-5">
                        <h5 className="text-cream text-3xl md:text-4xl font-sans font-medium tracking-tight uppercase group-hover:text-rose transition-colors leading-tight">
                            {award.group}
                        </h5>
                        {award.nominations && (
                            <p className="text-white/40 text-sm md:text-base tracking-[0.25em] uppercase font-sans font-light">
                                {award.nominations} Total Nominations
                            </p>
                        )}
                    </div>
                </div>

                {award.note && (
                    <p className="text-cream/70 font-serif italic text-lg md:text-xl leading-relaxed pt-10 border-t border-white/10 mt-10 relative z-10">
                        {award.note}
                    </p>
                )}
            </div>
        </Reveal>
    );
};

const DetailPanel = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
    const { openModal } = useModal();
    const [isHeroInView, setIsHeroInView] = useState(true);
    const [volume, setVolume] = useState(0);
    const [showTooltip, setShowTooltip] = useState(true);
    const [isPipClosed, setIsPipClosed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isPortrait = project?.orientation === 'portrait';

    useEffect(() => {
        if (!isHeroInView) return;
        const timer = setTimeout(() => {
            setShowTooltip(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [isHeroInView]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        if (videoRef.current) {
            videoRef.current.volume = newVol;
            videoRef.current.muted = newVol === 0;
        }
    };

    const toggleMute = () => {
        const newVol = volume === 0 ? 1 : 0;
        setVolume(newVol);
        if (videoRef.current) {
            videoRef.current.volume = newVol;
            videoRef.current.muted = newVol === 0;
        }
    };
    
    useEffect(() => {
        if (isHeroInView) {
            setIsPipClosed(false);
        }
    }, [isHeroInView]);
    
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

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrolled = e.currentTarget.scrollTop;
        if (scrolled > window.innerHeight * 0.75) {
            setIsHeroInView(false);
        } else {
            setIsHeroInView(true);
        }
    };

    if (!project) return null;

    const filteredGallery = project.gallery?.filter(img => 
        !img.toLowerCase().includes('solo') && 
        !img.toLowerCase().includes('logo') &&
        !img.toLowerCase().includes('background')
    ) || [];

    return (
        <div className="fixed inset-0 z-[200] animate-slide-in-right pointer-events-none bg-ink">
            {project.video && (
                <motion.div 
                    layout
                    initial={false}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`pointer-events-auto overflow-hidden transition-all duration-500 ${
                        !isHeroInView && isPipClosed ? '!opacity-0 !pointer-events-none' : ''
                    } ${
                        isHeroInView 
                            ? isPortrait
                                ? 'absolute top-0 left-0 w-full h-screen lg:top-1/2 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[32vw] lg:h-auto lg:aspect-[9/16] lg:rounded-2xl z-0 lg:shadow-2xl'
                                : 'absolute top-0 left-0 w-full h-screen z-0'
                            : isPortrait
                                ? 'absolute bottom-8 right-8 w-40 md:w-56 aspect-[9/16] z-[250] rounded-xl flex shadow-2xl border border-cream/10 shadow-ember group/pip'
                                : 'absolute bottom-8 right-8 w-60 md:w-80 aspect-video z-[250] rounded-sm flex shadow-2xl border border-cream/10 shadow-ember group/pip'
                    }`}
                >
                    <video
                        ref={videoRef}
                        src={project.video}
                        autoPlay
                        loop
                        muted={volume === 0}
                        playsInline
                        className="w-full h-full object-cover brightness-[0.7] scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent transition-opacity duration-700 pointer-events-none ${isHeroInView ? 'opacity-100' : 'opacity-0'}`} />
                    <button 
                        onClick={() => setIsPipClosed(true)} 
                        className={`absolute top-4 right-4 z-50 text-cream/70 hover:text-cream bg-black/40 hover:bg-black/80 rounded-full p-2 backdrop-blur-md transition-all duration-300 outline-none ${!isHeroInView ? 'opacity-0 group-hover/pip:opacity-100' : 'opacity-0 pointer-events-none'}`}
                        aria-label="Close Picture-in-Picture"
                    >
                        <X size={16} strokeWidth={1.5} />
                    </button>
                    <button 
                        onClick={toggleMute} 
                        className={`absolute bottom-4 right-4 z-50 text-cream/70 hover:text-cream bg-black/40 hover:bg-black/80 rounded-full p-2 backdrop-blur-md transition-all duration-300 outline-none ${!isHeroInView ? 'opacity-0 group-hover/pip:opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                        {volume === 0 ? <VolumeX size={16} strokeWidth={1.5} /> : <Volume2 size={16} strokeWidth={1.5} />}
                    </button>
                </motion.div>
            )}

            <div ref={scrollRef} onScroll={handleScroll} className="absolute inset-0 overflow-y-auto custom-scrollbar pointer-events-auto">
                <section className="relative h-screen w-full flex flex-col justify-end p-12 md:p-24 pointer-events-none">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {!project.video && (
                            <>
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full transition-all duration-[1500ms] ease-out pointer-events-auto object-cover brightness-[0.7] scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                            </>
                        )}
                    </div>

                    <div className="relative z-10 w-full pointer-events-auto">
                        <Reveal mode="mask">
                            <span className="text-rose text-[0.6rem] md:text-xs tracking-[0.5em] uppercase font-sans mb-6 block">
                                {project.category} · {project.year}
                            </span>
                        </Reveal>
                        <Reveal delay={200} mode="mask">
                            <h2 className="text-6xl md:text-[6.5rem] font-serif text-cream leading-[0.9] tracking-tighter uppercase mb-6 drop-shadow-2xl">
                                {project.title}
                            </h2>
                        </Reveal>
                        <Reveal delay={400} mode="mask">
                            <p className="text-cream/60 font-serif italic text-lg md:text-2xl max-w-2xl border-l-2 border-burgundy/40 pl-6 ml-1">
                                {project.subtitle}
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section className="py-32 md:py-48 px-8 md:px-24 bg-ink border-y border-white/5">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
                        <div className="space-y-16">
                            <Reveal>
                                <div>
                                    <p className="text-rose/50 text-[0.55rem] tracking-[0.4em] uppercase mb-4">The Narrative</p>
                                    <h4 className="text-cream text-[0.7rem] tracking-[0.2em] uppercase font-sans mb-10 border-b border-white/5 pb-6">
                                        {project.themeLabel}
                                    </h4>
                                    <p className="text-cream/70 font-serif italic text-2xl md:text-4xl leading-relaxed">
                                        {project.themeDescription}
                                    </p>
                                </div>
                            </Reveal>
                        </div>

                        <div className="space-y-24">
                            <Reveal delay={200}>
                                <div className="grid grid-cols-2 gap-12 border-t border-white/5 pt-10">
                                    <div>
                                        <p className="text-rose/50 text-[0.65rem] tracking-[0.4em] uppercase mb-4">Project Scale</p>
                                        <span className="text-cream text-2xl font-serif italic">{project.scaleValue}</span>
                                    </div>
                                    <div>
                                        <p className="text-rose/50 text-[0.65rem] tracking-[0.4em] uppercase mb-4">Release Year</p>
                                        <span className="text-cream text-2xl font-serif italic">{project.year}</span>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={300}>
                                <div>
                                    <p className="text-rose/50 text-[0.65rem] tracking-[0.4em] uppercase mb-10">Key Deliverables</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                        {project.deliverables.map((d, i) => (
                                            <li key={i} className="flex items-center gap-4 text-cream font-sans text-lg group">
                                                <span className="w-1.5 h-1.5 rounded-full bg-burgundy/40 group-hover:bg-rose transition-colors" />
                                                <span className="opacity-60 group-hover:opacity-100 transition-opacity">{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>

                            {project.partnerLogos && (() => {
                                const row1 = project.partnerLogos.filter((l: any) => l.size !== 'full');
                                const row2 = project.partnerLogos.filter((l: any) => l.size === 'full');
                                const filterClass = (mode: string) => {
                                    if (mode === 'none') return '';
                                    return mode === 'blend' ? 'invert mix-blend-screen' : 
                                           mode === 'ces' ? 'brightness-[2] saturate-0 opacity-50' : 
                                           'brightness-0 invert opacity-50';
                                };

                                return (
                                    <Reveal delay={400}>
                                        <div className="border-t border-white/5 pt-10">
                                            <p className="text-rose/50 text-[0.65rem] tracking-[0.4em] uppercase mb-10">Partners</p>
                                            <div className="flex flex-wrap items-center gap-x-12 gap-y-8 md:gap-x-16 mb-12">
                                                {row1.map((logo: any, i: number) => {
                                                    const src = logo.src || logo;
                                                    const mode = logo.mode || 'monochrome';
                                                    const size = logo.size || 'wide';
                                                    const scale = logo.scale || 1;
                                                    const sizeClass = size === 'icon' ? 'h-14 md:h-16 w-auto' : 
                                                                    size === 'square' ? 'h-12 md:h-14 w-auto max-w-[100px]' : 
                                                                    'h-9 md:h-11 w-auto max-w-[180px] md:max-w-[240px]';
                                                    return (
                                                        <div key={i} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
                                                            <img src={src} alt={logo.alt || 'Partner'} className={`object-contain ${sizeClass} ${filterClass(mode)}`} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {row2.length > 0 && (
                                                <div className="flex flex-row flex-wrap items-center gap-x-12 gap-y-8 border-t border-white/5 pt-8">
                                                    {row2.map((logo: any, i: number) => (
                                                        <div key={i} style={{ transform: `scale(${logo.scale || 1})`, transformOrigin: 'left center' }}>
                                                            <img src={logo.src || logo} alt={logo.alt || 'Partner'} className={`h-7 md:h-9 w-auto object-contain object-left ${filterClass(logo.mode || 'monochrome')}`} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Reveal>
                                );
                            })()}
                        </div>
                    </div>
                </section>

                {project.awards && project.awards.length > 0 && (
                    <section className="py-32 md:py-48 px-8 md:px-24 bg-[#0d0709] border-y border-white/5 overflow-hidden relative">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-burgundy/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                        
                        <div className="max-w-7xl mx-auto relative z-10">
                            {/* Section Header */}
                            <Reveal>
                                <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                                    <div>
                                        <p className="text-rose text-[0.65rem] tracking-[0.5em] uppercase mb-4 flex items-center gap-3">
                                            <Sparkles size={12} className="animate-pulse" />
                                            Accolades & Recognition
                                        </p>
                                        <h3 className="text-5xl md:text-[6.5rem] font-serif text-cream italic uppercase tracking-tighter leading-none">
                                            The <span className="text-rose">Award</span> Season
                                        </h3>
                                    </div>

                                    {/* Suggestion 1: Summary Stat Bar */}
                                    <div className="flex items-center gap-12 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-6 rounded-sm">
                                        <div className="text-center">
                                            <p className="text-[0.6rem] tracking-[0.2em] text-cream/40 uppercase mb-1">Total Wins</p>
                                            <p className="text-3xl font-serif text-cream"><StatCounter to={project.awards.reduce((acc, curr) => acc + curr.count, 0)} /></p>
                                        </div>
                                        <div className="w-px h-12 bg-white/10" />
                                        <div className="text-center">
                                            <p className="text-[0.6rem] tracking-[0.2em] text-cream/40 uppercase mb-1">Nominations</p>
                                            <p className="text-3xl font-serif text-cream">{project.awards.find(a => a.group.includes('Academy'))?.nominations || 16}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Awards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-24 mb-32">
                                {project.awards.map((award: Award, i: number) => (
                                    <AwardCard key={i} award={award} i={i} />
                                ))}
                            </div>

                            {/* Suggestion 4: Historic Callout Card */}
                            <Reveal delay={600}>
                                <div className="bg-gradient-to-r from-burgundy/20 to-rose/5 border border-rose/20 p-12 md:p-16 rounded-lg relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-rose/10 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-rose/20 transition-colors duration-1000" />
                                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 items-center">
                                        <div className="w-24 h-24 rounded-full bg-rose/10 flex items-center justify-center border border-rose/30">
                                            <Sparkles className="text-rose" size={40} />
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-rose text-[0.7rem] tracking-[0.4em] uppercase font-sans">Historic Achievement</p>
                                            <h4 className="text-2xl md:text-4xl font-serif text-cream italic leading-tight">
                                                “Autumn Durald Arkapaw made history as the <span className="text-rose underline decoration-rose/30 underline-offset-8">first woman to win</span> Best Cinematography at the Oscars for Sinners.”
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </section>
                )}

                {project.roadmap && project.roadmap.length > 0 && (
                    <RoadmapSection steps={project.roadmap} scrollRef={scrollRef} />
                )}

                {filteredGallery.length > 0 && (
                    <section className="py-32 md:py-48 px-8 md:px-24 bg-[#0a0507]">
                        <div className="max-w-7xl mx-auto">
                            <div className="mb-24 flex items-end justify-between border-b border-white/5 pb-8">
                                <p className="text-rose/50 text-[0.65rem] tracking-[0.4em] uppercase">Production Gallery</p>
                                <span className="text-cream/20 font-serif italic">{filteredGallery.length} Selected Assets</span>
                            </div>
                            <div className="columns-1 md:columns-2 lg:columns-2 gap-8 space-y-8">
                                {filteredGallery.map((img, i) => (
                                    <Reveal key={i} delay={i * 50}>
                                        <div className="break-inside-avoid overflow-hidden bg-white/5 border border-white/5 group relative">
                                            <img src={img} alt={`Gallery ${i}`} loading="lazy" className="w-full h-auto object-contain transition-transform duration-[2000ms] group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-ink opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="py-32 md:py-64 bg-ink flex items-center justify-center">
                    <div className="text-center space-y-12">
                        <Reveal>
                            <h3 className="text-5xl md:text-8xl font-serif italic text-cream uppercase tracking-tighter leading-none">
                                Let&apos;s Make <br />
                                Something <span className="text-rose">Iconic.</span>
                            </h3>
                        </Reveal>
                        <Reveal delay={200}>
                            <button onClick={() => { onClose(); openModal(); }} className="inline-flex items-center gap-6 border border-rose/30 px-12 py-6 text-rose hover:bg-rose hover:text-ink transition-all duration-700 text-[0.7rem] tracking-[0.5em] uppercase font-sans group">
                                Start A Project
                                <span className="text-2xl group-hover:translate-x-3 transition-transform duration-500">→</span>
                            </button>
                        </Reveal>
                    </div>
                </section>
            </div>

            {project.video && (
                <div className={`fixed right-8 bottom-8 md:right-12 md:bottom-12 z-[300] flex items-center group/vol transition-all duration-700 pointer-events-auto ${isHeroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <AnimatePresence>
                        {showTooltip && volume === 0 && (
                            <motion.div initial={{ opacity: 0, scale: 0.9, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }} className="absolute -top-12 right-0 pointer-events-none origin-bottom-right">
                                <div className="bg-cream text-ink text-[0.6rem] px-4 py-2 rounded-full font-sans tracking-widest uppercase animate-bounce whitespace-nowrap shadow-2xl relative">
                                    Click to unmute sound
                                    <div className="absolute -bottom-1 right-6 w-3 h-3 bg-cream rotate-45 rounded-sm z-[-1]" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button onClick={toggleMute} className="text-cream/50 group-hover/vol:text-cream transition-colors cursor-pointer mr-2 outline-none">
                        {volume === 0 ? <VolumeX size={20} strokeWidth={1.5} /> : <Volume2 size={20} strokeWidth={1.5} />}
                    </button>
                    <input type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolumeChange} className="volume-slider pointer-events-auto" />
                </div>
            )}

            <button onClick={onClose} className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 flex items-center justify-center bg-cream/5 border border-cream/10 rounded-full text-cream/40 hover:bg-cream hover:text-ink transition-all duration-500 pointer-events-auto group">
                <span className="text-xl group-hover:rotate-90 transition-transform duration-500">✕</span>
            </button>
        </div>
    );
};

export default function ArchivesPage() {
    const { openModal } = useModal();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    const moviePremieres = [1, 2, 3, 4, 5, 6].map(id => projects.find(p => p.id === id)).filter((p): p is Project => p !== undefined);
    const executiveBrand = projects.filter(p => [8].includes(p.id));
    const digitalCampaigns = projects.filter(p => [7, 16, 17, 18].includes(p.id));
    
    // Categorized Programming & Production
    const blackat2023Projects = projects.filter(p => [9, 11, 13, 14].includes(p.id));
    const blackat2025Projects = projects.filter(p => [15].includes(p.id));
    const spikeLeeProjects = projects.filter(p => [10, 12].includes(p.id));
    const comeUpProjects = projects.filter(p => [19].includes(p.id));
    const copywritingProjects = projects.filter(p => [20, 21, 22, 23, 24, 25, 26, 27, 28].includes(p.id));

    return (
        <div className={`bg-ink text-cream min-h-screen selection:bg-rose selection:text-ink transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <TopNav active={loaded} forceDark={false} />
            <div className="noise-overlay opacity-[0.03]"></div>
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] watermark-text" style={{ transform: 'rotate(-5deg)' }}>Our Work</div>
                <div className="absolute top-[40%] -right-[15%] watermark-text" style={{ transform: 'rotate(15deg)', opacity: 0.02 }}>Cultural</div>
                <div className="absolute -bottom-[10%] -left-[5%] watermark-text" style={{ transform: 'rotate(-2deg)', opacity: 0.025 }}>K&C</div>
            </div>
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-burgundy/5 blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[0%] w-[50vw] h-[50vw] rounded-full bg-icy/10 blur-[150px]"></div>
            </div>

            <div className="py-48 container mx-auto px-8 max-w-7xl">
                <ProjectSection title="Movie Premieres & Integrated Activations" description="Blockbuster activations and immersive launch strategies for Hollywood's most anticipated releases." items={moviePremieres} onProjectClick={setSelectedProject} />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-48 md:mb-64" />
                <ProjectSection title="Executive Brand Management" description="Strategic brand positioning and high-stakes coordination for industry visionaries and cultural leaders." items={executiveBrand} onProjectClick={setSelectedProject} cols={4} />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-48 md:mb-64" />
                {/* ── Digital Campaigns Section ── */}
                <section className="mb-48 md:mb-64">
                    <div className="mb-20 md:mb-32 max-w-4xl">
                        <Reveal mode="mask">
                            <h2 className="text-4xl md:text-7xl font-serif text-cream uppercase mb-8 leading-[0.9]">
                                Digital <i>Campaigns</i>
                            </h2>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="text-lg md:text-2xl text-cream/40 font-serif italic border-l-2 border-rose/30 pl-8 ml-1 leading-relaxed">
                                Strategic digital marketing and culture-first storytelling for streaming platforms and digital identity.
                            </p>
                        </Reveal>
                    </div>

                    <div className="space-y-48 md:space-y-64">
                        {/* Primary Campaigns */}
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                                {digitalCampaigns.map((p, i) => (
                                    <Reveal key={p.id} delay={(i % 4) * 60}>
                                        <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        {/* Copywriting Subsection */}
                        <div>
                            <Reveal>
                                <h3 className="text-xl md:text-2xl text-rose/50 uppercase tracking-[0.4em] font-sans mb-12 border-b border-white/5 pb-4">
                                    COPYWRITING
                                </h3>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                                {copywritingProjects.map((p, i) => (
                                    <Reveal key={p.id} delay={(i % 4) * 60}>
                                        <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-48 md:mb-64" />
                
                {/* ── International Events Section ── */}
                <section className="mb-48 md:mb-64">
                    <div className="mb-20 md:mb-32 max-w-4xl">
                        <Reveal mode="mask">
                            <h2 className="text-4xl md:text-7xl font-serif text-cream uppercase mb-8 leading-[0.9]">
                                Programming and <i>Producing</i> International <i>Events</i>
                            </h2>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="text-lg md:text-2xl text-cream/40 font-serif italic border-l-2 border-rose/30 pl-8 ml-1 leading-relaxed">
                                Curated luxury experiences and global summits at the intersection of culture and industry.
                            </p>
                        </Reveal>
                    </div>

                    <div className="space-y-48 md:space-y-64">
                        {/* Spike Lee Subsection */}
                        <div>
                            <Reveal>
                                <h3 className="text-xl md:text-2xl text-rose/50 uppercase tracking-[0.4em] font-sans mb-12 border-b border-white/5 pb-4">
                                    SPIKE LEE
                                </h3>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                                {spikeLeeProjects.map((p, i) => (
                                    <Reveal key={p.id} delay={(i % 4) * 60}>
                                        <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        {/* Blackat Subsection */}
                        <div>
                            <Reveal>
                                <h3 className="text-xl md:text-2xl text-rose/50 uppercase tracking-[0.4em] font-sans mb-16 border-b border-white/5 pb-4">
                                    the BLACKAT
                                </h3>
                            </Reveal>
                            
                            <div className="space-y-32">
                                {/* 2023 Programming */}
                                <div>
                                    <Reveal>
                                        <h4 className="text-lg md:text-xl text-cream/40 uppercase tracking-[0.2em] font-serif italic mb-10">
                                            2023 Programming
                                        </h4>
                                    </Reveal>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                                        {blackat2023Projects.map((p, i) => (
                                            <Reveal key={p.id} delay={(i % 4) * 60}>
                                                <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                            </Reveal>
                                        ))}
                                    </div>
                                </div>

                                {/* 2025 Programming */}
                                <div className="pt-24 md:pt-32">
                                    <Reveal>
                                        <h4 className="text-lg md:text-xl text-cream/40 uppercase tracking-[0.2em] font-serif italic mb-10">
                                            2025 Programming
                                        </h4>
                                    </Reveal>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                                        {blackat2025Projects.map((p, i) => (
                                            <Reveal key={p.id} delay={(i % 4) * 60}>
                                                <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                            </Reveal>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* The Come Up Subsection */}
                        <div>
                            <Reveal>
                                <h3 className="text-xl md:text-2xl text-rose/50 uppercase tracking-[0.4em] font-sans mb-12 border-b border-white/5 pb-4">
                                    THE COME UP
                                </h3>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32 mb-32 md:mb-48">
                                {comeUpProjects.map((p, i) => (
                                    <Reveal key={p.id} delay={(i % 4) * 60}>
                                        <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <FooterCTA onBookClick={openModal} />
            <UtilityFooter />
            <DetailPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
}

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
    return (
        <div className={`group cursor-pointer relative hover:z-50 ${index % 2 === 1 ? 'md:mt-24' : ''}`} onClick={onClick}>

            {/* ── Card Image (clean, no labels) ── */}
            <div className="aspect-[4/5] relative overflow-visible">
                {project.id === 2 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('sinners_poster')}
                        backgroundImage={getAssetUrl('Sinners_background')}
                        hoverImage={getAssetUrl('MPJ_solo')}
                        logoImage={getAssetUrl('Sinners_logo')}
                        className="w-full h-full"
                    />
                ) : project.id === 3 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('tron')}
                        backgroundImage={getAssetUrl('Tron_background')}
                        hoverImage={getAssetUrl('Tron_solo')}
                        logoImage={getAssetUrl('Tron_logo')}
                        className="w-full h-full"
                    />
                ) : project.id === 4 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('zootopia')}
                        backgroundImage={getAssetUrl('Zootopia_background')}
                        hoverImage={getAssetUrl('Zootopia_solo')}
                        logoImage={getAssetUrl('Zootopia_logo')}
                        className="w-full h-full"
                    />
                ) : project.id === 5 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('avatar')}
                        backgroundImage={getAssetUrl('Avatar_background')}
                        hoverImage={getAssetUrl('Avatar_solo')}
                        logoImage={getAssetUrl('Avatar_logo')}
                        className="avatar-card w-full h-full"
                    />
                ) : project.id === 6 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('hoppers')}
                        backgroundImage={getAssetUrl('Hoppers_background')}
                        hoverImage={getAssetUrl('Hoppers_solo')}
                        logoImage={getAssetUrl('Hoppers_logo')}
                        className="w-full h-full"
                    />
                ) : project.id === 1 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('devil_wears_prada')}
                        backgroundImage={getAssetUrl('Devil_wears_prada_background')}
                        hoverImage={getAssetUrl('Devil_wears_prada_solo')}
                        logoImage={getAssetUrl('Devil_wears_prada_logo')}
                        className="w-full h-full"
                    />
                ) : project.id === 7 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('BET_is_the_cookout_poster')}
                        backgroundImage={getAssetUrl('BET_is_the_cookout_background')}
                        hoverImage={getAssetUrl('BET_is_the_cookout_solo')}
                        logoImage={getAssetUrl('BET_logo')}
                        className="bet-cookout-card w-full h-full"
                    />
                ) : project.id === 8 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('jason_harvey_poster')}
                        backgroundImage={getAssetUrl('jason_harvey_background')}
                        hoverImage={getAssetUrl('jason_harvey_solo')}
                        logoImage={getAssetUrl('jason_harvey_logo')}
                        className="jason-harvey-card w-full h-full"
                    />
                ) : project.id === 9 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('sneaker_ball_poster')}
                        backgroundImage={getAssetUrl('sneaker_ball_background')}
                        hoverImage={getAssetUrl('sneaker_ball_solo')}
                        logoImage={getAssetUrl('sneaker_ball_logo')}
                        className="sneaker-ball-card w-full h-full"
                    />
                ) : project.id === 10 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('spike_lee_fireside_chat_poster')}
                        backgroundImage={getAssetUrl('spike_lee_fireside_chat_background')}
                        hoverImage={getAssetUrl('spike_lee_fireside_chat_solo')}
                        logoImage={getAssetUrl('spike_lee_fireside_logo')}
                        className="spike-lee-fireside-card w-full h-full"
                    />
                ) : project.id === 11 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('creatives_at_sea_poster')}
                        backgroundImage={getAssetUrl('creatives_at_sea_background')}
                        hoverImage={getAssetUrl('creatives_at_sea_solo')}
                        logoImage={getAssetUrl('creatives_at_sea_logo')}
                        className="creatives-at-sea-card w-full h-full"
                    />
                ) : project.id === 12 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('spike_lee_dinner_poster')}
                        backgroundImage={getAssetUrl('spike_lee_dinner_background')}
                        hoverImage={getAssetUrl('spike_lee_dinner_solo')}
                        logoImage={getAssetUrl('-air-jordan')}
                        className="spike-lee-dinner-card w-full h-full"
                    />
                ) : project.id === 13 ? (
                    <ThreeDPosterCard
                        baseImage={getAssetUrl('CMO_brunch_poster')}
                        backgroundImage={getAssetUrl('CMO_brunch_background')}
                        hoverImage={getAssetUrl('CMO_brunch_solo')}
                        logoImage={getAssetUrl('BLKAT_FinalLogoColor_2')}
                        className="cmo-brunch-card w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full overflow-hidden relative rounded-sm bg-burgundy/5 border border-rose/5 transition-colors">
                        {project.img ? (
                            <img 
                                src={project.img} 
                                alt={project.title} 
                                className="w-full h-full transition-all duration-[1500ms] ease-out object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                                <span className="text-[0.45rem] tracking-[0.4em] uppercase text-cream/10">Coming Soon</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Subtle tint — fades on hover */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-burgundy/20 transition-opacity duration-500 group-hover:opacity-0" />
            </div>

            {/* ── Hover Metadata Strip (below card, hidden until hover) ── */}
            <div className="overflow-hidden">
                <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pt-4">
                    <div className="w-0 group-hover:w-full h-px bg-rose/15 transition-all duration-700 ease-out mb-3" />
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-[0.65rem] tracking-[0.4em] uppercase font-sans text-cream/30 shrink-0">
                            {String(project.id).padStart(2, '0')}
                        </span>
                        <h5 className="text-[0.9rem] md:text-[1rem] tracking-[0.2em] uppercase font-sans text-cream/70 flex-1">
                            {project.title}
                        </h5>
                        <span className="text-rose/80 text-lg shrink-0">→</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

const ProjectSection = ({ title, description, items, onProjectClick, cols = 3 }: { title: string; description: string; items: Project[]; onProjectClick: (p: Project) => void; cols?: number }) => (
    <section className="mb-48 md:mb-64">
        <div className="mb-20 md:mb-32 max-w-4xl">
            <Reveal mode="mask"><h2 className="text-4xl md:text-7xl font-serif text-cream uppercase mb-8 leading-[0.9]">{title.split(' ').map((word, idx) => (<span key={idx}>{idx % 2 === 1 ? <i className="font-light italic text-rose/60">{word}</i> : word}{' '}</span>))}</h2></Reveal>
            <Reveal delay={200}><p className="text-lg md:text-2xl text-cream/40 font-serif italic border-l-2 border-rose/30 pl-8 ml-1 leading-relaxed">{description}</p></Reveal>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-x-12 gap-y-32`}>
            {items.map((project, i) => (
                <Reveal key={project.id} delay={(i % cols) * 60}>
                    <ProjectCard project={project} index={i} onClick={() => onProjectClick(project)} />
                </Reveal>
            ))}
        </div>
    </section>
);
