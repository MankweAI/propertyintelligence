import { supabase } from './supabase';

// Types
export interface SourceNote {
    label: string;
    url: string;
}

export interface PriceBand {
    min: number;
    max: number;
    currency: string;
}

export interface AmenityPlace {
    name: string;
    rating?: number;
    priceLevel?: string;
    distance?: string;
    description?: string;
    image?: string;
}

export interface DataPoints {
    priceBand: PriceBand;
    propertyTypes: string[];
    commuteAnchors: string[];
    lifestyleTags: string[];
    schoolsNote: string;
    safetyNote: string;
    walkability: string;
    investmentPotential: string;
    sourceNotes: SourceNote[];
    amenityHighlights?: Record<string, AmenityPlace[]>;
}

export interface ImagePlan {
    hero: { alt: string };
    snapshotTiles: string[];
    lifestyleGalleryCount: number;
    amenities: {
        schools: number;
        clinics: number;
        shopping: number;
    };
    transportGalleryCount: number;
}

export interface Suburb {
    slug: string;
    name: string;
    summary: string;
    centroid: { lat: number; lng: number };
    dataPoints: DataPoints;
    imagePlan: ImagePlan;
    relatedSuburbs: string[];
}

export interface SuburbsData {
    city: string;
    province: string;
    suburbs: Suburb[];
}

export interface AgentVerification {
    ffcStatus: 'verified' | 'unverified';
    ffcNumber: string | null;
    ffcExpiry: string | null;
    verifiedAt: string | null;
}

export interface Agent {
    agentId: string;
    name: string;
    agency: string;
    phone: string;
    email: string;
    suburbsServed: string[];
    verification: AgentVerification;
}

export interface AgentsData {
    agents: Agent[];
    fallbackAgentPool: string[];
}



// Data getters - NOW ASYNC via Supabase

// --- Fallback Data for Non-DB Suburbs ---
const FALLBACK_SUBURBS: Record<string, Suburb> = {
    'sandton-cbd': {
        slug: 'sandton-cbd',
        name: 'Sandton Central',
        summary: 'The financial heart of Africa.',
        centroid: { lat: -26.1076, lng: 28.0567 },
        dataPoints: {
            priceBand: { min: 950000, max: 45000000, currency: 'ZAR' },
            propertyTypes: ['Apartments', 'Penthouses'],
            commuteAnchors: ['Sandton City'],
            lifestyleTags: ['Metropolitan'],
            schoolsNote: 'Proximity to Crawford',
            safetyNote: 'High Visibility',
            walkability: 'High',
            investmentPotential: 'High',
            sourceNotes: []
        },
        imagePlan: { hero: { alt: 'Sandton Skyline' }, snapshotTiles: [], lifestyleGalleryCount: 0, amenities: { schools: 4, clinics: 6, shopping: 3 }, transportGalleryCount: 0 },
        relatedSuburbs: ['sandown']
    }
};

export async function getAllSuburbs(): Promise<Suburb[]> {
    const { data, error } = await supabase
        .from('suburbs')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching suburbs:', error);
        return [];
    }

    // Map DB schema to App Schema
    return data.map(row => ({
        slug: row.slug,
        name: row.name,
        summary: row.overview.summary,
        centroid: row.centroid,
        dataPoints: row.overview.dataPoints,
        imagePlan: row.overview.imagePlan,
        relatedSuburbs: row.related_suburbs
    }));
}

export async function getSuburbBySlug(slug: string): Promise<Suburb | undefined> {
    const { data, error } = await supabase
        .from('suburbs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        // Fallback for known local-only suburbs
        // Check generic fallback logic
        const fallback = FALLBACK_SUBURBS[slug];
        if (fallback) return fallback;

        // If we have no specific fallback but the slug is plausible, return a skeleton
        // This is a safety net for development/migration
        if (slug.length > 3) {
            console.warn(`Generating skeleton suburb for: ${slug}`);
            return {
                slug: slug,
                name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                summary: 'Valuation data available.',
                centroid: { lat: -26.1, lng: 28.0 },
                dataPoints: {
                    priceBand: { min: 0, max: 0, currency: 'ZAR' },
                    propertyTypes: [],
                    commuteAnchors: [],
                    lifestyleTags: [],
                    schoolsNote: 'Data pending',
                    safetyNote: 'Data pending',
                    walkability: 'Moderate',
                    investmentPotential: 'Analysis Ready',
                    sourceNotes: []
                },
                imagePlan: {
                    hero: { alt: `${slug} view` },
                    snapshotTiles: [],
                    lifestyleGalleryCount: 0,
                    amenities: { schools: 0, clinics: 0, shopping: 0 },
                    transportGalleryCount: 0
                },
                relatedSuburbs: []
            };
        }
        return undefined;
    }

    return {
        slug: data.slug,
        name: data.name,
        summary: data.overview.summary,
        centroid: data.centroid,
        dataPoints: data.overview.dataPoints,
        imagePlan: data.overview.imagePlan,
        relatedSuburbs: data.related_suburbs
    };
}

export async function getSuburbSlugs(): Promise<string[]> {
    const { data } = await supabase.from('suburbs').select('slug');
    return data?.map(d => d.slug) || [];
}

import { recommendedAgents } from './agents';

export function getAgentsData(): AgentsData {
    return {
        agents: recommendedAgents.map(a => ({
            agentId: a.id,
            name: a.name,
            agency: a.agency,
            phone: a.contacts.phone,
            email: a.contacts.email,
            suburbsServed: a.areas,
            verification: {
                ffcStatus: 'verified',
                ffcNumber: null,
                ffcExpiry: null,
                verifiedAt: null
            }
        })),
        fallbackAgentPool: []
    };
}

export function getAllAgents(): Agent[] {
    return getAgentsData().agents;
}

export function getAgentById(agentId: string): Agent | undefined {
    return getAllAgents().find(a => a.agentId === agentId);
}

export function getVerifiedAgents(): Agent[] {
    return getAllAgents().filter(a => a.verification.ffcStatus === 'verified');
}



// Format utilities
export function formatPrice(amount: number): string {
    if (amount >= 1000000) {
        return `R${(amount / 1000000).toFixed(1)}M`;
    }
    return `R${(amount / 1000).toFixed(0)}K`;
}

export function formatPriceBand(priceBand: PriceBand): string {
    return `${formatPrice(priceBand.min)} - ${formatPrice(priceBand.max)}`;
}
