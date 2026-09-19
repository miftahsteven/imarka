import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { getNavigation, getSiteData } from '@/lib/api';

const DEFAULT_SERVICES_LINKS = [
  { label: 'Branding & Marketing', url: '/services/branding-marketing' },
  { label: 'Event & Experience', url: '/services/event-experience' },
  { label: 'Training & Development', url: '/services/training-development' },
  { label: 'Procurement Support', url: '/services/procurement-solutions' },
];

const DEFAULT_COMPANY_LINKS = [
  { label: 'About IMARKA', url: '/about' },
  { label: 'Case Studies / Portfolio', url: '/experiences' },
  { label: 'Leadership & Production Team', url: '/team' },
  { label: 'Visual Archive / Gallery', url: '/gallery' },
  { label: 'Corporate Insights', url: '/insights' },
  { label: 'Contact & Inquiry', url: '/contact' },
];

const DEFAULT_LEGAL_LINKS = [
  { label: 'Privacy Policy', url: '/privacy-policy' },
  { label: 'Terms & Conditions', url: '/terms' },
];

export default async function Footer() {
  const [servicesData, companyData, legalData, siteData] = await Promise.all([
    getNavigation('FOOTER_SERVICES').catch(() => null),
    getNavigation('FOOTER_COMPANY').catch(() => null),
    getNavigation('FOOTER_LEGAL').catch(() => null),
    getSiteData().catch(() => null),
  ]);

  const site = siteData?.site;

  const servicesLinks =
    servicesData && Array.isArray(servicesData) && servicesData.length > 0
      ? servicesData.map((item) => ({ label: item.label, url: item.url }))
      : DEFAULT_SERVICES_LINKS;

  const companyLinks =
    companyData && Array.isArray(companyData) && companyData.length > 0
      ? companyData.map((item) => ({ label: item.label, url: item.url }))
      : DEFAULT_COMPANY_LINKS;

  const legalLinks =
    legalData && Array.isArray(legalData) && legalData.length > 0
      ? legalData.map((item) => ({ label: item.label, url: item.url }))
      : DEFAULT_LEGAL_LINKS;

  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-8 border-t-4 border-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <BrandLogo variant="footer" logoUrl={site?.logoWhiteUrl || site?.logoUrl} />
            </Link>
            <p className="text-sm font-semibold tracking-wide text-brand-red uppercase">
              {site?.tagline || 'EXPERIENCES THAT INSPIRE'}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed pr-6">
              {site?.description ||
                'We Create Meaningful Connections That Move People and Drive Impact. Over 20 Years of Excellence in Events, Communication & Experiences. Turning ideas into impactful experiences that inspire change.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={site?.socialInstagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-brand-red transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={site?.socialLinkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-brand-red transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Services Col */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-brand-red pl-2">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {servicesLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.url}
                    className="hover:text-brand-red transition-colors flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-xs text-brand-red hover:underline font-semibold mt-1 inline-block">
                  View All Capabilities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-brand-red pl-2">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.url} className="hover:text-brand-red transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-brand-red pl-2">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="text-brand-red shrink-0 mt-0.5" />
                <a href={`mailto:${site?.contactEmail || 'emmy@imarka-megalo.com'}`} className="hover:text-white transition-colors">
                  {site?.contactEmail || 'emmy@imarka-megalo.com'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="text-brand-red shrink-0 mt-0.5" />
                <a href={`tel:${site?.contactPhone || '08569529955'}`} className="hover:text-white transition-colors">
                  {site?.contactPhone || '08569529955'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-brand-red shrink-0 mt-0.5" />
                <span>{site?.address || 'Jakarta & Regional Strategic Operations, Indonesia'}</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block px-4 py-2 bg-brand-red/90 hover:bg-brand-red text-white text-xs font-bold rounded tracking-wide transition-all"
                >
                  START A CONVERSATION
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} PT IMARKA MEGALO INDONESIA. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {legalLinks.map((item) => (
              <Link key={item.label} href={item.url} className="hover:text-gray-200 transition-colors">
                {item.label}
              </Link>
            ))}
            <Link
              href="/webpanel"
              className="text-gray-400 hover:text-brand-red transition-colors"
            >
              CMS Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
