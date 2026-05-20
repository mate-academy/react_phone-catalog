export interface Phone {
  id: string;
  category: string;
  namespaceId: string;
  itemId?: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  colorsAvailable: string[];
  ram: string;
  year: number;
  images: string[];
  description?: { title: string; text: string[] }[];
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  capacityAvailable: string[];
}

export interface Tablet {
  id: string;
  category: string;
  namespaceId: string;
  itemId?: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  colorsAvailable: string[];
  ram: string;
  year: number;
  images: string[];
  description?: { title: string; text: string[] }[];
  resolution?: string;
  processor?: string;
  capacityAvailable: string[];
}

export interface Accessories {
  id: string;
  category: string;
  namespaceId: string;
  itemId?: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  color: string;
  colorsAvailable: string[];
  year: number;
  images: string[];
  description?: { title: string; text: string[] }[];
  capacityAvailable?: string[];
}
