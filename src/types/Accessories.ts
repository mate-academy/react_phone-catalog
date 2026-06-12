import { Category } from '../pages/ProductsPage/ProductsPage';

export interface Accessories {
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

  description: {
    title: string;
    text: string[];
  }[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string | null;
  cell: string[];
}
