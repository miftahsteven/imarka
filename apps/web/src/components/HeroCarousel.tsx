'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSlide } from '@imarka/types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  slides?: HeroSlide[];
}

const defaultSlides: HeroSlide[] = [
  {
    id: 'default-1',
    eyebrow: 'EXPERIENCES THAT INSPIRE',
    headline: 'We Create Meaningful Connections That Move People and Drive Impact.',
    subheadline: 'Over 20 Years of Excellence in Events, Communication & Experiences. Turning Ideas into Impactful Experiences That Inspire Change.',
    primaryCtaText: 'Explore Our Experiences',
    primaryCtaUrl: '/experiences',
    secondaryCtaText: "Let's Collaborate",
    secondaryCtaUrl: '/contact',
    imageUrl: '/images/hero-keynote.jpg',
    order: 1,
    isActive: true,
  },
  {
    id: 'default-2',
    eyebrow: 'STRATEGIC BRANDING & ACTIVATION',
    headline: 'Brands That Connect. Campaigns That Deliver Results.',
    subheadline: 'Transforming corporate vision into high-engagement media events, roadshows, and multi-channel marketing campaigns.',
    primaryCtaText: 'Explore Branding',
    primaryCtaUrl: '/services/branding-marketing',
    secondaryCtaText: 'View Case Studies',
    secondaryCtaUrl: '/experiences',
    imageUrl: '/images/highlight-energizing-maluku-hd.jpg',
    order: 2,
    isActive: true,
  },
  {
    id: 'default-3',
    eyebrow: 'TRAINING & PEOPLE DEVELOPMENT',
    headline: 'People That Grow. Organizations That Excel.',
    subheadline: 'Empowering teams through tailored leadership development, corporate workshops, and impactful capability building.',
    primaryCtaText: 'Explore Training',
    primaryCtaUrl: '/services/training-development',
    secondaryCtaText: 'Contact Us',
    secondaryCtaUrl: '/contact',
    imageUrl: '/images/highlight-gef8-bali-hd.jpg',
    order: 3,
    isActive: true,
  },
];

export default function HeroCarousel({ slides = defaultSlides }: HeroCarouselProps) {
  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const current = activeSlides[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  return (
    <section className="relative w-full h-[88vh] min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] max-h-[860px] bg-brand-charcoal overflow-hidden pt-16 pb-20 sm:pb-24">
      {/* Background Image Layer with Gradient Overlay */}
      {activeSlides.map((slide, index) => {
        const isCurrent = index === currentIndex;
        return (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.imageUrl}
                alt={slide.headline}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? 'high' : 'low'}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="object-cover object-center scale-105 transition-transform duration-[10000ms]"
              />
              {/* Cinematic Charcoal Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/70 to-brand-black/40" />
              {/* Subtle Bottom Vignette */}
              <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-white/90 via-white/30 to-transparent pointer-events-none" />
            </div>
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-left duration-700">
          {/* Eyebrow Label with Brand Red Accent */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-red/90 text-white text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-sm shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>{current.eyebrow}</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] sm:leading-[1.12] tracking-tight drop-shadow-sm">
            {current.headline}
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-lg text-gray-200 leading-relaxed max-w-2xl drop-shadow line-clamp-3 sm:line-clamp-none">
            {current.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href={current.primaryCtaUrl || '/experiences'}
              className="px-7 py-3 sm:py-3.5 bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center"
            >
              <span>{current.primaryCtaText}</span>
              <ArrowRight size={18} />
            </Link>

            {current.secondaryCtaText && (
              <Link
                href={current.secondaryCtaUrl || '/contact'}
                className="px-7 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm sm:text-base rounded-full backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center"
              >
                <span>{current.secondaryCtaText}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Previous Button (Left Side of Slider) */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-brand-red text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/20 shadow-2xl hover:scale-110 active:scale-95 group cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Next Button (Right Side of Slider) */}
      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-brand-red text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/20 shadow-2xl hover:scale-110 active:scale-95 group cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Centered Slide Dots & Line Indicators */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-charcoal/70 backdrop-blur-md border border-white/20 shadow-2xl">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-10 bg-brand-red shadow-sm'
                  : 'w-2.5 bg-white/45 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
