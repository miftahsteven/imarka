import React, { useState, useEffect } from 'react';
import { cmsFetch, getImageUrl } from '../lib/api';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import { Service } from '@imarka/types';
import { Plus, Edit2, Trash2, CheckCircle2, Save } from 'lucide-react';

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [capabilityInput, setCapabilityInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadServices = () => {
    cmsFetch<Service[]>('/admin/services')
      .then((data) => setServices(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenEdit = (s: Service) => {
    setEditingService(JSON.parse(JSON.stringify(s)));
    setCapabilityInput(s.capabilities?.map((c) => c.name).join('\n') || '');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setSaving(true);
    setSuccessMsg('');

    const capabilitiesArray = capabilityInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...editingService,
      capabilities: capabilitiesArray,
    };

    try {
      if (editingService.id) {
        await cmsFetch(`/admin/services/${editingService.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await cmsFetch('/admin/services', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      setEditingService(null);
      setSuccessMsg('Service saved successfully!');
      loadServices();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await cmsFetch(`/admin/services/${id}`, { method: 'DELETE' });
      loadServices();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Services Manager" subtitle="Manage pillars, descriptions, and capabilities" />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl space-y-6">
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-3 rounded-lg flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-brand-charcoal">All Services</h2>
              <p className="text-xs text-brand-graphite">
                Configured service pillars and specialized capabilities.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingService({
                  name: '',
                  slug: '',
                  shortDescription: '',
                  fullDescription: '',
                  iconName: 'Megaphone',
                  heroImageUrl: '/images/hero-keynote.jpg',
                  isPillar: true,
                  order: services.length + 1,
                });
                setCapabilityInput('');
              }}
              className="px-4 py-2 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow w-full sm:w-auto shrink-0"
            >
              <Plus size={14} />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="space-y-4">
            {services.map((s) => (
              <div
                key={s.id}
                className="p-5 bg-brand-light rounded-xl border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-brand-charcoal text-white rounded-xl overflow-hidden shrink-0 relative border border-gray-200">
                    {s.heroImageUrl ? (
                      <img src={getImageUrl(s.heroImageUrl)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold">
                        {s.name[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-brand-red uppercase">
                        Order #{s.order}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">/services/{s.slug}</span>
                    </div>
                    <h3 className="text-base font-bold text-brand-charcoal">{s.name}</h3>
                    <p className="text-xs text-brand-graphite mt-1 line-clamp-1">
                      {s.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {s.capabilities?.slice(0, 4).map((c) => (
                        <span
                          key={c.id}
                          className="px-2 py-0.5 bg-white text-brand-charcoal text-[10px] rounded border border-gray-200"
                        >
                          {c.name}
                        </span>
                      ))}
                      {(s.capabilities?.length || 0) > 4 && (
                        <span className="text-[10px] text-gray-400 self-center">
                          +{(s.capabilities?.length || 0) - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="p-2 text-gray-600 hover:text-brand-red bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-2 text-gray-600 hover:text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Editor */}
        {editingService && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-full sm:max-w-2xl w-full p-4 sm:p-6 lg:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-brand-charcoal">
                  {editingService.id ? 'Edit Service' : 'Create New Service'}
                </h3>
                <button
                  onClick={() => setEditingService(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Service Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.name || ''}
                      onChange={(e) =>
                        setEditingService({ ...editingService, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.slug || ''}
                      onChange={(e) =>
                        setEditingService({ ...editingService, slug: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Short Summary (Hero / Cards)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.shortDescription || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, shortDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Full Description (Detail Page)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingService.fullDescription || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, fullDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <ImageUpload
                  label="Service Cover / Hero Image"
                  value={editingService.heroImageUrl || ''}
                  onChange={(url) => setEditingService({ ...editingService, heroImageUrl: url })}
                  aspectRatio="landscape"
                  helperText="Format JPG, PNG, WEBP. Maksimal 100MB."
                />

                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={editingService.order || 1}
                    onChange={(e) =>
                      setEditingService({ ...editingService, order: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Capabilities (One item per line)
                  </label>
                  <textarea
                    rows={4}
                    value={capabilityInput}
                    onChange={(e) => setCapabilityInput(e.target.value)}
                    placeholder="Strategic Marketing Communication&#10;Brand Activation&#10;Media Event"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
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
                    <span>Save Service</span>
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
