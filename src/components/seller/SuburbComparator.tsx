"use client";

import Link from "next/link";
import { CheckCircle, XCircle, ArrowRightLeft, ExternalLink } from "lucide-react";
import { SuburbSellerData } from "@/lib/seller-data";
import { cn } from "@/lib/utils";

interface SuburbComparatorProps {
    data: SuburbSellerData;
    suburbName: string;
}

export function SuburbComparator({ data, suburbName }: SuburbComparatorProps) {
    if (!data.comparison) return null;

    const comp = data.comparison;

    return (
        <section className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-200">
                <div className="h-10 w-10 rounded-lg bg-amber-600 flex items-center justify-center">
                    <ArrowRightLeft className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-stone-900">
                        {suburbName} vs {comp.competitorName}
                    </h2>
                    <p className="text-sm text-stone-500">
                        Position your property to win the comparison
                    </p>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden mb-6">
                {/* Table Header */}
                <div className="grid grid-cols-10 border-b border-stone-200 bg-stone-50">
                    <div className="col-span-4 p-4 text-xs font-bold uppercase tracking-wider text-stone-600">
                        Feature
                    </div>
                    <div className="col-span-3 p-4 text-center text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border-l border-r border-stone-200">
                        {suburbName}
                    </div>
                    <div className="col-span-3 p-4 text-center text-xs font-bold uppercase tracking-wider text-stone-600 group cursor-pointer hover:bg-stone-100 transition-colors">
                        <Link href={`/property-valuation/sandton/${comp.competitorSlug}`} className="flex items-center justify-center gap-2 w-full h-full">
                            {comp.competitorName}
                            <ExternalLink className="h-3 w-3 opacity-40 group-hover:opacity-100" />
                        </Link>
                    </div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-slate-100">
                    {comp.features.map((feature, i) => (
                        <div key={i} className="grid grid-cols-10 items-stretch hover:bg-stone-50 transition-colors">
                            {/* Label */}
                            <div className="col-span-4 p-4 flex items-center text-sm font-medium text-stone-700">
                                {feature.label}
                            </div>

                            {/* Us (Highlighted) */}
                            <div className="col-span-3 p-4 flex justify-center items-center bg-amber-50/50 border-l border-r border-stone-200">
                                {typeof feature.us === 'boolean' ? (
                                    feature.us ?
                                        <CheckCircle className="h-5 w-5 text-amber-600" /> :
                                        <XCircle className="h-5 w-5 text-stone-300" />
                                ) : (
                                    <span className="text-sm font-semibold text-stone-900">{feature.us}</span>
                                )}
                            </div>

                            {/* Them */}
                            <div className="col-span-3 p-4 flex justify-center items-center">
                                {typeof feature.them === 'boolean' ? (
                                    feature.them ?
                                        <CheckCircle className="h-5 w-5 text-amber-400" /> :
                                        <XCircle className="h-5 w-5 text-stone-300" />
                                ) : (
                                    <span className="text-sm text-stone-600">{feature.them}</span>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Price Row */}
                    <div className="grid grid-cols-10 items-stretch bg-stone-50 border-t-2 border-stone-200">
                        <div className="col-span-4 p-4 flex items-center text-sm font-bold text-stone-900">
                            Relative Price Point
                        </div>
                        <div className="col-span-3 p-4 flex justify-center items-center bg-amber-50 border-l border-r border-stone-200">
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
                                {comp.priceDiff}
                            </div>
                        </div>
                        <div className="col-span-3 p-4 flex justify-center items-center">
                            <span className="text-xs text-stone-500 font-medium uppercase tracking-wide">
                                Baseline
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Verdict */}
            <div className="bg-white border-2 border-amber-200 rounded-xl p-5 flex gap-4 items-start">
                <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                    <h4 className="font-bold text-amber-700 mb-2 uppercase text-xs tracking-widest">
                        The Agent's Verdict
                    </h4>
                    <p className="text-stone-700 leading-relaxed text-sm">
                        "{comp.verdict}"
                    </p>
                </div>
            </div>
        </section>
    );
}
