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
    if (!suburb) return { title: 'Suburb Not Found' };

    return {
        title: `Property Valuation & Selling in ${suburb.name} | 2025 Market Intel`,
        description: `Get a free property valuation in ${suburb.name}. See real market data, sold prices, and how to sell 40% faster than the Sandton average.`,
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
                                "@type": "RealEstateAgent",
                                "name": `${suburb.name} Valuation Services`,
                                "areaServed": {
                                    "@type": "City",
                                    "name": suburb.name,
                                    "containedIn": "Sandton, Johannesburg"
                                },
                                "offers": {
                                    "@type": "Offer",
                                    "description": "Free property valuation and seller consultation"
                                }
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
