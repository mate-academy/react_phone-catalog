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
};
