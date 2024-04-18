export interface Product {
  id: number;
  category: string;
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

export interface DescAccessories {
  title: string;
  text: string[];
}

export interface Device {
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
  description: DescAccessories[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera?: string;
  zoom?: string;
}

export type TypeProduct = 'phones' | 'tablets' | 'accessories';
export type TypeSort = 'Newest' | 'Alphabetically' | 'Cheapest';
export type TypeItemOnPage = 'All' | '4' | '8' | '16';
