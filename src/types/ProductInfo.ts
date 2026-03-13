export interface Product {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable?: string[];
  capacity?: string;
  priceRegular: number;
  priceDiscount?: number;
  colorsAvailable?: string[];
  color?: string;
  images: string[];
  description?: {
    title: string;
    text: string[];
  }[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}

export type ProductCategory = 'phones' | 'tablets' | 'accessories' | 'all';

export interface ProductFilters {
  category?: ProductCategory;
  capacity?: string;
  color?: string;
  priceMin?: number;
  priceMax?: number;
}

export type SortBy =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc';
