"use client";

import { Agent } from "@/lib/agents";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, ExternalLink } from "lucide-react";
import { PlaceholderImage } from "../PlaceholderImage";
import { Button } from "../ui/button";
import { ValuationModal } from "@/components/seller/ValuationModal";

interface AgentCardProps {
    agent: Agent;
    suburbName: string;
    suburbSlug: string;
}

export function AgentCard({ agent, suburbName, suburbSlug }: AgentCardProps) {
    const suburbProfile = agent.suburbs?.[suburbSlug];
    // Mock Valuation Accuracy (Randomized slightly for realism based on name length for stability)
    const accuracy = 96 + (agent.name.length % 4);

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-stone-200 group bg-white">
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="w-full md:w-48 h-48 md:h-auto relative bg-stone-100 shrink-0">
                    <PlaceholderImage alt={agent.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                        <Badge className="bg-stone-900 text-white border-none shadow-sm backdrop-blur-sm font-serif">
                            {accuracy}% Accuracy
                        </Badge>
                    </div>
                </div>

                {/* Content Section */}
                <CardContent className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-serif font-bold text-xl text-stone-900">{agent.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-stone-500 mt-1">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                <span>Verified Analyst</span>
                                <span className="text-stone-300">•</span>
                                <span className="text-stone-500">{agent.agency}</span>
                            </div>
                        </div>
                        <div className="text-right hidden sm:block">
                            <div className="mb-2">
                                <p className="text-sm font-bold text-emerald-700">{agent.stats.estDaysOnMarket || "45 days"}</p>
                                <p className="text-[10px] uppercase tracking-wider text-stone-400">Avg Speed</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Valuation Strategy</p>

                        {/* 1. The Hunger Signal (Primary Insight) */}
                        {agent.hungerSignal && (
                            <div className="mb-3 p-3 bg-stone-50 border border-stone-100 rounded-md text-sm text-stone-700 italic relative">
                                {agent.hungerSignal}
                            </div>
                        )}

                        {/* 2. Supported Bullet Points */}
                        <ul className="space-y-1">
                            {agent.whyRecommended.slice(0, 2).map((reason, i) => (
                                <li key={i} className="text-xs text-stone-500 flex items-start gap-2">
                                    <span className="text-emerald-500 mt-0.5">✓</span>
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex gap-3 mt-auto">
                        <ValuationModal suburbName={suburbName} agentName={agent.name}>
                            <Button className="flex-1 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-900 border border-stone-200 transition-all font-bold">
                                Request Valuation from {agent.name.split(' ')[0]}
                            </Button>
                        </ValuationModal>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}
