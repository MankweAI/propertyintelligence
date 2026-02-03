import Link from 'next/link';
import { getAllSuburbs } from '@/lib/data';

export async function Footer() {
    const suburbs = await getAllSuburbs();

    return (
        <footer className="bg-stone-900 text-stone-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-bold text-white text-lg mb-4">PropertyIntelligence</h3>
                        <p className="text-sm leading-relaxed mb-4">
                            Data-driven property insights for Sandton sellers. We match discerning sellers to vetted estate agents for maximum value.
                        </p>
                        <p className="text-xs text-stone-500">
                            © {new Date().getFullYear()} PropertyIntelligence. All rights reserved.
                        </p>
                    </div>

                    {/* Sandton Suburbs */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Sell in Sandton</h4>
                        <ul className="space-y-2 text-sm">
                            {suburbs.slice(0, 8).map(suburb => (
                                <li key={suburb.slug}>
                                    <Link
                                        href={`/property-valuation/sandton/${suburb.slug}`}
                                        className="hover:text-amber-400 transition-colors"
                                    >
                                        {suburb.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/property-valuation/sandton"
                                    className="text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    View all suburbs →
                                </Link>
                            </li>
                        </ul>
                    </div>



                    {/* Seller Resources */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Seller Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/property-valuation/sandton"
                                    className="hover:text-amber-400 transition-colors"
                                >
                                    Sandton Seller Hub
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/property-valuation/sandton/hurlingham"
                                    className="hover:text-amber-400 transition-colors"
                                >
                                    Example: Hurlingham
                                </Link>
                            </li>
                            <li>
                                <span className="text-stone-500 cursor-not-allowed">
                                    Cape Town (Coming Q2 2026)
                                </span>
                            </li>
                            <li>
                                <span className="text-stone-500 cursor-not-allowed">
                                    Johannesburg (Coming Q3 2026)
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
                    <p>
                        Research and data validation by <a href="https://www.bigdataquery.co.za" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400">BigDataQuery</a>. Prices are indicative only.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-stone-300 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-stone-300 transition-colors">
                            Terms of Use
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
