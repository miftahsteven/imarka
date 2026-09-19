import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function FinalCtaBanner() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-r from-brand-redDark via-brand-red to-brand-redDark text-white relative overflow-hidden">
      {/* Decorative Brand Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-black/20 blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          TOGETHER, WE INSPIRE
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Let&apos;s Create an Experience That Inspires.
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/90 leading-relaxed font-normal">
          Whether you are launching a product, hosting an international conference, or developing your workforce, we bring over 20 years of proven expertise.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white text-brand-charcoal font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5 text-center"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="https://wa.me/628569529955"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-black/20 hover:bg-black/40 border border-white/40 text-white font-semibold text-sm sm:text-base rounded-full transition-all flex items-center justify-center gap-2.5 backdrop-blur-sm hover:-translate-y-0.5 text-center"
          >
            <Image
              src="/images/whatsapp-logo.png"
              alt="WhatsApp"
              width={22}
              height={22}
              className="w-5 h-5 object-contain"
            />
            <span>Chat via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
