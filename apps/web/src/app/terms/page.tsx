import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms of Service for PT IMARKA MEGALO INDONESIA.',
};

export default function TermsPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="bg-brand-charcoal text-white py-16 text-center">
        <h1 className="text-4xl font-extrabold">Terms & Conditions</h1>
        <p className="text-gray-300 text-sm mt-2">Effective as of September 2026</p>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-brand-graphite space-y-6 text-sm leading-relaxed">
        <p>
          Welcome to the official website of PT IMARKA MEGALO INDONESIA (&ldquo;IMARKA&rdquo;). By accessing and utilizing this website, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-xl font-bold text-brand-charcoal pt-4">1. Intellectual Property</h2>
        <p>
          All trademarks, event concepts, photographs, graphics, text, and multimedia assets published on this website are the intellectual property of PT IMARKA MEGALO INDONESIA or their respective client owners and are protected by applicable intellectual property laws.
        </p>

        <h2 className="text-xl font-bold text-brand-charcoal pt-4">2. Commercial Inquiries & Quotations</h2>
        <p>
          Information submitted via our inquiry forms is treated confidentially and utilized to evaluate project scope and prepare formal commercial proposals. Formal commitments are established upon the execution of signed service agreements.
        </p>

        <h2 className="text-xl font-bold text-brand-charcoal pt-4">3. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of the Republic of Indonesia.
        </p>
      </section>
    </div>
  );
}
