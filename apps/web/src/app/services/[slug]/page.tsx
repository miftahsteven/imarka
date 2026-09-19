import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CheckCircle2, ArrowRight, ChevronRight, Calendar, MapPin } from 'lucide-react';
import FinalCtaBanner from '@/components/FinalCtaBanner';
import { getServiceBySlug } from '@/lib/api';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  if (!data?.service) return { title: 'Service Details | IMARKA MEGALO INDONESIA' };

  const s = data.service;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imarka-megalo.com';
  const title = `${s.name} — Service Solutions | IMARKA MEGALO INDONESIA`;
  const description =
    s.shortDescription ||
    'Professional corporate services by PT IMARKA MEGALO INDONESIA with over 20 years of excellence.';
  const imageUrl = s.heroImageUrl?.startsWith('http')
    ? s.heroImageUrl
    : s.heroImageUrl
    ? `${baseUrl}${s.heroImageUrl.startsWith('/') ? '' : '/'}${s.heroImageUrl}`
    : `${baseUrl}/images/imarka-og-share.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/services/${slug}`,
      siteName: 'IMARKA MEGALO INDONESIA',
      type: 'website',
      locale: 'id_ID',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: s.name,
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

export const revalidate = 60;

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);

  if (!data?.service) {
    notFound();
  }

  const { service, relatedExperiences } = data;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imarka-megalo.com';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
    provider: {
      '@type': 'Corporation',
      name: 'PT IMARKA MEGALO INDONESIA',
      url: baseUrl,
      logo: `${baseUrl}/images/imarka-symbol.png`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* Breadcrumb Header */}
      <section className="bg-brand-charcoal text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight size={14} />
            <span className="text-brand-red font-semibold">{service.name}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {service.name}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/9] bg-brand-charcoal">
              <Image
                src={service.heroImageUrl || '/images/hero-keynote.jpg'}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="prose max-w-none text-brand-graphite space-y-4 text-base sm:text-lg leading-relaxed">
              <h2 className="text-2xl font-bold text-brand-charcoal">Strategic Approach & Scope</h2>
              <p>{service.fullDescription}</p>
            </div>

            {/* Capabilities Checklist */}
            <div className="bg-brand-light p-8 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold text-brand-charcoal mb-4">
                Full Capability Matrix:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.capabilities?.map((cap) => (
                  <div key={cap.id} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-brand-red shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-brand-charcoal">{cap.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-brand-light p-6 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="text-lg font-bold text-brand-charcoal">
                Need consultation on {service.name.split('&')[0]}?
              </h3>
              <p className="text-xs text-brand-graphite leading-relaxed">
                Connect directly with our project directors to discuss strategic requirements,
                budgets, timelines, and deliverables.
              </p>
              <Link
                href="/contact"
                className="w-full py-3 bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
              >
                <span>Request Consultation</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Experiences */}
        {relatedExperiences && relatedExperiences.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-brand-charcoal mb-8">
              Related Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedExperiences.map((exp) => (
                <Link
                  key={exp.slug}
                  href={`/experiences/${exp.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 w-full bg-brand-charcoal overflow-hidden">
                    <Image
                      src={exp.coverImageUrl}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-xs font-bold text-brand-red uppercase">{exp.clientName}</span>
                    <h3 className="text-base font-bold text-brand-charcoal group-hover:text-brand-red transition-colors line-clamp-2">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-brand-graphite line-clamp-2">{exp.summary}</p>
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
