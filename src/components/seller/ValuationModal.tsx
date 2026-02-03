"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Check, Sparkles } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";

interface ValuationModalProps {
    children: React.ReactNode;
    suburbName: string;
    agentName?: string;
    onComplete?: () => void;
}

export function ValuationModal({ children, suburbName, agentName, onComplete }: ValuationModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setStep(3); // Success
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setTimeout(() => {
                if (step === 3) setStep(1);
            }, 300);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        onComplete?.();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white max-h-[90vh] overflow-y-auto">
                {step === 3 ? (
                    <div className="py-6 text-center">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="h-8 w-8 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-bold text-amber-900 mb-2">Request Sent!</h3>
                        <p className="text-stone-600 mb-6 text-sm">
                            {agentName ? `${agentName} will contact you shortly.` : `An expert in ${suburbName} will be in touch.`}
                        </p>
                        <Button variant="outline" onClick={handleClose} className="w-full">
                            Close
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-2xl font-serif text-stone-900">
                                {agentName ? `Contact ${agentName}` : `Value My Home in ${suburbName}`}
                            </DialogTitle>
                            <DialogDescription className="text-stone-500">
                                Share a few details to get a clearer valuation estimate.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Pre-Qualify Indicators */}
                        <div className="bg-stone-50 p-4 rounded-xl mb-6 space-y-2 border border-stone-100">
                            <div className="flex items-start gap-2 text-sm text-stone-700">
                                <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                <span>Get a precise valuation range</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-stone-700">
                                <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                <span>Receive a seller's checklist</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-stone-700">Street Name</Label>
                                <Input placeholder="e.g. Woodlands Avenue" required />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-stone-700">Property Type</Label>
                                <Select required>
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
                                <Select>
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

                            {/* Qualification Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-stone-700">Timeline</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="When?" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="asap">ASAP (Urgent)</SelectItem>
                                            <SelectItem value="1-3">1-3 Months</SelectItem>
                                            <SelectItem value="3-6">3-6 Months</SelectItem>
                                            <SelectItem value="6+">6+ Months</SelectItem>
                                            <SelectItem value="curious">Just Curious</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-stone-700">Goal</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Why?" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="upsize">Upsizing</SelectItem>
                                            <SelectItem value="downsize">Downsizing</SelectItem>
                                            <SelectItem value="relocate">Relocating</SelectItem>
                                            <SelectItem value="cash">Cashing Out</SelectItem>
                                            <SelectItem value="investment">Investment</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-stone-700">Name</Label>
                                    <Input placeholder="Your name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-stone-700">WhatsApp</Label>
                                    <Input placeholder="082..." required />
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 mt-2 h-11 text-base font-semibold" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Request Call Back"
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
