import { SuburbSellerData } from "@/lib/seller-data";
import { TrendingUp, Clock, AlertCircle } from "lucide-react";

interface MarketNarrativeProps {
    data: SuburbSellerData;
    suburbName: string;
}

export function MarketNarrative({ data, suburbName }: MarketNarrativeProps) {
    const { pricing, supplyDemand, ownerStability, marketComposition } = data;

    // Use the custom narrativeSummary if available
    if (data.narrativeSummary) {
        return (
            <div className="prose prose-stone prose-lg max-w-3xl mx-auto text-center">
                <p className="text-lg text-stone-700 leading-relaxed">
                    {data.narrativeSummary}
                </p>
            </div>
        );
    }

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

    return (
        <div className="prose prose-stone prose-lg max-w-3xl mx-auto text-center">
            <p className="text-lg text-stone-700 leading-relaxed">
                Unlike the broader Sandton market averages, the <strong>{suburbName}</strong> property sector is currently {getTrendText()}.
                Market conditions are {getTemperatureText()}. {getStabilityText()},
                making it a {supplyDemand.estDaysOnMarket < 100 ? "fast-moving" : "considered"} investment destination.
                {marketComposition.dominantType === 'Sectional'
                    ? ` As a predominantly sectional title hub, it attracts value-focused investors.`
                    : ` Dominated by freehold properties, it remains a traditional family stronghold.`
                }
            </p>
        </div>
    );
}

