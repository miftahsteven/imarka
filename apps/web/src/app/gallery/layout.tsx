import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visual Showcase & Event Gallery',
  description:
    'Explore visual documentation, staging photography, and backstage event moments by PT IMARKA MEGALO INDONESIA.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Visual Showcase & Event Gallery | IMARKA MEGALO INDONESIA',
    description:
      'Explore visual documentation, staging photography, and backstage event moments by PT IMARKA MEGALO INDONESIA.',
    url: 'https://www.imarka-megalo.com/gallery',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
