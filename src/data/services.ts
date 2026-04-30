import { getAssetUrl } from '../utils/assets';

export interface EventDetail {
    title: string;
    subtitle: string;
    theme: string;
    description: string;
    capacity: string;
    heroOrientation?: 'landscape' | 'portrait';
    heroImage?: string;
    objectFit?: 'cover' | 'contain';
    objectPosition?: string;
    videoSrc?: string;
    videoPoster?: string;
    brochure?: string;
    galleryImages?: { src: string; orientation: 'landscape' | 'portrait' }[];
}

export interface Client {
    name: string;
    type: 'production' | 'event' | 'partnership';
    portrait: string | null;
    year: string;
    role: string;
    objectPosition?: string;
    objectFit?: 'cover' | 'contain';
    subLabel?: string;
    subPartnerships?: { name: string; eventDetail?: EventDetail }[];
    eventDetail?: EventDetail;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    objectPosition?: string;
    clients: Client[];
}

export const SERVICES_DATA: Service[] = [
    {
        id: '01',
        title: 'Experiential Integrated Activations and Premieres',
        description: 'We create immersive brand moments and seamless experiences that live at the intersection of culture and community. High-impact storytelling, cinematic premieres, and elite staffing management engineered for consistency across all touchpoints.',
        image: getAssetUrl('sinners_4'),
        clients: [
            {
                name: 'Sinners',
                type: 'production',
                portrait: getAssetUrl('sinners_poster'),
                year: '2025',
                role: 'Movie Premieres',
                eventDetail: {
                    title: 'Sinners',
                    subtitle: 'Film Creative Production',
                    theme: 'CULTURAL STORYTELLING AT ITS MOST RAW AND POWERFUL',
                    description: 'A cinematic production project that pushed the boundaries of cultural storytelling. K&C delivered end-to-end creative production from print collateral to digital assets — capturing the raw, soulful spirit of the film.',
                    capacity: 'Full-Scale Production',
                    heroOrientation: 'landscape',
                    videoSrc: getAssetUrl('Sinners_video'),
                    videoPoster: getAssetUrl('sinners_poster'),
                    brochure: getAssetUrl('sinners_brochure'),
                    galleryImages: [
                        { src: getAssetUrl('sinners_1'), orientation: 'landscape' },
                        { src: getAssetUrl('sinners_2'), orientation: 'portrait' },
                        { src: getAssetUrl('sinners_3'), orientation: 'portrait' },
                        { src: getAssetUrl('sinners_4'), orientation: 'landscape' },
                        { src: getAssetUrl('sinners_5'), orientation: 'portrait' },
                        { src: getAssetUrl('sinners_6'), orientation: 'portrait' },
                    ]
                }
            },
            {
                name: 'Tron: Ares',
                type: 'production',
                portrait: getAssetUrl('tron_poster'),
                year: '2025',
                role: 'Integrated Marketing & Brand Activation',
                eventDetail: {
                    title: 'Tron: Ares',
                    subtitle: 'Walt Disney Studios Campaign',
                    theme: 'INTEGRATED MARKETING STRATEGY',
                    description: 'For the long-awaited Tron: Ares, K&C was brought on to lead the integrated activation strategy. We designed an immersive digital-physical campaign spanning pop-up experiences, social amplification, and influencer integration that captured the film\'s futuristic energy.',
                    capacity: 'Multi-Market Integration',
                    heroOrientation: 'portrait',
                    heroImage: getAssetUrl('tron_poster'),
                    videoSrc: getAssetUrl('Tron_video'),
                    videoPoster: getAssetUrl('tron_poster'),
                    galleryImages: [
                        { src: getAssetUrl('Tron_1'), orientation: 'landscape' },
                        { src: getAssetUrl('Tron_2'), orientation: 'landscape' },
                        { src: getAssetUrl('Tron_3'), orientation: 'landscape' },
                        { src: getAssetUrl('Tron_4'), orientation: 'landscape' },
                        { src: getAssetUrl('Tron_5'), orientation: 'landscape' },
                        { src: getAssetUrl('Tron_6'), orientation: 'portrait' },
                    ]
                }
            },
            {
                name: 'Zootopia 2',
                type: 'partnership',
                portrait: getAssetUrl('zootopia'),
                year: '2023',
                role: 'Brand Partnership Management',
                eventDetail: {
                    title: 'Zootopia 2',
                    subtitle: 'Disney Animation Franchise',
                    theme: 'PARTNERSHIP MANAGEMENT',
                    description: 'K&C curated and managed a suite of co-branded partnerships for the Zootopia franchise, connecting the animated world with premium lifestyle brands. Our curation drove unprecedented cultural penetration and brand affinity across key demographics.',
                    capacity: '360° Partner Integration',
                    heroImage: getAssetUrl('zootopia'),
                    videoSrc: getAssetUrl('Zootopia_video'),
                    galleryImages: [
                        { src: getAssetUrl('zootopia'), orientation: 'portrait' },
                    ]
                }
            },
            {
                name: 'Avatar: Fire and Ash',
                type: 'production',
                portrait: getAssetUrl('avatar'),
                year: '2023',
                role: 'Experiential Production Lead',
                eventDetail: {
                    title: 'Avatar: Fire and Ash',
                    subtitle: '20th Century Studios Experience',
                    theme: 'EXPERIENTIAL PRODUCTION',
                    description: 'For Avatar: The Way of Water, Kelsey & Company designed and produced an immersive theatrical world-preview event. Guests were transported through the film\'s oceanic environments via multi-sensory staging, setting a new benchmark for blockbuster experiential marketing.',
                    capacity: 'Multi-Sensory World Building',
                    heroOrientation: 'portrait',
                    heroImage: getAssetUrl('avatar_2'),
                    videoSrc: getAssetUrl('avatar_video'),
                    galleryImages: [
                        { src: getAssetUrl('avatar_1'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_2'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_3'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_4'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_5'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_6'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_7'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_8'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_9'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_10'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_11'), orientation: 'portrait' },
                        { src: getAssetUrl('avatar_12'), orientation: 'portrait' },
                    ]
                }
            },
            {
                name: 'Hoppers',
                type: 'production',
                portrait: getAssetUrl('hoppers_poster'),
                year: '2024',
                role: 'Live Experience Production',
                eventDetail: {
                    title: 'Hoppers',
                    subtitle: 'Netflix Event Series',
                    theme: 'LIVE EXPERIENCE STRATEGY',
                    description: 'Kelsey & Company produced the live experience strategy for Netflix\'s Hoppers series, converting episodic storytelling into a set of curated live events. From intimate screenings to large-scale activations, each event deepened fan engagement and drove cultural conversation.',
                    capacity: 'Nationwide Activation',
                    heroOrientation: 'portrait',
                    heroImage: getAssetUrl('hoppers_poster'),
                    videoSrc: getAssetUrl('hoppers_video'),
                    galleryImages: [
                        { src: getAssetUrl('hoppers_poster'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_2'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_3'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_4'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_5'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_6'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_7'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_8'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_9'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_10'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_11'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_12'), orientation: 'portrait' },
                        { src: getAssetUrl('hoppers_13'), orientation: 'portrait' },
                    ]
                }
            },
            {
                name: 'The Devil Wears Prada 2',
                type: 'partnership',
                portrait: getAssetUrl('devil_wears_prada'),
                year: '2025',
                role: 'Strategic Brand & Fashion Partnerships',
                eventDetail: {
                    title: 'The Devil Wears Prada 2',
                    subtitle: 'Fox Entertainment Strategic Tie-ins',
                    theme: 'LUXURY BRAND STRATEGY',
                    description: 'For the highly anticipated sequel, K&C architected the fashion and luxury brand partnership strategy. We brokered relationships with top-tier fashion houses, coordinated editorial integrations, and produced a press preview event that set the tone for the entire campaign.',
                    capacity: 'Global Luxury Strategy',
                    heroImage: getAssetUrl('devil_wears_prada'),
                    galleryImages: [
                        { src: getAssetUrl('devil_wears_prada'), orientation: 'portrait' },
                    ]
                }
            }
        ]
    },
    {
        id: '02',
        title: 'Event Producing and Programming',
        description: 'End-to-end management from logistical blueprints to the final guest experience. Flawless execution and strategic programming where every detail is intentional.',
        image: getAssetUrl('sneaker_ball_2'),
        objectPosition: 'center 20%',
        clients: [
            {
                name: 'CANNES LIONS',
                type: 'event',
                portrait: getAssetUrl('cannes_lions_logo'),
                objectFit: 'contain',
                year: '2023',
                role: 'Featured Programming',
                subPartnerships: [
                    {
                        name: 'Spike Lee Fireside Chat',
                        eventDetail: {
                            title: 'Spike Lee Fireside Chat',
                            subtitle: 'Fireside Chat · Cannes Lions 2023',
                            theme: 'OWNERSHIP ON OUR OWN TERMS: Reclaiming Our Cultural Significance',
                            description: "Spike Lee's triumph at the 2023 Cannes Lions as Creator of the Year set the stage for an extraordinary celebration. We executive produced and curated an exclusive fireside chat focusing on the power of storytelling and cultural impact.",
                            capacity: '80 Guests (18+)',
                            heroOrientation: 'portrait',
                            videoSrc: getAssetUrl('SPIKE_LEE_FIRESIDE_CHAT'),
                            videoPoster: getAssetUrl('spike_lee_fireside_chat_poster'),
                            heroImage: getAssetUrl('spike_lee_fireside_chat_poster'),
                            galleryImages: [
                                { src: getAssetUrl('spike_lee_fireside_chat_poster'), orientation: 'portrait' },
                                { src: getAssetUrl('spike_lee_fireside_chat_1'), orientation: 'portrait' },
                                { src: getAssetUrl('spike_lee_fireside_chat_2'), orientation: 'portrait' },
                                { src: getAssetUrl('spike_lee_fireside_chat_3'), orientation: 'portrait' },
                                { src: getAssetUrl('spike_lee_fireside_chat_4'), orientation: 'portrait' }
                            ]
                        }
                    },
                    {
                        name: 'Spike Lee Dinner',
                        eventDetail: {
                            title: 'Spike Lee Dinner',
                            subtitle: 'Powered by Jordan Brand',
                            theme: 'LUXURY DINNER EXPERIENCE',
                            description: "Spike Lee's triumph at the 2023 Cannes Lions as Creator of the Year set the stage for an extraordinary celebration. Our curated lineup included a captivating Palais presentation, an exclusive Keynote/fireside chat with Spike Lee, a press junket, & a lavish 5-course celebratory meal powered by the prestigious Jordan Brand.",
                            capacity: 'Capacity | 50 guests',
                            heroOrientation: 'portrait',
                            videoSrc: getAssetUrl('spike_lee_dinner_video'),
                            videoPoster: getAssetUrl('spike_lee_dinner_poster'),
                            heroImage: getAssetUrl('spike_lee_dinner_poster'),
                            galleryImages: [
                                { src: getAssetUrl('spike_lee_dinner_poster'), orientation: 'portrait' },
                                { src: getAssetUrl('spike_lee_dinner_1'), orientation: 'portrait' },
                                { src: getAssetUrl('spike_lee_dinner'), orientation: 'portrait' },
                                { src: getAssetUrl('spike_lee_dinner_2'), orientation: 'portrait' },
                            ]
                        }
                    },
                    {
                        name: 'Sneaker Ball',
                        eventDetail: {
                            title: 'Renaissance Noir',
                            subtitle: 'Sneaker Ball · Cannes Lions',
                            theme: 'WHERE STYLE MEETS SUBSTANCE',
                            description: 'An upscale affair where guests showcased their flyest kicks. Against the backdrop of an orchestra, attendees enjoyed light bites, a champagne toast, and a captivating performance by Grammy Award-winning poet J. Ivy. The night concluded with international DJ beats as guests danced away in style.',
                            capacity: 'Capacity | 200 people',
                            heroImage: getAssetUrl('sneaker_ball_poster'),
                            heroOrientation: 'portrait',
                            galleryImages: [
                                { src: getAssetUrl('sneakerball'), orientation: 'landscape' },
                                { src: getAssetUrl('sneaker_ball_1'), orientation: 'landscape' },
                                { src: getAssetUrl('sneaker_ball_2'), orientation: 'landscape' },
                                { src: getAssetUrl('sneaker_ball_3'), orientation: 'landscape' },
                                { src: getAssetUrl('sneaker_ball_4'), orientation: 'landscape' }
                            ]
                        }
                    },

                    { 
                        name: 'CEO/CMO Brunch',
                        eventDetail: {
                            title: 'CEO/CMO Brunch',
                            subtitle: 'Poetic Accompaniment by J.Ivy',
                            theme: 'EXECUTIVE NETWORKING',
                            description: 'A small intimate gathering with some of the industries most creative executives. With brunch served hot, and the poetic accompaniment of Grammy award winner J.Ivy.',
                            capacity: 'Capacity | 50 People',
                            heroOrientation: 'portrait',
                            objectFit: 'contain',
                            heroImage: getAssetUrl('CMO_brunch_poster'),
                            galleryImages: [
                                { src: getAssetUrl('CEOCMO_BRUNCH'), orientation: 'portrait' }
                            ]
                        }
                    },
                    { 
                        name: 'Logitech x Vice',
                        eventDetail: {
                            title: 'Logitech x Vice Luncheon',
                            subtitle: 'Powered by Logitech and Vice',
                            theme: 'STRATEGIC PARTNERSHIP LUNCHEON',
                            description: 'A private, seated Luncheon and fireside chat for industry executives powered by Logitech and Vice.',
                            capacity: 'Capacity | 50 People',
                            heroOrientation: 'landscape',
                            heroImage: getAssetUrl('logitech_x_vice_luncheon'),
                            galleryImages: [
                                { src: getAssetUrl('logitech_x_vice_luncheon'), orientation: 'landscape' }
                            ]
                        }
                    }
                ]
            },
            {
                name: 'GOLF TOURNAMENT',
                type: 'event',
                portrait: null,
                year: '2025',
                role: 'Coming in June',
            },
            {
                name: 'CREATIVES AT SEA',
                type: 'event',
                portrait: getAssetUrl('creatives_at_sea_poster'),
                year: '2024',
                role: 'Juneteenth Celebration',
                eventDetail: {
                    title: 'Creatives at Sea',
                    subtitle: 'Juneteenth Celebration · Networking on the Water',
                    theme: 'DIVERSITY IN MEDIA PANEL',
                    description: 'A Juneteenth celebration promoting diversity in media, featuring an insightful panel w/ NAACP president, CBS & Roc Nation executives. The exclusive event offered networking on the water, lite bites, signature cocktails, and an unforgettable mix of conversation and music.',
                    capacity: 'Capacity | 120 people',
                    heroOrientation: 'portrait',
                    heroImage: getAssetUrl('creatives_at_sea'),
                    videoSrc: getAssetUrl('creatives_at_sea_video'),
                    galleryImages: [
                        { src: getAssetUrl('creatives_at_sea_1'), orientation: 'portrait' },
                        { src: getAssetUrl('creatives_at_sea_2'), orientation: 'portrait' },
                        { src: getAssetUrl('creatives_at_sea_3'), orientation: 'portrait' },
                        { src: getAssetUrl('creatives_at_sea'), orientation: 'landscape' },
                    ]
                }
            }
        ]
    },
    {
        id: '03',
        title: 'Brand Partnerships',
        description: 'Strategic alliances built on cultural alignment and mutual growth. We curate partners that enhance your brand’s authority and reach.',
        image: getAssetUrl('creatives_at_sea'),
        clients: [
            {
                name: 'EVENTNOIRE',
                type: 'partnership',
                portrait: getAssetUrl('eventnoire_logo'),
                objectFit: 'contain',
                year: '2024–25',
                role: 'Cultural Event Partnerships',
                subPartnerships: [
                    { name: 'One Musicfest' },
                    {
                        name: 'Atlanta Black Expo',
                        eventDetail: {
                            title: 'Atlanta Black Expo',
                            subtitle: 'Eventnoire Partnership · Black at Cannes Atlanta',
                            theme: 'EMPOWERING BLACK CREATIVES AND EXECUTIVES',
                            description: 'A dedicated activation celebrating Black culture and excellence, providing a platform for executives and creatives to network, share insights, and forge strategic partnerships.',
                            capacity: 'Capacity | 200+ People',
                            heroOrientation: 'portrait',
                            videoSrc: getAssetUrl('ABE'),
                            videoPoster: getAssetUrl('0B43F544-3EC9-4416-BF85-04CA828EFA9A'),
                            heroImage: getAssetUrl('0B43F544-3EC9-4416-BF85-04CA828EFA9A'),
                            galleryImages: [
                                { src: getAssetUrl('blackat_atlanta_1'), orientation: 'portrait' },
                                { src: getAssetUrl('blackat_atlanta_2'), orientation: 'portrait' },
                                { src: getAssetUrl('blackat_atlanta_3'), orientation: 'landscape' },
                                { src: getAssetUrl('blackat_atlanta_5'), orientation: 'landscape' },
                                { src: getAssetUrl('blackat_atlanta_6'), orientation: 'landscape' },
                                { src: getAssetUrl('blackat_atlanta_7'), orientation: 'landscape' },
                                { src: getAssetUrl('blackat_atlanta_9'), orientation: 'landscape' }
                            ]
                        }
                    },
                    { name: '404 Day (404 Fund)' }
                ],
            },
            {
                name: 'CONVERGE X BET+',
                type: 'partnership',
                portrait: getAssetUrl('BET_is_the_cookout'),
                year: '2026',
                role: 'SXSW · CES',
            }
        ]
    },
    {
        id: '04',
        title: 'Executive Brand Management',
        description: 'Senior-level strategic alliances and brand management for elite talent and executives. We curate high-stakes partnerships that elevate authority and drive mutual growth at the highest levels of industry.',
        image: getAssetUrl('chinapanelnuggets1'),
        clients: [
            {
                name: 'JASON HARVEY',
                type: 'partnership',
                portrait: getAssetUrl('JasonHarveyLogo_Bug'),
                year: '2024',
                role: 'Primary Brand Manager',
                eventDetail: {
                    title: 'Jason Harvey',
                    subtitle: 'EVP, Head of Paramount\'s BET+',
                    theme: 'Senior Director Level · Brand Management',
                    description: 'Kelsey & Company supports Jason Harvey as his primary brand manager. Our engagement functions at a senior director level across strategy, planning, and execution — including complex brand high-stakes bookings, coordination, and overarching multi-platform development.',
                    capacity: 'Proven Engaging Speaker',
                    heroImage: getAssetUrl('jason_harvey_2'),
                    heroOrientation: 'portrait',
                    videoSrc: getAssetUrl('jason_harvey_video'),
                    videoPoster: getAssetUrl('jason_harvey_1'),
                    galleryImages: [
                        { src: getAssetUrl('jason_harvey_1'), orientation: 'portrait' },
                        { src: getAssetUrl('jason_harvey_2'), orientation: 'portrait' },
                        { src: getAssetUrl('jason_harvey_2'), orientation: 'portrait' },
                        { src: getAssetUrl('Copy_of_Jason_H_Speaks_Adweek_house'), orientation: 'landscape' },
                        { src: getAssetUrl('ChinaPanelnuggets1'), orientation: 'landscape' },
                        { src: getAssetUrl('IMG_0343'), orientation: 'portrait' },
                        { src: getAssetUrl('IMG_2125'), orientation: 'portrait' },
                        { src: getAssetUrl('IMG_2543'), orientation: 'portrait' },
                        { src: getAssetUrl('gettyimages-2264115507-612x612'), orientation: 'portrait' },
                    ]
                }
            },
            {
                name: 'KIMBERLY WILSON',
                type: 'partnership',
                portrait: null,
                year: '2025',
                role: 'Strategy & Alliances',
            }
        ]
    },
    {
        id: '05',
        title: 'Digital Marketing',
        description: 'Data-driven strategies that command attention in a crowded landscape. Presence that translates into measurable engagement and lasting loyalty.',
        image: getAssetUrl('bet_is_the_cookout_poster'),
        objectPosition: 'center 15%',
        clients: [
            {
                name: 'BET+ IS THE COOKOUT',
                type: 'production',
                portrait: getAssetUrl('bet_is_the_cookout_poster'),
                year: '2024',
                role: 'Summer Stream Campaign',
                eventDetail: {
                    title: 'BET+',
                    subtitle: 'BET+ is the Cookout. No Invitation needed.',
                    theme: 'Creative Director | Producer',
                    description: "BET+ Is the Cookout summer collection — a play on nostalgic cultural titles that speak to the diaspora to amplify celebration, community, and summer streaming. The campaign generated one of the platform's highest trailer engagement periods of the season, yielding 150K streams and 17k new subscriptions.",
                    capacity: '150K Streams · 17K New Subs',
                    heroOrientation: 'landscape',
                    videoSrc: getAssetUrl('Bet_Is_The_Cookout'),
                    videoPoster: getAssetUrl('BET_1'),
                    galleryImages: [
                        { src: getAssetUrl('BET_1'), orientation: 'landscape' },
                        { src: getAssetUrl('bet_is_the_cookout_poster'), orientation: 'landscape' },
                    ]
                }
            },
            {
                name: 'BRAZE X BET+',
                type: 'partnership',
                portrait: getAssetUrl('braze_poster'),
                year: '2024-25',
                role: 'Partnership Facilitator & Brand Programming',
                eventDetail: {
                    title: 'BET+ x Braze',
                    subtitle: 'Tech for an Equitable Future',
                    theme: 'STRATEGIC BRAND PROGRAMMING',
                    description: 'In a world where Black-founded startups receive less than 0.5% of U.S. venture capital funding, and women-founded startups receive just 2.2%, this partnership mattered. We developed the strategic framework to connect Braze\'s customer engagement platform with BET+\'s cultural reach, launching at Cannes Lions 2024 and integrating into major conferences like FORGE and AFROTECH.',
                    capacity: '20 Startups | 4M Subscribers',
                    heroOrientation: 'portrait',
                    heroImage: getAssetUrl('braze_poster'),
                    galleryImages: [
                        { src: getAssetUrl('braze_1_first'), orientation: 'portrait' },
                        { src: getAssetUrl('braze_poster'), orientation: 'portrait' },
                        { src: getAssetUrl('braze_1'), orientation: 'landscape' },
                        { src: getAssetUrl('braze_2'), orientation: 'landscape' },
                        { src: getAssetUrl('braze_3'), orientation: 'landscape' },
                        { src: getAssetUrl('braze_4'), orientation: 'landscape' },
                        { src: getAssetUrl('braze_5'), orientation: 'landscape' },
                        { src: getAssetUrl('braze_6'), orientation: 'portrait' },
                    ]
                }
            },
            {
                name: 'AVERAGE JOE',
                type: 'production',
                portrait: getAssetUrl('average_joe_poster'),
                year: '2023',
                role: 'Lead Brand Strategist & Copywriter',
                eventDetail: {
                    title: 'Average Joe',
                    subtitle: 'BET+ Original Series',
                    theme: 'DIGITAL INNOVATION & LIFECYCLE',
                    description: 'Using metrics and focus group insights, I built strategies that connected the BET+ brand with its audiences in unforgettable ways—rolling out immersive interactive games, gamified AR lenses, and a bespoke Pittsburgh Steelers broadcast integration.',
                    capacity: 'Clio Award Integrated Campaign',
                    heroOrientation: 'landscape',
                    videoSrc: getAssetUrl('Average_Joe_Main_Video'),
                    videoPoster: getAssetUrl('average_joe_poster'),
                    galleryImages: [
                        { src: getAssetUrl('average_joe_poster'), orientation: 'landscape' },
                        { src: getAssetUrl('average_joe_1'), orientation: 'landscape' },
                        { src: getAssetUrl('average_joe'), orientation: 'landscape' },
                        { src: getAssetUrl('average_joe_3'), orientation: 'portrait' },
                        { src: getAssetUrl('average_joe_4'), orientation: 'portrait' },
                    ]
                }
            },
            {
                name: 'COPYWRITING PORTFOLIO',
                type: 'production',
                portrait: getAssetUrl('radio_spots_poster'),
                year: '2023-24',
                role: 'Brand Voice & Cultural Strategy',
                eventDetail: {
                    title: 'Copywriting',
                    subtitle: 'The Playbook of Cultural Brand Voice',
                    theme: 'THEATRE OF THE MIND',
                    description: 'A curated selection of high-impact brand copywriting and audio storytelling. From cultural authenticity for Sprite to disruptive awareness for Cards Against Concussions, we craft voices that resonate with sophistication and purpose across every medium.',
                    capacity: 'Multi-Platform Reach',
                    heroOrientation: 'portrait',
                    heroImage: getAssetUrl('radio_spots_poster'),
                    galleryImages: [
                        { src: getAssetUrl('sprite_poster'), orientation: 'portrait' },
                        { src: getAssetUrl('popeyes_poster'), orientation: 'portrait' },
                        { src: getAssetUrl('instagram_poster'), orientation: 'portrait' },
                        { src: getAssetUrl('cards_against_concussion_poster'), orientation: 'portrait' },
                        { src: getAssetUrl('kids_foot_locker_poster'), orientation: 'portrait' },
                        { src: getAssetUrl('philadelphia_poster'), orientation: 'portrait' },
                    ]
                }
            }
        ]
    },
    {
        id: '06',
        title: 'Film Production',
        description: 'High-end content designed for the cinematic brand narrative. We produce visual assets that resonate with sophistication and purpose.',
        image: getAssetUrl('fathers_love_poster'),
        clients: [
            {
                name: 'THE DRONE THAT SAVED CHRISTMAS',
                type: 'production',
                portrait: getAssetUrl('the_drone_that_saved_christmas_poster'),
                year: '2024',
                role: 'Amazon Prime',
            },
            {
                name: 'SOLICITED VENDORS',
                type: 'production',
                portrait: getAssetUrl('solicited_vendors_poster'),
                year: 'Ongoing',
                role: 'Global Network Management',
                subLabel: 'Scope of Excellence',
                subPartnerships: [
                    { name: 'Catering & Hospitality' },
                    { name: 'Hair & Makeup Artistry' },
                    { name: 'PA Staffing & Field Support' },
                    { name: 'Daily Budget Management' }
                ]
            },
            {
                name: 'TALE ON AN AMERICAN SUNSET',
                type: 'production',
                portrait: getAssetUrl('tale_on_american_sunset_poster'),
                year: '2025',
                role: 'Short Film · Awards',
            },
            {
                name: "A FATHER'S LOVE",
                type: 'production',
                portrait: getAssetUrl('fathers_love_poster'),
                objectFit: 'contain',
                year: '2025',
                role: 'Short Film',
            },
            {
                name: 'EDEN',
                type: 'production',
                portrait: getAssetUrl('eden_poster'),
                year: '2025',
                role: 'Music Video',
            }
        ]
    }
];
