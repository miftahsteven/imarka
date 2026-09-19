import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, ArrowRight, Calendar } from 'lucide-react';
import { getInsights } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Insights & Perspectives',
  description:
    'Thought leadership, industry analysis, and practical knowledge from IMARKA Megalo Indonesia.',
};

export const revalidate = 60;

export default async function InsightsPage() {
  const posts = await getInsights();

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-brand-charcoal text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white/10 px-3 py-1 rounded-md">
            PERSPECTIVES & NEWS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Corporate Insights
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Strategic perspectives, event recaps, and thought leadership from our seasoned directors
            and production specialists.
          </p>
        </div>
      </section>

      {/* Posts List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts?.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 border border-gray-200/80"
            >
              <div className="relative h-56 w-full overflow-hidden bg-brand-charcoal">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-md bg-white/95 text-brand-charcoal text-xs font-bold shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-brand-graphite mb-2">
                    <BookOpen size={13} className="text-brand-red" />
                    <span>By {post.authorName}</span>
                  </div>

                  <h2 className="text-lg font-bold text-brand-charcoal group-hover:text-brand-red transition-colors line-clamp-2 leading-snug">
                    <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-brand-graphite mt-3 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <Link
                    href={`/insights/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-brand-redDark group/link"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
