
import { Suburb, SuburbsData } from './data';
import { SuburbSellerData } from './seller-data';

// Interface for the criteria used to select "Best For" suburbs
export interface RankingCriteria {
    tag?: string;          // e.g. "family", "investor"
    minPrice?: number;
    maxPrice?: number;
    propertyType?: string; // e.g. "apartment", "house"
}

// Interface for the generated content block for a specific suburb
export interface DynamicContentBlock {
    suburbName: string;
    suburbSlug: string;
    rank: number;
    headline: string;      // "The Unmatched Leader for Schools"
    analysis: string;      // "Bryanston ranks #1 because of..."
    dataHighlights: string[]; // ["14 Schools Nearby", "Avg Price: R3.2M"]
}

/**
 * Generates unique, data-driven analysis for a list of suburbs based on criteria.
 * This prevents "Thin Content" / "Doorway Page" penalties by ensuring 
 * the text is unique to the specific query.
 */
export function generateDynamicContent(
    suburbs: Suburb[],
    sellerDataMap: Record<string, SuburbSellerData>,
    criteria: RankingCriteria
): DynamicContentBlock[] {

    // 1. Filter and Rank Suburbs (Simplified Logic for MVP)
    // In a real implementation, this would heavily sort by the data points.
    // For now, we assume the 'suburbs' passed in are already the candidates.

    return suburbs.map((suburb, index) => {
        const sellerData = sellerDataMap[suburb.slug];

        // Default values if data is missing
        const price = suburb.dataPoints?.priceBand?.min || 0;
        const schools = suburb.imagePlan?.amenities?.schools || 0;
        const safety = suburb.dataPoints?.safetyNote || "Standard security";

        let headline = `Why ${suburb.name} made the list`;
        let analysis = `A top contender in Sandton.`;
        let details: string[] = [];

        // 2. Generate Contextual Content based on Tag
        if (criteria.tag === 'family' || criteria.tag === 'schools') {
            headline = `${suburb.name}: The Family Fortress`;
            analysis = `${suburb.name} secures its spot with a staggering **${schools} schools** within a close radius. Unlike denser hubs, it offers larger stands perfect for children, with safety rated as "${safety}".`;
            details = [`${schools} Schools`, "Large Stands", safety];
        }
        else if (criteria.tag === 'investor' || criteria.tag === 'rental') {
            const yieldLabel = sellerData?.marketPositioning?.investorInfo?.label || "Balanced";
            const gap = sellerData?.soldVsListed?.gapPercentage ?? -10;
            const gapText = gap < -12 ? "high negotiation power" : "stable value";

            headline = `${suburb.name}: The Smart Money Choice`;
            analysis = `Investors favor ${suburb.name} due to its **${yieldLabel}** profile. Currently, buyers have ${gapText} with an average listing discount of ${Math.abs(gap)}%, creating immediate equity on purchase.`;
            details = [`${yieldLabel}`, `~${Math.abs(gap)}% Discount`, "High Demand"];
        }
        else if (criteria.tag === 'young professionals' || criteria.tag === 'trendy') {
            const vibe = sellerData?.marketPositioning?.lifestyleInfo?.label || "Cosmopolitan";
            headline = `${suburb.name}: ${vibe} Living`;
            analysis = `For the ambitious professional, ${suburb.name} offers a **${vibe}** atmosphere. It balances proximity to Sandton CBD with a vibrant nightlife scene, making it ideal for the "work hard, play hard" demographic.`;
            details = [vibe, "Nightlife Hotspot", "Quick Commute"];
        }
        else if (criteria.minPrice && criteria.minPrice > 5000000) {
            const exclusivity = sellerData?.marketPositioning?.volumeInfo?.label || "Exclusive";
            headline = `${suburb.name}: The Definition of Luxury`;
            analysis = `Ranking as a **${exclusivity}** enclave, ${suburb.name} commands respect. With entry prices well above R5M, it ensures privacy and homogeneous value retention for high-net-worth individuals.`;
            details = [exclusivity, "Privacy Focus", "High Retention"];
        }
        else {
            // Generic fallback that is still better than "Lorem Ipsum"
            headline = `${suburb.name}: A Solid Contender`;
            analysis = `${suburb.name} offers a balanced lifestyle between ${suburb.dataPoints?.commuteAnchors?.[0] || "work"} and leisure. Its price point of roughly ${suburb.dataPoints?.priceBand?.min ? 'R' + (suburb.dataPoints.priceBand.min / 1000000).toFixed(1) + 'M' : 'market rate'} makes it accessible yet prestigious.`;
            details = ["Balanced Lifestyle", "Central Location"];
        }

        return {
            suburbName: suburb.name,
            suburbSlug: suburb.slug,
            rank: index + 1,
            headline,
            analysis,
            dataHighlights: details
        };
    });
}
