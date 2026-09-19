import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HomepageManager from './pages/HomepageManager';
import ServicesManager from './pages/ServicesManager';
import ExperiencesManager from './pages/ExperiencesManager';
import InsightsManager from './pages/InsightsManager';
import GalleryManager from './pages/GalleryManager';
import TeamManager from './pages/TeamManager';
import InquiriesManager from './pages/InquiriesManager';
import SettingsManager from './pages/SettingsManager';
import AuditLogs from './pages/AuditLogs';
import NavigationManager from './pages/NavigationManager';
import PagesManager from './pages/PagesManager';
import { getAuthToken } from './lib/api';
import { SidebarProvider } from './context/SidebarContext';

function ProtectedLayout() {
  const token = getAuthToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#F4F5F7] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/webpanel">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/content/navigation" element={<NavigationManager />} />
          <Route path="/content/pages" element={<PagesManager />} />
          <Route path="/content/homepage" element={<HomepageManager />} />
          <Route path="/content/services" element={<ServicesManager />} />
          <Route path="/content/experiences" element={<ExperiencesManager />} />
          <Route path="/content/insights" element={<InsightsManager />} />
          <Route path="/content/gallery" element={<GalleryManager />} />
          <Route path="/content/team" element={<TeamManager />} />
          <Route path="/leads/inquiries" element={<InquiriesManager />} />
          <Route path="/settings" element={<SettingsManager />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
