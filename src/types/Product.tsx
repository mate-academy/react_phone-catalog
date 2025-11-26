import { DescriptionBlock } from './DescriptioBlock';

export interface Product {
  price: string;
  id: string;
  name: string;
  images: string[];
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  resolution: string;
  processor: string;
  capacity: string;
  ram: string;
  camera: string;
  category: string;
  zoom: string;
  cell: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  namespaceId: string;
  color: string;
  description: DescriptionBlock[];
}
