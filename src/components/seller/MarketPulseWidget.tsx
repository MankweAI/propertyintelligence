'use client';

import { useState } from 'react';
import { Activity, Check, TrendingUp, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ValuationModal } from './ValuationModal';

interface MarketPulseWidgetProps {
    suburbName: string;
}

export function MarketPulseWidget({ suburbName }: MarketPulseWidgetProps) {

    return (
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl my-16 isolate">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 p-8 md:p-12">

                {/* Content Side */}
                {/* <div className="flex-1 space-y-6 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        <Activity className="h-3 w-3" />
                        <span>Market Pulse</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                        Don't sell blindly. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                            Watch the market.
                        </span>
                    </h2>

                    <p className="text-slate-300 text-lg leading-relaxed">
                        Property values in <strong className="text-white">{suburbName}</strong> are shifting.
                        Join 400+ owners receiving our monthly data digest. Know exactly when the market peaks.
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {[
                            'Sold Price Updates',
                            'Buyer Demand Heatmaps',
                            'Days on Market Trends',
                            'Micro-Market Alerts'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                                <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-emerald-400" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div> */}

                {/* Action Side */}
                <div className="w-full max-w-md shrink-0">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl transform transition-transform hover:scale-[1.01]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                                <TrendingUp className="h-5 w-5 text-amber-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">Property Wealth Tracker</div>
                                <div className="text-slate-400 text-xs">Live Market Data</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-stone-300 text-sm mb-4">
                                Get a comprehensive valuation report including sold prices, buyer demand, and your estimated equity.
                            </p>

                            <ValuationModal suburbName={suburbName}>
                                <Button
                                    className="w-full bg-amber-600 hover:bg-amber-500 text-white h-12 font-bold text-base shadow-lg shadow-amber-900/20 transition-all hover:translate-y-[-1px]"
                                >
                                    Get a Valuation Report
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </ValuationModal>
                        </div>

                        <p className="text-[10px] text-slate-500 text-center mt-4">
                            100% Free. No obligation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
