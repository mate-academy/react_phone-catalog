export type ProductCategory = 'phones' | 'tablets' | 'accessories' | 'products';

export interface Product {
  priceRegular: number;
  priceDiscount: number;
  id: string;
  itemId: string;
  category: ProductCategory;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  image: string;
  images: string[];
}

export interface ProductDetails extends Product {
  colorsAvailable: string[];
  capacityAvailable: string[];
  images: string[];
  description?: Array<{ title: string; text: string }>;
  specs?: Record<string, string | number>;
  namespaceId: string;
  priceDiscount: number;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
}
