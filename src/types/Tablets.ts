import { Category } from '../pages/ProductsPage/ProductsPage';

export interface Tablets {
  id: string;
  category: Category;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  color: string;
  colorsAvailable: string[];
  images: string[];

  description: {
    title: string;
    text: string[];
  }[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string | null;
  zoom: string;
  cell: string[];
}
