export type ProductDetails = {
  name: string;
  images: string[];
  id: string;
  colorsAvailable: string[];
  capacityAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  description: { title: string; text: string[]; }[];
};
