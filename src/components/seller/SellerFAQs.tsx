'use client';

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQ {
    question: string;
    answer: string;
}

interface SellerFAQsProps {
    suburbName: string;
    avgPrice: string;
    daysOnMarket: number;
    marketTemperature?: 'Sellers' | 'Buyers' | 'Balanced';
}

export function SellerFAQs({ suburbName, avgPrice, daysOnMarket, marketTemperature = 'Balanced' }: SellerFAQsProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Dynamic Answer Logic
    const getTimeToSellAnswer = () => {
        if (daysOnMarket < 80) {
            return `Currently, ${suburbName} is outperforming the greater Sandton average. Homes here are selling rapidly, averaging just ${daysOnMarket} days on the market. This indicates strong buyer demand, so you can expect a quick process if priced correctly.`;
        } else if (daysOnMarket > 150) {
            return `The ${suburbName} market favors patience right now, with an average selling time of ${daysOnMarket} days. This suggests buyers are taking their time to compare options. Strategic pricing and immaculate presentation are critical to beating this average.`;
        }
        return `Based on recent data, homes in ${suburbName} take an average of ${daysOnMarket} days to sell. This is consistent with a balanced market where well-presented homes move steadily, but overpriced listings may sit for longer.`;
    };

    const getPriceAnswer = () => {
        return `As of the latest data, the average freehold property price in ${suburbName} sits at ${avgPrice}. However, this varies by street and finish. We're seeing specific micro-pockets achieving premiums above this average, particularly for renovated homes with security upgrades.`;
    };

    const getTimingAnswer = () => {
        if (marketTemperature === 'Sellers') {
            return `Yes. The data indicates a Seller's Market in ${suburbName}, meaning demand currently exceeds supply. This is an optimal window to list, as you're more likely to receive competitive offers and sell faster than the yearly average.`;
        } else if (marketTemperature === 'Buyers') {
            return `It depends on your goals. We are currently in a Buyer's Market, meaning there is ample stock in ${suburbName}. To sell now, you need to stand out: ensure your home is priced sharply against the competition and styled to sell.`;
        }
        return `${suburbName} is showing consistent demand. It's a balanced market, meaning fair value transactions are happening regularly. If you are ready to move, the market conditions are stable enough to support a sale without needing to "time" a peak.`;
    };

    const faqs: FAQ[] = [
        {
            question: `How long does it take to sell a house in ${suburbName}?`,
            answer: getTimeToSellAnswer()
        },
        {
            question: `What is the average house price in ${suburbName}?`,
            answer: getPriceAnswer()
        },
        {
            question: `Should I sell my ${suburbName} property now?`,
            answer: getTimingAnswer()
        },
        {
            question: `What are the biggest mistakes sellers make in ${suburbName}?`,
            answer: `The three most common mistakes are: 1) Overpricing based on personal attachment rather than the current ${avgPrice} benchmark, 2) Neglecting curb appeal, which is critical in this specific suburb's competitive landscape, and 3) Choosing an agent who doesn't understand the specific ${suburbName} buyer profile.`
        },
        {
            question: `How do I choose the best estate agent in ${suburbName}?`,
            answer: `Look for agents with a proven track record of recent sales in ${suburbName}, not just listings. Because ${suburbName} has unique buyer demographics, you need an agent who actively markets to that specific audience rather than using a "spray and pray" approach.`
        }
    ];

    return (
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
                Frequently Asked Questions About Selling in {suburbName}
            </h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-stone-200 rounded-xl overflow-hidden hover:border-amber-200 transition-colors"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
                        >
                            <span className="font-semibold text-stone-900 pr-4">{faq.question}</span>
                            <ChevronDown
                                className={`h-5 w-5 text-stone-400 shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className="px-4 pb-4 text-stone-600 leading-relaxed">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
