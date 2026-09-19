import React, { useState, useEffect } from 'react';
import { cmsFetch, getImageUrl, API_BASE } from '../lib/api';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import { GalleryAlbum } from '@imarka/types';
import { Plus, Edit2, Trash2, CheckCircle2, Calendar, MapPin, Save, Images, X } from 'lucide-react';

export default function GalleryManager() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAlbum, setEditingAlbum] = useState<Partial<GalleryAlbum> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const loadAlbums = () => {
    cmsFetch<GalleryAlbum[]>('/admin/gallery')
      .then((data) => {
        if (Array.isArray(data)) setAlbums(data);
      })
      .catch(() => {
        // Fallback to public endpoint if token not loaded yet
        fetch(`${API_BASE}/public/gallery`)
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) setAlbums(data);
          })
          .catch((err) => console.error(err));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAlbum) return;
    setSaving(true);
    setSuccessMsg('');

    try {
      if (editingAlbum.id) {
        await cmsFetch(`/admin/gallery/${editingAlbum.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingAlbum),
        });
      } else {
        await cmsFetch('/admin/gallery', {
          method: 'POST',
          body: JSON.stringify(editingAlbum),
        });
      }
      setEditingAlbum(null);
      setSuccessMsg('Album dokumentasi berhasil disimpan!');
      loadAlbums();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan album');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus album ini beserta semua fotonya?')) return;
    try {
      await cmsFetch(`/admin/gallery/${id}`, { method: 'DELETE' });
      loadAlbums();
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus album');
    }
  };

  const handleAddPhotoToAlbum = () => {
    if (!newPhotoUrl.trim()) return;
    const currentPhotos = (editingAlbum?.photos || []) as any[];
    setEditingAlbum({
      ...editingAlbum,
      photos: [...currentPhotos, { url: newPhotoUrl.trim(), caption: '' }],
    });
    setNewPhotoUrl('');
  };

  const handleRemovePhoto = (idx: number) => {
    const currentPhotos = [...(editingAlbum?.photos || [])];
    currentPhotos.splice(idx, 1);
    setEditingAlbum({
      ...editingAlbum,
      photos: currentPhotos,
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Gallery Archive" subtitle="Kelola album foto dokumentasi kegiatan dan pameran resmi" />

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
              <h2 className="text-base font-bold text-brand-charcoal">Visual Albums</h2>
              <p className="text-xs text-brand-graphite">
                Album dokumentasi acara dengan foto resolusi tinggi.
              </p>
            </div>
            <button
              onClick={() =>
                setEditingAlbum({
                  title: '',
                  slug: '',
                  date: new Date().getFullYear().toString(),
                  description: 'Dokumentasi acara resmi',
                  category: 'Corporate Events',
                  coverImageUrl: '/images/hero-keynote.jpg',
                  photos: [],
                })
              }
              className="px-4 py-2 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow w-full sm:w-auto shrink-0"
            >
              <Plus size={14} />
              <span>Tambah Album Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                className="bg-brand-light rounded-xl overflow-hidden border border-gray-200 p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-44 rounded-lg overflow-hidden bg-brand-charcoal border border-gray-200">
                    <img
                      src={getImageUrl(album.coverImageUrl)}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {album.category}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                      <div className="flex items-center gap-1">
                        <Calendar size={13} />
                        <span>{album.date}</span>
                      </div>
                      {album.description && (
                        <div className="text-gray-400 text-[11px] truncate max-w-[150px]">
                          <span>{album.description}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-brand-charcoal mt-1 line-clamp-1">
                      {album.title}
                    </h3>
                    <p className="text-xs text-brand-graphite mt-1 flex items-center gap-1">
                      <Images size={13} />
                      <span>{album.photos?.length || 0} foto dalam album</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingAlbum(album)}
                    className="p-1.5 text-gray-600 hover:text-brand-red bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                    title="Edit Album"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(album.id)}
                    className="p-1.5 text-gray-600 hover:text-red-600 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                    title="Hapus Album"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Editor Album */}
        {editingAlbum && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-full sm:max-w-2xl w-full p-4 sm:p-6 lg:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-brand-charcoal">
                  {editingAlbum.id ? 'Edit Album Galeri' : 'Buat Album Galeri Baru'}
                </h3>
                <button
                  onClick={() => setEditingAlbum(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Judul Album *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingAlbum.title || ''}
                      onChange={(e) => setEditingAlbum({ ...editingAlbum, title: e.target.value })}
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
                      value={editingAlbum.slug || ''}
                      onChange={(e) => setEditingAlbum({ ...editingAlbum, slug: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Kategori
                    </label>
                    <input
                      type="text"
                      value={editingAlbum.category || 'Corporate Events'}
                      onChange={(e) => setEditingAlbum({ ...editingAlbum, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Tahun / Tanggal
                    </label>
                    <input
                      type="text"
                      value={editingAlbum.date || '2024'}
                      onChange={(e) => setEditingAlbum({ ...editingAlbum, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Deskripsi Singkat
                    </label>
                    <input
                      type="text"
                      value={editingAlbum.description || ''}
                      onChange={(e) => setEditingAlbum({ ...editingAlbum, description: e.target.value })}
                      placeholder="Ringkasan dokumentasi..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Upload Cover Album */}
                <ImageUpload
                  label="Foto Sampul Album (Cover Image) *"
                  value={editingAlbum.coverImageUrl || ''}
                  onChange={(url) => setEditingAlbum({ ...editingAlbum, coverImageUrl: url })}
                  aspectRatio="landscape"
                  helperText="Upload gambar sampul album (JPG, PNG, WEBP, maks. 100MB)."
                />

                {/* Photos List in Album */}
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-brand-charcoal uppercase">
                      Foto-Foto Dalam Album ({editingAlbum.photos?.length || 0})
                    </label>
                  </div>

                  {/* Photo thumbnails grid */}
                  {editingAlbum.photos && editingAlbum.photos.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-2 bg-gray-50 rounded-xl border border-gray-200">
                      {editingAlbum.photos.map((p: any, idx: number) => {
                        const photoUrl = typeof p === 'string' ? p : p.url;
                        return (
                          <div key={idx} className="relative group rounded-lg overflow-hidden h-20 bg-brand-charcoal border">
                            <img
                              src={getImageUrl(photoUrl)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(idx)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Hapus foto"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Add photo to album widget */}
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                    <span className="text-[11px] font-bold text-gray-700">Upload Foto Tambahan ke Album:</span>
                    <ImageUpload
                      label="Pilih / Upload Foto Tambahan"
                      value={newPhotoUrl}
                      onChange={(url) => setNewPhotoUrl(url)}
                      aspectRatio="square"
                      helperText="Pilih atau upload foto (maks. 100MB), lalu klik tombol 'Tambahkan ke Album'."
                    />
                    {newPhotoUrl && (
                      <button
                        type="button"
                        onClick={handleAddPhotoToAlbum}
                        className="px-3 py-1.5 bg-brand-charcoal text-white text-xs font-bold rounded-lg hover:bg-black flex items-center gap-1"
                      >
                        <Plus size={13} />
                        <span>Tambahkan Foto ke Album</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditingAlbum(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-redDark flex items-center gap-1.5"
                  >
                    <Save size={14} />
                    <span>Simpan Album</span>
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
