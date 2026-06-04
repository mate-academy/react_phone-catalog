import { ProductType } from './product.types';

export interface ProductDescriptionBlockType {
  title: string;
  text: string[];
}

export interface ProductDetailsType extends ProductType {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  capacity: string;
  capacityAvailable: string[];
  color: string;
  colorsAvailable: string[];
  images: string[];
  description: ProductDescriptionBlockType[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell?: string[];
  year?: number;
  camera?: string;
  zoom?: string;
}
