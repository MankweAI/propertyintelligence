import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validation';
import { getLeadRepository } from '@/lib/leadRepository';
import { assignAgent } from '@/lib/agentRouting';
import { getNotificationAdapter } from '@/lib/notificationAdapter';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';
import { getAgentById } from '@/lib/data';

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const clientIP = getClientIP(request.headers);

        // Check rate limit
        const rateLimitResult = checkRateLimit(clientIP);
        if (!rateLimitResult.allowed) {
            return NextResponse.json(
                {
                    error: 'Too many submissions. Please try again later.',
                    retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000))
                    }
                }
            );
        }

        // Parse request body
        const body = await request.json();

        // Check honeypot
        if (body.website && body.website.length > 0) {
            // Silently reject spam but return success to not tip off bots
            return NextResponse.json({ success: true, leadId: 'blocked' });
        }

        // Validate with Zod
        const validationResult = leadFormSchema.safeParse(body);
        if (!validationResult.success) {
            const errors = validationResult.error.flatten();
            return NextResponse.json(
                { error: 'Validation failed', details: errors.fieldErrors },
                { status: 400 }
            );
        }

        const formData = validationResult.data;

        // Verify consent is explicitly given
        if (!formData.consentGiven) {
            return NextResponse.json(
                { error: 'Consent is required to proceed' },
                { status: 400 }
            );
        }

        // Assign an agent based on preferred suburbs
        const assignment = assignAgent(formData.preferredSuburbs);
        const assignedAgentId = assignment?.agent.agentId;

        // Get repository and create lead
        const repository = getLeadRepository();
        const lead = await repository.createLead(
            {
                formData,
                sourceUrl: body.sourceUrl || '',
                userAgent: request.headers.get('user-agent') || '',
                ipAddress: clientIP !== 'unknown' ? clientIP : undefined,
            },
            assignedAgentId
        );

        // Notify the assigned agent
        if (assignment && assignedAgentId) {
            const agent = getAgentById(assignedAgentId);
            if (agent) {
                const notifier = getNotificationAdapter();
                await notifier.notifyAgent(lead, agent);
            }
        }

        return NextResponse.json({
            success: true,
            leadId: lead.id,
            message: 'Thank you for your enquiry. A vetted agent will contact you shortly.',
        });

    } catch (error) {
        console.error('Lead submission error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}

// Health check
export async function GET() {
    return NextResponse.json({ status: 'ok', endpoint: 'leads' });
}
