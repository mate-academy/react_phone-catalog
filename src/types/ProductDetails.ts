import type { Category } from './Category';
import type { Description } from './Description';

export type ProductDetails = {
  id: string;
  namespaceId: string;
  name: string;
  category: Category;
  capacityAvailable: string[];
  colorsAvailable: string[];
  images: string[];
  cell: string[];
  description: Description[];
  capacity: string;
  color: string;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  priceRegular: number;
  priceDiscount: number;
  camera?: string;
  zoom?: string;
};
