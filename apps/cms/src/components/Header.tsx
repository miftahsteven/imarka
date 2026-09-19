import React from 'react';
import { ExternalLink, Globe, Menu } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onToggleSidebar?: () => void;
}

export default function Header({ title, subtitle, onToggleSidebar }: HeaderProps) {
  const sidebar = useSidebar();
  const handleToggle = onToggleSidebar || sidebar.toggle;

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="lg:hidden p-2 -ml-1 text-gray-700 hover:text-brand-red rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
          aria-label="Buka Menu Navigasi"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-extrabold text-brand-charcoal leading-tight">{title}</h1>
          {subtitle && <p className="text-[11px] sm:text-xs text-brand-graphite mt-0.5 line-clamp-1">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-light hover:bg-gray-200 text-brand-charcoal rounded-lg text-xs font-semibold border border-gray-300 transition-colors shrink-0"
        >
          <Globe size={14} className="text-brand-red" />
          <span className="hidden sm:inline">View Live Site</span>
          <ExternalLink size={12} className="text-gray-400" />
        </a>
      </div>
    </header>
  );
}
