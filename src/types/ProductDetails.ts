import { Categories } from './Categories';

interface BaseProduct {
  id: string;
  category: Categories;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
}

interface Phone extends BaseProduct {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

interface Tablet extends BaseProduct {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

interface Accessory extends BaseProduct {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
}

export type ProductDetails = Phone | Tablet | Accessory;
