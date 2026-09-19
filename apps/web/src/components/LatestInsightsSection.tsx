import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@imarka/types';
import { ArrowRight, BookOpen } from 'lucide-react';

interface InsightsProps {
  posts?: Post[];
}

export default function LatestInsightsSection({ posts }: InsightsProps) {
  const items = posts && posts.length > 0 ? posts.slice(0, 3) : [];

  return (
    <section className="py-20 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white px-3 py-1 rounded-md border border-gray-200">
              KNOWLEDGE & PERSPECTIVES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal tracking-tight">
              Latest Insights & Perspectives
            </h2>
            <p className="text-sm sm:text-base text-brand-graphite">
              Thought leadership, strategic recaps, and practical articles on events, brand
              communication, and human capability building.
            </p>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline shrink-0"
          >
            <span>View All Insights</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 border border-gray-200/80"
            >
              <div className="relative h-52 w-full overflow-hidden bg-brand-charcoal">
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

                  <h3 className="text-base sm:text-lg font-bold text-brand-charcoal group-hover:text-brand-red transition-colors line-clamp-2 leading-snug">
                    <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-graphite mt-2.5 line-clamp-3 leading-relaxed">
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
      </div>
    </section>
  );
}
