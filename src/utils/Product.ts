export interface Product {
  id: string;
  category: string;
  namespaceId: string;
  itemId?: string;
  name: string;
  capacityAvailable?: string[];
  capacity?: string;
  priceRegular?: number;
  priceDiscount?: number;
  fullPrice?: number;
  price?: number;
  colorsAvailable?: string[];
  color?: string;
  image?: string;
  images?: string[];
  description?: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution?: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  year: number;
}
