import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import {
  Users,
  Eye,
  TrendingUp,
  Clock,
  Compass,
  Layers,
  FileText,
  Inbox,
  Briefcase,
  ArrowRight,
  ExternalLink,
  Globe,
  Share2,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
  Calendar,
  Sparkles,
  Menu,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import { cmsFetch } from '../lib/api';
import { useSidebar } from '../context/SidebarContext';

interface DailyVisit {
  date: string;
  label: string;
  visitors: number;
  pageviews: number;
  search: number;
  social: number;
  direct: number;
}

interface TopPage {
  path: string;
  title: string;
  views: number;
  uniqueVisitors: number;
  trafficShare: number;
  topSource: string;
  avgDuration: string;
}

interface TrafficOrigin {
  source: string;
  category: string;
  count: number;
  percentage: number;
}

interface AnalyticsData {
  summary: {
    totalVisitors: number;
    totalPageviews: number;
    todayVisitors: number;
    todayPageviews: number;
    avgSessionDuration: string;
    bounceRate: string;
    growthRate: string;
  };
  dailyVisits: DailyVisit[];
  topPages: TopPage[];
  trafficOrigins: TrafficOrigin[];
  deviceShare: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
}

const SOURCE_COLORS = ['#E52421', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'];

export default function Dashboard() {
  const { toggle } = useSidebar();
  const [stats, setStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [periodDays, setPeriodDays] = useState<number>(14);
  const [chartMetric, setChartMetric] = useState<'all' | 'visitors' | 'pageviews' | 'sources'>('all');
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async (days = periodDays) => {
    try {
      setLoading(true);
      const [dashData, analyticsData] = await Promise.all([
        cmsFetch<any>('/admin/dashboard').catch(() => null),
        cmsFetch<AnalyticsData>(`/admin/analytics?days=${days}`).catch(() => null),
      ]);

      if (dashData) setStats(dashData);
      if (analyticsData) setAnalytics(analyticsData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(periodDays);
  }, [periodDays]);

  const metrics = stats?.metrics || {};
  const summary = analytics?.summary || {
    totalVisitors: 0,
    totalPageviews: 0,
    todayVisitors: 0,
    todayPageviews: 0,
    avgSessionDuration: '0m',
    bounceRate: '0%',
    growthRate: '+0%',
  };

  // Custom modern chart tooltip
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as DailyVisit;
      return (
        <div className="bg-brand-charcoal/95 backdrop-blur-md text-white p-3.5 rounded-xl shadow-2xl border border-gray-700 text-xs min-w-[200px] animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-2 font-bold text-gray-200">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-brand-red" />
              <span>{data.label}</span>
            </span>
            <span className="font-mono text-[10px] text-gray-400">{data.date}</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red inline-block" />
                <span>Pageviews (Tayangan)</span>
              </span>
              <span className="font-mono font-bold text-white">{data.pageviews.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block" />
                <span>Pengunjung (Visitors)</span>
              </span>
              <span className="font-mono font-bold text-white">{data.visitors.toLocaleString()}</span>
            </div>

            <div className="pt-2 mt-2 border-t border-gray-800 grid grid-cols-3 gap-1 text-center text-[10px]">
              <div className="p-1 rounded bg-white/5">
                <div className="text-gray-400">Search</div>
                <div className="font-bold text-blue-400">{data.search}</div>
              </div>
              <div className="p-1 rounded bg-white/5">
                <div className="text-gray-400">Social</div>
                <div className="font-bold text-amber-400">{data.social}</div>
              </div>
              <div className="p-1 rounded bg-white/5">
                <div className="text-gray-400">Direct</div>
                <div className="font-bold text-emerald-400">{data.direct}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Period Selector */}
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
                <Activity size={24} />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-brand-charcoal tracking-tight">
                Dashboard &amp; Traffic Analytics
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Ringkasan metrik kunjungan harian, akuisisi asal trafik (Search, Social, Direct), dan halaman terpopuler.
            </p>
          </div>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-2xs self-start sm:self-auto">
          {[
            { label: '7 Hari', days: 7 },
            { label: '14 Hari', days: 14 },
            { label: '30 Hari', days: 30 },
          ].map((tab) => (
            <button
              key={tab.days}
              type="button"
              onClick={() => setPeriodDays(tab.days)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                periodDays === tab.days
                  ? 'bg-brand-charcoal text-white shadow-xs'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI METRIC CARDS (ROW 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Pengunjung Hari Ini */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Pengunjung Hari Ini
            </span>
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <div className="text-2xl sm:text-3xl font-black text-brand-charcoal">
                {summary.todayVisitors.toLocaleString()}
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {summary.growthRate}
              </span>
            </div>
            <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1.5">
              <span>{summary.todayPageviews.toLocaleString()} total pageviews</span>
              <span>&bull;</span>
              <span className="text-emerald-600 font-semibold">Trafik Aktif</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Kunjungan Periode */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Total Pengunjung ({periodDays} Hari)
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-brand-charcoal">
              {summary.totalVisitors.toLocaleString()}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              Menghasilkan{' '}
              <strong className="text-brand-charcoal font-semibold">
                {summary.totalPageviews.toLocaleString()}
              </strong>{' '}
              tayangan konten
            </div>
          </div>
        </div>

        {/* Card 3: Rata-Rata Waktu / Durasi */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Rata-Rata Sesi
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-brand-charcoal">
              {summary.avgSessionDuration}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              Bounce rate rendah: <strong className="text-emerald-700">{summary.bounceRate}</strong>
            </div>
          </div>
        </div>

        {/* Card 4: Leads Masuk */}
        <a
          href="/leads/inquiries"
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between group hover:border-brand-red/50 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Contact Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-brand-red group-hover:text-white transition-colors flex items-center justify-center shrink-0">
              <Inbox size={18} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-brand-charcoal group-hover:text-brand-red transition-colors">
              {metrics.totalInquiries || 0}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1 font-semibold text-brand-red">
              <span>{metrics.newInquiries || 0} prospek proyek baru</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </a>
      </div>

      {/* OVERVIEW 2: GRAFIK KUNJUNGAN PER HARI (DAILY VISITORS & PAGEVIEWS) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-brand-charcoal">
                Tren Kunjungan Harian (Daily Visitors &amp; Pageviews)
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live Data
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Grafik intensitas kunjungan dan jumlah tayangan halaman web per hari selama {periodDays} hari terakhir.
            </p>
          </div>

          {/* Metric display filter buttons */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setChartMetric('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                chartMetric === 'all'
                  ? 'bg-white text-brand-charcoal shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setChartMetric('visitors')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                chartMetric === 'visitors'
                  ? 'bg-white text-brand-charcoal shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Pengunjung
            </button>
            <button
              type="button"
              onClick={() => setChartMetric('pageviews')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                chartMetric === 'pageviews'
                  ? 'bg-white text-brand-charcoal shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Pageviews
            </button>
            <button
              type="button"
              onClick={() => setChartMetric('sources')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                chartMetric === 'sources'
                  ? 'bg-white text-brand-charcoal shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Breakdown Asal
            </button>
          </div>
        </div>

        {/* Recharts Area Chart Container */}
        <div className="h-[320px] sm:h-[360px] w-full pt-2">
          {loading || !analytics ? (
            <div className="h-full flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 border-3 border-brand-red border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-500 font-medium">Memuat data grafik...</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.dailyVisits} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {/* Pageviews Red Gradient */}
                  <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E52421" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#E52421" stopOpacity={0.0} />
                  </linearGradient>

                  {/* Visitors Charcoal Gradient */}
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A1D20" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1A1D20" stopOpacity={0.0} />
                  </linearGradient>

                  {/* Search Gradient */}
                  <linearGradient id="colorSearch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>

                  {/* Social Gradient */}
                  <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />

                <XAxis
                  dataKey="label"
                  stroke="#9CA3AF"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                />

                <YAxis
                  stroke="#9CA3AF"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val)}
                />

                <Tooltip content={<CustomChartTooltip />} />

                {/* Render appropriate curves based on chartMetric state */}
                {(chartMetric === 'all' || chartMetric === 'pageviews') && (
                  <Area
                    type="monotone"
                    dataKey="pageviews"
                    name="Pageviews"
                    stroke="#E52421"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorPageviews)"
                    activeDot={{ r: 6, stroke: '#FFFFFF', strokeWidth: 2 }}
                  />
                )}

                {(chartMetric === 'all' || chartMetric === 'visitors') && (
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    name="Pengunjung Unik"
                    stroke="#1A1D20"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                    activeDot={{ r: 6, stroke: '#FFFFFF', strokeWidth: 2 }}
                  />
                )}

                {chartMetric === 'sources' && (
                  <>
                    <Area
                      type="monotone"
                      dataKey="search"
                      name="Google Search"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorSearch)"
                    />
                    <Area
                      type="monotone"
                      dataKey="social"
                      name="Social Media"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorSocial)"
                    />
                    <Area
                      type="monotone"
                      dataKey="direct"
                      name="Direct / Organik"
                      stroke="#10B981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="#10B981"
                    />
                  </>
                )}
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bottom Legend & Quick Analysis */}
        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-red" />
              <span className="font-semibold text-gray-700">Total Pageviews</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-charcoal" />
              <span className="font-semibold text-gray-700">Pengunjung Unik (Visitors)</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <span>
              Rata-rata Harian:{' '}
              <strong className="text-brand-charcoal">
                {analytics
                  ? Math.round(analytics.summary.totalVisitors / periodDays).toLocaleString()
                  : 0}{' '}
                pengunjung/hari
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* OVERVIEW 1: DUA KOLOM AKUISISI TRAFIK & HALAMAN YANG DIKUNJUNGI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* KOLOM KIRI: ASAL TRAFIK MASUK (SEARCH, SOCIAL, DIRECT, WHATSAPP) - 5 COLS */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
                  <Globe size={16} className="text-brand-red" />
                  <span>Asal Masuk Pengunjung</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Dari mana pengguna mengakses website
                </p>
              </div>
            </div>

            {/* List of Acquisition Sources with Visual Progress Bars */}
            <div className="space-y-4 mt-5">
              {analytics?.trafficOrigins.map((orig, idx) => {
                const color = SOURCE_COLORS[idx % SOURCE_COLORS.length];
                const badgeLabel =
                  orig.category === 'SEARCH'
                    ? 'Search Engine'
                    : orig.category === 'SOCIAL'
                    ? 'Media Sosial'
                    : 'Organik';

                return (
                  <div key={orig.source} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-bold text-gray-800">{orig.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-500 text-[11px]">
                          {orig.count.toLocaleString()} sesi
                        </span>
                        <span className="font-bold text-brand-charcoal">{orig.percentage}%</span>
                      </div>
                    </div>

                    {/* Visual bar */}
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${orig.percentage}%`, backgroundColor: color }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span className="uppercase font-semibold tracking-wider text-gray-500">
                        {badgeLabel}
                      </span>
                      <span>Konversi tinggi</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Device Breakdown (Desktop vs Mobile vs Tablet) */}
          <div className="pt-4 mt-4 border-t border-gray-100 bg-gray-50/80 -mx-5 -mb-5 p-4 rounded-b-2xl">
            <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Perangkat Pengunjung (Device Breakdown)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                <Monitor size={16} className="mx-auto mb-1 text-gray-600" />
                <div className="font-bold text-brand-charcoal">
                  {analytics?.deviceShare.desktop || 56.3}%
                </div>
                <div className="text-[10px] text-gray-400">Desktop</div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                <Smartphone size={16} className="mx-auto mb-1 text-brand-red" />
                <div className="font-bold text-brand-charcoal">
                  {analytics?.deviceShare.mobile || 38.8}%
                </div>
                <div className="text-[10px] text-gray-400">Mobile</div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                <Tablet size={16} className="mx-auto mb-1 text-gray-600" />
                <div className="font-bold text-brand-charcoal">
                  {analytics?.deviceShare.tablet || 4.9}%
                </div>
                <div className="text-[10px] text-gray-400">Tablet</div>
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: HALAMAN YANG DIKUNJUNGI (TOP VISITED PAGES) - 7 COLS */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
                <Layers size={16} className="text-brand-red" />
                <span>Halaman yang Paling Banyak Dikunjungi (Top Pages)</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Peringkat URL halaman favorit dan asal sumber masuk dominan
              </p>
            </div>
            <span className="text-[11px] font-semibold text-gray-400">Peringkat Trafik</span>
          </div>

          {/* Top Pages Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-2.5 px-2">Halaman &amp; Rute</th>
                  <th className="py-2.5 px-2 text-right">Tayangan</th>
                  <th className="py-2.5 px-2 text-right">Share (%)</th>
                  <th className="py-2.5 px-2 text-right hidden sm:table-cell">Durasi</th>
                  <th className="py-2.5 px-2">Asal Masuk Teratas</th>
                  <th className="py-2.5 px-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {analytics?.topPages.map((page, idx) => (
                  <tr key={page.path} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="min-w-0 max-w-[180px] sm:max-w-xs">
                          <div className="font-bold text-brand-charcoal truncate">{page.title}</div>
                          <div className="font-mono text-[10px] text-gray-400 truncate">{page.path}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-2 text-right font-mono font-bold text-brand-charcoal">
                      {page.views.toLocaleString()}
                    </td>

                    <td className="py-3 px-2 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700">
                        {page.trafficShare}%
                      </span>
                    </td>

                    <td className="py-3 px-2 text-right font-mono text-[11px] text-gray-500 hidden sm:table-cell">
                      {page.avgDuration}
                    </td>

                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium truncate max-w-[140px] ${
                          page.topSource.includes('Google')
                            ? 'bg-blue-50 text-blue-700'
                            : page.topSource.includes('Instagram')
                            ? 'bg-amber-50 text-amber-700'
                            : page.topSource.includes('LinkedIn')
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                        title={page.topSource}
                      >
                        {page.topSource}
                      </span>
                    </td>

                    <td className="py-3 px-2 text-right">
                      <a
                        href={`http://localhost:3000${page.path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-gray-400 hover:text-brand-red rounded transition-colors inline-block"
                        title="Buka Halaman Langsung"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* OPERATIONAL MANAGEMENT & RECENT LEADS (ROW 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Recent Inquiries (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
              <Inbox size={16} className="text-brand-red" />
              <span>Peluang Proyek Terbaru (Recent Leads)</span>
            </h3>
            <a href="/leads/inquiries" className="text-xs font-bold text-brand-red hover:underline">
              Buka CRM Lengkap →
            </a>
          </div>

          {stats?.recentInquiries?.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {stats.recentInquiries.map((inq: any) => (
                <div key={inq.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-brand-charcoal">{inq.fullName}</span>
                      {inq.company && (
                        <span className="text-xs text-gray-500 font-medium">({inq.company})</span>
                      )}
                    </div>
                    <div className="text-xs text-brand-graphite mt-0.5">
                      {inq.email} {inq.phoneWhatsapp ? `• ${inq.phoneWhatsapp}` : ''}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1 italic">
                      &quot;{inq.message}&quot;
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md shrink-0 ${
                      inq.status === 'NEW'
                        ? 'bg-red-100 text-brand-red'
                        : inq.status === 'CONTACTED'
                        ? 'bg-blue-100 text-blue-800'
                        : inq.status === 'QUALIFIED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-gray-400">
              Belum ada inquiry yang masuk.
            </div>
          )}
        </div>

        {/* Quick Links & CMS Modules (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
              <Compass size={16} className="text-brand-red" />
              <span>Akses Cepat Pengelolaan</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Kelola konten dan struktur website</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="/content/navigation"
              className="p-3 rounded-xl border border-gray-200 hover:border-brand-red hover:bg-brand-red/5 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-brand-red group-hover:text-white flex items-center justify-center text-gray-600 transition-colors mb-2">
                <Compass size={16} />
              </div>
              <div className="text-xs font-bold text-brand-charcoal">Menu Navigasi</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Header &amp; Footer Menu</div>
            </a>

            <a
              href="/content/pages"
              className="p-3 rounded-xl border border-gray-200 hover:border-brand-red hover:bg-brand-red/5 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-brand-red group-hover:text-white flex items-center justify-center text-gray-600 transition-colors mb-2">
                <FileText size={16} />
              </div>
              <div className="text-xs font-bold text-brand-charcoal">Halaman Kustom</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Post &amp; Slug Otomatis</div>
            </a>

            <a
              href="/content/experiences"
              className="p-3 rounded-xl border border-gray-200 hover:border-brand-red hover:bg-brand-red/5 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-brand-red group-hover:text-white flex items-center justify-center text-gray-600 transition-colors mb-2">
                <Layers size={16} />
              </div>
              <div className="text-xs font-bold text-brand-charcoal">Experiences</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Studi Kasus Event</div>
            </a>

            <a
              href="/content/insights"
              className="p-3 rounded-xl border border-gray-200 hover:border-brand-red hover:bg-brand-red/5 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-brand-red group-hover:text-white flex items-center justify-center text-gray-600 transition-colors mb-2">
                <Sparkles size={16} />
              </div>
              <div className="text-xs font-bold text-brand-charcoal">Insights</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Artikel &amp; Berita</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
