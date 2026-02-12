export type Tablet = {
  id: string;
  itemId: string;
  category: string;
  namespaceId: string;
  name: string;
  fullPrice: number;
  price: number;
  year: number;
  image: string;
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
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};
