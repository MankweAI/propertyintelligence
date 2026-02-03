import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { recommendedAgents } from '@/lib/agents';
import { CheckCircle, MapPin, Star, TrendingUp, Trophy, Phone, Mail, ExternalLink, Quote } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ValuationModal } from '@/components/seller/ValuationModal';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        agentSlug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { agentSlug } = await params;
    const agent = recommendedAgents.find(a => a.slug === agentSlug);

    if (!agent) return { title: 'Agent Not Found' };

    return {
        title: `${agent.name} - Sandton Real Estate Agent Review & Stats`,
        description: `Is ${agent.name} the right agent for you? View verified performance stats, sales speed, and specific suburb focus. Book a direct valuation.`,
    };
}

export default async function AgentProfilePage({ params }: PageProps) {
    const { agentSlug } = await params;
    const agent = recommendedAgents.find(a => a.slug === agentSlug);

    if (!agent) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-stone-50">
            {/* Hero Profile */}
            <section className="bg-white border-b border-stone-200 pt-24 pb-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <Link href="/property-agents/sandton" className="text-stone-400 hover:text-stone-600 text-sm font-bold tracking-widest uppercase mb-8 inline-block">
                        ← Back to Directory
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Image */}
                        <div className="w-32 h-32 md:w-48 md:h-48 relative rounded-full overflow-hidden border-4 border-stone-100 shadow-xl shrink-0">
                            <Image
                                src={agent.image}
                                alt={agent.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Header Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider rounded">
                                        {agent.agency}
                                    </span>
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" /> Sandton 20 Verified
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                                    {agent.name}
                                </h1>
                            </div>

                            {/* The "Hunger Signal" Hook - Unique Content */}
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl max-w-2xl">
                                <div className="flex gap-3">
                                    <Quote className="h-6 w-6 text-amber-400 shrink-0" />
                                    <div>
                                        <p className="text-amber-900 italic font-medium">
                                            "{agent.hungerSignal || 'A highly proactive agent focused on digital reach and speed.'}"
                                        </p>
                                        <p className="text-amber-700/60 text-xs font-bold uppercase mt-2">
                                            — Our Audit Verdict
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Primary CTA */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <ValuationModal suburbName="Sandton" agentName={agent.name}>
                                    <Button className="h-12 px-8 bg-stone-900 text-white font-bold hover:bg-stone-800 shadow-lg shadow-stone-200">
                                        Book Valuation with {agent.name.split(' ')[0]}
                                    </Button>
                                </ValuationModal>

                                {agent.social?.profileLink && (
                                    <a
                                        href={agent.social.profileLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-12 px-6 flex items-center gap-2 border border-stone-200 rounded-lg text-stone-600 font-bold hover:bg-stone-50 transition-colors"
                                    >
                                        View Portfolio <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Performance Grid - The "Audit" */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-xl font-bold font-serif text-stone-900 mb-6">Performance Audit</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <div className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">Recent Sales</div>
                            <div className="text-3xl font-black text-stone-900">{agent.stats.recentSales}</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <div className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">Experience</div>
                            <div className="text-3xl font-black text-stone-900">{agent.stats.yearsExperience}<span className="text-lg text-stone-400 font-medium">y</span></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <div className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">Avg Price</div>
                            <div className="text-2xl font-black text-stone-900">{agent.stats.avgPrice}</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <div className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">Speed Rating</div>
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < agent.rating ? 'fill-current' : 'text-stone-200'}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Area Focus */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-2xl border border-stone-200">
                                <h3 className="flex items-center gap-2 font-bold text-stone-900 mb-6">
                                    <MapPin className="h-5 w-5 text-stone-400" />
                                    Active Areas
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {agent.areas.map(area => (
                                        <Link
                                            key={area}
                                            href={`/property-agents/sandton/${area.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium rounded-full transition-colors"
                                        >
                                            {area}
                                        </Link>
                                    ))}
                                </div>
                                <p className="text-sm text-stone-500 mt-6">
                                    * Areas where {agent.name.split(' ')[0]} has active listings or recent sales data.
                                </p>
                            </div>

                            <div className="bg-stone-900 text-white p-8 rounded-2xl overflow-hidden relative">
                                <div className="relative z-10">
                                    <h3 className="font-serif text-2xl font-bold mb-4">Why we recommend {agent.name.split(' ')[0]}</h3>
                                    <ul className="space-y-3">
                                        {agent.whyRecommended.map((reason, i) => (
                                            <li key={i} className="flex gap-3 text-stone-300">
                                                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                                                <span>{reason}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Contact */}
                        <div>
                            <div className="bg-white p-6 rounded-2xl border border-stone-200 sticky top-24">
                                <h3 className="font-bold text-stone-900 mb-4">Contact {agent.name.split(' ')[0]}</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-center">
                                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Phone className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <p className="text-sm text-stone-600 mb-4">
                                            For security and quality assurance, {agent.name.split(' ')[0]} uses our verified communication channel.
                                        </p>
                                        <ValuationModal suburbName="Sandton" agentName={agent.name}>
                                            <Button className="w-full bg-stone-900 text-white font-bold hover:bg-stone-800 shadow-md">
                                                Request Call Back
                                            </Button>
                                        </ValuationModal>
                                    </div>
                                </div>

                                <div className="h-px bg-stone-100 my-6" />

                                <div className="text-center">
                                    <p className="text-xs text-stone-400 uppercase tracking-widest font-bold mb-2">Agency</p>
                                    <p className="font-serif font-bold text-lg text-stone-900">{agent.agency}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
