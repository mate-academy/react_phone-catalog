import { ProductColors } from '../constants/productColors';

export type ProductDesription = {
  title: string;
  text: string[];
};

export interface ProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: (keyof ProductColors)[];
  color: keyof ProductColors;
  images: string[];
  description: ProductDesription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera: string;
  zoom: string;
}
