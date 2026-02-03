import * as fs from 'fs';
import * as path from 'path';
import type { LeadWithConsent } from './validation';
import type { Agent } from './data';

export interface Notification {
    type: 'new_lead';
    timestamp: string;
    leadId: string;
    agentId: string;
    agentEmail: string;
    agentPhone: string;
    leadName: string;
    leadPhone: string;
    preferredSuburbs: string[];
    budgetRange: string;
    message: string;
}

/**
 * Interface for notification adapters
 * Allows easy swap between file logging, email, WhatsApp, etc.
 */
export interface NotificationAdapter {
    notifyAgent(lead: LeadWithConsent, agent: Agent): Promise<void>;
}

/**
 * File-based notification adapter for MVP
 * Writes notifications to a log file
 */
export class FileNotificationAdapter implements NotificationAdapter {
    private logPath: string;

    constructor(logPath?: string) {
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        this.logPath = logPath || path.join(dataDir, 'notifications.log');
    }

    async notifyAgent(lead: LeadWithConsent, agent: Agent): Promise<void> {
        const notification: Notification = {
            type: 'new_lead',
            timestamp: new Date().toISOString(),
            leadId: lead.id,
            agentId: agent.agentId,
            agentEmail: agent.email,
            agentPhone: agent.phone,
            leadName: lead.name,
            leadPhone: lead.phone,
            preferredSuburbs: lead.preferredSuburbs,
            budgetRange: lead.budgetRange,
            message: `New lead for ${agent.name}: ${lead.name} is looking in ${lead.preferredSuburbs.join(', ')} with budget ${lead.budgetRange}`,
        };

        // Append to log file
        const logLine = JSON.stringify(notification) + '\n';
        fs.appendFileSync(this.logPath, logLine);

        // Also log to console for dev visibility
        console.log(`📧 Notification: ${notification.message}`);
    }
}

/**
 * Console-only notification adapter for testing
 */
export class ConsoleNotificationAdapter implements NotificationAdapter {
    async notifyAgent(lead: LeadWithConsent, agent: Agent): Promise<void> {
        console.log('='.repeat(50));
        console.log('🔔 NEW LEAD NOTIFICATION');
        console.log('='.repeat(50));
        console.log(`Agent: ${agent.name} (${agent.agency})`);
        console.log(`Email: ${agent.email}`);
        console.log(`Phone: ${agent.phone}`);
        console.log('-'.repeat(50));
        console.log(`Lead: ${lead.name}`);
        console.log(`Phone: ${lead.phone}`);
        console.log(`Email: ${lead.email || 'Not provided'}`);
        console.log(`Suburbs: ${lead.preferredSuburbs.join(', ')}`);
        console.log(`Budget: ${lead.budgetRange}`);
        console.log(`Timeline: ${lead.timeline}`);
        console.log(`Type: ${lead.buyerType}`);
        console.log(`Pre-approved: ${lead.preApproved}`);
        console.log('='.repeat(50));
    }
}

// Default adapter instance
let adapterInstance: NotificationAdapter | null = null;

export function getNotificationAdapter(): NotificationAdapter {
    if (!adapterInstance) {
        // Use file adapter for production, can override for testing
        adapterInstance = new FileNotificationAdapter();
    }
    return adapterInstance;
}

export function setNotificationAdapter(adapter: NotificationAdapter): void {
    adapterInstance = adapter;
}
