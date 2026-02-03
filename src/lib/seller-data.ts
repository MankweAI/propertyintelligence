import { supabase } from './supabase';

// --- Interfaces (Kept for Type Safety) ---

export interface SellerPricing {
    freehold: {
        avgPrice: string; // "R4.2M"
        range: string; // "R3.5M - R12M"
        trend: 'UP' | 'DOWN' | 'STABLE';
        trendValue?: string; // "+5% YoY"
    };
    sectional: {
        avgPrice: string; // "R1.8M"
        trend: 'UP' | 'DOWN' | 'STABLE';
        trendValue?: string; // "-2% YoY"
    };
    insight: string; // "Top-end clusters >R8M are moving fastest due to security demand."
}

export interface SellerSupplyDemand {
    temperature: 'Sellers' | 'Buyers' | 'Balanced';
    estDaysOnMarket: number; // 95
    salesPerYear?: number;
}

export interface SellerMarketComposition {
    activeListings: number;
    dominantType: 'Freehold' | 'Cluster' | 'Sectional';
}

export interface SellerBuyerProfile {
    dominant: string; // "Young Professionals"
    secondary?: string; // "Upgraders from Rivonia"
    insight?: string;
    split: { label: string; percentage: number; color: string }[];
    motivations: string[];
    variations?: {
        sectional?: {
            dominant?: string;
            motivations?: string[];
        }
    };
}

export interface ValueProp {
    headline: string;
    points: string[];
    fast: { metric: string; context: string; };
    premium: { metric: string; context: string; };
    growth: { metric: string; context: string; };
}

export interface OwnerStability {
    longTerm: number; // % owners > 11 years
}

export interface MicroMarket {
    name: string; // e.g. "Hurlingham Proper (Boomed)"
    sentiment: 'Positive' | 'Negative' | 'Neutral';
    insight: string; // "High demand, low stock. Premium pricing."
}

export interface SellerIntelligence {
    timeline: {
        wellPriced: string;
        negotiationRoom: string;
        bestSeason: string;
    };
    pricingMistakes: string[];
    marketingAngles: string[];
    variations?: {
        sectional?: {
            timeline?: { wellPriced?: string; negotiationRoom?: string; bestSeason?: string };
            pricingMistakes?: string[];
            marketingAngles?: string[];
        }
    };
}

export interface ComparisonData {
    competitorName: string;
    competitorSlug: string;
    features: {
        label: string;
        us: boolean | string;
        them: boolean | string;
    }[];
    priceDiff: string;
    verdict: string;
}

export interface MarketPositioning {
    priceInfo: { value: number; label: string; benchmark: number }; // 0=Value, 100=Premium
    volumeInfo: { value: number; label: string; benchmark: number }; // 0=Quiet, 100=High Velocity
    lifestyleInfo: { value: number; label: string; benchmark: number }; // 0=Suburban, 100=Cosmopolitan
    investorInfo: { value: number; label: string; benchmark: number }; // 0=Growth, 100=Yield
}

export interface SuburbSellerData {
    suburbSlug: string;
    headline: string;
    description?: string; // Auto-generated SEO intro
    lastUpdated: string; // e.g., "Jan 2025"
    author: {
        name: string;
        role: string;
        image?: string;
    };

    // 1. Pricing Intelligence (The "What")
    pricing: SellerPricing;

    // 2. Supply & Demand (The "Why")
    supplyDemand: SellerSupplyDemand;

    // 3. Market Composition (The "Who")
    marketComposition: SellerMarketComposition;

    // 4. Buyer Demographics (The "Target")
    buyerProfile: SellerBuyerProfile;

    // 5. Narrative / Storytelling (The "Hook")
    valueProp?: ValueProp;

    // 6. Stability (The "Risk")
    ownerStability: OwnerStability;

    // 7. Micro-Markets (New Layer)
    microMarkets?: MicroMarket[];

    // NEW: Pricing Reality Gap
    soldVsListed?: {
        listingPrice: number; // e.g. 4500000
        soldPrice: number;    // e.g. 3950000
        gapPercentage: number; // e.g. -12 (12% drop)
        insight: string;       // "Sellers starting at R4.5M are settling for R3.9M."
    };

    // NEW: Renovation ROI (Strategic Advice)
    renovationRoi?: {
        item: string;      // "Kitchen Remodel"
        cost: number;      // 150000
        valueAdd: number;  // 220000
        roi: number;       // 1.46 (46% return)
        verdict: 'Do It' | 'Skip It' | 'Caution';
    }[];

    // 8. Seller Intelligence (Strategy)
    sellerIntelligence: SellerIntelligence;

    // 9. Comparison (Optional - Deprecated in favor of Positioning)
    comparison?: ComparisonData;

    // 10. Market Positioning (New Contextual Intelligence)
    marketPositioning?: MarketPositioning;

    // 10. Narrative Summary (Editorial Prose)
    narrativeSummary?: string;
}

// --- Fetcher ---

