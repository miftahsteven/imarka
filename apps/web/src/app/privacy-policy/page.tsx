import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for PT IMARKA MEGALO INDONESIA.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="bg-brand-charcoal text-white py-16 text-center">
        <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
        <p className="text-gray-300 text-sm mt-2">Last updated: September 2026</p>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-brand-graphite space-y-6 text-sm leading-relaxed">
        <p>
          PT IMARKA MEGALO INDONESIA (&ldquo;IMARKA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy and ensuring your personal data is handled responsibly and in compliance with applicable Indonesian laws.
        </p>

        <h2 className="text-xl font-bold text-brand-charcoal pt-4">1. Information We Collect</h2>
        <p>
          We collect information you provide directly through our inquiry forms, consultation requests, and email communications, including your full name, organization, professional email address, phone number, and project specifications.
        </p>

        <h2 className="text-xl font-bold text-brand-charcoal pt-4">2. How We Use Your Information</h2>
        <p>
          We use the information we collect solely for business communication, responding to RFPs, delivering contracted event and training services, and improving our corporate offerings. We do not sell, rent, or trade your personal information with third parties for commercial marketing purposes.
        </p>

        <h2 className="text-xl font-bold text-brand-charcoal pt-4">3. Data Security</h2>
        <p>
          We implement technical and organizational security standards to safeguard your information against unauthorized access, loss, or disclosure.
        </p>

        <h2 className="text-xl font-bold text-brand-charcoal pt-4">4. Contacting Us</h2>
        <p>
          For questions regarding this policy, please reach out to us at{' '}
          <a href="mailto:emmy@imarka-megalo.com" className="text-brand-red font-semibold hover:underline">
            emmy@imarka-megalo.com
          </a>.
        </p>
      </section>
    </div>
  );
}
