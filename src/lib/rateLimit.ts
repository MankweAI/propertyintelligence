// Simple in-memory rate limiter
// For production with multiple instances, use Redis or similar

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
    maxRequests: number;  // Max requests allowed
    windowMs: number;     // Time window in milliseconds
}

export const defaultRateLimitConfig: RateLimitConfig = {
    maxRequests: 5,       // 5 submissions
    windowMs: 60 * 60 * 1000, // per hour
};

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetTime: number;
}

export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = defaultRateLimitConfig
): RateLimitResult {
    const now = Date.now();
    const entry = rateLimitMap.get(identifier);

    // No existing entry or window has expired
    if (!entry || now > entry.resetTime) {
        const newEntry: RateLimitEntry = {
            count: 1,
            resetTime: now + config.windowMs,
        };
        rateLimitMap.set(identifier, newEntry);
        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetTime: newEntry.resetTime,
        };
    }

    // Within window - check if limit exceeded
    if (entry.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: entry.resetTime,
        };
    }

    // Increment and allow
    entry.count++;
    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetTime: entry.resetTime,
    };
}

// Clean up expired entries periodically
export function cleanupExpiredEntries(): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of rateLimitMap.entries()) {
        if (now > entry.resetTime) {
            rateLimitMap.delete(key);
            cleaned++;
        }
    }

    return cleaned;
}

// Get IP address from request headers (works with Vercel/Next.js)
export function getClientIP(headers: Headers): string {
    // Try various headers in order of preference
    const forwardedFor = headers.get('x-forwarded-for');
    if (forwardedFor) {
        // Take the first IP if there are multiple
        return forwardedFor.split(',')[0].trim();
    }

    const realIP = headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    // Vercel-specific
    const vercelForwardedFor = headers.get('x-vercel-forwarded-for');
    if (vercelForwardedFor) {
        return vercelForwardedFor.split(',')[0].trim();
    }

    // Fallback
    return 'unknown';
}
