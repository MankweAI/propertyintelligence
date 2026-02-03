'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn } from '../Animations';
import { Image as ImageIcon, Star } from 'lucide-react';

interface MarketingGalleryProps {
    suburbName: string;
    images: string[];
}

export function MarketingGallery({ suburbName, images }: MarketingGalleryProps) {
    if (!images || images.length === 0) return null;

    // We'll take up to 3 images for a balanced layout
    const showcaseImages = images.slice(0, 3);

    return (
        <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-amber-500 mb-3">
                                <ImageIcon className="h-5 w-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">Visual Strategy</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                                Marketing {suburbName}
                            </h2>
                            <p className="text-stone-400 text-lg max-w-xl">
                                We don't just list homes; we curate visual narratives. Our marketing emphasizes the unique lifestyle and architectural character of {suburbName}.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-stone-500 bg-stone-800/50 px-4 py-2 rounded-full border border-stone-800">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span>Premium Photography Standard</span>
                        </div>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[600px] md:h-[500px]">
                    {/* Main Feature Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="md:col-span-8 relative rounded-2xl overflow-hidden group h-full"
                    >
                        <Image
                            src={showcaseImages[0]}
                            alt={`Luxury property in ${suburbName}`}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        <div className="absolute bottom-6 left-6">
                            <span className="bg-white/90 text-stone-900 text-xs font-bold px-3 py-1 rounded backdrop-blur-md">
                                Lifestyle Focus
                            </span>
                        </div>
                    </motion.div>

                    {/* Secondary Images Column */}
                    <div className="md:col-span-4 flex flex-col gap-4 h-full">
                        {showcaseImages[1] && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="relative flex-1 rounded-2xl overflow-hidden group min-h-0"
                            >
                                <Image
                                    src={showcaseImages[1]}
                                    alt={`${suburbName} architectural detail`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        )}

                        {showcaseImages[2] && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="relative flex-1 rounded-2xl overflow-hidden group min-h-0"
                            >
                                <Image
                                    src={showcaseImages[2]}
                                    alt={`${suburbName} streetscape`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="mt-8 text-center md:text-left">
                    <p className="text-xs text-stone-500 uppercase tracking-widest">
                        * Representative imagery of our marketing quality for {suburbName} properties
                    </p>
                </div>
            </div>
        </section>
    );
}
