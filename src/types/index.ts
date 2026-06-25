export type Category = 'phones' | 'tablets' | 'accessories';

export interface Product {
  id: number;
  category: Category;
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

export interface DescriptionSection {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  category: Category;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionSection[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = 'age' | 'title' | 'price';
export type PerPageOption = 4 | 8 | 16 | 'all';
