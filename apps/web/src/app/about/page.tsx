import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Award, Target, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import FinalCtaBanner from '@/components/FinalCtaBanner';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about IMARKA Megalo Indonesia — over 20 years of excellence in events, marketing communication, and people development.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Strategic Precision',
      desc: 'We anchor every concept in rigorous situational analysis and clear business objectives.',
    },
    {
      title: 'Creative Excellence',
      desc: 'We transform corporate narratives into compelling, emotionally resonant spatial and visual experiences.',
    },
    {
      title: 'Flawless Execution',
      desc: 'We operate with zero-defect discipline across staging, protocol, audiovisual, and crowd management.',
    },
    {
      title: 'Meaningful Impact',
      desc: 'We focus on long-term relationships, measurable outcomes, and lasting stakeholder trust.',
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-brand-charcoal text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero-keynote.jpg"
            alt="IMARKA About Header"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white/10 px-3 py-1 rounded-md">
            ABOUT US
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Over 20 Years of Excellence
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Turning Ideas into Impactful Experiences That Inspire Change.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal leading-tight">
              Building Connections That Move People and Drive Results
            </h2>
            <div className="space-y-4 text-base text-brand-graphite leading-relaxed">
              <p>
                <strong className="text-brand-charcoal font-semibold">
                  IMARKA Megalo Indonesia
                </strong>{' '}
                was established with a bold conviction: that live experiences and strategic
                communication possess an unmatched power to shape perception, align stakeholders, and
                accelerate organizational goals.
              </p>
              <p>
                Across two decades of continuous evolution, we have partnered with government
                ministries, multinational corporations, state enterprises, financial institutions, and
                global development agencies to orchestrate flagship symposiums, high-impact brand
                activations, and transformative people development programs.
              </p>
              <p>
                Our strength lies in the seamless integration between high-level strategic advisory and
                end-to-end production mastery—ensuring no vision is compromised between the boardroom
                and the stage.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <div className="border-l-4 border-brand-red pl-4">
                <div className="text-3xl font-extrabold text-brand-charcoal">2003+</div>
                <div className="text-xs text-brand-graphite font-semibold uppercase">
                  Heritage of Trust
                </div>
              </div>
              <div className="border-l-4 border-brand-red pl-4">
                <div className="text-3xl font-extrabold text-brand-charcoal">8+</div>
                <div className="text-xs text-brand-graphite font-semibold uppercase">
                  Core Industries Served
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-brand-charcoal">
              <Image
                src="/images/event-arup-hd.jpg"
                alt="IMARKA Team and Execution"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white px-3 py-1 rounded-md border border-gray-200">
              OUR GUIDING PHILOSOPHY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight">
              Values That Drive Every Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-xl shadow-sm border border-gray-200/80 flex flex-col justify-between hover:border-brand-red/40 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center font-bold text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-brand-charcoal">{v.title}</h3>
                  <p className="text-sm text-brand-graphite mt-2 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaBanner />
    </div>
  );
}
