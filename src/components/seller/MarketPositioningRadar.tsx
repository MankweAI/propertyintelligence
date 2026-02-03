"use client";

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";
import { SuburbSellerData } from "@/lib/seller-data";
import { Info } from "lucide-react";

interface MarketPositioningRadarProps {
    data: SuburbSellerData;
    suburbName: string;
}

export function MarketPositioningRadar({ data, suburbName }: MarketPositioningRadarProps) {
    if (!data.marketPositioning) return null;

    const { priceInfo, volumeInfo, lifestyleInfo, investorInfo } = data.marketPositioning;

    const chartData = [
        {
            subject: "Price Point",
            A: priceInfo.value,
            B: priceInfo.benchmark,
            fullMark: 100,
        },
        {
            subject: "Volume",
            A: volumeInfo.value,
            B: volumeInfo.benchmark,
            fullMark: 100,
        },
        {
            subject: "Lifestyle",
            A: lifestyleInfo.value,
            B: lifestyleInfo.benchmark,
            fullMark: 100,
        },
        {
            subject: "Investor",
            A: investorInfo.value,
            B: investorInfo.benchmark,
            fullMark: 100,
        },
    ];

    return (
        <section className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-xl shadow-stone-200/40 relative overflow-hidden">
             {/* Header */}
             <div className="flex items-start justify-between mb-8 relative z-10">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                        Market Positioning
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            {suburbName}
                        </span>
                        <span className="text-xs text-stone-400">vs</span>
                        <span className="inline-flex items-center rounded-md bg-stone-50 px-2 py-1 text-xs font-medium text-stone-600 ring-1 ring-inset ring-stone-500/10">
                            Sandton Avg
                        </span>
                    </div>
                </div>
                <div className="bg-stone-50 p-2 rounded-full hidden md:block">
                    <Info className="h-5 w-5 text-stone-400" />
                </div>
            </div>

            {/* Radar Chart */}
            <div className="h-[350px] w-full relative z-10 -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: '#78716c', fontSize: 12, fontWeight: 600 }} 
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        
                        {/* Sandton Benchmark (Background) */}
                        <Radar
                            name="Sandton Average"
                            dataKey="B"
                            stroke="#d6d3d1"
                            strokeWidth={2}
                            fill="#e7e5e4"
                            fillOpacity={0.3}
                        />
                        
                        {/* Suburb (Foreground) */}
                        <Radar
                            name={suburbName}
                            dataKey="A"
                            stroke="#10b981"
                            strokeWidth={3}
                            fill="#10b981"
                            fillOpacity={0.4}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Insight Text */}
            <div className="mt-4 pt-4 border-t border-stone-100">
                 <p className="text-xs text-stone-500 italic leading-relaxed text-center">
                    "A visual fingerprint of how this suburb compares to the broader Sandton ecosystem across 4 key dimensions."
                </p>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                 <div className="w-32 h-32 rounded-full bg-emerald-900 blur-3xl"></div>
            </div>
        </section>
    );
}
