const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function getProductImage(imageUrl: string): string {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${API_URL}${imageUrl}`;
}

export interface DBProduct {
  _id: string;
  slug: string;
  name: string;
  category: string;
  short: string;
  imageUrl: string;
  description: string;
  specs: { label: string; value: string }[];
  applications: string[];
  industries: string[];
  benefits: string[];
  featured: boolean;
  active: boolean;
}

export async function fetchProducts(params?: { category?: string; search?: string }): Promise<DBProduct[]> {
  const query = new URLSearchParams({ active: 'true', limit: '50' });
  if (params?.category) query.set('category', params.category);
  if (params?.search) query.set('search', params.search);

  const res = await fetch(`${API_URL}/api/products?${query}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.products as DBProduct[];
}

export async function fetchProductBySlug(slug: string): Promise<DBProduct | null> {
  const res = await fetch(`${API_URL}/api/products?active=true&limit=100`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return (data.products as DBProduct[]).find((p) => p.slug === slug) ?? null;
}
