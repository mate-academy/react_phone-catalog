export type ProductDetails = {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: number | string;
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
  camera: string;
  year: number;
  zoom: string;
  cell: string[];
};
