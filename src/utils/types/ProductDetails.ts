import { Categories } from './Categories';

export interface ProductDetails {
  id: string;
  category: Categories.PHONES | Categories.TABLETS | Categories.ACCESSORIES;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionBlock[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera?: string;
  zoom?: string;
}

export interface DescriptionBlock {
  title: string;
  text: string[];
}
