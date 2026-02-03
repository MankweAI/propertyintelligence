import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface VibeCheckProps {
    clips?: { id: string; caption: string }[];
    suburbName: string;
}

export function VibeCheck({ clips, suburbName }: VibeCheckProps) {
    if (!clips || clips.length === 0) return null;

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Live from {suburbName}
                <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full font-normal">TikTok Vibe</span>
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-6 snap-x">
                {clips.map((clip, index) => (
                    <a
                        key={index}
                        href={`https://www.tiktok.com/video/${clip.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[200px] md:min-w-[240px] snap-center group relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-900 shadow-md hover:shadow-xl transition-all"
                    >
                        {/* 
                           For MVP, using a high-quality vertical placeholder since we can't extract thumb from ID easily client-side without API.
                           In production, you'd fetch the poster URL.
                        */}
                        <Image
                            src={`https://loremflickr.com/400/700/party,city,vibe/all?lock=${clip.id.substring(0, 3)}`}
                            alt={clip.caption}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:scale-110 transition-transform">
                                <Play className="h-8 w-8 text-white fill-white" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                            <p className="text-white text-sm font-medium line-clamp-2">
                                {clip.caption}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-white/70">
                                <Image src="/tiktok-icon.png" width={12} height={12} alt="TikTok" className="inline invert" />
                                <span>Watch on TikTok</span>
                            </div>
                        </div>
                    </a>
                ))}

                {/* Visual placeholder to encourage scrolling/more */}
                <div className="min-w-[100px] flex items-center justify-center text-slate-400 text-sm font-medium">
                    View more for {suburbName}...
                </div>
            </div>
        </section>
    );
}
