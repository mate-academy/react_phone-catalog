export type ProductCategory = 'phones' | 'tablets' | 'accessories';

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  image: string;
}

export interface ProductDetails extends Product {
  colorsAvailable: string[];
  capacityAvailable: string[];
  images: string[];
  description?: Array<{ title: string; text: string }>;
  specs?: Record<string, string | number>;
}
