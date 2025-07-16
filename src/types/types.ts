export interface Iphones {
  camera: string;
  capacity: string;
  capacityAvailable: number;
  category: string;
  cell: string[];
  color: string;
  colorsAvailable: string[];
  description: string[];
  id: string;
  images: string[];
  name: string;
  namespaceId: string;
  priceDiscount: number;
  priceRegular: number;
  processor: string;
  ram: string;
  resolution: string;
  screen: string;
  zoom: string;
}

export interface Tablets {
  category: string;
  capacityAvailable: string[];
  colorsAvailable: string[];
  capacity: string;
  color: string;
  camera: string;
  cell: string[];
  description: string[];
  id: string;
  images: string[];
  name: string;
  namespaceId: string;
  priceRegular: number;
  priceDiscount: number;
  processor: string;
  ram: string;
  resolution: string;
  screen: string;
  zoom: string;
}

export interface Accessories {
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
  description: string[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
}

export interface Products {
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
