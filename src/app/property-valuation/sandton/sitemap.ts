import { MetadataRoute } from 'next'
import { getSuburbSlugs } from '@/lib/data'

/**
 * Sandton Sitemap - All property valuation pages for Sandton suburbs.
 *
 * This nested sitemap follows Next.js App Router conventions:
 * - Located at /property-valuation/sandton/sitemap.xml
 * - Contains the hub page + all 34 suburb pages
 * - Separate from main sitemap for scalability
 *
 * Benefits:
 * - Clear segmentation by city/region
 * - Easy to add Johannesburg, Pretoria, Cape Town later
 * - Faster crawling (Google can fetch just this segment)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://propertyintelligence.co.za'

    // Get all suburb slugs for Sandton
    const suburbSlugs = await getSuburbSlugs()

    // Hub page (highest priority - internal link equity anchor)
    const hubPage = {
        url: `${baseUrl}/property-valuation/sandton`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }

    // Generate URLs for each suburb page
    const suburbRoutes = suburbSlugs.map((slug) => ({
        url: `${baseUrl}/property-valuation/sandton/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [hubPage, ...suburbRoutes]
}
