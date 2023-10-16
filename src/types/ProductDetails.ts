export interface ProductDetails {
  name: string;
  description: { title: string, text: string[] }[];
  screen: string;
  resolution: string;
  proccessor: string;
  ram: string;
  capacity: string;
  camera: string;
  zoom: string;
  cell: string;
  images: string[];
  priceDiscount: number;
  priceRegular: number;
}