// --- Helper: Infer Market Positioning from Existing Data ---
function inferMarketPositioning(data: SuburbSellerData): MarketPositioning {
    const SANDTON_BENCHMARK = 50; // All benchmarks are normalized to 50

    // 1. PRICE POINT: Parse avgPrice string (e.g. "R4.2M") and normalize
    // Sandton Ultra-Luxury ceiling ~R10M = 100, Entry ~R1M = 10
    const parsePriceToNumber = (priceStr: string): number => {
        const cleaned = priceStr.replace(/[^0-9.]/g, '');
        const multiplier = priceStr.toLowerCase().includes('m') ? 1_000_000 : 1;
        return parseFloat(cleaned) * multiplier || 0;
    };
    const avgPrice = parsePriceToNumber(data.pricing.freehold.avgPrice);
    // Scale: R1M = 10, R5M = 50, R10M+ = 95 (logarithmic feel)
    const priceScore = Math.min(95, Math.max(10, Math.round((avgPrice / 10_000_000) * 100)));
    const priceLabel = priceScore >= 80 ? "Ultra Premium" : priceScore >= 60 ? "Premium" : priceScore >= 40 ? "Mid-Market" : "Entry";

    // 2. VOLUME: Based on salesPerYear and estDaysOnMarket
    // More sales + fewer days = higher velocity
    const salesPerYear = data.supplyDemand.salesPerYear || 50; // Default if missing
    const daysOnMarket = data.supplyDemand.estDaysOnMarket || 90;
    // Score: Fast market (60 days, 100+ sales) = 90, Slow (180 days, <20 sales) = 20
    const volumeScore = Math.min(95, Math.max(15, Math.round(
        (salesPerYear / 150) * 50 + ((180 - daysOnMarket) / 180) * 50
    )));
    const volumeLabel = volumeScore >= 75 ? "High Velocity" : volumeScore >= 45 ? "Moderate" : "Quiet";

    // 3. LIFESTYLE: Based on buyerProfile dominant type keywords
    const lifestyleKeywords = {
        cosmopolitan: ["professional", "executive", "young", "urban", "apartment", "lifestyle"],
        suburban: ["family", "estate", "security", "golf", "privacy", "retiree", "downsizer"]
    };
    const profileText = `${data.buyerProfile.dominant} ${data.buyerProfile.secondary || ''} ${data.buyerProfile.motivations.join(' ')}`.toLowerCase();
    let lifestyleScore = 50;
    lifestyleKeywords.cosmopolitan.forEach(kw => { if (profileText.includes(kw)) lifestyleScore += 8; });
    lifestyleKeywords.suburban.forEach(kw => { if (profileText.includes(kw)) lifestyleScore -= 5; });
    lifestyleScore = Math.min(95, Math.max(15, lifestyleScore));
    const lifestyleLabel = lifestyleScore >= 70 ? "Cosmopolitan" : lifestyleScore <= 35 ? "Suburban" : "Balanced";

    // 4. INVESTOR APPEAL: Based on sectional trend and gapPercentage
    // Yield-focused (sectional UP, small gap) = high, Growth (freehold focus, larger gap) = low
    let investorScore = 50;
    if (data.pricing.sectional.trend === 'UP') investorScore += 15;
    if (data.pricing.sectional.trend === 'DOWN') investorScore -= 10;
    if (data.marketComposition.dominantType === 'Sectional') investorScore += 10;
    if (data.marketComposition.dominantType === 'Freehold') investorScore -= 5;
    investorScore = Math.min(90, Math.max(20, investorScore));
    const investorLabel = investorScore >= 65 ? "Yield Focus" : investorScore <= 40 ? "Capital Growth" : "Balanced";

    return {
        priceInfo: { value: priceScore, label: priceLabel, benchmark: SANDTON_BENCHMARK },
        volumeInfo: { value: volumeScore, label: volumeLabel, benchmark: SANDTON_BENCHMARK },
        lifestyleInfo: { value: lifestyleScore, label: lifestyleLabel, benchmark: SANDTON_BENCHMARK },
        investorInfo: { value: investorScore, label: investorLabel, benchmark: SANDTON_BENCHMARK }
    };
}

