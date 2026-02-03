"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { AmenityPlace } from "@/lib/data";

interface SuburbAmenityModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialCategory: string;
    amenities: Record<string, AmenityPlace[]>;
    availableCategories: string[]; // To preserve order from tiles
}

export function SuburbAmenityModal({
    isOpen,
    onClose,
    initialCategory,
    amenities,
    availableCategories
}: SuburbAmenityModalProps) {
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setActiveCategory(initialCategory);
        }
    }, [isOpen, initialCategory]);

    const currentIndex = availableCategories.indexOf(activeCategory);

    const navigate = (newDirection: number) => {
        const nextIndex = currentIndex + newDirection;
        if (nextIndex >= 0 && nextIndex < availableCategories.length) {
            setDirection(newDirection);
            setActiveCategory(availableCategories[nextIndex]);
        }
    };

    const handlers = {
        drag: "x" as const,
        dragConstraints: { left: 0, right: 0 },
        dragElastic: 0.2,
        onDragEnd: (e: any, { offset, velocity }: any) => {
            const swipe = offset.x; // negative is left
            const swipeThreshold = 50;
            if (swipe < -swipeThreshold && currentIndex < availableCategories.length - 1) {
                navigate(1);
            } else if (swipe > swipeThreshold && currentIndex > 0) {
                navigate(-1);
            }
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl md:w-full">

                    {/* Header with Navigation */}
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <button
                            onClick={() => navigate(-1)}
                            disabled={currentIndex === 0}
                            className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20 transition-colors"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>

                        <Dialog.Title className="text-lg font-semibold text-center w-full">
                            {activeCategory}
                        </Dialog.Title>

                        <button
                            onClick={() => navigate(1)}
                            disabled={currentIndex === availableCategories.length - 1}
                            className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20 transition-colors"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="relative overflow-hidden h-[400px]">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={activeCategory}
                                custom={direction}
                                variants={{
                                    enter: (direction: number) => ({
                                        x: direction > 0 ? 300 : -300,
                                        opacity: 0
                                    }),
                                    center: {
                                        zIndex: 1,
                                        x: 0,
                                        opacity: 1
                                    },
                                    exit: (direction: number) => ({
                                        zIndex: 0,
                                        x: direction < 0 ? 300 : -300,
                                        opacity: 0
                                    })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="absolute inset-0 p-6 overflow-y-auto"
                                {...handlers}
                            >
                                <div className="space-y-4">
                                    {(amenities[activeCategory] || []).length > 0 ? (
                                        amenities[activeCategory].map((place, idx) => (
                                            <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-teal-100 transition-colors">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-semibold text-slate-900">{place.name}</h3>
                                                    {place.rating && (
                                                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm">
                                                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                                            <span className="text-xs font-medium">{place.rating}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                                    {place.priceLevel && <span>{place.priceLevel}</span>}
                                                    {place.distance && (
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="h-3 w-3" />
                                                            {place.distance}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    {place.description}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center">
                                            <p>No highlights available yet for {activeCategory}.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 bg-slate-100 hover:bg-slate-200 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
