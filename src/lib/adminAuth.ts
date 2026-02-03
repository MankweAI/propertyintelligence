// Simple cookie-based admin auth for MVP
// In production, use a proper auth solution

const ADMIN_COOKIE_NAME = 'admin_session';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function verifyAdminPassword(password: string): boolean {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
        console.warn('ADMIN_PASSWORD not set in environment');
        return false;
    }
    return password === adminPassword;
}

export function createAdminSession(): string {
    // Simple session token - in production use proper crypto
    const token = Buffer.from(`admin:${Date.now()}:${Math.random()}`).toString('base64');
    return token;
}

export function verifyAdminSession(token: string | undefined): boolean {
    if (!token) return false;

    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const [prefix, timestamp] = decoded.split(':');

        if (prefix !== 'admin') return false;

        const sessionTime = parseInt(timestamp);
        const now = Date.now();

        // Check if session has expired
        if (now - sessionTime > SESSION_DURATION_MS) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

export { ADMIN_COOKIE_NAME };
