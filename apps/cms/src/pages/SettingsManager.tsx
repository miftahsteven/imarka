import React, { useState, useEffect } from 'react';
import { cmsFetch, getImageUrl } from '../lib/api';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import { SiteSetting } from '@imarka/types';
import { Save, CheckCircle2, Globe, Sparkles } from 'lucide-react';

export default function SettingsManager() {
  const [settings, setSettings] = useState<SiteSetting | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    cmsFetch<SiteSetting>('/admin/settings')
      .then((data) => setSettings(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSuccessMsg('');

    try {
      await cmsFetch('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
      setSuccessMsg('Site settings updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex-1 flex flex-col">
        <Header title="Site Settings" subtitle="Global branding and corporate configuration" />
        <div className="p-8 text-center text-sm text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Site Settings" subtitle="Global branding, contact coordinates, and SEO tags" />

      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl space-y-6">
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-3 rounded-lg flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-6 text-xs">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal border-b pb-2">
              Brand Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">
                  Company / Site Name
                </label>
                <input
                  type="text"
                  required
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">
                  Primary Tagline
                </label>
                <input
                  type="text"
                  required
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-brand-charcoal uppercase mb-1">
                Corporate Description
              </label>
              <textarea
                rows={3}
                required
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal border-b pb-2">
              Contact & Social Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">
                  WhatsApp Number (with Country Code)
                </label>
                <input
                  type="text"
                  required
                  value={settings.contactWhatsapp}
                  onChange={(e) => setSettings({ ...settings, contactWhatsapp: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-brand-charcoal uppercase mb-1">
                Office / Operational Address
              </label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">
                  Instagram URL
                </label>
                <input
                  type="text"
                  value={settings.socialInstagram || ''}
                  onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinkedin || ''}
                  onChange={(e) => setSettings({ ...settings, socialLinkedin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Media & Branding Assets */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal border-b pb-2">
              Branding & Media Assets
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUpload
                label="Primary Brand Logo (Transparent Symbol)"
                value={
                  settings.logoUrl === '/images/logo.png' || settings.logoUrl === '/images/logo-clean.png'
                    ? '/images/imarka-symbol.png'
                    : settings.logoUrl || '/images/imarka-symbol.png'
                }
                onChange={(url) => setSettings({ ...settings, logoUrl: url })}
                aspectRatio="square"
                helperText="Logo simbol transparan (PNG, SVG, maks. 100MB)."
              />

              <ImageUpload
                label="Favicon / Browser Tab Icon"
                value={
                  settings.faviconUrl === '/images/logo.png' || settings.faviconUrl === '/images/logo-clean.png'
                    ? '/images/imarka-symbol.png'
                    : settings.faviconUrl || '/images/imarka-symbol.png'
                }
                onChange={(url) => setSettings({ ...settings, faviconUrl: url })}
                aspectRatio="square"
                helperText="Ikon tab browser (PNG, ICO, SVG, maks. 100MB)."
              />
            </div>

            <ImageUpload
              label="Default OpenGraph / Social Share Image"
              value={settings.ogImageDefault || ''}
              onChange={(url) => setSettings({ ...settings, ogImageDefault: url })}
              aspectRatio="banner"
              helperText="Gambar preview saat link dibagikan di WhatsApp/LinkedIn (1200x630, maks. 100MB)."
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-brand-red hover:bg-brand-redDark text-white font-bold rounded-lg shadow flex items-center gap-2"
            >
              <Save size={14} />
              <span>{saving ? 'Saving...' : 'Save Site Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
