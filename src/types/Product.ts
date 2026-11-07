import type { ProductDescriptionBlock } from './api';
import type { Category } from './category';

export type Product = {
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
  description: ProductDescriptionBlock[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
  year: number;
};
