import React from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import CredibilityStrip from '@/components/CredibilityStrip';
import WhoWeAreSection from '@/components/WhoWeAreSection';
import CoreServicesSection from '@/components/CoreServicesSection';
import HowWeWorkSection from '@/components/HowWeWorkSection';
import FeaturedExperiencesSection from '@/components/FeaturedExperiencesSection';
import IndustriesSection from '@/components/IndustriesSection';
import LatestHighlightSection from '@/components/LatestHighlightSection';
import LatestInsightsSection from '@/components/LatestInsightsSection';
import TeamPreviewSection from '@/components/TeamPreviewSection';
import FinalCtaBanner from '@/components/FinalCtaBanner';
import { getHomeData } from '@/lib/api';

export const revalidate = 60;

export default async function HomePage() {
  const homeData = await getHomeData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Carousel */}
      <HeroCarousel slides={homeData?.heroSlides} />

      {/* 2. Credibility Strip */}
      <CredibilityStrip
        years={homeData?.credibility?.yearsOfExperience}
        industries={homeData?.credibility?.industriesLabel}
        delivery={homeData?.credibility?.deliveryLabel}
        impact={homeData?.credibility?.impactLabel}
      />

      {/* 3. Who We Are */}
      <WhoWeAreSection />

      {/* 4. Core Services */}
      <CoreServicesSection />

      {/* 5. How We Work (Process Flow) */}
      <HowWeWorkSection />

      {/* 6. Featured Experiences */}
      <FeaturedExperiencesSection experiences={homeData?.featuredExperiences} />

      {/* 7. Industries We Serve */}
      <IndustriesSection />

      {/* 8. Latest Highlight */}
      <LatestHighlightSection highlight={homeData?.latestHighlight} />

      {/* 9. Latest Insights */}
      <LatestInsightsSection posts={homeData?.latestInsights} />

      {/* 10. Team Preview */}
      <TeamPreviewSection members={homeData?.leadershipTeam} />

      {/* 11. Final CTA Banner */}
      <FinalCtaBanner />
    </div>
  );
}