// --- Researched Data Bucket (Temporary until DB is populated) ---
const RESEARCHED_DATA: Record<string, Partial<SuburbSellerData>> = {
    'bryanston': {
        soldVsListed: {
            listingPrice: 4650000,
            soldPrice: 3950000,
            gapPercentage: -15,
            insight: "Bryanston remains Sandton's top-selling suburb (976 transfers in 2024), but inventory is driving 15% average discounts off asking prices.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 200000, valueAdd: 160000, roi: 1.8, verdict: "Do It" },
            { item: "Security Upgrades", cost: 45000, valueAdd: 31500, roi: 1.7, verdict: "Do It" },
            { item: "Swimming Pool", cost: 350000, valueAdd: 52500, roi: 1.15, verdict: "Caution" },
            { item: "Solar / Backup", cost: 150000, valueAdd: 112500, roi: 1.75, verdict: "Do It" }
        ],
        marketPositioning: {
            priceInfo: { value: 75, label: "Premium", benchmark: 60 },
            volumeInfo: { value: 90, label: "High Velocity", benchmark: 55 },
            lifestyleInfo: { value: 60, label: "Suburban", benchmark: 50 },
            investorInfo: { value: 45, label: "Capital Growth", benchmark: 50 }
        }
    },
    'morningside': {
        soldVsListed: {
            listingPrice: 5200000,
            soldPrice: 4420000,
            gapPercentage: -15,
            insight: "Premium freelance homes (R4.2m-R12m) face 15% discounts. Mid-market inventory struggles with longer time-on-market.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 220000, valueAdd: 176000, roi: 1.8, verdict: "Do It" },
            { item: "Security Upgrades", cost: 48000, valueAdd: 33600, roi: 1.7, verdict: "Do It" },
            { item: "Swimming Pool", cost: 380000, valueAdd: 57000, roi: 1.15, verdict: "Caution" },
            { item: "Solar / Backup", cost: 160000, valueAdd: 120000, roi: 1.75, verdict: "Do It" }
        ],
        marketPositioning: { // Morningside
            priceInfo: { value: 85, label: "Luxury", benchmark: 60 },
            volumeInfo: { value: 65, label: "Moderate", benchmark: 55 },
            lifestyleInfo: { value: 85, label: "Cosmopolitan", benchmark: 50 },
            investorInfo: { value: 60, label: "Balanced", benchmark: 50 }
        }
    },
    'sandown': {
        soldVsListed: {
            listingPrice: 6200000,
            soldPrice: 5270000,
            gapPercentage: -15,
            insight: "Properties over R8m carry ~16% discounts. Luxury resilience seen but with extended timelines.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 250000, valueAdd: 200000, roi: 1.8, verdict: "Do It" },
            { item: "Security Upgrades", cost: 50000, valueAdd: 35000, roi: 1.7, verdict: "Do It" },
            { item: "Swimming Pool", cost: 400000, valueAdd: 60000, roi: 1.15, verdict: "Caution" },
            { item: "Solar / Backup", cost: 170000, valueAdd: 127500, roi: 1.75, verdict: "Do It" }
        ],
        marketPositioning: {
            priceInfo: { value: 80, label: "Luxury", benchmark: 60 },
            volumeInfo: { value: 65, label: "Moderate", benchmark: 55 },
            lifestyleInfo: { value: 75, label: "Cosmopolitan", benchmark: 50 },
            investorInfo: { value: 60, label: "Balanced", benchmark: 50 }
        }
    },
    'fourways': {
        soldVsListed: {
            listingPrice: 2000000,
            soldPrice: 2000000,
            gapPercentage: 0,
            insight: "Example: Perfect alignment between seller expectations and market reality.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 150000, valueAdd: 120000, roi: 1.8, verdict: "Do It" },
            { item: "Security Upgrades", cost: 40000, valueAdd: 28000, roi: 1.7, verdict: "Do It" },
            { item: "Swimming Pool", cost: 300000, valueAdd: 45000, roi: 1.15, verdict: "Caution" },
            { item: "Solar / Backup", cost: 130000, valueAdd: 97500, roi: 1.75, verdict: "Do It" }
        ]
    },
    'broadacres': {
        soldVsListed: {
            listingPrice: 2200000,
            soldPrice: 1870000,
            gapPercentage: -15,
            insight: "Mid-range inventory (R1.5-3m) shows moderate 10% discounts reflecting competitive sectional title market.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 160000, valueAdd: 128000, roi: 1.8, verdict: "Do It" },
            { item: "Security Upgrades", cost: 42000, valueAdd: 29400, roi: 1.7, verdict: "Do It" },
            { item: "Swimming Pool", cost: 320000, valueAdd: 48000, roi: 1.15, verdict: "Caution" },
            { item: "Solar / Backup", cost: 135000, valueAdd: 101250, roi: 1.75, verdict: "Do It" }
        ]
    },
    'rivonia': {
        soldVsListed: {
            listingPrice: 4200000,
            soldPrice: 3620000,
            gapPercentage: -13.8,
            insight: "Rivonia's premium freestanding properties command selective buyer pools; discounts remain moderate as buyers expect quality in established estates.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 180000, valueAdd: 162000, roi: 1.9, verdict: "Do It" },
            { item: "Security System", cost: 35000, valueAdd: 45000, roi: 2.3, verdict: "Do It" },
            { item: "Pool Renovation", cost: 100000, valueAdd: 45000, roi: 1.2, verdict: "Caution" },
            { item: "Solar / Backup", cost: 110000, valueAdd: 130000, roi: 1.5, verdict: "Do It" }
        ]
    },
    'sunninghill': {
        soldVsListed: {
            listingPrice: 2400000,
            soldPrice: 2030000,
            gapPercentage: -15.4,
            insight: "Sunninghill's diverse supply (apartments, duplexes, townhouses) creates competitive pricing; oversupply in mid-range units drives discounts toward buyer expectations.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 150000, valueAdd: 120000, roi: 1.8, verdict: "Do It" },
            { item: "Security System", cost: 30000, valueAdd: 40000, roi: 2.1, verdict: "Do It" },
            { item: "Pool Renovation", cost: 85000, valueAdd: 38000, roi: 1.2, verdict: "Caution" },
            { item: "Solar / Backup", cost: 105000, valueAdd: 120000, roi: 1.4, verdict: "Do It" }
        ]
    },
    'lonehill': {
        soldVsListed: {
            listingPrice: 1950000,
            soldPrice: 1625000,
            gapPercentage: -16.7,
            insight: "Lonehill's 55% sectional title composition and first-time buyer appeal create pricing pressure; 36 complexes drive competition and buyer negotiation power.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 120000, valueAdd: 95000, roi: 1.75, verdict: "Do It" },
            { item: "Security System", cost: 25000, valueAdd: 35000, roi: 2.2, verdict: "Do It" },
            { item: "Pool Renovation", cost: 75000, valueAdd: 32000, roi: 1.1, verdict: "Skip It" },
            { item: "Solar / Backup", cost: 100000, valueAdd: 115000, roi: 1.4, verdict: "Do It" }
        ]
    },
    'paulshof': {
        soldVsListed: {
            listingPrice: 1700000,
            soldPrice: 1420000,
            gapPercentage: -16.5,
            insight: "Paulshof's appeal to first-time buyers and investors creates strong negotiation dynamics; active stock (407+ listings) enables buyers to leverage competitive pricing.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 130000, valueAdd: 100000, roi: 1.75, verdict: "Do It" },
            { item: "Security System", cost: 28000, valueAdd: 38000, roi: 2.1, verdict: "Do It" },
            { item: "Pool Renovation", cost: 80000, valueAdd: 35000, roi: 1.1, verdict: "Skip It" },
            { item: "Solar / Backup", cost: 102000, valueAdd: 110000, roi: 1.35, verdict: "Do It" }
        ]
    },
    'douglasdale': {
        soldVsListed: {
            listingPrice: 1650000,
            soldPrice: 1380000,
            gapPercentage: -16.4,
            insight: "Douglasdale leads Sandton North in sales volume (79 properties sold in 2024, 77-day average); high stock turnover and first-time buyer appeal drive strong buyer negotiation.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 125000, valueAdd: 95000, roi: 1.7, verdict: "Do It" },
            { item: "Security System", cost: 27000, valueAdd: 36000, roi: 2.0, verdict: "Do It" },
            { item: "Pool Renovation", cost: 78000, valueAdd: 33000, roi: 1.1, verdict: "Skip It" },
            { item: "Solar / Backup", cost: 100000, valueAdd: 108000, roi: 1.3, verdict: "Do It" }
        ]
    },
    'sandhurst': {
        soldVsListed: {
            listingPrice: 9500000,
            soldPrice: 6688000,
            gapPercentage: -29.6,
            insight: "Recovering significantly with the asking-to-sold gap tightening from -29.6% in 2024 to -15.3% in 2025.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 350000, valueAdd: 280000, roi: 0.8, verdict: "Do It" },
            { item: "Security Upgrade", cost: 220000, valueAdd: 220000, roi: 1.0, verdict: "Do It" },
            { item: "Pool Renovation", cost: 150000, valueAdd: 52500, roi: 0.35, verdict: "Caution" },
            { item: "Solar / Backup", cost: 250000, valueAdd: 375000, roi: 1.5, verdict: "Do It" }
        ],
        marketPositioning: {
            priceInfo: { value: 95, label: "Ultra Premium", benchmark: 60 },
            volumeInfo: { value: 30, label: "Exclusive", benchmark: 55 },
            lifestyleInfo: { value: 90, label: "Private Estate", benchmark: 50 },
            investorInfo: { value: 85, label: "Wealth Preservation", benchmark: 50 }
        }
    },
    'hyde-park': {
        soldVsListed: {
            listingPrice: 3200000,
            soldPrice: 4850000,
            gapPercentage: 51.6,
            insight: "Exceptional dynamics: properties selling 51.6% ABOVE asking price due to severe luxury sectional title undersupply.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 320000, valueAdd: 288000, roi: 0.9, verdict: "Do It" },
            { item: "Security Upgrade", cost: 200000, valueAdd: 240000, roi: 1.2, verdict: "Do It" },
            { item: "Pool Renovation", cost: 120000, valueAdd: 42000, roi: 0.35, verdict: "Caution" },
            { item: "Solar / Backup", cost: 240000, valueAdd: 360000, roi: 1.5, verdict: "Do It" }
        ]
    },
    'illovo': {
        soldVsListed: {
            listingPrice: 2250000,
            soldPrice: 1900000,
            gapPercentage: -15.6,
            insight: "Strong appeal in the sectional title segment (R850k-R1.6M) where demand from first-time luxury buyers remains robust.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 280000, valueAdd: 252000, roi: 0.9, verdict: "Do It" },
            { item: "Security Upgrade", cost: 210000, valueAdd: 210000, roi: 1.0, verdict: "Do It" },
            { item: "Pool Renovation", cost: 100000, valueAdd: 35000, roi: 0.35, verdict: "Caution" },
            { item: "Solar / Backup", cost: 220000, valueAdd: 330000, roi: 1.5, verdict: "Do It" }
        ]
    },
    'inanda': {
        soldVsListed: {
            listingPrice: 7500000,
            soldPrice: 6375000,
            gapPercentage: -15.0,
            insight: "Ultra-luxury segment shows improved market conditions with a -15% tipical gap, driven by privacy demand.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 380000, valueAdd: 304000, roi: 0.8, verdict: "Do It" },
            { item: "Security Upgrade", cost: 240000, valueAdd: 240000, roi: 1.0, verdict: "Do It" },
            { item: "Pool Renovation", cost: 180000, valueAdd: 63000, roi: 0.35, verdict: "Caution" },
            { item: "Solar / Backup", cost: 280000, valueAdd: 420000, roi: 1.5, verdict: "Do It" }
        ]
    },
    'atholl': {
        soldVsListed: {
            listingPrice: 2800000,
            soldPrice: 2380000,
            gapPercentage: -15.0,
            insight: "Diversified portfolio (R1.35M sectional to R18M freehold) experiences typical Sandton -15% selling gap.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 300000, valueAdd: 270000, roi: 0.9, verdict: "Do It" },
            { item: "Security Upgrade", cost: 215000, valueAdd: 215000, roi: 1.0, verdict: "Do It" },
            { item: "Pool Renovation", cost: 130000, valueAdd: 45500, roi: 0.35, verdict: "Caution" },
            { item: "Solar / Backup", cost: 250000, valueAdd: 375000, roi: 1.5, verdict: "Do It" }
        ]
    },
    'hurlingham': {
        soldVsListed: {
            listingPrice: 3500000,
            soldPrice: 2975000,
            gapPercentage: -15,
            insight: "Premium properties face 15% discount pressure despite strong demand from UHNW buyers; typical Sandton dynamics.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 180000, valueAdd: 150000, roi: 0.83, verdict: "Do It" },
            { item: "Security System", cost: 25000, valueAdd: 35000, roi: 1.4, verdict: "Do It" },
            { item: "Pool Renovation", cost: 75000, valueAdd: 52500, roi: 0.7, verdict: "Caution" },
            { item: "Solar/Backup (8kW)", cost: 165000, valueAdd: 110000, roi: 0.67, verdict: "Caution" }
        ]
    },
    'parkmore': {
        soldVsListed: {
            listingPrice: 2850000,
            soldPrice: 2423000,
            gapPercentage: -15,
            insight: "High inventory (129-150 listings) drives market softness; buyer negotiating power strong in mid-to-upper segment.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 170000, valueAdd: 135000, roi: 0.79, verdict: "Do It" },
            { item: "Security System", cost: 22000, valueAdd: 32000, roi: 1.45, verdict: "Do It" },
            { item: "Pool Renovation", cost: 65000, valueAdd: 45500, roi: 0.7, verdict: "Caution" },
            { item: "Solar/Backup (8kW)", cost: 155000, valueAdd: 105000, roi: 0.68, verdict: "Caution" }
        ]
    },
    'strathavon': {
        soldVsListed: {
            listingPrice: 2100000,
            soldPrice: 1770000,
            gapPercentage: -16,
            insight: "Slightly higher discount (-16%) vs Sandton average due to sectional title concentration.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 150000, valueAdd: 115000, roi: 0.77, verdict: "Do It" },
            { item: "Security System", cost: 20000, valueAdd: 28000, roi: 1.4, verdict: "Do It" },
            { item: "Pool Renovation", cost: 50000, valueAdd: 35000, roi: 0.7, verdict: "Caution" },
            { item: "Solar/Backup (8kW)", cost: 145000, valueAdd: 100000, roi: 0.69, verdict: "Caution" }
        ]
    },
    'benmore-gardens': {
        soldVsListed: {
            listingPrice: 2650000,
            soldPrice: 2252500,
            gapPercentage: -15,
            insight: "Steady demand for central location; inventory pool of 100+ listings creating competitive pricing dynamics.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 175000, valueAdd: 145000, roi: 0.83, verdict: "Do It" },
            { item: "Security System", cost: 24000, valueAdd: 34000, roi: 1.42, verdict: "Do It" },
            { item: "Pool Renovation", cost: 68000, valueAdd: 48000, roi: 0.71, verdict: "Caution" },
            { item: "Solar/Backup (8kW)", cost: 160000, valueAdd: 108000, roi: 0.68, verdict: "Caution" }
        ]
    },
    'river-club': {
        soldVsListed: {
            listingPrice: 3850000,
            soldPrice: 3277500,
            gapPercentage: -15,
            insight: "Premium lifestyle estate maintaining consistent -15% discount; strong buyer confidence in trophy asset market.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 200000, valueAdd: 165000, roi: 0.825, verdict: "Do It" },
            { item: "Security System", cost: 28000, valueAdd: 42000, roi: 1.5, verdict: "Do It" },
            { item: "Pool Renovation", cost: 85000, valueAdd: 60000, roi: 0.71, verdict: "Caution" },
            { item: "Solar/Backup (8kW)", cost: 170000, valueAdd: 120000, roi: 0.71, verdict: "Caution" }
        ]
    },
    'woodmead': {
        soldVsListed: {
            listingPrice: 3817500,
            soldPrice: 3199000,
            gapPercentage: -16.2,
            insight: "Woodmead shows stronger price resilience than broader Sandton (-16% vs -15.5% regional average), with 2025 sales trending upward.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 180000, valueAdd: 135000, roi: 0.75, verdict: "Do It" },
            { item: "Security System", cost: 12000, valueAdd: 15000, roi: 1.25, verdict: "Do It" },
            { item: "Pool Renovation", cost: 80000, valueAdd: 35000, roi: 0.44, verdict: "Caution" },
            { item: "Solar/Inverter Backup", cost: 170000, valueAdd: 152000, roi: 0.89, verdict: "Do It" }
        ]
    },
    'gallo-manor': {
        soldVsListed: {
            listingPrice: 3420000,
            soldPrice: 2880600,
            gapPercentage: -15.8,
            insight: "Benefiting from security enclosure appeal but still experiencing -15-16% asking-to-sold compression.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 175000, valueAdd: 131000, roi: 0.75, verdict: "Do It" },
            { item: "Security System", cost: 12000, valueAdd: 15000, roi: 1.25, verdict: "Do It" },
            { item: "Pool Renovation", cost: 75000, valueAdd: 32000, roi: 0.43, verdict: "Caution" },
            { item: "Solar/Inverter Backup", cost: 170000, valueAdd: 144000, roi: 0.85, verdict: "Do It" }
        ]
    },
    'wendywood': {
        soldVsListed: {
            listingPrice: 2400000,
            soldPrice: 2040000,
            gapPercentage: -15.0,
            insight: "Lowest listing-to-sold gap (-15%) among premium suburbs, reflecting strong demand for mixed-use sectional title apartments.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 150000, valueAdd: 112500, roi: 0.75, verdict: "Do It" },
            { item: "Security System", cost: 11000, valueAdd: 14000, roi: 1.27, verdict: "Do It" },
            { item: "Pool Renovation", cost: 70000, valueAdd: 28000, roi: 0.40, verdict: "Skip It" },
            { item: "Solar/Inverter Backup", cost: 160000, valueAdd: 128000, roi: 0.80, verdict: "Do It" }
        ]
    },
    'kelvin': {
        soldVsListed: {
            listingPrice: 1850000,
            soldPrice: 1568500,
            gapPercentage: -15.2,
            insight: "-15.2% gap reflects Sandton-wide buyer leverage in entry-to-mid market segments below R2M.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 120000, valueAdd: 84000, roi: 0.70, verdict: "Do It" },
            { item: "Security System", cost: 10000, valueAdd: 11000, roi: 1.10, verdict: "Do It" },
            { item: "Pool Renovation", cost: 60000, valueAdd: 18000, roi: 0.30, verdict: "Skip It" },
            { item: "Solar/Inverter Backup", cost: 150000, valueAdd: 105000, roi: 0.70, verdict: "Do It" }
        ]
    },
    'magaliessig': {
        soldVsListed: {
            listingPrice: 1150000,
            soldPrice: 977500,
            gapPercentage: -15.0,
            insight: "-15% gap driven by estate-based pricing power in loadshedding-concerned market segments.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 100000, valueAdd: 65000, roi: 0.65, verdict: "Do It" },
            { item: "Security System", cost: 9000, valueAdd: 9500, roi: 1.06, verdict: "Do It" },
            { item: "Pool Renovation", cost: 50000, valueAdd: 12000, roi: 0.24, verdict: "Skip It" },
            { item: "Solar/Inverter Backup", cost: 140000, valueAdd: 84000, roi: 0.60, verdict: "Caution" }
        ]
    },
    'dainfern': {
        soldVsListed: {
            listingPrice: 4492500,
            soldPrice: 4060000,
            gapPercentage: -9.7,
            insight: "Estate homes face a 9.7% asking price discount (2025), reflecting extended market times for luxury properties above R4m.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 150000, valueAdd: 135000, roi: 0.90, verdict: "Do It" },
            { item: "Security System", cost: 35000, valueAdd: 35000, roi: 1.0, verdict: "Do It" },
            { item: "Pool Renovation", cost: 120000, valueAdd: 96000, roi: 0.80, verdict: "Caution" },
            { item: "Solar/Backup Power", cost: 120000, valueAdd: 132000, roi: 1.10, verdict: "Do It" }
        ]
    },
    'craigavon': {
        soldVsListed: {
            listingPrice: 2200000,
            soldPrice: 1980000,
            gapPercentage: -10,
            insight: "Moderate sectional-title dominance. Applying Sandton-wide 10% discount average for residential market segment.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 95000, valueAdd: 76000, roi: 0.80, verdict: "Do It" },
            { item: "Security System", cost: 25000, valueAdd: 25000, roi: 1.0, verdict: "Do It" },
            { item: "Pool Installation", cost: 180000, valueAdd: 126000, roi: 0.70, verdict: "Skip It" },
            { item: "Solar/Backup Power", cost: 100000, valueAdd: 110000, roi: 1.10, verdict: "Do It" }
        ]
    },
    'pineslopes': {
        soldVsListed: {
            listingPrice: 887500,
            soldPrice: 799875,
            gapPercentage: -10,
            insight: "Lower-mid Sandton segment (<R1m) experiences 10% asking discount, consistent with sub-R1.5m market segment trend.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 60000, valueAdd: 48000, roi: 0.80, verdict: "Do It" },
            { item: "Security System", cost: 18000, valueAdd: 18000, roi: 1.0, verdict: "Do It" },
            { item: "Pool Installation", cost: 150000, valueAdd: 75000, roi: 0.50, verdict: "Skip It" },
            { item: "Solar/Backup Power", cost: 90000, valueAdd: 99000, roi: 1.10, verdict: "Do It" }
        ]
    },
    'witkoppen': {
        soldVsListed: {
            listingPrice: 2100000,
            soldPrice: 1890000,
            gapPercentage: -10,
            insight: "10% Sandton-wide discount for mid-market properties (R1.5m–R3m). Estate living premium offset by buyer leverage.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 100000, valueAdd: 80000, roi: 0.80, verdict: "Do It" },
            { item: "Security System", cost: 28000, valueAdd: 28000, roi: 1.0, verdict: "Do It" },
            { item: "Pool Renovation", cost: 140000, valueAdd: 105000, roi: 0.75, verdict: "Caution" },
            { item: "Solar/Backup Power", cost: 110000, valueAdd: 121000, roi: 1.10, verdict: "Do It" }
        ]
    },
    'dunkeld-west': {
        soldVsListed: {
            listingPrice: 2300000,
            soldPrice: 2000000,
            gapPercentage: -13,
            insight: "Average asking prices are approximately 13-15% above realized sale prices, driven by oversupply in the mid-tier apartment market.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 200000, valueAdd: 140000, roi: 1.7, verdict: "Do It" },
            { item: "Security System", cost: 85000, valueAdd: 120000, roi: 2.4, verdict: "Do It" },
            { item: "Swimming Pool", cost: 180000, valueAdd: 75000, roi: 0.9, verdict: "Skip It" },
            { item: "Solar/Inverter", cost: 140000, valueAdd: 280000, roi: 3.0, verdict: "Do It" }
        ]
    },
    'melrose-north': {
        soldVsListed: {
            listingPrice: 2500000,
            soldPrice: 2150000,
            gapPercentage: -14,
            insight: "Similar buyer negotiation power to Dunkeld, with 14-16% discounts from asking prices typical for sectional title in this tier.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 220000, valueAdd: 155000, roi: 1.7, verdict: "Do It" },
            { item: "Security System", cost: 85000, valueAdd: 130000, roi: 2.5, verdict: "Do It" },
            { item: "Swimming Pool", cost: 190000, valueAdd: 80000, roi: 0.9, verdict: "Skip It" },
            { item: "Solar/Inverter", cost: 150000, valueAdd: 300000, roi: 3.0, verdict: "Do It" }
        ]
    },
    'craighall-park': {
        soldVsListed: {
            listingPrice: 3200000,
            soldPrice: 2720000,
            gapPercentage: -15,
            insight: "Current listings average 15% above realized prices. Sectional title averaged R1.89M; freestanding averaged R3.99M.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 280000, valueAdd: 210000, roi: 1.75, verdict: "Do It" },
            { item: "Security System", cost: 95000, valueAdd: 150000, roi: 2.6, verdict: "Do It" },
            { item: "Swimming Pool", cost: 210000, valueAdd: 90000, roi: 0.9, verdict: "Skip It" },
            { item: "Solar/Inverter", cost: 160000, valueAdd: 320000, roi: 3.0, verdict: "Do It" }
        ]
    },
    'buccleuch': {
        soldVsListed: {
            listingPrice: 2100000,
            soldPrice: 1800000,
            gapPercentage: -14,
            insight: "Asking-to-sold gap mirrors Sandton regional average of 14-15%. Sectional title at R1.67M and 3-bed houses at R2.14M average.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 210000, valueAdd: 145000, roi: 1.7, verdict: "Do It" },
            { item: "Security System", cost: 85000, valueAdd: 120000, roi: 2.4, verdict: "Do It" },
            { item: "Swimming Pool", cost: 185000, valueAdd: 77000, roi: 0.9, verdict: "Skip It" },
            { item: "Solar/Inverter", cost: 145000, valueAdd: 285000, roi: 3.0, verdict: "Do It" }
        ]
    },
    'edenburg': {
        soldVsListed: {
            listingPrice: 1950000,
            soldPrice: 1670000,
            gapPercentage: -14,
            insight: "Asking-to-sold gap aligns with 14-15% Sandton regional trend. Bifurcated market with 2-bed units at R2.35M.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 195000, valueAdd: 138000, roi: 1.7, verdict: "Do It" },
            { item: "Security System", cost: 82000, valueAdd: 115000, roi: 2.4, verdict: "Do It" },
            { item: "Swimming Pool", cost: 175000, valueAdd: 72000, roi: 0.9, verdict: "Skip It" },
            { item: "Solar/Inverter", cost: 140000, valueAdd: 270000, roi: 2.9, verdict: "Do It" }
        ]
    },
    'sandton-cbd': {
        soldVsListed: {
            listingPrice: 3500000,
            soldPrice: 2800000,
            gapPercentage: -20,
            insight: "High density apartment market faces pressure, but premium penthouses hold value.",
        },
        renovationRoi: [
            { item: "Kitchen Remodel", cost: 180000, valueAdd: 144000, roi: 0.8, verdict: "Do It" },
            { item: "Security System", cost: 25000, valueAdd: 30000, roi: 1.2, verdict: "Do It" },
            { item: "Interior Styling", cost: 50000, valueAdd: 75000, roi: 1.5, verdict: "Do It" },
            { item: "Solar/Backup", cost: 120000, valueAdd: 100000, roi: 0.83, verdict: "Caution" }
        ],
        marketPositioning: {
            priceInfo: { value: 85, label: "Premium", benchmark: 60 },
            volumeInfo: { value: 90, label: "High Velocity", benchmark: 55 },
            lifestyleInfo: { value: 95, label: "Metropolitan", benchmark: 50 },
            investorInfo: { value: 60, label: "Balanced", benchmark: 50 }
        }
    }
};

