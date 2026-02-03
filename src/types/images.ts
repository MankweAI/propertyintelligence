export interface Image {
    url: string;
    alt: string;
    caption?: string;
    credit?: string;
}

export interface AmenityImage extends Image {
    type: 'school' | 'shopping' | 'park' | 'clinic' | 'transport';
}

export interface SuburbImages {
    hero: Image;
    gallery: Image[];
    amenities: AmenityImage[];
    videoClips?: { id: string; caption: string }[];
}
