import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsapp from '@/components/FloatingWhatsapp';
import AnalyticsTracker from '@/components/AnalyticsTracker';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'IMARKA MEGALO INDONESIA — Experiences That Inspire',
    template: '%s | IMARKA MEGALO INDONESIA',
  },
  description:
    'Over 20 Years of Excellence in Corporate Events, Strategic Marketing Communication, Brand Activation & People Development. We Create Meaningful Connections That Move People and Drive Impact.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imarka-megalo.com'),
  applicationName: 'IMARKA MEGALO INDONESIA',
  keywords: [
    'Imarka Megalo Indonesia',
    'PT Imarka Megalo Indonesia',
    'Event Organizer Jakarta',
    'Corporate Event Planner Indonesia',
    'Event Production Jakarta',
    'Brand Activation Indonesia',
    'Strategic Marketing Communication',
    'People Development',
    'Corporate Training Jakarta',
    'Frontliners Academy',
    'Procurement Solutions',
    'MICE Jakarta',
    'Conference Organizer',
    'Exhibition Contractor',
  ],
  authors: [{ name: 'PT IMARKA MEGALO INDONESIA', url: 'https://www.imarka-megalo.com' }],
  creator: 'PT IMARKA MEGALO INDONESIA',
  publisher: 'PT IMARKA MEGALO INDONESIA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.imarka-megalo.com',
    siteName: 'IMARKA MEGALO INDONESIA',
    title: 'IMARKA MEGALO INDONESIA — Experiences That Inspire',
    description:
      'Over 20 Years of Excellence in Corporate Events, Strategic Marketing Communication, Brand Activation & People Development. We Create Meaningful Connections That Move People and Drive Impact.',
    images: [
      {
        url: 'https://www.imarka-megalo.com/images/imarka-og-share.png',
        secureUrl: 'https://www.imarka-megalo.com/images/imarka-og-share.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'IMARKA MEGALO INDONESIA — Experiences That Inspire',
      },
      {
        url: 'https://www.imarka-megalo.com/images/imarka-og-share.jpg',
        secureUrl: 'https://www.imarka-megalo.com/images/imarka-og-share.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'IMARKA MEGALO INDONESIA — Experiences That Inspire',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IMARKA MEGALO INDONESIA — Experiences That Inspire',
    description:
      'Over 20 Years of Excellence in Corporate Events, Strategic Marketing Communication, Brand Activation & People Development.',
    site: '@imarkamegalo',
    creator: '@imarkamegalo',
    images: [
      {
        url: 'https://www.imarka-megalo.com/images/imarka-og-share.png',
        width: 1200,
        height: 630,
        alt: 'IMARKA MEGALO INDONESIA — Experiences That Inspire',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/imarka-symbol.png' },
      { url: '/images/imarka-symbol.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/imarka-symbol.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/images/imarka-symbol.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/images/imarka-symbol.png'],
  },
  category: 'business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const corporationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': 'https://www.imarka-megalo.com/#corporation',
    name: 'PT IMARKA MEGALO INDONESIA',
    alternateName: ['IMARKA MEGALO', 'IMARKA', 'Imarka Megalo Indonesia'],
    url: 'https://www.imarka-megalo.com',
    logo: 'https://www.imarka-megalo.com/images/imarka-symbol.png',
    image: 'https://www.imarka-megalo.com/images/imarka-og-share.png',
    description:
      'Over 20 Years of Excellence in Corporate Events, Strategic Marketing Communication, Brand Activation & People Development.',
    foundingDate: '2004',
    telephone: '+628569529955',
    email: 'emmy@imarka-megalo.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressRegion: 'DKI Jakarta',
      addressCountry: 'ID',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+628569529955',
        contactType: 'customer service',
        email: 'emmy@imarka-megalo.com',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English'],
      },
    ],
    sameAs: [
      'https://www.instagram.com',
      'https://www.linkedin.com',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.imarka-megalo.com/#website',
    url: 'https://www.imarka-megalo.com',
    name: 'IMARKA MEGALO INDONESIA',
    description: 'Experiences That Inspire — Corporate Event, Marketing Communication & People Development Solutions',
    publisher: {
      '@id': 'https://www.imarka-megalo.com/#corporation',
    },
    inLanguage: 'id-ID',
  };

  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#1A1A1E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(corporationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-brand-charcoal antialiased selection:bg-brand-red selection:text-white">
        <AnalyticsTracker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
