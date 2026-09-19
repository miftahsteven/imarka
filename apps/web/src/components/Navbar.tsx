'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowRight, PhoneCall } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { getNavigation, getSiteData } from '@/lib/api';

const DEFAULT_SERVICES_SUBITEMS = [
  {
    title: 'Branding & Marketing Communication',
    href: '/services/branding-marketing',
    desc: 'Media events, campaigns, PR, loyalty & brand activation.',
  },
  {
    title: 'Event & Experience Solutions',
    href: '/services/event-experience',
    desc: 'Conferences, summits, roadshows, product launches & exhibitions.',
  },
  {
    title: 'Training & People Development',
    href: '/services/training-development',
    desc: 'Frontliners Academy, leadership development & capability programs.',
  },
  {
    title: 'Procurement Solutions',
    href: '/services/procurement-solutions',
    desc: 'End-to-end production sourcing and operational project procurement.',
  },
];

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  subItems?: { title: string; href: string; desc: string }[];
}

const DEFAULT_NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    hasDropdown: true,
    subItems: DEFAULT_SERVICES_SUBITEMS,
  },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Insights', href: '/insights' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Our Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavItem[]>(DEFAULT_NAV_LINKS);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch dynamic manageable navigation items and site logo from CMS / database
  useEffect(() => {
    let isMounted = true;

    getSiteData()
      .then((data) => {
        if (isMounted && data?.site?.logoUrl) {
          setLogoUrl(data.site.logoUrl);
        }
      })
      .catch(() => null);

    getNavigation('HEADER')
      .then((items) => {
        if (!isMounted || !items || !Array.isArray(items) || items.length === 0) return;

        const dynamicLinks = items.map((item) => ({
          label: item.label,
          href: item.url,
          hasDropdown: item.url === '/services' || (item.children && item.children.length > 0),
          subItems:
            item.children && item.children.length > 0
              ? item.children.map((c) => ({
                  title: c.label,
                  href: c.url,
                  desc: '',
                }))
              : item.url === '/services'
              ? DEFAULT_SERVICES_SUBITEMS
              : undefined,
        }));

        setNavLinks(dynamicLinks);
      })
      .catch((err) => {
        console.warn('Could not load dynamic navigation, using fallback:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white py-4 border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group" onClick={closeMenus}>
          <BrandLogo variant="header" logoUrl={logoUrl} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors py-2 ${
                      isActive
                        ? 'text-brand-red border-b-2 border-brand-red'
                        : 'text-brand-charcoal hover:text-brand-red'
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        servicesDropdownOpen ? 'rotate-180 text-brand-red' : ''
                      }`}
                    />
                  </Link>

                  {/* Mega dropdown menu */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white rounded-xl shadow-2xl border border-gray-100 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-1 gap-1">
                        {link.subItems?.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="p-3 rounded-lg hover:bg-brand-light transition-all group/item"
                          >
                            <div className="flex items-center justify-between text-sm font-bold text-brand-charcoal group-hover/item:text-brand-red">
                              {sub.title}
                              <ArrowRight
                                size={14}
                                className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-brand-red"
                              />
                            </div>
                            <p className="text-xs text-brand-graphite mt-1 leading-relaxed">
                              {sub.desc}
                            </p>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                        <Link
                          href="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="text-xs font-bold text-brand-red hover:underline"
                        >
                          View All Services Overview →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors py-2 ${
                  isActive
                    ? 'text-brand-red border-b-2 border-brand-red'
                    : 'text-brand-charcoal hover:text-brand-red'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Contact */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-brand-redDark text-white font-semibold text-sm rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Let&apos;s Collaborate</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-brand-charcoal hover:text-brand-red focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[65px] bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={closeMenus}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden relative z-50 bg-white border-b border-gray-200 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300 max-h-[calc(100vh-75px)] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={closeMenus}
                  className={`block text-base font-semibold py-1.5 ${
                    pathname === link.href ? 'text-brand-red' : 'text-brand-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-brand-red/20">
                    {link.subItems?.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        onClick={closeMenus}
                        className="block text-xs text-brand-graphite hover:text-brand-red font-medium py-1"
                      >
                        • {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={closeMenus}
              className="w-full text-center py-3 bg-brand-red text-white font-bold text-sm rounded-lg shadow"
            >
              Let&apos;s Collaborate
            </Link>
            <a
              href="https://wa.me/628569529955"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 border border-brand-charcoal/20 text-brand-charcoal font-semibold text-sm rounded-lg flex items-center justify-center gap-2"
            >
              <PhoneCall size={16} />
              <span>Call: 08569529955</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
