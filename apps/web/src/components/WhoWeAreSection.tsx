import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface WhoWeAreProps {
  data?: {
    title?: string;
    paragraphs?: string[];
    highlightImage?: string;
    highlights?: string[];
    badgeTrackRecord?: string;
    badgeSubtext?: string;
    floatingBadgeNumber?: string;
    floatingBadgeLabel?: string;
    floatingBadgeSubtext?: string;
  };
}

export default function WhoWeAreSection({ data }: WhoWeAreProps) {
  const highlights = data?.highlights || [
    'Over 20 years of proven track record across Indonesia',
    'Strategic synergy between marketing, live production, and training',
    'Experience handling national summits, state dignitaries, and corporate giants',
    'Flawless on-ground technical, protocol, and artistic choreography',
  ];

  const title = data?.title || 'IMARKA MEGALO INDONESIA';
  const paragraphs = data?.paragraphs && data.paragraphs.length > 0 ? data.paragraphs : [
    'IMARKA Megalo Indonesia is a full-service experience and marketing solutions company with more than 20 years of proven track record in delivering impactful programs that engage audiences and create lasting value.',
    'We combine strategic thinking, creative ideas, and flawless execution to produce experiences that inspire, educate, and drive results across government bodies, multinational enterprises, and consumer brands.',
  ];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-brand-light px-3 py-1 rounded-md border border-brand-red/10">
              WHO WE ARE
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal leading-tight">
              {title}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-brand-graphite leading-relaxed">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-brand-red shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-brand-charcoal">{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-charcoal hover:bg-brand-red text-white font-bold text-sm rounded-lg transition-all shadow hover:shadow-md text-center"
              >
                <span>Discover IMARKA</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/experiences"
                className="text-sm font-bold text-brand-red hover:text-brand-redDark transition-colors flex items-center justify-center sm:justify-start gap-1.5 py-1"
              >
                <span>Explore 20+ Years Portfolio</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: Curated Image & Badge Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-brand-charcoal aspect-[4/3]">
              <Image
                src={data?.highlightImage || '/images/event-commonwealth-hd.jpg'}
                alt="IMARKA Megalo Live Production"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase font-bold tracking-wider text-brand-red bg-white px-2 py-0.5 rounded">
                  {data?.badgeTrackRecord || '20+ Years Track Record'}
                </span>
                <p className="text-sm font-semibold mt-1 drop-shadow">
                  {data?.badgeSubtext || 'Over two decades of trust, innovation, and unforgettable experiences.'}
                </p>
              </div>
            </div>

            {/* Decorative Angled Float Card */}
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-brand-red text-white p-5 rounded-xl shadow-xl max-w-[220px] hidden sm:block">
              <div className="text-3xl font-extrabold tracking-tight">
                {data?.floatingBadgeNumber || '20+'}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider mt-1">
                {data?.floatingBadgeLabel || 'Years of Trust'}
              </div>
              <p className="text-[11px] text-white/90 mt-1">
                {data?.floatingBadgeSubtext || 'Creating connections that inspire change.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
