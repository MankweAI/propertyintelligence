import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyAdminSession, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';
import { getAllAgents, getAllSuburbs } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Phone, Mail, MapPin, Shield, CheckCircle, XCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminAgentsPage() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!verifyAdminSession(sessionToken)) {
        redirect('/admin');
    }

    const agents = getAllAgents();
    const suburbs = await getAllSuburbs();

    const getSuburbName = (slug: string) => {
        return suburbs.find(s => s.slug === slug)?.name || slug;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Admin
                    </Link>
                    <h1 className="text-3xl font-bold">Agents</h1>
                    <p className="text-slate-600">{agents.length} registered agents</p>
                </div>
                <Link href="/admin/leads">
                    <Button variant="outline">View Leads</Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {agents.map((agent) => (
                    <Card key={agent.agentId} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        {agent.name}
                                        {agent.verification.ffcStatus === 'verified' ? (
                                            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                                <CheckCircle className="h-3 w-3" />
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                                                <XCircle className="h-3 w-3" />
                                                Unverified
                                            </span>
                                        )}
                                    </CardTitle>
                                    <p className="text-slate-600 text-sm mt-1">{agent.agency}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Phone className="h-4 w-4" />
                                    <a href={`tel:${agent.phone}`} className="hover:text-teal-600">
                                        {agent.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Mail className="h-4 w-4" />
                                    <a href={`mailto:${agent.email}`} className="hover:text-teal-600">
                                        {agent.email}
                                    </a>
                                </div>

                                <div className="pt-3 border-t">
                                    <div className="flex items-start gap-2 text-slate-600">
                                        <MapPin className="h-4 w-4 mt-0.5" />
                                        <div className="flex flex-wrap gap-1">
                                            {agent.suburbsServed.map(slug => (
                                                <span
                                                    key={slug}
                                                    className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full"
                                                >
                                                    {getSuburbName(slug)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {agent.verification.ffcStatus === 'verified' && (
                                    <div className="pt-3 border-t">
                                        <div className="flex items-start gap-2 text-slate-600">
                                            <Shield className="h-4 w-4 mt-0.5" />
                                            <div>
                                                <p className="text-xs">
                                                    FFC: {agent.verification.ffcNumber}
                                                </p>
                                                {agent.verification.ffcExpiry && (
                                                    <p className="text-xs text-slate-500">
                                                        Expires: {agent.verification.ffcExpiry}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
