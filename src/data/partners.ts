import { getAssetUrl } from '../utils/assets';

export interface Partner {
    name: string;
    category: string;
    description: string;
    image: string;
    logoFile: string;
    role: string;
}

export interface BrandLogo {
    name: string;
    fileName: string;
}

export const PARTNERS: Partner[] = [
    {
        name: 'Warner Bros.',
        category: 'Major Client',
        description: 'Kelsey & Company partnered with Warner Bros. to produce the premiere activation for Sinners — a full-scale, immersive launch experience that blurred the line between film and lived reality, curating every touchpoint from spatial architecture to talent coordination.',
        image: getAssetUrl('sinners_4'),
        logoFile: 'warner-bros-.svg',
        role: 'Activation Strategy & Creative Production',
    },
    {
        name: 'Jordan Brand',
        category: 'Major Client',
        description: 'K&C produced an exclusive Spike Lee-powered Jordan Brand dinner at Cannes Lions — a luxurious 5-course experience for 50 top creatives, culminating in a private Jordan drop, signing, and personalized merch. Culture and commerce at their highest intersection.',
        image: getAssetUrl('assets/spike lee dinner/spike lee dinner 1.png'),
        logoFile: '-air-jordan.svg',
        role: 'Luxury Event Production & Brand Activation',
    },
    {
        name: 'ONE Musicfest',
        category: 'Major Client',
        description: 'A flagship partnership with ONE Musicfest, one of the largest hip-hop and R&B music festivals in the country. K&C brought strategic brand architecture and experiential production to amplify the festival\'s cultural footprint across key demographics.',
        image: getAssetUrl('sneakerball'),
        logoFile: 'ONE_Musicfest_Logo.png',
        role: 'Strategic Brand Architecture & Event Production',
    },
    {
        name: 'News UK',
        category: 'Major Client',
        description: 'Kelsey & Company aligned with News UK to extend their cultural reach through a series of high-impact brand activations and media partnerships. Our work bridged the gap between legacy media and modern cultural conversation.',
        image: getAssetUrl('thought_leadership_brunch_1'),
        logoFile: 'News_UK_logo.svg',
        role: 'Brand Activation & Media Partnership',
    },
    {
        name: 'Paramount',
        category: 'Major Client',
        description: 'From screenings to immersive fan activations, K&C brought Paramount\'s storytelling off the screen and into lived cultural moments. Strategic production and talent curation at the intersection of entertainment and experience.',
        image: getAssetUrl('creatives_at_sea'),
        logoFile: 'paramount-plus-64.png',
        role: 'Experiential Production & Talent Curation',
    },
];

export const ALL_LOGOS: BrandLogo[] = [
    { name: 'Warner Bros.', fileName: 'warner-bros-.svg' },
    { name: 'Jordan Brand', fileName: '-air-jordan.svg' },
    { name: 'ONE Musicfest', fileName: 'ONE_Musicfest_Logo.png' },
    { name: 'News UK', fileName: 'News_UK_logo.svg' },
    { name: 'Paramount', fileName: 'paramount-plus-64.png' },
    { name: 'Dove', fileName: 'dove-logo-svg-vector.svg' },
    { name: 'Disney', fileName: 'icons8-disney-50.png' },
];
