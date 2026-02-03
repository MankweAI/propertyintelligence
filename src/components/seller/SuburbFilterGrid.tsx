'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/Animations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SuburbFilterGridProps {
    suburbs: string[];
    initialCount?: number;
}

export function SuburbFilterGrid({ suburbs, initialCount = 8 }: SuburbFilterGridProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAll, setShowAll] = useState(false);

    const filteredSuburbs = suburbs.filter(slug =>
        slug.replace(/-/g, ' ').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // When searching, show all results. Otherwise, limit to initialCount
    const isSearching = searchQuery.length > 0;
    const displayedSuburbs = isSearching || showAll
        ? filteredSuburbs
        : filteredSuburbs.slice(0, initialCount);

    const hasMore = !isSearching && filteredSuburbs.length > initialCount;
    const remainingCount = filteredSuburbs.length - initialCount;

    return (
        <div className="space-y-8">
            <FadeIn>
                <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                    <Input
                        type="text"
                        placeholder="Search suburbs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 bg-white border-stone-200 focus:border-amber-500 rounded-xl text-base"
                    />
                </div>
            </FadeIn>

            {filteredSuburbs.length === 0 ? (
                <FadeIn>
                    <div className="text-center py-12 text-stone-500">
                        No suburbs found matching "{searchQuery}"
                    </div>
                </FadeIn>
            ) : (
                <>
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {displayedSuburbs.map((slug) => (
                            <StaggerItem key={slug}>
                                <Link
                                    href={`/property-valuation/sandton/${slug}`}
                                    className="group block bg-white border-2 border-stone-200 p-6 rounded-2xl hover:border-amber-500 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-serif font-bold text-lg text-stone-900 capitalize group-hover:text-amber-600 transition-colors">
                                            {slug.replace(/-/g, ' ')}
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 group-hover:text-amber-600">
                                        View Report
                                    </span>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {/* Show More / Show Less Button */}
                    {hasMore && (
                        <FadeIn>
                            <div className="text-center pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowAll(!showAll)}
                                    className="border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-900 px-6 py-5 rounded-xl"
                                >
                                    {showAll ? (
                                        <>
                                            <ChevronUp className="mr-2 h-4 w-4" />
                                            Show Less
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="mr-2 h-4 w-4" />
                                            Show {remainingCount} More Suburbs
                                        </>
                                    )}
                                </Button>
                            </div>
                        </FadeIn>
                    )}
                </>
            )}
        </div>
    );
}
