export interface Product {
  id: number | string;
  category: string;
  itemId?: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  images: string[];
  processor: string;
  colorsAvailable?: string[];
  capacityAvailable?: string[];
  description: { title: string; text: string[] }[];
}
