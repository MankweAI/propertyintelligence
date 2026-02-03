"use client";

import { Check, X, Hammer, AlertTriangle } from "lucide-react";

interface RenovationRoiCardsProps {
    data: {
        item: string;
        cost: number;
        valueAdd: number;
        roi: number;
        verdict: 'Do It' | 'Skip It' | 'Caution';
    }[];
}

export function RenovationRoiCards({ data }: RenovationRoiCardsProps) {

    // Sort logic: 'Do It' first, then 'Caution', then 'Skip It'
    const sortedData = [...data].sort((a, b) => {
        const priority = { 'Do It': 0, 'Caution': 1, 'Skip It': 2 };
        return priority[a.verdict] - priority[b.verdict];
    });

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            maximumFractionDigits: 0,
            notation: "compact"
        }).format(val);


    return (
        <div className="space-y-4">
            {sortedData.map((item, i) => (
                <div
                    key={i}
                    className={`
                        relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-md group
                        ${item.verdict === 'Do It' ? 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-300' :
                            item.verdict === 'Skip It' ? 'bg-stone-50 border-stone-200 hover:border-stone-300' :
                                'bg-amber-50/50 border-amber-100 hover:border-amber-300'}
                    `}
                >
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className={`
                                h-8 w-8 rounded-full flex items-center justify-center
                                ${item.verdict === 'Do It' ? 'bg-emerald-100 text-emerald-600' :
                                    item.verdict === 'Skip It' ? 'bg-stone-200 text-stone-500' :
                                        'bg-amber-100 text-amber-600'}
                            `}>
                                {item.verdict === 'Do It' && <Check className="h-4 w-4" />}
                                {item.verdict === 'Skip It' && <X className="h-4 w-4" />}
                                {item.verdict === 'Caution' && <AlertTriangle className="h-4 w-4" />}
                            </div>
                            <h4 className="font-bold text-stone-900">{item.item}</h4>
                        </div>
                        <div className={`
                            px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide
                            ${item.verdict === 'Do It' ? 'bg-emerald-200 text-emerald-800' :
                                item.verdict === 'Skip It' ? 'bg-stone-200 text-stone-600' :
                                    'bg-amber-200 text-amber-800'}
                        `}>
                            {item.verdict}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-xs text-stone-500 uppercase">Avg Cost</div>
                            <div className="font-semibold text-stone-900">~{formatCurrency(item.cost)}</div>
                        </div>
                        <div>
                            <div className="text-xs text-stone-500 uppercase">Value Add</div>
                            <div className={`font-bold ${item.roi > 1 ? 'text-emerald-700' : 'text-stone-900'}`}>
                                ~{formatCurrency(item.valueAdd)}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar for ROI */}
                    <div className="mt-4 bg-white/50 h-1.5 w-full rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${item.roi >= 1.5 ? 'bg-emerald-500' : item.roi >= 1 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                            style={{ width: `${Math.min(item.roi * 50, 100)}%` }}
                        />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-stone-400 font-medium">
                        <span>Negative Return</span>
                        <span>Break Even</span>
                        <span>High Return</span>
                    </div>

                </div>
            ))}
        </div>
    );
}
