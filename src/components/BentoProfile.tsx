"use client";

import { Suburb } from "@/lib/data";
import { StaggerContainer, StaggerItem } from "./Animations";
import { formatPrice } from "@/lib/data";
import { MapPin, Shield, TrendingUp, Sparkles, Building2, Trees } from "lucide-react";
import { cn } from "@/lib/utils";

export function BentoProfile({ suburb }: { suburb: Suburb }) {
    const { dataPoints } = suburb;

    const cards = [
        // 1. Price Tag (Large) - Keep existing
        {
            colSpan: "col-span-1 md:col-span-2",
            rowSpan: "row-span-1",
            bg: "bg-slate-900",
            text: "text-white",
            content: (
                <div className="h-full flex flex-col justify-between p-6 relative overflow-hiddenGroup">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <TrendingUp className="h-24 w-24" />
                    </div>
                    <div className="flex items-start justify-between relative z-10">
                        <TrendingUp className="h-6 w-6 text-emerald-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Market Value</span>
                    </div>
                    <div className="relative z-10">
                        <div className="text-3xl md:text-4xl font-serif font-bold mb-1">
                            {formatPrice(dataPoints.priceBand.min)}
                            <span className="text-slate-500 text-lg font-sans font-normal mx-2">+</span>
                        </div>
                        <p className="text-slate-400 text-sm">Entry level for {dataPoints.propertyTypes[0]}</p>
                    </div>
                </div>
            )
        },
        // 2. Safety (Small) - Keep existing but refine
        {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            bg: "bg-white border hover:border-emerald-200 transition-colors",
            text: "text-slate-900",
            content: (
                <div className="h-full flex flex-col justify-center p-6 text-center group">
                    <div className="mx-auto bg-emerald-50 group-hover:bg-emerald-100 transition-colors w-12 h-12 rounded-2xl flex items-center justify-center mb-3">
                        <Shield className="h-6 w-6 text-emerald-600" />
                    </div>
                    <span className="font-semibold block mb-1">Safety Profile</span>
                    <span className="text-xs text-slate-500 leading-tight line-clamp-2">{dataPoints.safetyNote.split('.')[0]}</span>
                </div>
            )
        },
        // 3. Commute (Tall) - Timeline Redesign
        {
            colSpan: "col-span-1",
            rowSpan: "row-span-2",
            bg: "bg-gradient-to-b from-slate-50 to-white border-l",
            text: "text-slate-900",
            content: (
                <div className="h-full p-6 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-6 text-slate-400">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Connectivity</span>
                    </div>

                    <div className="space-y-0 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200 md:left-[7px]" />

                        {dataPoints.commuteAnchors.map((anchor, i) => {
                            // Extract time and place roughly
                            const parts = anchor.match(/(.*)\((.*)\)/);
                            const place = parts ? parts[1].trim() : anchor;
                            const time = parts ? parts[2].trim() : "";

                            return (
                                <div key={i} className="relative flex items-start gap-4 pb-6 last:pb-0 group">
                                    <div className="w-4 h-4 rounded-full bg-white border-2 border-slate-300 z-10 shrink-0 group-hover:border-teal-500 group-hover:scale-110 transition-all shadow-sm" />
                                    <div className="flex-1 -mt-1">
                                        <p className="font-medium text-sm text-slate-900 leading-tight group-hover:text-teal-700 transition-colors">
                                            {place}
                                        </p>
                                        {time && (
                                            <p className="text-xs font-semibold text-slate-400 mt-1 bg-slate-100 inline-block px-1.5 py-0.5 rounded">
                                                {time}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
        },
        // 4. Vibe Match (Medium) - Glass Badges Redesign
        {
            colSpan: "col-span-1 md:col-span-2",
            rowSpan: "row-span-1",
            bg: "bg-gradient-to-br from-amber-50/50 to-orange-50/30 border border-amber-100/50",
            text: "text-amber-900",
            content: (
                <div className="h-full p-8 flex flex-col justify-center relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute -right-4 -top-4 text-amber-100/50">
                        <Sparkles className="h-32 w-32" />
                    </div>

                    <div className="flex items-center gap-2 mb-6 relative z-10">
                        <div className="p-1.5 bg-amber-100 rounded-lg">
                            <Sparkles className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="font-bold text-xs uppercase tracking-widest text-amber-800">Lifestyle Vibe</span>
                    </div>
                    <div className="flex flex-wrap gap-3 relative z-10">
                        {dataPoints.lifestyleTags.map(tag => (
                            <span key={tag} className="px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wide border border-amber-200/50 text-amber-700 shadow-sm hover:bg-white hover:scale-105 transition-all cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )
        },
        // 5. Schools (Small) - Stat Redesign
        {
            colSpan: "col-span-1",
            rowSpan: "row-span-1",
            bg: "bg-slate-900 text-white relative overflow-hidden group",
            text: "",
            content: (
                <div className="h-full p-6 flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                            <Building2 className="h-5 w-5 text-indigo-300" />
                        </div>
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-200 px-2 py-1 rounded border border-indigo-500/30">
                            Access
                        </span>
                    </div>

                    <div className="mt-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-serif font-bold tracking-tight group-hover:translate-x-1 transition-transform">
                                {suburb.imagePlan.amenities.schools}
                            </span>
                            <span className="text-xl text-indigo-300 font-light">+</span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block mt-1">
                            Top Schools
                        </span>
                    </div>

                    {/* Decorative bg icon */}
                    <Building2 className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                </div>
            )
        }
    ];

    return (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
            {cards.map((card, idx) => (
                <StaggerItem
                    key={idx}
                    className={cn(
                        "rounded-3xl overflow-hidden relative shadow-sm hover:shadow-md transition-shadow",
                        card.colSpan,
                        card.rowSpan,
                        card.bg,
                        card.text
                    )}
                >
                    {card.content}
                </StaggerItem>
            ))}
        </StaggerContainer>
    );
}
