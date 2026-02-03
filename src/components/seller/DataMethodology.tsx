'use client';

import { ChevronDown, Database, FileCheck, ShieldCheck, TrendingUp } from "lucide-react";
import { useState } from "react";

interface DataMethodologyProps {
    suburbName: string;
    salesAnalyzed: number;
    lastUpdated: string;
}

export function DataMethodology({ suburbName, salesAnalyzed, lastUpdated }: DataMethodologyProps) {
    const [isOpen, setIsOpen] = useState(false);

    const sources = [
        {
            icon: <Database className="h-5 w-5" />,
            name: "Lightstone Property",
            description: "Official deeds office records and transaction history"
        },
        {
            icon: <TrendingUp className="h-5 w-5" />,
            name: "PropStats Analytics",
            description: "Real-time market pricing and demand indicators"
        },
        {
            icon: <FileCheck className="h-5 w-5" />,
            name: "CMA Reports",
            description: "Comparative market analysis from local agents"
        },
        {
            icon: <ShieldCheck className="h-5 w-5" />,
            name: "Manual Verification",
            description: "Human review of outliers and data anomalies"
        }
    ];

    return (
        <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-100 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Database className="h-4 w-4 text-amber-700" />
                    </div>
                    <div>
                        <span className="font-semibold text-stone-900">Our Methodology</span>
                        <span className="text-xs text-stone-500 ml-2">
                            • Updated {lastUpdated}
                        </span>
                    </div>
                </div>
                <ChevronDown
                    className={`h-5 w-5 text-stone-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="px-4 pb-4 border-t border-stone-200">
                    <p className="text-sm text-stone-600 mt-4 mb-4">
                        Our {suburbName} market intelligence is compiled and verified by{' '}
                        <a href="https://www.bigdataquery.co.za" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-800 font-medium underline underline-offset-2">
                            BigDataQuery
                        </a>
                        , using multiple verified sources:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sources.map((source, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-white rounded-lg border border-stone-100"
                            >
                                <div className="text-amber-600 mt-0.5">
                                    {source.icon}
                                </div>
                                <div>
                                    <div className="font-medium text-stone-900 text-sm">
                                        {source.name}
                                    </div>
                                    <div className="text-xs text-stone-500">
                                        {source.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-stone-500 mt-4 italic">
                        All data is for informational purposes only. Research and fact-checking by{' '}
                        <a href="https://www.bigdataquery.co.za" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">BigDataQuery</a>.
                        Actual property values may vary. Always consult a licensed property practitioner for formal valuations.
                    </p>
                </div>
            )}
        </div>
    );
}
