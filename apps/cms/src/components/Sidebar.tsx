import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Briefcase,
  Layers,
  FileText,
  Images,
  Users,
  Inbox,
  Settings,
  ShieldAlert,
  LogOut,
  ExternalLink,
  X,
  Compass,
  FilePlus2,
} from 'lucide-react';
import { removeAuthToken, getStoredUser } from '../lib/api';
import { useSidebar } from '../context/SidebarContext';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();
  const { isOpen, close } = useSidebar();

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  const menuSections = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/', icon: LayoutDashboard },
      ],
    },
    {
      title: 'CONTENT MANAGEMENT',
      items: [
        { label: 'Menu Navigasi', path: '/content/navigation', icon: Compass },
        { label: 'Halaman Kustom', path: '/content/pages', icon: FilePlus2 },
        { label: 'Homepage', path: '/content/homepage', icon: Sparkles },
        { label: 'Services', path: '/content/services', icon: Briefcase },
        { label: 'Experiences', path: '/content/experiences', icon: Layers },
        { label: 'Insights & News', path: '/content/insights', icon: FileText },
        { label: 'Gallery Archive', path: '/content/gallery', icon: Images },
        { label: 'Team & Structure', path: '/content/team', icon: Users },
      ],
    },
    {
      title: 'LEADS & CRM',
      items: [
        { label: 'Contact Inquiries', path: '/leads/inquiries', icon: Inbox },
      ],
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { label: 'Site Settings', path: '/settings', icon: Settings },
        { label: 'Audit Logs', path: '/audit-logs', icon: ShieldAlert },
      ],
    },
  ];

  return (
    <>
      {/* Mobile / Tablet Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar (Drawer on mobile/tablet, fixed column on desktop) */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-brand-charcoal text-white flex flex-col justify-between shrink-0 h-screen border-r border-gray-800 transition-transform duration-300 ease-in-out
          lg:static lg:w-64 lg:translate-x-0 lg:z-auto
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top Brand Header */}
        <div>
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0">
                <img
                  src="/images/imarka-symbol.png"
                  alt="Imarka Megalo Indonesia"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center leading-[1.12] text-gray-400 select-none">
                <span className="font-extrabold text-[12px] text-gray-200 tracking-wide">Imarka</span>
                <span className="font-bold text-[12px] text-gray-300 tracking-wide">Megalo</span>
                <span className="font-semibold text-[11px] text-gray-400 tracking-wider">Indonesia</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Buka Live Website"
              >
                <ExternalLink size={16} />
              </a>

              {/* Mobile Close Button */}
              <button
                type="button"
                onClick={close}
                className="lg:hidden p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Tutup Menu"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
            {menuSections.map((section) => (
              <div key={section.title} className="space-y-1.5">
                <div className="text-[10px] font-bold text-gray-400 px-3 tracking-wider">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.path === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(item.path);

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={close}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-brand-red text-white shadow-md'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom User & Logout */}
        <div className="p-4 border-t border-gray-800 bg-brand-charcoal/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-brand-red text-white font-extrabold text-xs flex items-center justify-center shrink-0">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user?.name || 'Admin'}</div>
              <div className="text-[10px] text-gray-400 truncate">{user?.email || 'admin@imarka.com'}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors"
            title="Keluar / Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}
