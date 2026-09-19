'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryAlbum } from '@imarka/types';
import { Images, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import FinalCtaBanner from '@/components/FinalCtaBanner';
import { getGallery } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; caption?: string | null } | null>(null);

  useEffect(() => {
    getGallery()
      .then((data) => {
        if (Array.isArray(data)) setAlbums(data);
      })
      .catch((err) => console.error('Error loading gallery:', err));
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-brand-charcoal text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white/10 px-3 py-1 rounded-md">
            VISUAL ARCHIVE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Event & Activation Gallery
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            A curated photographic archive capturing the energy, staging mastery, and human
            connections of our projects.
          </p>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {albums.map((album) => (
          <div key={album.id} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-200 pb-4 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red bg-brand-light px-2.5 py-1 rounded">
                  {album.category}
                </span>
                <h2 className="text-2xl font-bold text-brand-charcoal mt-2">{album.title}</h2>
                {album.description && (
                  <p className="text-xs text-brand-graphite mt-1">{album.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-brand-graphite font-semibold">
                <Calendar size={14} className="text-brand-red" />
                <span>{album.date}</span>
              </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {album.photos?.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative h-48 rounded-xl overflow-hidden shadow-sm group hover:shadow-lg transition-all focus:outline-none"
                >
                  <Image
                    src={photo.url}
                    alt={photo.caption || album.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-left">
                    <p className="text-xs text-white font-medium drop-shadow line-clamp-2">
                      {photo.caption || album.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
            aria-label="Close Lightbox"
          >
            <X size={30} />
          </button>
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <div className="relative w-[92vw] sm:w-[85vw] max-w-3xl h-[50vh] sm:h-[65vh] rounded-lg overflow-hidden bg-black">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || 'Event photo'}
                fill
                className="object-contain"
              />
            </div>
            {selectedPhoto.caption && (
              <p className="text-white/90 text-sm mt-4 text-center max-w-xl">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}

      <FinalCtaBanner />
    </div>
  );
}
