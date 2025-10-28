export interface Product {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  phoneId?: string;
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

  //ProductInfo
  colorsAvailable?: string[];
  capacityAvailable?: string[];
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  images?: string[];
  description?: {
    title: string;
    text: string[];
  }[];
}

export interface RawProduct {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  namespaceId?: string;
  phoneId?: string;
  itemId?: string;
  name: string;
  priceRegular?: number;
  priceDiscount?: number;
  fullPrice?: number;
  price?: number;
  screen?: string;
  capacity?: string;
  color: string;
  ram?: string;
  year?: number;
  image?: string;
  images?: string[];
  colorsAvailable?: string[];
  capacityAvailable?: string[];
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  description?: {
    title: string;
    text: string[];
  }[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface FavoriteItem {
  id: string;
  product: Product;
}

export type SortBy = 'newest' | 'alphabetically' | 'cheapest';
export type ItemsPerPage = '4' | '8' | '16' | 'all';
export type Category = 'phones' | 'tablets' | 'accessories';
