export interface Product {
  id: number;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
  category: string;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  color: string;
  itemId: string;
  namespaceId: string;
  colorsAvailable: string[];
  capacityAvailable?: string[];
  images: string[];
  description?: { title: string; text: string[] }[];
  priceRegular?: number;
  priceDiscount?: number;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  productId?: string;
}
