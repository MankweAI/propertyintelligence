import { TrendingUp, Award, Sparkles } from "lucide-react";
import { ValueProp } from "@/lib/seller-data";

interface ValuePropCardsProps {
    valueProp: ValueProp;
}

export function ValuePropCards({ valueProp }: ValuePropCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Fast Sales */}
            <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl border border-amber-100 hover:shadow-lg hover:border-amber-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Fast Sales</h3>
                </div>
                <div className="text-3xl font-bold text-amber-900 mb-1">{valueProp.fast.metric}</div>
                <p className="text-sm text-stone-600">{valueProp.fast.context}</p>
            </div>

            {/* Premium Market */}
            <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl border border-amber-100 hover:shadow-lg hover:border-amber-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <Award className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Premium Market</h3>
                </div>
                <div className="text-3xl font-bold text-amber-900 mb-1">{valueProp.premium.metric}</div>
                <p className="text-sm text-stone-600">{valueProp.premium.context}</p>
            </div>

            {/* Growth Story */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 hover:shadow-lg hover:border-blue-200 transition-all">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Growth Story</h3>
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-1">{valueProp.growth.metric}</div>
                <p className="text-sm text-stone-600">{valueProp.growth.context}</p>
            </div>
        </div>
    );
}
