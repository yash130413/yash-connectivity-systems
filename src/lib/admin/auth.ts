const TOKEN_KEY = 'ycs_admin_token';
const ADMIN_KEY = 'ycs_admin_info';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface AdminInfo {
  email: string;
  role: string;
}

export interface Lead {
  _id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  productRequirement: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  source: string;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  short: string;
  description: string;
  imageUrl: string;
  specs: { label: string; value: string }[];
  applications: string[];
  industries: string[];
  benefits: string[];
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PRODUCT_CATEGORIES = [
  'Barcode Labels',
  'Ribbons',
  'Packing Materials',
  'Cable Ties',
  'Insulated Connectors',
  'Heat Shrink Sleeves',
  'Conduit Plastics',
];

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdminInfo(): AdminInfo | null {
  const data = localStorage.getItem(ADMIN_KEY);
  return data ? JSON.parse(data) : null;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export async function login(email: string, password: string): Promise<AdminInfo> {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
  return data.admin;
}

export async function fetchLeads(params?: { status?: string; page?: number }): Promise<{
  leads: Lead[];
  total: number;
  page: number;
}> {
  const token = getToken();
  const query = new URLSearchParams();
  if (params?.status) query.set('status', params.status);
  if (params?.page) query.set('page', String(params.page));

  const res = await fetch(`${API_URL}/api/admin/leads?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch leads');
  return data;
}

export async function updateLeadStatus(id: string, status: string): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/admin/leads/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update status');
}

export async function fetchProducts(params?: { category?: string; search?: string; page?: number }): Promise<{
  products: Product[];
  total: number;
  page: number;
}> {
  const token = getToken();
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.search) query.set('search', params.search);
  if (params?.page) query.set('page', String(params.page));
  query.set('limit', '12');

  const res = await fetch(`${API_URL}/api/products?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
  return data;
}

export async function createProduct(formData: FormData): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create product');
}

export async function updateProduct(id: string, formData: FormData): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update product');
}

export interface AnalyticsData {
  overview: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    converted: number;
    pending: number;
    conversionRate: number;
  };
  statusDistribution: { status: string; count: number; percentage: number }[];
  dailyTrend: { date: string; count: number }[];
  weeklyTrend: { week: number; year: number; count: number; weekStart: string }[];
  productInquiries: { product: string; count: number }[];
  topCompanies: { company: string; count: number }[];
  recentActivity: { _id: string; name: string; company: string; productRequirement: string; status: string; createdAt: string }[];
  dateRange: { from: string; to: string };
}

export async function fetchAnalytics(from?: string, to?: string): Promise<AnalyticsData> {
  const token = getToken();
  const query = new URLSearchParams();
  if (from) query.set('from', from);
  if (to) query.set('to', to);
  const res = await fetch(`${API_URL}/api/admin/analytics?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch analytics');
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete product');
}
