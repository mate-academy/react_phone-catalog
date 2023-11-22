export interface Product {
  id: string;
  quantity: number;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  priceRegular: number;
  price: number;
  priceDiscount: number;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacity: string;
  capacityAvailable: string[];
  camera: string;
  zoom: string;
  cell: string[];
  color: string;
  colorsAvailable: string[];
  year: number;
  image: string;
  images: string[];
  description: [{ title: string, text: string[] }],
}
