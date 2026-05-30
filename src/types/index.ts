export interface Product {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface ProductDetail {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export type SortBy = 'age' | 'title' | 'price';
export type PerPage = '4' | '8' | '16' | 'all';

export type ProductCategory = 'phones' | 'tablets' | 'accessories';
export type SortKey = 'age' | 'title' | 'price';
