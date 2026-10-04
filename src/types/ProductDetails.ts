import { Category } from './Category';

export interface ProductDescription {
  title: string;
  text: string[];
}

// Item from /api/phones.json, /api/tablets.json, /api/accessories.json
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
  description: ProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  // accessories have no camera and zoom
  camera?: string;
  zoom?: string;
  cell: string[];
}
