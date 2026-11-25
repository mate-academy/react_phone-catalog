export interface Product {
  id: string | number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  priceRegular: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  images?: string[];
}

export interface CategoriyItem {
  id: string;
  title: string;
  image: string;
  quantity: number;
}

export interface Phone {
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
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface LocalProduct {
  id: string;
  capacity?: string | undefined;
  color?: string | undefined;
  title?: string;
  quantity?: number;
}
