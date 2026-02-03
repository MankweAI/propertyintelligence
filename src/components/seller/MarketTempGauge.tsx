'use client';

interface MarketTempGaugeProps {
    temperature: 'Sellers' | 'Buyers' | 'Neutral';
    className?: string;
}

export function MarketTempGauge({ temperature, className = '' }: MarketTempGaugeProps) {
    // Position: Sellers = left (green), Neutral = center, Buyers = right (red)
    const getPosition = () => {
        switch (temperature) {
            case 'Sellers': return 25;
            case 'Neutral': return 50;
            case 'Buyers': return 75;
            default: return 50;
        }
    };

    const getColor = () => {
        switch (temperature) {
            case 'Sellers': return '#10b981'; // emerald-500
            case 'Neutral': return '#f59e0b'; // amber-500
            case 'Buyers': return '#ef4444';  // red-500
            default: return '#f59e0b';
        }
    };

    const position = getPosition();
    const color = getColor();

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <svg
                viewBox="0 0 100 50"
                className="w-24 h-12"
                role="img"
                aria-label={`Market temperature: ${temperature}`}
            >
                {/* Background arc */}
                <path
                    d="M 10 45 A 35 35 0 0 1 90 45"
                    fill="none"
                    stroke="#e7e5e4"
                    strokeWidth="6"
                    strokeLinecap="round"
                />

                {/* Colored gradient segments */}
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>
                <path
                    d="M 10 45 A 35 35 0 0 1 90 45"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.3"
                />

                {/* Needle */}
                <g transform={`rotate(${(position - 50) * 1.8}, 50, 45)`}>
                    <line
                        x1="50"
                        y1="45"
                        x2="50"
                        y2="18"
                        stroke={color}
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <circle
                        cx="50"
                        cy="45"
                        r="4"
                        fill={color}
                    />
                </g>
            </svg>

            {/* Label */}
            <div
                className="text-xs font-bold px-2 py-0.5 rounded mt-1"
                style={{
                    backgroundColor: `${color}20`,
                    color: color
                }}
            >
                {temperature}'s Market
            </div>
        </div>
    );
}
