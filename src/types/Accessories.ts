export interface Smartwatch {
  itemId: string;
  id: string | number;
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
  description: Array<{
    title: string;
    text: string[];
  }>;
  camera?: string;
  zoom?: string;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
}
