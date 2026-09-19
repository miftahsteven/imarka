import React, { useState, useEffect } from 'react';
import { cmsFetch, getImageUrl } from '../lib/api';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import { Experience } from '@imarka/types';
import { Plus, Edit2, Trash2, CheckCircle2, Save, Star, Search } from 'lucide-react';

export default function ExperiencesManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [search, setSearch] = useState('');

  const loadExperiences = () => {
    cmsFetch<Experience[]>('/admin/experiences')
      .then((data) => setExperiences(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    setSaving(true);
    setSuccessMsg('');

    try {
      if (editingExp.id) {
        await cmsFetch(`/admin/experiences/${editingExp.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingExp),
        });
      } else {
        await cmsFetch('/admin/experiences', {
          method: 'POST',
          body: JSON.stringify(editingExp),
        });
      }
      setEditingExp(null);
      setSuccessMsg('Experience case study saved successfully!');
      loadExperiences();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      await cmsFetch(`/admin/experiences/${id}`, { method: 'DELETE' });
      loadExperiences();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const filtered = experiences.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.clientName.toLowerCase().includes(search.toLowerCase()) ||
      e.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Experiences & Portfolio" subtitle="Manage case studies, client events, and achievements" />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl space-y-6">
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-3 rounded-lg flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-b border-gray-100 pb-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search by title, client, or industry..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-brand-red"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            <button
              onClick={() =>
                setEditingExp({
                  title: '',
                  slug: '',
                  clientName: '',
                  year: new Date().getFullYear(),
                  location: 'Jakarta, Indonesia',
                  serviceCategory: 'Event & Experience Solutions',
                  industry: 'Corporate',
                  coverImageUrl: '/images/hero-keynote.jpg',
                  summary: '',
                  challenge: '',
                  approach: '',
                  execution: '',
                  outcome: '',
                  isFeatured: false,
                  order: experiences.length + 1,
                  status: 'PUBLISHED',
                })
              }
              className="px-4 py-2 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow w-full sm:w-auto shrink-0"
            >
              <Plus size={14} />
              <span>Add Case Study</span>
            </button>
          </div>

          {/* List Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[680px]">
              <thead className="bg-brand-light text-brand-charcoal uppercase font-extrabold border-y border-gray-200">
                <tr>
                  <th className="py-3 px-4">Event & Client</th>
                  <th className="py-3 px-4">Category / Industry</th>
                  <th className="py-3 px-4">Year & Location</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((exp) => (
                  <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-md overflow-hidden bg-brand-charcoal shrink-0 border border-gray-200">
                          <img src={getImageUrl(exp.coverImageUrl)} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-brand-charcoal">{exp.title}</div>
                          <div className="text-gray-500 font-medium">{exp.clientName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-brand-charcoal">{exp.serviceCategory}</div>
                      <div className="text-gray-400 text-[11px]">{exp.industry}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-brand-charcoal">{exp.year}</div>
                      <div className="text-gray-500 text-[11px]">{exp.location}</div>
                    </td>
                    <td className="py-3 px-4">
                      {exp.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold text-[10px]">
                          <Star size={10} className="fill-amber-600" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[10px]">Standard</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setEditingExp(exp)}
                          className="p-1.5 text-gray-500 hover:text-brand-red bg-white border border-gray-200 rounded hover:bg-gray-50"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 bg-white border border-gray-200 rounded hover:bg-gray-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Editor */}
        {editingExp && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-full sm:max-w-3xl w-full p-4 sm:p-6 lg:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-brand-charcoal">
                  {editingExp.id ? 'Edit Case Study' : 'Create New Case Study'}
                </h3>
                <button
                  onClick={() => setEditingExp(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Event / Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingExp.title || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingExp.slug || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, slug: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingExp.clientName || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, clientName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingExp.year || 2026}
                      onChange={(e) =>
                        setEditingExp({ ...editingExp, year: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingExp.location || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Service Category
                    </label>
                    <select
                      value={editingExp.serviceCategory || 'Event & Experience Solutions'}
                      onChange={(e) =>
                        setEditingExp({ ...editingExp, serviceCategory: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Event & Experience Solutions">Event & Experience Solutions</option>
                      <option value="Branding & Marketing Communication">Branding & Marketing Communication</option>
                      <option value="Training & People Development">Training & People Development</option>
                      <option value="Procurement Solutions">Procurement Solutions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Industry Sector
                    </label>
                    <select
                      value={editingExp.industry || 'Corporate'}
                      onChange={(e) => setEditingExp({ ...editingExp, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Government & Public Sector">Government & Public Sector</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="FMCG">FMCG</option>
                      <option value="Property">Property</option>
                      <option value="Energy & Environment">Energy & Environment</option>
                    </select>
                  </div>
                </div>

                <ImageUpload
                  label="Cover Image *"
                  value={editingExp.coverImageUrl || ''}
                  onChange={(url) => setEditingExp({ ...editingExp, coverImageUrl: url })}
                  aspectRatio="landscape"
                  helperText="Upload gambar event resolusi tinggi (JPG, PNG, WEBP, maks. 100MB)."
                />

                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Summary / Overview *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingExp.summary || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, summary: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      The Challenge
                    </label>
                    <textarea
                      rows={3}
                      value={editingExp.challenge || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, challenge: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Strategic Approach
                    </label>
                    <textarea
                      rows={3}
                      value={editingExp.approach || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, approach: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Execution
                    </label>
                    <textarea
                      rows={3}
                      value={editingExp.execution || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, execution: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Outcome & Measurable Impact
                    </label>
                    <textarea
                      rows={3}
                      value={editingExp.outcome || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, outcome: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingExp.isFeatured ?? false}
                      onChange={(e) => setEditingExp({ ...editingExp, isFeatured: e.target.checked })}
                      className="rounded border-gray-300 text-brand-red focus:ring-brand-red"
                    />
                    <span className="font-bold text-brand-charcoal">Feature on Homepage</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditingExp(null)}
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
                    <span>Save Case Study</span>
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
