import { MetadataRoute } from 'next'

/**
 * Main Sitemap Index - References all city-specific sitemaps.
 * As we expand to more cities (Johannesburg, Pretoria, Cape Town, etc.),
 * add new sitemap references here.
 *
 * This structure follows Google's best practice for scalable pSEO:
 * - Main index at /sitemap.xml
 * - City-specific sitemaps at /property-valuation/{city}/sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://propertyintelligence.co.za'

    // Core pages (home, about, etc.)
    const corePages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 1.0,
        },
    ]

    return corePages
}
