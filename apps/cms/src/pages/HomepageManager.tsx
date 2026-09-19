import React, { useState, useEffect } from 'react';
import { cmsFetch, getImageUrl } from '../lib/api';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import { HeroSlide } from '@imarka/types';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Save,
  Sliders,
  Sparkles,
  CheckSquare,
} from 'lucide-react';

interface WhoWeAreData {
  title: string;
  paragraphs: string[];
  highlightImage: string;
  highlights: string[];
  badgeTrackRecord: string;
  badgeSubtext: string;
  floatingBadgeNumber: string;
  floatingBadgeLabel: string;
  floatingBadgeSubtext: string;
}

const defaultWhoWeAre: WhoWeAreData = {
  title: 'IMARKA MEGALO INDONESIA',
  paragraphs: [
    'IMARKA Megalo Indonesia is a full-service experience and marketing solutions company with more than 20 years of proven track record in delivering impactful programs that engage audiences and create lasting value.',
    'We combine strategic thinking, creative ideas, and flawless execution to produce experiences that inspire, educate, and drive results across government bodies, multinational enterprises, and consumer brands.',
  ],
  highlightImage: '/images/event-commonwealth-hd.jpg',
  highlights: [
    'Over 20 years of proven track record across Indonesia',
    'Strategic synergy between marketing, live production, and training',
    'Experience handling national summits, state dignitaries, and corporate giants',
    'Flawless on-ground technical, protocol, and artistic choreography',
  ],
  badgeTrackRecord: '20+ Years Track Record',
  badgeSubtext: 'Over two decades of trust, innovation, and unforgettable experiences.',
  floatingBadgeNumber: '20+',
  floatingBadgeLabel: 'Years of Trust',
  floatingBadgeSubtext: 'Creating connections that inspire change.',
};

