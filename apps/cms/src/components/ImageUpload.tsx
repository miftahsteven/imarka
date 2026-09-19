import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { uploadMediaFile, getImageUrl } from '../lib/api';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'banner';
}

// Authentic real corporate imagery from company profile
const REAL_IMAGE_PRESETS = [
  { label: 'Hero Keynote Speaker', url: '/images/hero-keynote.jpg', category: 'Hero & Keynote' },
  { label: 'Energizing Maluku Flagship', url: '/images/highlight-energizing-maluku-hd.jpg', category: 'Experiences' },
  { label: 'GEF-8 Bali Forum', url: '/images/highlight-gef8-bali-hd.jpg', category: 'Experiences' },
  { label: 'Commonwealth Insurance Summit', url: '/images/event-commonwealth-hd.jpg', category: 'Experiences' },
  { label: 'Garuda Indonesia Aviation', url: '/images/event-garuda-hd.jpg', category: 'Experiences' },
  { label: 'Gerakan Waspada Cacingan', url: '/images/event-cacingan-hd.jpg', category: 'Experiences' },
  { label: 'ARUP Singapore Gala', url: '/images/event-arup-hd.jpg', category: 'Experiences' },
  { label: 'Nanang Suryana (Managing Dir.)', url: '/images/team-nanang-hd.jpg', category: 'Team' },
  { label: 'Emmy Sidabutar (Creative Dir.)', url: '/images/team-emmy-hd.jpg', category: 'Team' },
  { label: 'Michael Siregar (Digital Lead)', url: '/images/team-michael-hd.jpg', category: 'Team' },
  { label: 'IMARKA Transparent Symbol', url: '/images/imarka-symbol.png', category: 'Branding' },
  { label: 'Corporate Logo Clean', url: '/images/logo.png', category: 'Branding' },
];

export default function ImageUpload({
  value = '',
  onChange,
  label = 'Upload Gambar',
  helperText = 'Format: JPG, PNG, WEBP, SVG. Ukuran maksimal 100MB.',
  aspectRatio = 'landscape',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPresetPicker, setShowPresetPicker] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    // Client-side validation: < 100MB
    const MAX_SIZE = 100 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError(`File terlalu besar (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maksimal diperbolehkan adalah 100MB.`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('File harus berformat gambar (JPG, PNG, WEBP, SVG, GIF).');
      return;
    }

    setIsUploading(true);
    try {
      const res = await uploadMediaFile(file);
      onChange(res.url);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Gagal mengunggah gambar. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const heightClasses = {
    landscape: 'h-44',
    portrait: 'h-56',
    square: 'h-40',
    banner: 'h-36',
  }[aspectRatio];

  const resolvedUrl = value ? getImageUrl(value) : '';

  return (
    <div className="space-y-2">
      {/* Label and Quick Actions */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPresetPicker(!showPresetPicker)}
            className="text-[11px] text-brand-red hover:text-brand-redDark font-semibold flex items-center gap-1 hover:underline"
          >
            <Sparkles size={13} />
            <span>Pilih Gambar Resmi</span>
          </button>
          <span className="text-gray-300 text-xs">|</span>
          <button
            type="button"
            onClick={() => setShowManualInput(!showManualInput)}
            className="text-[11px] text-gray-500 hover:text-brand-charcoal font-medium hover:underline"
          >
            {showManualInput ? 'Tutup URL' : 'Input URL'}
          </button>
        </div>
      </div>

      {/* Manual URL Input drawer */}
      {showManualInput && (
        <div className="flex gap-2 animate-in fade-in duration-200">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/hero-keynote.jpg atau https://..."
            className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Preset Real Imagery Grid */}
      {showPresetPicker && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
              Contoh Gambar Real (Dari Company Profile)
            </span>
            <button
              type="button"
              onClick={() => setShowPresetPicker(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
            {REAL_IMAGE_PRESETS.map((preset) => (
              <button
                key={preset.url}
                type="button"
                onClick={() => {
                  onChange(preset.url);
                  setShowPresetPicker(false);
                }}
                className={`relative group rounded-lg overflow-hidden border-2 text-left transition-all ${
                  value === preset.url ? 'border-brand-red ring-2 ring-brand-red/30' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="w-full h-16 bg-gray-200 overflow-hidden relative">
                  <img
                    src={getImageUrl(preset.url)}
                    alt={preset.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  {value === preset.url && (
                    <div className="absolute inset-0 bg-brand-red/40 flex items-center justify-center text-white">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="p-1 bg-white">
                  <div className="text-[9px] font-bold text-gray-800 truncate" title={preset.label}>
                    {preset.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Upload Dropzone / Live Preview */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-all duration-200 ${
          dragActive
            ? 'border-brand-red bg-brand-red/5'
            : value
            ? 'border-gray-200 bg-gray-50'
            : 'border-gray-300 hover:border-brand-red/60 bg-gray-50/50'
        }`}
      >
        {/* Hidden native input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />

        {value ? (
          /* Active Image Preview Container */
          <div className={`relative w-full ${heightClasses} bg-gray-900 group flex items-center justify-center overflow-hidden`}>
            {/* Background Checker pattern for transparent images */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                backgroundSize: '12px 12px',
              }}
            />

            {/* Rendered Live Image */}
            <img
              src={resolvedUrl}
              alt="Preview"
              className="w-full h-full object-contain relative z-10"
              onError={(e) => {
                // Fallback display if error loading
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Hover Overlay Controls */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col items-center justify-center gap-2 p-4 text-white">
              <div className="text-xs font-semibold truncate max-w-full px-2">
                {value}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-3 py-1.5 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-colors"
                >
                  <Upload size={14} />
                  <span>Ganti File (&lt;100MB)</span>
                </button>
                <a
                  href={resolvedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                  title="Buka Gambar Asli"
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1.5 bg-red-600/80 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Hapus Gambar"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Badge showing it's loaded */}
            <div className="absolute bottom-2 left-2 z-20 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>Preview Aktif</span>
            </div>
          </div>
        ) : (
          /* Empty State Dropzone */
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer p-6 flex flex-col items-center justify-center text-center ${heightClasses} transition-colors hover:bg-gray-100/60`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 size={32} className="animate-spin text-brand-red" />
                <p className="text-xs font-bold text-gray-700">Mengunggah gambar ke server...</p>
                <p className="text-[10px] text-gray-400">Harap tunggu sebentar</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center mb-2.5">
                  <Upload size={20} />
                </div>
                <div className="text-xs font-bold text-brand-charcoal mb-0.5">
                  Klik untuk Browse atau Tarik Gambar ke Sini
                </div>
                <div className="text-[11px] text-gray-500 max-w-xs">
                  Mendukung JPG, PNG, WEBP, SVG &bull; <strong className="text-brand-red font-semibold">Maksimal 100MB</strong>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-xs text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg flex items-center gap-1.5">
          <X size={14} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <p className="text-[11px] text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
