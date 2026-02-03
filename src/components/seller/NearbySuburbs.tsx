import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Suburb, getSuburbBySlug } from "@/lib/data";

import { getSuburbHeroImage } from "@/lib/images";

interface NearbySuburbsProps {
    currentSuburb: Suburb;
}

import { getSellerData } from "@/lib/seller-data";

export async function NearbySuburbs({ currentSuburb }: NearbySuburbsProps) {
    // Helper to check live status efficiently
    const checkLive = async (slug: string) => {
        const data = await getSellerData(slug);
        return data !== null;
    };

    // Parallel fetch suburb details
    const neighborsRaw = await Promise.all(
        currentSuburb.relatedSuburbs.map(slug => getSuburbBySlug(slug))
    );
    const validNeighbors = neighborsRaw.filter((s): s is Suburb => s !== undefined);

    // Parallel fetch live status
    const liveStatus = await Promise.all(
        validNeighbors.map(async (n) => ({
            ...n,
            isLive: await checkLive(n.slug)
        }))
    );

    const neighbors = liveStatus.sort((a, b) => {
        if (a.isLive && !b.isLive) return -1;
        if (!a.isLive && b.isLive) return 1;
        return 0;
    });

    if (neighbors.length === 0) return null;

    return (
        <section className="bg-white border-t border-stone-200 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                            Explore Neighbors
                        </h2>
                        <p className="text-stone-500 max-w-lg">
                            Compare market conditions in surrounding suburbs. Use our "Smart Context" tools to see where you stand.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {neighbors.map((neighbor) => {
                        const isLive = neighbor.isLive;

                        const heroImage = getSuburbHeroImage(neighbor.slug);
                        const imgSrc = typeof heroImage === 'string' ? heroImage : heroImage.src;

                        return (
                            <div
                                key={neighbor.slug}
                                className={`group relative rounded-2xl overflow-hidden border transition-all ${isLive
                                    ? "border-stone-200 hover:shadow-lg cursor-pointer bg-white"
                                    : "border-stone-100 bg-stone-50 opacity-70"
                                    }`}
                            >
                                {/* Image Overlay */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-stone-200">
                                    <img
                                        src={imgSrc}
                                        alt={neighbor.name}
                                        className={`object-cover w-full h-full transition-transform duration-700 ${isLive ? "group-hover:scale-105" : "grayscale"}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                            {neighbor.name}
                                            {isLive && <ArrowRight className="h-4 w-4 text-amber-400 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
                                            <MapPin className="h-3 w-3" />
                                            <span>{neighbor.dataPoints.priceBand.currency} {neighbor.dataPoints.priceBand.min / 1000000}M - {neighbor.dataPoints.priceBand.max / 1000000}M</span>
                                        </div>
                                    </div>

                                    {!isLive && (
                                        <div className="absolute top-2 right-2 bg-stone-900/50 backdrop-blur-sm text-white/70 text-[10px] uppercase font-bold px-2 py-1 rounded">
                                            Coming Soon
                                        </div>
                                    )}
                                </div>

                                {/* Link Wrapper (Conditional) */}
                                {isLive && (
                                    <Link href={`/property-valuation/sandton/${neighbor.slug}`} className="absolute inset-0 z-10">
                                        <span className="sr-only">View {neighbor.name} Seller Insights</span>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
