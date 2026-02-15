import { Description } from './Description';

export interface ProductDetails {
  id: string;
  name: string;
  namespaceId: string;

  colorsAvailable: string[];
  capacityAvailable: string[];

  color: string;
  capacity: string;
  priceRegular: number;
  priceDiscount: number;

  images: string[];
  description: Description[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;

  camera: string;
  zoom: string;
  cell: string[];
}
