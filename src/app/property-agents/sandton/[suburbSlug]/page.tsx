import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSellerData } from '@/lib/seller-data';
import { getAgentsForSuburb } from '@/lib/agents';
import { getSuburbBySlug } from '@/lib/data';
import { AgentCard } from '@/components/seller/AgentCard';
import { MapPin, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Force dynamic rendering since we rely on URL params and potential DB calls
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        suburbSlug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { suburbSlug } = await params;
    const suburb = await getSuburbBySlug(suburbSlug);
    // getSellerData is needed if we use it for description, but title relies on name

    if (!suburb) return { title: 'Agent Not Found' };

    return {
        title: `Best Real Estate Agents in ${suburb.name} | Verified Rising Stars`,
        description: `Don't hire a parking lot agent. See the top performing property agents in ${suburb.name} based on speed, digital reach, and hunger signals.`,
    };
}

export default async function SuburbAgentsPage({ params }: PageProps) {
    const { suburbSlug } = await params;

    // 1. Fetch Suburb Context
    const suburb = await getSuburbBySlug(suburbSlug);
    const sellerData = await getSellerData(suburbSlug);

    if (!sellerData || !suburb) {
        notFound();
    }

    // 2. Fetch Filtered Agents
    const agents = getAgentsForSuburb(suburbSlug);

    return (
        <main className="min-h-screen bg-stone-50">
            {/* Suburb Header */}
            <section className="relative min-h-[500px] flex items-end pb-12 px-6">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/sandton-luxury-hero.png"
                        alt="Luxury Sandton Real Estate"
                        fill
                        className="object-cover"
                        priority
                        quality={85}
                    />
                    <div className="absolute inset-0 bg-stone-900/80" /> {/* Dark Overlay */}
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto">
                    <Link href="/property-agents/sandton" className="text-amber-500 hover:text-amber-400 text-sm font-bold tracking-widest uppercase mb-4 inline-block">
                        ← Back to Sandton 20
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-white">
                                The Sandton 20: <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                                    {suburb.name} Edition
                                </span>
                            </h1>
                            <div className="flex items-center gap-2 text-stone-300">
                                <MapPin className="h-4 w-4" />
                                <span>Sandton, Johannesburg</span>
                            </div>
                        </div>

                        {/* Suburb Quick Stats (The Value Add) */}
                        <div className="flex gap-4">
                            <div className="bg-stone-900/50 backdrop-blur-sm p-4 rounded-xl border border-stone-700 min-w-[140px]">
                                <div className="flex items-center gap-2 text-stone-400 mb-1">
                                    <TrendingUp className="h-4 w-4" />
                                    <span className="text-xs uppercase">Avg Price</span>
                                </div>
                                <div className="text-xl font-bold text-white">{sellerData.pricing.freehold.avgPrice}</div>
                            </div>
                            <div className="bg-stone-900/50 backdrop-blur-sm p-4 rounded-xl border border-stone-700 min-w-[140px]">
                                <div className="flex items-center gap-2 text-stone-400 mb-1">
                                    <Users className="h-4 w-4" />
                                    <span className="text-xs uppercase">Competition</span>
                                </div>
                                {/* Hardcoded 'High'/dynamic logic could go here, simplifying for now */}
                                <div className="text-xl font-bold text-white">High Request</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Context */}
            <section className="bg-white border-b border-stone-200 py-8 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-amber-50 rounded-lg shrink-0">
                            <TrendingUp className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-stone-900 text-lg">Why selling in {suburb.name} is different</h3>
                            <p className="text-stone-600 leading-relaxed max-w-3xl mt-1">
                                {/* Using the narrative summary if available, else a generic fallback */}
                                {sellerData.narrativeSummary ||
                                    `${suburb.name} is a high-demand market. Standard listing strategies often fail here because buyers crave detailed lifestyle data. You need an agent who understands the specific nuances of this neighborhood.`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Agent Grid */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold font-serif text-stone-900">
                            {agents.length} Verified Specialists
                        </h2>
                        <p className="text-stone-500 text-sm">
                            Agents with a proven track record or specific focus in {suburb.name}.
                        </p>
                    </div>

                    {agents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {agents.map((agent) => (
                                <AgentCard
                                    key={agent.id}
                                    agent={agent}
                                    suburbName={suburb.name}
                                    suburbSlug={suburbSlug}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center bg-stone-100 rounded-2xl border-2 border-dashed border-stone-300">
                            <p className="text-stone-500 font-medium">
                                No "Rising Star" agents verified for {suburb.name} yet.
                            </p>
                            <Link href="/property-agents/sandton" className="text-amber-600 font-bold hover:underline mt-2 inline-block">
                                View Top Sandton Generalists
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
