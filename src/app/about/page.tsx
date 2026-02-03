import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Database, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'About PropertyIntelligence | Powered by BigDataQuery',
    description: 'PropertyIntelligence is a hyper-local property intelligence platform by BigDataQuery. We provide data-driven insights for Sandton property sellers.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-30" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-block py-1.5 px-4 bg-amber-500/10 border border-amber-500/20 rounded-full text-sm font-bold text-amber-400 mb-6">
                        About Us
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                        Hyper-Local Property Intelligence
                    </h1>
                    <p className="text-xl text-stone-300 max-w-2xl mx-auto">
                        PropertyIntelligence is powered by <a href="https://www.bigdataquery.co.za" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">BigDataQuery</a> —
                        South Africa's data research specialists.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200">
                        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Our Mission</h2>
                        <p className="text-stone-600 leading-relaxed mb-6">
                            We believe every property seller deserves access to the same market intelligence that estate agents have.
                            That's why we created PropertyIntelligence — a free platform that provides suburb-specific data,
                            pricing insights, and demand indicators to help you make informed selling decisions.
                        </p>
                        <p className="text-stone-600 leading-relaxed">
                            Unlike generic property portals, we focus on <strong className="text-stone-900">hyper-local intelligence</strong> —
                            the street-level data that actually matters when pricing your home in competitive markets like Sandton.
                        </p>
                    </div>
                </div>
            </section>

            {/* BigDataQuery Section */}
            <section className="py-16 bg-stone-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold mb-4">Powered by BigDataQuery</h2>
                        <p className="text-stone-400 max-w-2xl mx-auto">
                            BigDataQuery is a South African data research and validation company.
                            We specialize in making complex data accessible and actionable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
                            <Database className="h-8 w-8 text-amber-500 mb-4" />
                            <h3 className="font-bold text-white mb-2">Data Collection</h3>
                            <p className="text-stone-400 text-sm">
                                We aggregate data from official sources including deeds offices, MLS systems, and verified agent reports.
                            </p>
                        </div>
                        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
                            <Shield className="h-8 w-8 text-amber-500 mb-4" />
                            <h3 className="font-bold text-white mb-2">Fact-Checking</h3>
                            <p className="text-stone-400 text-sm">
                                Every data point is validated through our multi-source verification process before publication.
                            </p>
                        </div>
                        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
                            <TrendingUp className="h-8 w-8 text-amber-500 mb-4" />
                            <h3 className="font-bold text-white mb-2">Analysis</h3>
                            <p className="text-stone-400 text-sm">
                                Our analysts interpret raw data into actionable insights tailored for each suburb's unique market.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <a
                            href="https://www.bigdataquery.co.za"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
                        >
                            Visit BigDataQuery.co.za <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Trust Signals */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">
                        Why Trust Our Data
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: 'Verified Sources', desc: 'Data from official property records and licensed agents' },
                            { title: 'Regular Updates', desc: 'Market data refreshed monthly to reflect current conditions' },
                            { title: 'Local Expertise', desc: "Our analysts understand Sandton's unique micro-markets" },
                            { title: 'Transparent Methods', desc: 'We explain exactly how we calculate every metric' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-stone-200">
                                <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-stone-900">{item.title}</h3>
                                    <p className="text-sm text-stone-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-amber-50 border-t border-amber-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">
                        Ready to Sell Smarter?
                    </h2>
                    <p className="text-stone-600 mb-6">
                        Explore our suburb-specific insights and get matched with top-performing agents.
                    </p>
                    <Link href="/property-valuation/sandton">
                        <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 h-auto font-bold">
                            Explore Sandton Suburbs <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
