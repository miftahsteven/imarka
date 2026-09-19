import React from 'react';
import {
  Building2,
  Landmark,
  PiggyBank,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Home,
  Leaf,
} from 'lucide-react';

export default function IndustriesSection() {
  const industries = [
    { name: 'Government & Public Sector', icon: Landmark, desc: 'Ministries, provincial administrations, public sector initiatives' },
    { name: 'Corporate & Enterprise', icon: Building2, desc: 'Multinational corporations, conglomerates, enterprise operations' },
    { name: 'Financial Services', icon: PiggyBank, desc: 'Commercial banks, life insurance companies, investment summits' },
    { name: 'Healthcare & Pharma', icon: HeartPulse, desc: 'Medical associations, pharmaceutical leaders, public health activations' },
    { name: 'Education & Youth', icon: GraduationCap, desc: 'Universities, academic summits, student engagement roadshows' },
    { name: 'FMCG & Retail', icon: ShoppingBag, desc: 'Fast-moving consumer goods, nationwide sampling & experiential retail' },
    { name: 'Property & Engineering', icon: Home, desc: 'Real estate developers, architecture summits, civil engineering conferences' },
    { name: 'Energy & Environment', icon: Leaf, desc: 'Clean energy symposiums, environmental dialogues, sustainability forums' },
  ];

  return (
    <section className="py-20 bg-brand-light border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white px-3 py-1 rounded-md border border-gray-200">
            EXPERTISE ACROSS SECTORS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight">
            Industries We Serve
          </h2>
          <p className="text-sm sm:text-base text-brand-graphite">
            Tailoring each engagement to the specific regulatory, cultural, and strategic nuances of
            diverse industries.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-brand-red/50 transition-all duration-200 group flex flex-col items-center text-center hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-light group-hover:bg-brand-red group-hover:text-white text-brand-red flex items-center justify-center transition-colors mb-3">
                  <Icon size={22} />
                </div>
                <h3 className="text-sm font-bold text-brand-charcoal group-hover:text-brand-red transition-colors">
                  {ind.name}
                </h3>
                <p className="text-xs text-brand-graphite mt-1.5 line-clamp-2 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
