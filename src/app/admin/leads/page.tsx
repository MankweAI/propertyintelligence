import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyAdminSession, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';
import { getLeadRepository } from '@/lib/leadRepository';
import { getAgentById, getAllSuburbs } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, DollarSign, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!verifyAdminSession(sessionToken)) {
        redirect('/admin');
    }

    const repository = getLeadRepository();
    const leads = await repository.listLeads();
    const suburbs = await getAllSuburbs();

    const getSuburbName = (slug: string) => {
        return suburbs.find(s => s.slug === slug)?.name || slug;
    };

    const getAgentName = (agentId?: string) => {
        if (!agentId) return 'Unassigned';
        const agent = getAgentById(agentId);
        return agent ? `${agent.name} (${agent.agency})` : agentId;
    };

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-700';
            case 'contacted': return 'bg-amber-100 text-amber-700';
            case 'closed': return 'bg-green-100 text-green-700';
            default: return 'bg-slate-100 text-slate-700';
        }
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
                    <h1 className="text-3xl font-bold">Leads</h1>
                    <p className="text-slate-600">{leads.length} total leads</p>
                </div>
                <Link href="/admin/agents">
                    <Button variant="outline">View Agents</Button>
                </Link>
            </div>

            {leads.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-slate-500">No leads yet. They will appear here when submitted.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {leads.map((lead) => (
                        <Card key={lead.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h2 className="text-xl font-semibold">{lead.name}</h2>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Phone className="h-4 w-4" />
                                                <a href={`tel:${lead.phone}`} className="hover:text-teal-600">
                                                    {lead.phone}
                                                </a>
                                            </div>
                                            {lead.email && (
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Mail className="h-4 w-4" />
                                                    <a href={`mailto:${lead.email}`} className="hover:text-teal-600">
                                                        {lead.email}
                                                    </a>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <DollarSign className="h-4 w-4" />
                                                {lead.budgetRange}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Clock className="h-4 w-4" />
                                                {lead.timeline} months
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                                            <MapPin className="h-4 w-4" />
                                            <span>
                                                {lead.preferredSuburbs.map(s => getSuburbName(s)).join(', ')}
                                            </span>
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">
                                                {lead.buyerType}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">
                                                Pre-approved: {lead.preApproved}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right text-sm">
                                        <div className="flex items-center gap-2 text-slate-600 mb-2">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(lead.createdAt)}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <User className="h-4 w-4" />
                                            <span className={lead.assignedAgentId ? 'text-teal-600' : 'text-slate-400'}>
                                                {getAgentName(lead.assignedAgentId)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t text-xs text-slate-500">
                                    <span>Source: {lead.sourceUrl}</span>
                                    <span className="mx-2">•</span>
                                    <span>Consent: {lead.consentTextVersion}</span>
                                    <span className="mx-2">•</span>
                                    <span>ID: {lead.id}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
