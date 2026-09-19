import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ChevronRight, Calendar, ArrowLeft, Share2, Compass } from 'lucide-react';
import FinalCtaBanner from '@/components/FinalCtaBanner';
import { getCustomPageBySlug } from '@/lib/api';

interface CustomPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CustomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCustomPageBySlug(slug);
  if (!page) {
    return { title: 'Page Not Found | IMARKA MEGALO INDONESIA' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imarka-megalo.com';
  const title = page.metaTitle || page.title;
  const description =
    page.metaDescription ||
    page.excerpt ||
    'PT Imarka Megalo Indonesia — Strategic Event Orchestrator and Experiential Solutions.';
  
  const heroImg = page.heroImageUrl || '/images/hero-keynote.jpg';
  const imageUrl = heroImg.startsWith('http')
    ? heroImg
    : `${baseUrl}${heroImg.startsWith('/') ? '' : '/'}${heroImg}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/pages/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/pages/${slug}`,
      siteName: 'IMARKA MEGALO INDONESIA',
      type: 'article',
      locale: 'id_ID',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function CustomPageView({ params }: CustomPageProps) {
  const { slug } = await params;
  const page = await getCustomPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imarka-megalo.com';
  const heroImage = page.heroImageUrl || '/images/hero-keynote.jpg';

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.excerpt || page.title,
    url: `${baseUrl}/pages/${slug}`,
    publisher: {
      '@type': 'Corporation',
      name: 'PT IMARKA MEGALO INDONESIA',
      url: baseUrl,
      logo: `${baseUrl}/images/imarka-symbol.png`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <main className="min-h-screen bg-[#FDFDFD]">
        {/* Hero Banner with Responsive Typography & Corporate Gradient */}
        <section className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] bg-brand-charcoal text-white flex items-end overflow-hidden pt-28 pb-14 sm:pb-16">
          {/* Background Hero Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={page.title}
              fill
              priority
              className="object-cover opacity-35 filter brightness-90"
              sizes="100vw"
            />
            {/* Multi-layered corporate gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/40 to-transparent" />
          </div>

          {/* Banner Content Container */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Breadcrumb navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-medium mb-4 flex-wrap"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-brand-red font-semibold">Halaman</span>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-gray-200 line-clamp-1 max-w-[200px] sm:max-w-xs">{page.title}</span>
            </nav>

            {/* Badge Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/90 text-white text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Compass size={13} />
              <span>Imarka Megalo Information</span>
            </div>

            {/* Page Heading (Single H1 per page for SEO) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] max-w-4xl">
              {page.title}
            </h1>

            {/* Excerpt if present */}
            {page.excerpt && (
              <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl leading-relaxed">
                {page.excerpt}
              </p>
            )}

            {/* Updated Date metadata */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-red" />
                <span>
                  Terakhir diperbarui:{' '}
                  {new Date(page.updatedAt || page.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Body Container */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Article Prose Content with High-end Typography */}
            <article
              className="prose prose-base sm:prose-lg max-w-none text-brand-charcoal leading-relaxed 
                prose-headings:font-bold prose-headings:text-brand-charcoal prose-headings:tracking-tight
                prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
                prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-brand-graphite prose-p:leading-relaxed prose-p:my-4
                prose-a:text-brand-red prose-a:font-semibold prose-a:underline hover:prose-a:text-brand-redDark
                prose-blockquote:border-l-4 prose-blockquote:border-brand-red prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-gray-700
                prose-ul:list-disc prose-ul:my-4 prose-ul:pl-6
                prose-ol:list-decimal prose-ol:my-4 prose-ol:pl-6
                prose-li:my-1.5 prose-li:text-brand-graphite
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8 prose-img:w-full
                prose-hr:border-gray-200 prose-hr:my-10"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />

            {/* Back to Home & Actions */}
            <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-600 hover:text-brand-red transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Kembali ke Beranda Utama</span>
              </Link>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Bagikan halaman:</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${page.title} - ${baseUrl}/pages/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Share2 size={13} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <FinalCtaBanner />
      </main>
    </>
  );
}
