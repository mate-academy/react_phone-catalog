export interface Product {
  id: number | string;
  name: string;
  itemId?: string;
  namespaceId?: string;
  category: string;
  image?: string;
  images?: string[];
  year?: number;
  price?: number;
  fullPrice?: number;
  priceRegular?: number;
  priceDiscount?: number;
  description?: {
    title: string;
    text: string[];
  }[];
  capacity?: string;
  capacityAvailable?: string[];
  colorsAvailable?: string[];
  color?: string;
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}
