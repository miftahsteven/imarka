import React, { useState, useEffect } from 'react';
import { cmsFetch } from '../lib/api';
import Header from '../components/Header';
import { ContactInquiry, InquiryStatus } from '@imarka/types';
import { Download, Trash2, Edit3, CheckCircle2, MessageSquare, Mail, Phone, Calendar } from 'lucide-react';

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const loadInquiries = () => {
    const qs = filterStatus !== 'all' ? `?status=${filterStatus}` : '';
    cmsFetch<ContactInquiry[]>(`/admin/inquiries${qs}`)
      .then((data) => setInquiries(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInquiries();
  }, [filterStatus]);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    try {
      await cmsFetch(`/admin/inquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      loadInquiries();
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNote(true);
    try {
      await cmsFetch(`/admin/inquiries/${selectedInquiry.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: selectedInquiry.status,
          internalNotes: noteText,
        }),
      });
      setSelectedInquiry(null);
      loadInquiries();
    } catch (err: any) {
      alert(err.message || 'Failed to save notes');
    } finally {
      setSavingNote(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead inquiry?')) return;
    try {
      await cmsFetch(`/admin/inquiries/${id}`, { method: 'DELETE' });
      loadInquiries();
    } catch (err: any) {
      alert(err.message || 'Failed to delete inquiry');
    }
  };

  const handleExportCsv = () => {
    window.open('http://localhost:4000/api/v1/admin/inquiries/export/csv', '_blank');
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Contact Leads & Inquiries" subtitle="Manage prospective client requests, project briefs, and follow-ups" />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Filter by status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 bg-brand-light border border-gray-300 rounded-lg text-xs font-bold focus:outline-none"
              >
                <option value="all">All Inquiries ({inquiries.length})</option>
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="QUALIFIED">QUALIFIED</option>
                <option value="CLOSED">CLOSED</option>
                <option value="SPAM">SPAM</option>
              </select>
            </div>

            <button
              onClick={handleExportCsv}
              className="px-4 py-2 bg-brand-light hover:bg-brand-charcoal hover:text-white text-brand-charcoal text-xs font-bold rounded-lg border border-gray-300 transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-brand-light text-brand-charcoal uppercase font-extrabold border-y border-gray-200">
                <tr>
                  <th className="py-3 px-4">Contact & Company</th>
                  <th className="py-3 px-4">Service Interest</th>
                  <th className="py-3 px-4">Date / Budget</th>
                  <th className="py-3 px-4">Message Summary</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-charcoal">{inq.fullName}</div>
                      {inq.company && <div className="text-gray-500 font-medium">{inq.company}</div>}
                      <div className="text-[11px] text-gray-400 mt-1 flex flex-col gap-0.5">
                        <a href={`mailto:${inq.email}`} className="hover:text-brand-red">
                          {inq.email}
                        </a>
                        {inq.phoneWhatsapp && (
                          <a
                            href={`https://wa.me/${inq.phoneWhatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-green-600"
                          >
                            WA: {inq.phoneWhatsapp}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-brand-charcoal">
                      {inq.serviceInterest || 'General'}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-brand-charcoal font-medium">
                        {inq.estimatedDate || '-'}
                      </div>
                      <div className="text-gray-400 text-[11px]">
                        {inq.estimatedBudget || 'Unspecified'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="line-clamp-2 text-brand-graphite italic">&quot;{inq.message}&quot;</p>
                      {inq.internalNotes && (
                        <div className="mt-1 text-[10px] text-brand-red font-semibold">
                          Note: {inq.internalNotes}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                        className={`text-[11px] font-bold px-2 py-1 rounded border ${
                          inq.status === 'NEW'
                            ? 'bg-red-50 text-brand-red border-red-200'
                            : inq.status === 'CONTACTED'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : inq.status === 'QUALIFIED'
                            ? 'bg-green-50 text-green-800 border-green-200'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="CLOSED">CLOSED</option>
                        <option value="SPAM">SPAM</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setNoteText(inq.internalNotes || '');
                          }}
                          className="p-1.5 text-gray-500 hover:text-brand-red bg-white border border-gray-200 rounded hover:bg-gray-50"
                          title="View & Add Notes"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 bg-white border border-gray-200 rounded hover:bg-gray-50"
                          title="Delete"
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

        {/* Notes / Details Modal */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-full sm:max-w-lg w-full p-4 sm:p-6 space-y-4 text-xs max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-brand-charcoal">
                  Lead Details & Internal Notes
                </h3>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 bg-brand-light p-4 rounded-xl border border-gray-200">
                <div className="font-bold text-sm text-brand-charcoal">{selectedInquiry.fullName}</div>
                <div className="text-gray-500">{selectedInquiry.email} • {selectedInquiry.phoneWhatsapp}</div>
                <div className="pt-2 text-brand-charcoal leading-relaxed font-serif text-[13px]">
                  &ldquo;{selectedInquiry.message}&rdquo;
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">
                  Internal Team Notes / Next Steps
                </label>
                <textarea
                  rows={4}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="e.g. Discussed with Emmy. Meeting arranged for Tuesday 2 PM..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-gray-100">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNote}
                  className="px-5 py-2 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-redDark"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
