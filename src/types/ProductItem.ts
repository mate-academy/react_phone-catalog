export interface ProductItemDescription {
  title: string;
  text: string[];
}

export interface ProductItem {
  id: string;
  category: 'phones' | 'tablets' | 'accessories' | string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: ProductItemDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}
