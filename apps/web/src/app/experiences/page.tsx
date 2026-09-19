import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, MapPin, ArrowRight, Search, Filter } from 'lucide-react';
import { getExperiences } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Experiences & Portfolio',
  description:
    'Explore over 20 years of flagship corporate events, national conferences, brand activations, and state symposiums.',
};

export const revalidate = 60;

interface ExperiencesPageProps {
  searchParams: Promise<{
    service?: string;
    industry?: string;
    year?: string;
    search?: string;
  }>;
}

export default async function ExperiencesPage({ searchParams }: ExperiencesPageProps) {
  const params = await searchParams;
  const experiences = await getExperiences(params);

  const servicesList = [
    { label: 'All Services', value: 'all' },
    { label: 'Event & Experience', value: 'Event' },
    { label: 'Branding & Marketing', value: 'Branding' },
    { label: 'Training & Development', value: 'Training' },
  ];

  const industriesList = [
    { label: 'All Industries', value: 'all' },
    { label: 'Government', value: 'Government' },
    { label: 'Corporate', value: 'Corporate' },
    { label: 'Financial Services', value: 'Financial' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'FMCG', value: 'FMCG' },
    { label: 'Energy & Environment', value: 'Energy' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-brand-charcoal text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white/10 px-3 py-1 rounded-md">
            PORTFOLIO & CASE STUDIES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Our Experiences
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            More than 20 years of delivering impactful events, high-resonance campaigns, and lasting
            connections.
          </p>
        </div>
      </section>

      {/* Filter and Content Area */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters Bar */}
        <div className="bg-brand-light p-6 rounded-2xl border border-gray-200/80 mb-12 space-y-4">
          <form method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                name="search"
                defaultValue={params.search || ''}
                placeholder="Search event, client, location..."
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              />
              <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
            </div>

            {/* Service Filter */}
            <div>
              <select
                name="service"
                defaultValue={params.service || 'all'}
                className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-brand-red"
              >
                {servicesList.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Filter */}
            <div>
              <select
                name="industry"
                defaultValue={params.industry || 'all'}
                className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-brand-red"
              >
                {industriesList.map((ind) => (
                  <option key={ind.value} value={ind.value}>
                    {ind.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Filter Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
              >
                <Filter size={16} />
                <span>Apply Filter</span>
              </button>
            </div>
          </form>
        </div>

        {/* Experiences Grid */}
        {experiences && experiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp) => (
              <Link
                key={exp.slug}
                href={`/experiences/${exp.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-60 w-full overflow-hidden bg-brand-charcoal">
                  <Image
                    src={exp.coverImageUrl}
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-transparent to-transparent" />
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

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-brand-graphite font-medium mb-1.5">
                      <MapPin size={13} className="text-brand-red shrink-0" />
                      <span className="truncate">{exp.location}</span>
                    </div>

                    <h2 className="text-lg font-bold text-brand-charcoal group-hover:text-brand-red transition-colors line-clamp-2">
                      {exp.title}
                    </h2>

                    <p className="text-xs text-brand-red font-semibold uppercase tracking-wider mt-1">
                      {exp.clientName}
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
        ) : (
          <div className="text-center py-20 bg-brand-light rounded-2xl border border-gray-200">
            <p className="text-base text-brand-graphite">
              No experiences match your filter criteria.
            </p>
            <Link
              href="/experiences"
              className="inline-block mt-4 text-xs font-bold text-brand-red hover:underline"
            >
              Reset Filters →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
