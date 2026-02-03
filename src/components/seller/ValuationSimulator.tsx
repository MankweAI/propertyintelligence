"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ValuationModal } from "@/components/seller/ValuationModal";
import { Check, ChevronRight, ChevronLeft, Calculator, Sparkles, Home, User, Info, Sun, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SellerPricing {
    freehold: { avgPrice: string };
    sectional: { avgPrice: string };
}

interface ValuationSimulatorProps {
    suburbName: string;
    pricingData: SellerPricing;
}

// --- Logic Helpers ---

const parsePrice = (priceStr: string): number => {
    // "R4.2M" -> 4200000
    // "R850k" -> 850000
    const clean = priceStr.toLowerCase().replace(/r|,/g, "").trim();
    if (clean.endsWith("m")) {
        return parseFloat(clean.replace("m", "")) * 1_000_000;
    }
    if (clean.endsWith("k")) {
        return parseFloat(clean.replace("k", "")) * 1_000;
    }
    return parseFloat(clean) || 0;
};

const formatCurrency = (val: number): string => {
    if (val >= 1_000_000) {
        return `R${(val / 1_000_000).toFixed(2)}M`;
    }
    return `R${(val / 1_000).toFixed(0)}k`;
};

// --- Component ---

export function ValuationSimulator({ suburbName, pricingData }: ValuationSimulatorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isCalculating, setIsCalculating] = useState(false);

    // Form State
    const [type, setType] = useState<"freehold" | "sectional">("freehold");
    const [bedrooms, setBedrooms] = useState(3);
    const [condition, setCondition] = useState<"needs-work" | "standard" | "renovated">("standard");
    const [features, setFeatures] = useState<{ [key: string]: boolean }>({
        solar: false,
        pool: false,
        security: false,
        garden: false
    });

    // Result State
    const [resultRange, setResultRange] = useState<{ min: string; max: string } | null>(null);

    // Calculation Engine
    const calculateValue = () => {
        setIsCalculating(true);

        // 1. Base Price
        const baseStr = type === "freehold" ? pricingData.freehold.avgPrice : pricingData.sectional.avgPrice;
        let estimate = parsePrice(baseStr);

        // 2. Bedroom Adjustment (vs 3 beds baseline)
        // rough rule: +/- 5% per bedroom difference, capped at +/- 20%
        const bedDiff = bedrooms - 3;
        const bedMultiplier = 1 + Math.max(-0.2, Math.min(0.2, bedDiff * 0.05));
        estimate *= bedMultiplier;

        // 3. Condition Multiplier
        const conditionMultipliers = {
            "needs-work": 0.85,
            "standard": 1.0,
            "renovated": 1.15
        };
        estimate *= conditionMultipliers[condition];

        // 4. Features Adder (Flat value approx)
        if (features.solar) estimate += 50000; // Solar value
        if (features.pool && type === "freehold") estimate += 30000; // Pool maintenance logic? debatable, but generally +
        if (features.security) estimate *= 1.02; // 2% premium for good security

        // 5. Generate Ranges
        // Public/Broad Range (+/- 15% - intentionally wide to drive "precision" desire)
        const minFn = estimate * 0.85;
        const maxFn = estimate * 1.15;

        setTimeout(() => {
            setResultRange({
                min: formatCurrency(minFn),
                max: formatCurrency(maxFn)
            });
            setIsCalculating(false);
            setStep(4); // Go to result
        }, 1500); // Fake crunching delay
    };

    const toggleFeature = (key: string) => {
        setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Reset on close
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setTimeout(() => {
                setStep(1);
                setResultRange(null);
            }, 300);
        }
    };

    // Steps rendering
    const renderStep1_Basics = () => (
        <div className="space-y-6">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                <Info className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-800">
                    We'll use live {suburbName} sales data to estimate your home's value range.
                </p>
            </div>

            <div className="space-y-3">
                <Label>Property Type</Label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setType("freehold")}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${type === "freehold" ? "border-amber-500 bg-amber-50 text-amber-900" : "border-slate-200 hover:border-slate-300"
                            }`}
                    >
                        🏠 Freehold
                    </button>
                    <button
                        onClick={() => setType("sectional")}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${type === "sectional" ? "border-amber-500 bg-amber-50 text-amber-900" : "border-slate-200 hover:border-slate-300"
                            }`}
                    >
                        🏢 Apartment
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between">
                    <Label>Bedrooms: {bedrooms}</Label>
                </div>
                <Slider
                    value={[bedrooms]}
                    min={1}
                    max={8}
                    step={1}
                    onValueChange={(vals: number[]) => setBedrooms(vals[0])}
                    className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-400 px-1">
                    <span>1</span>
                    <span>8+</span>
                </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800">
                Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );

    const renderStep2_Condition = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">How's the condition?</h3>
                <p className="text-sm text-slate-500">Be honest - this affects value heavily!</p>
            </div>

            <div className="space-y-3">
                {[
                    { id: "needs-work", label: "🛠️ Needs TLC", desc: "Original finishes, needs paint/repairs" },
                    { id: "standard", label: "✨ Standard", desc: "Well lived in, nothing broken, older style" },
                    { id: "renovated", label: "💎 Modern / Renovated", desc: "New kitchen, bathrooms, floors" }
                ].map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => setCondition(opt.id as any)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${condition === opt.id
                            ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                            : "border-slate-200 hover:border-slate-300"
                            }`}
                    >
                        <div className="font-bold text-slate-900">{opt.label}</div>
                        <div className="text-xs text-slate-500">{opt.desc}</div>
                    </button>
                ))}
            </div>

            <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-slate-900 text-white hover:bg-slate-800">
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );

    const renderStep3_Features = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Premium Features</h3>
                <p className="text-sm text-slate-500">Select what you have</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {[
                    { id: "solar", label: "☀️ Solar / Inverter" },
                    { id: "pool", label: "🏊 Pool" },
                    { id: "security", label: "🛡️ 24h Boom / Guard" },
                    { id: "garden", label: "🌳 Landscaped Garden" }
                ].map((feat) => (
                    <button
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`p-4 rounded-xl border-2 text-sm font-medium transition-all flex flex-col items-center justify-center gap-2 text-center h-24 ${features[feat.id]
                            ? "border-amber-500 bg-amber-50 text-amber-900"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                    >
                        <span>{feat.label}</span>
                        {features[feat.id] && <Check className="h-4 w-4 text-amber-600" />}
                    </button>
                ))}
            </div>

            <Button
                onClick={calculateValue}
                className="w-full h-14 text-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg shadow-amber-200 font-bold mt-6"
            >
                Calculate Range
            </Button>

            <Button variant="ghost" onClick={() => setStep(2)} className="w-full mt-2">Back</Button>
        </div>
    );

    const renderStep4_Result = () => (
        <div className="text-center space-y-6 py-4">
            {/* Warning Lock */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Lock className="h-3 w-3" />
                Unverified Estimate
            </div>

            <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Broad Market Indication</p>
                <div className="text-3xl md:text-5xl font-black text-slate-400 tracking-tight opacity-70 blur-[1px] select-none">
                    {resultRange?.min} <span className="text-slate-200 font-light">-</span> {resultRange?.max}
                </div>
            </div>

            {/* The Hook */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full -mr-8 -mt-8" />

                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-amber-600" />
                    Want the exact number?
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Automated tools can't see your finishes. Get a <strong>verified human valuation</strong> from a top {suburbName} specialist.
                </p>

                <ValuationModal suburbName={suburbName} onComplete={() => setIsOpen(false)}>
                    <Button className="w-full h-12 bg-stone-900 hover:bg-stone-800 text-white font-bold shadow-lg shadow-stone-200/50">
                        Unlock Verified Valuation <Lock className="ml-2 h-4 w-4 opacity-70" />
                    </Button>
                </ValuationModal>
            </div>

            <Button variant="ghost" onClick={() => setStep(1)} className="w-full text-slate-400 hover:text-slate-600">
                Start Over
            </Button>
        </div>
    );

    const renderLoading = () => (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-amber-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Calculator className="h-6 w-6 text-slate-400" />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900">Crunching Market Data...</h3>
                <p className="text-sm text-slate-500">Comparing {suburbName} sales history</p>
            </div>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {/* Replaces the old static card trigger */}
                <div className="bg-yellow-50 p-6 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-200 cursor-pointer group hover:border-amber-500 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                                <Calculator className="h-5 w-5" />
                            </div>
                            <h3 className="font-serif font-bold text-stone-900 leading-tight text-lg">
                                What's my house worth?
                            </h3>
                        </div>
                        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                            Use our simulator to check your estimated {suburbName} sale price based on real-time market data.
                        </p>
                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold group-hover:shadow-lg group-hover:shadow-amber-200/50 transition-all">
                            Start Simulator <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-center font-serif text-2xl">
                        {step === 4 ? "Valuation Result" : "Home Value Simulator"}
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    {isCalculating ? renderLoading() : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {step === 1 && renderStep1_Basics()}
                                {step === 2 && renderStep2_Condition()}
                                {step === 3 && renderStep3_Features()}
                                {step === 4 && renderStep4_Result()}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
