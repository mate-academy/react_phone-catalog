import { BaseProduct } from './BaseProduct';

export type Description = {
  title: string;
  text: string[];
};

export type ProductDetails = BaseProduct & {
  namespaceId: string;
  capacityAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  images: string[];
  description: Description[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
};
