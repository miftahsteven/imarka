import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  variant?: 'header' | 'footer' | 'compact';
  showText?: boolean;
  logoUrl?: string | null;
}

export default function BrandLogo({
  className = '',
  variant = 'header',
  showText = true,
  logoUrl,
}: BrandLogoProps) {
  const isFooter = variant === 'footer';
  const isCompact = variant === 'compact';

  // Logo sizing: "ukuran yang sesuai dengan header. Jangan terlalu kecil."
  // Header: 48px on mobile, 56px on desktop for high-impact presence
  const sizeClasses = isCompact
    ? 'w-10 h-10'
    : isFooter
    ? 'w-12 h-12'
    : 'w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14';

  const imagePixelSize = isCompact ? 40 : isFooter ? 48 : 56;

  // Grey text styling per word vertical arrangement
  const textColorClasses = isFooter
    ? {
        word1: 'text-gray-200',
        word2: 'text-gray-300',
        word3: 'text-gray-400',
      }
    : {
        word1: 'text-gray-700',
        word2: 'text-gray-600',
        word3: 'text-gray-500',
      };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Standalone Transparent Logo Mark */}
      <div className={`relative shrink-0 ${sizeClasses} transition-transform duration-200 group-hover:scale-105`}>
        <Image
          src={logoUrl || '/images/imarka-symbol.png'}
          alt="Imarka Megalo Indonesia"
          width={imagePixelSize}
          height={imagePixelSize}
          priority={variant === 'header'}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Standalone Vertical Text Per Word in Grey */}
      {showText && (
        <div
          className={`flex flex-col justify-center leading-[1.12] transition-colors duration-200 ${
            isCompact
              ? 'text-[11px]'
              : 'text-[12px] sm:text-[13px] md:text-[14px]'
          }`}
          aria-label="Imarka Megalo Indonesia"
        >
          <span className={`font-extrabold tracking-wide ${textColorClasses.word1}`}>
            Imarka
          </span>
          <span className={`font-bold tracking-wide ${textColorClasses.word2}`}>
            Megalo
          </span>
          <span className={`font-semibold tracking-wider ${textColorClasses.word3}`}>
            Indonesia
          </span>
        </div>
      )}
    </div>
  );
}
