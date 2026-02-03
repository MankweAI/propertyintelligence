import { StaticImageData } from 'next/image';
import placeholder from '@/assets/placeholder.jpg';
// Suburb Hero Images
// Note: Moving to public path for Hurlingham to consolidate assets
// import hurlinghamHero from '@/assets/suburbs/hurlingham/hero.jpg'; 

export const suburbHeroImages: Record<string, any> = {
    'hurlingham': '/images/hero-images/hurlingham-hero.webp',
    'sandown': '/images/hero-images/sandown-hero.webp',
    'sandton-cbd': '/images/hero-images/sandton-cbd-hero.webp',
    'bryanston': '/images/hero-images/bryanston-hero.webp',
    'hyde-park': '/images/hero-images/hyde-park-hero.webp',
    'woodmead': '/images/hero-images/woodmead-hero.webp',
    'atholl': '/images/hero-images/atholl-hero.webp',
    'morningside': '/images/hero-images/morningside-hero.webp',
    'fourways': '/images/hero-images/fourways-hero.webp',
    'rivonia': '/images/hero-images/rivonia-hero.webp',
    'craighall-park': '/images/hero-images/craighall-park-hero.webp',
    'benmore-gardens': '/images/hero-images/benmore-gardens-hero.webp',
    'river-club': '/images/hero-images/river-club-hero.webp',
    'strathavon': '/images/hero-images/strathavon-hero.webp',
    'dunkeld': '/images/hero-images/dunkeld-hero.webp',
    'sandhurst': '/images/hero-images/sandhurst-hero.webp',
    // Phase 1 Suburbs - Custom Generated
    'douglasdale': '/images/hero-images/douglasdale_hero.jpg',
    'magaliessig': '/images/hero-images/magaliessig_hero.jpg',
    'edenburg': '/images/hero-images/edenburg_hero.jpg',
    // Phase 2 Suburbs - Custom Generated
    'wierda-valley': '/images/hero-images/wierda-valley_hero.jpg',
    'kelvin': '/images/hero-images/kelvin_hero.jpg',
    'buccleuch': '/images/hero-images/buccleuch_hero.jpg',
    // Phase 3 Suburbs - Custom Generated
    'kramerville': '/images/hero-images/kramerville_hero.jpg',
    'marlboro': '/images/hero-images/marlboro_hero.jpg',
    'marlboro-gardens': '/images/hero-images/marlboro-gardens_hero.jpg',
    'parkmore': '/images/hero-images/parkmore_hero.jpg',
    // Phase 4 Suburbs - Lifestyle Images
    'craigavon': '/images/hero-images/craigavon_hero.jpg',
    'beverley': '/images/hero-images/beverley_hero.jpg',
    'dainfern': '/images/hero-images/dainfern_hero.jpg',
    'broadacres': '/images/hero-images/broadacres_hero.jpg',
    // Phase 5 Suburbs - Lifestyle Images
    'gallo-manor': '/images/hero-images/gallo-manor_hero.jpg',
    'wendywood': '/images/hero-images/wendywood_hero.jpg',
    'illovo': '/images/hero-images/illovo_hero.jpg',
};

// Marketing/Gallery Images (Public folder paths)
export const suburbMarketingImages: Record<string, string[]> = {
    'hurlingham': [
        '/images/city/suburb/hurlingham/hero.jpg',
    ]
};

export function getSuburbHeroImage(slug: string): any {
    return suburbHeroImages[slug] || placeholder;
}

export function getSuburbMarketingImages(slug: string): string[] {
    return suburbMarketingImages[slug] || [];
}
