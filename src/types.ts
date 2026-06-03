export type Category = 'phones' | 'tablets' | 'accessories';

export interface Product {
  id: string;
  itemId?: string;
  namespaceId?: string;
  category: Category;
  name: string;
  fullPrice?: number;
  price?: number;
  priceRegular?: number;
  priceDiscount?: number;
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  color?: string;
  colorsAvailable?: string[];
  capacity?: string;
  capacityAvailable?: string[];
  images?: string[];
  image?: string;
  description?: Array<{ title: string; text: string[] }>;
  year?: number;
  cell?: string[];
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}
