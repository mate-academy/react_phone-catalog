import { availableColors } from '../utils/helpers/helpers';
import { Category } from './Category';

// const specs = [
//   'Screen',
//   'Resolution',
//   'Processor',
//   'RAM',
//   'Capacity',
//   'Camera',
//   'Zoom',
//   'Cell',
// ] as const;

// type Specs = Lowercase<(typeof specs)[number]>;

interface Specs {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacity: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface ProductIncomplete {
  id: number;
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface Product {
  id: string;
  mainId: number;
  category: Category;
  namespaceId: string;
  name: string;
  year: number;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: (keyof typeof availableColors)[];
  color: keyof typeof availableColors;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  specs: Specs;
}

interface Description {
  title: string;
  text: string;
}
