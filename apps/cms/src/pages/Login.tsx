import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, setStoredUser, API_BASE } from '../lib/api';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('admin@imarka-megalo.com');
  const [password, setPassword] = useState('Admin123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setAuthToken(data.token);
      setStoredUser(data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-charcoal flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 relative z-10 border border-gray-100">
        <div className="text-center space-y-3 mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img
              src="/images/imarka-symbol.png"
              alt="Imarka Megalo Indonesia"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col text-left leading-[1.12] select-none text-gray-500">
              <span className="font-extrabold text-sm text-gray-700 tracking-wide">Imarka</span>
              <span className="font-bold text-sm text-gray-600 tracking-wide">Megalo</span>
              <span className="font-semibold text-xs text-gray-500 tracking-wider">Indonesia</span>
            </div>
          </div>
          <div className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-extrabold uppercase tracking-wider rounded-md">
            CMS CONTROL CENTER
          </div>
          <h1 className="text-2xl font-extrabold text-brand-charcoal">
            IMARKA MEGALO CMS
          </h1>
          <p className="text-xs text-brand-graphite">
            Sign in with authorized administrator credentials to manage corporate content.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-charcoal mb-1">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-brand-light border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-red"
              />
              <Mail size={16} className="absolute left-3.5 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-charcoal mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-brand-light border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-red"
              />
              <Lock size={16} className="absolute left-3.5 top-3 text-gray-400" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm rounded-lg transition-all shadow hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-brand-graphite">
          Default admin: <code className="bg-gray-100 px-1 py-0.5 rounded text-brand-charcoal font-semibold">admin@imarka-megalo.com</code>
        </div>
      </div>
    </div>
  );
}
