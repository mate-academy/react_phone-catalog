export interface ProductDetails {
  id: string;
  name: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  capacity: string;
  capacityAvailable: string[];
  color: string;
  colorsAvailable: string[];
  namespaceId: string;
  category: 'phones' | 'tablets' | 'accessories';
}
