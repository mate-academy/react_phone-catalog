import type { ProductCategories } from './ProductCategories';
import type { ProductDescription } from './ProductDescription';

export interface Product {
  id: string;
  category: ProductCategories;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: ProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
  year?: number;
}
