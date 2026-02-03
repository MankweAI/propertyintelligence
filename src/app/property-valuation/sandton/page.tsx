import Link from 'next/link';
import Image from 'next/image';
import { getSuburbSlugs } from '@/lib/data';
import { FadeIn } from '@/components/Animations';
import { SuburbFilterGrid } from '@/components/seller/SuburbFilterGrid';
import { HeroValuationCTA } from '@/components/seller/HeroValuationCTA';
import { ValuationModal } from '@/components/seller/ValuationModal';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, BarChart3, Sparkles, Search, Target, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'Property Valuation Reports for Sandton | PropertyIntelligence',
    description: 'Free, data-driven property valuation reports for Sandton homeowners. Get accurate market insights based on 15,000+ recent sales. No obligation, no agents.',
};

export default async function ValuationHub() {
    const suburbSlugs = await getSuburbSlugs();

    return (
        <div className="bg-white min-h-screen ">
            {/* 1. HERO - Background Image with Overlay */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-images/seller_hero.png"
                        alt="Property valuation analysis"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-stone-900/80" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 py-2 px-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-full mb-8">
                                <Sparkles className="h-4 w-4 text-amber-400" />
                                <span className="text-sm font-semibold text-amber-100">PropertyIntelligence</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                                Know Your Home's{' '}
                                <span className="text-amber-400">True Value</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-stone-200 mb-12 leading-relaxed max-w-2xl mx-auto">
                                Connect with the top-rated valuation experts in your specific suburb.
                                Get an accurate, market-aligned valuation from a real professional.
                            </p>

                            {/* CTA */}
                            <div className="mb-16">
                                <HeroValuationCTA suburbName="Sandton" />
                            </div>

                            {/* Trust Stats */}
                            <div className="grid grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-12 max-w-3xl mx-auto">
                                <div>
                                    <div className="text-4xl font-bold text-white mb-2">34</div>
                                    <div className="text-sm font-medium text-stone-300 uppercase tracking-wider">Suburbs</div>
                                </div>
                                <div className="border-l border-white/10 pl-8 md:pl-16">
                                    <div className="text-4xl font-bold text-white mb-2">15k<span className="text-amber-400">+</span></div>
                                    <div className="text-sm font-medium text-stone-300 uppercase tracking-wider">Data Points</div>
                                </div>
                                <div className="border-l border-white/10 pl-8 md:pl-16">
                                    <div className="text-4xl font-bold text-white mb-2">95<span className="text-amber-400">%</span></div>
                                    <div className="text-sm font-medium text-stone-300 uppercase tracking-wider">Accuracy</div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2. VALUE PROPS - Card Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                                Why Smart Homeowners Start Here
                            </h2>
                            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                                Before any property decision, you need facts—not guesswork.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FadeIn>
                            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                                    <BarChart3 className="h-7 w-7 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-bold text-stone-900 mb-3">Real Comparable Sales</h3>
                                <p className="text-stone-600 leading-relaxed">
                                    We don't just rely on automated data. Our selected experts analyse recent deeds office transfers to give you an accurate market value.
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6">
                                    <MapPin className="h-7 w-7 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-stone-900 mb-3">Hyper-Local Precision</h3>
                                <p className="text-stone-600 leading-relaxed">
                                    Every suburb has its own micro-market. We match you with agents who specialise in your specific area for precision accuracy.
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-6">
                                    <ShieldCheck className="h-7 w-7 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-stone-900 mb-3">Vetted Experts</h3>
                                <p className="text-stone-600 leading-relaxed">
                                    We only partner with established professionals with a proven track record. Get advice you can trust, not just a sales pitch.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 3. SUBURB FINDER - Highlighted Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-900">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left: Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/suburb_aerial.png"
                                    alt="Sandton suburbs aerial view"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Right: Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                                    <Target className="h-4 w-4 text-amber-400" />
                                    <span className="text-sm font-semibold text-amber-400">Suburb Reports</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                                    Select Your Suburb
                                </h2>
                                <p className="text-lg text-stone-300 mb-8 leading-relaxed">
                                    Each report is tailored to your suburb's unique market dynamics, buyer demographics, and recent transactions.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-amber-400" />
                                        <span className="text-stone-200">Recent sale prices in your area</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-amber-400" />
                                        <span className="text-stone-200">Asking vs. sold price gap</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-amber-400" />
                                        <span className="text-stone-200">Current market temperature</span>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 4. SUBURB GRID - Light Background */}
            <section id="suburb-grid" className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 scroll-mt-20">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                                34 Sandton Suburbs
                            </h2>
                            <p className="text-lg text-stone-600 max-w-xl mx-auto">
                                Find your suburb and access your personalized valuation report.
                            </p>
                        </div>
                    </FadeIn>

                    <SuburbFilterGrid suburbs={suburbSlugs} />
                </div>
            </section>

            {/* 5. METHODOLOGY - Clean White */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Content */}
                        <FadeIn>
                            <div>
                                <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-stone-100 rounded-full mb-6">
                                    <Zap className="h-4 w-4 text-amber-600" />
                                    <span className="text-sm font-semibold text-stone-600">Our Methodology</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">
                                    How We Calculate Your Valuation
                                </h2>
                                <p className="text-lg text-stone-600 mb-10 leading-relaxed">
                                    We don't rely on algorithms alone. Our valuations combine real Deeds Office data
                                    with expert human analysis to adjust for your property's unique attributes.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">01</div>
                                        <div>
                                            <h4 className="font-bold text-stone-900 mb-1">Recent Sales Analysis</h4>
                                            <p className="text-stone-600 text-sm">We pull all registered property transfers within 2km of your address</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">02</div>
                                        <div>
                                            <h4 className="font-bold text-stone-900 mb-1">Attribute Matching</h4>
                                            <p className="text-stone-600 text-sm">We adjust for size, property type, condition, and key features</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">03</div>
                                        <div>
                                            <h4 className="font-bold text-stone-900 mb-1">Market Adjustment</h4>
                                            <p className="text-stone-600 text-sm">We factor in current supply/demand and price trends</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Right: Stats */}
                        <FadeIn delay={0.2}>
                            <div className="bg-stone-900 rounded-3xl p-10">
                                <div className="text-center mb-8">
                                    <div className="text-6xl font-bold text-white mb-2">95%</div>
                                    <div className="text-stone-400">Median accuracy within 5% of sale price</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-stone-800 p-5 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-white mb-1">7+</div>
                                        <div className="text-sm text-stone-400">Data Sources</div>
                                    </div>
                                    <div className="bg-stone-800 p-5 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-white mb-1">100%</div>
                                        <div className="text-sm text-stone-400">Expert Review</div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 6. FINAL CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-stone-50">
                <FadeIn>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">
                            Ready to Know Your Property's Worth?
                        </h2>
                        <p className="text-lg text-stone-600 mb-10">
                            Get your free, data-backed valuation report in minutes. No signup required.
                        </p>
                        <ValuationModal suburbName="Sandton">
                            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-10 py-7 text-lg rounded-xl shadow-xl shadow-amber-600/20">
                                Get Your Free Valuation
                                <ArrowRight className="ml-3 h-6 w-6" />
                            </Button>
                        </ValuationModal>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
