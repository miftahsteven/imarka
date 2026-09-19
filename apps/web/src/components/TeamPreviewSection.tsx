import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TeamMember } from '@imarka/types';
import { ArrowRight, Mail } from 'lucide-react';

interface TeamProps {
  members?: TeamMember[];
}

export default function TeamPreviewSection({ members }: TeamProps) {
  const leadership = members && members.length > 0 ? members : [];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-brand-light px-3 py-1 rounded-md border border-gray-200">
            EXPERIENCED MINDS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight">
            The People Behind IMARKA MEGALO
          </h2>
          <p className="text-base sm:text-lg text-brand-graphite">
            A passionate and experienced team dedicated to delivering extraordinary experiences with
            excellence and integrity.
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadership.map((member) => (
            <div
              key={member.name}
              className="bg-brand-light rounded-2xl overflow-hidden border border-gray-200/70 p-6 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40"
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md bg-brand-charcoal">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xl font-bold text-brand-charcoal group-hover:text-brand-red transition-colors">
                {member.name}
              </h3>
              <div className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider rounded-full mt-1.5">
                {member.role}
              </div>

              <p className="text-xs sm:text-sm text-brand-graphite mt-3 leading-relaxed">
                {member.bio}
              </p>

              {member.email && (
                <div className="mt-4 pt-3 border-t border-gray-200/80 w-full flex items-center justify-center gap-1.5 text-xs text-brand-graphite font-medium">
                  <Mail size={13} className="text-brand-red" />
                  <a href={`mailto:${member.email}`} className="hover:text-brand-red transition-colors">
                    {member.email}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View Full Structure CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-6 py-3 border border-brand-charcoal hover:bg-brand-charcoal hover:text-white text-brand-charcoal font-bold text-sm rounded-full transition-all"
          >
            <span>Explore Full Team & Production Structure</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
