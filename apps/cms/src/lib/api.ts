export const API_SERVER = import.meta.env.VITE_API_SERVER || '';
export const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

export function getImageUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return API_SERVER ? `${API_SERVER}${cleanPath}` : cleanPath;
}

export async function uploadMediaFile(file: File): Promise<{ url: string; originalName: string; size: number }> {
  // Validate max 100MB
  const MAX_SIZE = 100 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error(`Ukuran file ${(file.size / (1024 * 1024)).toFixed(1)}MB melebihi batas maksimum 100MB.`);
  }

  const formData = new FormData();
  formData.append('file', file);

  const res = await cmsFetch<{ url: string; originalName: string; size: number }>('/admin/media/upload', {
    method: 'POST',
    body: formData,
  });

  return res;
}

export function getAuthToken(): string | null {
  return localStorage.getItem('imarka_cms_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('imarka_cms_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('imarka_cms_token');
  localStorage.removeItem('imarka_cms_user');
}

export function getStoredUser(): any | null {
  const u = localStorage.getItem('imarka_cms_user');
  return u ? JSON.parse(u) : null;
}

export function setStoredUser(user: any) {
  localStorage.setItem('imarka_cms_user', JSON.stringify(user));
}

export async function cmsFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    removeAuthToken();
    window.location.href = '/webpanel/login';
    throw new Error('Session expired');
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(url: string) => cmsFetch<T>(url, { method: 'GET' }),
  post: <T>(url: string, data?: any) => cmsFetch<T>(url, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  put: <T>(url: string, data?: any) => cmsFetch<T>(url, { method: 'PUT', body: data ? JSON.stringify(data) : undefined }),
  patch: <T>(url: string, data?: any) => cmsFetch<T>(url, { method: 'PATCH', body: data ? JSON.stringify(data) : undefined }),
  delete: <T>(url: string) => cmsFetch<T>(url, { method: 'DELETE' }),
};
