"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Lock, Sparkles, Check, ChevronRight, ChevronLeft, Home, User } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog";

interface ValuationFormProps {
    suburbSlug: string;
    buyerProfile?: string;
}

interface FormData {
    streetName: string;
    propertyType: string;
    estimatedValue: string;
    name: string;
    whatsapp: string;
}

export function ValuationForm({ suburbSlug, buyerProfile = "Target Buyers" }: ValuationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        streetName: "",
        propertyType: "",
        estimatedValue: "",
        name: "",
        whatsapp: ""
    });

    const totalSteps = 3; // Property Details → Contact → Success

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setStep(3); // Success state
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            const timer = setTimeout(() => {
                if (step === 3) {
                    setStep(1);
                    setFormData({
                        streetName: "",
                        propertyType: "",
                        estimatedValue: "",
                        name: "",
                        whatsapp: ""
                    });
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    };

    const canProceedToStep2 = formData.streetName.length > 0 && formData.propertyType.length > 0;
    const canSubmit = formData.name.length > 0 && formData.whatsapp.length >= 9;

    // Progress Bar Component
    const ProgressBar = () => (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-stone-500">
                    Step {Math.min(step, 2)} of 2
                </span>
                <span className="text-xs text-stone-400">
                    {step === 1 ? "Property Details" : "Your Contact"}
                </span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: step === 1 ? "50%" : "100%" }}
                />
            </div>
            {/* Step Indicators */}
            <div className="flex justify-between mt-2">
                <div className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= 1 ? "bg-amber-500 text-white" : "bg-stone-200 text-stone-500"
                        }`}>
                        {step > 1 ? <Check className="h-3 w-3" /> : <Home className="h-3 w-3" />}
                    </div>
                    <span className="text-xs text-stone-600 hidden sm:inline">Property</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= 2 ? "bg-amber-500 text-white" : "bg-stone-200 text-stone-500"
                        }`}>
                        <User className="h-3 w-3" />
                    </div>
                    <span className="text-xs text-stone-600 hidden sm:inline">Contact</span>
                </div>
            </div>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <div className="bg-white p-6 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-200 cursor-pointer group hover:border-amber-500 transition-all duration-300 relative overflow-hidden">
                    {/* Decorative background gradient */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <h3 className="font-serif font-bold text-stone-900 leading-tight text-lg">
                                Get the {suburbSlug} <br /> Seller Strategy
                            </h3>
                        </div>
                        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                            Unlock the specific data points we can't publish publicly, including street-level pricing and active buyer demands.
                        </p>
                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold group-hover:shadow-lg group-hover:shadow-amber-200/50 transition-all">
                            Unlock Market Insights <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                        <p className="text-[10px] text-center text-stone-400 mt-3 font-medium uppercase tracking-wider flex items-center justify-center gap-1">
                            <Lock className="h-3 w-3" />
                            Private & Confidential
                        </p>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-white">
                {step === 3 ? (
                    // Success View
                    <div className="py-6 text-center">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="h-8 w-8 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-bold text-amber-900 mb-2">Strategy Unlocked!</h3>
                        <p className="text-stone-600 mb-6 text-sm">
                            We've notified our {suburbSlug} specialist. Expect a WhatsApp shortly to refine these insights based on your property specifics.
                        </p>
                        <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full">
                            Close
                        </Button>
                    </div>
                ) : (
                    // Multi-Step Form View
                    <form onSubmit={handleSubmit}>
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl font-serif text-stone-900">
                                {step === 1 ? "Tell Us About Your Property" : "Almost There!"}
                            </DialogTitle>
                            <DialogDescription className="text-stone-500">
                                {step === 1
                                    ? `Get insights tailored for the ${buyerProfile} market.`
                                    : "We'll send your personalized strategy via WhatsApp."
                                }
                            </DialogDescription>
                        </DialogHeader>

                        {/* Progress Bar */}
                        <ProgressBar />

                        {/* Step 1: Property Details */}
                        {step === 1 && (
                            <div className="space-y-4">
                                {/* Value Props */}
                                <div className="bg-stone-50 p-4 rounded-xl space-y-2 border border-stone-100">
                                    <div className="flex items-start gap-2 text-sm text-stone-700">
                                        <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                        <span>Street-level valuation band</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-stone-700">
                                        <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                        <span>Active buyer demand profile</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-stone-700">
                                        <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                        <span>Compliance & staging checklist</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-stone-700">Street Name *</Label>
                                    <Input
                                        placeholder="e.g. Woodlands Avenue"
                                        value={formData.streetName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, streetName: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-stone-700">Property Type *</Label>
                                    <Select
                                        value={formData.propertyType}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="house">Freehold House</SelectItem>
                                            <SelectItem value="cluster">Cluster Home</SelectItem>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-stone-700">Estimated Value (Optional)</Label>
                                    <Select
                                        value={formData.estimatedValue}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, estimatedValue: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="r2m-r4m">R2m - R4m</SelectItem>
                                            <SelectItem value="r4m-r6m">R4m - R6m</SelectItem>
                                            <SelectItem value="r6m-r10m">R6m - R10m</SelectItem>
                                            <SelectItem value="r10m+">R10m+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="w-full bg-amber-600 hover:bg-amber-700 mt-2 h-11 text-base font-semibold"
                                    disabled={!canProceedToStep2}
                                >
                                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}

                        {/* Step 2: Contact Details */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                    <p className="text-sm text-amber-800">
                                        <strong>Almost done!</strong> We just need your contact details to send your personalized {suburbSlug} strategy.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-stone-700">Your Name *</Label>
                                    <Input
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-stone-700">WhatsApp Number *</Label>
                                    <Input
                                        placeholder="082..."
                                        type="tel"
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                                        required
                                    />
                                    <p className="text-xs text-stone-500">We'll send your strategy report here</p>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(1)}
                                        className="flex-1"
                                    >
                                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-amber-600 hover:bg-amber-700 h-11 text-base font-semibold"
                                        disabled={isSubmitting || !canSubmit}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Preparing...
                                            </>
                                        ) : (
                                            "Reveal My Strategy"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}

                        <p className="text-[10px] text-center text-stone-400 mt-4 font-medium">
                            <Lock className="h-3 w-3 inline mr-1" />
                            Your information is private and never shared publicly
                        </p>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
