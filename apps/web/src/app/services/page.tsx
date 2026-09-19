import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Megaphone, CalendarCheck, Users, PackageCheck } from 'lucide-react';
import FinalCtaBanner from '@/components/FinalCtaBanner';
import { getServices } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Comprehensive corporate solutions across Branding & Marketing, Event & Experience, Training & People Development, and Procurement Support.',
};

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const services = await getServices();

  const iconMap: Record<string, any> = {
    Megaphone,
    CalendarCheck,
    Users,
    PackageCheck,
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-brand-charcoal text-white py-20 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white/10 px-3 py-1 rounded-md">
            WHAT WE DO
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Integrated Corporate Solutions
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            From strategic narrative development to nationwide execution and human capability
            building.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {services?.map((service, index) => {
          const Icon = (service.iconName && iconMap[service.iconName]) || Megaphone;
          const isEven = index % 2 === 1;

          return (
            <div
              key={service.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Media (5 cols) */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-brand-charcoal">
                  <Image
                    src={service.heroImageUrl || '/images/hero-keynote.jpg'}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 text-brand-red flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Icon size={24} />
                  </div>
                </div>
              </div>

              {/* Description (7 cols) */}
              <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : ''}`}>
                <div className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider rounded-md">
                  Pillar 0{index + 1}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-charcoal">
                  {service.name}
                </h2>
                <p className="text-base text-brand-graphite leading-relaxed">
                  {service.fullDescription}
                </p>

                {/* Capabilities grid */}
                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/80 mb-3">
                    Core Capabilities:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.capabilities?.map((cap) => (
                      <div key={cap.id} className="flex items-center gap-2 text-xs sm:text-sm text-brand-graphite">
                        <CheckCircle2 size={16} className="text-brand-red shrink-0" />
                        <span>{cap.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm rounded-lg transition-all shadow hover:shadow-md"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <FinalCtaBanner />
    </div>
  );
}
