export interface Product {
  id: number;
  itemId: string;
  category: string;
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
export interface ProductDetails {
  id: string;
  name: string;
  priceDiscount: number;
  priceRegular: number;
  images: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  screen: string;
  resolution: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  processor: string;
  description: {
    title: string;
    text: string[];
  }[];
}
