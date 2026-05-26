export interface Gargets {
  namespaceId: unknown;
  id: string;
  category: string;
  name: string;
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  color: string;
  images: string[];
  screen: string;
  ram: string;
  capacityAvailable: string[];
  resolution: string;
  processor: string;
  description: {
    title: string;
    text: string[];
  }[];
  camera: string;
  zoom: string;
  cell: string[];
  colorsAvailable: string[];
}
