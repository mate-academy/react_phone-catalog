export type Category = 'phones' | 'tablets' | 'accessories';

export interface Product {
  id: string;
  category: Category;
  itemId?: string;
  name: string;
  image?: string;
  price: number;
  fullPrice?: number;
  year?: number;
  screen?: string;
  capacity?: string;
  ram?: string;
  colorsAvailable?: string[];
  capacityAvailable?: string[];
  description?: { title: string; text: string[] }[];
  [key: string]: unknown;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}
