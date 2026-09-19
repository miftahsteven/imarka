import React from 'react';
import { Award, Briefcase, Layers, Sparkles } from 'lucide-react';

interface CredibilityProps {
  years?: string;
  industries?: string;
  delivery?: string;
  impact?: string;
}

export default function CredibilityStrip({
  years = '20+ Years',
  industries = 'Multi-Industry',
  delivery = 'End-to-End',
  impact = 'Impact Driven',
}: CredibilityProps) {
  const items = [
    {
      stat: years,
      label: 'Excellence & Experience',
      sub: 'Trusted partner for events & brand communications',
      icon: Award,
    },
    {
      stat: industries,
      label: 'Cross-Sector Reach',
      sub: 'Serving ministries, corporate, FMCG, banking & property',
      icon: Briefcase,
    },
    {
      stat: delivery,
      label: 'Strategy to Execution',
      sub: 'Turnkey concept ideation, staging, AV & management',
      icon: Layers,
    },
    {
      stat: impact,
      label: 'Meaningful Outcomes',
      sub: 'Creating deep connection and lasting stakeholder value',
      icon: Sparkles,
    },
  ];

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-4 p-2 sm:p-3 rounded-xl hover:bg-brand-light/50 transition-colors group hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors duration-200">
                <Icon size={24} />
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-brand-charcoal tracking-tight group-hover:text-brand-red transition-colors">
                  {item.stat}
                </span>
                <span className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mt-0.5">
                  {item.label}
                </span>
                <span className="block text-xs text-brand-graphite mt-1 leading-relaxed">
                  {item.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
