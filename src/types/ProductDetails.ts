import { Category } from './Category';
import { Product } from './Product';

export type Description = {
  title: string;
  text: string[];
};

export interface ProductDetails extends Product {
  id: number | string;
  category: Category;
  itemId: string;
  name: string;
  namespaceId: string;
  capacityAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  images: string[];
  image: string;
  description: Description[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
}
