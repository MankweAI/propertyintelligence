"use client";

import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, TrendingUp, Target, Clock, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuburbSellerData } from "@/lib/seller-data";

interface SuburbRealityReportProps {
    data: SuburbSellerData;
    suburbName: string;
}

export function SuburbRealityReport({ data, suburbName }: SuburbRealityReportProps) {
    const soldVsListed = data.soldVsListed;
    const sellerIntelligence = data.sellerIntelligence;

    if (!soldVsListed) return null;

    const gap = soldVsListed.gapPercentage;
    const isNegative = gap < 0;

    // Format currency compactly
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            maximumFractionDigits: 0,
            notation: "compact",
        }).format(val);

    const lossAmount = soldVsListed.listingPrice - soldVsListed.soldPrice;

    return (
        <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white rounded-[2rem] p-8 md:p-10 shadow-2xl border border-stone-700/50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 mb-8">
                <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-rose-500/20 border border-rose-500/30 rounded-full text-rose-300 text-xs font-bold uppercase tracking-widest mb-4">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {suburbName} Reality Check
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                    What Sellers Actually Get
                </h2>
                <p className="text-stone-400 max-w-xl">
                    Forget the listing price. This is the data from actual Deeds Office transfers in {suburbName}.
                </p>
            </div>

            {/* The Core Stats Grid - HIGHLY VISUAL */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-8">
                {/* Stat 1: The Gap */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-stone-800/60 backdrop-blur-sm p-6 rounded-2xl border border-stone-700/50"
                >
                    <div className="flex items-center gap-2 mb-3">
                        {isNegative ? (
                            <TrendingDown className="h-5 w-5 text-rose-400" />
                        ) : (
                            <TrendingUp className="h-5 w-5 text-emerald-400" />
                        )}
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                            Asking vs. Sold
                        </span>
                    </div>
                    <div className={cn(
                        "text-5xl font-bold mb-1",
                        isNegative ? "text-rose-400" : "text-emerald-400"
                    )}>
                        {gap > 0 ? '+' : ''}{gap.toFixed(1)}%
                    </div>
                    <div className="text-sm text-stone-400">
                        Sellers lose approx. <strong className="text-white">{formatCurrency(Math.abs(lossAmount))}</strong> per sale.
                    </div>
                </motion.div>

                {/* Stat 2: Timeline */}
                {sellerIntelligence?.timeline && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-stone-800/60 backdrop-blur-sm p-6 rounded-2xl border border-stone-700/50"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="h-5 w-5 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                                Time to Sell
                            </span>
                        </div>
                        <div className="text-5xl font-bold text-white mb-1">
                            {sellerIntelligence.timeline.wellPriced}
                        </div>
                        <div className="text-sm text-stone-400">
                            If priced correctly. Best season: <strong className="text-white">{sellerIntelligence.timeline.bestSeason}</strong>.
                        </div>
                    </motion.div>
                )}

                {/* Stat 3: Negotiation Room */}
                {sellerIntelligence?.timeline && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-stone-800/60 backdrop-blur-sm p-6 rounded-2xl border border-stone-700/50"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Coins className="h-5 w-5 text-emerald-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                                Negotiation Room
                            </span>
                        </div>
                        <div className="text-5xl font-bold text-white mb-1">
                            {sellerIntelligence.timeline.negotiationRoom}
                        </div>
                        <div className="text-sm text-stone-400">
                            Typical buffer buyers expect.
                        </div>
                    </motion.div>
                )}
            </div>

            {/* The Unique Insight - PROMINENTLY DISPLAYED */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative z-10 bg-stone-700/40 backdrop-blur-sm p-6 rounded-2xl border border-stone-600/50"
            >
                <div className="flex items-start gap-4">
                    <Target className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-white mb-1">The {suburbName} Insight</h4>
                        <p className="text-stone-300 leading-relaxed italic">
                            "{soldVsListed.insight}"
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
