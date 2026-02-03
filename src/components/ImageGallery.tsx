'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SuburbImages } from '@/types/images';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { X, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
    images: SuburbImages;
    suburbName: string;
}

export function ImageGallery({ images, suburbName }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Combine gallery and amenities for the grid, but excluding hero
    const allImages = [
        ...images.gallery,
        ...images.amenities.map(a => ({ ...a, caption: a.caption || a.alt }))
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Main Hero - Large */}
                <div
                    className="md:col-span-2 relative aspect-video md:aspect-auto md:h-[400px] rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(images.hero.url)}
                >
                    <Image
                        src={images.hero.url}
                        alt={images.hero.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 66vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p className="text-white font-medium text-lg">{images.hero.caption}</p>
                    </div>
                </div>

                {/* Side Stack - 2 images */}
                <div className="hidden md:flex flex-col gap-4 h-[400px]">
                    {allImages.slice(0, 2).map((img, idx) => (
                        <div
                            key={idx}
                            className="relative flex-1 rounded-xl overflow-hidden cursor-pointer group"
                            onClick={() => setSelectedImage(img.url)}
                        >
                            <Image
                                src={img.url}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="33vw"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Grid of remaining images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allImages.slice(2).map((img, idx) => (
                    <div
                        key={idx}
                        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedImage(img.url)}
                    >
                        <Image
                            src={img.url}
                            alt={img.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {img.caption && (
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                {img.caption}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-5xl w-full p-0 bg-black/95 border-none text-white overflow-hidden">
                    <DialogTitle className="sr-only">
                        {suburbName} Gallery Image
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Full screen view of selected gallery image
                    </DialogDescription>
                    <div className="relative w-full h-[80vh]">
                        {selectedImage && (
                            <Image
                                src={selectedImage}
                                alt="Gallery view"
                                fill
                                className="object-contain"
                                priority
                            />
                        )}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
