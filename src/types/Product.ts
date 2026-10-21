export interface ProductDescription {
  title: string;
  text: string[];
}

export interface RawProduct {
  id?: string | number;
  category?: string;
  itemId?: string;
  phoneId?: string;
  namespaceId?: string;
  name?: string;
  fullPrice?: number;
  price?: number;
  priceDiscount?: number;
  priceRegular?: number;
  screen?: string;
  capacity?: string;
  color?: string;
  ram?: string;
  year?: number;
  image?: string;
  images?: string[];
  capacityAvailable?: string[];
  colorsAvailable?: string[];
  description?: ProductDescription[];
  resolution?: string;
  processor?: string;
  zoom?: string;
  camera?: string;
  cell?: string[];
}

export interface Product {
  id: string;
  category: string;
  itemId?: string;
  phoneId?: string;
  namespaceId?: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  priceDiscount?: number;
  priceRegular?: number;
  images?: string[];
  capacityAvailable?: string[];
  colorsAvailable?: string[];
  description?: ProductDescription[];
  resolution?: string;
  processor?: string;
  zoom?: string;
  camera?: string;
  cell?: string[];
}
