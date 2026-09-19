import React, { useState, useEffect } from 'react';
import {
  Compass,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Layers,
  FileText,
  Eye,
  EyeOff,
  AlertCircle,
  Menu,
} from 'lucide-react';
import { api } from '../lib/api';
import { NavigationItem, CustomPage } from '@imarka/types';
import { useSidebar } from '../context/SidebarContext';

type NavTab = 'HEADER' | 'FOOTER_SERVICES' | 'FOOTER_COMPANY' | 'FOOTER_LEGAL';

const tabConfigs: { key: NavTab; label: string; desc: string; icon: any }[] = [
  {
    key: 'HEADER',
    label: 'Header Menu',
    desc: 'Menu navigasi utama yang tampil di navbar atas website',
    icon: Compass,
  },
  {
    key: 'FOOTER_SERVICES',
    label: 'Footer — Layanan',
    desc: 'Kolom tautan layanan di bagian footer website',
    icon: Layers,
  },
  {
    key: 'FOOTER_COMPANY',
    label: 'Footer — Perusahaan',
    desc: 'Kolom tautan profil dan informasi korporat di footer',
    icon: FileText,
  },
  {
    key: 'FOOTER_LEGAL',
    label: 'Footer — Kebijakan Legal',
    desc: 'Tautan privasi dan ketentuan layanan di baris bawah footer',
    icon: ExternalLink,
  },
];

const standardRoutes = [
  { label: 'Homepage', url: '/' },
  { label: 'About Us (Tentang Kami)', url: '/about' },
  { label: 'Our Services (Katalog Layanan)', url: '/services' },
  { label: 'Experiences & Portfolio (Studi Kasus)', url: '/experiences' },
  { label: 'Insights & News (Artikel & Wawasan)', url: '/insights' },
  { label: 'Visual Gallery (Galeri Foto)', url: '/gallery' },
  { label: 'Our Team (Tim & Struktur)', url: '/team' },
  { label: 'Contact & Inquiry (Kontak & Penawaran)', url: '/contact' },
  { label: 'Privacy Policy (Kebijakan Privasi)', url: '/privacy-policy' },
  { label: 'Terms of Service (Syarat & Ketentuan)', url: '/terms' },
];

