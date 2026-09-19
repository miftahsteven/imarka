import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calendar, MapPin, ChevronRight, ArrowRight, Award, CheckCircle } from 'lucide-react';
import FinalCtaBanner from '@/components/FinalCtaBanner';
import { getExperienceBySlug } from '@/lib/api';

interface ExpPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ExpPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getExperienceBySlug(slug);
  if (!data?.experience) return { title: 'Case Study | IMARKA MEGALO INDONESIA' };

  const exp = data.experience;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imarka-megalo.com';
  const title = `${exp.title} — Case Study | IMARKA MEGALO INDONESIA`;
  const description =
    exp.summary ||
    'Explore this strategic corporate event and experience crafted by PT IMARKA MEGALO INDONESIA.';
  const imageUrl = exp.coverImageUrl?.startsWith('http')
    ? exp.coverImageUrl
    : exp.coverImageUrl
    ? `${baseUrl}${exp.coverImageUrl.startsWith('/') ? '' : '/'}${exp.coverImageUrl}`
    : `${baseUrl}/images/imarka-og-share.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `/experiences/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/experiences/${slug}`,
      siteName: 'IMARKA MEGALO INDONESIA',
      type: 'article',
      locale: 'id_ID',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: exp.title,
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

export default async function ExperienceDetailPage({ params }: ExpPageProps) {
  const { slug } = await params;
  const data = await getExperienceBySlug(slug);

  if (!data?.experience) {
    notFound();
  }

  const { experience, related } = data;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imarka-megalo.com';

  const expJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: experience.title,
    description: experience.summary,
    image: experience.coverImageUrl?.startsWith('http')
      ? experience.coverImageUrl
      : `${baseUrl}${experience.coverImageUrl?.startsWith('/') ? '' : '/'}${experience.coverImageUrl || 'images/imarka-og-share.png'}`,
    publisher: {
      '@type': 'Corporation',
      name: 'PT IMARKA MEGALO INDONESIA',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/imarka-symbol.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/experiences/${slug}`,
    },
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(expJsonLd) }}
      />
      {/* Header */}
      <section className="bg-brand-charcoal text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <Link href="/experiences" className="hover:text-white">Experiences</Link>
            <ChevronRight size={14} />
            <span className="text-brand-red font-semibold truncate max-w-xs">{experience.title}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-md bg-brand-red text-white text-xs font-bold">
              {experience.serviceCategory}
            </span>
            <span className="px-3 py-1 rounded-md bg-white/20 text-white text-xs font-semibold">
              {experience.industry}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {experience.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-gray-300 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold">CLIENT:</span>
              <span className="font-semibold text-white">{experience.clientName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-brand-red" />
              <span>{experience.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={15} className="text-brand-red" />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Case Study */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9] bg-brand-charcoal">
              <Image
                src={experience.coverImageUrl}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Summary */}
            <div className="border-l-4 border-brand-red pl-6 py-2">
              <h2 className="text-xl font-bold text-brand-charcoal mb-2">Executive Summary</h2>
              <p className="text-base sm:text-lg text-brand-graphite leading-relaxed">
                {experience.summary}
              </p>
            </div>

            {/* Challenge */}
            {experience.challenge && (
              <div className="bg-brand-light p-8 rounded-2xl border border-gray-200/80 space-y-3">
                <h3 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-red" />
                  <span>The Challenge</span>
                </h3>
                <p className="text-base text-brand-graphite leading-relaxed">
                  {experience.challenge}
                </p>
              </div>
            )}

            {/* Approach */}
            {experience.approach && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
                <h3 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-red" />
                  <span>Strategic Approach</span>
                </h3>
                <p className="text-base text-brand-graphite leading-relaxed">
                  {experience.approach}
                </p>
              </div>
            )}

            {/* Execution */}
            {experience.execution && (
              <div className="bg-brand-light p-8 rounded-2xl border border-gray-200/80 space-y-3">
                <h3 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-red" />
                  <span>Turnkey Execution</span>
                </h3>
                <p className="text-base text-brand-graphite leading-relaxed">
                  {experience.execution}
                </p>
              </div>
            )}

            {/* Outcome */}
            {experience.outcome && (
              <div className="bg-brand-charcoal text-white p-8 rounded-2xl space-y-3 shadow-lg border border-brand-red/30">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award size={20} className="text-brand-red" />
                  <span>Measurable Outcome & Impact</span>
                </h3>
                <p className="text-base text-gray-200 leading-relaxed">
                  {experience.outcome}
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-brand-light p-6 rounded-2xl border border-gray-200/80 space-y-4">
              <h3 className="text-base font-bold text-brand-charcoal uppercase tracking-wider">
                Project Overview
              </h3>
              <div className="space-y-3 text-sm divide-y divide-gray-200">
                <div className="pt-2 flex justify-between">
                  <span className="text-brand-graphite">Client</span>
                  <span className="font-semibold text-brand-charcoal text-right">{experience.clientName}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-brand-graphite">Year</span>
                  <span className="font-semibold text-brand-charcoal">{experience.year}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-brand-graphite">Location</span>
                  <span className="font-semibold text-brand-charcoal text-right">{experience.location}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-brand-graphite">Industry</span>
                  <span className="font-semibold text-brand-charcoal">{experience.industry}</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="w-full py-3 bg-brand-red hover:bg-brand-redDark text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Case Studies */}
        {related && related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-brand-charcoal mb-8">
              Explore More Experiences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/experiences/${item.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 w-full bg-brand-charcoal overflow-hidden">
                    <Image
                      src={item.coverImageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-xs font-bold text-brand-red uppercase">{item.clientName}</span>
                    <h3 className="text-base font-bold text-brand-charcoal group-hover:text-brand-red transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-graphite line-clamp-2">{item.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <FinalCtaBanner />
    </div>
  );
}
