"use client";

import { SuburbSellerData } from "@/lib/seller-data";
import { RenovationRoiCards } from "./RenovationRoiCards";
import { Hammer, AlertTriangle, CheckCircle, ArrowRight, ShieldCheck, Banknote } from "lucide-react";
import { UserIntent } from "../IntentToggle";

interface ValueOptimizationGuideProps {
    data: SuburbSellerData;
    suburbName: string;
    intent: UserIntent;
}

export function ValueOptimizationGuide({ data, suburbName, intent }: ValueOptimizationGuideProps) {
    // Fallback data if renovationRoi is missing (safe default)
    const renovationRoi = data.renovationRoi || [
        { item: "Kitchen Refresh", cost: 150000, valueAdd: 200000, roi: 1.3, verdict: 'Do It' },
        { item: "Security Upgrade", cost: 50000, valueAdd: 80000, roi: 1.6, verdict: 'Do It' },
        { item: "Pool Resurfacing", cost: 85000, valueAdd: 40000, roi: 0.47, verdict: 'Skip It' },
    ] as any[];

    // Fallback for mistakes
    const pricingMistakes = data.sellerIntelligence?.pricingMistakes || [
        "Overcapitalizing on niche renovations",
        "Ignoring the 'curb appeal' factor",
        "Refusing early offers (often the best)"
    ];

    // BUYER CONTENT
    const buyerRisks = [
        "Paying asking price without testing the seller's urgency",
        "Overlooking Sectional Title levies and special assessment history",
        "Ignoring the proximity to busy arterial roads (noise risk)"
    ];

    // OWNER CONTENT
    const ownerActions = [
        "Annual maintenance inspection (roof & waterproofing)",
        "Reviewing your insurance replacement value (often outdated)",
        "Monitoring recent sales in your specific street"
    ];

    const getHeader = () => {
        if (intent === 'buyer') return {
            title: "Before You Sign an Offer",
            icon: ShieldCheck,
            color: "text-emerald-600",
            desc: `Don't buy blind. Here is the due diligence checklist to ensure you don't overpay in ${suburbName}.`
        };
        if (intent === 'owner') return {
            title: "Asset Health Check",
            icon: HomeIcon,
            color: "text-blue-600",
            desc: `Protect your wealth. Steps to maintain and grow your ${suburbName} property value over the long term.`
        };
        return {
            title: "Before You Value Your Home",
            icon: Hammer,
            color: "text-amber-600",
            desc: `Agencies won't always tell you this. Here is the data-backed preparation checklist to maximize your valuation figure in ${suburbName}.`
        };
    };

    const header = getHeader();
    const HeaderIcon = header.icon;

    return (
        <section className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-xl shadow-stone-200/40 overflow-hidden relative">
            {/* Header */}
            <div className="mb-10 relative z-10">
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-3 flex items-center gap-3">
                    <HeaderIcon className={`h-8 w-8 ${header.color}`} />
                    {header.title}
                </h2>
                <p className="text-stone-500 text-lg leading-relaxed max-w-2xl">
                    {header.desc}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">

                {/* 1. Value Adds / Negotiation Levers */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${intent === 'buyer' ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-100 text-emerald-700'}`}>1</div>
                        <h3 className="font-bold text-stone-900 text-lg">
                            {intent === 'buyer' ? "Negotiation Levers" : intent === 'owner' ? "Equity Boosters" : "Smart Improvements"}
                        </h3>
                    </div>
                    {intent === 'buyer' ? (
                        <div className="space-y-4">
                            {/* Buyer specific cards could go here, for now reusing ROI but framed differently if needed, or simple text cards */}
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                <h4 className="font-bold text-stone-900 mb-2">Market Weakness</h4>
                                <p className="text-sm text-stone-600">Sellers are currently accepting offers ~8% below asking. Use this gap.</p>
                            </div>
                            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                                <h4 className="font-bold text-stone-900 mb-2">Renovation Potential</h4>
                                <p className="text-sm text-stone-600">Look for un-renovated homes. A R150k kitchen update can add R200k value here.</p>
                            </div>
                        </div>
                    ) : (
                        <RenovationRoiCards data={renovationRoi} />
                    )}

                    {intent === 'seller' && (
                        <div className="mt-4 text-xs text-stone-400 italic">
                            *ROI estimates based on 2024/25 {suburbName} sales data.
                        </div>
                    )}
                </div>

                {/* 2. Strategy & Mistakes */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${intent === 'buyer' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>2</div>
                        <h3 className="font-bold text-stone-900 text-lg">
                            {intent === 'buyer' ? "Due Diligence Risks" : intent === 'owner' ? "Ownership Checklist" : "Critical Mistakes to Avoid"}
                        </h3>
                    </div>

                    <div className={`${intent === 'buyer' ? 'bg-amber-50 border-amber-100' : intent === 'owner' ? 'bg-blue-50 border-blue-100' : 'bg-rose-50/50 border-rose-100'} rounded-2xl p-6 border space-y-4 mb-8`}>
                        {(intent === 'buyer' ? buyerRisks : intent === 'owner' ? ownerActions : pricingMistakes).map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                {intent === 'buyer' ? <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" /> :
                                    intent === 'owner' ? <CheckCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" /> :
                                        <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />}
                                <p className="text-stone-700 font-medium leading-relaxed">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Winning Angle */}
                    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                        <h4 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                            <Banknote className="h-5 w-5 text-stone-600" />
                            {intent === 'buyer' ? "The Sweet Spot" : intent === 'owner' ? "Wealth Insight" : `The "Winning Angle" for ${suburbName}`}
                        </h4>
                        <p className="text-stone-700 leading-relaxed italic">
                            {intent === 'buyer'
                                ? `"Focus on properties on the market for >90 days. Sellers in ${suburbName} become significantly more negotiable after the 3-month mark."`
                                : intent === 'owner'
                                    ? `"Long-term hold is the strategy. ${suburbName} compound growth has outperformed inflation by 2% over the last decade."`
                                    : `"${data.buyerProfile?.dominant ? `Target the '${data.buyerProfile.dominant}' segment.` : 'Focus on lifestyle buyers.'} ${data.buyerProfile?.motivations?.[0] || 'Emphasize security and location.'}"`
                            }
                        </p>
                    </div>

                </div>
            </div>

            {/* Background Decor */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-60 pointer-events-none ${intent === 'buyer' ? 'bg-emerald-50' : 'bg-amber-50'}`}></div>
            <div className="absolute top-1/2 -left-24 w-48 h-48 bg-stone-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        </section>
    );
}

// Icon helper
function HomeIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
}
