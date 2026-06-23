export type ProductDetails = {
  id: string;
  category: string;
  name: string;

  color: string;
  capacity: string;

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell?: string[];

  images: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];

  priceRegular: number;
  priceDiscount: number;

  description: {
    title: string;
    text: string[];
  }[];
};
