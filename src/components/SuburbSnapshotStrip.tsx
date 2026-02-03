"use client";

import { useState } from "react";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { StaggerContainer, StaggerItem } from "@/components/Animations";
import { SuburbAmenityModal } from "@/components/SuburbAmenityModal";
import { AmenityPlace, Suburb } from "@/lib/data";

interface SuburbSnapshotStripProps {
    suburbName: string;
    tiles: string[];
    amenityHighlights?: Record<string, AmenityPlace[]>;
}

export function SuburbSnapshotStrip({ suburbName, tiles, amenityHighlights }: SuburbSnapshotStripProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <>
            <StaggerContainer className="mb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {tiles.map((tile, idx) => (
                    <StaggerItem
                        key={idx}
                        className="space-y-2 group cursor-pointer"
                        onClick={() => setSelectedCategory(tile)}
                    >
                        <div className="aspect-square relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <PlaceholderImage
                                alt={`${tile} in ${suburbName}, Sandton`}
                                fill
                                className="group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 50vw, 16vw"
                            />
                        </div>
                        <p className="text-center text-sm font-medium text-slate-700 group-hover:text-teal-700 transition-colors">
                            {tile}
                        </p>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            {amenityHighlights && (
                <SuburbAmenityModal
                    isOpen={!!selectedCategory}
                    onClose={() => setSelectedCategory(null)}
                    initialCategory={selectedCategory || tiles[0]}
                    amenities={amenityHighlights}
                    availableCategories={tiles}
                />
            )}
        </>
    );
}
