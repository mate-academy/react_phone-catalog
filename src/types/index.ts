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
}

export interface ProductDetails {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  colorsAvailable: string[];
  color: string;
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
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
