
import { ValuationModal } from './ValuationModal';
import { Button } from '@/components/ui/button';
import { Calculator, Lock, ChevronRight, Sparkles } from 'lucide-react';

interface ValuationCTAProps {
    suburbName: string;
}

export function ValuationCTA({ suburbName }: ValuationCTAProps) {
    return (
        <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white p-6 rounded-3xl shadow-xl shadow-stone-200/50 relative overflow-hidden isolate">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -z-10" />

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                    <Calculator className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                    <h3 className="font-serif font-bold text-xl leading-tight">
                        Need a Valuation?
                    </h3>
                    <p className="text-stone-400 text-xs font-medium uppercase tracking-wider">
                        Stop Guessing
                    </p>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <p className="text-stone-300 text-sm leading-relaxed">
                    Automated tools can't see your renovations, sunlight, or street appeal.
                </p>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                    <Sparkles className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-stone-300">
                        Get a <strong className="text-white">verified valuation</strong> from a top {suburbName} expert who knows the current buyers.
                    </p>
                </div>
            </div>

            <ValuationModal suburbName={suburbName}>
                <Button className="w-full h-14 bg-amber-600 hover:bg-amber-500 text-white font-bold text-base shadow-lg shadow-amber-900/40 transition-all group">
                    Get Verified Valuation
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </ValuationModal>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-stone-500">
                <Lock className="h-3 w-3" />
                <span>100% Free & Confidential</span>
            </div>
        </div>
    );
}
