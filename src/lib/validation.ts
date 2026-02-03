import { z } from 'zod';

// Budget ranges
export const budgetRanges = [
    { value: '<1.5m', label: 'Under R1.5M' },
    { value: '1.5-3m', label: 'R1.5M - R3M' },
    { value: '3-6m', label: 'R3M - R6M' },
    { value: '6-10m', label: 'R6M - R10M' },
    { value: '10m+', label: 'R10M+' },
] as const;

// Buyer types
export const buyerTypes = [
    { value: 'first-time', label: 'First-time buyer' },
    { value: 'upgrading', label: 'Upgrading' },
    { value: 'investing', label: 'Investing' },
] as const;

// Timeline options
export const timelineOptions = [
    { value: '0-3', label: '0-3 months' },
    { value: '3-6', label: '3-6 months' },
    { value: '6-12', label: '6-12 months' },
    { value: '12+', label: '12+ months' },
] as const;

// POPIA consent text - versioned for compliance
export const CONSENT_TEXT_VERSION = 'v1.0-2024';
export const CONSENT_PURPOSE = 'Match you with a vetted estate agent(s) for property buying in Sandton and contact you about your enquiry.';
export const CONSENT_TEXT = `I consent to PropertyIntelligence sharing my information with vetted estate agents who can assist with my property search in Sandton. I understand my data will be used to: ${CONSENT_PURPOSE}`;

// Lead form schema
export const leadFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string()
        .min(10, 'Please enter a valid phone number')
        .regex(/^(\+27|0)[0-9]{9,10}$/, 'Please enter a valid South African phone number'),
    email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
    buyerType: z.enum(['first-time', 'upgrading', 'investing'] as const),
    budgetRange: z.enum(['<1.5m', '1.5-3m', '3-6m', '6-10m', '10m+'] as const),
    preferredSuburbs: z.array(z.string()).min(1, 'Please select at least one suburb'),
    timeline: z.enum(['0-3', '3-6', '6-12', '12+'] as const),
    preApproved: z.enum(['yes', 'no'] as const),
    consentGiven: z.boolean().refine(val => val === true, {
        message: 'You must consent to proceed',
    }),
    // Honeypot field - should always be empty
    website: z.string().max(0, 'Invalid submission').optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// Lead with consent metadata (for storage)
export const leadWithConsentSchema = leadFormSchema.extend({
    id: z.string(),
    consentTimestamp: z.string(),
    consentTextVersion: z.string(),
    consentPurpose: z.string(),
    sourceUrl: z.string(),
    userAgent: z.string(),
    ipAddress: z.string().optional(),
    createdAt: z.string(),
    status: z.enum(['new', 'contacted', 'closed']).default('new'),
    assignedAgentId: z.string().optional(),
});

export type LeadWithConsent = z.infer<typeof leadWithConsentSchema>;

// Lead create input (what we receive + add metadata)
export interface LeadCreateInput {
    formData: LeadFormData;
    sourceUrl: string;
    userAgent: string;
    ipAddress?: string;
}
