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

                {/* Action Side */}
                <div className="w-full max-w-md shrink-0">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl transform transition-transform hover:scale-[1.01]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                                <TrendingUp className="h-5 w-5 text-amber-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">Professional Property Valuation</div>
                                <div className="text-slate-400 text-xs">Expert Analysis</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-stone-300 text-sm mb-4">
                                Connect with a top-tier agent for a professional, data-driven property valuation.
                            </p>

                            <ValuationModal suburbName={suburbName}>
                                <Button
                                    className="w-full bg-amber-600 hover:bg-amber-500 text-white h-12 font-bold text-base shadow-lg shadow-amber-900/20 transition-all hover:translate-y-[-1px]"
                                >
                                    Request A Valuation
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
