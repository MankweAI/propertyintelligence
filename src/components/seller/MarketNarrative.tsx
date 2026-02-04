import { SuburbSellerData } from "@/lib/seller-data";
import { MapPin, Sparkles, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface MarketNarrativeProps {
    data: SuburbSellerData;
    suburbName: string;
}

export function MarketNarrative({ data, suburbName }: MarketNarrativeProps) {
    const { pricing, supplyDemand, ownerStability, marketComposition } = data;

    // Fallback: generate dynamic sentences based on data
    const getTrendText = () => {
        if (pricing.freehold.trend === 'UP') return `experiencing an upward trend with ${pricing.freehold.trendValue || 'steady'} growth`;
        if (pricing.freehold.trend === 'DOWN') return `facing some price pressure with a ${pricing.freehold.trendValue || 'slight'} adjustment`;
        return "maintaining stable property values despite broader market volatility";
    };

    const getTemperatureText = () => {
        if (supplyDemand.temperature === 'Sellers') return "firmly in the seller's favor, driven by high demand and limited stock";
        if (supplyDemand.temperature === 'Buyers') return "offering buyers significant negotiating power due to increased inventory";
        return "showing a healthy balance between supply and demand";
    };

    const getStabilityText = () => {
        if (ownerStability.longTerm > 60) return `A remarkable ${ownerStability.longTerm}% of owners have held their properties for over 11 years, signalling exceptional community stability`;
        return `With ${ownerStability.longTerm}% long-term ownership, the area maintains a dynamic mix of established residents and new energy`;
    };

    // Generate fallback narrative if none exists
    const fallbackNarrative = `Unlike the broader Sandton market averages, the ${suburbName} property sector is currently ${getTrendText()}. Market conditions are ${getTemperatureText()}. ${getStabilityText()}, making it a ${supplyDemand.estDaysOnMarket < 100 ? "fast-moving" : "considered"} investment destination.${marketComposition.dominantType === 'Sectional'
        ? ` As a predominantly sectional title hub, it attracts value-focused investors.`
        : ` Dominated by freehold properties, it remains a traditional family stronghold.`
        }`;

    const narrative = data.narrativeSummary || fallbackNarrative;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-amber-50 via-stone-50 to-white rounded-[2rem] p-8 md:p-10 border border-amber-100/50 shadow-lg shadow-amber-100/20 relative overflow-hidden"
        >
            {/* Background Decor */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-stone-100/50 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 mb-6">
                <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-amber-100 border border-amber-200/50 rounded-full text-amber-700 text-xs font-bold uppercase tracking-widest mb-4">
                    <MapPin className="h-3.5 w-3.5" />
                    About {suburbName}
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
                    Local Market Character
                </h2>
            </div>

            {/* The Unique Narrative - Prominently Displayed */}
            <div className="relative z-10">
                <div className="flex gap-4 items-start">
                    <Quote className="h-8 w-8 text-amber-300 shrink-0 rotate-180" />
                    <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-serif italic">
                        {narrative}
                    </p>
                </div>
            </div>

            {/* E-E-A-T Signal */}
            {data.narrativeSummary && (
                <div className="relative z-10 mt-6 pt-4 border-t border-amber-100/50">
                    <div className="flex items-center gap-2 text-xs text-stone-400">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        <span>Curated by local property analysts. Updated monthly.</span>
                    </div>
                </div>
            )}
        </motion.section>
    );
}
