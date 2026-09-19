import {
  HomepageData,
  SiteSetting,
  NavigationItem,
  Service,
  Experience,
  Post,
  GalleryAlbum,
  TeamMember,
  CustomPage,
} from '@imarka/types';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined'
    ? '/api/v1'
    : process.env.NODE_ENV === 'production'
    ? 'http://127.0.0.1:7048/api/v1'
    : 'http://localhost:4000/api/v1');

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      cache: 'no-store',
      ...options,
    });
    if (!res.ok) {
      console.warn(`API request to ${endpoint} failed: ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err: any) {
    if (
      err?.digest === 'DYNAMIC_SERVER_USAGE' ||
      err?.name === 'DynamicServerError' ||
      (typeof err?.message === 'string' && err.message.includes('Dynamic server usage'))
    ) {
      throw err;
    }
    console.warn(`Fetch error for ${endpoint}:`, err);
    return null;
  }
}

export async function getSiteData(): Promise<{ site: SiteSetting; navigation: NavigationItem[] } | null> {
  return fetchApi<{ site: SiteSetting; navigation: NavigationItem[] }>('/public/site');
}

export async function getHomeData(): Promise<HomepageData | null> {
  return fetchApi<HomepageData>('/public/home');
}

export async function getServices(): Promise<Service[] | null> {
  return fetchApi<Service[]>('/public/services');
}

export async function getServiceBySlug(slug: string): Promise<{ service: Service; relatedExperiences: Experience[] } | null> {
  return fetchApi<{ service: Service; relatedExperiences: Experience[] }>(`/public/services/${slug}`);
}

export async function getExperiences(params?: { service?: string; industry?: string; year?: string; search?: string }): Promise<Experience[] | null> {
  const query = new URLSearchParams();
  if (params?.service) query.set('service', params.service);
  if (params?.industry) query.set('industry', params.industry);
  if (params?.year) query.set('year', params.year);
  if (params?.search) query.set('search', params.search);

  const qs = query.toString() ? `?${query.toString()}` : '';
  return fetchApi<Experience[]>(`/public/experiences${qs}`);
}

export async function getExperienceBySlug(slug: string): Promise<{ experience: Experience; related: Experience[] } | null> {
  return fetchApi<{ experience: Experience; related: Experience[] }>(`/public/experiences/${slug}`);
}

export async function getInsights(): Promise<Post[] | null> {
  return fetchApi<Post[]>('/public/insights');
}

export async function getInsightBySlug(slug: string): Promise<{ post: Post; related: Post[] } | null> {
  return fetchApi<{ post: Post; related: Post[] }>(`/public/insights/${slug}`);
}

export async function getGallery(): Promise<GalleryAlbum[] | null> {
  return fetchApi<GalleryAlbum[]>('/public/gallery');
}

export async function getTeam(): Promise<{ leadership: TeamMember[]; production: TeamMember[] } | null> {
  return fetchApi<{ leadership: TeamMember[]; production: TeamMember[] }>('/public/team');
}

export async function submitContactForm(data: {
  fullName: string;
  company?: string;
  email: string;
  phoneWhatsapp?: string;
  serviceInterest?: string;
  estimatedDate?: string;
  estimatedBudget?: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE}/public/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getNavigation(location?: string): Promise<NavigationItem[] | null> {
  const qs = location ? `?location=${location}` : '';
  return fetchApi<NavigationItem[]>(`/public/navigation${qs}`);
}

export async function getCustomPages(): Promise<CustomPage[] | null> {
  return fetchApi<CustomPage[]>('/public/pages');
}

export async function getCustomPageBySlug(slug: string): Promise<CustomPage | null> {
  return fetchApi<CustomPage>(`/public/pages/${slug}`);
}
