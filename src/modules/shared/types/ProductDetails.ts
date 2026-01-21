import { ColorKey } from '../utils/color';
import { Product } from './Product';

export interface ProductDetails {
  id: string;
  productId: number;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: ColorKey[];
  color: ColorKey;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  product: Product;
}

export interface Description {
  title: string;
  text: string[];
}