export default function HomepageManager() {
  const [activeTab, setActiveTab] = useState<'hero' | 'who-we-are'>('hero');
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Who We Are state
  const [whoWeAre, setWhoWeAre] = useState<WhoWeAreData>(defaultWhoWeAre);
  const [savingWhoWeAre, setSavingWhoWeAre] = useState(false);

  const loadSlides = () => {
    cmsFetch<HeroSlide[]>('/admin/hero-slides')
      .then((data) => setSlides(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const loadWhoWeAre = () => {
    cmsFetch<WhoWeAreData>('/admin/who-we-are')
      .then((data) => {
        if (data && data.title) {
          setWhoWeAre({
            ...defaultWhoWeAre,
            ...data,
            paragraphs: data.paragraphs?.length ? data.paragraphs : defaultWhoWeAre.paragraphs,
            highlights: data.highlights?.length ? data.highlights : defaultWhoWeAre.highlights,
          });
        }
      })
      .catch((err) => console.error('Failed to load Who We Are data:', err));
  };

  useEffect(() => {
    loadSlides();
    loadWhoWeAre();
  }, []);

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    setSaving(true);
    setSuccessMsg('');

    try {
      if (editingSlide.id) {
        await cmsFetch(`/admin/hero-slides/${editingSlide.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingSlide),
        });
      } else {
        await cmsFetch('/admin/hero-slides', {
          method: 'POST',
          body: JSON.stringify(editingSlide),
        });
      }
      setEditingSlide(null);
      setSuccessMsg('Hero slide saved successfully!');
      loadSlides();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save slide');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    try {
      await cmsFetch(`/admin/hero-slides/${id}`, { method: 'DELETE' });
      loadSlides();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const handleSaveWhoWeAre = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingWhoWeAre(true);
    setSuccessMsg('');

    try {
      await cmsFetch('/admin/who-we-are', {
        method: 'PUT',
        body: JSON.stringify(whoWeAre),
      });
      setSuccessMsg('Who We Are section updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update Who We Are');
    } finally {
      setSavingWhoWeAre(false);
    }
  };

  const handleHighlightChange = (index: number, value: string) => {
    const updated = [...(whoWeAre.highlights || [])];
    updated[index] = value;
    setWhoWeAre({ ...whoWeAre, highlights: updated });
  };

  const handleParagraphChange = (index: number, value: string) => {
    const updated = [...(whoWeAre.paragraphs || [])];
    updated[index] = value;
    setWhoWeAre({ ...whoWeAre, paragraphs: updated });
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Homepage Manager"
        subtitle="Control hero slides, Who We Are company highlights, and featured homepage elements"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl space-y-6 sm:space-y-8">
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-3 rounded-lg flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'hero'
                ? 'bg-brand-charcoal text-white shadow'
                : 'bg-gray-100 text-brand-graphite hover:bg-gray-200'
            }`}
          >
            <Sliders size={14} />
            <span>Hero Slider ({slides.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('who-we-are')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'who-we-are'
                ? 'bg-brand-red text-white shadow'
                : 'bg-gray-100 text-brand-graphite hover:bg-gray-200'
            }`}
          >
            <Sparkles size={14} />
            <span>Who We Are (Tentang Kami)</span>
          </button>
        </div>

        {/* TAB 1: Hero Slides Management Section */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-brand-charcoal">Hero Slider Elements</h2>
                <p className="text-xs text-brand-graphite">
                  Add, edit, or adjust order of carousel slides displayed at the top of the homepage.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingSlide({
                    eyebrow: 'EXPERIENCES THAT INSPIRE',
                    headline: '',
                    subheadline: '',
                    primaryCtaText: 'Explore Our Experiences',
                    primaryCtaUrl: '/experiences',
                    secondaryCtaText: "Let's Collaborate",
                    secondaryCtaUrl: '/contact',
                    imageUrl: '/images/hero-keynote.jpg',
                    order: slides.length + 1,
                    isActive: true,
                  })
                }
                className="px-4 py-2 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow w-full sm:w-auto shrink-0"
              >
                <Plus size={14} />
                <span>Add New Slide</span>
              </button>
            </div>

            {/* Slides List */}
            <div className="space-y-4">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-brand-light rounded-xl border border-gray-200 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-14 bg-brand-charcoal rounded-lg overflow-hidden relative shrink-0 border">
                      <img
                        src={getImageUrl(slide.imageUrl)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-red">
                          #{slide.order} • {slide.eyebrow}
                        </span>
                        {slide.isActive ? (
                          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-bold">
                            Inactive
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-brand-charcoal line-clamp-1">
                        {slide.headline}
                      </h3>
                      <p className="text-xs text-brand-graphite line-clamp-1 mt-0.5">
                        {slide.subheadline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingSlide(slide)}
                      className="p-2 text-gray-600 hover:text-brand-red bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Edit Slide"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="p-2 text-gray-600 hover:text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Delete Slide"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Who We Are Section Editor */}
        {activeTab === 'who-we-are' && (
          <form
            onSubmit={handleSaveWhoWeAre}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6"
          >
            <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-brand-red bg-brand-light px-2 py-0.5 rounded border border-brand-red/10 mb-1">
                  WHO WE ARE SECTION
                </div>
                <h2 className="text-base font-bold text-brand-charcoal">
                  Company Narrative & Highlights
                </h2>
                <p className="text-xs text-brand-graphite">
                  Bagian ringkasan profil perusahaan, narasi visi, checklist 4 keunggulan, serta foto panggung dan badge kepercayaan.
                </p>
              </div>

              <button
                type="submit"
                disabled={savingWhoWeAre}
                className="px-5 py-2.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow shrink-0"
              >
                <Save size={14} />
                <span>{savingWhoWeAre ? 'Menyimpan...' : 'Simpan Perubahan Who We Are'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Kolom Kiri: Teks & Checklist (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">
                    Judul Utama (Title)
                  </label>
                  <input
                    type="text"
                    required
                    value={whoWeAre.title}
                    onChange={(e) => setWhoWeAre({ ...whoWeAre, title: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-red focus:border-brand-red"
                    placeholder="IMARKA MEGALO INDONESIA"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">
                    Paragraf 1 (Company Overview)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={whoWeAre.paragraphs[0] || ''}
                    onChange={(e) => handleParagraphChange(0, e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-red focus:border-brand-red"
                    placeholder="IMARKA Megalo Indonesia is a full-service experience..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase mb-1">
                    Paragraf 2 (Strategic Execution)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={whoWeAre.paragraphs[1] || ''}
                    onChange={(e) => handleParagraphChange(1, e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-red focus:border-brand-red"
                    placeholder="We combine strategic thinking, creative ideas..."
                  />
                </div>

                {/* 4 Highlights Checklist */}
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-charcoal uppercase">
                    <CheckSquare size={14} className="text-brand-red" />
                    <span>4 Poin Keunggulan (Checklist Items)</span>
                  </div>

                  <div className="space-y-2.5">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index}>
                        <label className="block text-[10px] font-bold text-brand-graphite uppercase mb-0.5">
                          Poin #{index + 1}
                        </label>
                        <input
                          type="text"
                          required
                          value={whoWeAre.highlights[index] || ''}
                          onChange={(e) => handleHighlightChange(index, e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-red focus:border-brand-red"
                          placeholder={`Keunggulan ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Foto Panggung & Badge (5 cols) */}
              <div className="lg:col-span-5 space-y-5 bg-brand-light p-4 rounded-xl border border-gray-200">
                <ImageUpload
                  label="Foto Panggung / Highlight Image"
                  value={whoWeAre.highlightImage}
                  onChange={(url) => setWhoWeAre({ ...whoWeAre, highlightImage: url })}
                  aspectRatio="landscape"
                  helperText="Format JPG, PNG, WEBP. Maksimal 100MB. Rekomendasi foto panggung atau dokumentasi event."
                />

                {/* Badge Bawah Foto */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <span className="text-xs font-bold text-brand-charcoal uppercase block">
                    Badge Teks di Bawah Foto
                  </span>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-graphite uppercase mb-0.5">
                      Label Badge
                    </label>
                    <input
                      type="text"
                      value={whoWeAre.badgeTrackRecord || ''}
                      onChange={(e) =>
                        setWhoWeAre({ ...whoWeAre, badgeTrackRecord: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                      placeholder="20+ Years Track Record"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-graphite uppercase mb-0.5">
                      Deskripsi Singkat Badge
                    </label>
                    <input
                      type="text"
                      value={whoWeAre.badgeSubtext || ''}
                      onChange={(e) => setWhoWeAre({ ...whoWeAre, badgeSubtext: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                      placeholder="Over two decades of trust, innovation, and unforgettable experiences."
                    />
                  </div>
                </div>

                {/* Floating Red Card */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-brand-red uppercase">
                    <span className="w-2.5 h-2.5 rounded-sm bg-brand-red inline-block" />
                    <span>Kartu Merah Melayang (Floating Trust Card)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-brand-graphite uppercase mb-0.5">
                        Angka / Stat
                      </label>
                      <input
                        type="text"
                        value={whoWeAre.floatingBadgeNumber || ''}
                        onChange={(e) =>
                          setWhoWeAre({ ...whoWeAre, floatingBadgeNumber: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                        placeholder="20+"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-brand-graphite uppercase mb-0.5">
                        Judul Label
                      </label>
                      <input
                        type="text"
                        value={whoWeAre.floatingBadgeLabel || ''}
                        onChange={(e) =>
                          setWhoWeAre({ ...whoWeAre, floatingBadgeLabel: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                        placeholder="Years of Trust"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-graphite uppercase mb-0.5">
                      Subteks Slogan
                    </label>
                    <input
                      type="text"
                      value={whoWeAre.floatingBadgeSubtext || ''}
                      onChange={(e) =>
                        setWhoWeAre({ ...whoWeAre, floatingBadgeSubtext: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                      placeholder="Creating connections that inspire change."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={savingWhoWeAre}
                className="px-6 py-2.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                <Save size={14} />
                <span>{savingWhoWeAre ? 'Menyimpan...' : 'Simpan Perubahan Who We Are'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Modal Editor for Hero Slide */}
        {editingSlide && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-full sm:max-w-2xl w-full p-4 sm:p-6 lg:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-brand-charcoal">
                  {editingSlide.id ? 'Edit Hero Slide' : 'Create New Hero Slide'}
                </h3>
                <button
                  onClick={() => setEditingSlide(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveSlide} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Eyebrow Badge Text
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSlide.eyebrow || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, eyebrow: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSlide.headline || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, headline: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Subheadline Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingSlide.subheadline || ''}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, subheadline: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <ImageUpload
                  label="Hero Slide Background Image"
                  value={editingSlide.imageUrl || ''}
                  onChange={(url) => setEditingSlide({ ...editingSlide, imageUrl: url })}
                  aspectRatio="banner"
                  helperText="Format JPG, PNG, WEBP. Maksimal 100MB. Rekomendasi resolusi tinggi (1920x1080)."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Primary CTA Text
                    </label>
                    <input
                      type="text"
                      value={editingSlide.primaryCtaText || ''}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, primaryCtaText: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Primary CTA URL
                    </label>
                    <input
                      type="text"
                      value={editingSlide.primaryCtaUrl || ''}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, primaryCtaUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingSlide.isActive ?? true}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, isActive: e.target.checked })
                      }
                      className="rounded border-gray-300 text-brand-red focus:ring-brand-red"
                    />
                    <span className="font-bold text-brand-charcoal">Slide is Active / Visible</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="font-bold text-brand-charcoal">Order:</label>
                    <input
                      type="number"
                      value={editingSlide.order || 1}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, order: Number(e.target.value) })
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditingSlide(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-redDark flex items-center gap-1.5"
                  >
                    <Save size={14} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
