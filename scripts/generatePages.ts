import * as fs from 'fs';
import * as path from 'path';

interface BestForPage {
    slug: string;
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    criteria: {
        tags?: string[];
        maxPrice?: number;
        minPrice?: number;
        propertyTypes?: string[];
    };
    introText: string;
}

interface ToolPage {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
}

interface PagesData {
    bestForPages: BestForPage[];
    toolPages: ToolPage[];
}

const bestForPages: BestForPage[] = [
    {
        slug: 'best-suburbs-for-first-time-buyers',
        title: 'Best Suburbs for First-Time Buyers',
        description: 'Affordable suburbs in Sandton perfect for getting onto the property ladder.',
        metaTitle: 'Best Sandton Suburbs for First-Time Buyers | Affordable Areas 2024',
        metaDescription: 'Discover the most affordable Sandton suburbs for first-time buyers. Compare prices, amenities, and get matched with a vetted agent.',
        criteria: {
            maxPrice: 3000000,
            propertyTypes: ['apartments', 'townhouses']
        },
        introText: 'Getting onto the property ladder in Sandton doesn\'t have to break the bank. These suburbs offer the best combination of affordability, location, and potential for first-time buyers.'
    },
    {
        slug: 'best-suburbs-for-young-professionals',
        title: 'Best Suburbs for Young Professionals',
        description: 'Trendy suburbs with great nightlife, restaurants, and easy commutes.',
        metaTitle: 'Best Sandton Suburbs for Young Professionals | Trendy Areas 2024',
        metaDescription: 'Find the perfect Sandton suburb for your lifestyle. Compare walkability, nightlife, and commute times for young professionals.',
        criteria: {
            tags: ['young professionals', 'trendy', 'nightlife', 'urban', 'restaurants']
        },
        introText: 'Looking for a suburb that matches your lifestyle? These Sandton areas offer the perfect blend of convenience, social life, and career accessibility for young professionals.'
    },
    {
        slug: 'best-suburbs-for-families',
        title: 'Best Suburbs for Families',
        description: 'Family-friendly suburbs with excellent schools, parks, and safe streets.',
        metaTitle: 'Best Sandton Suburbs for Families | Family-Friendly Areas 2024',
        metaDescription: 'Find the best family-friendly Sandton suburbs. Compare schools, safety, and community features for growing families.',
        criteria: {
            tags: ['family', 'schools', 'quiet', 'spacious']
        },
        introText: 'Raising a family in Sandton means access to excellent schools, safe neighbourhoods, and community-focused living. These suburbs consistently rank as the best for families.'
    },
    {
        slug: 'best-suburbs-near-sandton-cbd',
        title: 'Best Suburbs Near Sandton CBD',
        description: 'Suburbs within 10 minutes of Sandton CBD for the shortest commute.',
        metaTitle: 'Best Suburbs Near Sandton CBD | Short Commute Areas 2024',
        metaDescription: 'Live close to work in Sandton. Compare suburbs within 10 minutes of the CBD with prices and lifestyle options.',
        criteria: {
            tags: ['corporate', 'executive', 'urban']
        },
        introText: 'Cut your commute to minutes with these suburbs located within easy reach of Sandton CBD. Perfect for professionals who value their time.'
    },
    {
        slug: 'best-suburbs-for-apartments',
        title: 'Best Suburbs for Apartments',
        description: 'Top suburbs for apartment living with modern buildings and amenities.',
        metaTitle: 'Best Sandton Suburbs for Apartments | Modern Living 2024',
        metaDescription: 'Find the best Sandton suburbs for apartment living. Compare modern developments, amenities, and prices.',
        criteria: {
            propertyTypes: ['apartments', 'luxury apartments', 'penthouses']
        },
        introText: 'Apartment living in Sandton offers convenience, security, and often spectacular views. These suburbs have the best apartment options on the market.'
    },
    {
        slug: 'best-suburbs-for-houses',
        title: 'Best Suburbs for Houses',
        description: 'Suburbs with beautiful freestanding homes and large properties.',
        metaTitle: 'Best Sandton Suburbs for Houses | Freestanding Homes 2024',
        metaDescription: 'Looking for a house in Sandton? Compare the best suburbs for freestanding homes, large stands, and family living.',
        criteria: {
            propertyTypes: ['houses', 'luxury houses', 'estates']
        },
        introText: 'For those seeking space, privacy, and the classic South African lifestyle, these Sandton suburbs offer the finest freestanding homes and estates.'
    },
    {
        slug: 'best-suburbs-for-investment',
        title: 'Best Suburbs for Investment',
        description: 'High-growth suburbs with strong rental yields and capital appreciation.',
        metaTitle: 'Best Sandton Suburbs for Property Investment | ROI Guide 2024',
        metaDescription: 'Invest wisely in Sandton property. Compare suburbs with the best rental yields and capital growth potential.',
        criteria: {
            tags: ['investment', 'rental', 'growing']
        },
        introText: 'Smart investors know that not all suburbs are created equal. These Sandton areas offer the best combination of rental yields and long-term capital appreciation.'
    },
    {
        slug: 'best-suburbs-for-security-estates',
        title: 'Best Suburbs for Security Estates',
        description: 'Top secure living options with 24-hour security and controlled access.',
        metaTitle: 'Best Sandton Security Estates | Secure Living 2024',
        metaDescription: 'Find the safest Sandton suburbs with security estates. Compare access control, patrols, and estate living options.',
        criteria: {
            propertyTypes: ['estates', 'clusters'],
            tags: ['exclusive', 'secure']
        },
        introText: 'Security is a top priority for Sandton buyers. These suburbs offer the best security estate options with 24-hour protection and controlled access.'
    },
    {
        slug: 'best-suburbs-near-good-schools',
        title: 'Best Suburbs Near Good Schools',
        description: 'Suburbs close to top-rated public and private schools.',
        metaTitle: 'Best Sandton Suburbs Near Top Schools | Education Guide 2024',
        metaDescription: 'Live near the best schools in Sandton. Compare suburbs with proximity to top private and public schools.',
        criteria: {
            tags: ['schools', 'family', 'established']
        },
        introText: 'Education is an investment in your child\'s future. These Sandton suburbs put you within easy reach of the area\'s finest schools.'
    },
    {
        slug: 'best-suburbs-with-easy-highway-access',
        title: 'Best Suburbs with Easy Highway Access',
        description: 'Suburbs with quick access to N1, M1, and major arterial roads.',
        metaTitle: 'Best Sandton Suburbs for Highway Access | Easy Commute 2024',
        metaDescription: 'Need quick highway access? Find Sandton suburbs near N1, M1 and major routes for easy commuting.',
        criteria: {
            tags: ['accessible', 'convenient']
        },
        introText: 'For those who commute across Gauteng, proximity to major highways is essential. These suburbs offer the quickest access to the N1, M1, and other arterials.'
    },
    {
        slug: 'best-suburbs-for-walkability-and-restaurants',
        title: 'Best Suburbs for Walkability & Restaurants',
        description: 'Walkable suburbs with trendy restaurants and entertainment.',
        metaTitle: 'Most Walkable Sandton Suburbs | Restaurants & Lifestyle 2024',
        metaDescription: 'Love walking to restaurants and shops? Find the most walkable Sandton suburbs with the best dining options.',
        criteria: {
            tags: ['restaurants', 'walkable', 'trendy', 'shopping']
        },
        introText: 'Ditch the car and walk to dinner. These Sandton suburbs offer the best pedestrian-friendly lifestyle with restaurants, cafes, and shops within walking distance.'
    },
    {
        slug: 'best-suburbs-on-a-3m-to-6m-budget',
        title: 'Best Suburbs on a R3M-R6M Budget',
        description: 'The sweet spot for upgraders - quality suburbs in the mid-market.',
        metaTitle: 'Best Sandton Suburbs R3M-R6M Budget | Mid-Range Guide 2024',
        metaDescription: 'Find quality Sandton properties in the R3M-R6M range. Compare suburbs offering the best value for upgraders.',
        criteria: {
            minPrice: 3000000,
            maxPrice: 6000000
        },
        introText: 'The R3-6 million range is the sweet spot for Sandton buyers upgrading from their first home. These suburbs offer excellent value without compromising on quality.'
    }
];

