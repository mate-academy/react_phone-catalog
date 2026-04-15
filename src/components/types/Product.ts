export interface Product {
  id: string;
  itemId: string;
  category: string;
  name: string;
  namespaceId?: string;
  capacity: string;
  capacityAvailable: string[];
  priceRegular?: number;
  priceDiscount?: number;
  fullPrice?: number;
  price?: number;
  colorsAvailable?: string[];
  color: string;
  images: string[];
  image?: string;
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  year: number;
}