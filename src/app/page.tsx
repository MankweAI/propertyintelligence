'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/Animations';
import {
    BarChart3,
    ShieldCheck,
    TrendingUp,
    ArrowRight,
    MapPin,
    Calculator,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ValuationModal } from '@/components/seller/ValuationModal';

export default function AppHome() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-images/app-dashboard-hero.webp"
                        alt="Property valuation dashboard"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-stone-900/80" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 py-2 px-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-full mb-8">
                                <Sparkles className="h-4 w-4 text-emerald-400" />
                                <span className="text-sm font-semibold text-emerald-100">PropertyIntelligence</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                                Know Your Property's{' '}
                                <span className="text-emerald-400">True Value</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-stone-200 mb-12 leading-relaxed max-w-2xl mx-auto">
                                Free, data-driven property valuation reports for Sandton homeowners.
                                Real sales data. Zero guesswork. No agents.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                                <ValuationModal suburbName="Sandton">
                                    <Button className="h-16 px-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02]">
                                        Request Free Valuation

                                    </Button>
                                </ValuationModal>
                                <Link href="/property-valuation/sandton">
                                    <Button variant="outline" className="h-16 px-10 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl text-lg font-medium transition-all">
                                        <MapPin className="mr-2 h-5 w-5" />
                                        Find Your Suburb
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust Stats */}
                            <div className="grid grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-12 max-w-3xl mx-auto">
                                <div>
                                    <div className="text-4xl font-bold text-white mb-2">34</div>
                                    <div className="text-sm font-medium text-stone-300 uppercase tracking-wider">Suburbs</div>
                                </div>
                                <div className="border-l border-white/10 pl-8 md:pl-16">
                                    <div className="text-4xl font-bold text-white mb-2">15k<span className="text-emerald-400">+</span></div>
                                    <div className="text-sm font-medium text-stone-300 uppercase tracking-wider">Sales Analyzed</div>
                                </div>
                                <div className="border-l border-white/10 pl-8 md:pl-16">
                                    <div className="text-4xl font-bold text-white mb-2">95<span className="text-emerald-400">%</span></div>
                                    <div className="text-sm font-medium text-stone-300 uppercase tracking-wider">Accuracy</div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
                <div className="max-w-7xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                                Property Intelligence Tools
                            </h2>
                            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                                Data-driven insights to understand your property's market position.
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Tool 1: Valuation Report */}
                        <StaggerItem>
                            <Link href="/property-valuation/sandton" className="group block h-full">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all h-full flex flex-col">
                                    <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Calculator className="h-7 w-7 text-amber-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-3">Valuation Report</h3>
                                    <p className="text-stone-600 leading-relaxed mb-6 flex-1">
                                        Get a free, data-backed estimate of your property's current market value based on real comparable sales.
                                    </p>
                                    <div className="flex items-center text-amber-600 font-semibold text-sm">
                                        Get Free Report <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </StaggerItem>

                        {/* Tool 2: Market Analysis */}
                        <StaggerItem>
                            <Link href="/property-valuation/sandton" className="group block h-full">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:border-indigo-200 hover:shadow-lg transition-all h-full flex flex-col">
                                    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <BarChart3 className="h-7 w-7 text-indigo-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-3">Market Analysis</h3>
                                    <p className="text-stone-600 leading-relaxed mb-6 flex-1">
                                        See price trends, days on market, and supply/demand dynamics for your specific suburb.
                                    </p>
                                    <div className="flex items-center text-indigo-600 font-semibold text-sm">
                                        View Market Data <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </StaggerItem>

                        {/* Tool 3: Suburb Explorer */}
                        <StaggerItem>
                            <Link href="/property-valuation/sandton" className="group block h-full">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:border-emerald-200 hover:shadow-lg transition-all h-full flex flex-col">
                                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <MapPin className="h-7 w-7 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-3">Suburb Explorer</h3>
                                    <p className="text-stone-600 leading-relaxed mb-6 flex-1">
                                        Browse 34 Sandton suburbs with detailed valuation reports and market insights.
                                    </p>
                                    <div className="flex items-center text-emerald-600 font-semibold text-sm">
                                        Browse Suburbs <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* Data Ticker Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-stone-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <FadeIn>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-4">
                                    Powered by Real Data
                                </h2>
                                <p className="text-stone-600 leading-relaxed mb-6">
                                    Our valuation engine analyzes actual Deeds Office transfers, not algorithm estimates.
                                    Every report is grounded in verified transaction data.
                                </p>
                                <div className="flex gap-6">
                                    <div className="flex items-center gap-2 text-stone-600">
                                        <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                        <span className="text-sm font-medium">Deeds Office Verified</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-stone-600">
                                        <TrendingUp className="h-5 w-5 text-amber-600" />
                                        <span className="text-sm font-medium">Updated Monthly</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                                        Sandton Median
                                    </div>
                                    <div className="text-3xl font-bold text-stone-900 mb-1">R5.1M</div>
                                    <div className="text-sm text-emerald-600 font-semibold flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4" /> +2.4% YoY
                                    </div>
                                </div>

                                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                                        Data Points
                                    </div>
                                    <div className="text-3xl font-bold text-stone-900 mb-1">15,420</div>
                                    <div className="text-sm text-stone-500 font-medium">
                                        Recent Sales
                                    </div>
                                </div>

                                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                                        Accuracy Rate
                                    </div>
                                    <div className="text-3xl font-bold text-stone-900 mb-1">95%</div>
                                    <div className="text-sm text-stone-500 font-medium">
                                        Within 5% of Sale
                                    </div>
                                </div>

                                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                                        Suburbs Covered
                                    </div>
                                    <div className="text-3xl font-bold text-stone-900 mb-1">34</div>
                                    <div className="text-sm text-stone-500 font-medium">
                                        Greater Sandton
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
