"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Check, Sparkles, Users } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import { Agent } from "@/lib/agents";

interface BroadcastValuationModalProps {
    children: React.ReactNode;
    suburbName: string;
    agents: Agent[];
}

export function BroadcastValuationModal({ children, suburbName, agents }: BroadcastValuationModalProps) {
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

    const agentNames = agents.map(a => a.name.split(' ')[0]).join(', ').replace(/, ([^,]*)$/, ' & $1');

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
                        <h3 className="text-xl font-bold text-amber-900 mb-2">Request Started!</h3>
                        <p className="text-stone-600 mb-4 text-sm">
                            Your invitation to pitch has been sent to <strong>{agentNames}</strong>.
                        </p>
                        <p className="text-xs text-stone-500 mb-6">
                            Expect 2-3 responses within 24 hours. Each agent will contact you directly via WhatsApp.
                        </p>
                        <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full">
                            Close
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-2xl font-serif text-stone-900 flex items-center gap-2">
                                <Users className="h-6 w-6 text-amber-600" />
                                Invite {agents.length} Verified Agents to Pitch
                            </DialogTitle>
                            <DialogDescription className="text-stone-500">
                                One submission. Multiple expert opinions on your {suburbName} property.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Agent Preview */}
                        <div className="bg-amber-50 p-4 rounded-xl mb-6 border border-amber-100">
                            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                                📢 Inviting:
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {agents.map((agent) => (
                                    <div key={agent.id} className="bg-white px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 border border-amber-200">
                                        {agent.name} ({agent.agency})
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What You'll Get */}
                        <div className="bg-stone-50 p-4 rounded-xl mb-6 space-y-2 border border-stone-100">
                            <div className="flex items-start gap-2 text-sm text-stone-700">
                                <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                <span>Competitive valuation quotes</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-stone-700">
                                <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                <span>Different marketing strategies</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-stone-700">
                                <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                <span>Compare commission structures</span>
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

                            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 mt-2 h-11 text-base font-semibold" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Inviting Agents...
                                    </>
                                ) : (
                                    `Invite All ${agents.length} Agents to Pitch`
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
