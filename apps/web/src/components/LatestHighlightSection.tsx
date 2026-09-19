import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight, Flame } from 'lucide-react';

interface HighlightProps {
  highlight?: {
    title: string;
    date: string;
    location: string;
    description: string;
    imageUrl: string;
    slug: string;
  };
}

const defaultHighlight = {
  title: 'Energizing Maluku',
  date: '12 September 2026',
  location: "Governor's Building, Ambon",
  description:
    'Strategic high-level regional initiative and multi-stakeholder symposium connecting public leadership, clean energy transition, and local communities to drive accelerated sustainable growth across Maluku province.',
  imageUrl: '/images/highlight-energizing-maluku-hd.jpg',
  slug: 'energizing-maluku',
};

export default function LatestHighlightSection({ highlight = defaultHighlight }: HighlightProps) {
  const data = highlight || defaultHighlight;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-charcoal to-brand-black text-white rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (7 cols) */}
            <div className="p-6 sm:p-10 lg:p-14 lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-bold uppercase tracking-wider">
                <Flame size={14} className="animate-bounce" />
                <span>LATEST HIGHLIGHT</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {data.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-brand-red" />
                  <span>{data.date}</span>
                </div>
                <span className="text-white/40">•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-brand-red" />
                  <span>{data.location}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {data.description}
              </p>

              <div className="pt-2">
                <Link
                  href={`/experiences/${data.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto text-center"
                >
                  <span>Explore Highlight Story</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Media (5 cols) */}
            <div className="lg:col-span-5 h-80 lg:h-full min-h-[380px] relative">
              <Image
                src={data.imageUrl}
                alt={data.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-charcoal/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
