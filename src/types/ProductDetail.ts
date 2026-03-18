import { Category } from './Category';
import { Description } from './Description';

export interface ProductDetail {
  id: string; //  = itemId from Product type
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
  description: Description[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera?: string; // optional
  zoom?: string; //optional
}
