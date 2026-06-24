export enum Category {
  Phones = "phones",
  Tablets = "tablets",
  Accessories = "accessories",
}

export enum Sort {
  Newest = "newest",
  Cheapest = "cheapest",
  Alphabet = "alphabet",
}

export interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

interface DescriptionSection {
  title: string;
  text: string[];
}

export interface ProductDetailsType {
  id: string;
  category: "phones" | "tablets" | "accessories" | string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionSection[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera?: string;
  zoom?: string;
}