export default function NavigationManager() {
  const { toggle } = useSidebar();
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [activeTab, setActiveTab] = useState<NavTab>('HEADER');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);

  // Form state
  const [formLabel, setFormLabel] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formLocation, setFormLocation] = useState<NavTab>('HEADER');
  const [formIsVisible, setFormIsVisible] = useState(true);
  const [formOrder, setFormOrder] = useState(0);
  const [urlMode, setUrlMode] = useState<'page' | 'standard' | 'custom'>('standard');
  const [saving, setSaving] = useState(false);
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchNavigation = async () => {
    try {
      setLoading(true);
      const [navData, pagesData] = await Promise.all([
        api.get<NavigationItem[]>('/admin/navigation'),
        api.get<CustomPage[]>('/admin/pages').catch(() => []),
      ]);

      if (Array.isArray(navData)) setItems(navData);
      if (Array.isArray(pagesData)) setCustomPages(pagesData);
    } catch (err: any) {
      console.error('Error fetching navigation:', err);
      setActionNotice({ type: 'error', message: 'Gagal memuat data menu navigasi.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavigation();
  }, []);

  const showNotice = (message: string, type: 'success' | 'error' = 'success') => {
    setActionNotice({ type, message });
    setTimeout(() => setActionNotice(null), 4000);
  };

  const currentTabItems = items
    .filter((it) => (it.location || 'HEADER') === activeTab)
    .sort((a, b) => a.order - b.order);

  const openAddModal = () => {
    setEditingItem(null);
    setFormLabel('');
    setFormUrl('/');
    setFormLocation(activeTab);
    setFormIsVisible(true);
    setFormOrder(currentTabItems.length + 1);
    setUrlMode('standard');
    setModalOpen(true);
  };

  const openEditModal = (item: NavigationItem) => {
    setEditingItem(item);
    setFormLabel(item.label);
    setFormUrl(item.url);
    setFormLocation((item.location as NavTab) || 'HEADER');
    setFormIsVisible(item.isVisible);
    setFormOrder(item.order);

    if (item.url.startsWith('/pages/')) {
      setUrlMode('page');
    } else if (standardRoutes.some((r) => r.url === item.url)) {
      setUrlMode('standard');
    } else {
      setUrlMode('custom');
    }

    setModalOpen(true);
  };

  const handleToggleActive = async (item: NavigationItem) => {
    try {
      const res = await api.patch<NavigationItem>(`/admin/navigation/${item.id}/toggle`, {});
      setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, isVisible: res.isVisible } : it)));
      showNotice(
        `Menu "${item.label}" berhasil di-${res.isVisible ? 'aktifkan' : 'non-aktifkan'}.`
      );
    } catch (err: any) {
      console.error('Error toggling visibility:', err);
      showNotice('Gagal mengubah status menu.', 'error');
    }
  };

  const handleMoveOrder = async (item: NavigationItem, direction: 'up' | 'down') => {
    const sorted = [...currentTabItems];
    const currentIndex = sorted.findIndex((i) => i.id === item.id);
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === sorted.length - 1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const targetItem = sorted[targetIndex];

    const newSorted = sorted.map((it, idx) => {
      if (idx === currentIndex) return { ...it, order: targetItem.order };
      if (idx === targetIndex) return { ...it, order: item.order };
      return it;
    });

    setItems((prev) =>
      prev.map((it) => {
        const match = newSorted.find((ns) => ns.id === it.id);
        return match ? { ...it, order: match.order } : it;
      })
    );

    try {
      await api.post('/admin/navigation/reorder', {
        items: newSorted.map((it) => ({ id: it.id, order: it.order })),
      });
      showNotice(`Urutan menu "${item.label}" berhasil diperbarui.`);
    } catch (err: any) {
      console.error('Reorder error:', err);
      fetchNavigation();
    }
  };

  const handleDelete = async (item: NavigationItem) => {
    if (!confirm(`Hapus menu "${item.label}" dari ${activeTab}?`)) return;

    try {
      await api.delete(`/admin/navigation/${item.id}`);
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      showNotice(`Menu "${item.label}" berhasil dihapus.`);
    } catch (err: any) {
      console.error('Delete error:', err);
      showNotice('Gagal menghapus menu.', 'error');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLabel.trim() || !formUrl.trim()) {
      showNotice('Nama menu dan URL tidak boleh kosong!', 'error');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        label: formLabel.trim(),
        url: formUrl.trim(),
        location: formLocation,
        isVisible: formIsVisible,
        order: Number(formOrder) || 0,
      };

      if (editingItem) {
        const res = await api.put<NavigationItem>(`/admin/navigation/${editingItem.id}`, payload);
        setItems((prev) => prev.map((it) => (it.id === editingItem.id ? res : it)));
        showNotice(`Menu "${res.label}" berhasil diperbarui.`);
      } else {
        const res = await api.post<NavigationItem>('/admin/navigation', payload);
        setItems((prev) => [...prev, res]);
        showNotice(`Menu "${res.label}" berhasil ditambahkan.`);
      }

      setModalOpen(false);
    } catch (err: any) {
      console.error('Save error:', err);
      showNotice(err.message || 'Gagal menyimpan menu.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const activeCount = currentTabItems.filter((i) => i.isVisible).length;
  const currentTabInfo = tabConfigs.find((t) => t.key === activeTab)!;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="p-2 -ml-2 rounded-lg text-brand-graphite hover:text-brand-charcoal hover:bg-gray-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal">Navigation Menu Manager</h1>
            <p className="text-xs sm:text-sm text-brand-graphite mt-1">
              Kelola nama menu, target URL, urutan, serta aktifkan atau non-aktifkan menu di Header dan Footer.
            </p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-brand-red hover:bg-brand-redDark text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          <span>Tambah Menu Baru</span>
        </button>
      </div>

      {/* Notice Alert */}
      {actionNotice && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium transition-all ${
            actionNotice.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <AlertCircle size={18} />
          <span>{actionNotice.message}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-1.5 bg-gray-100 rounded-2xl">
        {tabConfigs.map((tab) => {
          const Icon = tab.icon;
          const isTabActive = activeTab === tab.key;
          const tabCount = items.filter((i) => (i.location || 'HEADER') === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isTabActive
                  ? 'bg-white text-brand-charcoal shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-brand-charcoal hover:bg-white/50'
              }`}
            >
              <Icon size={16} className={isTabActive ? 'text-brand-red' : 'text-gray-400'} />
              <span className="truncate">{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[11px] ${
                  isTabActive ? 'bg-brand-red/10 text-brand-red' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {tabCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Context Info Strip */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold text-brand-red uppercase tracking-wider block">Lokasi Aktif</span>
          <p className="text-sm font-semibold text-brand-charcoal mt-0.5">{currentTabInfo.desc}</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-md border border-emerald-100">
            {activeCount} Menu Aktif
          </span>
          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 font-medium rounded-md">
            Total {currentTabItems.length} Menu
          </span>
        </div>
      </div>

      {/* Menu List Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-brand-graphite">Memuat data menu...</div>
        ) : currentTabItems.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Compass size={36} className="mx-auto text-gray-300" />
            <p className="text-sm font-semibold text-brand-charcoal">Belum ada menu di tab ini</p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-brand-red text-white text-xs font-bold rounded-lg shadow-sm hover:bg-brand-redDark transition-colors"
            >
              + Buat Menu Pertama
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto min-w-[720px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-extrabold uppercase tracking-wider text-brand-graphite">
                  <th className="py-3.5 px-4 w-24 text-center">Urutan</th>
                  <th className="py-3.5 px-4">Nama Menu (Label)</th>
                  <th className="py-3.5 px-4">Target URL</th>
                  <th className="py-3.5 px-4 text-center w-36">Status Tampil</th>
                  <th className="py-3.5 px-4 text-right w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {currentTabItems.map((item, idx) => {
                  const isFirst = idx === 0;
                  const isLast = idx === currentTabItems.length - 1;
                  const isCustomPage = item.url.startsWith('/pages/');
                  const isExternal = item.url.startsWith('http');

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50/80 transition-colors ${
                        !item.isVisible ? 'bg-gray-50/50 opacity-60' : ''
                      }`}
                    >
                      {/* Order Controls */}
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleMoveOrder(item, 'up')}
                            disabled={isFirst}
                            className={`p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors ${
                              isFirst ? 'opacity-20 cursor-not-allowed' : ''
                            }`}
                            title="Pindah ke Atas"
                          >
                            <ArrowUp size={15} />
                          </button>
                          <span className="w-6 text-center font-bold text-xs text-gray-700">
                            {idx + 1}
                          </span>
                          <button
                            onClick={() => handleMoveOrder(item, 'down')}
                            disabled={isLast}
                            className={`p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors ${
                              isLast ? 'opacity-20 cursor-not-allowed' : ''
                            }`}
                            title="Pindah ke Bawah"
                          >
                            <ArrowDown size={15} />
                          </button>
                        </div>
                      </td>

                      {/* Label */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-brand-charcoal">{item.label}</div>
                      </td>

                      {/* URL & Type Tag */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono">
                            {item.url}
                          </code>
                          {isCustomPage ? (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold text-[10px] rounded-full border border-blue-200">
                              Custom Page
                            </span>
                          ) : isExternal ? (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 font-semibold text-[10px] rounded-full border border-amber-200">
                              Eksternal
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 font-medium text-[10px] rounded-full">
                              Sistem
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Active Toggle Switch */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleActive(item)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            item.isVisible
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                          title="Klik untuk mengubah aktif / non-aktif"
                        >
                          {item.isVisible ? (
                            <>
                              <Eye size={13} />
                              <span>Aktif</span>
                            </>
                          ) : (
                            <>
                              <EyeOff size={13} />
                              <span>Non-Aktif</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 text-gray-600 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors"
                            title="Edit Menu"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Menu"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Menu Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal">
                  {editingItem ? 'Edit Menu Navigasi' : 'Tambah Menu Navigasi Baru'}
                </h3>
                <p className="text-xs text-brand-graphite mt-0.5">
                  Atur teks judul dan arah tujuan URL menu
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Menu Label */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                  Nama Menu (Label) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: CSR & Sustainability, Hubungi Kami"
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                />
              </div>

              {/* Target Location */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                  Lokasi Penempatan Menu *
                </label>
                <select
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value as NavTab)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                >
                  <option value="HEADER">Header (Navbar Atas)</option>
                  <option value="FOOTER_SERVICES">Footer — Kolom Layanan</option>
                  <option value="FOOTER_COMPANY">Footer — Kolom Perusahaan</option>
                  <option value="FOOTER_LEGAL">Footer — Baris Kebijakan Legal</option>
                </select>
              </div>

              {/* URL Selection Mode */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                  Pilih Target Tujuan URL *
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrlMode('page')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      urlMode === 'page'
                        ? 'border-brand-red bg-red-50 text-brand-red shadow-xs'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Custom Page
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrlMode('standard')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      urlMode === 'standard'
                        ? 'border-brand-red bg-red-50 text-brand-red shadow-xs'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Rute Sistem
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrlMode('custom')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      urlMode === 'custom'
                        ? 'border-brand-red bg-red-50 text-brand-red shadow-xs'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    URL Manual
                  </button>
                </div>

                {/* Sub-inputs based on mode */}
                {urlMode === 'page' && (
                  <div className="mt-2">
                    {customPages.length === 0 ? (
                      <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                        Belum ada Halaman Kustom. Buat halaman baru di menu <strong>Pages</strong> terlebih dahulu, atau gunakan opsi URL Manual.
                      </p>
                    ) : (
                      <select
                        value={formUrl}
                        onChange={(e) => {
                          setFormUrl(e.target.value);
                          if (!formLabel) {
                            const found = customPages.find((p) => `/pages/${p.slug}` === e.target.value);
                            if (found) setFormLabel(found.title);
                          }
                        }}
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red bg-white"
                      >
                        <option value="">-- Pilih Halaman Kustom --</option>
                        {customPages.map((p) => (
                          <option key={p.id} value={`/pages/${p.slug}`}>
                            {p.title} (/pages/{p.slug})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}

                {urlMode === 'standard' && (
                  <div className="mt-2">
                    <select
                      value={formUrl}
                      onChange={(e) => {
                        setFormUrl(e.target.value);
                        if (!formLabel) {
                          const found = standardRoutes.find((r) => r.url === e.target.value);
                          if (found) setFormLabel(found.label.split(' (')[0]);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red bg-white"
                    >
                      {standardRoutes.map((r) => (
                        <option key={r.url} value={r.url}>
                          {r.label} — {r.url}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {urlMode === 'custom' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="https://... atau /custom-url"
                      value={formUrl}
                      onChange={(e) => setFormUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red font-mono text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Status Visibility Toggle */}
              <div className="pt-2 flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <span className="text-xs font-bold text-brand-charcoal block">Status Tampil di Website</span>
                  <span className="text-xs text-brand-graphite">
                    {formIsVisible ? 'Menu akan langsung terlihat oleh pengunjung' : 'Menu disimpan tetapi tidak ditampilkan'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormIsVisible(!formIsVisible)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    formIsVisible ? 'bg-emerald-500 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                </button>
              </div>

              {/* Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
