export interface Product {
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
  createdAt: Date;
  updatedAt: Date;
}

export const PRODUCT_CATEGORIES = [
  'Barcode Labels & Ribbon',
  'Packing Materials',
  'Cable Ties',
  'Insulated Connectors',
  'Heat Shrink Sleeves',
  'Conduit Plastics',
] as const;

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
