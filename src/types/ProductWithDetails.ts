import { ProductCategories } from './ProductCategories';
import { Colors } from './Colors';

export interface ProductWithDetails {
  id: string;
  category: ProductCategories;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: Colors[];
  color: Colors;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}
