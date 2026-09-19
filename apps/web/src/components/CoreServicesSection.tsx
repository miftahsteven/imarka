import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Megaphone, CalendarCheck, Users, PackageCheck } from 'lucide-react';

export default function CoreServicesSection() {
  const pillars = [
    {
      slug: 'branding-marketing',
      title: 'Branding & Marketing Communication',
      shortDesc:
        'Strategic branding and communication solutions designed to build relevance, strengthen brand presence, and connect meaningfully with audiences.',
      image: '/images/event-arup-hd.jpg',
      icon: Megaphone,
      items: [
        'Strategic Marketing Communication',
        'Media Event, Press Conference & Trip',
        'Direct Marketing & Loyalty Programs',
        'Sampling, In-Store & Booth Production',
      ],
    },
    {
      slug: 'event-experience',
      title: 'Event & Experience Solutions',
      shortDesc:
        'From state-level summits and product launches to exhibitions and corporate gatherings, we design and execute seamless experiences from concept to completion.',
      image: '/images/highlight-energizing-maluku-hd.jpg',
      icon: CalendarCheck,
      items: [
        'Conferences, Seminars & Conventions',
        'Product Reveals & Brand Launches',
        'Annual Corporate Awards & Galas',
        'Exhibitions & National Roadshows',
      ],
    },
    {
      slug: 'training-development',
      title: 'Training & People Development',
      shortDesc:
        'Training, leadership development, workshops, and capability programs designed to help teams and organizations reach maximum potential.',
      image: '/images/event-commonwealth-hd.jpg',
      icon: Users,
      items: [
        'Frontliners Academy & Service Excellence',
        'Executive Leadership Development',
        'Interactive Team Capability Workshops',
        'Custom Experiential Learning Retreats',
      ],
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white px-3 py-1 rounded-md border border-gray-200">
            OUR CORE SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal mt-3 tracking-tight">
            Ideas Into Experiences. Experiences Into Impact.
          </h2>
          <p className="text-base sm:text-lg text-brand-graphite mt-3 leading-relaxed">
            Four integrated disciplines tailored to solve complex brand, engagement, and capability
            challenges with strategic clarity and production mastery.
          </p>
        </div>

        {/* 3 Primary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1 border border-gray-100"
              >
                {/* Image Header */}
                <div className="relative h-56 w-full overflow-hidden bg-brand-charcoal">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/20 to-transparent" />
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-red shadow-lg group-hover:bg-brand-red group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-brand-charcoal group-hover:text-brand-red transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-brand-graphite mt-3 leading-relaxed">
                      {p.shortDesc}
                    </p>

                    {/* Capabilities Bullet List */}
                    <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                        Capabilities Include:
                      </div>
                      <ul className="space-y-1.5 text-xs text-brand-graphite">
                        {p.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                      href={`/services/${p.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:text-brand-redDark group/link"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight
                        size={16}
                        className="group-hover/link:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Card: Procurement Solutions */}
        <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200/80 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-brand-red/40 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
              <PackageCheck size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red bg-brand-red/10 px-2 py-0.5 rounded">
                  Supporting Capability
                </span>
                <h3 className="text-lg font-bold text-brand-charcoal">
                  Procurement Solutions
                </h3>
              </div>
              <p className="text-sm text-brand-graphite mt-1 max-w-3xl">
                End-to-end procurement support for events, specialized corporate projects, and
                operational needs with transparency, speed, and trusted supplier networks.
              </p>
            </div>
          </div>
          <Link
            href="/services/procurement-solutions"
            className="shrink-0 px-5 py-2.5 bg-brand-light hover:bg-brand-red hover:text-white text-brand-charcoal font-bold text-xs rounded-lg transition-all flex items-center gap-2"
          >
            <span>Learn More</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
