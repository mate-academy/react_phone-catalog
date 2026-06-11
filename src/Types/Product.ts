export interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  priceRegular: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  images: string[];
  description: { title: string; text: string[] }[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
}
