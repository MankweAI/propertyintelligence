import { MetadataRoute } from 'next'
import { getSuburbSlugs } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://propertyintelligence.co.za'

    // Get all suburb slugs from the data source
    const suburbSlugs = await getSuburbSlugs()

    // Generate URLs for each suburb page
    const suburbRoutes = suburbSlugs.map((slug) => ({
        url: `${baseUrl}/property-valuation/sandton/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Define static routes
    const staticRoutes = [
        '', // Home page
        '/property-valuation/sandton', // Hub page
        // '/property-agents/sandton', // Agent Hub
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1.0,
    }))

    return [...staticRoutes, ...suburbRoutes]
}
