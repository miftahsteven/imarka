import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Experience } from '@imarka/types';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

interface FeaturedProps {
  experiences?: Experience[];
}

export default function FeaturedExperiencesSection({ experiences }: FeaturedProps) {
  // If not provided or empty, fallback to seed list
  const items = experiences && experiences.length > 0 ? experiences : [];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with View All Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-brand-light px-3 py-1 rounded-md border border-gray-200">
              FEATURED EXPERIENCES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight">
              More Than 20 Years of Trust & Success
            </h2>
            <p className="text-base sm:text-lg text-brand-graphite leading-relaxed">
              We are proud to have partnered with leading organizations across industries, delivering
              impactful events and communication programs that inspire and create lasting value.
            </p>
          </div>

          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-charcoal hover:border-brand-red hover:bg-brand-red hover:text-white text-brand-charcoal font-bold text-sm rounded-full transition-all duration-200 shrink-0"
          >
            <span>View All Experiences</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((exp) => (
            <Link
              key={exp.slug}
              href={`/experiences/${exp.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image with Tag & Year */}
              <div className="relative h-60 w-full overflow-hidden bg-brand-charcoal">
                <Image
                  src={exp.coverImageUrl}
                  alt={exp.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-brand-red text-white text-xs font-bold shadow">
                    {exp.serviceCategory.split(' ')[0]}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                    {exp.industry}
                  </span>
                </div>

                <div className="absolute bottom-3 right-4 text-white text-xs font-bold flex items-center gap-1">
                  <Calendar size={13} />
                  <span>{exp.year}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-brand-graphite font-medium mb-1.5">
                    <MapPin size={13} className="text-brand-red shrink-0" />
                    <span className="truncate">{exp.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-charcoal group-hover:text-brand-red transition-colors line-clamp-2">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-brand-red font-semibold uppercase tracking-wider mt-1">
                    Client: {exp.clientName}
                  </p>

                  <p className="text-xs text-brand-graphite mt-3 line-clamp-3 leading-relaxed">
                    {exp.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-charcoal group-hover:text-brand-red">
                  <span>View Case Study</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
