import { MetadataRoute } from 'next'

/**
 * Robots.txt Configuration
 *
 * Strategy:
 * - Disallow crawling of everything by default
 * - Explicitly allow only the pages we want indexed
 * - Reference both the main sitemap AND the Sandton sitemap
 *
 * This "allowlist" approach prevents accidental indexing of:
 * - API routes
 * - Draft pages
 * - Admin routes
 * - Any future routes we haven't vetted
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://propertyintelligence.co.za'

    return {
        rules: [
            {
                userAgent: '*',
                disallow: '/',
                allow: [
                    // Core pages
                    '/$',                                   // Home page (exact match)

                    // Sandton Property Valuation Hub + Suburbs
                    '/property-valuation/sandton',          // Hub page
                    '/property-valuation/sandton/*',        // All suburb pages
                ],
            },
            // Block AI training bots (optional but recommended)
            {
                userAgent: 'GPTBot',
                disallow: '/',
            },
            {
                userAgent: 'ChatGPT-User',
                disallow: '/',
            },
            {
                userAgent: 'CCBot',
                disallow: '/',
            },
            {
                userAgent: 'anthropic-ai',
                disallow: '/',
            },
        ],
        sitemap: [
            `${baseUrl}/sitemap.xml`,                       // Main sitemap (core pages)
            `${baseUrl}/property-valuation/sandton/sitemap.xml`, // Sandton suburb sitemap
        ],
    }
}
