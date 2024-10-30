export interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  namespaceId?: string;
  fullPrice: number;
  price: number;
  priceRegular?: number;
  priceDiscount?: number;
  colorsAvailable?: string[];
  description: { text: string[] }[];
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  images: string[];
}
