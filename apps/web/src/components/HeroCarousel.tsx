'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSlide } from '@imarka/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <section className="relative w-full h-[88vh] min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] max-h-[860px] bg-brand-charcoal overflow-hidden pt-16">
      {/* Background Image Layer */}
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
                className="object-cover object-center"
              />
              {/* Clean brand overlay — charcoal ke kanan transparan */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/85 via-brand-charcoal/50 to-brand-charcoal/10" />
            </div>
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-12 pl-14 sm:pl-20 lg:pl-16 flex items-center">
        <div className="max-w-lg sm:max-w-xl lg:max-w-2xl">
          {current.primaryCtaUrl ? (
            <Link
              href={current.primaryCtaUrl}
              className="inline-block group focus:outline-hidden"
            >
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-extrabold text-white leading-[1.14] tracking-tight drop-shadow-lg line-clamp-3 group-hover:text-white/90 transition-colors">
                {current.headline}
              </h1>
            </Link>
          ) : (
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-extrabold text-white leading-[1.14] tracking-tight drop-shadow-lg line-clamp-3">
              {current.headline}
            </h1>
          )}
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

      {/* Slide Indicators — bottom right, minimal */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? 'w-8 h-1.5 bg-brand-red'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
