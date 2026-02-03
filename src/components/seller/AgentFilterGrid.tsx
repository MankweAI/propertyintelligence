"use client";

import { useState, useMemo } from "react";
import { Agent } from "@/lib/agents";
import { AgentCard } from "./AgentCard";
import { Button } from "@/components/ui/button";
import { MapPin, X, Filter, Tag, Banknote } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface AgentFilterGridProps {
    agents: Agent[];
}

type PriceRange = "all" | "entry" | "mid" | "luxury";
type Specialization = "all" | "investment" | "cluster" | "lifestyle" | "apartment";

export function AgentFilterGrid({ agents }: AgentFilterGridProps) {
    // State
    const [selectedArea, setSelectedArea] = useState<string>("all");
    const [priceRange, setPriceRange] = useState<PriceRange>("all");
    const [specialization, setSpecialization] = useState<Specialization>("all");

    // Extract unique areas
    const allAreas = useMemo(() => {
        const areas = new Set<string>();
        agents.forEach(agent => {
            agent.areas.forEach(area => areas.add(area));
        });
        return Array.from(areas).sort();
    }, [agents]);

    // Helper: Parse Price (e.g., "R4.5m" -> 4.5)
    const getPriceValue = (priceStr: string) => {
        const clean = priceStr.toLowerCase().replace('r', '').replace('m', '').trim();
        return parseFloat(clean) || 0;
    };

    // Helper: Check Specialization
    const checkSpecialization = (agent: Agent, type: Specialization) => {
        if (type === "all") return true;
        const keywords = {
            investment: ["investor", "investment", "roi", "distressed", "blackbrick"],
            cluster: ["cluster", "estate", "security", "secure"],
            lifestyle: ["lifestyle", "family", "community", "retirement"],
            apartment: ["apartment", "sectional", "loft", "studio", "vertical"]
        };

        const combinedText = [
            agent.agency,
            ...(agent.whyRecommended || []),
            agent.hungerSignal || "",
            ...Object.values(agent.suburbs).map(s => s.badge || "")
        ].join(" ").toLowerCase();

        return keywords[type].some(k => combinedText.includes(k));
    };

    // Filter Logic
    const filteredAgents = useMemo(() => {
        return agents.filter(agent => {
            // 1. Area Filter
            const matchesArea = selectedArea === "all" || agent.areas.includes(selectedArea);

            // 2. Price Filter
            let matchesPrice = true;
            const price = getPriceValue(agent.stats.avgPrice);
            if (priceRange === "entry") matchesPrice = price < 2.0;
            if (priceRange === "mid") matchesPrice = price >= 2.0 && price <= 4.0;
            if (priceRange === "luxury") matchesPrice = price > 4.0;

            // 3. Specialization Filter
            const matchesSpec = checkSpecialization(agent, specialization);

            return matchesArea && matchesPrice && matchesSpec;
        });
    }, [agents, selectedArea, priceRange, specialization]);

    // Reset handler
    const clearFilters = () => {
        setSelectedArea("all");
        setPriceRange("all");
        setSpecialization("all");
    };

    const hasActiveFilters = selectedArea !== "all" || priceRange !== "all" || specialization !== "all";

    return (
        <div className="space-y-8">
            {/* Filter Controls */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Filter className="w-32 h-32" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                            Find Your Match
                        </span>
                        <div className="h-px bg-amber-100 flex-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                        {/* Area Filter */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-stone-500 flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> Suburb Focus
                            </label>
                            <Select value={selectedArea} onValueChange={setSelectedArea}>
                                <SelectTrigger className="bg-stone-50 border-stone-200 h-11">
                                    <SelectValue placeholder="All Areas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Any Suburb</SelectItem>
                                    {allAreas.map(area => (
                                        <SelectItem key={area} value={area} className="capitalize">
                                            {area.replace(/-/g, ' ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Reset Button */}
                        <div>
                            {hasActiveFilters && (
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                    className="w-full text-stone-500 hover:text-red-600 hover:bg-red-50 border-stone-200 h-11"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center px-2">
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                    {filteredAgents.length > 0 ? 'Verified Agents Found' : 'No Agents Found'}
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
                    {filteredAgents.length} Agents
                </span>
            </div>

            {/* Results Grid */}
            {filteredAgents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAgents.map((agent) => (
                        <AgentCard
                            key={agent.id}
                            agent={agent}
                            suburbName={selectedArea !== "all" ? selectedArea.replace(/-/g, ' ') : "Sandton"}
                            suburbSlug={selectedArea !== "all" ? selectedArea : "sandton"}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Filter className="h-8 w-8 text-stone-300" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-1">No matches found</h3>
                    <p className="text-stone-500 mb-6 max-w-sm mx-auto">
                        Try adjusting your filters. For example, some 'Luxury' agents might also sell 'Mid Market' properties, so try clearing the price filter.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                        Clear All Filters
                    </Button>
                </div>
            )}
        </div>
    );
}
