import { notFound } from 'next/navigation';
import { getSellerData } from '@/lib/seller-data';
import { getAgentsForSuburb } from '@/lib/agents';
import { getSuburbBySlug } from '@/lib/data';
import { NearbySuburbs } from '@/components/seller/NearbySuburbs';
import { SuburbPageContent } from './SuburbPageContent';

export const dynamicParams = true;

interface PageProps {
    params: Promise<{ suburbSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { suburbSlug } = await params;
    const suburb = await getSuburbBySlug(suburbSlug);
    const sellerData = await getSellerData(suburbSlug);

    if (!suburb) return { title: 'Suburb Not Found' };

    // Dynamic Title Construction
    // Attempt: "Selling in [Suburb]? [Marketing Angle] | 2025 Market Intel"
    const hook = sellerData?.sellerIntelligence?.marketingAngles?.[0];
    const title = hook
        ? `Selling in ${suburb.name}? ${hook} | 2026 Market Intel`
        : `Property Valuation & Selling in ${suburb.name} | 2026 Market Intel`;

    // Dynamic Description Construction
    // Attempt: "[Narrative Summary Snippet]. Get your accurate..."
    const narrativeSnippet = sellerData?.narrativeSummary
        ? sellerData.narrativeSummary.split('.')[0] + '.'
        : `Get a free property valuation in ${suburb.name}. See real market data, sold prices, and how to sell 40% faster than the Sandton average.`;

    return {
        title: title,
        description: `${narrativeSnippet} Get your accurate ${suburb.name} valuation today.`,
    };
}

export default async function SuburbSellerPage({ params }: PageProps) {
    const { suburbSlug } = await params;

    // 1. Fetch Data
    const suburb = await getSuburbBySlug(suburbSlug);
    const sellerData = await getSellerData(suburbSlug);
    const agents = getAgentsForSuburb(suburbSlug);

    // 2. Guardrails
    if (!suburb || !sellerData) {
        console.log(`[DEBUG] 404 triggered for ${suburbSlug}`);
        console.log(`[DEBUG] Suburb found: ${!!suburb}`);
        console.log(`[DEBUG] SellerData found: ${!!sellerData}`);
        return notFound();
    }

    return (
        <>
            {/* JSON-LD Schema for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebPage",
                                "name": `Property Valuation in ${suburb.name}`,
                                "description": `Expert property valuation methodology and selling guide for ${suburb.name}.`,
                                "url": `https://propertyintelligence.co.za/property-valuation/sandton/${suburb.slug}`,
                                "breadcrumb": {
                                    "@type": "BreadcrumbList",
                                    "itemListElement": [
                                        {
                                            "@type": "ListItem",
                                            "position": 1,
                                            "name": "PropertyIntelligence",
                                            "item": "https://propertyintelligence.co.za/property-valuation/sandton"
                                        },
                                        {
                                            "@type": "ListItem",
                                            "position": 2,
                                            "name": `${suburb.name} Valuation`,
                                            "item": `https://propertyintelligence.co.za/property-valuation/sandton/${suburb.slug}`
                                        }
                                    ]
                                }
                            },
                            {
                                "@type": "Service",
                                "name": "Residential Property Valuation",
                                "serviceType": "Real Estate Appraisal",
                                "provider": {
                                    "@type": "Organization",
                                    "name": "PropertyIntelligence",
                                    "url": "https://propertyintelligence.co.za"
                                },
                                "areaServed": {
                                    "@type": "Place",
                                    "name": suburb.name,
                                    "geo": {
                                        "@type": "GeoShape",
                                        "addressCountry": "ZA",
                                        "addressRegion": "Gauteng"
                                    }
                                },
                                "description": `Data-driven property valuation and selling advice for ${suburb.name}, Sandton.`
                            }
                        ]
                    })
                }}
            />

            <SuburbPageContent
                suburb={suburb}
                sellerData={sellerData}
                agents={agents}
                nearbySuburbsSlot={<NearbySuburbs currentSuburb={suburb} />}
            />
        </>
    );
}
