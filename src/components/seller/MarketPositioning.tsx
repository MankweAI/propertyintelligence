"use client";

import { motion } from "framer-motion";
import { Info, ExternalLink } from "lucide-react";
import { SuburbSellerData } from "@/lib/seller-data";
import { cn } from "@/lib/utils";

interface MarketPositioningProps {
    data: SuburbSellerData;
    suburbName: string;
}

export function MarketPositioning({ data, suburbName }: MarketPositioningProps) {
    if (!data.marketPositioning) return null;

    const { priceInfo, volumeInfo, lifestyleInfo, investorInfo } = data.marketPositioning;

    const metrics = [
        {
            title: "Price Point",
            leftText: "Value",
            rightText: "Premium",
            ...priceInfo,
            color: "bg-emerald-500",
        },
        {
            title: "Market Activity",
            leftText: "Quiet",
            rightText: "High Velocity",
            ...volumeInfo,
            color: "bg-blue-500",
        },
        {
            title: "Lifestyle Vibe",
            leftText: "Suburban",
            rightText: "Cosmopolitan",
            ...lifestyleInfo,
            color: "bg-purple-500",
        },
        {
            title: "Investor Appeal",
            leftText: "Growth",
            rightText: "Yield",
            ...investorInfo,
            color: "bg-amber-500",
        }
    ];

    return (
        <section className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-xl shadow-stone-200/40 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 relative z-10">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                        Market Positioning
                    </h2>
                    <p className="text-sm text-stone-500 leading-relaxed max-w-lg">
                        Benchmark {suburbName} against the Sandton regional average.
                        Understand exactly where your property sits in the broader ecosystem.
                    </p>
                </div>
                <div className="bg-stone-50 p-2 rounded-full hidden md:block">
                    <Info className="h-5 w-5 text-stone-400" />
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-8 relative z-10">
                {metrics.map((metric, i) => (
                    <div key={i} className="group">
                        {/* Label Row */}
                        <div className="flex justify-between items-end mb-3">
                            <h3 className="font-bold text-stone-800 text-sm tracking-wide">
                                {metric.title}
                            </h3>
                            <div className="text-xs font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded">
                                {metric.value}/100
                            </div>
                        </div>

                        {/* Bar Container */}
                        <div className="relative h-12 w-full">
                            {/* Track */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-stone-100 rounded-full overflow-hidden">
                                {/* Subtle Grid */}
                                <div className="w-full h-full opacity-30 bg-[length:10px_10px] [background-image:linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)]"></div>
                            </div>

                            {/* Benchmark Marker (Sandton Avg) */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-6 bg-stone-300 z-10"
                                style={{ left: `${metric.benchmark}%` }}
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-stone-400 uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    Avg
                                </div>
                            </div>

                            {/* Value Marker (Us) */}
                            <motion.div
                                initial={{ left: 0, opacity: 0 }}
                                whileInView={{ left: `${metric.value}%`, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 50, damping: 15, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="absolute top-1/2 -translate-y-1/2 z-20"
                            >
                                <div className={cn(
                                    "h-6 w-3 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 transition-transform hover:scale-125 cursor-help",
                                    metric.color
                                )}></div>
                                {/* Label Tooltip */}
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                                    {metric.label}
                                </div>
                            </motion.div>

                            {/* Range Labels */}
                            <div className="absolute -bottom-1 left-0 text-[10px] font-medium text-stone-400 uppercase tracking-widest">
                                {metric.leftText}
                            </div>
                            <div className="absolute -bottom-1 right-0 text-[10px] font-medium text-stone-400 uppercase tracking-widest">
                                {metric.rightText}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-center gap-6 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                    <span>Sandton Average</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-stone-800"></div>
                    <span>{suburbName}</span>
                </div>
            </div>
        </section>
    );
}
