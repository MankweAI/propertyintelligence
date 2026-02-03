import Image, { ImageProps } from 'next/image';
// Force recompile
import { cn } from '@/lib/utils';
// Static import ensures validity and blur generation
import localPlaceholder from '@/assets/placeholder.jpg';

interface PlaceholderImageProps extends Omit<ImageProps, 'src' | 'alt' | 'placeholder' | 'blurDataURL'> {
    alt: string;
    containerClassName?: string;
}

/**
 * Strict Placeholder Image Component.
 * Enforces use of the single local placeholder image for the MVP.
 * All alt text must be specific and descriptive for SEO context.
 * 
 * Usage:
 * <PlaceholderImage 
 *   alt="Coffee shop in Sandton" 
 *   width={800} 
 *   height={600} 
 * />
 */
export function PlaceholderImage({
    alt,
    className,
    containerClassName,
    ...props
}: PlaceholderImageProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden bg-slate-100 w-full h-full",
                containerClassName
            )}
        >
            <Image
                src={localPlaceholder}
                alt={alt}
                fill
                className={cn("object-cover", className)}
                placeholder="blur"
                {...props}
            />
        </div>
    );
}

