"use client";

import { useRef } from "react";
import { ArrowDown, Info, TrendingDown } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

import { UserIntent } from "@/components/IntentToggle";

interface SoldVsListedChartProps {
    data: {
        listingPrice: number;
        soldPrice: number;
        gapPercentage: number;
        insight: string;
    };
    suburbName: string;
    intent?: UserIntent;
}

export function SoldVsListedChart({ data, suburbName, intent = 'seller' }: SoldVsListedChartProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            maximumFractionDigits: 0,
            notation: "compact", // "1.2M"
            compactDisplay: "short"
        }).format(val);

    const formatFullCurrency = (val: number) =>
        new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            maximumFractionDigits: 0,
        }).format(val);

    // Sanitize and validate inputs
    const listing = Number.isFinite(data.listingPrice) ? Math.max(0, data.listingPrice) : 0;
    const sold = Number.isFinite(data.soldPrice) ? Math.max(0, data.soldPrice) : 0;

    // Calculate heights relative to the maximum value to prevent overflow
    const maxVal = Math.max(listing, sold);
    const rawListed = maxVal > 0 ? (listing / maxVal) * 100 : 0;
    const rawSold = maxVal > 0 ? (sold / maxVal) * 100 : 0;

    // Minimum visibility threshold (only if value > 0)
    const MIN_VISIBLE = 20;
    const listedHeightPercent = listing > 0 ? Math.max(MIN_VISIBLE, rawListed) : 0;
    const soldHeightPercent = sold > 0 ? Math.max(MIN_VISIBLE, rawSold) : 0;

    // Calculate gap percentage dynamically
    // If listing is 0, gap is undefined (null)
    const calculatedGap = listing > 0 ? ((sold - listing) / listing) * 100 : null;

    const isPositive = calculatedGap !== null && calculatedGap > 0;
    // For Buyers, a negative gap (discount) is POSITIVE news. For Sellers, it's NEGATIVE news.
    const isGoodNews = intent === 'buyer' ? !isPositive : isPositive;

    const isNeutral = calculatedGap === null || Math.abs(calculatedGap) < 0.1;

    // Dynamic Labels
    const title = intent === 'buyer' ? "Negotiation Power" : intent === 'owner' ? "Valuation Reality" : "The Reality Gap";
    const subtitle = intent === 'buyer' ? "Ask vs. Get: What offers are actually being accepted." : "Market expectation vs. actual transaction reality.";

    return (
        <div
            ref={ref}
            className="group relative bg-white rounded-[2rem] p-8 border border-stone-100 shadow-xl shadow-stone-200/40 overflow-hidden h-full flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/60 hover:border-stone-200"
        >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <TrendingDown className="w-32 h-32 text-stone-900" />
            </div>

            {/* Header */}
            <div className="relative z-10 mb-8">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-serif font-bold text-2xl text-stone-900">{title}</h3>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.2 }}
                                className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide",
                                    isPositive
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                        : "bg-rose-50 text-rose-600 border-rose-100"
                                )}
                            >
                                {suburbName}
                            </motion.div>
                        </div>
                        <p className="text-sm text-stone-500/90 leading-relaxed max-w-[90%]">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Visualization */}
            <div className="relative z-10 mt-auto px-2">
                <div className="flex items-end gap-6 h-64 w-full relative">

                    {/* Grid Lines (Subtle) */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="w-full h-px bg-stone-300 border-t border-dashed border-stone-400"></div>
                        <div className="w-full h-px bg-stone-300 border-t border-dashed border-stone-400"></div>
                        <div className="w-full h-px bg-stone-300 border-t border-dashed border-stone-400"></div>
                        <div className="w-full h-px bg-stone-900"></div> {/* Baseline */}
                    </div>

                    {/* LISTED PRICE BAR */}
                    <div className="flex-1 flex flex-col justify-end h-full relative group/bar-listed">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={isInView ? { height: `${listedHeightPercent}%` } : {}}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                            className="w-full bg-stone-100 rounded-t-2xl relative overflow-hidden border border-stone-200/60"
                        >
                            <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5"></div>
                            {/* Top Cap */}
                            <div className="absolute top-0 inset-x-0 h-1 bg-stone-300/50"></div>

                            {/* Label Inside - Bottom */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-4 left-0 right-0 text-center"
                            >
                                <div className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-0.5">Listed</div>
                                <div className="text-lg font-bold text-stone-500 tabular-nums tracking-tight">
                                    {formatCurrency(listing)}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* SOLD PRICE BAR */}
                    <div className="flex-1 flex flex-col justify-end h-full relative group/bar-sold">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={isInView ? { height: `${soldHeightPercent}%` } : {}}
                            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.3 }}
                            className={cn(
                                "w-full rounded-t-2xl relative overflow-visible shadow-lg transition-shadow duration-500",
                                isPositive
                                    ? "bg-gradient-to-b from-emerald-500 to-emerald-600 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] group-hover/bar-sold:shadow-[0_0_60px_-10px_rgba(16,185,129,0.5)]"
                                    : "bg-gradient-to-b from-emerald-500 to-emerald-600 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] group-hover/bar-sold:shadow-[0_0_60px_-10px_rgba(16,185,129,0.5)]"
                                // Kept Emerald for Sold as it's "Money in pocket" regardless, but could change to Rose if negative gap is emphasized? User liked Green.
                            )}
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-30 bg-[length:4px_4px] [background-image:linear-gradient(45deg,transparent_45%,black_50%,transparent_55%)]"></div>
                            {/* Top Glow */}
                            <div className="absolute top-0 inset-x-0 h-[1px] bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>

                            {/* Label Inside - Bottom */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.8 }}
                                className="absolute bottom-3 left-0 right-0 text-center"
                            >
                                <div className="text-[9px] font-bold uppercase tracking-widest text-emerald-200 mb-0.5">Sold</div>
                                <div className="text-xl font-bold text-white tabular-nums tracking-tight drop-shadow-md">
                                    {formatCurrency(sold)}
                                </div>
                            </motion.div>

                            {/* GAP INDICATOR */}
                            {!isNeutral && calculatedGap !== null && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 1.0, type: "spring" }}
                                    className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap z-30"
                                >
                                    <div className={cn(
                                        "text-white pl-2 pr-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg ring-2 ring-white",
                                        isPositive ? "bg-emerald-600 shadow-emerald-500/30" : "bg-rose-600 shadow-rose-500/30"
                                    )}>
                                        {isPositive ? (
                                            <TrendingDown className="h-3 w-3 text-emerald-100 rotate-180" strokeWidth={3} />
                                        ) : (
                                            <ArrowDown className="h-3 w-3 text-rose-100" strokeWidth={3} />
                                        )}
                                        <span>{Math.abs(calculatedGap).toFixed(1).replace(/\.0$/, '')}% {isPositive ? "Premium" : "Drop"}</span>
                                    </div>
                                    {/* Connector Line */}
                                    <div className={cn(
                                        "w-px h-8 absolute left-1/2 -translate-x-1/2 top-full",
                                        isPositive ? "bg-emerald-500/50" : "bg-rose-500/50"
                                    )}></div>
                                    <div className={cn(
                                        "w-1.5 h-1.5 rounded-full absolute left-1/2 -translate-x-1/2 top-full mt-8",
                                        isPositive ? "bg-emerald-500" : "bg-rose-500"
                                    )}></div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Footer Insight */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 1 }}
                className="mt-6 pt-4 border-t border-stone-100"
            >
                <div className="flex gap-2.5">
                    <Info className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-stone-500 italic leading-relaxed">
                        "{data.insight}"
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
