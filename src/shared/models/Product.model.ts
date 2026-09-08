import { Category } from './category.model';

export interface ProductDescriptionBlock {
  title: string;
  text: string[];
}

export interface Product {
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
  camera: string;
  zoom: string;

  cell: string[];
}
