import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://propertyintelligence.co.za'),
  title: {
    default: "PropertyIntelligence | Sandton Property Valuation Tool",
    template: "%s | PropertyIntelligence",
  },
  description:
    "Data-driven property insights for Sandton sellers. Compare suburbs, find vetted agents, and maximize your sale price.",
  applicationName: 'PropertyIntelligence',
  appleWebApp: {
    capable: true,
    title: 'PropertyIntelligence',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  keywords: [
    'Sandton property',
    'luxury real estate',
    'sell property Sandton',
    'property valuation tool',
    'Sandown',
    'Hyde Park',
    'Morningside',
  ],
  authors: [{ name: "PropertyIntelligence" }],
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: "PropertyIntelligence",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/logo/hi-logo.png',
    apple: '/images/logo/hi-logo.png',
  },
};

// WebSite and SoftwareApplication structured data
const websiteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'PropertyIntelligence',
      applicationCategory: 'RealEstateApplication',
      operatingSystem: 'Any',
      url: 'https://propertyintelligence.co.za',
      image: 'https://propertyintelligence.co.za/images/logo/hi-logo.png',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'ZAR',
      },
      description: 'Data-driven property insights for Sandton sellers. Analyze market conditions, compare suburbs, and find vetted agents.',
      featureList: [
        'Property Valuation',
        'Market Trend Analysis',
        'Agent Comparison',
        'Suburb Data'
      ],
      author: {
        '@type': 'Organization',
        name: 'PropertyIntelligence',
        url: 'https://propertyintelligence.co.za'
      }
    },
    {
      '@type': 'WebSite',
      name: "PropertyIntelligence",
      url: 'https://propertyintelligence.co.za',
      description: 'Data-driven property insights for Sandton sellers.',
      publisher: {
        '@type': 'Organization',
        name: 'PropertyIntelligence'
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={`${jakarta.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-stone-50 text-stone-900 min-h-screen flex flex-col">
        {/* Google Analytics - Measurement ID from environment or default placeholder */}
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
