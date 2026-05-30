import { DescriptionItem } from './descriptionItem';

export type ProductDetails = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionItem[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
};
