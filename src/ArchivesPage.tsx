import { useState, useEffect, useRef } from 'react';
import {
    Reveal,
    TopNav,
    useModal,
    FooterCTA,
    UtilityFooter
} from './SharedComponents';
import { getAssetUrl } from './utils/assets';
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

export type AudioSpot = {
    title: string;
    src: string;
    duration: string;
    credit: string;
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
    galleryLayout?: 'masonry' | 'poster';
    audioSpots?: AudioSpot[];
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
                mediaPosition: '40% center',
            },
            {
                phase: 'Coordination',
                step: '02',
                title: 'HBCU Classic Partnership',
                description: 'Coordinating with Warner Bros, MACRO, and the NBA during the HBCU Classic at All-Star Weekend. Serving as the local market representative for Morehouse and Tuskegee screenings.',
                tag: 'Operations',
                media: getAssetUrl('sinners_4'),
                mediaPosition: '40% center',
            },
            {
                phase: 'On-Site Production',
                step: '03',
                title: 'Premiere & Execution',
                description: 'Directing on-site red carpet production, managing asset delivery, and overseeing audience engagement for advanced screenings.',
                tag: 'Execution',
                media: getAssetUrl('sinners_5'),
                mediaPosition: '40% center',
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
        img: getAssetUrl('tron_poster'),
        teaserImg: getAssetUrl('tron_poster'),
        teaser: 'A neon-drenched, world-building marketing campaign built for the digital age.',
        description: 'For the long-awaited Tron: Ares, K&C was brought on to lead the integrated activation strategy. We designed an immersive digital-physical campaign spanning pop-up experiences, social amplification, and influencer integration that captured the film\'s futuristic energy.',
        deliverables: ['Pop-Up Experience Design', 'Influencer & Talent Relations', 'Digital Content Strategy', 'Launch Event Production'],
        subtitle: 'Walt Disney Studios Campaign',
        highlight: 'Digital Identity',
        themeLabel: 'INTEGRATED MARKETING STRATEGY',
        themeDescription: 'For the long-awaited Tron: Ares, K&C was brought on to lead the integrated activation strategy. We designed an immersive digital-physical campaign spanning pop-up experiences, social amplification, and influencer integration that captured the film\'s futuristic energy.',
        scaleValue: 'Multi-Market Integration',
        video: getAssetUrl('Tron_video'),
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
        orientation: 'portrait',
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
        img: getAssetUrl('avatar'),
        teaserImg: getAssetUrl('avatar'),
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
    },
    {
        id: 6,
        title: 'Hoppers',
        category: 'Experiential Integrated Activations and Premieres',
        client: 'Netflix',
        year: '2024',
        role: 'Live Experience Production',
        img: getAssetUrl('hoppers_poster'),
        teaserImg: getAssetUrl('hoppers_poster'),
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
            getAssetUrl('hoppers_poster'),
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
        img: getAssetUrl('bet_is_the_cookout_poster'),
        video: getAssetUrl('Bet_Is_The_Cookout'),
        teaserImg: getAssetUrl('bet_is_the_cookout_poster'),
        teaser: 'Strategic content production and activation for the premier streaming service for Black culture.',
        description: 'Kelsey & Company collaborated with BET+ to develop and execute a comprehensive activation strategy. We focused on high-impact content production and cultural storytelling that resonated deeply with the platform\'s audience, strengthening its position as a cultural leader.',
        deliverables: ['Content Production', 'Activation Strategy', 'Culture-First Storytelling', 'Brand Integration'],
        subtitle: 'BET+ Content Strategy',
        highlight: 'Culture First',
        themeLabel: 'CONTENT PRODUCTION',
        themeDescription: 'Kelsey & Company collaborated with BET+ to develop and execute a comprehensive activation strategy. We focused on high-impact content production and cultural storytelling that resonated deeply with the platform\'s audience, strengthening its position as a cultural leader.',
        scaleValue: 'Streaming Content Reach',
        gallery: [
            getAssetUrl('BET_1'), 
            getAssetUrl('bet_is_the_cookout_poster'), 
            getAssetUrl('BET_is_the_cookout_solo'), 
            getAssetUrl('BET_is_the_cookout_background')
        ],
        partnerLogos: [
            { src: getAssetUrl('BET_logo'), mode: 'monochrome', size: 'wide',   alt: 'BET+', scale: 1.3 }
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
        video: getAssetUrl('spike_lee_fireside_chat_video'),
        orientation: 'portrait',
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
        video: getAssetUrl('spike_lee_dinner_video'),
        orientation: 'portrait',
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
        video: getAssetUrl('Thought Leadership Brunch Video'),
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
        orientation: 'portrait',
    },
    {
        id: 16,
        title: 'ONE Musicfest x Eventnoire',
        category: 'Digital Campaigns',
        client: 'Eventnoire / ONE Musicfest',
        year: '2025',
        role: 'Partnership Broker & Digital Strategy Lead',
        img: getAssetUrl('onemusicfest_poster'),
        teaserImg: getAssetUrl('onemusicfest_poster'),
        teaser: 'Secured a high-impact partnership with ONE Musicfest on behalf of client Eventnoire, leveraging over 1.2M subscribers for targeted audience acquisition.',
        description: 'Secured a high-impact partnership with ONE Musicfest on behalf of client Eventnoire. Led efforts around presale ticketing, audience engagement, and in-festival brand integrations to deepen consumer connection and drive platform visibility. The collaboration leveraged Eventnoire\'s ecosystem of over 1.2M culturally engaged subscribers through targeted email campaigns, SMS, banner ads, and national/regional newsletters. Additionally, we used first-party data strategies to drive new audience acquisition for ONE Musicfest—expanding their marketing funnel with qualified, affinity-aligned leads across key markets.',
        deliverables: ['Presale Ticketing Strategy', 'Audience Engagement', 'In-Festival Brand Integrations', 'First-Party Data Acquisition', 'Email & SMS Campaigns'],
        subtitle: 'High-impact partnership across digital and live channels.',
        highlight: 'Partnership',
        themeLabel: 'STRATEGIC AUDIENCE ACQUISITION',
        themeDescription: 'Secured a high-impact partnership with ONE Musicfest on behalf of client Eventnoire. Led efforts around presale ticketing, audience engagement, and in-festival brand integrations to deepen consumer connection and drive platform visibility.',
        scaleValue: '1.2M+ Engaged Subscribers',
        video: getAssetUrl('onemusicfest_video'),
        gallery: [
            getAssetUrl('onemusicfest_poster'),
            getAssetUrl('onemusicfest_image')
        ],
        partnerLogos: [
            { src: getAssetUrl('ONE_Musicfest_Logo'), mode: 'monochrome', size: 'wide', alt: 'ONE Musicfest', scale: 1.2 },
            { src: getAssetUrl('eventnoire_logo'), mode: 'monochrome', size: 'wide', alt: 'Eventnoire', scale: 1.2 }
        ],
    },
    {
        id: 17,
        title: 'BET+ x Braze',
        category: 'Digital Campaigns',
        client: 'BET+ & Braze',
        year: '2024 - 2025',
        role: 'Partnership Facilitator & Brand Programming',
        orientation: 'portrait',
        img: getAssetUrl('braze_poster'),
        teaserImg: getAssetUrl('braze_poster'),
        teaser: 'A product grant program working to break down barriers for underrepresented startup founders.',
        description: 'We partnered with Braze to launch the "Tech for an Equitable Future" initiative alongside BET+. This product grant program is dedicated to breaking down barriers for underrepresented startup founders. Providing 20 startups across the US, EMEA, and APAC with 12 months of free Braze access, a dedicated Customer Success Manager, and a private digital community. In return, BET+ provided 1:1 mentorship, hosted a Branding Masterclass, and gave founders access to their 4M+ subscriber base for unprecedented visibility.',
        deliverables: ['Partnership Facilitator', 'Internal Comms', 'Programming', 'Brand Messaging'],
        subtitle: 'Tech for an Equitable Future',
        highlight: 'PR & Brand Programming',
        themeLabel: 'STRATEGIC BRAND PROGRAMMING',
        themeDescription: 'In a world where Black-founded startups receive less than 0.5% of U.S. venture capital funding, and women-founded startups receive just 2.2%, this partnership mattered. We developed the strategic framework to connect Braze\'s customer engagement platform with BET+\'s cultural reach, launching at Cannes Lions 2024 and integrating into major conferences like FORGE and AFROTECH.',
        scaleValue: '20 Startups | 4M Subscribers',
        gallery: [
            getAssetUrl('braze_poster'),
            getAssetUrl('braze_image_1'),
            getAssetUrl('braze_image_2'),
            getAssetUrl('braze_image_3'),
            getAssetUrl('braze_image_4'),
            getAssetUrl('braze_image_5'),
            getAssetUrl('braze_image_6'),
            getAssetUrl('braze_image_7')
        ],
        partnerLogos: [
            { src: getAssetUrl('BET_logo'), mode: 'monochrome', size: 'wide', alt: 'BET+', scale: 1.3 }
        ],
    },
    {
        id: 18,
        title: 'Average Joe',
        category: 'Digital Campaigns',
        client: 'BET+',
        year: '2023',
        role: 'Lead Brand Strategist & Copywriter',
        img: getAssetUrl('average_joe_poster'),
        teaserImg: getAssetUrl('average_joe_poster'),
        video: getAssetUrl('Average Joe Main Video'),
        teaser: 'A Clio Award-winning integrated campaign combining CRM, interactive games, and sports integration.',
        description: 'At Paramount I contributed to a Clio Award-winning campaign for Average Joe, combining brand messaging, lifecycle marketing, CRM, Snapchat filters, an awards show, and a Pittsburgh Steelers integration to engage audiences and deliver measurable results. Using metrics and focus group insights, I\'ve built strategies that connect the BET+ brand with its audiences in unforgettable ways.',
        deliverables: ['Lifecycle Marketing', 'CRM Strategy', 'Gamified AR Lenses', 'Interactive Gaming', 'Social Ad Rollout', 'Sports Integration'],
        subtitle: 'BET+ Original Series',
        highlight: 'Clio Integrated Campaign',
        themeLabel: 'DIGITAL INNOVATION & LIFECYCLE',
        themeDescription: 'Using metrics and focus group insights, I built strategies that connected the BET+ brand with its audiences in unforgettable ways—rolling out immersive interactive games, gamified AR lenses, and a bespoke Pittsburgh Steelers broadcast integration.',
        scaleValue: 'Multi-Platform Campaign',
        gallery: [
            getAssetUrl('average_joe_poster'),
            getAssetUrl('average joe 1 '),
            getAssetUrl('average joe.png'),
            getAssetUrl('average joe 3'),
            getAssetUrl('average joe 4'),
            getAssetUrl('Average Joe Main Video'),
            getAssetUrl('average joe phone video')
        ],
        partnerLogos: [
             { src: getAssetUrl('BET_logo'), mode: 'monochrome', size: 'wide', alt: 'BET+', scale: 1.3 }
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
        img: getAssetUrl('the_come_up_brunch_poster'),
        teaserImg: getAssetUrl('the_come_up_brunch_poster'),
        video: getAssetUrl('the_come_up_brunch_video'),
        teaser: 'A networking experience providing marginalized groups a pathway to a seat at the table.',
        description: 'The Come Up Brunch is natively a networking event series designed to give marginalized groups a pathway to a seat at the table, spark conversation, build relationships, and gain resources. The event is an industry-wide call to all mid-level advertisers and above to join important conversations accompanied by a soulful brunch and lively music. All disciplines including creative, strategy, account, media, entertainment, etc., were welcome to attend.',
        deliverables: ['Strategic Partnerships', 'Panel Programming', 'Creative Strategy', 'Vendor & Volunteer Management'],
        subtitle: 'Networking Experience & Panel Series',
        highlight: '11,175+ Connections',
        themeLabel: 'COMMUNITY & CULTURAL EMPOWERMENT',
        themeDescription: 'It\'s no secret that you can find Black people at brunch. Food is a way our BIPOC community comes together to share culture. We transformed a cultural staple into an actionable pathway connecting diverse professionals with career coaching, job opportunities with Black HR reps, and thousands of networking connections.',
        scaleValue: '150+ Attendees | 11,175+ Interactions',
        gallery: [],
        orientation: 'portrait',
    },
    {
        id: 23,
        title: 'Sprite',
        category: 'Copywriting',
        client: 'Sprite',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('sprite_poster'),
        teaserImg: getAssetUrl('sprite_poster'),
        description: 'Bold, culture-driven copy for Sprite, focusing on the brand\'s long-standing connection to hip-hop and basketball culture. We developed messaging that felt authentic, sharp, and unmistakably Sprite.',
        deliverables: ['Brand Messaging', 'Cultural Strategy', 'Digital Copywriting'],
        subtitle: 'Sprite Brand Copy',
        highlight: 'Stay Fresh',
        themeLabel: 'CULTURAL AUTHENTICITY',
        themeDescription: 'The copywriting for Sprite was designed to resonate with an audience that values authenticity and cultural relevance above all else.',
        scaleValue: 'Global Brand Voice',
    },
    {
        id: 30,
        title: 'Kids Foot Locker',
        category: 'Copywriting',
        client: 'Foot Locker',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('kids_foot_locker_poster'),
        teaserImg: getAssetUrl('kids_foot_locker_poster'),
        description: 'Fun and engaging copy for Kids Foot Locker, designed to appeal to both parents and children. We balanced playfulness with brand authority to create a voice that was both cool and trustworthy.',
        deliverables: ['Campaign Copywriting', 'Social Media Messaging', 'Email Strategy'],
        subtitle: 'Kids Foot Locker Campaign',
        highlight: 'Fresh for School',
        themeLabel: 'MULTI-GENERATIONAL APPEAL',
        themeDescription: 'We crafted messaging that spoke to kids\' desire for style while highlighting the quality and selection that parents appreciate.',
        scaleValue: 'Retail Campaign',
    },
    {
        id: 24,
        title: 'Instagram Shop',
        category: 'Copywriting',
        client: 'Instagram',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('instagram_poster'),
        teaserImg: getAssetUrl('instagram_poster'),
        video: getAssetUrl('instagram_video'),
        description: 'Sleek, punchy copy for Instagram Shop, optimized for quick consumption and high conversion. We developed a voice that was inspiring, modern, and perfectly suited for the platform\'s visual-first environment.',
        deliverables: ['Digital Copywriting', 'UGC Strategy', 'Platform Brand Voice'],
        subtitle: 'Instagram E-Commerce',
        highlight: 'Shop the Look',
        themeLabel: 'DIGITAL-FIRST MESSAGING',
        themeDescription: 'The copy for Instagram Shop was designed to disappear—creating a seamless path from discovery to purchase without ever breaking the user\'s flow.',
        scaleValue: 'Global Platform Integration',
    },
    {
        id: 25,
        title: 'Cards Against Concussions',
        category: 'Copywriting',
        client: 'PADV',
        year: '2023',
        role: 'Copywriter',
        orientation: 'portrait',
        galleryLayout: 'poster',
        img: getAssetUrl('cards_against_concussion_poster'),
        teaserImg: getAssetUrl('cards_against_concussion_poster'),
        gallery: [
            getAssetUrl('cards_against_concussions_1'),
            getAssetUrl('cards_against_concussions_2'),
            getAssetUrl('cards_against_concussions_3'),
            getAssetUrl('cards_against_concussions_4')
        ],
        description: 'Witty, dark, and awareness-driven copy for Cards Against Concussions. This campaign used the familiar aesthetic of party games to shed light on a serious issue—domestic violence—in a way that was impossible to ignore.',
        deliverables: ['Guerrilla Marketing Copy', 'Concept Development', 'Brand Voice Subversion'],
        subtitle: 'PADV Awareness Campaign',
        highlight: 'Disruptive Awareness',
        themeLabel: 'CULTURAL SUBVERSION',
        themeDescription: 'By mimicking a popular cultural artifact, we were able to deliver a heavy message to an audience that might otherwise have looked away.',
        scaleValue: 'National Awareness Campaign',
    },
    {
        id: 26,
        title: 'Philadelphia',
        category: 'Copywriting',
        client: 'Kraft Philadelphia',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('philadelphia_poster'),
        teaserImg: getAssetUrl('philadelphia_poster'),
        description: 'Whimsical and relatable copy for Kraft Philadelphia, focusing on the simple joys of a morning well-spent. We developed a voice that was warm, inviting, and playfully conversational.',
        deliverables: ['Social Media Copywriting', 'Digital Ad Copy', 'Brand Storytelling'],
        subtitle: 'Kraft Philadelphia Brand Work',
        highlight: 'Spread the Love',
        themeLabel: 'WARM & RELATABLE VOICE',
        themeDescription: 'The copywriting focused on small, shared moments—the quiet of a kitchen, the ritual of a breakfast—to position Philadelphia as a staple of comfort.',
        scaleValue: 'Digital Campaign',
        video: getAssetUrl('philadelphia video'),
        gallery: [
            getAssetUrl('philadelphia (1)'),
            getAssetUrl('philadelphia (2)'),
            getAssetUrl('philadelphia (3)'),
        ],
    },
    {
        id: 27,
        title: 'Popeyes',
        category: 'Copywriting',
        client: 'Popeyes',
        year: '2023',
        role: 'Copywriter',
        orientation: 'portrait',
        galleryLayout: 'poster',
        img: getAssetUrl('popeyes_poster'),
        teaserImg: getAssetUrl('popeyes_poster'),
        description: 'Sharp, bold, and culture-heavy copy for Popeyes, leaning into the brand\'s Louisiana roots and its status as a fast-food disruptor. We developed a voice that was confident, sassy, and unmistakably authentic.',
        deliverables: ['Campaign Copywriting', 'Social Media Strategy', 'Digital Brand Voice'],
        subtitle: 'Popeyes Cultural Strategy',
        highlight: 'Love That Chicken',
        themeLabel: 'DISRUPTIVE BRAND VOICE',
        themeDescription: 'The copywriting for Popeyes was designed to be shared—using punchy, Twitter-ready language that ignited conversation and reinforced the brand\'s cultural dominance.',
        scaleValue: 'National Brand Campaign',
        gallery: [
            getAssetUrl('popeyes-01'),
            getAssetUrl('popeyess+2-02'),
            getAssetUrl('popeyes-03'),
        ],
    },
    {
        id: 22,
        title: 'Holiday Slay Shuffle',
        category: 'Copywriting',
        client: 'Kelsey Nashe',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('shuffle_slay_poster'),
        teaserImg: getAssetUrl('shuffle_slay_poster'),
        description: 'A festive and energetic campaign for Kelsey Nashe\'s Holiday Slay Shuffle. Our copywriting captured the spirit of the season with a modern, soulful twist.',
        deliverables: ['Campaign Copywriting', 'Social Media Strategy', 'Artist Brand Voice'],
        subtitle: 'Kelsey Nashe Holiday Campaign',
        highlight: 'Festive Slay',
        themeLabel: 'CULTURAL HOLIDAY POSITIONING',
        themeDescription: 'We developed a voice that felt both traditional and fresh, aligning the holiday campaign with contemporary cultural trends while maintaining an authentic, celebratory tone.',
        scaleValue: 'Digital Campaign',
        video: getAssetUrl('shuffle slay video'),
        gallery: [
            getAssetUrl('shuffle slay (1)'),
            getAssetUrl('shuffle slay (2)'),
        ],
    },
    {
        id: 21,
        title: 'Radio Spots for FM Radio',
        category: 'Copywriting',
        client: 'BP / Dairy Queen',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('radio_spot_poster'),
        teaserImg: getAssetUrl('radio_spot_poster'),
        description: 'A collection of radio commercials written for BP Morgan Oil and Dairy Queen, crafted for FM broadcast. Each 18–31 second spot balances brand voice with listener engagement, demonstrating precision copywriting for audio-first formats.',
        deliverables: ['FM Radio Copywriting', 'Brand Voice Development', 'Audio Script Production', 'Multi-Client Campaign'],
        subtitle: 'BP Morgan Oil & Dairy Queen',
        highlight: '3 Broadcast Spots',
        themeLabel: 'AUDIO-FIRST COPYWRITING',
        themeDescription: 'Radio demands economy of language—every word must earn its place. These spots were written to cut through the noise of FM airwaves, delivering brand messages that are memorable, clear, and emotionally resonant within seconds.',
        scaleValue: 'FM Radio Broadcast',
        audioSpots: [
            {
                title: 'BP Morgan Oil [Ice Cream]',
                src: getAssetUrl('Morgan_Oil_Ice_Cream_Jul28-Sep01'),
                duration: '0:18',
                credit: 'Copywriter: Kelsey Matthews'
            },
            {
                title: 'Dairy Queen [Breakfast – Female]',
                src: getAssetUrl('Dairy_Queen_Breakfast-Female_Aug2015'),
                duration: '0:31',
                credit: 'Copywriter: Kelsey Matthews'
            },
            {
                title: '07 Project 96 Radio Spot',
                src: getAssetUrl('07_Project_96_Radio_Spot'),
                duration: '0:31',
                credit: 'Copywriter: Kelsey Matthews'
            }
        ],
    },
    {
        id: 28,
        title: "A Father's Love",
        category: 'Copywriting',
        client: 'K&C',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('fathers_love_poster'),
        teaserImg: getAssetUrl('fathers_love_poster'),
        description: 'A poignant and emotional storytelling project exploring the depth of a father\'s love. Our copywriting focused on raw, authentic narratives that resonate on a universal level.',
        deliverables: ['Narrative Copywriting', 'Digital Storytelling', 'Brand Messaging'],
        subtitle: 'K&C Narrative Series',
        highlight: 'Emotional Impact',
        themeLabel: 'AUTHENTIC STORYTELLING',
        themeDescription: 'We crafted a narrative that prioritizes emotional truth and vulnerability, creating a lasting connection with the audience through powerful, understated prose.',
        scaleValue: 'Digital Series',
    },
    {
        id: 29,
        title: "Minute Maid Twist 'n Sip",
        category: 'Copywriting',
        client: 'Minute Maid',
        year: '2023',
        role: 'Copywriter',
        img: getAssetUrl('minute_maid_poster'),
        teaserImg: getAssetUrl('minute_maid_poster'),
        description: 'Dynamic and playful copy for Minute Maid\'s Twist \'n Sip campaign. We developed a voice that was energetic, approachable, and perfectly aligned with the product\'s fun-loving brand identity.',
        deliverables: ['Product Copywriting', 'Social Media Messaging', 'Digital Ad Copy'],
        subtitle: 'Minute Maid Campaign',
        highlight: 'Twist \'n Sip',
        themeLabel: 'PLAYFUL BRAND VOICE',
        themeDescription: 'The copy focused on the "twist" and "sip" experience, using punchy language and vibrant calls to action to drive engagement among younger demographics.',
        scaleValue: 'Digital Ad Campaign',
        video: getAssetUrl('minute maid video'),
    },
    {
        id: 31,
        title: 'Kingdom Business',
        category: 'Event Producing and Programming',
        client: 'BET+',
        year: '2024',
        role: 'Production',
        img: getAssetUrl('kingdom_business_poster'),
        teaserImg: getAssetUrl('kingdom_business_poster'),
        video: getAssetUrl('Kingdom Business Video'),
        description: 'Internal programming and brand integration for the BET+ original series Kingdom Business.',
        deliverables: ['Internal Programming', 'Brand Integration', 'Film Production'],
        subtitle: 'BET+ Original Series',
        highlight: 'Programming & Production',
        themeLabel: 'PROGRAMMING & PRODUCTION',
        themeDescription: 'We led the internal programming and strategic brand integration for Kingdom Business, ensuring the series resonated with its core audience while maintaining BET+\'s premium brand standards.',
        scaleValue: 'Original Series',
        orientation: 'portrait',
    },
    {
        id: 20,
        title: 'Radio Commercials',
        category: 'Copywriting',
        client: 'K&C Portfolio',
        year: '2024',
        role: 'Lead Copywriter',
        img: getAssetUrl('radio_commercials_poster'),
        teaserImg: getAssetUrl('radio_commercials_poster'),
        description: 'A curated selection of high-impact radio commercials designed for national and regional broadcast. These spots showcase specialized copywriting that captures brand essence and drives consumer action through audio storytelling.',
        deliverables: ['Radio Scripting', 'Brand Voice Alignment', 'Commercial Production', 'Targeted Messaging'],
        subtitle: 'Broadcast Audio Campaigns',
        highlight: 'National Radio Spots',
        themeLabel: 'AUDIO STORYTELLING & IMPACT',
        themeDescription: 'Crafting commercials for radio requires a unique blend of rhythm, clarity, and emotional resonance. Our approach focuses on creating "theatre of the mind" experiences that connect brands with listeners in the most personal and direct medium available.',
        scaleValue: 'Multi-Market Broadcast',
        audioSpots: [
            {
                title: 'Project 96 Radio Spot',
                src: getAssetUrl('07_Project_96_Radio_Spot'),
                duration: '0:30',
                credit: 'Lead Copywriter: Kelsey Matthews'
            },
            {
                title: 'Morgan Oil [Ice Cream 30]',
                src: getAssetUrl('Copy_of_Morgan_Oil_Ice_Cream_30_Aug13-Sep01'),
                duration: '0:30',
                credit: 'Lead Copywriter: Kelsey Matthews'
            },
            {
                title: 'Gutters Installed',
                src: getAssetUrl('Gutters_Installed_Oct17-Nov21'),
                duration: '0:30',
                credit: 'Lead Copywriter: Kelsey Matthews'
            },
            {
                title: 'Morgan Oil [Ice Cream]',
                src: getAssetUrl('Morgan_Oil_Ice_Cream_Jul28-Sep01'),
                duration: '0:30',
                credit: 'Lead Copywriter: Kelsey Matthews'
            },
            {
                title: 'One Stop Shop Tax (60 sec)',
                src: getAssetUrl('One_Stop_Shop_Tax_60_sec_revised_Joc'),
                duration: '1:00',
                credit: 'Lead Copywriter: Kelsey Matthews'
            },
            {
                title: 'Stitches Galore [Mother\'s Day]',
                src: getAssetUrl('Stitches_Galore_Mom_s_Day_Apr25-May07'),
                duration: '0:30',
                credit: 'Lead Copywriter: Kelsey Matthews'
            },
            {
                title: 'Stitches Galore [Pre Christmas]',
                src: getAssetUrl('Stitches_Galore_Pre_Christmas_Nov01-30'),
                duration: '0:30',
                credit: 'Lead Copywriter: Kelsey Matthews'
            },
            {
                title: 'Stitches Galore [School]',
                src: getAssetUrl('Stitches_Galore_School_Jul21-Aug15'),
                duration: '0:30',
                credit: 'Lead Copywriter: Kelsey Matthews'
            },
            {
                title: 'Stitches Galore & More [Summer]',
                src: getAssetUrl('Stitches_Glaore_More_Summer'),
                duration: '0:30',
                credit: 'Lead Copywriter: Kelsey Matthews'
            },
            {
                title: 'Camp Blood',
                src: getAssetUrl('_Camp_Blood_Oct04-Nov01'),
                duration: '0:30',
                credit: 'Lead Copywriter: Kelsey Matthews'
            },
            {
                title: 'Great Southern Agency',
                src: getAssetUrl('_Great_Southern_Agency_Nov03-Dec24'),
                duration: '0:30',
                credit: 'Lead Copywriter: Kelsey Matthews'
            }
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

const AwardIcon = ({ type, className = "" }: { type: string; className?: string }) => {
    const t = type.toLowerCase();
    
    // Gradient definitions are handled in index.css or inline
    const goldGradient = "url(#gold-gradient)";

    if (t.includes('academy') || t.includes('oscar')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className}>
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
            <svg viewBox="0 0 24 24" fill="none" className={className}>
                <path d="M12 2C7.58 2 4 5.58 4 10C4 13.5 6.25 16.5 9.38 17.61L10.5 21H13.5L14.62 17.61C17.75 16.5 20 13.5 20 10C20 5.58 16.42 2 12 2ZM12 16C8.69 16 6 13.31 6 10C6 6.69 8.69 4 12 4C15.31 4 18 6.69 18 10C18 13.31 15.31 16 12 16Z" fill="url(#gold-gradient)" />
                <circle cx="9" cy="9" r="1.5" fill="url(#gold-gradient)" />
                <circle cx="15" cy="9" r="1.5" fill="url(#gold-gradient)" />
                <path d="M9 13C9 13 10.5 14.5 12 14.5C13.5 14.5 15 13 15 13" stroke="url(#gold-gradient)" strokeWidth="1" strokeLinecap="round" />
            </svg>
        );
    }

    if (t.includes('grammy')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className}>
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
            <svg viewBox="0 0 24 24" fill="none" className={className}>
                <path d="M12 2L14.5 8.5L21.5 9.5L16.5 14.5L17.5 21.5L12 18L6.5 21.5L7.5 14.5L2.5 9.5L9.5 8.5L12 2Z" fill="url(#gold-gradient)" />
                <path d="M11 18H13V22H11V18Z" fill="url(#gold-gradient)" opacity="0.5" />
            </svg>
        );
    }

    if (t.includes('globe')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" className={className}>
                <circle cx="12" cy="8" r="6" fill="url(#gold-gradient)" />
                <path d="M12 2V14M6 8H18" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" />
                <path d="M10 14H14V20H10V14Z" fill="url(#gold-gradient)" />
                <path d="M8 20H16V22H8V20Z" fill="url(#gold-gradient)" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M12 2L15 8H21L16 12L18 18L12 14L6 18L8 12L3 8H9L12 2Z" fill="url(#gold-gradient)" />
        </svg>
    );
};

const FloatingAwardIcon = ({ type }: { type: string }) => {
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

const AwardCard = ({ award, i }: { award: Award; i: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    const tierStyles = {
        gold: 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-yellow-900/5',
        silver: 'border-slate-400/50 shadow-[0_0_20px_rgba(148,163,184,0.1)] bg-slate-900/5',
        bronze: 'border-orange-700/50 shadow-[0_0_20px_rgba(194,120,57,0.1)] bg-orange-900/5',
        standard: 'border-white/10 transition-colors hover:border-white/30 bg-white/5'
    }[award.tier || 'standard'];



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
                            type={award.group} 
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

// ─── RADIO PLAYER ────────────────────────────────────────────────────────────
const WaveformBars = ({ isPlaying }: { isPlaying: boolean }) => {
    const bars = Array.from({ length: 28 });
    return (
        <div className="flex items-center gap-[3px] h-16">
            {bars.map((_, i) => (
                <div
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-rose to-burgundy/60"
                    style={{
                        height: isPlaying ? `${20 + Math.sin(i * 0.7) * 16 + 8}px` : '6px',
                        animation: isPlaying
                            ? `waveBar ${0.6 + (i % 5) * 0.12}s ease-in-out infinite alternate`
                            : 'none',
                        animationDelay: `${(i % 7) * 0.07}s`,
                        transition: 'height 0.4s ease',
                        opacity: isPlaying ? 1 : 0.3,
                    }}
                />
            ))}
        </div>
    );
};

const RadioHero = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    const { openModal } = useModal();
    const [activeIdx, setActiveIdx]     = useState(0);
    const [isPlaying, setIsPlaying]     = useState(false);
    const [progress, setProgress]       = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration]       = useState('0:00');
    const [volume, setVolume]           = useState(0.8);
    const [isMuted, setIsMuted]         = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const spots = project.audioSpots!;

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Load new track whenever activeIdx changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.pause();
        audio.src = spots[activeIdx].src;
        audio.load();
        setProgress(0);
        setCurrentTime('0:00');
        if (isPlaying) audio.play().catch(() => {});
    }, [activeIdx]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => {});
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const onPlay    = () => setIsPlaying(true);
        const onPause   = () => setIsPlaying(false);
        const onEnded   = () => {
            setIsPlaying(false);
            setProgress(0);
            if (activeIdx < spots.length - 1) setActiveIdx(i => i + 1);
        };
        const onTime    = () => {
            if (!audio.duration) return;
            setProgress((audio.currentTime / audio.duration) * 100);
            setCurrentTime(formatTime(audio.currentTime));
        };
        const onLoaded  = () => setDuration(formatTime(audio.duration));
        audio.addEventListener('play',           onPlay);
        audio.addEventListener('pause',          onPause);
        audio.addEventListener('ended',          onEnded);
        audio.addEventListener('timeupdate',     onTime);
        audio.addEventListener('loadedmetadata', onLoaded);
        return () => {
            audio.removeEventListener('play',           onPlay);
            audio.removeEventListener('pause',          onPause);
            audio.removeEventListener('ended',          onEnded);
            audio.removeEventListener('timeupdate',     onTime);
            audio.removeEventListener('loadedmetadata', onLoaded);
        };
    }, [activeIdx, spots.length]);

    useEffect(() => {
        return () => { audioRef.current?.pause(); };
    }, []);

    const scrub = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        const val = parseFloat(e.target.value);
        audio.currentTime = (val / 100) * audio.duration;
        setProgress(val);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        setIsMuted(val === 0);
        if (audioRef.current) {
            audioRef.current.volume = val;
            audioRef.current.muted  = val === 0;
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isMuted) {
            const restored = volume === 0 ? 0.8 : volume;
            audio.muted  = false;
            audio.volume = restored;
            setVolume(restored);
            setIsMuted(false);
        } else {
            audio.muted = true;
            setIsMuted(true);
        }
    };

    // Sync initial volume to audio element
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, []);

    return (
        <div className="fixed inset-0 z-[200] bg-ink flex flex-col pointer-events-auto animate-slide-in-right">
            {/* Hidden audio element */}
            <audio ref={audioRef} src={spots[0].src} preload="metadata" />

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 flex items-center justify-center bg-cream/5 border border-cream/10 rounded-full text-cream/40 hover:bg-cream hover:text-ink transition-all duration-500 z-50 group"
            >
                <span className="text-xl group-hover:rotate-90 transition-transform duration-500">✕</span>
            </button>

            {/* Main layout */}
            <div className="flex flex-col lg:flex-row h-full">

                {/* ── LEFT: Player ── */}
                <div className="lg:w-[42%] flex flex-col items-center justify-center bg-[#0a0507] border-r border-white/5 p-10 md:p-16 relative overflow-hidden flex-shrink-0">
                    {/* Background glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose/10 blur-[100px] transition-all duration-1000 ${isPlaying ? 'opacity-100 scale-110' : 'opacity-30 scale-100'}`} />
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-burgundy/20 blur-[60px] transition-all duration-700 ${isPlaying ? 'opacity-100' : 'opacity-20'}`} />
                    </div>

                    {/* Logos */}
                    <div className="relative z-10 flex items-center justify-center gap-6 mb-10">
                        <img
                            src={project.img}
                            alt="BP x Dairy Queen"
                            className="h-28 md:h-36 w-auto object-contain brightness-0 invert opacity-80"
                        />
                    </div>

                    {/* Waveform */}
                    <div className="relative z-10 mb-10">
                        <WaveformBars isPlaying={isPlaying} />
                    </div>

                    {/* Play / Pause */}
                    <button
                        onClick={togglePlay}
                        className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 mb-8 group ${
                            isPlaying
                                ? 'border-rose bg-rose/10 shadow-[0_0_40px_rgba(220,38,38,0.3)]'
                                : 'border-cream/20 bg-white/5 hover:border-rose/60 hover:bg-rose/10'
                        }`}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            /* Pause icon */
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-cream">
                                <rect x="6" y="4" width="4" height="16" rx="1" />
                                <rect x="14" y="4" width="4" height="16" rx="1" />
                            </svg>
                        ) : (
                            /* Play icon */
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-cream ml-1">
                                <path d="M8 5.14v14l11-7-11-7z" />
                            </svg>
                        )}
                    </button>

                    {/* Track name */}
                    <div className="relative z-10 text-center mb-6 px-4">
                        <p className="text-rose text-[0.55rem] tracking-[0.4em] uppercase mb-2">Now Playing</p>
                        <h3 className="text-cream font-serif text-xl md:text-2xl leading-tight">{spots[activeIdx].title}</h3>
                        <p className="text-cream/40 text-xs tracking-widest mt-1">{spots[activeIdx].credit}</p>
                    </div>

                    {/* Scrubber */}
                    <div className="relative z-10 w-full max-w-xs">
                        <input
                            type="range" min="0" max="100" step="0.1"
                            value={progress}
                            onChange={scrub}
                            className="radio-scrubber w-full"
                        />
                        <div className="flex justify-between text-cream/30 text-[0.6rem] mt-1 font-mono">
                            <span>{currentTime}</span>
                            <span>{duration}</span>
                        </div>
                    </div>

                    {/* Volume Control */}
                    <div className="relative z-10 w-full max-w-xs mt-6">
                        <div className="flex items-center gap-3">
                            {/* Mute toggle */}
                            <button
                                onClick={toggleMute}
                                className="flex-shrink-0 text-cream/40 hover:text-cream transition-colors duration-200 outline-none"
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMuted || volume === 0 ? (
                                    /* Muted speaker */
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </svg>
                                ) : volume < 0.5 ? (
                                    /* Low volume */
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                ) : (
                                    /* Full volume */
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                )}
                            </button>

                            {/* Volume slider */}
                            <input
                                type="range" min="0" max="1" step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="radio-scrubber flex-1"
                                aria-label="Volume"
                            />

                            {/* Percentage */}
                            <span className="text-cream/25 text-[0.55rem] font-mono w-8 text-right flex-shrink-0">
                                {isMuted ? '0' : Math.round(volume * 100)}%
                            </span>
                        </div>
                    </div>

                    {/* Label */}
                    <div className="relative z-10 mt-8 border-t border-white/5 pt-6 text-center">
                        <p className="text-[0.55rem] tracking-[0.5em] uppercase text-cream/20">Radio Spots for FM Radio</p>
                        <p className="text-[0.55rem] tracking-[0.3em] text-cream/15 mt-1">by Copywriter: Kelsey Matthews</p>
                    </div>
                </div>

                {/* ── RIGHT: Track List + Project Info ── */}
                <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">

                    {/* Track list header */}
                    <div className="px-10 md:px-16 pt-16 pb-6 border-b border-white/5">
                        <p className="text-rose/50 text-[0.55rem] tracking-[0.5em] uppercase mb-2">Copywriting · {project.year}</p>
                        <h2 className="text-4xl md:text-6xl font-serif text-cream uppercase leading-[0.9] tracking-tighter">{project.title}</h2>
                        <p className="text-cream/40 font-serif italic text-base md:text-lg mt-3">{project.client}</p>
                    </div>

                    {/* Tracks */}
                    <div className="px-10 md:px-16 py-6 border-b border-white/5">
                        <p className="text-rose/50 text-[0.55rem] tracking-[0.4em] uppercase mb-4">Spots</p>
                        <ul className="space-y-1">
                            {spots.map((spot, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => { setActiveIdx(i); if (!isPlaying) setTimeout(() => audioRef.current?.play().catch(() => {}), 80); }}
                                        className={`w-full text-left group flex items-center justify-between px-4 py-4 rounded-sm transition-all duration-300 ${
                                            activeIdx === i
                                                ? 'bg-rose/10 border border-rose/20'
                                                : 'hover:bg-white/5 border border-transparent'
                                        }`}
                                    >
                                        <div className="flex items-center gap-5 min-w-0">
                                            {/* Track number / playing indicator */}
                                            <span className={`text-[0.65rem] font-mono w-5 text-center flex-shrink-0 ${
                                                activeIdx === i ? 'text-rose' : 'text-cream/25 group-hover:text-cream/50'
                                            }`}>
                                                {activeIdx === i && isPlaying ? (
                                                    <span className="inline-flex gap-[2px] items-end h-3">
                                                        <span className="w-[2px] bg-rose rounded-full animate-[waveBar_0.5s_ease_infinite_alternate]" style={{height:'6px'}} />
                                                        <span className="w-[2px] bg-rose rounded-full animate-[waveBar_0.7s_ease_infinite_alternate]" style={{height:'10px', animationDelay:'0.1s'}} />
                                                        <span className="w-[2px] bg-rose rounded-full animate-[waveBar_0.4s_ease_infinite_alternate]" style={{height:'7px', animationDelay:'0.2s'}} />
                                                    </span>
                                                ) : String(i + 1).padStart(2, '0')}
                                            </span>
                                            <div className="min-w-0">
                                                <p className={`text-sm md:text-base truncate transition-colors ${
                                                    activeIdx === i ? 'text-cream' : 'text-cream/60 group-hover:text-cream/90'
                                                }`}>{spot.title}</p>
                                                <p className="text-cream/25 text-[0.65rem] tracking-wider mt-0.5">{spot.credit}</p>
                                            </div>
                                        </div>
                                        <span className={`text-xs font-mono flex-shrink-0 ml-4 ${
                                            activeIdx === i ? 'text-rose' : 'text-cream/30'
                                        }`}>{spot.duration}</span>
                                    </button>
                                    {i < spots.length - 1 && <div className="h-px bg-white/5 mx-4" />}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Project narrative */}
                    <div className="px-10 md:px-16 py-10 border-b border-white/5 space-y-10">
                        <div>
                            <p className="text-rose/50 text-[0.55rem] tracking-[0.4em] uppercase mb-4">The Work</p>
                            <p className="text-cream/70 font-serif italic text-lg md:text-2xl leading-relaxed">{project.description}</p>
                        </div>
                        {project.themeDescription && (
                            <div>
                                <p className="text-rose/50 text-[0.55rem] tracking-[0.4em] uppercase mb-4">{project.themeLabel}</p>
                                <p className="text-cream/50 font-serif italic text-base md:text-lg leading-relaxed border-l-2 border-burgundy/30 pl-5">{project.themeDescription}</p>
                            </div>
                        )}
                    </div>

                    {/* Deliverables */}
                    {project.deliverables.length > 0 && (
                        <div className="px-10 md:px-16 py-10 border-b border-white/5">
                            <p className="text-rose/50 text-[0.55rem] tracking-[0.4em] uppercase mb-6">Key Deliverables</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                {project.deliverables.map((d, i) => (
                                    <li key={i} className="flex items-center gap-4 text-cream font-sans text-sm group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-burgundy/40 group-hover:bg-rose transition-colors flex-shrink-0" />
                                        <span className="opacity-60 group-hover:opacity-100 transition-opacity">{d}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="px-10 md:px-16 py-16 flex items-center justify-center">
                        <button
                            onClick={() => { onClose(); openModal(); }}
                            className="inline-flex items-center gap-6 border border-rose/30 px-10 py-5 text-rose hover:bg-rose hover:text-ink transition-all duration-700 text-[0.65rem] tracking-[0.5em] uppercase font-sans group"
                        >
                            Start A Project
                            <span className="text-xl group-hover:translate-x-3 transition-transform duration-500">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
    const [currentSlide, setCurrentSlide] = useState(0);

    const filteredGallery = project?.gallery?.filter(img => 
        !img.toLowerCase().includes('solo') && 
        !img.toLowerCase().includes('logo') &&
        !img.toLowerCase().includes('background')
    ) || [];

    useEffect(() => {
        if (project && !project.video && filteredGallery.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % filteredGallery.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [project, filteredGallery.length]);

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

    // Radio-only projects get their own dedicated layout
    if (project.audioSpots && project.audioSpots.length > 0) {
        return <RadioHero project={project} onClose={onClose} />;
    }

    return (
        <div className="fixed inset-0 z-[200] animate-slide-in-right pointer-events-none bg-ink">
            {(project.video || (filteredGallery.length > 0 && !project.video)) && (
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
                    {project.video ? (
                        (() => {
                            const isYouTube = project.video.includes('youtube.com') || project.video.includes('youtu.be');
                            if (isYouTube) {
                                let videoId = '';
                                if (project.video.includes('v=')) {
                                    videoId = project.video.split('v=')[1].split('&')[0];
                                } else if (project.video.includes('youtu.be/')) {
                                    videoId = project.video.split('youtu.be/')[1].split('?')[0];
                                } else if (project.video.includes('embed/')) {
                                    videoId = project.video.split('embed/')[1].split('?')[0];
                                }
                                const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`;
                                
                                return (
                                    <iframe
                                        src={embedUrl}
                                        className="w-full h-full border-none brightness-[0.7]"
                                        allow="autoplay; encrypted-media"
                                        title={project.title}
                                    />
                                );
                            }
                            return (
                                <video
                                    ref={videoRef}
                                    src={project.video}
                                    autoPlay
                                    loop
                                    muted={volume === 0}
                                    playsInline
                                    className="w-full h-full object-contain brightness-[0.7]"
                                />
                            );
                        })()
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentSlide}
                                src={filteredGallery[currentSlide]}
                                alt={project.title}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full object-contain brightness-[0.7]"
                            />
                        </AnimatePresence>
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent transition-opacity duration-700 pointer-events-none ${isHeroInView ? 'opacity-100' : 'opacity-0'}`} />
                    <button 
                        onClick={() => setIsPipClosed(true)} 
                        className={`absolute top-4 right-4 z-50 text-cream/70 hover:text-cream bg-black/40 hover:bg-black/80 rounded-full p-2 backdrop-blur-md transition-all duration-300 outline-none ${!isHeroInView ? 'opacity-0 group-hover/pip:opacity-100' : 'opacity-0 pointer-events-none'}`}
                        aria-label="Close Picture-in-Picture"
                    >
                        <X size={16} strokeWidth={1.5} />
                    </button>
                    {project.video && (
                        <button 
                            onClick={toggleMute} 
                            className={`absolute bottom-4 right-4 z-50 text-cream/70 hover:text-cream bg-black/40 hover:bg-black/80 rounded-full p-2 backdrop-blur-md transition-all duration-300 outline-none ${!isHeroInView ? 'opacity-0 group-hover/pip:opacity-100' : 'opacity-0 pointer-events-none'}`}
                        >
                            {volume === 0 ? <VolumeX size={16} strokeWidth={1.5} /> : <Volume2 size={16} strokeWidth={1.5} />}
                        </button>
                    )}
                </motion.div>
            )}

            <div ref={scrollRef} onScroll={handleScroll} className="absolute inset-0 overflow-y-auto custom-scrollbar pointer-events-auto">
                <section className="relative h-screen w-full flex flex-col justify-end p-12 md:p-24 pointer-events-none">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {!project.video && filteredGallery.length === 0 && (
                            <div className="w-full h-full relative">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full transition-all duration-[1500ms] ease-out pointer-events-auto object-contain brightness-[0.7]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                            </div>
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
                                        {project.deliverables?.map((d, i) => (
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
                                    {project.title === 'Sinners' && (
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
                                    )}
                                </div>
                            </Reveal>

                            {/* Awards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-24 mb-32">
                                {project.awards.map((award: Award, i: number) => (
                                    <AwardCard key={i} award={award} i={i} />
                                ))}
                            </div>

                            {/* Suggestion 4: Historic Callout Card */}
                            {project.title === 'Sinners' && (
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
                            )}
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
                            <div className={project.galleryLayout === 'poster' ? "flex flex-col gap-0 max-w-4xl mx-auto" : "columns-1 md:columns-2 lg:columns-2 gap-8 space-y-8"}>
                                {filteredGallery.map((img, i) => (
                                    <Reveal key={i} delay={i * 50}>
                                        <div className={project.galleryLayout === 'poster' ? "overflow-hidden group relative" : "break-inside-avoid overflow-hidden bg-white/5 border border-white/5 group relative"}>
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
    const kingdomBusinessProjects = projects.filter(p => [31].includes(p.id));
    const copywritingProjects = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        .map(id => projects.find(p => p.id === id))
        .filter((p): p is Project => p !== undefined);

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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32 mb-32">
                                {comeUpProjects.map((p, i) => (
                                    <Reveal key={p.id} delay={(i % 4) * 60}>
                                        <ProjectCard project={p} index={i} onClick={() => setSelectedProject(p)} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        {/* Kingdom Business Subsection */}
                        <div>
                            <Reveal>
                                <h3 className="text-xl md:text-2xl text-rose/50 uppercase tracking-[0.4em] font-sans mb-12 border-b border-white/5 pb-4">
                                    KINGDOM BUSINESS
                                </h3>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32 mb-32 md:mb-48">
                                {kingdomBusinessProjects.map((p, i) => (
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
                <div className="w-full h-full overflow-hidden relative rounded-sm bg-burgundy/5 border border-rose/5 transition-colors">
                    {project.img ? (
                        <img 
                            src={project.img} 
                            alt={project.title} 
                            className="w-full h-full transition-all duration-[1500ms] ease-out object-cover"
                        />
                    ) : project.video ? (
                        <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                            <span className="text-[0.45rem] tracking-[0.4em] uppercase text-cream/10">Coming Soon</span>
                        </div>
                    )}
                </div>

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