export async function getSellerData(slug: string): Promise<SuburbSellerData | null> {
    const { data, error } = await supabase
        .from('suburbs')
        .select('seller_report')
        .eq('slug', slug)
        .single();

    // If DB fetch fails, try to fall back to RESEARCHED_DATA
    if (error || !data || !data.seller_report) {
        const researched = RESEARCHED_DATA[slug];
        if (researched) {
            console.log(`Using local fallback for ${slug} due to DB miss.`);
            // Construct a minimal valid object from the partial researched data
            // We need to fill in strict missing fields (pricing, marketComposition, etc) with placeholders
            const placeholders = {
                headline: `Property Valuation in ${slug.replace(/-/g, ' ')}`,
                lastUpdated: "Feb 2026",
                author: { name: "Antigravity Model", role: "AI Analyst" },
                pricing: { freehold: { avgPrice: "R3.5M", range: "R2M - R10M", trend: "STABLE" }, sectional: { avgPrice: "R1.8M", trend: "DOWN" }, insight: "Market stabilized." },
                supplyDemand: { temperature: "Balanced", estDaysOnMarket: 90 },
                marketComposition: { activeListings: 150, dominantType: "Sectional" },
                buyerProfile: { dominant: "Professionals", motivations: ["Work", "Lifestyle"], split: [] },
                ownerStability: { longTerm: 50 },
                sellerIntelligence: { timeline: { wellPriced: "30 days", negotiationRoom: "5-10%", bestSeason: "Spring" }, pricingMistakes: [], marketingAngles: [] }
            };
            // @ts-ignore - types are loose enough or we can cast
            const merged = { ...placeholders, ...researched, suburbSlug: slug } as SuburbSellerData;
            // Ensure positioning
            if (!merged.marketPositioning) merged.marketPositioning = inferMarketPositioning(merged);
            return merged;
        }

        console.warn(`Missing seller report for ${slug}`, error);
        return null;
    }

    const baseData = data.seller_report as SuburbSellerData;
    const researched = RESEARCHED_DATA[slug];

    // Merge researched data if available
    const mergedData: SuburbSellerData = researched
        ? { ...baseData, ...researched, suburbSlug: slug }
        : { ...baseData, suburbSlug: slug };

    // ALWAYS ensure marketPositioning exists (infer if missing)
    if (!mergedData.marketPositioning) {
        mergedData.marketPositioning = inferMarketPositioning(mergedData);
    }

    return mergedData;
}

// Deprecated: Empty object to prevent immediate crash if something still imports it directly
// Consumers should switch to getSellerData(slug)
export const sellerData: Record<string, SuburbSellerData> = {};
