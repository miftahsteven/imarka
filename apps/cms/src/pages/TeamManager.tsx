import React, { useState, useEffect } from 'react';
import { cmsFetch, getImageUrl } from '../lib/api';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import { TeamMember } from '@imarka/types';
import { Plus, Edit2, Trash2, CheckCircle2, Save, Mail } from 'lucide-react';

export default function TeamManager() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadTeam = () => {
    cmsFetch<TeamMember[]>('/admin/team')
      .then((data) => setTeam(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    setSaving(true);
    setSuccessMsg('');

    try {
      if (editingMember.id) {
        await cmsFetch(`/admin/team/${editingMember.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingMember),
        });
      } else {
        await cmsFetch('/admin/team', {
          method: 'POST',
          body: JSON.stringify(editingMember),
        });
      }
      setEditingMember(null);
      setSuccessMsg('Team member saved successfully!');
      loadTeam();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      await cmsFetch(`/admin/team/${id}`, { method: 'DELETE' });
      loadTeam();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Team & Divisions" subtitle="Manage executive directors and specialized production leads" />

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
              <h2 className="text-base font-bold text-brand-charcoal">All Team Members</h2>
              <p className="text-xs text-brand-graphite">
                Roster of leadership and operational division leads.
              </p>
            </div>
            <button
              onClick={() =>
                setEditingMember({
                  name: '',
                  role: '',
                  bio: '',
                  imageUrl: '/images/team-emmy-hd.jpg',
                  email: '',
                  category: 'LEADERSHIP',
                  order: team.length + 1,
                })
              }
              className="px-4 py-2 bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow w-full sm:w-auto shrink-0"
            >
              <Plus size={14} />
              <span>Add Member</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-brand-light p-5 rounded-xl border border-gray-200 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-brand-charcoal shrink-0 border-2 border-white shadow">
                    <img src={getImageUrl(member.imageUrl)} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-red uppercase">
                      {member.category}
                    </span>
                    <h3 className="text-sm font-bold text-brand-charcoal">{member.name}</h3>
                    <div className="text-xs text-gray-500 font-medium">{member.role}</div>
                    {member.email && (
                      <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                        <Mail size={12} />
                        <span>{member.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold">Order #{member.order}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingMember(member)}
                      className="p-1.5 text-gray-500 hover:text-brand-red bg-white border border-gray-200 rounded"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 bg-white border border-gray-200 rounded"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Editor */}
        {editingMember && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-full sm:max-w-xl w-full p-4 sm:p-6 lg:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-brand-charcoal">
                  {editingMember.id ? 'Edit Team Member' : 'Add Team Member'}
                </h3>
                <button
                  onClick={() => setEditingMember(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingMember.name || ''}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Role / Position *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingMember.role || ''}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, role: e.target.value })
                      }
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
                      value={editingMember.category || 'LEADERSHIP'}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, category: e.target.value as any })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="LEADERSHIP">LEADERSHIP</option>
                      <option value="PRODUCTION">PRODUCTION</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-brand-charcoal uppercase mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editingMember.email || ''}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <ImageUpload
                  label="Team Member Portrait / Photo *"
                  value={editingMember.imageUrl || ''}
                  onChange={(url) => setEditingMember({ ...editingMember, imageUrl: url })}
                  aspectRatio="portrait"
                  helperText="Upload foto portrait resolusi tinggi (JPG, PNG, WEBP, maks. 100MB)."
                />

                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">
                    Brief Bio / Scope
                  </label>
                  <textarea
                    rows={3}
                    value={editingMember.bio || ''}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, bio: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
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
                    <span>Save Member</span>
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
