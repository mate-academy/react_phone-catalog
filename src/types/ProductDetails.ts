export interface ProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Disription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera: string;
  zoom: string;
}

export type Disription = {
  title: string;
  text: string[];
};
