import React, { useState, useEffect } from 'react';
import { cmsFetch, getImageUrl } from '../lib/api';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import { Post } from '@imarka/types';
import { Plus, Edit2, Trash2, CheckCircle2, Save, FileText } from 'lucide-react';

export default function InsightsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadPosts = () => {
    cmsFetch<Post[]>('/admin/insights')
      .then((data) => setPosts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setSaving(true);
    setSuccessMsg('');

    try {
      if (editingPost.id) {
        await cmsFetch(`/admin/insights/${editingPost.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingPost),
        });
      } else {
        await cmsFetch('/admin/insights', {
          method: 'POST',
          body: JSON.stringify(editingPost),
        });
      }
      setEditingPost(null);
      setSuccessMsg('Article saved successfully!');
      loadPosts();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await cmsFetch(`/admin/insights/${id}`, { method: 'DELETE' });
      loadPosts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Insights & Articles" subtitle="Publish corporate thought leadership, event recaps, and news" />

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
              <h2 className="text-base font-bold text-brand-charcoal">All Insights Articles</h2>
              <p className="text-xs text-brand-graphite">
                Articles published on the public /insights page.
              </p>
            </div>
            <button
              onClick={() =>
                setEditingPost({
                  title: '',
                  slug: '',
                  excerpt: '',
                  content: '<h2>Heading</h2><p>Article body content...</p>',
                  coverImageUrl: '/images/hero-keynote.jpg',
                  category: 'Insights',
                  authorName: 'IMARKA Editorial Team',
                  status: 'PUBLISHED',
                })
              }
              className="px-4 py-2 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow w-full sm:w-auto shrink-0"
            >
              <Plus size={14} />
              <span>Create New Article</span>
            </button>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-brand-light rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-brand-charcoal rounded overflow-hidden shrink-0 border border-gray-200">
                    <img src={getImageUrl(post.coverImageUrl)} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-brand-red uppercase bg-white px-2 py-0.5 rounded border">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-gray-500 font-medium">By {post.authorName}</span>
                    </div>
                    <h3 className="text-sm font-bold text-brand-charcoal mt-1 line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-brand-graphite line-clamp-1 mt-0.5">{post.excerpt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="p-2 text-gray-600 hover:text-brand-red bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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
        {editingPost && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-full sm:max-w-3xl w-full p-4 sm:p-6 lg:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-brand-charcoal">
                  {editingPost.id ? 'Edit Article' : 'Write New Article'}
                </h3>
                <button
                  onClick={() => setEditingPost(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingPost.title || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
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
                      value={editingPost.slug || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={editingPost.category || 'Insights'}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Insights">Insights</option>
                      <option value="Event">Event</option>
                      <option value="Branding">Branding</option>
                      <option value="Training">Training</option>
                      <option value="Company News">Company News</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editingPost.authorName || ''}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, authorName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <ImageUpload
                  label="Article Cover Image *"
                  value={editingPost.coverImageUrl || ''}
                  onChange={(url) => setEditingPost({ ...editingPost, coverImageUrl: url })}
                  aspectRatio="landscape"
                  helperText="Upload gambar cover artikel (JPG, PNG, WEBP, maks. 100MB)."
                />

                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Short Excerpt / Teaser *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingPost.excerpt || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Full Content (HTML / WYSIWYG Output) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-[11px]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
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
                    <span>Save Article</span>
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
