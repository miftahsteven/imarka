import React, { useState, useEffect } from 'react';
import { cmsFetch } from '../lib/api';
import Header from '../components/Header';
import { ShieldAlert, Clock, User, Globe } from 'lucide-react';

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsFetch<any[]>('/admin/audit-logs')
      .then((data) => setLogs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header title="Audit Logs & Compliance" subtitle="Tamper-evident trail of administrative mutations, logins, and publishing" />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-brand-charcoal">Recent Security Events</h2>
              <p className="text-xs text-brand-graphite">
                Last 100 administrative transactions recorded with IP and actor details.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-brand-light text-brand-charcoal uppercase font-extrabold border-y border-gray-200">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity</th>
                  <th className="py-3 px-4">Metadata</th>
                  <th className="py-3 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-brand-charcoal">
                      {log.actor}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-red-100 text-brand-red">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      {log.entity}
                    </td>
                    <td className="py-3 px-4 text-gray-500 max-w-xs truncate">
                      {log.metadata || '-'}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-400">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
