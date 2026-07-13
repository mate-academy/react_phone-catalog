export interface Phone {
  id: string;

  category: string;
  namespaceId: string;

  name: string;

  images: string[];

  colorsAvailable: string[];
  color: string;

  priceRegular: number;
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

  description: {
    title: string;
    text: string[];
  }[];
}
