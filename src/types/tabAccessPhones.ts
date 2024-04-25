export interface TabAccess {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: [];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: [];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: [];
}
