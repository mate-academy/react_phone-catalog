import { Category } from './CategoryNames';

export type ProductDetails = {
  id: string;
  namespaceId: string;
  category: Category;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export type Description = {
  title: string;
  text: string[];
};
