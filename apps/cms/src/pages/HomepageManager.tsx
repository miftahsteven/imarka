import React, { useState, useEffect } from 'react';
import { cmsFetch, getImageUrl } from '../lib/api';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import { HeroSlide } from '@imarka/types';
import { Plus, Edit2, Trash2, CheckCircle2, Save, Image as ImageIcon } from 'lucide-react';

export default function HomepageManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadSlides = () => {
    cmsFetch<HeroSlide[]>('/admin/hero-slides')
      .then((data) => setSlides(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSlides();
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

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Homepage Manager" subtitle="Control hero slides, credibility statements, and featured components" />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl space-y-6 sm:space-y-8">
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-3 rounded-lg flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Hero Slides Management Section */}
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
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-brand-light rounded-xl border border-gray-200 gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-14 bg-brand-charcoal rounded-lg overflow-hidden relative shrink-0 border">
                    <img src={getImageUrl(slide.imageUrl)} alt="" className="w-full h-full object-cover" />
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
                    onChange={(e) => setEditingSlide({ ...editingSlide, subheadline: e.target.value })}
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
