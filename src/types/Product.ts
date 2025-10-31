export interface Product {
  id: string;
  category: string;
  phoneId?: string;
  itemId?: string;
  fullPrice: number;
  price: number;
  year: number;
  image: string;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
}

export interface DescriptionSection {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  category: string;
  phoneId?: string;
  itemId?: string;
  name: string;
  fullPrice: number;
  price: number;
  year: number;
  mainImage: string;
  images: string[]; // всі фото
  colorsAvailable: string[];
  capacityAvailable: string[];
  screen: string;
  ram: string;
  description: DescriptionSection[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
}
