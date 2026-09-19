import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Project Inquiry',
  description:
    'Consult with PT IMARKA MEGALO INDONESIA for corporate events, conferences, brand activations, and training programs. Response within 24 hours.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us & Project Inquiry | IMARKA MEGALO INDONESIA',
    description:
      'Consult with PT IMARKA MEGALO INDONESIA for corporate events, conferences, brand activations, and training programs.',
    url: 'https://www.imarka-megalo.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
