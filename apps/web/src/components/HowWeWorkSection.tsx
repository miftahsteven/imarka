import React from 'react';
import { Compass, Lightbulb, Settings2, Target } from 'lucide-react';

export default function HowWeWorkSection() {
  const steps = [
    {
      step: '01',
      title: 'Strategic Thinking',
      desc: 'Deep discovery into client objectives, audience psychology, and institutional context to build a solid strategic foundation.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Creative Ideas',
      desc: 'Transforming strategy into compelling narratives, dynamic stage architecture, engaging activations, and high-impact concepts.',
      icon: Lightbulb,
    },
    {
      step: '03',
      title: 'Flawless Execution',
      desc: 'Precision choreography, rigorous protocol management, cutting-edge AV technology, and proactive crisis-proof operational flow.',
      icon: Settings2,
    },
    {
      step: '04',
      title: 'Meaningful Impact',
      desc: 'Delivering outcomes that exceed KPIs, cement lasting connections, and leave participants genuinely inspired to act.',
      icon: Target,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-brand-charcoal text-white relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white/10 px-3 py-1 rounded-md">
            OUR PROVEN METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            How We Work
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            A battle-tested 4-pillar methodology honed across 20+ years of delivering high-stakes
            corporate and institutional experiences.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-brand-red/80 via-white/20 to-brand-red/80 -translate-y-12 z-0" />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:bg-white/10 hover:border-brand-red/50 transition-all duration-300 group hover:-translate-y-1 backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-red flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Icon size={26} />
                    </div>
                    <span className="text-3xl font-extrabold text-white/20 group-hover:text-brand-red/60 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-brand-red transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-xs font-bold uppercase tracking-wider text-brand-red flex items-center gap-1">
                  <span>Step {item.step}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
