import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'PropertyIntelligence',
        short_name: 'PropertyIntelligence',
        description: 'Data-driven property insights for Sandton sellers.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fafaf9',
        theme_color: '#fafaf9', // Using the stone-50 background color
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/images/logo/hi-logo.png',
                sizes: '192x192 512x512',
                type: 'image/png',
            },
        ],
    }
}
