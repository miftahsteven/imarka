'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactForm, getSiteData } from '@/lib/api';
import { SiteSetting } from '@imarka/types';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phoneWhatsapp: '',
    serviceInterest: 'Event & Experience Solutions',
    estimatedDate: '',
    estimatedBudget: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [site, setSite] = useState<SiteSetting | null>(null);

  React.useEffect(() => {
    getSiteData()
      .then((data) => {
        if (data?.site) setSite(data.site);
      })
      .catch(() => null);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await submitContactForm(formData);
      if (res?.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(res?.error || 'Failed to submit form. Please check your input.');
      }
    } catch (err: any) {
      setErrorMsg('Failed to connect to server. Please try again or reach out directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-brand-charcoal text-white py-16 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-red bg-white/10 px-3 py-1 rounded-md">
            CONNECT WITH US
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Start a Conversation
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Discuss your upcoming event, brand activation, leadership workshop, or procurement
            requirement with our team.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-brand-charcoal mb-3">
                Direct Contact Information
              </h2>
              <p className="text-sm text-brand-graphite leading-relaxed">
                Whether you have a specific RFP, an exploratory event idea, or need quick advisory,
                our directors are ready to assist.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-brand-light border border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-brand-red text-white flex items-center justify-center shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                    Email Inquiry
                  </div>
                  <a
                    href={`mailto:${site?.contactEmail || 'emmy@imarka-megalo.com'}`}
                    className="text-base font-bold text-brand-charcoal hover:text-brand-red transition-colors"
                  >
                    {site?.contactEmail || 'emmy@imarka-megalo.com'}
                  </a>
                  <p className="text-xs text-brand-graphite mt-0.5">
                    Fast response within 24 business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-brand-light border border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-brand-red text-white flex items-center justify-center shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                    Phone & WhatsApp Direct
                  </div>
                  {(() => {
                    const phone = site?.contactPhone || '08569529955';
                    const wa = site?.contactWhatsapp || '08569529955';
                    const cleanWa = wa.replace(/\D/g, '');
                    const waLink = cleanWa.startsWith('0') ? '62' + cleanWa.slice(1) : cleanWa;
                    return (
                      <a
                        href={`https://wa.me/${waLink}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base font-bold text-brand-charcoal hover:text-brand-red transition-colors"
                      >
                        {phone} {wa && wa !== phone ? `(WA: ${wa})` : ''}
                      </a>
                    );
                  })()}
                  <p className="text-xs text-brand-graphite mt-0.5">
                    Available Monday – Saturday for consultation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-brand-light border border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-brand-red text-white flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                    Operational Base
                  </div>
                  <div className="text-sm font-bold text-brand-charcoal">
                    {site?.siteName || 'PT IMARKA MEGALO INDONESIA'}
                  </div>
                  <p className="text-xs text-brand-graphite mt-0.5">
                    {site?.address || 'Jakarta, Indonesia. Delivering projects nationwide from Sumatra to Maluku & Papua.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp CTA Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/628569529955?text=Halo%20IMARKA%20Megalo,%20saya%20ingin%20berkonsultasi%20mengenai%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Image
                  src="/images/whatsapp-logo.png"
                  alt="WhatsApp"
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain"
                />
                <span>Instant Chat via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-brand-charcoal mb-2">Project Inquiry Form</h3>
              <p className="text-sm text-brand-graphite mb-6">
                Fill out the form below and our team will prepare a structured proposal or schedule an
                exploratory briefing.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center space-y-3 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-green-900">Thank You!</h4>
                  <p className="text-sm text-green-800 max-w-md mx-auto">
                    Your inquiry has been successfully received by the IMARKA team. We will review
                    your requirements and get in touch promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        company: '',
                        email: '',
                        phoneWhatsapp: '',
                        serviceInterest: 'Event & Experience Solutions',
                        estimatedDate: '',
                        estimatedBudget: '',
                        message: '',
                      });
                    }}
                    className="mt-4 px-5 py-2 bg-brand-charcoal text-white text-xs font-bold rounded-lg hover:bg-brand-red transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-brand-charcoal mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Budi Santoso"
                        className="w-full px-4 py-2.5 bg-brand-light border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-red focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-brand-charcoal mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Kementerian / PT Perusahaan"
                        className="w-full px-4 py-2.5 bg-brand-light border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-red focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-brand-charcoal mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="budi@company.com"
                        className="w-full px-4 py-2.5 bg-brand-light border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-red focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-brand-charcoal mb-1">
                        WhatsApp / Phone
                      </label>
                      <input
                        type="text"
                        name="phoneWhatsapp"
                        value={formData.phoneWhatsapp}
                        onChange={handleChange}
                        placeholder="08123456789"
                        className="w-full px-4 py-2.5 bg-brand-light border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-red focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-brand-charcoal mb-1">
                        Service Interest
                      </label>
                      <select
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-brand-light border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-red focus:bg-white"
                      >
                        <option value="Event & Experience Solutions">Event & Experience Solutions</option>
                        <option value="Branding & Marketing Communication">Branding & Marketing Communication</option>
                        <option value="Training & People Development">Training & People Development</option>
                        <option value="Procurement Solutions">Procurement Solutions</option>
                        <option value="General Consultation">General Consultation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-brand-charcoal mb-1">
                        Estimated Event / Project Date
                      </label>
                      <input
                        type="text"
                        name="estimatedDate"
                        value={formData.estimatedDate}
                        onChange={handleChange}
                        placeholder="e.g. Q4 2026 / October 2026"
                        className="w-full px-4 py-2.5 bg-brand-light border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-red focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-brand-charcoal mb-1">
                      Project Objective / Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your event goals, target audience, venue, or expected deliverables..."
                      className="w-full px-4 py-2.5 bg-brand-light border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand-red focus:bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting Inquiry...</span>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
