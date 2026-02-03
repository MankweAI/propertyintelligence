"use client";

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { ArrowRight, CheckCircle2, MapPin, TrendingUp, Users, Clock, Sparkles, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/Animations';


const suburbSlugs = [
    'hurlingham', 'bryanston', 'sandown', 'sandton-cbd', 'hyde-park', 'morningside',
    'rivonia', 'sandhurst', 'atholl', 'benmore', 'dunkeld', 'strathavon'
];

const faqs = [
    {
        question: "How do I know what my Sandton property is worth?",
        answer: "Your property's value depends on several hyper-local factors: recent comparable sales on your street, current buyer demand for your property type, and unique features like security, solar power, or school proximity. A professional valuation combines data analysis with local expertise to give you an accurate price band."
    },
    {
        question: "Is this valuation really free?",
        answer: "Yes, completely free with no obligation. We connect you with top-rated local agents who provide complimentary valuations as part of their service. There are no hidden fees or commitments—you're in control."
    },
    {
        question: "How long does the valuation process take?",
        answer: "After submitting your details, you'll typically hear from a vetted local agent within 24 hours. The valuation itself can often be done virtually using recent sales data, or via a brief in-person visit if preferred."
    },
    {
        question: "Why do you only recommend 3 agents?",
        answer: "Quality over quantity. We analyze actual sales data to find agents with proven track records in your specific suburb. Three agents creates healthy competition for your listing without overwhelming you with options."
    },
    {
        question: "What information do I need to provide?",
        answer: "Just your street name, property type (house, cluster, apartment), and contact details. We don't need your exact address publicly—your privacy is protected."
    }
];

export default function ValuationPage() {
    const [selectedSuburb, setSelectedSuburb] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebPage",
                                "name": "Free Property Valuation Sandton",
                                "description": "Get a free, data-backed property valuation for your Sandton home.",
                                "url": "https://propertyintelligence.co.za/valuation"
                            },
                            {
                                "@type": "RealEstateAgent",
                                "name": "PropertyIntelligence - Property Valuation",
                                "areaServed": {
                                    "@type": "City",
                                    "name": "Sandton",
                                    "containedIn": "Johannesburg, South Africa"
                                },
                                "offers": {
                                    "@type": "Offer",
                                    "description": "Free property valuation and seller consultation",
                                    "price": "0",
                                    "priceCurrency": "ZAR"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": faqs.map(faq => ({
                                    "@type": "Question",
                                    "name": faq.question,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": faq.answer
                                    }
                                }))
                            }
                        ]
                    })
                }}
            />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.2),transparent_50%)]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
                    <FadeIn>
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="inline-block py-1.5 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-bold text-emerald-400 mb-6">
                                🏠 Free Property Valuation
                            </span>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                                What's Your Sandton
                                <span className="block text-emerald-400 mt-2">Home Worth?</span>
                            </h1>
                            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                Get a free, data-backed valuation in 24 hours. See what buyers are paying in your suburb
                                and connect with the top 3 vetted agents.
                            </p>

                            {/* Trust Stats */}
                            <div className="flex flex-wrap justify-center gap-6 mb-8">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                                    <MapPin className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm font-medium">12 Sandton Suburbs</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                                    <Users className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm font-medium">3 Vetted Agents Max</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                                    <Clock className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm font-medium">Response in 24h</span>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="bg-emerald-500 hover:bg-emerald-400 text-white border-none shadow-xl shadow-emerald-500/20"
                                onClick={() => document.getElementById('valuation-form')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Get My Free Valuation
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </FadeIn>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Value Proposition Cards */}
                <FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-8">
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 text-center hover:shadow-lg transition-shadow">
                            <div className="flex justify-center mb-3">
                                <div className="bg-emerald-50 p-3 rounded-xl">
                                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 mb-1">Street-Level Data</div>
                            <div className="text-sm text-slate-600">Pricing based on actual sales in your area</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 text-center hover:shadow-lg transition-shadow">
                            <div className="flex justify-center mb-3">
                                <div className="bg-indigo-50 p-3 rounded-xl">
                                    <Users className="h-6 w-6 text-indigo-600" />
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 mb-1">Top 3 Agents</div>
                            <div className="text-sm text-slate-600">Vetted specialists in your suburb</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 text-center hover:shadow-lg transition-shadow">
                            <div className="flex justify-center mb-3">
                                <div className="bg-amber-50 p-3 rounded-xl">
                                    <Clock className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 mb-1">24h Response</div>
                            <div className="text-sm text-slate-600">Quick turnaround, no waiting</div>
                        </div>
                    </div>
                </FadeIn>

                {/* Suburb Selector + Form Section */}
                <section id="valuation-form" className="scroll-mt-24 mb-16">
                    <FadeIn>
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Left: Suburb Selector */}
                                <div className="p-8 md:p-12 bg-slate-50 border-r border-slate-100">
                                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">
                                        Select Your Suburb
                                    </h2>
                                    <p className="text-slate-600 mb-6">
                                        Choose your suburb to get suburb-specific market insights with your valuation.
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {suburbSlugs.map((slug) => (
                                            <button
                                                key={slug}
                                                onClick={() => setSelectedSuburb(slug)}
                                                className={`p-3 rounded-xl text-left transition-all border-2 ${selectedSuburb === slug
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                    : 'border-slate-200 bg-white hover:border-emerald-300 text-slate-700'
                                                    }`}
                                            >
                                                <span className="font-medium capitalize text-sm">
                                                    {slug.replace(/-/g, ' ')}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    {selectedSuburb && (
                                        <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                            <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium">
                                                <CheckCircle2 className="h-4 w-4" />
                                                <span className="capitalize">{selectedSuburb.replace(/-/g, ' ')} selected</span>
                                            </div>
                                            <Link
                                                href={`/property-valuation/sandton/${selectedSuburb}`}
                                                className="text-xs text-emerald-600 hover:underline mt-1 inline-block"
                                            >
                                                View {selectedSuburb.replace(/-/g, ' ')} Market Intel →
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Form */}
                                <div className="p-8 md:p-12">
                                    {isSuccess ? (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Sparkles className="h-8 w-8 text-emerald-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-emerald-900 mb-2">Valuation Request Received!</h3>
                                            <p className="text-slate-600 mb-6 text-sm">
                                                A {selectedSuburb ? selectedSuburb.replace(/-/g, ' ') : 'Sandton'} specialist will WhatsApp you within 24 hours with your personalized market insights.
                                            </p>
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsSuccess(false)}
                                            >
                                                Submit Another Request
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                                    <Sparkles className="h-5 w-5" />
                                                </div>
                                                <h2 className="text-xl font-serif font-bold text-slate-900">
                                                    Get Your Free Valuation
                                                </h2>
                                            </div>

                                            {/* What You Get */}
                                            <div className="bg-slate-50 p-4 rounded-xl mb-6 space-y-2 border border-slate-100">
                                                <div className="flex items-start gap-2 text-sm text-slate-700">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                                    <span>Street-level valuation band</span>
                                                </div>
                                                <div className="flex items-start gap-2 text-sm text-slate-700">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                                    <span>Days-on-market for your suburb</span>
                                                </div>
                                                <div className="flex items-start gap-2 text-sm text-slate-700">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                                    <span>Top 3 agent recommendations</span>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label className="text-slate-700">Street Name</Label>
                                                    <Input placeholder="e.g. Woodlands Avenue" required />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="text-slate-700">Property Type</Label>
                                                    <Select required>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="house">Freehold House</SelectItem>
                                                            <SelectItem value="cluster">Cluster Home</SelectItem>
                                                            <SelectItem value="apartment">Apartment</SelectItem>
                                                            <SelectItem value="townhouse">Townhouse</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-slate-700">Your Name</Label>
                                                        <Input placeholder="Full name" required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-slate-700">WhatsApp</Label>
                                                        <Input placeholder="082..." required />
                                                    </div>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base font-bold"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Get My Free Valuation
                                                            <ArrowRight className="ml-2 h-4 w-4" />
                                                        </>
                                                    )}
                                                </Button>

                                                <p className="text-[10px] text-center text-slate-400 mt-3 font-medium uppercase tracking-wider flex items-center justify-center gap-1">
                                                    <Lock className="h-3 w-3" />
                                                    Private & Confidential
                                                </p>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* FAQ Section */}
                <section className="mb-16">
                    <FadeIn>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                                Frequently Asked Questions
                            </h2>

                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-200 transition-colors"
                                    >
                                        <button
                                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                                        >
                                            <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                                            <ArrowRight
                                                className={`h-5 w-5 text-slate-400 shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-90' : ''
                                                    }`}
                                            />
                                        </button>
                                        {openFaqIndex === index && (
                                            <div className="px-4 pb-4 text-slate-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* Suburb Links for SEO */}
                <section>
                    <FadeIn>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                                Explore Sandton Suburbs
                            </h2>
                            <p className="text-slate-600">
                                Get suburb-specific selling strategies and market data.
                            </p>
                        </div>
                        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {suburbSlugs.map((slug) => (
                                <StaggerItem key={slug}>
                                    <Link
                                        href={`/property-valuation/sandton/${slug}`}
                                        className="block p-4 bg-white border border-slate-200 rounded-xl text-center hover:border-emerald-500 hover:shadow-md transition-all"
                                    >
                                        <span className="font-medium text-slate-700 capitalize text-sm">
                                            {slug.replace(/-/g, ' ')}
                                        </span>
                                    </Link>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
}
