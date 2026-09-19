import { MetadataRoute } from 'next';
import { getExperiences, getServices, getInsights, getCustomPages } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imarka-megalo.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const [services, experiences, insights, customPages] = await Promise.all([
      getServices(),
      getExperiences(),
      getInsights(),
      getCustomPages(),
    ]);

    if (customPages && Array.isArray(customPages)) {
      customPages.forEach((p) => {
        dynamicRoutes.push({
          url: `${baseUrl}/pages/${p.slug}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }

    if (services && Array.isArray(services)) {
      services.forEach((s) => {
        dynamicRoutes.push({
          url: `${baseUrl}/services/${s.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.85,
        });
      });
    }

    if (experiences && Array.isArray(experiences)) {
      experiences.forEach((e) => {
        dynamicRoutes.push({
          url: `${baseUrl}/experiences/${e.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      });
    }

    if (insights && Array.isArray(insights)) {
      insights.forEach((i) => {
        dynamicRoutes.push({
          url: `${baseUrl}/insights/${i.slug}`,
          lastModified: i.publishedAt ? new Date(i.publishedAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.75,
        });
      });
    }
  } catch (err) {
    console.warn('Sitemap dynamic routes fetch error:', err);
  }

  // Fallback routes if API was unreachable during static export
  if (dynamicRoutes.length === 0) {
    const fallbackServices = [
      'branding-marketing',
      'event-experience',
      'training-development',
      'procurement-solutions',
    ];
    fallbackServices.forEach((slug) => {
      dynamicRoutes.push({
        url: `${baseUrl}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });

    const fallbackExperiences = [
      'energizing-maluku',
      'gef-8-indonesia-national-dialogue',
      'gerakan-waspada-cacingan',
      'commonwealth-insurance-gathering',
      'arup-singapore-media-conference',
      'garuda-indonesia-travel-fair',
      'pased-baby-tissue-activation',
      'mylea-hair-care-activation',
    ];
    fallbackExperiences.forEach((slug) => {
      dynamicRoutes.push({
        url: `${baseUrl}/experiences/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  }

  return [...staticRoutes, ...dynamicRoutes];
}

