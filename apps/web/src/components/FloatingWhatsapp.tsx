'use client';

import React from 'react';
import Image from 'next/image';

export default function FloatingWhatsapp() {
  const whatsappUrl =
    'https://wa.me/628569529955?text=' +
    encodeURIComponent(
      'Halo IMARKA Megalo Indonesia, saya ingin berkonsultasi mengenai kebutuhan event / branding / training.'
    );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip hint on hover */}
      <span className="hidden sm:block mr-3 px-3.5 py-1.5 bg-brand-charcoal/95 backdrop-blur-sm text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap -translate-x-2 group-hover:translate-x-0 border border-white/10">
        Chat via WhatsApp
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 drop-shadow-[0_8px_20px_rgba(37,211,102,0.4)] hover:drop-shadow-[0_12px_28px_rgba(37,211,102,0.65)]"
        aria-label="Contact PT IMARKA MEGALO INDONESIA on WhatsApp"
      >
        {/* Pulsating live status badge */}
        <span className="absolute top-0 right-0 z-10 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-[#25D366] border-2 border-white shadow-sm"></span>
        </span>

        {/* Real Full Official WhatsApp Logo */}
        <Image
          src="/images/whatsapp-logo.png"
          alt="WhatsApp Official Logo"
          width={64}
          height={64}
          priority
          className="w-full h-full object-contain pointer-events-none"
        />
      </a>
    </div>
  );
}