const toolPages: ToolPage[] = [
    {
        slug: 'bond-affordability',
        title: 'Bond Affordability Calculator',
        metaTitle: 'Bond Affordability Calculator | How Much Can You Afford in Sandton?',
        metaDescription: 'Calculate your bond affordability for Sandton property. Estimate monthly repayments based on your income, deposit, and interest rate.'
    },
    {
        slug: 'transfer-duty-estimator',
        title: 'Transfer Duty Estimator',
        metaTitle: 'Transfer Duty Calculator South Africa | SARS Rates 2024',
        metaDescription: 'Estimate transfer duty costs for your Sandton property purchase. Uses current SARS tax brackets.'
    },
    {
        slug: 'buying-costs',
        title: 'Buying Costs in Sandton',
        metaTitle: 'Property Buying Costs in Sandton | Complete Guide 2024',
        metaDescription: 'Understand all the costs of buying property in Sandton. From transfer duty to bond costs and legal fees.'
    },
    {
        slug: 'first-time-buyer-guide',
        title: 'First-Time Buyer Guide',
        metaTitle: 'First-Time Buyer Guide Sandton | Step-by-Step 2024',
        metaDescription: 'Everything first-time buyers need to know about purchasing property in Sandton. Expert tips and step-by-step guidance.'
    },
    {
        slug: 'viewing-checklist',
        title: 'Property Viewing Checklist',
        metaTitle: 'Property Viewing Checklist | What to Check Before You Buy',
        metaDescription: 'Never miss a red flag. Download our comprehensive property viewing checklist for Sandton home buyers.'
    }
];

const pagesData: PagesData = {
    bestForPages,
    toolPages
};

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Write pages.json
const outputPath = path.join(dataDir, 'pages.json');
fs.writeFileSync(outputPath, JSON.stringify(pagesData, null, 2));
console.log(`✅ Generated ${outputPath} with ${bestForPages.length} best-for pages and ${toolPages.length} tool pages`);
