import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ChevronRight, ArrowRight, BookOpen, Calendar, User } from 'lucide-react';
import FinalCtaBanner from '@/components/FinalCtaBanner';
import { getInsightBySlug } from '@/lib/api';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getInsightBySlug(slug);
  if (!data?.post) return { title: 'Article | IMARKA MEGALO INDONESIA' };

  const post = data.post;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imarka-megalo.com';
  const title = `${post.title} — Insights | IMARKA MEGALO INDONESIA`;
  const description =
    post.excerpt ||
    'Industry insights, event management strategies, and marketing communications perspectives from IMARKA Megalo Indonesia.';
  const imageUrl = post.coverImageUrl?.startsWith('http')
    ? post.coverImageUrl
    : post.coverImageUrl
    ? `${baseUrl}${post.coverImageUrl.startsWith('/') ? '' : '/'}${post.coverImageUrl}`
    : `${baseUrl}/images/imarka-og-share.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `/insights/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/insights/${slug}`,
      siteName: 'IMARKA MEGALO INDONESIA',
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      authors: [post.authorName || 'PT IMARKA MEGALO INDONESIA'],
      locale: 'id_ID',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function InsightDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getInsightBySlug(slug);

  if (!data?.post) {
    notFound();
  }

  const { post, related } = data;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.imarka-megalo.com';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.authorName || 'IMARKA Editorial Team',
    },
    publisher: {
      '@type': 'Corporation',
      name: 'PT IMARKA MEGALO INDONESIA',
      url: baseUrl,
      logo: `${baseUrl}/images/imarka-symbol.png`,
    },
    image: post.coverImageUrl?.startsWith('http')
      ? post.coverImageUrl
      : `${baseUrl}${post.coverImageUrl?.startsWith('/') ? '' : '/'}${post.coverImageUrl || 'images/imarka-og-share.png'}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/insights/${slug}`,
    },
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Header */}
      <section className="bg-brand-charcoal text-white py-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <ChevronRight size={14} />
            <span className="text-brand-red font-semibold">{post.category}</span>
          </div>

          <div className="inline-block px-3 py-1 rounded bg-brand-red text-white text-xs font-bold uppercase tracking-wider">
            {post.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300 pt-2">
            <div className="flex items-center gap-1.5">
              <User size={15} className="text-brand-red" />
              <span>{post.authorName}</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1.5">
              <BookOpen size={15} className="text-brand-red" />
              <span>Editorial Insight</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9] bg-brand-charcoal mb-10">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div
          className="prose prose-lg max-w-none text-brand-graphite space-y-5 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-brand-charcoal [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-brand-charcoal [&>blockquote]:border-l-4 [&>blockquote]:border-brand-red [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-brand-charcoal"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back and Share */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
          <Link
            href="/insights"
            className="text-sm font-bold text-brand-red hover:underline flex items-center gap-1.5"
          >
            ← Back to All Insights
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-brand-charcoal hover:bg-brand-red text-white text-xs font-bold rounded-lg transition-colors"
          >
            Consult Our Team
          </Link>
        </div>

        {/* Related articles */}
        {related && related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-brand-charcoal mb-6">Related Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/insights/${item.slug}`}
                  className="group bg-brand-light rounded-xl overflow-hidden border border-gray-200 p-5 hover:border-brand-red/40 transition-all"
                >
                  <span className="text-xs font-bold text-brand-red uppercase">{item.category}</span>
                  <h3 className="text-sm font-bold text-brand-charcoal group-hover:text-brand-red transition-colors line-clamp-2 mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-graphite line-clamp-2 mt-2">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <FinalCtaBanner />
    </div>
  );
}
