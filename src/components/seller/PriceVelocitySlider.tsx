"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { UserIntent } from "@/components/IntentToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface PriceVelocitySliderProps {
    avgPrice: string; // e.g. "R 4.2M"
    avgDays: number;  // e.g. 95
    intent: UserIntent;
}

export function PriceVelocitySlider({ avgPrice, avgDays, intent }: PriceVelocitySliderProps) {
    const [value, setValue] = useState([0]); // 0 = Market Value. Range -10 to +10

    // Reset when intent changes
    useEffect(() => setValue([0]), [intent]);

    if (intent === 'owner') return null; // Owners don't need this tool yet

    const percentageChange = value[0];

    // Parse base price
    const basePrice = parseFloat(avgPrice.replace(/[^0-9.]/g, '')) * (avgPrice.includes('M') ? 1000000 : 1);
    const calculatedPrice = basePrice * (1 + percentageChange / 100);

    // Format output
    const formatPrice = (val: number) =>
        new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0, notation: "compact" }).format(val);

    // --- SELLER LOGIC ---
    // Higher Price = Slower Sale. 
    // Data rule: Every +1% price adds ~5% time. Every -1% removes ~3% time.
    const sellerDays = Math.round(avgDays * (1 + (percentageChange > 0 ? percentageChange * 0.1 : percentageChange * 0.05)));
    const sellerDaysDelta = sellerDays - avgDays;

    // --- BUYER LOGIC ---
    // Lower Offer = Lower Acceptance Chance.
    // Base chance at asking = 60%. +5% price = 90%. -10% price = 10%.
    const buyerSuccessChance = Math.min(99, Math.max(1, 60 + (percentageChange * 4)));

    const isSeller = intent === 'seller';

    return (
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                        {isSeller ? "Price vs Speed Simulator" : "Offer Strength Simulator"}
                    </h3>
                    <p className="text-sm text-stone-500 mt-1 max-w-sm">
                        {isSeller
                            ? "Adjust your listing price to see the estimated impact on selling time."
                            : "Adjust your offer amount to estimate the probability of acceptance."}
                    </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                    ${percentageChange === 0 ? "bg-stone-100 text-stone-500" :
                        isSeller
                            ? (percentageChange > 0 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700")
                            : (percentageChange > 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")
                    }
                `}>
                    {percentageChange === 0 ? "Market Value" : `${Math.abs(percentageChange)}% ${percentageChange > 0 ? (isSeller ? "Above" : "Premium") : "Below"}`}
                </div>
            </div>

            {/* The Output Visualization */}
            <div className="grid grid-cols-2 gap-8 mb-8 items-end">
                <div className="text-left">
                    <div className="text-xs text-stone-400 uppercase font-bold mb-1">
                        {isSeller ? "Listing Price" : "Your Offer"}
                    </div>
                    <div className="text-3xl font-bold text-stone-900 tabular-nums">
                        {formatPrice(calculatedPrice)}
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-xs text-stone-400 uppercase font-bold mb-1">
                        {isSeller ? "Est. Time to Sell" : "Acceptance Chance"}
                    </div>
                    <AnimatePresence mode="wait">
                        {isSeller ? (
                            <motion.div
                                key={sellerDays}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`text-4xl font-bold tabular-nums flex items-baseline justify-end gap-1 ${percentageChange < 0 ? "text-emerald-600" : percentageChange > 0 ? "text-amber-600" : "text-stone-900"}`}
                            >
                                {sellerDays} <span className="text-sm font-medium text-stone-500">days</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={buyerSuccessChance}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`text-4xl font-bold tabular-nums flex items-baseline justify-end gap-1 ${buyerSuccessChance > 80 ? "text-emerald-600" : buyerSuccessChance < 40 ? "text-rose-600" : "text-amber-600"}`}
                            >
                                {Math.round(buyerSuccessChance)}%
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Slider */}
            <div className="mb-6 relative h-12 flex items-center">
                <Slider
                    defaultValue={[0]}
                    max={15}
                    min={-15}
                    step={1}
                    value={[percentageChange]}
                    onValueChange={setValue}
                    className="z-10 cursor-grab active:cursor-grabbing"
                />
                {/* Midpoint Marker */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-stone-300 rounded-full" />
                <div className="absolute left-0 top-full mt-2 text-[10px] text-stone-400 font-bold">-15%</div>
                <div className="absolute right-0 top-full mt-2 text-[10px] text-stone-400 font-bold">+15%</div>
            </div>

            {/* Dynamic Insight Info */}
            <div className={`mt-8 p-4 rounded-xl border flex gap-3 ${isSeller
                    ? (percentageChange < 0 ? "bg-emerald-50 border-emerald-100" : percentageChange > 0 ? "bg-amber-50 border-amber-100" : "bg-stone-50 border-stone-100")
                    : (percentageChange > 0 ? "bg-emerald-50 border-emerald-100" : percentageChange < 0 ? "bg-rose-50 border-rose-100" : "bg-stone-50 border-stone-100")
                }`}>
                {isSeller ? (
                    percentageChange < 0 ? <Clock className="w-5 h-5 text-emerald-600 shrink-0" /> :
                        percentageChange > 0 ? <Clock className="w-5 h-5 text-amber-600 shrink-0" /> :
                            <Clock className="w-5 h-5 text-stone-400 shrink-0" />
                ) : (
                    percentageChange > 0 ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> :
                        percentageChange < 0 ? <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" /> :
                            <AlertCircle className="w-5 h-5 text-stone-400 shrink-0" />
                )}

                <p className="text-sm font-medium leading-relaxed text-stone-700">
                    {isSeller ? (
                        percentageChange < 0
                            ? "Aggressive pricing attracts cash buyers and investors, significantly reducing time on market."
                            : percentageChange > 0
                                ? "Premium pricing targets a smaller buyer pool. Be prepared for a longer listing duration."
                                : "Pricing at market value balances visibility with fair return."
                    ) : (
                        percentageChange > 0
                            ? "Offering above asking signals seriousness and can bypass competing bids effectively."
                            : percentageChange < 0
                                ? "Lowball offers risk immediate rejection unless backed by cash or no contingencies."
                                : "Offering asking price is the standard baseline but may lose in a multiple-offer scenario."
                    )}
                </p>
            </div>

        </div>
    );
}
