import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Mail, Phone, Sparkles } from 'lucide-react';
import FinalCtaBanner from '@/components/FinalCtaBanner';
import { getTeam } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Our Team & Production Divisions',
  description:
    'Meet the directors and production leads powering IMARKA Megalo Indonesia.',
};

export const revalidate = 60;

export default async function TeamPage() {
  const teamData = await getTeam();
  const leadership = teamData?.leadership || [];
  const production = teamData?.production || [];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-brand-charcoal text-white py-16 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white/10 px-3 py-1 rounded-md">
            EXPERIENCE & INTEGRITY
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            The People Behind IMARKA
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            A passionate and experienced team dedicated to delivering extraordinary experiences with
            excellence and integrity.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-red">
            CORE DIRECTORS
          </span>
          <h2 className="text-3xl font-extrabold text-brand-charcoal">
            Executive Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {leadership.map((member) => (
            <div
              key={member.name}
              className="bg-brand-light rounded-2xl overflow-hidden border border-gray-200/80 p-7 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-44 h-44 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md bg-brand-charcoal">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-2xl font-bold text-brand-charcoal group-hover:text-brand-red transition-colors">
                {member.name}
              </h3>
              <div className="inline-block px-3.5 py-1 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded-full mt-2 shadow-sm">
                {member.role}
              </div>

              <p className="text-sm text-brand-graphite mt-4 leading-relaxed">
                {member.bio}
              </p>

              {member.email && (
                <div className="mt-5 pt-4 border-t border-gray-200 w-full flex items-center justify-center gap-2 text-xs text-brand-graphite font-medium">
                  <Mail size={14} className="text-brand-red" />
                  <a href={`mailto:${member.email}`} className="hover:text-brand-red transition-colors">
                    {member.email}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Production Divisions Structure */}
      <section className="py-20 bg-brand-light border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-red">
              SPECIALIZED CAPABILITY
            </span>
            <h2 className="text-3xl font-extrabold text-brand-charcoal">
              Our Production Divisions
            </h2>
            <p className="text-sm text-brand-graphite">
              Multi-disciplinary technical, stage, and logistics teams executing with millimeter
              precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {production.map((div) => (
              <div
                key={div.name}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-brand-red/40 transition-all group"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-brand-red mb-1">
                  {div.role}
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal group-hover:text-brand-red transition-colors">
                  {div.name}
                </h3>
                <p className="text-xs sm:text-sm text-brand-graphite mt-2 leading-relaxed">
                  {div.bio}
                </p>
              </div>
            ))}
          </div>

          {/* Inspirational Tagline */}
          <div className="mt-16 text-center italic text-brand-charcoal font-semibold text-lg max-w-xl mx-auto">
            &ldquo;Together, We Create Experiences That Inspire, Connect and Make a Difference.&rdquo;
          </div>
        </div>
      </section>

      <FinalCtaBanner />
    </div>
  );
}
