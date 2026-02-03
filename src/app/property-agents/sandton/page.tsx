import { Metadata } from 'next';
import { recommendedAgents } from '@/lib/agents';
import { AgentSelectionMethodology } from '@/components/seller/AgentSelectionMethodology';
import { AgentFilterGrid } from '@/components/seller/AgentFilterGrid';
import { AgentCard } from '@/components/seller/AgentCard';
import { Badge } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Top 20 Real Estate Agents in Sandton | Verified & Audited',
    description: 'We audited 9,400+ agents to find the "Sandton 20". These are the high-performance Rising Stars who are hungry, tech-enabled, and sell faster.',
};

import Image from 'next/image';

// ... (Metadata stays same)

export default function SandtonAgentsHubPage() {
    return (
        <main className="min-h-screen bg-stone-50">
            {/* Hero Section */}
            <section className="relative min-h-[500px] flex items-center pt-24 pb-16 px-6">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/sandton-hub-hero.png"
                        alt="Sandton Financial District Skyline"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-stone-900/85" /> {/* Darker Overlay for Hub Authority */}
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                <Badge className="h-3 w-3" />
                                Editorial Selection
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-white">
                                The Sandton 20: <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                                    Rising Stars
                                </span>
                            </h1>
                            <p className="text-lg text-stone-300 leading-relaxed max-w-xl">
                                We analyzed 7,165 transactions and 9,427 agents. We ignored the "parking lot" agents and found the hungry ones. These are the 20 agents changing the game in Sandton.
                            </p>
                        </div>

                        {/* Stat Box */}
                        <div className="w-full md:w-80 bg-stone-900/60 backdrop-blur-md p-6 rounded-2xl border border-stone-700/50">
                            <div className="grid grid-cols-1 gap-6 divide-y divide-stone-700/50">
                                <div className="pt-2">
                                    <div className="text-3xl font-bold text-white">9,427</div>
                                    <div className="text-xs text-stone-400 uppercase tracking-wider">Total Agents Analyzed</div>
                                </div>
                                <div className="pt-6">
                                    <div className="text-3xl font-bold text-amber-500">0.2%</div>
                                    <div className="text-xs text-stone-400 uppercase tracking-wider">Selection Rate</div>
                                </div>
                                <div className="pt-6">
                                    <div className="text-3xl font-bold text-white">20</div>
                                    <div className="text-xs text-stone-400 uppercase tracking-wider">Agents Selected</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Methodology Injection */}
            <div className="py-0">
                <AgentSelectionMethodology />
            </div>

            {/* The Directory Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-stone-900 mb-4 font-serif">Meet The 20</h2>
                        <p className="text-stone-600 max-w-2xl mx-auto">
                            Audited for speed, digital capability, and hunger. These agents don't just list homes; they campaign them.
                        </p>
                    </div>

                    <AgentFilterGrid agents={recommendedAgents} />
                </div>
            </section>

            {/* Editorial Disclaimer */}
            <section className="bg-stone-200 py-12 px-6">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest">Editorial Policy</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">
                        This list is curated by our internal research team based on market performance data ("Hunger Signal").
                        Agents cannot pay to be on this list. We constantly monitor performance and remove agents who lose their edge.
                    </p>
                </div>
            </section>
        </main>
    );
}
