import { Category } from './Category';

interface ProductDescriptionItem {
  title: string;
  text: string[];
}

export type ProductDescription = ProductDescriptionItem[];

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
  description: ProductDescription;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}
