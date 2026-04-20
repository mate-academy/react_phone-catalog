export interface Product {
  id: string | number;
  category: string;
  name: string;
  screen: string;
  capacity: string;
  color: string;
  ram: string;

  itemId?: string;
  fullPrice?: number;
  price?: number;
  year?: number;
  image?: string;

  namespaceId?: string;
  priceRegular?: number;
  priceDiscount?: number;
  images?: string[];
  capacityAvailable?: string[];
  colorsAvailable?: string[];
  description?: { title: string; text: string[] }[];
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}
