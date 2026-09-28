export type ProductCategory = 'phones' | 'tablets' | 'accessories';

export interface Product {
  id: number;
  category: ProductCategory;
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
  category: ProductCategory;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  colorsAvailable: string[];
  color: string;
  priceRegular: number;
  priceDiscount: number;
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

export type SortType = 'age' | 'title' | 'price';

export type ItemsPerPage = 4 | 8 | 16 | 'all';
