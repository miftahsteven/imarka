import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  Check,
  X,
  Search,
  Sparkles,
  Link as LinkIcon,
  Compass,
  Layers,
  Copy,
  Calendar,
  AlertCircle,
  Menu,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Minus,
  Code,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { api, getImageUrl } from '../lib/api';
import { CustomPage } from '@imarka/types';
import ImageUpload from '../components/ImageUpload';
import { useSidebar } from '../context/SidebarContext';

export default function PagesManager() {
  const { toggle } = useSidebar();
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState<'content' | 'preview' | 'seo'>('content');
  const [editorMode, setEditorMode] = useState<'visual' | 'html'>('visual');
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // Quick navigation link modal state
  const [navModalOpen, setNavModalOpen] = useState(false);
  const [selectedPageForNav, setSelectedPageForNav] = useState<CustomPage | null>(null);
  const [navLocation, setNavLocation] = useState<'HEADER' | 'FOOTER_SERVICES' | 'FOOTER_COMPANY' | 'FOOTER_LEGAL'>('HEADER');
  const [navLabel, setNavLabel] = useState('');
  const [navSaving, setNavSaving] = useState(false);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [heroImageUrl, setHeroImageUrl] = useState('/images/hero-keynote.jpg');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [addToNavOnCreate, setAddToNavOnCreate] = useState(false);
  const [createNavLocation, setCreateNavLocation] = useState<'HEADER' | 'FOOTER_SERVICES' | 'FOOTER_COMPANY' | 'FOOTER_LEGAL'>('HEADER');

  const wysiwygRef = useRef<HTMLDivElement>(null);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const data = await api.get<CustomPage[]>('/admin/pages');
      if (Array.isArray(data)) {
        setPages(data);
      }
    } catch (err: any) {
      console.error('Error fetching pages:', err);
      setActionNotice({ type: 'error', message: 'Gagal memuat daftar halaman kustom.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Synchronize wysiwyg innerHTML with content state
  useEffect(() => {
    if (modalOpen && editorMode === 'visual' && wysiwygRef.current) {
      if (wysiwygRef.current.innerHTML !== content) {
        wysiwygRef.current.innerHTML = content || '<p>Mulai tulis konten artikel atau halaman di sini...</p>';
      }
    }
  }, [modalOpen, editorMode, content]);

  // Clean slug helper
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (autoSlug) {
      setSlug(slugify(newTitle));
    }
    if (!metaTitle) {
      setMetaTitle(`${newTitle} | Imarka Megalo Indonesia`);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setAutoSlug(true);
    setHeroImageUrl('/images/hero-keynote.jpg');
    setExcerpt('');
    setContent(`<h2>Selamat Datang di Halaman Baru</h2>
<p>Imarka Megalo Indonesia adalah strategic event orchestrator dan experiential agency terkemuka yang menghadirkan pengalaman berkesan dengan standar eksekusi tertinggi.</p>
<h3>Layanan & Keunggulan Kami</h3>
<ul>
  <li>Perencanaan strategis berbasis data dan objektif korporasi.</li>
  <li>Desain visual kelas dunia dan tata panggung terintegrasi.</li>
  <li>Produksi teknis mutakhir (lighting, sound, LED stage).</li>
  <li>Manajemen protokol kenegaraan dan tamu VVIP.</li>
</ul>
<blockquote>"Kami mengubah visi klien menjadi momen bersejarah yang menginspirasi."</blockquote>
<p>Hubungi tim spesialis kami untuk mendiskusikan kebutuhan aktivasi dan agenda strategis perusahaan Anda.</p>`);
    setStatus('PUBLISHED');
    setMetaTitle('');
    setMetaDescription('');
    setAddToNavOnCreate(false);
    setCreateNavLocation('HEADER');
    setActiveEditorTab('content');
    setEditorMode('visual');
    setModalOpen(true);
  };

  const openEditModal = (page: CustomPage) => {
    setEditingId(page.id);
    setTitle(page.title);
    setSlug(page.slug);
    setAutoSlug(false);
    setHeroImageUrl(page.heroImageUrl || '/images/hero-keynote.jpg');
    setExcerpt(page.excerpt || '');
    setContent(page.content);
    setStatus(page.status as 'PUBLISHED' | 'DRAFT');
    setMetaTitle(page.metaTitle || `${page.title} | Imarka Megalo Indonesia`);
    setMetaDescription(page.metaDescription || page.excerpt || '');
    setAddToNavOnCreate(false);
    setActiveEditorTab('content');
    setEditorMode('visual');
    setModalOpen(true);
  };

  // WYSIWYG command executor
  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (wysiwygRef.current) {
      setContent(wysiwygRef.current.innerHTML);
    }
  };

  const insertSnippet = (snippetHtml: string) => {
    if (editorMode === 'visual') {
      execCmd('insertHTML', snippetHtml);
    } else {
      setContent((prev) => prev + '\n' + snippetHtml);
    }
  };

  const handleSavePage = async () => {
    if (!title.trim()) {
      setActionNotice({ type: 'error', message: 'Judul halaman wajib diisi.' });
      return;
    }

    let finalContent = content;
    if (editorMode === 'visual' && wysiwygRef.current) {
      finalContent = wysiwygRef.current.innerHTML;
    }

    if (!finalContent.trim()) {
      setActionNotice({ type: 'error', message: 'Konten halaman tidak boleh kosong.' });
      return;
    }

    const cleanSlug = slug.trim() ? slugify(slug) : slugify(title);

    setSaving(true);
    setActionNotice(null);

    try {
      if (editingId) {
        // Update page
        await api.put(`/admin/pages/${editingId}`, {
          title: title.trim(),
          slug: cleanSlug,
          heroImageUrl: heroImageUrl.trim(),
          excerpt: excerpt.trim(),
          content: finalContent,
          status,
          metaTitle: metaTitle.trim(),
          metaDescription: metaDescription.trim(),
        });
        setActionNotice({ type: 'success', message: `Halaman "${title}" berhasil diperbarui!` });
      } else {
        // Create new page
        await api.post('/admin/pages', {
          title: title.trim(),
          slug: cleanSlug,
          heroImageUrl: heroImageUrl.trim(),
          excerpt: excerpt.trim(),
          content: finalContent,
          status,
          metaTitle: metaTitle.trim(),
          metaDescription: metaDescription.trim(),
          addToNavigation: addToNavOnCreate,
          navLocation: createNavLocation,
        });
        setActionNotice({
          type: 'success',
          message: `Halaman baru "${title}" berhasil dibuat ${addToNavOnCreate ? `dan ditambahkan ke ${createNavLocation}` : ''}!`,
        });
      }

      setModalOpen(false);
      await fetchPages();
    } catch (err: any) {
      console.error('Error saving page:', err);
      setActionNotice({ type: 'error', message: err.message || 'Gagal menyimpan halaman.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, pageTitle: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus halaman "${pageTitle}"?\nTindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      await api.delete(`/admin/pages/${id}`);
      setActionNotice({ type: 'success', message: `Halaman "${pageTitle}" berhasil dihapus.` });
      await fetchPages();
    } catch (err: any) {
      console.error('Error deleting page:', err);
      setActionNotice({ type: 'error', message: 'Gagal menghapus halaman.' });
    }
  };

  const openNavModal = (page: CustomPage) => {
    setSelectedPageForNav(page);
    setNavLabel(page.title);
    setNavLocation('HEADER');
    setNavModalOpen(true);
  };

  const handleAddToNavigation = async () => {
    if (!selectedPageForNav || !navLabel.trim()) return;

    setNavSaving(true);
    try {
      await api.post('/admin/navigation', {
        label: navLabel.trim(),
        url: `/pages/${selectedPageForNav.slug}`,
        location: navLocation,
        isVisible: true,
      });

      setActionNotice({
        type: 'success',
        message: `Halaman "${selectedPageForNav.title}" berhasil ditambahkan ke menu ${navLocation}!`,
      });
      setNavModalOpen(false);
    } catch (err: any) {
      console.error('Error adding to nav:', err);
      setActionNotice({ type: 'error', message: 'Gagal menambahkan ke menu navigasi.' });
    } finally {
      setNavSaving(false);
    }
  };

  const copyPageUrl = (pageSlug: string) => {
    const fullUrl = `${window.location.origin.replace('5173', '3000')}/pages/${pageSlug}`;
    navigator.clipboard.writeText(fullUrl);
    setActionNotice({ type: 'success', message: `URL disalin: ${fullUrl}` });
  };

  // Filtered pages
  const filteredPages = pages.filter((p) => {
    const q = searchTerm.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || (p.excerpt && p.excerpt.toLowerCase().includes(q));
  });

  const publishedCount = pages.filter((p) => p.status === 'PUBLISHED').length;
  const draftCount = pages.filter((p) => p.status === 'DRAFT').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="lg:hidden p-2 text-gray-600 hover:text-brand-charcoal hover:bg-white rounded-lg border border-gray-200 transition-colors"
            aria-label="Buka Menu Sidebar"
          >
            <Menu size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-brand-red/10 text-brand-red rounded-xl">
                <FileText size={24} />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-brand-charcoal tracking-tight">
                Kelola Halaman & Post Kustom
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Buat halaman baru layaknya WordPress dengan Hero Image &amp; Rich Content WYSIWYG, lalu sematkan ke menu header/footer.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openCreateModal}
            className="w-full sm:w-auto px-4 py-2.5 bg-brand-red hover:bg-brand-redDark text-white text-xs sm:text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <Plus size={18} />
            <span>Buat Halaman Baru</span>
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionNotice && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm animate-in fade-in duration-200 ${
            actionNotice.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {actionNotice.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span className="font-medium">{actionNotice.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="p-1 hover:opacity-75 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Overview Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Halaman Kustom</div>
            <div className="text-2xl font-black text-brand-charcoal mt-0.5">{pages.length}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Memiliki URL slug publik otomatis</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
            <FileText size={22} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Halaman Published</div>
            <div className="text-2xl font-black text-emerald-700 mt-0.5">{publishedCount}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Aktif dan dapat diakses publik</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Check size={22} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Draft / Konsep</div>
            <div className="text-2xl font-black text-amber-700 mt-0.5">{draftCount}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Disimpan internal &amp; belum tayang</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock size={22} />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari judul halaman atau URL slug..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
          />
        </div>
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-100 rounded-xl"
          >
            Reset
          </button>
        )}
      </div>

      {/* Pages Listing */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-500 font-medium">Memuat data halaman...</p>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="py-16 text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
              <FileText size={28} />
            </div>
            <h3 className="text-sm font-bold text-gray-800">
              {searchTerm ? 'Tidak ada halaman yang cocok dengan pencarian' : 'Belum ada Halaman Kustom'}
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 mb-4">
              {searchTerm
                ? 'Coba gunakan kata kunci pencarian yang lain.'
                : 'Buat halaman informasi perusahaan, program CSR, laporan tahunan, atau artikel khusus yang dapat dihubungkan ke header & footer menu.'}
            </p>
            {!searchTerm && (
              <button
                type="button"
                onClick={openCreateModal}
                className="px-4 py-2 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-xl inline-flex items-center gap-2"
              >
                <Plus size={16} />
                <span>Buat Halaman Pertama</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/75 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Hero &amp; Judul Halaman</th>
                  <th className="py-3 px-4">URL Slug Publik</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4">Diperbarui</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                          {page.heroImageUrl ? (
                            <img
                              src={getImageUrl(page.heroImageUrl)}
                              alt={page.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageIcon size={18} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs sm:max-w-md">
                          <div className="font-bold text-brand-charcoal truncate">{page.title}</div>
                          {page.excerpt ? (
                            <p className="text-[11px] text-gray-500 truncate mt-0.5">{page.excerpt}</p>
                          ) : (
                            <p className="text-[11px] text-gray-400 italic mt-0.5">Tidak ada ringkasan</p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 font-mono text-[11px] text-gray-700">
                        <span className="text-gray-400">/pages/</span>
                        <span className="font-semibold text-brand-charcoal">{page.slug}</span>
                        <button
                          type="button"
                          onClick={() => copyPageUrl(page.slug)}
                          title="Salin URL Lengkap"
                          className="text-gray-400 hover:text-brand-charcoal ml-1 p-0.5"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          page.status === 'PUBLISHED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            page.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        {page.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[11px] text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={13} className="text-gray-400" />
                        <span>{new Date(page.updatedAt || page.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Add to Navigation Quick Action */}
                        <button
                          type="button"
                          onClick={() => openNavModal(page)}
                          className="px-2.5 py-1 text-xs font-semibold bg-brand-charcoal/5 hover:bg-brand-charcoal/10 text-brand-charcoal rounded-lg flex items-center gap-1 transition-colors"
                          title="Pasang Halaman ini ke Menu Header/Footer"
                        >
                          <Compass size={13} />
                          <span className="hidden sm:inline">Pasang ke Menu</span>
                        </button>

                        {/* View Live Public Page */}
                        <a
                          href={`http://localhost:3000/pages/${page.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-gray-400 hover:text-brand-charcoal hover:bg-gray-100 rounded-lg transition-colors"
                          title="Lihat Halaman Publik (Port 3000)"
                        >
                          <ExternalLink size={15} />
                        </a>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => openEditModal(page)}
                          className="p-1.5 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors"
                          title="Edit Halaman & Konten"
                        >
                          <Edit2 size={15} />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(page.id, page.title)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Halaman"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT PAGE MODAL (WORDPRESS-STYLE POWERFUL YET INTUITIVE WYSIWYG) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-brand-red/10 text-brand-red rounded-lg">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-brand-charcoal">
                    {editingId ? 'Edit Halaman / Post' : 'Buat Halaman Baru'}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Sistem publikasi konten berbasis WordPress: slug otomatis, hero image banner, dan editor responsif.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors"
                  aria-label="Tutup"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Tab Switcher */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 bg-white shrink-0 overflow-x-auto">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('content')}
                  className={`py-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all ${
                    activeEditorTab === 'content'
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Edit2 size={14} />
                  <span>Konten &amp; Hero Image</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // Update content from wysiwyg ref before previewing
                    if (editorMode === 'visual' && wysiwygRef.current) {
                      setContent(wysiwygRef.current.innerHTML);
                    }
                    setActiveEditorTab('preview');
                  }}
                  className={`py-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all ${
                    activeEditorTab === 'preview'
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Eye size={14} />
                  <span>Tinjau Live Preview</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveEditorTab('seo')}
                  className={`py-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all ${
                    activeEditorTab === 'seo'
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Compass size={14} />
                  <span>SEO &amp; Navigasi Menu</span>
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-semibold text-gray-500">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'PUBLISHED' | 'DRAFT')}
                  className="text-xs font-bold py-1 px-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
                >
                  <option value="PUBLISHED">PUBLISHED (Aktif)</option>
                  <option value="DRAFT">DRAFT (Konsep)</option>
                </select>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-gray-50/40">
              {/* TAB 1: CONTENT & HERO IMAGE */}
              {activeEditorTab === 'content' && (
                <div className="space-y-5">
                  {/* Title & Slug in 2-Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-1.5">
                        Judul Halaman / Post <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Contoh: Program Keberlanjutan &amp; CSR"
                        className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red bg-white font-medium"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                          URL Slug <span className="text-brand-red">*</span>
                        </label>
                        <label className="text-[11px] text-gray-500 flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={autoSlug}
                            onChange={(e) => {
                              setAutoSlug(e.target.checked);
                              if (e.target.checked) setSlug(slugify(title));
                            }}
                            className="rounded text-brand-red focus:ring-brand-red"
                          />
                          <span>Generate Otomatis</span>
                        </label>
                      </div>
                      <div className="flex rounded-xl overflow-hidden border border-gray-300 bg-white">
                        <span className="px-3 py-2 text-xs font-mono text-gray-400 bg-gray-50 border-r border-gray-200">
                          /pages/
                        </span>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => {
                            setSlug(e.target.value);
                            setAutoSlug(false);
                          }}
                          placeholder="program-keberlanjutan-csr"
                          className="flex-1 px-3 py-2 text-xs font-mono text-brand-charcoal focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hero Image Component (<100MB + Presets) */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                    <ImageUpload
                      value={heroImageUrl}
                      onChange={(url) => setHeroImageUrl(url)}
                      label="Hero Image Halaman (Banner Utama)"
                      helperText="Gambar ini akan tampil sebagai banner hero di bagian atas halaman dengan overlay gradien korporat. Maksimal 100MB."
                      aspectRatio="banner"
                    />
                  </div>

                  {/* WYSIWYG Content Editor */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                    {/* Editor Toolbar */}
                    <div className="p-2.5 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1">
                        {/* Heading selector */}
                        <button
                          type="button"
                          onClick={() => execCmd('formatBlock', '<h2>')}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-0.5"
                          title="Heading 2 (Sub-Judul Besar)"
                        >
                          <Heading2 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => execCmd('formatBlock', '<h3>')}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-0.5"
                          title="Heading 3 (Sub-Judul Sedang)"
                        >
                          <Heading3 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => execCmd('formatBlock', '<p>')}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700 text-xs font-bold"
                          title="Paragraph Normal"
                        >
                          P
                        </button>

                        <div className="w-[1px] h-5 bg-gray-300 mx-1" />

                        {/* Formatting */}
                        <button
                          type="button"
                          onClick={() => execCmd('bold')}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
                          title="Tebal (Bold)"
                        >
                          <Bold size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => execCmd('italic')}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
                          title="Miring (Italic)"
                        >
                          <Italic size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => execCmd('underline')}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
                          title="Garis Bawah (Underline)"
                        >
                          <Underline size={15} />
                        </button>

                        <div className="w-[1px] h-5 bg-gray-300 mx-1" />

                        {/* Lists & Quote */}
                        <button
                          type="button"
                          onClick={() => execCmd('insertUnorderedList')}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
                          title="Bullet List"
                        >
                          <List size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => execCmd('insertOrderedList')}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
                          title="Numbered List"
                        >
                          <ListOrdered size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => execCmd('formatBlock', '<blockquote>')}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
                          title="Quote / Kutipan"
                        >
                          <Quote size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => execCmd('insertHorizontalRule')}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
                          title="Garis Pemisah (Horizontal Rule)"
                        >
                          <Minus size={15} />
                        </button>

                        <div className="w-[1px] h-5 bg-gray-300 mx-1" />

                        {/* Link & Image */}
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt('Masukkan URL tautan (contoh: https://... atau /contact):');
                            if (url) execCmd('createLink', url);
                          }}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
                          title="Sisipkan Tautan (Link)"
                        >
                          <LinkIcon size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt('Masukkan URL gambar (contoh: /images/event-garuda-hd.jpg):');
                            if (url) execCmd('insertImage', url);
                          }}
                          className="p-1.5 rounded hover:bg-gray-200 text-gray-700"
                          title="Sisipkan Gambar dalam Konten"
                        >
                          <ImageIcon size={15} />
                        </button>

                        {/* Quick Corporate Component Snippets */}
                        <button
                          type="button"
                          onClick={() =>
                            insertSnippet(
                              `<div class="my-6 p-4 bg-brand-red/5 border-l-4 border-brand-red rounded-r-xl">
  <h4 class="font-bold text-brand-charcoal text-base mb-1">Sorotan Penting / Komitmen Kami</h4>
  <p class="text-sm text-gray-600 mb-0">Imarka Megalo berkomitmen menyelenggarakan kegiatan berstandar internasional dengan prinsip akuntabilitas dan keberlanjutan.</p>
</div>`
                            )
                          }
                          className="px-2 py-1 text-[11px] font-semibold bg-brand-red/10 hover:bg-brand-red/20 text-brand-red rounded-md flex items-center gap-1 ml-1"
                          title="Sisipkan Kotak Sorotan"
                        >
                          <Sparkles size={12} />
                          <span>+ Kotak Sorotan</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            insertSnippet(
                              `<div class="my-8 text-center bg-gray-50 border border-gray-200 p-6 rounded-2xl">
  <h3 class="text-lg font-bold text-brand-charcoal mb-2">Tertarik Berkolaborasi Bersama Kami?</h3>
  <p class="text-xs text-gray-500 mb-4 max-w-lg mx-auto">Konsultasikan agenda korporasi dan kebutuhan produksi Anda bersama tim spesialis Imarka Megalo.</p>
  <a href="/contact" class="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-xs font-bold rounded-xl shadow-md hover:bg-brand-redDark transition-all">Hubungi Tim Kami &rarr;</a>
</div>`
                            )
                          }
                          className="px-2 py-1 text-[11px] font-semibold bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md flex items-center gap-1"
                          title="Sisipkan Tombol Call-to-Action"
                        >
                          <ArrowRight size={12} />
                          <span>+ Banner Kontak</span>
                        </button>
                      </div>

                      {/* Mode Toggle: Visual vs HTML */}
                      <div className="flex items-center gap-1 bg-gray-200/80 p-0.5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => {
                            if (editorMode === 'html') {
                              setEditorMode('visual');
                            }
                          }}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                            editorMode === 'visual'
                              ? 'bg-white text-brand-charcoal shadow-xs'
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          Visual WYSIWYG
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (editorMode === 'visual' && wysiwygRef.current) {
                              setContent(wysiwygRef.current.innerHTML);
                            }
                            setEditorMode('html');
                          }}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                            editorMode === 'html'
                              ? 'bg-white text-brand-charcoal shadow-xs'
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          <span className="flex items-center gap-1">
                            <Code size={12} />
                            HTML Source
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Editor Canvas */}
                    {editorMode === 'visual' ? (
                      <div
                        ref={wysiwygRef}
                        contentEditable
                        onInput={() => {
                          if (wysiwygRef.current) {
                            setContent(wysiwygRef.current.innerHTML);
                          }
                        }}
                        className="p-5 min-h-[300px] max-h-[450px] overflow-y-auto focus:outline-none prose prose-sm max-w-none text-brand-charcoal bg-white leading-relaxed"
                        style={{ outline: 'none' }}
                      />
                    ) : (
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="<p>Masukkan kode HTML di sini...</p>"
                        className="w-full p-4 min-h-[300px] max-h-[450px] font-mono text-xs text-gray-800 bg-gray-900 text-gray-100 focus:outline-none"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE PREVIEW */}
              {activeEditorTab === 'preview' && (
                <div className="space-y-6">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye size={16} className="shrink-0" />
                      <span>
                        Berikut adalah tampilan representasi visual bagaimana halaman <strong>/pages/{slug || 'contoh-slug'}</strong> akan dirender untuk pengunjung website.
                      </span>
                    </div>
                    <span className="font-mono text-[10px] bg-blue-100 px-2 py-0.5 rounded font-bold">Preview Mode</span>
                  </div>

                  {/* Public Page Simulation Wrapper */}
                  <div className="border border-gray-300 rounded-2xl overflow-hidden bg-white shadow-md">
                    {/* Simulated Hero Banner */}
                    <div className="relative h-60 sm:h-72 w-full bg-brand-charcoal overflow-hidden flex items-end">
                      <img
                        src={getImageUrl(heroImageUrl || '/images/hero-keynote.jpg')}
                        alt="Hero Preview"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/60 to-transparent" />

                      <div className="relative z-10 p-6 sm:p-10 w-full max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-red/80 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                          <span>Imarka Mega Page</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {title || 'Judul Halaman Publik'}
                        </h1>
                        {excerpt && <p className="text-xs sm:text-sm text-gray-300 mt-2 line-clamp-2">{excerpt}</p>}
                      </div>
                    </div>

                    {/* Simulated Content Body */}
                    <div className="p-6 sm:p-10 max-w-3xl mx-auto">
                      <div
                        className="prose prose-sm sm:prose-base max-w-none text-brand-charcoal leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: content || '<p>Konten halaman masih kosong...</p>' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SEO & NAVIGATION INTEGRATION */}
              {activeEditorTab === 'seo' && (
                <div className="space-y-5">
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center gap-1.5">
                      <Compass size={16} className="text-brand-red" />
                      <span>Sematkan ke Menu Navigasi Website</span>
                    </h4>
                    <p className="text-xs text-gray-500">
                      Anda dapat langsung menyambungkan halaman baru ini ke dalam menu navigasi website tanpa harus berpindah ke Menu Manager.
                    </p>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={addToNavOnCreate}
                          onChange={(e) => setAddToNavOnCreate(e.target.checked)}
                          className="w-4 h-4 text-brand-red rounded focus:ring-brand-red"
                        />
                        <span className="text-xs font-bold text-brand-charcoal">
                          Tambahkan Halaman ini ke Menu Navigasi secara Otomatis
                        </span>
                      </label>

                      {addToNavOnCreate && (
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-200">
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                              Lokasi Menu Navigasi
                            </label>
                            <select
                              value={createNavLocation}
                              onChange={(e) => setCreateNavLocation(e.target.value as any)}
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                            >
                              <option value="HEADER">Header Menu (Navbar Utama Atas)</option>
                              <option value="FOOTER_SERVICES">Footer — Layanan (Services)</option>
                              <option value="FOOTER_COMPANY">Footer — Perusahaan (Company)</option>
                              <option value="FOOTER_LEGAL">Footer — Kebijakan Legal</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                              Target URL yang Dihasilkan
                            </label>
                            <input
                              type="text"
                              disabled
                              value={`/pages/${slug || slugify(title)}`}
                              className="w-full px-3 py-2 text-xs bg-gray-100 border border-gray-300 rounded-lg text-gray-600 font-mono"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Excerpt / Summary */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={16} className="text-brand-red" />
                      <span>Metadata &amp; Search Engine Optimization (SEO)</span>
                    </h4>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Ringkasan / Excerpt (Tampil di kartu &amp; pencarian)
                      </label>
                      <textarea
                        rows={2}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Tulis ringkasan singkat 1-2 kalimat tentang isi halaman ini..."
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Meta Title (SEO &amp; Tab Browser)
                        </label>
                        <input
                          type="text"
                          value={metaTitle}
                          onChange={(e) => setMetaTitle(e.target.value)}
                          placeholder={`${title || 'Judul'} | Imarka Megalo Indonesia`}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Meta Description (Pencarian Google)
                        </label>
                        <input
                          type="text"
                          value={metaDescription}
                          onChange={(e) => setMetaDescription(e.target.value)}
                          placeholder={excerpt || 'Deskripsi singkat untuk cuplikan Google...'}
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 border-t border-gray-200 bg-white flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                disabled={saving}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Batal
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSavePage}
                  disabled={saving}
                  className="px-5 py-2.5 bg-brand-red hover:bg-brand-redDark text-white text-xs sm:text-sm font-bold rounded-xl shadow-md flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>{editingId ? 'Simpan Perubahan' : 'Publikasikan Halaman'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ATTACH TO NAVIGATION MODAL */}
      {navModalOpen && selectedPageForNav && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-brand-red" />
                <h3 className="font-bold text-sm text-brand-charcoal">Pasang ke Menu Navigasi</h3>
              </div>
              <button
                type="button"
                onClick={() => setNavModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nama Label Menu
                </label>
                <input
                  type="text"
                  value={navLabel}
                  onChange={(e) => setNavLabel(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Target URL
                </label>
                <input
                  type="text"
                  disabled
                  value={`/pages/${selectedPageForNav.slug}`}
                  className="w-full px-3 py-2 text-xs bg-gray-100 border border-gray-200 rounded-lg text-gray-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Pilih Lokasi Menu
                </label>
                <select
                  value={navLocation}
                  onChange={(e) => setNavLocation(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                >
                  <option value="HEADER">Header Menu (Navbar Utama Atas)</option>
                  <option value="FOOTER_SERVICES">Footer — Layanan (Services)</option>
                  <option value="FOOTER_COMPANY">Footer — Perusahaan (Company)</option>
                  <option value="FOOTER_LEGAL">Footer — Kebijakan Legal</option>
                </select>
              </div>
            </div>

            <div className="px-5 py-3.5 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setNavModalOpen(false)}
                disabled={navSaving}
                className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleAddToNavigation}
                disabled={navSaving}
                className="px-4 py-2 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
              >
                {navSaving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menambahkan...</span>
                  </>
                ) : (
                  <>
                    <Check size={14} />
                    <span>Tambahkan ke Menu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
