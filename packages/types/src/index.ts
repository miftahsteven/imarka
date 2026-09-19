export type ContentStatus = 'DRAFT' | 'IN_REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';

export type UserRole = 'SUPER_ADMIN' | 'ADMINISTRATOR' | 'EDITOR' | 'AUTHOR' | 'VIEWER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export interface SiteSetting {
  id: string;
  siteName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  logoWhiteUrl?: string | null;
  faviconUrl?: string | null;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  address?: string | null;
  socialInstagram?: string | null;
  socialLinkedin?: string | null;
  socialYoutube?: string | null;
  metaTitleDefault: string;
  metaDescriptionDefault: string;
  ogImageDefault?: string | null;
  updatedAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  location?: string;
  order: number;
  parentId?: string | null;
  isVisible: boolean;
  children?: NavigationItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText?: string | null;
  secondaryCtaUrl?: string | null;
  imageUrl: string;
  order: number;
  isActive: boolean;
}

export interface ServiceCapability {
  id: string;
  name: string;
  description?: string | null;
  order: number;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName?: string | null;
  heroImageUrl?: string | null;
  isPillar: boolean;
  order: number;
  capabilities?: ServiceCapability[];
}

export interface Industry {
  id: string;
  name: string;
  description?: string | null;
  iconName?: string | null;
  order: number;
}

export interface ExperienceMedia {
  id: string;
  mediaUrl: string;
  caption?: string | null;
  order: number;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  year: number;
  location: string;
  serviceCategory: string;
  industry: string;
  coverImageUrl: string;
  summary: string;
  challenge?: string | null;
  approach?: string | null;
  execution?: string | null;
  outcome?: string | null;
  isFeatured: boolean;
  order: number;
  status: ContentStatus;
  media?: ExperienceMedia[];
}

export interface PostCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  category: string;
  authorName: string;
  publishedAt?: string | null;
  status: ContentStatus;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  date: string;
  coverImageUrl: string;
  category: string;
  photos: {
    id: string;
    url: string;
    caption?: string | null;
    order: number;
  }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  imageUrl: string;
  email?: string | null;
  category: 'LEADERSHIP' | 'PRODUCTION';
  order: number;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string;
  industry?: string | null;
  order: number;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  companyName: string;
  avatarUrl?: string | null;
  order: number;
  isActive: boolean;
}

export type InquiryStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED' | 'SPAM';

export interface ContactInquiry {
  id: string;
  fullName: string;
  company?: string | null;
  email: string;
  phoneWhatsapp?: string | null;
  serviceInterest?: string | null;
  estimatedDate?: string | null;
  estimatedBudget?: string | null;
  message: string;
  status: InquiryStatus;
  internalNotes?: string | null;
  createdAt: string;
}

export interface HomepageData {
  site: SiteSetting;
  heroSlides: HeroSlide[];
  credibility: {
    yearsOfExperience: string;
    industriesLabel: string;
    deliveryLabel: string;
    impactLabel: string;
  };
  whoWeAre: {
    title: string;
    paragraphs: string[];
    highlightImage: string;
  };
  coreServices: Service[];
  howWeWork: {
    step: number;
    title: string;
    description: string;
  }[];
  featuredExperiences: Experience[];
  industries: Industry[];
  latestHighlight: {
    title: string;
    date: string;
    location: string;
    description: string;
    imageUrl: string;
    slug: string;
  };
  clients: Client[];
  testimonials: Testimonial[];
  latestInsights: Post[];
  leadershipTeam: TeamMember[];
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  heroImageUrl?: string | null;
  excerpt?: string | null;
  content: string;
  status: ContentStatus;
  order: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt: string;
  updatedAt: string;
}
