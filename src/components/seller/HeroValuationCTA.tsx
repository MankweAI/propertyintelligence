'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ValuationModal } from '@/components/seller/ValuationModal';

interface HeroValuationCTAProps {
    suburbName?: string;
}

export function HeroValuationCTA({ suburbName = 'Sandton' }: HeroValuationCTAProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <ValuationModal suburbName={suburbName}>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-amber-600/20">
                    Get Your Free Valuation
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </ValuationModal>
        </div>
    );
}
