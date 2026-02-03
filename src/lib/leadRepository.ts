import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
import type { LeadWithConsent, LeadCreateInput } from './validation';
import { CONSENT_TEXT_VERSION, CONSENT_PURPOSE } from './validation';

// Lead repository interface
export interface LeadRepository {
    createLead(input: LeadCreateInput, assignedAgentId?: string): Promise<LeadWithConsent>;
    getLead(id: string): Promise<LeadWithConsent | null>;
    listLeads(filters?: LeadFilters): Promise<LeadWithConsent[]>;
    updateLeadStatus(id: string, status: 'new' | 'contacted' | 'closed'): Promise<boolean>;
}

export interface LeadFilters {
    suburb?: string;
    agentId?: string;
    status?: 'new' | 'contacted' | 'closed';
    startDate?: string;
    endDate?: string;
}

// Supabase Database Row Type
interface SupabaseLeadRow {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    buyer_type: string;
    budget_range: string;
    preferred_suburbs: any; // JSONB
    timeline: string;
    pre_approved: string;
    consent_given: boolean;
    consent_timestamp: string;
    consent_text_version: string;
    consent_purpose: string;
    source_url: string;
    user_agent: string;
    ip_address: string | null;
    created_at: string;
    status: string;
    assigned_agent_id: string | null;
}

// Supabase Implementation
export class SupabaseLeadRepository implements LeadRepository {

    async createLead(input: LeadCreateInput, assignedAgentId?: string): Promise<LeadWithConsent> {
        const id = uuidv4();
        const now = new Date().toISOString();

        const leadData = {
            id,
            name: input.formData.name,
            phone: input.formData.phone,
            email: input.formData.email || null,
            buyer_type: input.formData.buyerType,
            budget_range: input.formData.budgetRange,
            preferred_suburbs: input.formData.preferredSuburbs,
            timeline: input.formData.timeline,
            pre_approved: input.formData.preApproved,
            consent_given: input.formData.consentGiven,
            consent_timestamp: now,
            consent_text_version: CONSENT_TEXT_VERSION,
            consent_purpose: CONSENT_PURPOSE,
            source_url: input.sourceUrl,
            user_agent: input.userAgent,
            ip_address: input.ipAddress || null,
            created_at: now,
            status: 'new',
            assigned_agent_id: assignedAgentId || null
        };

        const { error } = await supabase
            .from('leads')
            .insert(leadData);

        if (error) {
            console.error('Supabase createLead error:', error);
            throw new Error(`Failed to create lead: ${error.message}`);
        }

        // Return the domain object
        return {
            id,
            ...input.formData,
            consentTimestamp: now,
            consentTextVersion: CONSENT_TEXT_VERSION,
            consentPurpose: CONSENT_PURPOSE,
            sourceUrl: input.sourceUrl,
            userAgent: input.userAgent,
            ipAddress: input.ipAddress,
            createdAt: now,
            status: 'new',
            assignedAgentId,
        };
    }

    async getLead(id: string): Promise<LeadWithConsent | null> {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return null;

        return this.mapRowToLead(data as SupabaseLeadRow);
    }

    async listLeads(filters?: LeadFilters): Promise<LeadWithConsent[]> {
        let query = supabase.from('leads').select('*');

        if (filters?.status) {
            query = query.eq('status', filters.status);
        }

        if (filters?.agentId) {
            query = query.eq('assigned_agent_id', filters.agentId);
        }

        if (filters?.startDate) {
            query = query.gte('created_at', filters.startDate);
        }

        if (filters?.endDate) {
            query = query.lte('created_at', filters.endDate);
        }

        query = query.order('created_at', { ascending: false });

        const { data, error } = await query;

        if (error) {
            console.error('Supabase listLeads error:', error);
            return [];
        }

        return (data || []).map(row => this.mapRowToLead(row as SupabaseLeadRow));
    }

    async updateLeadStatus(id: string, status: 'new' | 'contacted' | 'closed'): Promise<boolean> {
        const { error } = await supabase
            .from('leads')
            .update({ status })
            .eq('id', id);

        return !error;
    }

    private mapRowToLead(row: SupabaseLeadRow): LeadWithConsent {
        return {
            id: row.id,
            name: row.name,
            phone: row.phone,
            email: row.email || undefined,
            buyerType: row.buyer_type as 'first-time' | 'upgrading' | 'investing',
            budgetRange: row.budget_range as '<1.5m' | '1.5-3m' | '3-6m' | '6-10m' | '10m+',
            preferredSuburbs: row.preferred_suburbs as string[],
            timeline: row.timeline as '0-3' | '3-6' | '6-12' | '12+',
            preApproved: row.pre_approved as 'yes' | 'no',
            consentGiven: row.consent_given,
            consentTimestamp: row.consent_timestamp,
            consentTextVersion: row.consent_text_version,
            consentPurpose: row.consent_purpose,
            sourceUrl: row.source_url,
            userAgent: row.user_agent,
            ipAddress: row.ip_address || undefined,
            createdAt: row.created_at,
            status: row.status as 'new' | 'contacted' | 'closed',
            assignedAgentId: row.assigned_agent_id || undefined,
        };
    }
}

// Singleton instance
let repositoryInstance: SupabaseLeadRepository | null = null;

export function getLeadRepository(): LeadRepository {
    if (!repositoryInstance) {
        repositoryInstance = new SupabaseLeadRepository();
    }
    return repositoryInstance;
}
