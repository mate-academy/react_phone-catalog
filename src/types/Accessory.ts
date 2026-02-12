export type Accessory = {
  id: string;
  category: 'accessories';
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  camera?: string;
  zoom?: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
};
