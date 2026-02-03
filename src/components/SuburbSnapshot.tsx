import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPriceBand, type Suburb } from '@/lib/data';
import {
    Home,
    MapPin,
    Tag,
    Train,
    GraduationCap,
    Shield,
    Footprints,
    TrendingUp,
    Car,
    Briefcase
} from 'lucide-react';

interface SuburbSnapshotProps {
    suburb: Suburb;
}

export function SuburbSnapshot({ suburb }: SuburbSnapshotProps) {
    const { dataPoints } = suburb;

    // Helper to determine price rating roughly
    const avgPrice = (dataPoints.priceBand.min + dataPoints.priceBand.max) / 2;
    const priceRating = avgPrice > 5000000 ? 'Premium' : avgPrice > 3000000 ? 'Mid-High' : 'Value';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Investment Profile */}
            <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                            <CardTitle className="text-lg">Investment Profile</CardTitle>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                            {priceRating} Market
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <p className="text-3xl font-bold text-slate-900">{formatPriceBand(dataPoints.priceBand)}</p>
                            <p className="text-sm text-slate-500">Typical property price range</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-sm mb-1 text-slate-700 flex items-center gap-2">
                                <Briefcase className="h-3 w-3" /> Our Take
                            </h4>
                            <p className="text-sm text-slate-600 italic">
                                "{dataPoints.investmentPotential}"
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {dataPoints.propertyTypes.map((type) => (
                                <Badge key={type} variant="outline" className="capitalize">
                                    {type}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Lifestyle & Vibe */}
            <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-purple-600" />
                            <CardTitle className="text-lg">Lifestyle & Vibe</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {dataPoints.lifestyleTags.map((tag) => (
                                <Badge key={tag} className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-none capitalize">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-3 rounded-lg">
                                <h4 className="font-semibold text-sm mb-1 text-slate-700 flex items-center gap-2">
                                    <Footprints className="h-3 w-3" /> Walkability
                                </h4>
                                <p className="text-sm text-slate-600">
                                    {dataPoints.walkability}
                                </p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg">
                                <h4 className="font-semibold text-sm mb-1 text-slate-700 flex items-center gap-2">
                                    <Shield className="h-3 w-3" /> Security
                                </h4>
                                <p className="text-sm text-slate-600">
                                    {dataPoints.safetyNote}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Family & Education */}
            <Card className="border-l-4 border-l-cyan-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-cyan-600" />
                            <CardTitle className="text-lg">Family & Schools</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {dataPoints.schoolsNote}
                        </p>
                        <div className="bg-cyan-50/50 p-3 rounded-lg border border-cyan-100">
                            <p className="text-xs text-cyan-800 font-medium uppercase tracking-wide mb-2">Key Highlights</p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-start gap-2">
                                    <Home className="h-4 w-4 text-cyan-500 mt-0.5" />
                                    <span>Great for {dataPoints.lifestyleTags.includes('family') ? 'growing families' : 'professionals'}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Shield className="h-4 w-4 text-cyan-500 mt-0.5" />
                                    <span>Secure environment</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Commute */}
            <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Car className="h-5 w-5 text-orange-600" />
                            <CardTitle className="text-lg">Commute</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <ul className="space-y-3">
                            {dataPoints.commuteAnchors.map((anchor, idx) => (
                                <li key={idx} className="flex items-center justify-between text-sm p-2 rounded hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-100">
                                    <span className="text-slate-700">{anchor.split('(')[0].trim()}</span>
                                    <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-xs">
                                        {anchor.match(/\((.*?)\)/)?.[1] || 'Unknown'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Compact version for comparison tables (Unchanged)
export function SuburbSnapshotCompact({ suburb }: SuburbSnapshotProps) {
    const { dataPoints } = suburb;

    return (
        <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
                <span className="text-slate-500">Price:</span>{' '}
                <span className="font-medium">{formatPriceBand(dataPoints.priceBand)}</span>
            </div>
            <div>
                <span className="text-slate-500">Types:</span>{' '}
                <span className="font-medium">
                    {dataPoints.propertyTypes.slice(0, 2).join(', ')}
                </span>
            </div>
            <div className="col-span-2">
                <span className="text-slate-500">Best for:</span>{' '}
                <span className="font-medium">
                    {dataPoints.lifestyleTags.slice(0, 3).join(', ')}
                </span>
            </div>
        </div>
    );
}
