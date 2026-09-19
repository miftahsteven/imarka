'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const trackPage = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source') || urlParams.get('ref') || urlParams.get('source') || '';
        const referrer = document.referrer || '';
        const width = window.innerWidth;
        const device = width < 768 ? 'MOBILE' : width < 1024 ? 'TABLET' : 'DESKTOP';

        const apiUrl = process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/public/track`
          : 'http://localhost:4000/api/v1/public/track';

        await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            pageTitle: document.title || 'IMARKA MEGALO INDONESIA',
            referrer,
            utmSource,
            device,
          }),
        }).catch(() => {});
      } catch (err) {
        // Non-blocking telemetry
      }
    };

    // Small delay to let document.title populate
    const timer = setTimeout(trackPage, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
