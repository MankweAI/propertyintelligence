import { getAgentsData, getAgentById, type Agent } from './data';

// Track round-robin state per suburb cluster
const roundRobinState = new Map<string, number>();

export interface AgentAssignment {
    agent: Agent;
    reason: 'suburb_match' | 'fallback_pool';
}

/**
 * Find agents that serve at least one of the specified suburbs
 */
export function findAgentsForSuburbs(suburbSlugs: string[]): Agent[] {
    const { agents } = getAgentsData();

    return agents.filter(agent =>
        agent.suburbsServed.some(served => suburbSlugs.includes(served))
    );
}

/**
 * Get agents from the fallback pool (for cases where no suburb match)
 */
export function getFallbackAgents(): Agent[] {
    const { agents, fallbackAgentPool } = getAgentsData();
    return agents.filter(agent => fallbackAgentPool.includes(agent.agentId));
}

/**
 * Assign an agent to a lead based on their preferred suburbs
 * Uses round-robin within matching agents to distribute leads fairly
 */
export function assignAgent(preferredSuburbs: string[]): AgentAssignment | null {
    // First, try to find agents matching the suburbs
    let matchingAgents = findAgentsForSuburbs(preferredSuburbs);
    let reason: 'suburb_match' | 'fallback_pool' = 'suburb_match';

    // If no matches, fall back to general pool
    if (matchingAgents.length === 0) {
        matchingAgents = getFallbackAgents();
        reason = 'fallback_pool';
    }

    // Still no agents? Return null
    if (matchingAgents.length === 0) {
        return null;
    }

    // Prefer verified agents
    const verifiedAgents = matchingAgents.filter(a => a.verification.ffcStatus === 'verified');
    const agentPool = verifiedAgents.length > 0 ? verifiedAgents : matchingAgents;

    // Create a cluster key for round-robin tracking
    const clusterKey = [...preferredSuburbs].sort().join(',') || 'fallback';

    // Get current round-robin index
    const currentIndex = roundRobinState.get(clusterKey) || 0;
    const selectedAgent = agentPool[currentIndex % agentPool.length];

    // Update round-robin state
    roundRobinState.set(clusterKey, currentIndex + 1);

    return {
        agent: selectedAgent,
        reason,
    };
}

/**
 * Get agent coverage summary for admin display
 */
export function getAgentCoverage(): { agentId: string; name: string; suburbs: string[]; verified: boolean }[] {
    const { agents } = getAgentsData();

    return agents.map(agent => ({
        agentId: agent.agentId,
        name: agent.name,
        suburbs: agent.suburbsServed,
        verified: agent.verification.ffcStatus === 'verified',
    }));
}

/**
 * Get all agents serving a specific suburb
 */
export function getAgentsForSuburb(suburbSlug: string): Agent[] {
    const { agents } = getAgentsData();
    return agents.filter(agent => agent.suburbsServed.includes(suburbSlug));
}
